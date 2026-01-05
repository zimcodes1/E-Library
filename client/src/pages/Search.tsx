import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import CustomSelect from "../components/ui/CustomSelect"
import SearchElement from "../components/ui/SearchElement"

function SearchPage() {
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 h-screen flex flex-col px-10 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 flex-col">
                    <span className="flex justify-start">
                        <span className="flex h-9 min-w-25 px-2 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer"><CustomSelect defaultValue="Category" options={[{ value: 'Science', label: 'Science' }, { value: 'Storybook', label: 'Storybook' }, { value: 'Novel', label: 'Novel' }]}></CustomSelect></span>
                    </span>
                    {/* Search Container */}
                    <div className="w-full h-fit flex flex-col mt-5 text-gray-300 text-sm">
                        <span className="w-full px-5 flex justify-start items-center">
                            <span className="flex justify-start w-3/10"><p>Title</p></span>
                            <span className="flex justify-center w-25"><p>Rating</p></span>
                            <span className="flex justify-center w-3/10"><p>Category</p></span>
                            <span className="flex justify-start"></span>
                        </span>
                        <div className="w-full h-fit flex flex-col">
                            <SearchElement></SearchElement>
                            <SearchElement></SearchElement>
                            <SearchElement></SearchElement>
                            <SearchElement></SearchElement>
                        </div>

                    </div>
                </div>
            </div>
        </div>)
}


export default SearchPage