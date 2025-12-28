
function BooksBanner() {
    return (
        <>
            <h1 className="text-5xl text-purple-950 font-semibold mt-20 text-center">Discover a world of knowledge!</h1>    
            <div className="w-[80%] shadow-xl shadow-purple-200 mx-auto h-120 rounded-3xl flex justify-center items-center mt-10 mb-10 overflow-hidden">
                <img src="/images/books_banner.jpg" alt="Books Banner" className="w-full h-auto object-contain rounded-3xl"/>
            </div>
        </>
    )
}

export default BooksBanner;