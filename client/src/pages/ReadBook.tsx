import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"

function ReadBook() {
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 h-screen flex flex-col px-10 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 justify-center items-center">
                </div>
            </div>
        </div>
    )
}


export default ReadBook