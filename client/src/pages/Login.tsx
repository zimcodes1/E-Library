import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Link, useNavigate } from "react-router-dom"
import { login, saveAuth } from "../utils/auth"

function LoginPage() {
    useEffect(() => {
        document.title = " Login | Welcome to Libronet"
    }, [])
    
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await login(formData);
            saveAuth(response.token, response.user);
            setSuccess(true);
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full flex justify-center items-center bgImage h-screen max-sm:h-dvh">
            {success && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa fa-check-circle"></i>
                    <span>Login successful! Redirecting...</span>
                </div>
            )}
            <div className="w-[80%] max-[900px]:w-[60%] max-[900px]:h-200 max-sm:w-full max-sm:h-full
            max-sm:bg-transparent max-sm:rounded-none max-sm:m-0 max-[900px]:flex-col-reverse h-[90%]
            border bg-[#48576019] border-gray-800 rounded-3xl max-sm:justify-end flex 
            justify-between items-center overflow-hidden p-2">
                <div className="w-1/2 max-[900px]:pb-10 max-[900px]:w-full max-[900px]:h-fit max-sm:pb-20 h-full flex flex-col items-start justify-start max-sm:justify-center pt-10 max-[900px]:pt-0 pl-20 max-[900px]:pl-0">
                    <span className="w-full h-fit flex justify-start max-[900px]:justify-center items-center">
                        <img src="/images/logo.png" alt="Logo" className="w-10 max-sm:w-10" />
                        <h1 className="text-lg max-sm:text-3xl font-[Super] gradient">Libronet</h1>
                    </span>
                    <h1 className="text-3xl font-[Super] font-semibold text-gray-50 mt-5 max-[900px]:mx-auto max-[900px]:text-center max-sm:text-2xl">Holla Bookie, <br />Welcome Back</h1>
                    <p className="text-xs text-gray-400 mt-3 max-[900px]:mx-auto">Hey, welcome back to your silent spot.  </p>
                    <form onSubmit={handleSubmit} className="flex w-[60%] max-[900px]:w-8/10 max-[900px]:mx-auto pt-10 max-sm:pt-5 flex-col">
                        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
                        
                        <input 
                            type="text" 
                            placeholder="Your username..." 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                            className="h-10 text-gray-300 rounded-lg pl-2 w-full bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" 
                        />
                        <div className="relative mt-4">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                                className="h-10 text-gray-300 rounded-lg pl-2 pr-10 w-full bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" 
                            />
                            <i 
                                onClick={() => setShowPassword(!showPassword)}
                                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300`}
                            ></i>
                        </div>
                        <span className="flex w-full justify-between items-center mt-4">
                            <span className="flex w-fit justify-between items-center">
                                <input type="checkbox" className="accent-purple-500" />
                                <p className="text-gray-400 px-2 text-xs">Remember me</p>
                            </span>
                            <p className="text-xs text-gray-400">Forgot password?</p>
                        </span>

                        <span className="w-full flex justify-between items-center  mt-7">
                            <Button 
                                text={loading ? "Logging in..." : "Login"} 
                                styles="w-fit rounded-md text-xs px-5.5 py-2.5 bg-linear-to-r from-purple-600 to-purple-400 text-gray-50 border-none"
                                disabled={loading}
                            ></Button>
                            <span className="flex justify-between items-center">
                                <img src="/images/Facebook.png" className="w-10 h-auto cursor-pointer" alt="Continue With FB" />
                                <img src="/images/Gmail.png" className="w-10 h-auto mx-2 cursor-pointer" alt="Continue With Gmail" />
                            </span>
                        </span>
                    </form>
                    <p className="text-xs mt-[10%] max-[900px]:mx-auto text-gray-400 text-center">Don't have an account? <Link to={'/signup'} className="text-purple-500">Sign Up</Link></p>
                </div>

                <div className="w-1/2 max-[900px]:w-full max-[900px]:bg-transparent max-[900px]:h-fit h-full flex bg-[#48576019] justify-center items-center rounded-3xl">
                    <img src="/images/reading.png" alt="Person Reading" className="w-full max-[900px]:w-8/10 h-auto" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage