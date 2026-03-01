import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "../utils/auth";
import { getTodayQuote, getNewArrivals } from "../utils/books/bookService";
import { getBookCoverUrl } from "../utils/imageUtils";
import TodayQuotes from "../components/ui/TodayQuote";
import NewArrivals from "../components/ui/NewArrivals";

function HomePage() {
    const [user, setUser] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [quotes, setQuotes] = useState<any[]>([]);
    
    let hour = new Date().getHours();
    const [HourTime] = useState(() => {
        if (hour > 11){
            if(hour >15){
                return 'Evening'
            }
            else return 'Afternoon'
        }
        else return 'Morning'
    })
    
    const [containerHeight, setContainerHeight] = useState(['h-44', 'Show More', 'fa-plus']);

    useEffect(() => {
        if (isAuthenticated()) {
            setUser(getUser());
            loadNewArrivals();
        }
        loadQuote();
    }, []);

    const loadQuote = async () => {
        try {
            const data = await getTodayQuote();
            setQuotes(data);
        } catch (err) {
            console.error('Failed to load quote:', err);
        }
    };

    const loadNewArrivals = async () => {
        setLoading(true);
        try {
            const data = await getNewArrivals();
            setBooks(data);
        } catch (err) {
            console.error('Failed to load new arrivals:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-end max-sm:items-start items-center bgImage min-h-screen max-sm:h-fit pb-10">
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-8/9 max-[900px]:px-3 max-sm:w-full max-sm:px-3 h-full max-sm:h-fit flex flex-col px-10 pt-5 max-[900px]:pt-0 relative">
                <TopBar />
                <div className="w-full h-full flex mt-15 max-[900px]:mt-0 max-sm:mt-3 flex-col">
                    <div className="w-full h-45 flex max-sm:h-fit max-sm:flex-col-reverse justify-between items-center gap-3">
                        <NewArrivals 
                            books={books.map(book => ({
                                id: book.id,
                                bookImage: getBookCoverUrl(book.cover_image),
                                bookDetails: {
                                    title: book.title,
                                    author: book.author,
                                    year: book.publication_year,
                                    rating: book.average_rating
                                }
                            }))}
                        />
                        <TodayQuotes quotes={quotes} />
                    </div>
                    <h1 className="text-2xl max-sm:text-xl font-semibold text-gray-300 mt-3 mb-2">
                        Good {HourTime}{user ? `, ${user.username}` : ''}
                    </h1>
                    <div className="w-full h-150 max-sm:h-fit flex flex-col">
                        <span className="flex justify-between items-center text-gray-500 mt-4">
                            <h3 className="text-sm">Recent Readings</h3>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            <div className='w-full overflow-hidden flex justify-center items-center py-5 flex-wrap gap-2 transition-all duration-300'>
                                <p className="text-gray-500 text-sm">No recent readings</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage