import Button from "../ui/Button";
function HeroLeft() {
    return (
        <div className="w-full py-10 mt-20 max-sm:mt-10 max-sm:w-full h-full max-sm:h-fit max-sm:pt-15 flex flex-col justify-center items-center">
            <h1 className="font-[Super] text-5xl text-center max-[900px]:text-4xl text-blue-50 font-semibold mx-auto">Experience the Freedom of <br /> a <span className="gradient">Boundless</span> Library</h1>
            <p className="text-gray-400 text-md mt-5 max-sm:text-center">Access Thousands of Books and Resources From the Comfort of Your Device.</p>
            {/* Quick Search */}
            <div className="w-100 max-sm:w-90 max-sm:mx-auto h-13 border border-gray-700 flex justify-between items-center rounded-3xl shadow-xl mt-4 p-1">
                <input type="text" placeholder="Search for a book..." className="w-[85%] h-full pl-4 rounded-l-2xl outline-0 focus:ring-0 caret-purple-800 text-gray-200" />
                <span className="w-13 bg-purple-50 h-full flex justify-center items-center rounded-full cursor-pointer"><i className="fa fa-search text-gray-800 text-lg"></i></span>
            </div>

            {/* Get Started Button */}
            <span className="flex justify-between items-center gap-2 mt-5">
                <Button text="Get Started" styles="max-sm:mx-auto"></Button>
                <Button text="Guest" styles="bg-linear-to-r from-purple-600 to-purple-400 text-gray-50 border-none"></Button>
            </span>

        </div>
    )
}

export default HeroLeft;