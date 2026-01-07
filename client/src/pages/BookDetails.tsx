import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"

function BookDetails() {
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-25">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-7/8 max-sm:w-full min-h-screen flex flex-col px-10 max-[900px]:px-5 max-sm:px-3 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 max-sm:mt-3 flex-col">
                </div>
            </div>
        </div>
    )
}

export default BookDetails