import { Link } from "react-router-dom";
import Button from "./ui/Button";
import CustomSelect from "./ui/CustomSelect";


//Topmenu for landing page
function TopMenu() {

    return (
        <div className="w-full h-15 max-sm:h-10 flex justify-between items-center absolute top-0">
            <span className="w-auto h-full flex justify-between items-center">
                <img src="/images/logo.png" alt="Logo" className="w-15 max-sm:w-10"/>
                <h1 className="text-4xl max-sm:text-3xl yusei-magic-regular gradient">Libronet</h1>
            </span>
            <span>
                <Link to="/login"><Button text="Sign In"></Button></Link>
            </span>
        </div>
    )
}

export function TopBar(){
    return(
        <div className="w-full h-15 max-sm:h-10 flex justify-between items-center absolute top-0 right-0 px-5">
            <span className="flex h-9 w-2/6 rounded-4xl bg-white justify-between items-center border border-purple-300 shadow">
            <CustomSelect defaultValue="All" options={[{value: "Book", label: "Book"},{value: "Author", label: "Author"}]}></CustomSelect>
            <span className="flex justify-between items-center h-full w-2/3 text-xs">
                <input type="text" className="w-full h-full outline-0 ring-0" placeholder="Search..."/>
                <i className="fa fa-search text-gray-800"></i>
            </span>
            <span className="w-auto px-2 flex justify-center items-center cursor-pointer h-6/10 border-l border-purple-300" title="Scan ISBN/ISSN Code">
                <i className="fa fa-barcode text-sm text-gray-800"></i>
            </span>
            </span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
export default TopMenu;