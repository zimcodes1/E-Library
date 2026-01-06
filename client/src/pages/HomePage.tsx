import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import BookItem from "../components/BookItem"
import { useState } from "react";
import TodayQuotes from "../components/ui/TodayQuote";

function HomePage() {
    let hour = new Date().getHours();
    const [HourTime, setHourTime] = useState(() => {
        if (hour > 11) return 'Afternoon'
        else if (hour > 16) return 'Evening'
        else return 'Morning'
    })
    setHourTime
    const [containerHeight, setContainerHeight] = useState(['h-44', 'Show More', 'fa-plus']);
    //Quotes data
    interface Quote {
        text: string;
        author: string;
    }
    const data: Quote[] = [
        { text: "Knowledge is power.", author: "Francis Bacon" },
        { text: "The only constant is change.", author: "Heraclitus" },
        { text: "Keep it simple, stupid.", author: "Kelly Johnson" },
        { text: "Time is money.", author: "Benjamin Franklin" },
    ];

    return (
        <div className="w-full flex justify-end items-center bgImage min-h-dvh max-h-fit pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 h-full flex flex-col px-10 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 flex-col">
                    {/* Today's Quote and New arrivals Section */}
                    <div className="w-full h-40 flex justify-between items-center">
                        <TodayQuotes quotes={data}></TodayQuotes>
                        {/* New Arrivals */}
                        <div className="w-[57%] h-full bg-transparent border border-gray-700 flex justify-between rounded-xl overflow-hidden">
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
                    <h1 className="text-2xl font-semibold text-gray-300 mt-3 mb-2">Good {HourTime}</h1>
                    <div className="w-full h-150 flex flex-col">
                        <span className="flex justify-between items-center text-gray-500">
                            <h3>Recommended for you</h3>
                            <p className="cursor-pointer text-sm" onClick={() => { (containerHeight[0] == 'h-44') ? setContainerHeight(['h-fit', 'Show Less', 'fa-minus']) : setContainerHeight(['h-44', 'Show More', 'fa-plus']) }}> <i className={`fa ${containerHeight[2]}`}></i> {containerHeight[1]}</p>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            <div className={`w-full ${containerHeight[0]} overflow-hidden flex justify-start flex-wrap gap-3 transition-all duration-300`}>
                                <BookItem bookImage="/images/books/audience.png" bookDetails={{ title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3 }}></BookItem>
                                <BookItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></BookItem>
                                <BookItem bookImage="/images/books/rc_cars.png" bookDetails={{ title: 'Your Guide To RC Cars', author: 'David Doe', year: 2025, rating: 4.9 }}></BookItem>
                                <BookItem bookImage="/images/books/book2.png" bookDetails={{ title: 'Web Traffic Explosion', author: 'Jane Doe', year: 2021, rating: 3.2 }}></BookItem>
                                <BookItem bookImage="/images/books/books.jpeg" bookDetails={{ title: 'Two Boy Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9 }}></BookItem>
                                <BookItem bookImage="/images/books/energy_hacks.png" bookDetails={{ title: 'Top 10 Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 }}></BookItem>
                                <BookItem bookImage="/images/books/audience.png" bookDetails={{ title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3 }}></BookItem>
                                <BookItem bookImage="/images/books/books.jpeg" bookDetails={{ title: 'Two Boy Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9 }}></BookItem>
                                <BookItem bookImage="/images/books/energy_hacks.png" bookDetails={{ title: 'Top 10 Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 }}></BookItem>
                                {/* Overflowing Elements */}
                                <BookItem bookImage="/images/books/energy_hacks.png" bookDetails={{ title: 'Top 10 Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 }}></BookItem>
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

                        {/* Recent Readings */}
                        <span className="flex justify-between items-center text-gray-500 mt-4">
                            <h3>Recent Readings</h3>
                            <p className="cursor-pointer text-sm"><i className='fa fa-plus'></i> Show More</p>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            <div className='w-full overflow-hidden flex justify-between flex-wrap gap-2 transition-all duration-300'>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage