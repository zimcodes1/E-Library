import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import BookItem from "../components/BookItem"
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "../utils/auth";
import { getTodayQuote, getNewArrivals, getBooks, getRecentReadings } from "../utils/books/bookService";
import { getBookCoverUrl } from "../utils/imageUtils";
import TodayQuotes from "../components/ui/TodayQuote";
import NewArrivals from "../components/ui/NewArrivals";
import { Link } from "react-router-dom";

function HomePage() {
    const [user, setUser] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [recommended, setRecommended] = useState<any[]>([]);
    const [recentReadings, setRecentReadings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingRecommended, setLoadingRecommended] = useState(false);
    const [loadingRecent, setLoadingRecent] = useState(false);
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
            loadRecommended();
            loadRecentReadings();
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

    const loadRecommended = async () => {
        setLoadingRecommended(true);
        try {
            const userData = getUser();
            if (userData?.interests && userData.interests.length > 0) {
                const allBooks: any[] = [];
                for (const interest of userData.interests) {
                    const data = await getBooks({ category: interest.slug });
                    allBooks.push(...data);
                }
                const shuffled = allBooks.sort(() => Math.random() - 0.5);
                setRecommended(shuffled.slice(0, 10));
            }
        } catch (err) {
            console.error('Failed to load recommended:', err);
        } finally {
            setLoadingRecommended(false);
        }
    };

    const loadRecentReadings = async () => {
        setLoadingRecent(true);
        try {
            const data = await getRecentReadings();
            setRecentReadings(data);
        } catch (err) {
            console.error('Failed to load recent readings:', err);
        } finally {
            setLoadingRecent(false);
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
                        <span className="flex justify-between items-center text-gray-500 max-sm:text-sm">
                            <h3>Recommended for you</h3>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            {loadingRecommended ? (
                                <div className="w-full h-44 flex justify-center items-center">
                                    <p className="text-gray-400 text-lg">Loading recommendations...</p>
                                </div>
                            ) : recommended.length === 0 ? (
                                <div className="w-full h-44 flex flex-col justify-center items-center gap-3">
                                    <i className="fa fa-book-open text-5xl text-gray-600"></i>
                                    <p className="text-gray-400 text-lg">No recommendations at the moment</p>
                                    <div className="flex gap-3 text-sm">
                                        <Link to="/search" className="text-purple-400 hover:text-purple-300 transition">
                                            <i className="fa fa-search"></i> Browse Books
                                        </Link>
                                        <span className="text-gray-600">|</span>
                                        <Link to="/profile" className="text-purple-400 hover:text-purple-300 transition">
                                            <i className="fa fa-user-edit"></i> Edit Interests
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className={`w-fit ${containerHeight[0]} overflow-hidden flex justify-evenly flex-wrap gap-3 max-[900px]:gap-2 max-sm:gap-1 transition-all duration-300`}>
                                    {recommended.map((book) => (
                                        <BookItem 
                                            key={book.id}
                                            bookId={book.id}
                                            bookImage={getBookCoverUrl(book.cover_image)} 
                                            bookDetails={{ 
                                                title: book.title, 
                                                author: book.author, 
                                                year: book.publication_year, 
                                                rating: book.average_rating 
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <span className="flex justify-between items-center text-gray-500 mt-4">
                            <h3 className="text-sm">Recent Readings</h3>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            {loadingRecent ? (
                                <div className='w-full overflow-hidden flex justify-center items-center py-5'>
                                    <p className="text-gray-400 text-sm">Loading...</p>
                                </div>
                            ) : recentReadings.length === 0 ? (
                                <div className='w-full overflow-hidden flex justify-center items-center py-5'>
                                    <p className="text-gray-500 text-sm">No recent readings</p>
                                </div>
                            ) : (
                                <div className='w-full overflow-hidden flex justify-start items-center py-2 flex-wrap gap-3 max-[900px]:gap-2 max-sm:gap-1'>
                                    {recentReadings.map((book) => (
                                        <BookItem 
                                            key={book.id}
                                            bookId={book.id}
                                            bookImage={getBookCoverUrl(book.cover_image)} 
                                            bookDetails={{ 
                                                title: book.title, 
                                                author: book.author, 
                                                year: book.publication_year, 
                                                rating: book.average_rating 
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage