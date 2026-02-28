import { type ButtonHTMLAttributes } from "react";

// 1. Extend the native button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    styles?: string; // This is your custom prop for Tailwind classes
    icon?: string;
}

// 2. Use "rest" parameters (...props) to collect everything else
function Button({ text, styles, icon, ...props }: ButtonProps) {
    return (
        <button 
            // 3. Spread the props onto the native element
            {...props} 
            className={`text-gray-800 px-5 cursor-pointer py-2.5 
                rounded-[80px] text-sm max-sm:text-sm font-medium bg-gray-50
                hover:shadow-md transition duration-500 hover:bg-black/10 backdrop-blur-xl
                border-gray-50 border-2 hover:text-gray-50 ${styles || ''}`}
        >
            {text} {(icon)? <i className={`fa ${icon}`}></i> : null}
        </button>
    );
}

export default Button;