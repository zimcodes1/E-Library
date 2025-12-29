

function Button({text, styles}: {text: string, styles?: string}) {
    return(
        <button className={` text-white px-4 cursor-pointer py-2 rounded-[80px] text-lg max-sm:text-sm font-medium bg-linear-to-r from-[#f54129] to-[#561ac5] hover:shadow-md transition duration-300 hover:shadow-[#561ac55e] ${styles || ''}`}>{text}</button>
    )
}

export default Button;