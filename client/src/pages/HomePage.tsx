import SideMenu from "../components/SideMenu"
import {TopBar} from "../components/TopMenu"
function HomePage() {
    return (
        <div className="w-full flex justify-end items-center bg-purple-100 h-screen">
            <SideMenu />
            <div className="w-6/7 h-full flex flex-col px-10 pt-5 relative">
                <TopBar />
            </div>
        </div>
    )
}

export default HomePage