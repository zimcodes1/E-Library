import { Link } from "react-router-dom";
import Button from "./ui/Button";


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
        <div className="w-full h-15 max-sm:h-10 flex justify-between items-center fixed top-0">

        </div>
    )
}
export default TopMenu;