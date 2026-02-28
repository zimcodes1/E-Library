import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import BookItem from "../components/BookItem"
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "../utils/auth";

function HomePage() {
    const [user, setUser] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('No books available');
    
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
        }
    }, []);

    return (
        <div className="w-full flex justify-end max-sm:items-start items-center bgImage min-h-screen max-sm:h-fit pb-10">
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-8/9 max-[900px]:px-3 max-sm:w-full max-sm:px-3 h-full max-sm:h-fit flex flex-col px-10 pt-5 max-[900px]:pt-0 relative">
                <TopBar />
                <div className="w-full h-full flex mt-15 max-[900px]:mt-0 max-sm:mt-3 flex-col">
                    <div className="w-full h-45 flex max-sm:h-fit max-sm:flex-col justify-between items-center">
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <p className="text-sm">Quote section - API integration pending</p>
                        </div>
                    </div>
                    <h1 className="text-2xl max-sm:text-xl font-semibold text-gray-300 mt-3 mb-2">
                        Good {HourTime}{user ? `, ${user.username}` : ''}
                    </h1>
                    <div className="w-full h-150 max-sm:h-fit flex flex-col">
                        <span className="flex justify-between items-center text-gray-500 max-sm:text-sm">
                            <h3>Recommended for you</h3>
                        </span>
                        <div className="w-full h-fit mt-2 flex flex-col">
                            {loading ? (
                                <div className="w-full h-44 flex justify-center items-center">
                                    <p className="text-gray-400 text-lg">Loading books...</p>
                                </div>
                            ) : books.length === 0 ? (
                                <div className="w-full h-44 flex flex-col justify-center items-center">
                                    <i className="fa fa-book text-5xl text-gray-600 mb-3"></i>
                                    <p className="text-gray-400 text-lg">{error}</p>
                                    <p className="text-gray-500 text-sm mt-2">Check your connection or try again later</p>
                                </div>
                            ) : (
                                <div className={`w-full ${containerHeight[0]} overflow-hidden flex justify-evenly flex-wrap gap-3 max-[900px]:gap-2 max-sm:gap-1 transition-all duration-300`}>
                                    {books.map((book) => (
                                        <BookItem 
                                            key={book.id}
                                            bookImage={book.cover_image} 
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