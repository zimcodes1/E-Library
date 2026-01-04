import { useEffect } from "react"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"

function LoginPage() {
    useEffect(() => {
        document.title = " Login | Welcome to Libronet"
    }, [])
    return (
        <div className="w-full flex justify-center items-center bgImage h-screen">
            <div className="w-[80%] h-[90%] border bg-[#48576019] border-gray-800 rounded-3xl flex justify-between items-center overflow-hidden p-2">
                <div className="w-1/2 h-full flex flex-col items-start justify-start pt-10 pl-20">
                    <span className="w-full h-fit flex justify-start items-center">
                        <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                        <h1 className="text-lg max-sm:text-3xl yusei-magic-regular gradient">Libronet</h1>
                    </span>
                    <h1 className="text-3xl font-[Super]  font-semibold text-gray-50 mt-5">Holla Bookie, <br />Welcome Back</h1>
                    <p className="text-xs text-gray-400 mt-3">Hey, welcome back to your silent spot.  </p>
                    <form action="#" className="flex w-[60%] pt-10 flex-col">
                        <input type="text" placeholder="Your email..." className="h-10 text-gray-300 rounded-lg pl-2 w-full bg-[#48576019] border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <input type="password" placeholder="Password" className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#48576019] border-gray-800 focus:ring-0 outline-0 caret-purple-500" />
                        <span className="flex w-full jbetwustify-een items-center mt-4">
                            <span className="flex w-fit justify-between items-center">
                                <input type="checkbox" className="accent-purple-500" />
                                <p className="text-gray-400 px-2 text-xs">Remember me</p>
                            </span>
                            <p className="text-xs text-gray-400">Forgot password?</p>
                        </span>

                        <span className="w-full flex justify-between items-center  mt-7">
                            <Button text="Login" styles="w-fit rounded-md text-xs px-5.5 py-2.5 bg-linear-to-r from-purple-600 to-purple-400 text-gray-50 border-none"></Button>
                            <span className="flex justify-between items-center">
                                <img src="/images/Facebook.png" className="w-10 h-auto cursor-pointer" alt="Continue With FB" />
                                <img src="/images/Gmail.png" className="w-10 h-auto mx-2 cursor-pointer" alt="Continue With Gmail" />
                            </span>
                        </span>
                    </form>
                    <p className="text-xs mt-[10%] text-gray-400">Don't have an account? <Link to={'/signup'} className="text-purple-500">Sign Up</Link></p>
                </div>

                <div className="w-1/2 h-full flex bg-[#48576019] justify-center items-center rounded-3xl">
                    <img src="/images/reading.png" alt="Person Reading" className="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage