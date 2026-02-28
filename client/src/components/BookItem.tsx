import truncate from "../utils/truncateText"
import { getBookCoverUrl } from "../utils/imageUtils"


function BookItem({bookImage, bookDetails, customWidth }: { bookImage: string, bookDetails?: { title?: string, author?: string, rating?: number, year?:number }, customWidth?:string}) {
    let bookTitle = bookDetails?.title
    if (bookDetails?.title !== undefined) {
        return (
            <div className={`w-27 max-sm:${customWidth || 'w-[32.5%]'} my-2 max-sm:my-1 shrink-0 h-40 flex flex-col justify-start items-start p-2 bg-[#31303e6d] border border-gray-700 rounded-2xl cursor-pointer overflow-hidden hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group`} title={bookTitle}>
                <span className="flex w-fit mx-auto h-7/11 overflow-hidden rounded-lg"><img src={getBookCoverUrl(bookImage)} className="h-full w-auto group-hover:scale-105 transition-transform duration-300" alt="Book Cover" /></span>
                <h3 className="text-xs text-gray-50 font-medium mt-1.5">{truncate(bookTitle, 12)}</h3>
                <p className="text-[10px] text-gray-400">{bookDetails.author}, {bookDetails.year}</p>
                <p className="text-[10px] text-gray-300"><i className="fa fa-star text-yellow-400"></i> {bookDetails.rating}</p>
            </div>
        )
    }
    else return (
        <div className={`w-27 shrink-0 h-full flex justify-center items-center p-2 bg-[#31303e] border border-gray-700 rounded-2xl cursor-pointer overflow-hidden hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group`}>
            <span className="flex w-full h-full rounded-2xl overflow-hidden"><img src={getBookCoverUrl(bookImage)} className="h-full w-auto group-hover:scale-105 transition-transform duration-300" alt="Book Cover" /></span>
        </div>
    )
}

export default BookItem