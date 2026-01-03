import { Link } from "react-router-dom";
import Button from "./ui/Button";
import CustomSelect from "./ui/CustomSelect";


//Topmenu for landing page
function TopMenu() {

    return (
        <div className="w-9/10 right-auto h-15 px-5 rounded-4xl max-sm:h-10 flex justify-between items-center fixed top-5 bg-transparent border border-gray-700 backdrop-blur-2xl">
            <span className="w-auto h-full flex justify-between items-center">
                <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                <h1 className="text-xl max-sm:text-3xl font-[Super] gradient">Libronet</h1>
            </span>
            <span>
                <Link to="/" className="text-gray-400 text-sm p-2 mx-2">Home</Link>
                <Link to="#" className="text-gray-400 text-sm p-2 mx-2">Search</Link>
                <Link to="#" className="text-gray-400 text-sm p-2 mx-2">About</Link>
                <Link to="/login"><Button text="Sign In"></Button></Link>
            </span>
        </div>
    )
}

export function TopBar() {
    return (
        <div className="w-full h-15 max-sm:h-10 flex justify-between items-center absolute top-0 right-0 px-5">
            {/* Search Bar */}
            <span className="flex h-9 min-w-2/6 rounded-4xl bg-white justify-between items-center border border-purple-300 shadow">
                <CustomSelect defaultValue="All" customStyles=" border-r border-r-purple-300" options={[{ value: "Book", label: "Book" }, { value: "Author", label: "Author" }]}></CustomSelect>
                <span className="flex justify-between items-center h-full w-2/3 text-xs">
                    <input type="text" className="w-full h-full outline-0 ring-0" placeholder="Search..." />
                    <i className="fa fa-search text-gray-800"></i>
                </span>
                <span className="w-auto px-2 flex justify-center items-center cursor-pointer h-6/10 border-l border-purple-300" title="Scan ISBN/ISSN Code">
                    <i className="fa fa-barcode text-sm text-gray-800"></i>
                </span>
            </span>
            {/* Language Selector - Future Feature */}
            <span className="flex h-9 min-w-25 px-2 rounded-4xl bg-white justify-center items-center border border-purple-300 shadow cursor-pointer">
                <i className="fa fa-language"></i>
                <CustomSelect defaultValue="English" options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }]}></CustomSelect>
            </span>
            {/* Digital Clock and Reading Timer */}
            <span className="flex h-9 w-fit rounded-4xl bg-white justify-between items-center border border-purple-300 shadow font-[digi]">
                <span className="text-gray-800 flex justify-between items-center">
                    <i className="fa fa-clock mx-2"></i>
                    <p>09:00 HRS</p>
                </span>
                <span className="text-gray-800 flex justify-between items-center px-2">
                    <i className="fa fa-calendar mx-2"></i>
                    <p>31-Dec-2025</p>
                </span>
            </span>
            {/* User Profile */}
            <span className="flex h-9 min-w-25 px-0.5 rounded-4xl bg-white justify-start items-center border border-purple-300 shadow cursor-pointer">
                <span className="h-8 w-8 rounded-full flex justify-center items-center overflow-hidden bg-amber-200">
                    <img src="/images/user.jpg" alt="User" className="w-auto h-full" />
                </span>
                <p className="text-xs ml-2">Azimeh</p>
            </span>
        </div>
    )
}
export default TopMenu;