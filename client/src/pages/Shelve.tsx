import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import CustomSelect from "../components/ui/CustomSelect"
import ShelveItem from "../components/ShelveItem"
import { useEffect } from "react"

const Shelve = () => {
    useEffect(()=>{document.title = 'Your Shelve | Libronet'}, [])
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-25">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-sm:w-full min-h-screen flex flex-col px-10 max-sm:px-3 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 max-sm:mt-3 flex-col">
                    <span className="flex justify-start max-sm:justify-center items-center">
                        <h2 className="text-lg max-sm:font-normal font-semibold text-gray-300">Your Shelve</h2>
                        <span className="flex h-9 min-w-25 px-2 ml-10 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer">
                            <CustomSelect defaultValue="All Books" options={[{value:'Favourites', label:'Favourites'}, {value:'Bookmarks', label:'Bookmark'},{value:'Downloads'}]}></CustomSelect>
                        </span>
                    </span>
                    {/* Shelve Container */}
                    <div className="w-full h-fit flex justify-start items-center flex-wrap max-sm:flex-col mt-5 text-sm gap-10 max-sm:gap-2">
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                        <ShelveItem></ShelveItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shelve