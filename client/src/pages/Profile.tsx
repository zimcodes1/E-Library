import SideMenu from "../components/SideMenu"
import { useEffect } from "react"

const UserProfile = () => {
    useEffect(()=>{document.title = 'Profile | Libronet'}, [])
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-dvh pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-sm:w-full h-dvh flex flex-col px-10 max-sm:p-3 pt-5 relative">
                {/* Main Contents */}
                <div className="w-full h-full flex items-center justify-center flex-col">
                    <div className="w-125 max-sm:w-full h-9/10 max-[900px]:h-fit rounded-2xl bg-[#4857605a] p-10 border border-gray-700 flex-col items-center">
                        <h1 className="text-gray-200 text-xl font-semibold text-center">Your Profile</h1>
                        <div className="w-25 h-25 mt-5 rounded-full overflow-hidden mx-auto border-3 border-green-500">
                            <img src="/images/user.jpg" alt="User" className="w-full" />
                        </div>

                        <div className="w-full h-fit mt-10 flex flex-col text-gray-400 gap-4">
                            <span className="flex justify-between items-center"><p>Name: <span className="text-gray-300">John Doe</span></p> <i className="fa fa-edit cursor-pointer"></i></span>
                            <span className="flex justify-between items-center"><p>Email: <span className="text-gray-300">johndoe@gmail.com</span></p> <i className="fa fa-edit cursor-pointer"></i></span>
                            <span className="flex justify-between items-center"><p><i className="fa fa-clock"></i> Total Read Time: <span className="text-gray-300">70hrs</span></p></span>
                            <span className="flex justify-between items-center"><p><i className="fas fa-wand-magic-sparkles"></i> Interests: <span className="text-gray-300">Technolgy, Storybooks, Novel, Science</span></p> <i className="fa fa-edit"></i></span>
                            <span className="flex justify-between items-center"><p><i className="fas fa-book"></i> Your Uploads:<span className="text-gray-300"> Great Lion, Spears, Timberland</span></p> <i className="fa fa-edit"></i></span>
                        </div>
                        <span className="w-full flex justify-center items-center mt-10">
                            <button className="text-gray-50 bg-red-400 px-5 py-3 rounded-2xl cursor-pointer hover:text-red-400 hover:bg-gray-50 transition duration-300"><i className="fa fa-power-off"></i> Logout</button>
                            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserProfile