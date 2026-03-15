import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser, isAuthenticated, getToken, getProfile } from "../utils/auth";

function SideMenu() {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const loadUser = async () => {
			if (isAuthenticated()) {
				const localUser = getUser();
				// If user doesn't have is_staff, fetch fresh data
				if (localUser && localUser.is_staff === undefined) {
					try {
						const token = getToken();
						if (token) {
							const freshUser = await getProfile(token);
							localStorage.setItem('user', JSON.stringify(freshUser));
							setUser(freshUser);
							return;
						}
					} catch (error) {
						console.error('Failed to fetch user profile:', error);
					}
				}
				setUser(localUser);
			}
		};
		loadUser();
	}, []);

	const isAdmin = user?.is_staff || false;
	// Define a helper to handle the active styling logic
	const navLinkStyles = ({ isActive }: { isActive: string | any }) =>
		`w-full text-sm h-12 flex justify-start max-[900px]:justify-center max-[900px]:mt-3 max-sm:mt-0 items-center cursor-pointer px-2 rounded-md max-sm:rounded-full transition duration-300 ${
			isActive
				? "bg-[#1a123c95] text-white font-medium" // Active styles
				: "text-gray-300 hover:bg-[#48576030]" // Inactive/Hover styles
		}`;

	return (
		<div
			className="w-1/7 bg-[#0a061b95] max-[900px]:w-1/9 max-sm:w-[95%] max-sm:h-18 backdrop-blur-2xl max-sm:rounded-4xl
         max-sm:flex-row max-sm:fixed max-sm:z-50 max-sm:bottom-3 h-full flex flex-col justify-start
          items-center px-2 fixed left-0 bottom-0 max-sm:left-[2.5%] border-r max-sm:border max-sm:border-gray-700/50 border-purple-600/10"
		>
			<span className="flex w-full h-15 justify-start max-[900px]:justify-center items-center max-sm:hidden">
				<img src="/images/logo.png" alt="Logo" className="h-10" />
			</span>

			<span className="w-full h-fit mt-5 max-sm:mt-0 flex flex-col max-sm:flex-row space-y-1 max-sm:justify-evenly max-sm:items-center">
				<NavLink to="/home" className={navLinkStyles}>
					<i className="max-[900px]:text-2xl fa fa-home"></i>
					<p className="pl-2 max-[900px]:hidden">Home</p>
				</NavLink>

				<NavLink to="/search" className={navLinkStyles}>
					<i className="max-[900px]:text-2xl fa fa-search"></i>
					<p className="pl-2 max-[900px]:hidden">Search</p>
				</NavLink>

				<NavLink to="/myshelve" className={navLinkStyles}>
					<i className="max-[900px]:text-2xl fa fa-bookmark"></i>
					<p className="pl-2 max-[900px]:hidden">My Shelve</p>
				</NavLink>

				<NavLink to="/upload" className={navLinkStyles}>
					<i className="max-[900px]:text-2xl fa fa-plus-circle"></i>
					<p className="pl-2 max-[900px]:hidden">Upload</p>
				</NavLink>

				{isAdmin && (
					<NavLink to="/admin" className={navLinkStyles}>
						<i className="max-[900px]:text-2xl fa fa-shield-alt"></i>
						<p className="pl-2 max-[900px]:hidden">Admin</p>
					</NavLink>
				)}

				<NavLink to="/profile" className={navLinkStyles}>
					<i className="max-[900px]:text-2xl fa-solid fa-user-circle"></i>
					<p className="pl-2 max-[900px]:hidden">Profile</p>
				</NavLink>
			</span>

			<span className="flex flex-col h-fit w-full text-gray-400 text-xs px-2 mt-auto mb-5 max-sm:hidden">
				<Link to="/about" className="hover:underline">
					About
				</Link>
				<Link to="#" className="my-2 hover:underline">
					Contact
				</Link>
				<Link to="/terms" className="hover:underline">
					Terms & Conditions
				</Link>
			</span>
		</div>
	);
}

export default SideMenu;
