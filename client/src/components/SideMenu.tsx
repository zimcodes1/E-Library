import { NavLink } from "react-router-dom"; // Change Link to NavLink

function SideMenu() {
    // Define a helper to handle the active styling logic
    const navLinkStyles = ({ isActive }:{isActive:string | any}) => 
        `w-full text-sm h-12 flex justify-start items-center cursor-pointer px-2 rounded-md transition duration-300 ${
            isActive 
            ? "bg-[#48576050] text-white font-medium" // Active styles
            : "text-gray-300 hover:bg-[#48576030]"    // Inactive/Hover styles
        }`;

    return (
        <div className="w-1/7 max-sm:hidden bg-[#48576019] h-full flex flex-col justify-start items-center px-2 fixed left-0 top-0 border-r border-gray-800">
            <span className="flex w-full h-15 justify-start items-center">
                <img src="/images/logo.png" alt="Logo" className="h-10" />
            </span>

            <span className="w-full h-fit mt-5 flex flex-col space-y-1">
                <NavLink to='/home' className={navLinkStyles}>
                    <i className="fa fa-home"></i>
                    <p className="pl-2">Home</p>
                </NavLink>

                <NavLink to='/search' className={navLinkStyles}>
                    <i className="fa fa-search"></i>
                    <p className="pl-2">Search</p>
                </NavLink>

                <NavLink to='/myshelve' className={navLinkStyles}>
                    <i className="fa fa-book"></i>
                    <p className="pl-2">My Shelve</p>
                </NavLink>

                <NavLink to='/upload' className={navLinkStyles}>
                    <i className="fa fa-plus-circle"></i>
                    <p className="pl-2">Upload</p>
                </NavLink>

                <NavLink to='/profile' className={navLinkStyles}>
                    <i className="fa-solid fa-user-circle"></i>
                    <p className="pl-2">Profile</p>
                </NavLink>
            </span>

            <span className="flex flex-col h-fit w-full text-gray-400 text-xs px-2 mt-auto mb-5">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="my-2 hover:underline">Contact</a>
                <a href="#" className="hover:underline">Terms & Conditions</a>
            </span>
        </div>
    )
}

export default SideMenu;