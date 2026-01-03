

function NewTitles() {
    return (
        <div className="flex flex-col justify-between items-center mt-10">
            <h1 className="text-3xl max-[900px]:text-2xl text-gray-400 font-semibold mb-5">New Titles</h1>
            <div className="flex max-sm:flex-wrap gap-5 justify-evenly items-center w-full h-fit max-sm:py-5">
                <div className="hover:scale-105 transition duration-300 w-1/4 h-fit flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                </div>
            </div>
        </div>
    )
}

export default NewTitles