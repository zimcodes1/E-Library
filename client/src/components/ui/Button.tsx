

function Button({text, styles}: {text: string, styles?: string}) {
    return(
        <button className={` text-gray-800 px-5 cursor-pointer py-2.5 
            rounded-[80px] text-sm max-sm:text-sm font-medium bg-gray-50
            hover:shadow-md transition duration-300 hover:shadow-[#4040405f] ${styles || ''}`}>{text}</button>
    )
}

export default Button;