import BookItem from "./BookItem"

const ShelveItem = () => {
    return (
        <div className="flex justify-between items-center 2/10 h-fit p-2 rounded-2xl bg-[#4857600f] border border-gray-700">
            <BookItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></BookItem>
            <span className="flex w-27 h-40 flex-col items-center justify-between text-gray-400 relative">
                <i className="fa fa-close text-red-400 absolute -top-2 right-1 cursor-pointer"></i>
                <span>
                    <p className="text-sm text-gray-300 mt-3">Last Read <i className="fa fa-eye"></i></p>
                    <p className="text-xs">05-01-2026</p>
                    <p className="text-sm text-gray-300 mt-2">Total <i className="fa fa-clock"></i> </p>
                    <p className="text-xs">1hr 32 Min</p>
                </span>
                <span className="flex flex-col items-center">
                    <button className="text-xs cursor-pointer bg-red-400 p-2 mb-1 rounded-lg text-gray-50 w-9/10">Download</button>
                    <button className="text-[10px] p-1 cursor-pointer">Continue Reading</button>
                </span>
            </span>
        </div>
    )
}

export default ShelveItem