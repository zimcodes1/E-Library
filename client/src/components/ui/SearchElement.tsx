import truncate from "../../utils/truncateText"
const SearchElement = ({ bookImage, bookDetails }: { bookImage: string, bookDetails?: { title?: string, author?: string, rating?: number, year?:number, category?:string } }) => {
    return (
        <div className="flex w-full h-25 bg-[#4857605a] border border-gray-700 mt-2 py-2 px-2 rounded-2xl">
            <span className="flex justify-start items-center w-3/10 max-sm:w-4/10 px-4 h-full">
                {/* Search Element Image */}
                <div className="w-20 h-full flex justify-center items-center max-sm:hidden">
                    <img src={bookImage} className="h-full w-auto" />
                </div>
                <div className="w-auto h-full p-2 max-sm:p-0">
                    <h3 className="text-sm text-gray-300 font-semibold">{truncate(bookDetails?.title, 15)}</h3>
                    <p className="text-sm text-gray-400">{bookDetails?.author}</p>
                    <p className="text-sm text-gray-400">{bookDetails?.year}</p>
                </div>
            </span>
            <span className="flex w-25 h-full justify-center items-center">
                <p><i className="fa fa-star text-amber-300"></i> {bookDetails?.rating}</p>
            </span>
            <span className="flex h-full w-3/10 max-sm:w-2/10 justify-center items-center">
                <p className="text-gray-400">{truncate(bookDetails?.category, 8)}</p>
            </span>
            <span className="flex w-3/10 max-sm:w-fit h-full justify-between items-center">
                <i className="fa fa-bookmark cursor-pointer text-xl"></i>
                <button className="w-auto max-sm:hidden h-fit text-red-500 border-2 border-red-500 rounded-xl text-sm px-6 py-1.5 cursor-pointer hover:text-gray-50 hover:bg-red-500 ">View</button>
            </span>

        </div>
    )
}


export default SearchElement