import { Link } from "react-router-dom"

function SideMenu() {
    return (
        <div className="w-1/7 bg-[#48576019] h-full flex flex-col justify-start items-center px-2 fixed left-0 top-0 border-r border-gray-800">
            <span className="flex w-full h-15 justify-start items-center">
                <img src="/images/logo.png" alt="Logo" className="h-10" />
            </span>

            <span className="w-full h-fit mt-5 flex flex-col">
                <Link to='/home' className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-gray-300 px-2 hover:bg-[#48576050] rounded-md transition duration-300">
                    <i className="fa fa-home"></i>
                    <p className="pl-2">Home</p>
                </Link>
                <Link to='/search' className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-gray-300 px-2 hover:bg-[#48576050] rounded-md transition duration-300">
                    <i className="fa fa-search"></i>
                    <p className="pl-2">Search</p>
                </Link>
                <Link to='/myshelve' className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-gray-300 px-2 hover:bg-[#48576050] rounded-md transition duration-300">
                    <i className="fa fa-book"></i>
                    <p className="pl-2">My Shelve</p>
                </Link>
                <Link to='/upload' className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-gray-300 px-2 hover:bg-[#48576050] rounded-md transition duration-300">
                    <i className="fa fa-plus-circle"></i>
                    <p className="pl-2">Upload</p>
                </Link>
                <Link to='/' className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-gray-300 px-2 hover:bg-[#48576050] rounded-md transition duration-300">
                    <i className="fa-solid fa-hand-holding-heart"></i>
                    <p className="pl-2">Contribute</p>
                </Link>
            </span>


            <span className="flex flex-col h-fit w-full text-gray-400 text-xs px-2 mt-auto mb-5">
                <a href="#" className="">About</a>
                <a href="#" className="my-2">Contact</a>
                <a href="#">Terms & Conditions</a>
            </span>
        </div>
    )
}

export default SideMenu
