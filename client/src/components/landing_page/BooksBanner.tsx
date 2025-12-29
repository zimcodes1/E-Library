
function BooksBanner() {
    return (
        <>
            <h1 className="text-5xl max-[900px]:text-4xl text-purple-950 font-semibold mt-10 max-sm:mt-10 text-center yusei-magic-regular">Discover a world of knowledge!</h1>    
            <div className="w-[80%] max-sm:w-full shadow-xl shadow-purple-200 mx-auto h-120  max-[900px]:h-fit max-[900px]:w-full rounded-3xl flex justify-center items-center mt-10 mb-10 overflow-hidden">
                <img src="/images/books_banner.jpg" alt="Books Banner" className="w-full h-auto object-contain rounded-3xl"/>
            </div>
        </>
    )
}

export default BooksBanner;