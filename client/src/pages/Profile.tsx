import SideMenu from "../components/SideMenu";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/ui/Tabs";
import InterestsModal from "../components/ui/InterestModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import EditModal from "../components/ui/EditModal";
import Preloader from "../components/ui/Preloader";
import Message from "../components/ui/Message";
import {
	getUser,
	getToken,
	logout,
	clearAuth,
	isAuthenticated,
	updateProfile,
} from "../utils/auth";
import { saveUserInterests } from "../utils/user/interests";
import { updateAvatar } from "../utils/user/avatar";
import { getAvatarUrl } from "../utils/avatarUtils";
import { getUserUploadedBooks, deleteBook, getUserReviewsCount } from "../utils/books";
import UploadedBookItem from "../components/ui/UploadedBookItem";

const UserProfile = () => {
	useEffect(() => {
		document.title = "Profile | Libronet";
	}, []);
	const [activeTab, setActiveTab] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [showEditModal, setShowEditModal] = useState<'username' | 'email' | 'bio' | null>(null);
	const [user, setUser] = useState<any>(null);
	const [interests, setInterests] = useState<string[]>([]);
	const [uploadedBooks, setUploadedBooks] = useState<any[]>([]);
	const [reviewsCount, setReviewsCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
	const [pendingChanges, setPendingChanges] = useState<any>({});
	const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [editValue, setEditValue] = useState('');
	const avatarInputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login");
			return;
		}
		loadUserData();
		loadUploadedBooks();
	}, []);

	const loadUserData = () => {
		const userData = getUser();
		setUser(userData);
		if (userData?.interests) {
			setInterests(userData.interests.map((i: any) => i.name));
		}
		setPendingChanges({});
		setSelectedAvatar(null);
		setAvatarPreview(null);
	};

	useEffect(() => {
		if (activeTab === 1) {
			loadUserData();
			loadReviewsCount();
		}
	}, [activeTab]);

	const loadReviewsCount = async () => {
		setLoading(true);
		try {
			const data = await getUserReviewsCount();
			setReviewsCount(data.count);
		} catch (error) {
			console.error('Failed to load reviews count:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadUploadedBooks = async () => {
		try {
			const books = await getUserUploadedBooks();
			setUploadedBooks(books);
		} catch (error) {
			console.error("Failed to load uploaded books:", error);
		}
	};

	const showMessage = (type: string, text: string) => {
		setMessage({ type, text });
		setTimeout(() => setMessage(null), 3000);
	};

	const handleOpenEdit = (field: 'username' | 'email' | 'bio') => {
		setShowEditModal(field);
		setEditValue(pendingChanges[field] || user?.[field] || '');
	};

	const handleSaveEdit = () => {
		if (showEditModal) {
			setPendingChanges({ ...pendingChanges, [showEditModal]: editValue });
			setShowEditModal(null);
		}
	};

	const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedAvatar(file);
			const reader = new FileReader();
			reader.onloadend = () => setAvatarPreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleSaveChanges = async () => {
		setLoading(true);
		try {
			const token = getToken();
			if (!token) throw new Error('Not authenticated');

			if (selectedAvatar) {
				await updateAvatar(selectedAvatar);
			}

			const updates: any = {};
			if (pendingChanges.username) updates.username = pendingChanges.username;
			if (pendingChanges.email) updates.email = pendingChanges.email;
			if (pendingChanges.bio !== undefined) updates.bio = pendingChanges.bio;

			if (Object.keys(updates).length > 0) {
				await updateProfile(token, updates);
			}

			setTimeout(() => loadUserData(), 500);
			showMessage('success', 'Profile updated successfully!');
		} catch (error: any) {
			console.error('Failed to update profile:', error);
			showMessage('error', error.message || 'Failed to update profile');
		} finally {
			setLoading(false);
			if (avatarInputRef.current) avatarInputRef.current.value = '';
		}
	};

	const handleDeleteBook = async (bookId: number) => {
		try {
			await deleteBook(bookId);
			setUploadedBooks(uploadedBooks.filter(book => book.id !== bookId));
		} catch (error) {
			console.error("Failed to delete book:", error);
			showMessage('error', 'Failed to delete book');
		}
	};

	const handleEditBook = (bookId: number) => {
		console.log("Edit book:", bookId);
		showMessage('info', 'Edit functionality coming soon!');
	};

	const handleSaveInterests = async (newInterests: string[]) => {
		try {
			await saveUserInterests(newInterests);
			setTimeout(() => loadUserData(), 500);
		} catch (error) {
			console.error("Failed to update interests:", error);
			showMessage('error', 'Failed to save interests');
		}
	};

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

	const hasChanges = Object.keys(pendingChanges).length > 0 || selectedAvatar !== null;

	if (!user) return null;

	return (
		<div className="w-full flex justify-end max-sm:items-start items-center bg-[#060410] sm:bgImage min-h-screen max-sm:h-fit pb-10">
			<Preloader isLoading={loading} />
			{message && <Message type={message.type} text={message.text} />}
			<SideMenu />
			<div className="w-6/7 max-sm:w-full min-h-dvh max-sm:h-fit flex flex-col px-10 max-sm:p-3 pt-5 pb-20 max-sm:pb-28 relative">
				<div className="w-full h-full flex items-center justify-start flex-col">
					<div className="w-full max-w-5xl max-h-fit max-[900px]:h-fit rounded-2xl bg-[#4857605a] p-8 max-sm:p-4 border border-gray-700 flex flex-col">
						<div className="flex max-sm:flex-col items-center gap-6 pb-6 border-b border-gray-700">
							<div className="relative">
								<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
									<img
										src={avatarPreview || getAvatarUrl(user?.avatar_url)}
										alt="User"
										className="w-full h-full object-cover"
									/>
								</div>
								<button
									onClick={() => avatarInputRef.current?.click()}
									className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 text-white rounded-full h-8 w-8 transition"
									title="Change avatar"
								>
									<i className="fa fa-camera text-sm"></i>
								</button>
								<input
									ref={avatarInputRef}
									type="file"
									accept="image/*"
									onChange={handleAvatarSelect}
									className="hidden"
								/>
							</div>
							<div className="flex-1 max-sm:text-center">
								<h1 className="text-2xl font-bold text-gray-50">
									{pendingChanges.username || user?.username || "User"}
								</h1>
								<p className="text-gray-400 text-sm mt-1">
									{pendingChanges.email || user?.email || "No email"}
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
								onClick={() => setShowLogoutConfirm(true)}
								className="text-gray-50 bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
							>
								<i className="fa fa-power-off"></i> Logout
							</button>
						</div>

						<div className="mt-6 max-sm:mt-3 flex-1 flex flex-col">
							<Tabs
								tabs={["Account", "Reading Stats", "Interests", "Uploads"]}
								activeTab={activeTab}
								onTabChange={setActiveTab}
							/>

							{activeTab === 0 && (
								<div className="space-y-4 overflow-y-auto">
									<div className="flex justify-between items-center p-4 rounded-lg bg-[#31303e] border border-gray-700">
										<div>
											<span className="text-gray-400">Username:</span>{" "}
											<span className="text-gray-50 ml-2">
												{pendingChanges.username || user?.username}
											</span>
										</div>
										<i onClick={() => handleOpenEdit('username')} className="fa fa-edit cursor-pointer text-purple-400 hover:scale-105 transition"></i>
									</div>
									<div className="flex justify-between items-center p-4 rounded-lg bg-[#31303e] border border-gray-700">
										<div>
											<span className="text-gray-400">Email:</span>{" "}
											<span className="text-gray-50 ml-2">{pendingChanges.email || user?.email}</span>
										</div>
										<i onClick={() => handleOpenEdit('email')} className="fa fa-edit cursor-pointer text-purple-400 hover:scale-105 transition"></i>
									</div>
									<div className="flex justify-between items-center p-4 rounded-lg bg-[#31303e] border border-gray-700">
										<div className="flex-1">
											<span className="text-gray-400">Bio:</span>{" "}
											<span className="text-gray-50 ml-2">
												{pendingChanges.bio !== undefined ? pendingChanges.bio : (user?.bio || "No bio yet")}
											</span>
										</div>
										<i onClick={() => handleOpenEdit('bio')} className="fa fa-edit cursor-pointer text-purple-400 hover:scale-105 transition ml-4"></i>
									</div>
									{hasChanges && (
										<button
											onClick={handleSaveChanges}
											disabled={loading}
											className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition font-medium"
										>
											Save Changes
										</button>
									)}
								</div>
							)}

							{activeTab === 1 && (
								<div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 overflow-y-auto">
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
											{Math.floor((user?.reading_hours || 0) * 60)}m
										</h3>
										<p className="text-gray-400 text-sm">Reading Time</p>
									</div>
									<div className="p-6 rounded-lg bg-[#31303e] border border-gray-700 text-center">
										<i className="fa fa-star text-3xl text-purple-400"></i>
										<h3 className="text-2xl font-bold text-gray-50 mt-3">{reviewsCount}</h3>
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
													No interests selected yet. Click edit to add at least 3 interests.
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
									<p className="text-gray-400 mb-3">Your Uploads ({uploadedBooks.length}):</p>
									{uploadedBooks.length === 0 ? (
										<p className="text-gray-500 text-sm">No uploads yet</p>
									) : (
										<div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3">
											{uploadedBooks.map((book) => (
												<UploadedBookItem key={book.id} book={book} onDelete={handleDeleteBook} onEdit={handleEditBook} />
											))}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{showModal && (
				<div className="w-full h-full flex justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-50 top-0 left-0">
					<InterestsModal
						onClose={() => setShowModal(false)}
						setInterests={handleSaveInterests}
						currentInterests={interests}
					/>
				</div>
			)}

			<EditModal
				isOpen={!!showEditModal}
				title={`Edit ${showEditModal}`}
				value={editValue}
				onChange={setEditValue}
				onSave={handleSaveEdit}
				onClose={() => setShowEditModal(null)}
				type={showEditModal === 'bio' ? 'textarea' : showEditModal === 'email' ? 'email' : 'text'}
				placeholder={showEditModal === 'bio' ? 'Enter your bio...' : `Enter ${showEditModal}...`}
			/>

			<ConfirmModal
				isOpen={showLogoutConfirm}
				onClose={() => setShowLogoutConfirm(false)}
				onConfirm={handleLogout}
				title="Logout"
				message="Are you sure you want to logout?"
				confirmText="Logout"
				type="warning"
			/>
		</div>
	);
};

export default UserProfile;
