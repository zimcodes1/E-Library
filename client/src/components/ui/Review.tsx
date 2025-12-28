
function Review({text, userName, userImage}: {text?: string, userName?: string, userImage?: string}) {
    return (
            <div className="w-[30%] h-80 flex flex-col justify-end items-center relative">
                <img src={userImage || "/images/avatar2.png"} className="h-1/3 w-auto absolute top-0 z-10" alt={userName} />
                <div className="w-full h-4/5 bg-linear-to-r from-[#0479c7] to-[#561ac5] rounded-full pt-15 flex flex-col justify-end items-center px-2 pb-10">
                    <p className="text-white text-center text-sm px-3">{text}</p>
                    <h3 className="text-white text-center font-semibold text-sm">~ {userName || "Anonymous"}</h3>
                </div>
        </div>
    )
}
export default Review;