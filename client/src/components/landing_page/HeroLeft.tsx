import Button from "../ui/Button";
function HeroLeft() {
    return (
        <div className="w-1/2 max-sm:w-full h-full max-sm:h-fit max-sm:pt-15 flex flex-col justify-center items-start">
            <h1 className="yusei-magic-regular text-6xl max-[900px]:text-4xl text-purple-950 font-semibold leading-snug">Experience the Freedom of a Boundless Library</h1>
            <p className="text-gray-800 text-md">Access Thousands of Books and Resources From the Comfort of Your Device.</p>
            {/* Quick Search */}
            <div className="w-100 max-sm:w-90 max-sm:mx-auto h-15 bg-white border-pink-200 flex justify-between items-center rounded-2xl shadow-xl mt-4">
                <input type="text" placeholder="Search for a book..." className="w-[80%] h-full pl-4 rounded-l-2xl outline-0 focus:ring-0 caret-purple-800" />
                <span className="w-[20%] bg-purple-950 h-full flex justify-center items-center rounded-r-2xl cursor-pointer"><i className="fa fa-search text-gray-50 text-2xl"></i></span>
            </div>

            {/* Get Started Button */}
            <Button text="Get Started" styles="max-sm:mx-auto mt-5"></Button>
            
        </div>
    )
}

export default HeroLeft;