import truncate from "../truncateText"


function BookItem({ bookImage, bookDetails }: { bookImage: string, bookDetails?: { title?: string, author?: string, rating?: number, year?:number } }) {
    let bookTitle = bookDetails?.title
    if (bookDetails?.title !== undefined) {
        return (
            <div className="w-27 my-2 shrink-0 h-40 flex flex-col justify-start items-start p-2 bg-[#4857605a] border border-gray-700 rounded-2xl cursor-pointer overflow-hidden" title={bookTitle}>
                <span className="flex w-fit mx-auto h-7/11"><img src={bookImage} className="h-full w-auto" alt="Addict" /></span>
                <h3 className="text-xs text-gray-300 mt-1.5">{truncate(bookTitle, 12)}</h3>
                <p className="text-[10px] text-gray-300">{bookDetails.author}, {bookDetails.year}</p>
                <p className="text-[10px] text-gray-300"><i className="fa fa-star text-amber-300"></i> {bookDetails.rating}</p>
            </div>
        )
    }
    else return (
        <div className="w-27 shrink-0 h-full flex justify-center items-center p-2 bg-[#4857605a] border border-gray-700 rounded-2xl cursor-pointer overflow-hidden">
            <span className="flex w-full h-full rounded-2xl"><img src={bookImage} className="h-full w-auto" alt="Addict" /></span>
        </div>
    )
}

export default BookItem