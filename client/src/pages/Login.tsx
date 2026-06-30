import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { login, saveAuth } from "../utils/auth";
import Message from "../components/ui/Message";
import { motion } from "framer-motion";

function LoginPage() {
	useEffect(() => {
		document.title = " Login | Welcome to Libronet";
	}, []);

	const [formData, setFormData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await login(formData);
			saveAuth(response.token, response.user);
			setSuccess(true);
			setTimeout(() => {
				navigate("/home");
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
				<Message type="success" text="Login successful! Redirecting..." />
			)}
			{error && <Message type="error" text={error} />}
			<div
				className="w-[80%] max-sm:w-full max-sm:h-full max-sm:bg-transparent max-sm:rounded-none max-sm:m-0 max-[900px]:flex-col-reverse h-[90%] sm:border bg-[#48576019] border-purple-600/10 rounded-3xl max-sm:justify-center flex justify-between items-center max-sm:items-start overflow-hidden p-7 sm:p-2"
			>
				<div className="w-1/2 max-[900px]:w-full max-[900px]:h-fit h-full flex flex-col items-start justify-start max-sm:justify-center pt-10 max-[900px]:pt-0 pl-20 max-[900px]:pl-0">
					<span className="w-full h-fit flex gap-2 justify-start">
						<img
							src="/images/logo.png"
							alt="Logo"
							className="w-10 max-sm:w-9 max-sm:h-8"
						/>
						<h1 className="text-lg max-sm:text-xl font-[Super] gradient">
							Libronet
						</h1>
					</span>
					<h1 className="text-3xl font-[Super] font-semibold text-gray-50 mt-10">
						Hello Bookie!
					</h1>
					<p className="text-xs text-gray-400 mt-3">
						Hey, welcome back to your silent spot.{" "}
					</p>
					<form
						onSubmit={handleSubmit}
						className="flex w-[60%] max-[900px]:w-full max-[900px]:mx-auto pt-10 max-sm:pt-5 flex-col"
					>
						<input
							type="text"
							placeholder="Your username..."
							value={formData.username}
							onChange={(e) =>
								setFormData({ ...formData, username: e.target.value })
							}
							required
							className="h-13 text-gray-300 rounded-lg pl-2 w-full bg-purple-500/5 border-2 border-purple-500/20 focus:ring-0 outline-0 caret-purple-500"
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
								className="h-13 text-gray-300 rounded-lg pl-2 w-full bg-purple-500/5 border-2 border-purple-500/20 focus:ring-0 outline-0 caret-purple-500"
							/>
							<i
								onClick={() => setShowPassword(!showPassword)}
								className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400/30 cursor-pointer hover:text-gray-300/30`}
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
								styles="w-full rounded-lg text-xs px-5.5 py-4 bg-gradient-to-r from-[#6842ae] to-[#561ac5] text-white border-none hover:text-black hover:bg-white"
								disabled={loading}
							></Button>
						</span>
					</form>
					<p className="text-xs mt-[10%] max-[900px]:mx-auto text-gray-400 text-center">
						Don't have an account?{" "}
						<Link to={"/signup"} className="text-purple-500">
							Sign Up
						</Link>
					</p>
				</div>

				<div className="hidden sm:flex relative w-1/2 max-[900px]:w-full max-[900px]:bg-transparent max-[900px]:h-fit h-full bg-[#48576019] sm:border border-purple-600/10 justify-center items-center rounded-3xl">
					<img
						src="/images/reading.png"
						alt="Person Reading"
						className="w-full max-[900px]:w-8/10 h-auto"
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
		</div>
	);
}

export default LoginPage;
