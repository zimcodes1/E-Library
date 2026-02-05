import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import Review from "../components/Review"
import { useEffect, useState } from "react"
import ReviewModal from "../components/ui/ReviewModal"

function BookDetails() {
    useEffect(() => { document.title = 'Book Details | Libronet' })
    const [activeState, setActiveState] = useState('hidden')
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-25">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-7/8 max-sm:w-full min-h-screen flex flex-col px-10 max-[900px]:px-5 max-sm:px-3 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-full flex mt-15 max-sm:mt-3 justify-center items-start">
                    <div className="w-8/10 max-[900px]:w-9/10 max-sm:w-full h-fit flex flex-col">
                        <div className="flex w-full h-50 max-sm:h-fit overflow-hidden bg-[#48576019] p-5 border border-gray-700 rounded-2xl justify-between max-sm:flex-col max-sm:justify-center">
                            <div className="w-4/5 max-sm:w-full max-sm:h-fit h-full flex justify-between">
                                <div className="w-30 overflow-hidden rounded-lg flex justify-center items-center">
                                    <img src="/images/books/addict.jpeg" className="w-full h-auto" alt="" />
                                </div>
                                <div className="w-8/10 pl-3 h-full flex-col text-gray-300">
                                    <h2 className="font-semibold text-xl max-sm:text-lg">Cyber Love Made Easy</h2>
                                    <p className="mt-2"><i className="fa fa-folder-open"></i> <span className="text-gray-400">Category: </span>Technology</p>
                                    <p className="mt-2"><i className="fa fa-star text-amber-300"></i> <span className="text-gray-400">Rating: </span> 4.5</p>
                                    <p className="mt-2"><i className="fa fa-calendar"></i> <span className="text-gray-400">Uploaded: </span> 2007</p>
                                    <span className="flex items-center mt-2">
                                        <span className="w-8 h-8 flex rounded-full overflow-hidden"><img src="/images/user.jpg" className="w-full" alt="" /></span>
                                        <p className="ml-2">Azimeh</p>
                                    </span>
                                </div>
                            </div>
                            <div className="w-1/5 max-sm:w-full max-sm:h-fit h-full flex justify-end max-sm:justify-between max-sm:mt-2 items-end relative">
                                <i className="fa fa-bookmark text-2xl text-gray-400 absolute max-sm:static top-0 right-0"></i>
                                <button className="text-gray-50 font-semibold bg-purple-600 px-4 py-2 rounded-lg cursor-pointer hover:text-purple-600 hover:bg-gray-50 transition duration-300">Read Now</button>
                            </div>

                        </div>
                        <div className="w-full h-fit flex flex-col items-center p-5">
                            <h2 className="font-semibold text-2xl text-gray-400">About The Book</h2>
                            <p className="text-center text-gray-300 mt-5">Google AdSense Made Easy is a comprehensive,
                                step-by-step guide designed to take you by the
                                hand and walk you through the entire process of
                                mastering one of the world's most powerful advertising
                                networks.
                                Whether you are a blogger, a website owner, or a video content creator,
                                this book provides the proven techniques you need to dominate Google
                                AdSense and maximize your online earnings in the shortest time possible</p>
                        </div>

                        <h2 className="font-semibold text-2xl text-gray-400 mx-auto my-5">Book Reviews</h2>
                        <div className="w-full h-50 max-sm:h-fit flex flex-wrap justify-between items-center">
                            <Review></Review>
                            <Review></Review>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{setActiveState('flex')}} className="text-gray-800 w-30 mx-auto mt-5 cursor-pointer py-2 rounded-2xl bg-gray-50 inline-block"> <i className="fa fa-pen"></i> Review</button>
            </div>
            <div className={`w-full h-full top-0 left-0 ${activeState} justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-50"`}>
                <ReviewModal onClose={() => { setActiveState('hidden') }}></ReviewModal>
            </div>
        </div>
    )
}

export default BookDetails