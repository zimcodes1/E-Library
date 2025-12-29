import { useEffect } from "react"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"

function LoginPage() {
    useEffect(() => {
        document.title = " Login | Welcome to Libronet"
    }, [])
    return (
        <div className="w-full flex justify-center items-center bg-purple-100 h-screen">
            <div className="w-[80%] h-[90%] bg-white rounded-3xl flex justify-between items-center overflow-hidden p-2 shadow-md shadow-purple-200">
                <div className="w-1/2 h-full flex flex-col items-start justify-start pt-10 pl-20">
                    <span className="w-full h-fit flex justify-start items-center">
                        <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                        <h1 className="text-lg max-sm:text-3xl yusei-magic-regular gradient">Libronet</h1>
                    </span>
                    <h1 className="text-3xl yusei-magic-regular  font-semibold text-purple-950 mt-5">Holla Bookie, <br />Welcome Back</h1>
                    <p className="text-xs text-gray-800 mt-3">Hey, welcome back to your silent spot.  </p>
                    <form action="#" className="flex w-[60%] pt-10 flex-col">
                        <input type="text" placeholder="Your email..." className="h-10 rounded-lg pl-2 w-full bg-purple-200 focus:ring-0 outline-0 active:bg-purple-300 focus:bg-purple-300" />
                        <input type="password" placeholder="Password" className="h-10 rounded-lg pl-2 w-full mt-4 bg-purple-200 focus:ring-0 outline-0 active:bg-purple-300 focus:bg-purple-300" />
                        <span className="flex w-full justify-between items-center mt-4">
                            <span className="flex w-fit justify-between items-center">
                                <input type="checkbox" className="accent-purple-500" />
                                <p className="text-gray-800 px-2 text-xs">Remember me</p>
                            </span>
                            <p className="text-xs text-gray-800">Forgot password?</p>
                        </span>

                        <Button text="Sign In" styles="w-fit rounded-md text-xs px-5.5 py-2.5 mt-7"></Button>
                    </form>
                    <p className="text-xs mt-[10%]">Don't have an account? <Link to={'#'} className="text-purple-500">Sign Up</Link></p>
                </div>

                <div className="w-1/2 h-full flex bg-purple-300 justify-center items-center rounded-3xl">
                    <img src="/images/reading2.png" alt="Person Reading" className="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage