import truncate from "../../truncateText"
import { Link } from "react-router-dom"

function NewTitleItem({ bookImage, bookDetails }: { bookImage: string, bookDetails?: { title?: string, author?: string, rating?: number, year?:number } }) {
    let bookTitle = bookDetails?.title
    if (bookDetails?.title !== undefined) {
        return (
            <div className="hover:scale-105 transition duration-300 w-1/4 max-sm:w-full h-90 flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                <span className="flex w-fit mx-auto h-7/11"><img src={bookImage} className="h-full w-auto" alt="Addict" /></span>
                <h3 className="text-lg text-gray-400 mt-5">{truncate(bookTitle, 24)}</h3>
                <p className="text-sm text-gray-400 mt-2">Story Book</p>
                <p className="text-sm text-gray-400">{bookDetails.author}, {bookDetails.year}</p>
                <p className="text-sm text-gray-400">Rating: {bookDetails.rating} <i className="fa fa-star text-amber-300"></i> </p>
                <i className="fa fa-bookmark absolute text-2xl text-[#6842ae3a] right-5 bottom-5 cursor-pointer p-2 rounded-full"></i>
            </div>
        )
    }
}

function NewTitles() {
    return (
        <div className="flex flex-col justify-between items-center mt-20 max-sm:mt-5">
            <h1 className="text-3xl max-[900px]:text-2xl text-gray-400 font-semibold">New Titles</h1>
            <div className="flex max-sm:flex-col gap-5 mt-20 max-sm:mt-5 justify-evenly items-center w-full h-fit max-sm:py-5">
                <NewTitleItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></NewTitleItem>
                <NewTitleItem bookImage="/images/books/rc_cars.png" bookDetails={{ title: 'Your Guide To RC Cars', author: 'David Doe', year: 2025, rating: 4.9 }}></NewTitleItem>
                <NewTitleItem bookImage="/images/books/books.jpeg" bookDetails={{ title: 'Two Boy Gold Miners', author: 'Azimeh Doe', year: 2005, rating: 3.9 }}></NewTitleItem>
                <NewTitleItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></NewTitleItem>
            </div>
            <Link to='/home' className="text-gray-400 text-sm mt-5">View More</Link>
        </div>
    )
}

export default NewTitles