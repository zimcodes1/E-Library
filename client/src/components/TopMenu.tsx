import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import CustomSelect from "./ui/CustomSelect";
import { getUser, isAuthenticated } from "../utils/auth";
import { getAvatarUrl } from "../utils/avatarUtils";


//Topmenu for landing page
function TopMenu() {
    const [activeState, setActiveState] = useState('hidden');

    return (
        <div className="fixed w-9/10 max-sm:w-[95%] left-[5%] h-15 max-sm:left-[2.5%] px-3 rounded-3xl flex justify-between items-center top-5 max-sm:top-3 bg-black/10 border border-purple-800/20 backdrop-blur-3xl z-50">
            <span className="w-auto h-full flex justify-between items-center">
                <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                <h1 className="text-xl font-[Super] gradient">Libronet</h1>
            </span>
            <span className="max-sm:hidden">
                <Link to="/" className="text-gray-400 text-sm p-2 mx-2 hover:text-purple-400 transition-colors duration-300">Home</Link>
                <Link to="#" className="text-gray-400 text-sm p-2 mx-2 hover:text-purple-400 transition-colors duration-300">Search</Link>
                <Link to="/about" className="text-gray-400 text-sm p-2 mx-2 hover:text-purple-400 transition-colors duration-300">About</Link>
                <Link to="/login"><Button text="Sign In"></Button></Link>
            </span>
            <span className="relative hidden max-sm:flex">
                <i onClick={() => { (activeState == 'hidden') ? setActiveState('max-sm:flex') : setActiveState('hidden') }} className="fa fa-bars text-gray-50 hidden text-2xl cursor-pointer"></i>
                <div className={`${activeState} flex-col overflow-hidden w-25 h-fit rounded-2xl bg-[#31303e] border border-gray-700 absolute top-7 right-0`}>
                    <span className="flex w-full h-10 justify-start items-center hover:bg-[#413f52]"><Link to="/home" className="text-gray-300 text-sm p-2 mx-2">Home</Link></span>
                    <span className="flex w-full h-10 justify-start items-center hover:bg-[#413f52]"><Link to="/search" className="text-gray-300 text-sm p-2 mx-2">Search</Link></span>
                    <span className="flex w-full h-10 justify-start items-center hover:bg-[#413f52]"><Link to="/about" className="text-gray-300 text-sm p-2 mx-2">About</Link></span>
                    <span className="flex w-full h-10 justify-start items-center hover:bg-[#413f52]"><Link to="/login" className="text-gray-300 text-sm p-2 mx-2">Sign In</Link></span>
                </div>
            </span>
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
                <i className="fa fa-language text-gray-300"></i>
                <CustomSelect defaultValue="English" options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }]}></CustomSelect>
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