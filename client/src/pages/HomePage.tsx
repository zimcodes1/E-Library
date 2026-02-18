import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import BookItem from "../components/BookItem"
import { useState } from "react";
import TodayQuotes from "../components/ui/TodayQuote";
import NewArrivals from "../components/ui/NewArrivals";

function HomePage() {
    let hour = new Date().getHours();
    const [HourTime, setHourTime] = useState(() => {
        if (hour > 11){
            if(hour >15){
                return 'Evening'
            }
            else return 'Afternoon'
        }
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

    //New Arrival Books
    const arrivalBooks = [
        { id: 1, bookImage: "/images/books/addict.jpeg", bookDetails: { title: 'Addict', author: 'John Doe', year: 2020, rating: 4.5 } },
        { id: 2, bookImage: "/images/books/google_adsense.png", bookDetails: { title: 'Google Adsense', author: 'Jane Doe', year: 2015, rating: 3.9 } },
        { id: 3, bookImage: "/images/books/audience.png", bookDetails: { title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3 } },
        { id: 4, bookImage: "/images/books/rc_cars.png", bookDetails: { title: 'RC Cars Guide', author: 'David Doe', year: 2025, rating: 4.9 } },
        { id: 5, bookImage: "/images/books/book2.png", bookDetails: { title: 'Web Traffic', author: 'Jane Doe', year: 2021, rating: 3.2 } },
        { id: 6, bookImage: "/images/books/books.jpeg", bookDetails: { title: 'Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9 } },
        { id: 7, bookImage: "/images/books/energy_hacks.png", bookDetails: { title: 'Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 } },
        { id: 8, bookImage: "/images/books/addict.jpeg", bookDetails: { title: 'Addict', author: 'John Doe', year: 2020, rating: 4.5 } },
        { id: 9, bookImage: "/images/books/google_adsense.png", bookDetails: { title: 'Google Adsense', author: 'Jane Doe', year: 2015, rating: 3.9 } },
        { id: 10, bookImage: "/images/books/audience.png", bookDetails: { title: 'Influencing Marketing', author: 'John Doe', year: 2000, rating: 4.3 } },
    ];
    return (
        <div className="w-full flex justify-end max-sm:items-start items-center bgImage min-h-screen max-sm:h-fit pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-8/9 max-[900px]:px-3 max-sm:w-full max-sm:px-3 h-full max-sm:h-fit flex flex-col px-10 pt-5 max-[900px]:pt-0 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 max-[900px]:mt-0 max-sm:mt-3 flex-col">
                    {/* Today's Quote and New arrivals Section */}
                    <div className="w-full h-45 flex max-sm:h-fit max-sm:flex-col justify-between items-center">
                        <TodayQuotes quotes={data}></TodayQuotes>
                        {/* New Arrivals */}
                        <NewArrivals books={arrivalBooks}></NewArrivals>
                    </div>
                    <h1 className="text-2xl max-sm:text-xl font-semibold text-gray-300 mt-3 mb-2">Good {HourTime}</h1>
                    <div className="w-full h-150 max-sm:h-fit flex flex-col">
                        <span className="flex justify-between items-center text-gray-500 max-sm:text-sm">
                            <h3>Recommended for you</h3>
                            <p className="cursor-pointer text-sm" onClick={() => { (containerHeight[0] == 'h-44') ? setContainerHeight(['h-fit', 'Show Less', 'fa-minus']) : setContainerHeight(['h-44', 'Show More', 'fa-plus']) }}> <i className={`fa ${containerHeight[2]}`}></i> {containerHeight[1]}</p>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            <div className={`w-full ${containerHeight[0]} overflow-hidden flex justify-start flex-wrap gap-3 max-[900px]:gap-2 max-sm:gap-1 transition-all duration-300`}>
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
                            <h3 className="text-sm">Recent Readings</h3>
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