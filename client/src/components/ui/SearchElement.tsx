import Button from "./Button"

const SearchElement = () => {
    return (
        <div className="flex w-full h-25 bg-[#4857605a] border border-gray-700 mt-2 py-2 rounded-2xl">
            <span className="flex justify-start items-center w-3/10 px-4 h-full">
                {/* Search Element Image */}
                <div className="w-20 h-full flex justify-center items-center">
                    <img src="/images/books/steve_jobs.png" className="h-full w-auto" />
                </div>
                <div className="w-auto h-full p-2">
                    <h3 className="text-sm text-gray-300 font-semibold">How Steve Jobs Changed</h3>
                    <p className="text-sm text-gray-400">John Doe</p>
                    <p className="text-sm text-gray-400">2034</p>
                </div>
            </span>
            <span className="flex w-25 h-full justify-center items-center">
                <p><i className="fa fa-star text-amber-300"></i> 4.3</p>
            </span>
            <span className="flex h-full w-3/10 justify-center items-center">
                <p className="text-gray-400">Computer Science</p>
            </span>
            <span className="flex w-3/10 h-full justify-between items-center">
                <i className="fa fa-bookmark cursor-pointer text-xl"></i>
                <Button text="View" styles="rounded-xl py-1"></Button>
            </span>

        </div>
    )
}


export default SearchElement