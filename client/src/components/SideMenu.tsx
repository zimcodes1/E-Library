import { NavLink } from "react-router-dom"; // Change Link to NavLink

function SideMenu() {
    // Define a helper to handle the active styling logic
    const navLinkStyles = ({ isActive }: { isActive: string | any }) =>
        `w-full text-sm h-12 flex justify-start max-sm:justify-center items-center cursor-pointer px-2 rounded-md max-sm:rounded-full transition duration-300 ${isActive
            ? "bg-[#48576050] text-white font-medium" // Active styles
            : "text-gray-300 hover:bg-[#48576030]"    // Inactive/Hover styles
        }`;

    return (
        <div className="w-1/7 max-sm:w-[95%] max-sm:h-18 backdrop-blur-2xl max-sm:rounded-4xl
         max-sm:flex-row max-sm:fixed max-sm:z-50 max-sm:bg-[#4857605a] 
         max-sm:bottom-3 h-full flex flex-col justify-start
          items-center px-2 fixed left-0 bottom-0 max-sm:left-[2.5%] border-r border-gray-800">
            <span className="flex w-full h-15 justify-start items-center max-sm:hidden">
                <img src="/images/logo.png" alt="Logo" className="h-10" />
            </span>

            <span className="w-full h-fit mt-5 max-sm:mt-0 flex flex-col max-sm:flex-row space-y-1 max-sm:justify-evenly max-sm:items-center">
                <NavLink to='/home' className={navLinkStyles}>
                    <i className="max-sm:text-2xl fa fa-home"></i>
                    <p className="pl-2 max-sm:hidden">Home</p>
                </NavLink>

                <NavLink to='/search' className={navLinkStyles}>
                    <i className="max-sm:text-2xl fa fa-search"></i>
                    <p className="pl-2 max-sm:hidden">Search</p>
                </NavLink>

                <NavLink to='/myshelve' className={navLinkStyles}>
                    <i className="max-sm:text-2xl fa fa-bookmark"></i>
                    <p className="pl-2 max-sm:hidden">My Shelve</p>
                </NavLink>

                <NavLink to='/upload' className={navLinkStyles}>
                    <i className="max-sm:text-2xl fa fa-plus-circle"></i>
                    <p className="pl-2 max-sm:hidden">Upload</p>
                </NavLink>

                <NavLink to='/profile' className={navLinkStyles}>
                    <i className="max-sm:text-2xl fa-solid fa-user-circle"></i>
                    <p className="pl-2 max-sm:hidden">Profile</p>
                </NavLink>
            </span>

            <span className="flex flex-col h-fit w-full text-gray-400 text-xs px-2 mt-auto mb-5 max-sm:hidden">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="my-2 hover:underline">Contact</a>
                <a href="#" className="hover:underline">Terms & Conditions</a>
            </span>
        </div>
    )
}

export default SideMenu;