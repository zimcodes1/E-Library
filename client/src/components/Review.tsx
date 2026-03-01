
interface ReviewProps {
  text: string;
  userName: string;
  userImage: string;
  rating?: number;
  date?: string;
}

function Review({ text, userName, userImage, rating = 5, date }: ReviewProps) {
  return (
    <div className="w-[48%] h-full max-sm:w-full max-sm:mt-2 flex flex-col p-5 bg-[#48576019] border border-gray-700 rounded-2xl">
      <div className="w-full h-3/10 flex justify-between text-gray-400 items-center">
        <span className="flex justify-start items-center">
          <span className="flex h-8 w-8 rounded-full overflow-hidden justify-start">
            <img src={userImage} className="w-full h-full object-cover" alt={userName} />
          </span>
          <h3 className="ml-2 font-semibold">{userName}</h3>
        </span>
        <span className="text-amber-300">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa fa-star${i < Math.floor(rating) ? '' : i < rating ? '-half' : '-o'}`}></i>
          ))}
        </span>
      </div>
      <div className="w-full h-7/10 flex flex-col items-center justify-center text-gray-400 text-sm">
        <p className="text-center"><i className="text-xl">"</i>{text}<i className="text-xl">"</i></p>
        {date && <p className="mt-3 text-xs">{date}</p>}
      </div>
    </div>
  )
}

export default Review