import { useEffect } from "react"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"

function SignUp() {
    useEffect(() => {
        document.title = " Create an account | Libronet"
    }, [])
    return (
        <div className="w-full flex justify-center items-center bg-purple-100 h-screen">
            <div className="w-[80%] h-[90%] bg-white rounded-3xl flex justify-between items-center overflow-hidden p-2 shadow-md shadow-purple-200">
                <div className="w-1/2 h-full flex flex-col items-start justify-start pt-10 pl-20 overflow-scroll no-scrollbar">
                    <span className="w-full h-fit flex justify-start items-center bg-white">
                        <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                        <h1 className="text-lg max-sm:text-3xl yusei-magic-regular gradient">Libronet</h1>
                    </span>
                    <h1 className="text-3xl yusei-magic-regular  font-semibold text-purple-950 mt-5">Welcome to <br /><span className="yusei-magic-regular gradient">Libronet</span></h1>
                    <p className="text-xs text-gray-800 mt-3">Fill in your information to create your account.  </p>
                    <form action="#" className="flex w-[60%] pt-5 flex-col">
                        <span onClick={()=>{
                            let inputElement = document.getElementById('imgInput');
                            inputElement?.click();
                        }} className="w-20 h-20 rounded-full mx-auto my-2 cursor-pointer overflow-hidden border-2 border-purple-300 flex justify-center items-center">
                            <img src="/images/user.jpg" className="w-full h-auto" alt=" User" />
                        </span>
                        <input type="file" className="invisible" id='imgInput' name="imageInput" />
                        <input type="text" placeholder="Username..." className="h-10 rounded-lg pl-2 w-full bg-purple-200 focus:ring-0 outline-0 active:bg-purple-300 focus:bg-purple-300" />
                        <input type="email" placeholder="Your email..." className="h-10 rounded-lg pl-2 w-full mt-4 bg-purple-200 focus:ring-0 outline-0 active:bg-purple-300 focus:bg-purple-300" />
                        <input type="password" placeholder="Password" className="h-10 rounded-lg pl-2 w-full mt-4 bg-purple-200 focus:ring-0 outline-0 active:bg-purple-300 focus:bg-purple-300" />
                        <input type="password" placeholder="Confirm password" className="h-10 rounded-lg pl-2 w-full mt-4 bg-purple-200 focus:ring-0 outline-0 active:bg-purple-300 focus:bg-purple-300" />
                        <span className="flex justify-start items-center mt-2">
                            <span className="accent-purple-600">
                                <input type="radio" name="gender" />
                                <label className="px-2 text-xs text-gray-800"> Male</label>
                            </span>
                            <span className="accent-purple-600">
                                <input type="radio" name="gender" className="ml-4" />
                                <label className="px-2 text-xs text-gray-800"> Female</label>
                            </span>
                        </span>
                        <span className="w-full flex justify-between items-center  mt-7">
                            <Button text="Create Account" styles="w-fit rounded-md text-xs px-5.5 py-2.5"></Button>
                            <span className="flex justify-between items-center">
                                <img src="/images/Facebook.png" className="w-10 h-auto cursor-pointer" alt="Continue With FB" />
                                <img src="/images/Gmail.png" className="w-10 h-auto mx-2 cursor-pointer" alt="Continue With Gmail" />
                            </span>
                        </span>
                    </form>
                    <p className="text-xs mt-[10%]">Have an account? <Link to={'/login'} className="text-purple-500">Login</Link></p>
                </div>

                <div className="w-1/2 h-full flex bg-purple-300 justify-center items-center rounded-3xl">
                    <img src="/images/reading3.png" alt="Person Reading" className="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default SignUp