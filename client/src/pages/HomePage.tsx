import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import BookItem from "../components/BookItem"
import { useState } from "react";

function HomePage() {
    let hour = new Date().getHours();
    const [HourTime, setHourTime] = useState(()=>{
        if (hour > 11) return 'Afternoon'
        else if (hour > 16) return 'Evening'
        else return 'Morning'
    })
    return (
        <div className="w-full flex justify-end items-center bg-purple-100 min-h-screen pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 h-full flex flex-col px-10 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 flex-col">
                    {/* Today's Quote and New arrivals Section */}
                    <div className="w-full h-40 flex justify-between items-center">
                        {/* Today's Quotes */}
                        <div className="w-4/10 h-full flex rounded-xl bg-linear-to-br to-purple-900 from-[#b30220] shadow-md shadow-purple-300">
                            <span className="w-full h-full flex flex-col p-5">
                                <h1 className="text-lg text-gray-50 font-semibold">Today's Quote</h1>
                                <p className="text-gray-100 text-sm my-3">'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ab, labore cumque corrupti quae et.'</p>
                                <p className="text-sm text-gray-50 ml-auto">~ John Doe</p>
                                <span className="flex justify-start items-center gap-1">
                                    <span className="flex w-2 h-2 rounded-full bg-amber-50 border border-gray-50"></span>
                                    <span className="flex w-2 h-2 rounded-full border border-gray-50"></span>
                                    <span className="flex w-2 h-2 rounded-full border border-gray-50"></span>
                                    <span className="flex w-2 h-2 rounded-full border border-gray-50"></span>
                                </span>
                            </span>
                        </div>
                        {/* New Arrivals */}
                        <div className="w-[57%] h-full bg-white flex justify-between rounded-xl border border-purple-500 overflow-hidden">
                            <div className="w-1/13 h-full flex justify-center items-center bg-linear-to-b rounded-l-lg to-purple-900 from-[#b30220]">
                                <p className="text-gray-50 text-sm -rotate-90 text-nowrap font-medium">New Arrivals</p>
                            </div>
                            <div className="w-12/13 py-2 px-2 h-full flex justify-start gap-7 overflow-hidden flex-row">
                                <BookItem bookImage="/images/books/addict.jpeg"></BookItem>
                                <BookItem bookImage="/images/books/google_adsense.png"></BookItem>
                                <BookItem bookImage="/images/books/rc_cars.png"></BookItem>
                                <BookItem bookImage="/images/books/book2.png"></BookItem>
                                <BookItem bookImage="/images/books/books.jpeg"></BookItem>
                                <BookItem bookImage="/images/books/energy_hacks.png"></BookItem>
                                <BookItem bookImage="/images/books/audience.png"></BookItem>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800 mt-3 mb-2">Good {HourTime}</h1>
                    <div className="w-full h-150 flex flex-col">
                        <span className="flex justify-between items-center text-gray-600">
                            <h3>Recommended for you</h3>
                            <p className="cursor-pointer text-sm"> <i className="fa fa-plus"></i> Show More</p>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            <div className="w-full h-40 flex justify-between">
                                <BookItem bookImage="/images/books/audience.png" bookDetails={{ title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3 }}></BookItem>
                                <BookItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></BookItem>
                                <BookItem bookImage="/images/books/rc_cars.png" bookDetails={{ title: 'Your Guide To RC Cars', author: 'David Doe', year: 2025, rating: 4.9 }}></BookItem>
                                <BookItem bookImage="/images/books/book2.png" bookDetails={{ title: 'Web Traffic Explosion', author: 'Jane Doe', year: 2021, rating: 3.2 }}></BookItem>
                                <BookItem bookImage="/images/books/books.jpeg" bookDetails={{ title: 'Two Boy Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9 }}></BookItem>
                                <BookItem bookImage="/images/books/energy_hacks.png" bookDetails={{ title: 'Top 10 Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 }}></BookItem>
                                <BookItem bookImage="/images/books/audience.png" bookDetails={{ title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3 }}></BookItem>
                                <BookItem bookImage="/images/books/books.jpeg" bookDetails={{ title: 'Two Boy Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9 }}></BookItem>
                                <BookItem bookImage="/images/books/energy_hacks.png" bookDetails={{ title: 'Top 10 Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 }}></BookItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage