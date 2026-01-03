import truncate from "../../truncateText"


function NewTitleItem({ bookImage, bookDetails }: { bookImage: string, bookDetails?: { title?: string, author?: string, rating?: number, year?:number } }) {
    let bookTitle = bookDetails?.title
    if (bookDetails?.title !== undefined) {
        return (
            <div className="hover:scale-105 transition duration-300 w-1/4 h-90 flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                <span className="flex w-fit mx-auto h-7/11"><img src={bookImage} className="h-full w-auto" alt="Addict" /></span>
                <h3 className="text-lg text-gray-400 mt-10">{truncate(bookTitle, 24)}</h3>
                <p className="text-sm text-gray-400 mt-2">{bookDetails.author}, {bookDetails.year}</p>
                <p className="text-sm text-gray-400"><i className="fa fa-star text-amber-300"></i> {bookDetails.rating}</p>
            </div>
        )
    }
}

function NewTitles() {
    return (
        <div className="flex flex-col justify-between items-center mt-20">
            <h1 className="text-3xl max-[900px]:text-2xl text-gray-400 font-semibold">New Titles</h1>
            <div className="flex max-sm:flex-wrap gap-5 mt-20 justify-evenly items-center w-full h-fit max-sm:py-5">
                <NewTitleItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></NewTitleItem>
                <NewTitleItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></NewTitleItem>
                <NewTitleItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></NewTitleItem>
                <NewTitleItem bookImage="/images/books/google_adsense.png" bookDetails={{ title: 'Google Adsense explained', author: 'Jane Doe', year: 2015, rating: 3.9 }}></NewTitleItem>
            </div>
        </div>
    )
}

export default NewTitles