import { motion } from "framer-motion";

function HeroRight() {
	return (
		<motion.div
			initial={{ opacity: 0, x: 60 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
			className="w-1/2 max-[900px]:w-full flex justify-center items-center relative py-0 max-sm:py-4"
		>
			<div className="relative w-full max-w-sm sm:max-w-md flex justify-center items-center">

				{/* Outer Aura Ring */}
				<div className="absolute w-[95%] h-[95%] rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: "20s" }}></div>
				<div className="absolute w-[80%] h-[80%] rounded-full border border-purple-500/5"></div>

				{/* Background Glow Blobs */}
				<div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/15 rounded-full blur-3xl"></div>
				<div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#f54129]/10 rounded-full blur-2xl animate-pulse"></div>

				{/* Floating Book Image */}
				<motion.div
					animate={{ y: [0, -14, 0] }}
					transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
					className="relative z-10 flex justify-center items-center"
				>
					<img
						src="/images/book_image.png"
						alt="Libronet Book Illustration"
						className="w-4/5 sm:w-3/4 h-auto drop-shadow-[0_30px_60px_rgba(104,66,174,0.4)] hover:scale-105 transition-transform duration-500"
					/>
				</motion.div>

				{/* Floating Badge: Readers Online */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.9, duration: 0.5 }}
					className="absolute left-0 top-[20%] max-sm:hidden bg-[#0e0b1e] border border-purple-500/25 px-3 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
				>
					<span className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex justify-center items-center text-xs">
						<i className="fa fa-users text-green-400 text-[10px]"></i>
					</span>
					<div>
						<p className="text-white text-xs font-bold leading-none">2.4K+</p>
						<p className="text-gray-500 text-[10px] mt-0.5">Readers Online</p>
					</div>
				</motion.div>

				{/* Floating Badge: New Book */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 1.1, duration: 0.5 }}
					className="absolute right-0 bottom-[25%] max-sm:hidden bg-[#0e0b1e] border border-purple-500/25 px-3 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
				>
					<span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex justify-center items-center text-xs">
						<i className="fa fa-star text-amber-400 text-[10px]"></i>
					</span>
					<div>
						<p className="text-white text-xs font-bold leading-none">Top Rated</p>
						<p className="text-gray-500 text-[10px] mt-0.5">This Month</p>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}

export default HeroRight;

