
interface ReviewProps {
    text?: string;
    userName?: string;
    userImage?: string;
    rating?: number;
}

function Review({ text, userName, userImage, rating = 5 }: ReviewProps) {
    return (
        <div className="w-[30%] max-[900px]:w-[48%] max-sm:w-full mt-10 flex flex-col items-center relative">
            {/* User Avatar overlapping the top */}
            <div className="w-20 h-20 rounded-full border-2 border-purple-500 bg-[#060410] p-1 flex justify-center items-center absolute -top-10 z-10 shadow-lg shadow-purple-500/20">
                <img 
                    src={userImage || "/images/avatar2.png"} 
                    className="w-full h-full rounded-full object-cover animate-pulse-slow" 
                    alt={userName || "User Avatar"} 
                />
            </div>
            
            {/* Card Body */}
            <div className="w-full pt-14 pb-8 px-6 rounded-3xl backdrop-blur-md bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/25 shadow-xl transition-all duration-300 flex flex-col items-center relative hover:-translate-y-1">
                {/* Quote Icon */}
                <i className="fa fa-quote-left text-purple-500/20 text-3xl absolute top-6 left-6 pointer-events-none"></i>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <i 
                            key={i} 
                            className={`fa fa-star text-sm ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}
                        ></i>
                    ))}
                </div>
                
                {/* Review Text */}
                <p className="text-gray-300 text-center text-sm leading-relaxed mb-6 italic px-2">
                    "{text}"
                </p>
                
                {/* User Info */}
                <h3 className="text-white text-center font-bold text-sm tracking-wider uppercase">
                    {userName || "Anonymous"}
                </h3>
                <span className="text-xs text-purple-400/80 mt-1 font-medium">Verified Reader</span>
            </div>
        </div>
    );
}

export default Review;