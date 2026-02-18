
function HeroRight() {
    return (
        <div className="w-1/2 max-[900px]:w-full h-fit flex justify-center items-center relative">
            <div className="relative w-full max-w-md aspect-square flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
                <img src="/images/book_image.png" alt="Hero Image" className="relative w-4/5 max-sm:w-2/3 h-auto drop-shadow-2xl" />
            </div>
        </div>
    )
}

export default HeroRight;