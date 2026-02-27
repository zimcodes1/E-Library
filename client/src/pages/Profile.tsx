import SideMenu from "../components/SideMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/ui/Tabs";
import InterestsModal from "../components/ui/InterestModal";
import {
	getUser,
	getToken,
	logout,
	clearAuth,
	isAuthenticated,
} from "../utils/auth";
import { saveUserInterests } from "../utils/user/interests";
import EditBioModal from "../components/ui/EditBioModal";
import { saveBio } from "../utils/user/bio";

const UserProfile = () => {
	useEffect(() => {
		document.title = "Profile | Libronet";
	}, []);
	const [activeTab, setActiveTab] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [showBioEditModal, setShowBioEditModal] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [interests, setInterests] = useState<string[]>([]);
    const [bio, setBio] = useState<string|undefined>()
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login");
			return;
		}
		loadUserData();
	}, []);

	const loadUserData = () => {
		const userData = getUser();
		setUser(userData);
		if (userData?.interests) {
			setInterests(userData.interests.map((i: any) => i.name));
		}
        if (userData?.bio){
            setBio(userData.bio)
        }
	};

	const handleSaveInterests = async (newInterests: string[]) => {
		try {
			await saveUserInterests(newInterests);
			// Wait a bit for backend to update
			setTimeout(() => {
				loadUserData();
			}, 500);
		} catch (error) {
			console.error("Failed to update interests:", error);
			alert("Failed to save interests. Please try again.");
		}
	};

    const handleSetBio = async (newBio:string)=>{
        try{
            await saveBio(newBio);
            setTimeout(()=>{
                loadUserData();
            }, 500);
        } catch (err){
            console.error("Failed to update interests:", err);
            alert('Failed to update bio. Please try again later.')
        }
    }

	const handleLogout = async () => {
		const token = getToken();
		if (token) {
			try {
				await logout(token);
			} catch (error) {
				console.error("Logout error:", error);
			}
		}
		clearAuth();
		navigate("/login");
	};

	if (!user) return null;

	return (
		<div className="w-full flex justify-end items-center bgImage overflow-clip min-h-dvh pb-10 max-sm:pb-0">
			<SideMenu />
			<div className="w-6/7 max-sm:w-full h-dvh max-sm:h-fit flex flex-col px-10 max-sm:p-3 pt-5 pb-20 max-sm:pb-28 relative">
				<div className="w-full h-full flex items-center justify-center flex-col">
					<div className="w-full max-w-5xl h-9/10 max-[900px]:h-fit rounded-2xl bg-[#4857605a] p-8 max-sm:p-4 border border-gray-700">
						{/* Profile Header */}
						<div className="flex max-sm:flex-col items-center gap-6 pb-6 border-b border-gray-700">
							<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
								<img
									src={user?.avatar || "/images/defaultUser.jpg"}
									alt="User"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 max-sm:text-center">
								<h1 className="text-2xl font-bold text-gray-50">
									{user?.username || "User"}
								</h1>
								<p className="text-gray-400 text-sm mt-1">
									{user?.email || "No email"}
								</p>
								<div className="flex max-sm:justify-center gap-4 mt-3 text-sm">
									<span className="text-gray-300">
										<i className="fa fa-book text-purple-400"></i>{" "}
										{user?.books_read || 0} Books
									</span>
									<span className="text-gray-300">
										<i className="fa fa-clock text-purple-400"></i>{" "}
										{user?.reading_hours || 0}hrs
									</span>
								</div>
							</div>
							<button
								onClick={handleLogout}
								className="text-gray-50 bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
							>
								<i className="fa fa-power-off"></i> Logout
							</button>
						</div>

						{/* Tabs */}
						<div className="mt-6 max-sm:mt-3">
							<Tabs
								tabs={["Account", "Reading Stats", "Interests", "Uploads"]}
								activeTab={activeTab}
								onTabChange={setActiveTab}
							/>

							{/* Tab Content */}
							{activeTab === 0 && (
								<div className="space-y-4">
									<div className="flex justify-between items-center p-4 rounded-lg bg-[#31303e] border border-gray-700">
										<div>
											<span className="text-gray-400">Username:</span>{" "}
											<span className="text-gray-50 ml-2">
												{user?.username}
											</span>
										</div>
									</div>
									<div className="flex justify-between items-center p-4 rounded-lg bg-[#31303e] border border-gray-700">
										<div>
											<span className="text-gray-400">Email:</span>{" "}
											<span className="text-gray-50 ml-2">{user?.email}</span>
										</div>
									</div>
									<div className="flex justify-between items-center p-4 rounded-lg bg-[#31303e] border border-gray-700">
										<div className="relative w-full">
											<span className="text-gray-400">Bio:</span>{" "}
											<span className="text-gray-50 ml-2">
												{user?.bio || "No bio yet"}
											</span>
											<i
												onClick={() => setShowBioEditModal(true)}
												className="fa fa-edit cursor-pointer hover:scale-105 transition duration-200 text-purple-400 absolute right-0 "
											></i>
										</div>
									</div>
								</div>
							)}

							{activeTab === 1 && (
								<div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
									<div className="p-6 rounded-lg bg-[#31303e] border border-gray-700 text-center">
										<i className="fa fa-book-open text-3xl text-purple-400"></i>
										<h3 className="text-2xl font-bold text-gray-50 mt-3">
											{user?.books_read || 0}
										</h3>
										<p className="text-gray-400 text-sm">Books Read</p>
									</div>
									<div className="p-6 rounded-lg bg-[#31303e] border border-gray-700 text-center">
										<i className="fa fa-clock text-3xl text-purple-400"></i>
										<h3 className="text-2xl font-bold text-gray-50 mt-3">
											{user?.reading_hours || 0}hrs
										</h3>
										<p className="text-gray-400 text-sm">Reading Time</p>
									</div>
									<div className="p-6 rounded-lg bg-[#31303e] border border-gray-700 text-center">
										<i className="fa fa-star text-3xl text-purple-400"></i>
										<h3 className="text-2xl font-bold text-gray-50 mt-3">0</h3>
										<p className="text-gray-400 text-sm">Reviews Written</p>
									</div>
								</div>
							)}

							{activeTab === 2 && (
								<div className="p-4 rounded-lg bg-[#31303e] border border-gray-700">
									<div className="flex justify-between items-start">
										<div className="w-full">
											<p className="text-gray-400 mb-3">Your Interests:</p>
											{interests.length === 0 ? (
												<p className="text-gray-500 text-sm">
													No interests selected yet. Click edit to add at least
													3 interests.
												</p>
											) : (
												<div className="flex flex-wrap gap-2">
													{interests.map((interest, i) => (
														<span
															key={i}
															className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
														>
															{interest}
														</span>
													))}
												</div>
											)}
										</div>
										<i
											onClick={() => setShowModal(true)}
											className="fa fa-edit text-purple-400 cursor-pointer ml-4"
										></i>
									</div>
								</div>
							)}

							{activeTab === 3 && (
								<div className="p-4 rounded-lg bg-[#31303e] border border-gray-700">
									<div className="flex justify-between items-start">
										<div>
											<p className="text-gray-400 mb-3">Your Uploads:</p>
											<p className="text-gray-500 text-sm">No uploads yet</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Interests selection modal */}
			{showModal && (
				<div className="w-full h-full flex justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-50 top-0 left-0">
					<InterestsModal
						onClose={() => setShowModal(false)}
						setInterests={handleSaveInterests}
						currentInterests={interests}
					/>
				</div>
			)}

			{/* Bio edit modal here */}
			{showBioEditModal && (
				<div className="w-full h-full flex justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-50 top-0 left-0">
					<EditBioModal
						onClose={() => {
							setShowBioEditModal(false);
						}}
                        userBio={bio}
                        setBio={handleSetBio}
					></EditBioModal>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
