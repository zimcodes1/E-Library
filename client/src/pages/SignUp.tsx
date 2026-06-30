import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import InterestsModal from "../components/ui/InterestModal";
import { signup, saveAuth } from "../utils/auth";
import { saveUserInterests } from "../utils/user/interests";
import Message from "../components/ui/Message";
import { motion } from "framer-motion";

function SignUp() {
	useEffect(() => {
		document.title = " Create an account | Libronet";
	}, []);
	const [activeState, setActiveState] = useState("hidden");
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [success, setSuccess] = useState(false);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const navigate = useNavigate();


	const validateForm = () => {
		if (formData.username.length < 3) {
			setError("Username must be at least 3 characters");
			return false;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			setError("Please enter a valid email");
			return false;
		}
		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters");
			return false;
		}
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return false;
		}
		if (!acceptedTerms) {
			setError("Please accept the Terms and Conditions");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!validateForm()) return;

		setLoading(true);
		try {
			const response = await signup({
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});

			// Save auth first
			saveAuth(response.token, response.user);

			// Save interests if any selected
			if (selectedInterests.length > 0) {
				try {
					await saveUserInterests(selectedInterests);
				} catch (err) {
					console.error("Failed to save interests:", err);
				}
			}

			setSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		// Changed bg-purple-100 to bgImage and h-screen
		<div className="w-full flex justify-center items-center bgImage h-screen max-sm:h-dvh max-sm:overflow-y-scroll">
			{success && (
				<Message type="success" text="Login successful! Redirecting..." />
			)}
			{error && <Message type="error" text={error} />}
			<div
				className="w-[80%] max-sm:w-full max-sm:h-fit max-sm:bg-transparent max-sm:rounded-none max-sm:m-0 max-[900px]:flex-col-reverse sm:h-[90%] sm:border bg-[#48576019] border-purple-600/10 rounded-3xl max-sm:justify-center flex justify-between items-center max-sm:items-start overflow-hidden p-7 sm:p-2"
			>
				<div className="w-1/2 overflow-y-scroll no-scrollbar max-[900px]:w-full max-[900px]:h-fit h-full flex flex-col items-start justify-start max-sm:justify-center pt-30 sm:pt-10 sm:pl-20" >
					<span className="w-full h-fit flex gap-2 justify-start items-center">
						<img
							src="/images/logo.png"
							alt="Logo"
							className="w-10 max-sm:w-9 max-sm:h-8"
						/>
						<h1 className="text-xl max-sm:text-sm font-[Super] gradient">
							Libronet
						</h1>
					</span>
					<span className="mt-10 sm:mt-3 flex justify-start w-full">
						<h1 className="text-3xl font-[Super] font-semibold text-gray-50 sm:mt-5">
							<span>Welcome!</span>
						</h1>
					</span>
					<p className="text-xs text-gray-400 mt-3 max-sm:mt-3">
						Fill in your information to create your account.
					</p>

					<form
						onSubmit={handleSubmit}
						className="flex w-[60%] max-[900px]:w-full max-[900px]:mx-auto pt-10 max-sm:pt-5 flex-col"
					>
						{/* Updated inputs to match Login styling*/}
						<input
							type="text"
							placeholder="Username..."
							value={formData.username}
							onChange={(e) =>
								setFormData({ ...formData, username: e.target.value })
							}
							required
							className="h-13 text-gray-300 rounded-xl pl-2 w-full bg-purple-500/5 border-2 border-purple-500/30 focus:ring-0 outline-0 caret-purple-500"
						/>
						<input
							type="email"
							placeholder="Your email..."
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
							className="h-13 mt-4 text-gray-300 rounded-xl pl-2 w-full bg-purple-500/5 border-2 border-purple-500/30 focus:ring-0 outline-0 caret-purple-500"
						/>
						<div className="relative mt-4">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								required
								className="h-13 text-gray-300 rounded-xl pl-2 w-full bg-purple-500/5 border-2 border-purple-500/30 focus:ring-0 outline-0 caret-purple-500"
							/>
							<i
								onClick={() => setShowPassword(!showPassword)}
								className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400/30 cursor-pointer hover:text-gray-300/30`}
							></i>
						</div>
						<div className="relative mt-4">
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirm password"
								value={formData.confirmPassword}
								onChange={(e) =>
									setFormData({ ...formData, confirmPassword: e.target.value })
								}
								required
								className="h-13 text-gray-300 rounded-xl pl-2 w-full bg-purple-500/5 border-2 border-purple-500/30 focus:ring-0 outline-0 caret-purple-500"
							/>
							<i
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400/30 cursor-pointer hover:text-gray-300/30`}
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
						<p className="text-gray-400 mt-4 text-sm">
							<i className="fa fa-magic-wand-sparkles"></i> Select Interests
						</p>
						<div className="p-3 flex flex-wrap gap-2 w-full justify-start items-center min-h-16 rounded-lg bg-[#4857602f] border border-gray-800 mt-2">
							{selectedInterests.length === 0 ? (
								<p className="text-gray-500 text-xs italic">
									No interests selected yet...
								</p>
							) : (
								selectedInterests.map((value, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs flex items-center gap-2"
									>
										{value}
										<i
											onClick={() =>
												setSelectedInterests(
													selectedInterests.filter((_, i) => i !== index),
												)
											}
											className="fa fa-times cursor-pointer hover:text-purple-100"
										></i>
									</span>
								))
							)}
							<button
								type="button"
								onClick={() => {
									setActiveState("flex");
								}}
								className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition flex items-center justify-center"
							>
								<i className="fa fa-plus"></i>
							</button>
						</div>

						{/* Terms and Conditions Checkbox */}
						<div className="flex items-start gap-3 mt-4">
							<input
								type="checkbox"
								id="terms"
								checked={acceptedTerms}
								onChange={(e) => setAcceptedTerms(e.target.checked)}
								className="mt-1 w-4 h-4 text-purple-600 bg-transparent border-2 border-purple-500/30 rounded focus:ring-purple-500 focus:ring-2"
							/>
							<label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed">
								I agree to the{" "}
								<Link
									to="/terms"
									target="_blank"
									rel="noopener noreferrer"
									className="text-purple-400 hover:text-purple-300 underline"
								>
									Terms and Conditions
								</Link>
								{" "}and understand that my personal data will be processed according to our privacy policy.
							</label>
						</div>
						<span className="w-full mt-7">
							<Button
								text={loading ? "Creating..." : "Create Account"}
								styles={`w-full rounded-md text-xs px-5.5 py-4 text-gray-50 border-none transition ${acceptedTerms ? 'bg-gradient-to-r from-[#6842ae] to-[#561ac5] text-white' : 'bg-gray-600 cursor-not-allowed'}`}
								disabled={loading || !acceptedTerms}
							></Button>
						</span>
					</form>
					<p className="text-xs mt-[10%] text-gray-400 max-[900px]:mx-auto">
						Have an account?{" "}
						<Link to={"/login"} className="text-purple-500">
							Login
						</Link>
					</p>
				</div>

				{/* Right side background changed to match Login right panel */}
				<div className="relative w-1/2 max-[900px]:hidden h-full flex bg-[#48576019] overflow-hidden justify-center items-center rounded-3xl sm:border border-purple-600/10">
					<img
						src="/images/reading4.png"
						alt="Person Reading"
						className="w-full h-auto"
					/>

					{/* Outer Aura Ring */}
					<div className="absolute w-[95%] h-[95%] rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: "20s" }}></div>
					<div className="absolute w-[80%] h-[80%] rounded-full border border-purple-500/5"></div>

					{/* Background Glow Blobs */}
					<div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/15 rounded-full blur-3xl"></div>
					<div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#f54129]/10 rounded-full blur-2xl animate-pulse"></div>


					{/* Floating Badge: Readers Online */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.9, duration: 0.5 }}
						className="absolute left-5 top-[20%] max-sm:hidden bg-[#0e0b1e] border border-purple-500/25 px-3 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
					>
						<span className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex justify-center items-center text-xs">
							<i className="fa fa-users text-green-400 text-[10px]"></i>
						</span>
						<div>
							<p className="text-white text-xs font-bold leading-none">Many</p>
							<p className="text-gray-500 text-[10px] mt-0.5">Readers Online</p>
						</div>
					</motion.div>

					{/* Floating Badge: Free reading */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1.1, duration: 0.5 }}
						className="absolute right-5 bottom-[20%] max-sm:hidden bg-[#0e0b1e] border border-purple-500/25 px-3 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
					>
						<span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex justify-center items-center text-xs">
							<i className="fa fa-dollar text-amber-400 text-[10px]"></i>
						</span>
						<div>
							<p className="text-white text-xs font-bold leading-none">Free</p>
							<p className="text-gray-500 text-[10px] mt-0.5">Read for free</p>
						</div>
					</motion.div>
				</div>
			</div>
			<div
				className={`w-full h-full ${activeState} justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-50"`}
			>
				<InterestsModal
					onClose={() => {
						setActiveState("hidden");
					}}
					setInterests={setSelectedInterests}
					currentInterests={selectedInterests}
				></InterestsModal>
			</div>
		</div>
	);
}

export default SignUp;
