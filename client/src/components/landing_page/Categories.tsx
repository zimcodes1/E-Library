import Button from "../ui/Button"

function Categories() {
    return (
        <div className="flex flex-col justify-between items-center mt-20 max-sm:mt-5">
            <h1 className="text-3xl max-sm:text-xl max-[900px]:text-2xl text-gray-400 font-semibold">Books Of Different Categories</h1>
            <div className="flex max-sm:flex-wrap gap-5 mt-20 max-sm:mt-5 max-sm:flex-col justify-evenly items-center w-full h-fit max-sm:py-5">
                <div className="hover:scale-105 transition duration-300 w-1/4 max-sm:w-full max-sm:mt-3 h-fit flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                    <h2 className="text-gray-100 text-2xl font-semibold"> <i className="fas fa-wand-magic-sparkles text-amber-300"></i> Story Books</h2>
                    <p className="text-sm text-gray-400 leading-relaxed my-5">Dive into a world of imagination and wonder. From whimsical bedtime stories to vibrant fables, these collections are crafted to spark creativity and bring joy to readers young and old.</p>
                    <Button text="Search Category"></Button>
                </div>
                <div className="hover:scale-105 transition duration-300 w-1/4 max-sm:w-full max-sm:mt-3 h-fit flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                    <h2 className="text-gray-100 text-2xl font-semibold"> <i className="fas fa-book-open"></i> Novels</h2>
                    <p className="text-sm text-gray-400 leading-relaxed my-5">Explore deep narratives and complex characters. Whether you crave gripping thrillers, heartfelt romances, or epic dramas, our novels offer a profound escape into the art of storytelling.</p>
                    <Button text="Search Category"></Button>
                </div>
                <div className="hover:scale-105 transition duration-300 w-1/4 max-sm:w-full max-sm:mt-3 h-fit flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                    <h2 className="text-gray-100 text-2xl font-semibold"> <i className="fas fa-landmark text-green-300"></i> Documentary</h2>
                    <p className="text-sm text-gray-400 leading-relaxed my-5">Journey through time with meticulously researched accounts of human heritage. Discover the true stories, pivotal moments, and remarkable figures that have shaped our global landscape.</p>
                    <Button text="Search Category"></Button>
                </div>
                <div className="hover:scale-105 transition duration-300 w-1/4 max-sm:w-full max-sm:mt-3 h-fit flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800">
                    <h2 className="text-gray-100 text-2xl font-semibold"> <i className="fas fa-microscope text-blue-500"></i> Educational</h2>
                    <p className="text-sm text-gray-400 leading-relaxed my-5">Journey through time with meticulously researched accounts of human heritage. Discover the true stories, pivotal moments, and remarkable figures that have shaped our global landscape.</p>
                    <Button text="Search Category"></Button>
                </div>
            </div>
        </div>
    )
}

export default Categories