import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Link, useNavigate } from "react-router-dom"
import InterestsModal from "../components/ui/InterestModal"
import { signup, saveAuth } from "../utils/auth"

function SignUp() {
    useEffect(() => {
        document.title = " Create an account | Libronet"
    }, [])
    const [activeState, setActiveState] = useState('hidden');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState('/images/user.png');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            saveAuth(response.token, response.user);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
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

                    <form onSubmit={handleSubmit} className="flex w-[60%] max-[900px]:mx-auto max-[900px]:w-[80%] pt-5 flex-col">
                        <span onClick={() => {
                            let inputElement = document.getElementById('imgInput');
                            inputElement?.click();
                        }} className="w-15 h-15 mx-auto my-2 cursor-pointer overflow-hidden flex justify-center items-center rounded-full">
                            <img src={avatarPreview} className="w-full h-auto opacity-70" alt=" User" />
                        </span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="invisible" id='imgInput' name="imageInput" />

                        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
                        
                        {/* Updated inputs to match Login styling (bg-[#4857602f], border-gray-800, text-gray-300) */}
                        <input 
                            type="text" 
                            placeholder="Username..." 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                            className="h-10 text-gray-300 rounded-lg pl-2 w-full bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" 
                        />
                        <input 
                            type="email" 
                            placeholder="Your email..." 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="h-10 text-gray-300 rounded-lg pl-2 w-full mt-4 bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" 
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
                        <div className="relative mt-4">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirm password" 
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                required
                                className="h-10 text-gray-300 rounded-lg pl-2 pr-10 w-full bg-[#4857602f] max-sm:bg-[#48576088] border border-gray-800 focus:ring-0 outline-0 caret-purple-500" 
                            />
                            <i 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300`}
                            ></i>
                        </div>

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
                            <Button 
                                text={loading ? "Creating..." : "Create Account"} 
                                styles="w-fit rounded-md text-xs px-5.5 py-2.5 bg-linear-to-r from-purple-600 to-purple-400 text-gray-50 border-none"
                                disabled={loading}
                            ></Button>
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