import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import CustomSelect from "../components/ui/CustomSelect"
import SearchElement from "../components/ui/SearchElement"
import { useEffect } from "react"

function SearchPage() {
    useEffect(()=>{
        document.title = 'Search | Libronet'
    }, [])
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-40">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-sm:w-full min-h-screen flex flex-col px-10 max-sm:px-3 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full max-sm:h-fit flex mt-15 max-sm:mt-3 flex-col">
                    {/* Search Input for small screen devices */}
                    <div className="hidden max-sm:flex w-full bg-[#4857605a] h-13 rounded-3xl justify-between items-center overflow-hidden pr-2 border border-gray-700">
                        <input type="text" placeholder="Search a book..." className="w-9/10 h-full ring-0 outline-0 border-0 pl-4 text-gray-300" />
                        <span className="p-2 rounded-full bg-gray-300"><i className="fa fa-search text-xl text-gray-800"></i></span>
                    </div>
                    <span className="flex justify-start max-sm:mt-5">
                        <span className="flex h-9 min-w-25 px-2 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer"><CustomSelect defaultValue="Category" options={[{ value: 'Science', label: 'Science' }, { value: 'Storybook', label: 'Storybook' }, { value: 'Novel', label: 'Novel' }]}></CustomSelect></span>
                    </span>
                    {/* Search Container */}
                    <div className="w-full h-fit flex flex-col mt-5 text-gray-300 text-sm">
                        <span className="w-full px-5 flex justify-start items-center">
                            <span className="flex justify-start w-3/10 max-sm:w-4/10"><p>Title</p></span>
                            <span className="flex justify-center w-25"><p>Rating</p></span>
                            <span className="flex justify-center w-3/10"><p>Category</p></span>
                            <span className="flex justify-start"></span>
                        </span>
                        <div className="w-full h-fit flex flex-col">
                            <SearchElement bookImage="/images/books/books.jpeg" bookDetails={{ title: 'Two Boy Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9, category:'Science' }}></SearchElement>
                            <SearchElement bookImage="/images/books/book2.png" bookDetails={{ title: 'Web Traffic Explosion', author: 'Jane Doe', year: 2021, rating: 3.2, category:'Technology' }}></SearchElement>
                            <SearchElement bookImage="/images/books/audience.png" bookDetails={{ title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3, category:'Business' }}></SearchElement>
                            <SearchElement bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9, category:'Technology' }}></SearchElement>

                        </div>

                    </div>
                </div>
            </div>
        </div>)
}


export default SearchPage