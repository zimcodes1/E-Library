


function BookItem({bookImage}:{bookImage:string}){
    return(
        <div className="w-27 shrink-0 h-full flex justify-center items-center p-2 bg-white border border-gray-200 rounded-2xl shadow-md shadow-[#80808044] cursor-pointer overflow-hidden">
            <span className="flex w-full h-full rounded-2xl"><img src={bookImage} className="h-full w-auto" alt="Addict" /></span>
        </div>
    )
}

export default BookItem