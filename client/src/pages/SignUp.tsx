import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"
import InterestsModal from "../components/ui/InterestModal"

function SignUp() {
    useEffect(() => {
        document.title = " Create an account | Libronet"
    }, [])
    const [activeState, setActiveState] = useState('hidden');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    return (
        // Changed bg-purple-100 to bgImage and h-screen
        <div className="w-full flex justify-center items-center bgImage h-screen max-sm:h-dvh">
            {/* Changed background and border to match Login dark theme */}
            <div className="w-[80%] max-[900px]:w-[60%] max-[900px]:h-200 max-sm:w-full max-sm:h-full max-sm:rounded-none h-[90%] border bg-[#48576019] max-sm:bg-transparent max-sm:border-none border-gray-800 rounded-3xl flex justify-between items-center overflow-hidden p-2">
                <div className="w-1/2 max-[900px]:w-full h-full flex flex-col items-start max-sm:items-center justify-start pt-10 max-sm:pt-0 pl-20 max-[900px]:pl-0 overflow-scroll no-scrollbar">
                    <span className="w-full h-fit flex justify-start max-[900px]:justify-center items-center max-sm:hidden">
                        <img src="/images/logo.png" alt="Logo" className="w-10" />
                        <h1 className="text-lg max-sm:text-3xl font-[Super] gradient">Libronet</h1>
                    </span>

                    {/* Changed text color to gray-50 to match Login header */}
                    <h1 className="text-3xl font-[Super] font-semibold text-gray-50 mt-5 max-[900px]:mx-auto">Welcome to <br className="max-[900px]:hidden" /><span className="font-[Super] gradient">Libronet</span></h1>
                    <p className="text-xs text-gray-400 mt-3 max-[900px]:mx-auto">Fill in your information to create your account.</p>

                    <form action="#" className="flex w-[60%] max-[900px]:mx-auto max-[900px]:w-[80%] pt-5 flex-col">
                        <span onClick={() => {
                            let inputElement = document.getElementById('imgInput');
                            inputElement?.click();
                        }} className="w-15 h-15 mx-auto my-2 cursor-pointer overflow-hidden flex justify-center items-center">
                            <img src="/images/user.png" className="w-full h-auto opacity-70" alt=" User" />
                        </span>
                        <input type="file" className="invisible" id='imgInput' name="imageInput" />

                        {/* Updated inputs to match Login styling (bg-[#4857602f], border-gray-800, text-gray-300) */}
                        <input type="text" placeholder="Username..." className="h-10 text-gray-300 rounded-lg pl-2 w-full bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="email" placeholder="Your email..." className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="password" placeholder="Password" className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="password" placeholder="Confirm password" className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />

                        <span className="flex justify-start items-center mt-2">
                            <span className="accent-purple-500">
                                <input type="radio" name="gender" />
                                <label className="px-2 text-xs text-gray-400"> Male</label>
                            </span>
                            <span className="accent-purple-500">
                                <input type="radio" name="gender" className="ml-4" />
                                <label className="px-2 text-xs text-gray-400"> Female</label>
                            </span>
                        </span>
                        <p className="text-gray-400 mt-4 text-sm"><i className="fa fa-magic-wand-sparkles"></i> Select Interests</p>
                        <div className="p-3 flex flex-wrap gap-2 w-full justify-start items-center min-h-16 rounded-lg bg-[#4857602f] border border-gray-800 mt-2">
                            {selectedInterests.length === 0 ? (
                                <p className="text-gray-500 text-xs italic">No interests selected yet...</p>
                            ) : (
                                selectedInterests.map((value, index) => (
                                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs flex items-center gap-2">
                                        {value}
                                        <i onClick={() => setSelectedInterests(selectedInterests.filter((_, i) => i !== index))} className="fa fa-times cursor-pointer hover:text-purple-100"></i>
                                    </span>
                                ))
                            )}
                            <button type="button" onClick={() => { setActiveState('flex') }} className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition flex items-center justify-center">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                        <span className="w-full flex justify-between items-center mt-7">
                            <Button text="Create Account" styles="w-fit rounded-md text-xs px-5.5 py-2.5 bg-linear-to-r from-purple-600 to-purple-400 text-gray-50 border-none"></Button>
                            <span className="flex justify-between items-center">
                                <img src="/images/Facebook.png" className="w-10 h-auto cursor-pointer" alt="Continue With FB" />
                                <img src="/images/Gmail.png" className="w-10 h-auto mx-2 cursor-pointer" alt="Continue With Gmail" />
                            </span>
                        </span>
                    </form>
                    <p className="text-xs mt-[10%] text-gray-400 max-[900px]:mx-auto">Have an account? <Link to={'/login'} className="text-purple-500">Login</Link></p>
                </div>

                {/* Right side background changed to match Login right panel */}
                <div className="w-1/2 max-[900px]:hidden h-full flex bg-[#48576019] overflow-hidden justify-center items-center rounded-3xl">
                    <img src="/images/reading4.png" alt="Person Reading" className="w-full h-auto" />
                </div>
            </div>
            <div className={`w-full h-full ${activeState} justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-50"`}>
                <InterestsModal onClose={() => { setActiveState('hidden') }} setInterests={setSelectedInterests} currentInterests={selectedInterests}></InterestsModal>
            </div>
            </div>
    )
}

export default SignUp