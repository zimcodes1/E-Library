import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import CustomSelect from "./ui/CustomSelect";
import { getUser, isAuthenticated } from "../utils/auth";
import { getAvatarUrl } from "../utils/avatarUtils";
import { motion, AnimatePresence } from "framer-motion";

//Topmenu for landing page
function TopMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full py-4 px-6 max-sm:px-4 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/[0.05] shadow-lg flex justify-between items-center relative z-50">
            {/* Logo */}
            <span className="flex items-center gap-2">
                <img src="/images/logo.png" alt="Logo" className="w-9 h-9" />
                <h1 className="text-xl font-[Super] gradient tracking-wider">Libronet</h1>
            </span>

            {/* Desktop Navigation */}
            <span className="max-sm:hidden flex items-center gap-6">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium">Home</Link>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium">Search</Link>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium">About</Link>
                <Link to="/login">
                    <Button text="Sign In" styles="px-5 py-2 hover:bg-purple-600 hover:text-white border-transparent" />
                </Link>
            </span>

            {/* Mobile Navigation Toggler */}
            <span className="hidden max-sm:flex items-center">
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-gray-200 focus:outline-none p-1 text-2xl cursor-pointer bg-transparent border-none"
                    aria-label="Toggle Menu"
                >
                    <i className={`fa ${isOpen ? 'fa-times' : 'fa-bars'} text-gray-50 text-2xl transition-transform duration-300`}></i>
                </button>
            </span>

            {/* Mobile Dropdown Menu with Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-2 right-0 left-0 mx-0 p-5 rounded-2xl bg-[#0a0618] border border-purple-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-col gap-1 z-50"
                    >
                        <Link 
                            to="/" 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white text-base py-2 px-3 rounded-lg hover:bg-white/5 transition duration-200"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/search" 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white text-base py-2 px-3 rounded-lg hover:bg-white/5 transition duration-200"
                        >
                            Search
                        </Link>
                        <Link 
                            to="/about" 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white text-base py-2 px-3 rounded-lg hover:bg-white/5 transition duration-200"
                        >
                            About
                        </Link>
                        <div className="h-px bg-white/10 my-1"></div>
                        <Link 
                            to="/login" 
                            onClick={() => setIsOpen(false)}
                            className="w-full"
                        >
                            <Button text="Sign In" styles="w-full text-center py-2.5 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold border-none" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function TopBar() {
    const [user, setUser] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (isAuthenticated()) {
            setUser(getUser());
        }
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            if (isAuthenticated()) {
                setUser(getUser());
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatReadingTime = (hours: number) => {
        const totalMinutes = Math.floor(hours * 60);
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        return `${h}h ${m}m`;
    };

    return (
        <div className="w-6/7 sm:bg-[#0a061b95] max-[900px]:w-8/9 max-[900px]:px-5 max-sm:hidden bg-gray-950/50 border-b border-purple-500/10 backdrop-blur-3xl h-15 max-sm:h-10 flex justify-between items-center gap-4 fixed top-0 right-0 px-10 z-50">
            {/* Language Selector - Future Feature */}
            <span className="flex h-9 min-w-25 px-2 rounded-4xl bg-[#5348605a] justify-center items-center border border-purple-500/10 shadow cursor-pointer">
                <CustomSelect
                    defaultValue="English"
                    options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }]}
                    icon="fa fa-language"
                />
            </span>
            {/* Digital Clock and Reading Timer */}
            <span className="flex h-9 w-fit rounded-4xl bg-[#5348605a] justify-between items-center border border-purple-500/10 shadow font-[digi]">
                <span className="text-gray-300 flex justify-between items-center">
                    <i className="fa fa-clock mx-2"></i>
                    <p>{formatTime(currentTime)}</p>
                </span>
                <span className="text-gray-300 flex justify-between items-center px-2">
                    <i className="fa fa-calendar mx-2"></i>
                    <p>{formatDate(currentTime)}</p>
                </span>
                {user && (
                    <span className="text-purple-400 flex justify-between items-center px-2 border-l border-gray-600">
                        <i className="fa fa-book-reader mx-2"></i>
                        <p>{formatReadingTime(user.reading_hours || 0)}</p>
                    </span>
                )}
            </span>
            {/* User Profile */}
            <Link to='/profile' className="max-[900px]:hidden">
                <span className="flex h-9 min-w-25 px-0.5 rounded-4xl bg-[#5348605a] justify-start items-center border border-purple-500/10 shadow cursor-pointer">
                    <span className="h-8 w-8 rounded-full flex justify-center items-center overflow-hidden">
                        <img src={getAvatarUrl(user?.avatar_url)} alt="User" className="w-full h-auto" />
                    </span>
                    <p className="text-xs ml-2 text-gray-300">{user?.username || 'Guest'}</p>
                </span>
            </Link>
        </div>
    )
}
export default TopMenu;