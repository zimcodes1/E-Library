import { useEffect } from "react"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"

function SignUp() {
    useEffect(() => {
        document.title = " Create an account | Libronet"
    }, [])
    return (
        // Changed bg-purple-100 to bgImage and h-screen
        <div className="w-full flex justify-center items-center bgImage h-screen">
            {/* Changed background and border to match Login dark theme */}
            <div className="w-[80%] h-[90%] border bg-[#48576019] border-gray-800 rounded-3xl flex justify-between items-center overflow-hidden p-2">
                <div className="w-1/2 h-full flex flex-col items-start justify-start pt-10 pl-20 overflow-scroll no-scrollbar">
                    <span className="w-full h-fit flex justify-start items-center">
                        <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                        <h1 className="text-lg max-sm:text-3xl font-[Super] gradient">Libronet</h1>
                    </span>
                    
                    {/* Changed text color to gray-50 to match Login header */}
                    <h1 className="text-3xl font-[Super] font-semibold text-gray-50 mt-5">Welcome to <br /><span className="font-[Super] gradient">Libronet</span></h1>
                    <p className="text-xs text-gray-400 mt-3">Fill in your information to create your account.</p>
                    
                    <form action="#" className="flex w-[60%] pt-5 flex-col">
                        <span onClick={()=>{
                            let inputElement = document.getElementById('imgInput');
                            inputElement?.click();
                        }} className="w-15 h-15 mx-auto my-2 cursor-pointer overflow-hidden flex justify-center items-center">
                            <img src="/images/user.png" className="w-full h-auto opacity-70" alt=" User" />
                        </span>
                        <input type="file" className="invisible" id='imgInput' name="imageInput" />
                        
                        {/* Updated inputs to match Login styling (bg-[#4857602f], border-gray-800, text-gray-300) */}
                        <input type="text" placeholder="Username..." className="h-10 text-gray-300 rounded-lg pl-2 w-full bg-[#4857602f] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="email" placeholder="Your email..." className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="password" placeholder="Password" className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="password" placeholder="Confirm password" className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        
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

                        <span className="w-full flex justify-between items-center mt-7">
                            <Button text="Create Account" styles="w-fit rounded-md text-xs px-5.5 py-2.5 bg-linear-to-r from-purple-600 to-purple-400 text-gray-50 border-none"></Button>
                            <span className="flex justify-between items-center">
                                <img src="/images/Facebook.png" className="w-10 h-auto cursor-pointer" alt="Continue With FB" />
                                <img src="/images/Gmail.png" className="w-10 h-auto mx-2 cursor-pointer" alt="Continue With Gmail" />
                            </span>
                        </span>
                    </form>
                    <p className="text-xs mt-[10%] text-gray-400">Have an account? <Link to={'/login'} className="text-purple-500">Login</Link></p>
                </div>

                {/* Right side background changed to match Login right panel */}
                <div className="w-1/2 h-full flex bg-[#48576019] overflow-hidden justify-center items-center rounded-3xl">
                    <img src="/images/reading4.png" alt="Person Reading" className="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default SignUp