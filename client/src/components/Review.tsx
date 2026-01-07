

function Review() {
    return (
        <div className="w-[48%] h-full flex flex-col p-5 bg-[#48576019] border border-gray-700 rounded-2xl">
            <div className="w-full h-3/10 flex justify-between text-gray-400 items-center">
                <span className="flex justify-start items-center">
                    <span className="flex h-8 w-8 rounded-full overflow-hidden justify-start">
                        <img src="/images/user.jpg" className="w-full" alt="" />
                    </span>
                    <h3 className="ml-2 font-semibold">Azimeh Nasara Obadiah</h3>
                </span>
                <span className="text-amber-300">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half"></i>
                </span>
            </div>
            <div className="w-full h-7/10 flex flex-col items-center justify-center text-gray-400 text-sm">
                <p className="text-center"><i className="text-xl">"</i>Hello, this book is truly educative and informative, i learnt alot and i recommend the same for others. Thanks. <i className="text-xl">"</i></p>
                <p className="mt-3 text-xs">07-01-2026</p>
            </div>
        </div>
    )
}

export default Review