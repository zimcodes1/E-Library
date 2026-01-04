

function PowerElement({PowerName, PowerImage}:{PowerName:string, PowerImage:string}){
    return(
        <span title={PowerName} className="w-1/4 max-sm:w-[48%] max-sm:mt-2 h-20 max-sm:h-15 flex border border-gray-800 rounded-2xl justify-center items-center">
            <img src={`/images/${PowerImage}`} alt={PowerName} className="h-1/2" />
            <p className="text-gray-50 text-xl max-sm:text-sm font-semibold pl-2">{PowerName}</p>
        </span>
    )
}

export default PowerElement