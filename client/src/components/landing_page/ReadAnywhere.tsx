function ReadAnywhere() {
    return (
        <div className="flex flex-col justify-between items-center mt-20 max-sm:mt-5 px-4 max-sm:px-0">
            <h1 className="text-3xl max-[900px]:text-2xl max-sm:text-xl text-gray-400 font-semibold">Read Anywhere</h1>

            <div className="flex max-sm:flex-wrap justify-between items-center w-full mt-20 max-sm:mt-0 h-fit max-sm:py-5 flex-wrap gap-y-5">
                {/* Left Side: Image */}
                <div className="w-1/2 max-sm:w-full flex justify-center items-center h-100">
                    <img src="/images/reading.png" alt="Read from any location" className="max-h-100 object-contain" />
                </div>

                {/* Right Side: Content Container */}
                <div className="w-1/2 max-sm:w-full flex flex-col justify-center items-start h-100 max-sm:h-fit bg-[#48576019] rounded-3xl border border-gray-800 p-10 max-sm:p-5 backdrop-blur-xl">
                    <span className="text-[#6842ae] font-bold uppercase tracking-widest text-sm mb-4">Seamless Experience</span>
                    <h2 className="text-gray-50 text-2xl max-[900px]:text-2xl font-bold mb-6">Your Library, Always in Your Pocket</h2>
                    
                    <p className="text-gray-400 text-lg max-[900px]:text-base leading-relaxed mb-6">
                        Whether you are commuting to work, relaxing in a park, or traveling across the globe, your favorite books are just a tap away. Our app syncs your progress across all devices automatically.
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <i className="fa fa-check-circle text-[#6842ae]"></i>
                            <span className="text-gray-300">Offline reading mode for travelers</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa fa-check-circle text-[#6842ae]"></i>
                            <span className="text-gray-300">Real-time cross-device syncing</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa fa-check-circle text-[#6842ae]"></i>
                            <span className="text-gray-300">Lightweight and battery-efficient</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadAnywhere;