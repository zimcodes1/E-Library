import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function HeroLeft() {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -60 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.9, ease: "easeOut" }}
			className="w-1/2 max-[900px]:w-full py-5 max-sm:py-6 z-10 flex flex-col justify-center max-[900px]:items-center"
		>
			{/* Eyebrow Badge */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className="flex max-[900px]:justify-center mb-6"
			>
				<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-widest uppercase">
					<span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
					Africa's Digital Library
				</span>
			</motion.div>

			{/* Headline */}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.7 }}
				className="font-[Super] text-6xl max-[900px]:text-5xl max-sm:text-4xl max-[900px]:text-center text-white font-bold leading-[1.1] max-sm:leading-tight tracking-tight"
			>
				Read More.{" "}
				<span className="relative inline-block">
					<span className="gradient">Learn More.</span>
					{/* Underline Glow */}
					<span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#f54129] to-[#561ac5] opacity-60 blur-sm"></span>
				</span>
				{" "}
				<span className="text-gray-200">Grow More.</span>
			</motion.h1>

			{/* Subtitle */}
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.7 }}
				className="text-gray-400 text-lg max-sm:text-base mt-6 max-sm:mt-4 max-[900px]:text-center max-w-lg leading-relaxed"
			>
				Access thousands of books, novels, and educational resources from one
				elegant platform. Read at your own pace, on any device, anywhere.
			</motion.p>

			{/* Search Bar */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.7 }}
				className="w-full max-w-xl h-14 max-sm:h-12 border border-purple-500/30 bg-white/[0.03] flex justify-between items-center rounded-full shadow-lg shadow-purple-900/20 mt-8 max-sm:mt-6 p-1.5 hover:border-purple-500/60 transition-all duration-300 focus-within:border-purple-500/60 focus-within:shadow-purple-500/20"
			>
				<input
					type="text"
					placeholder="Search for a title, author, genre..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSearch()}
					className="w-full h-full pl-5 max-sm:pl-4 text-sm bg-transparent rounded-l-full outline-none border-none caret-purple-400 text-gray-200 placeholder-gray-500"
				/>
				<button
					onClick={handleSearch}
					className="shrink-0 w-11 max-sm:w-10 h-full bg-gradient-to-r from-[#6842ae] to-[#561ac5] flex justify-center items-center rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 border-none"
				>
					<i className="fa fa-search text-white text-sm"></i>
				</button>
			</motion.div>

			{/* CTA Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.7 }}
				className="flex flex-row max-sm:flex-col gap-4 mt-7 max-sm:mt-6 w-full max-w-xl max-[900px]:justify-center"
			>
				<Link to="/signup" className="sm:w-auto max-sm:w-full">
					<button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer border-none">
						Get Started <i className="fa fa-arrow-right ml-2"></i>
					</button>
				</Link>
				<Link to="/home" className="sm:w-auto max-sm:w-full">
					<button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6842ae] to-[#561ac5] text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/40 hover:opacity-90 transition-all duration-300 cursor-pointer border-none">
						Browse as Guest <i className="fa fa-user ml-2"></i>
					</button>
				</Link>
			</motion.div>

			{/* Stats Row */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.75, duration: 0.7 }}
				className="flex flex-row gap-8 max-sm:gap-6 mt-10 max-sm:mt-8 max-[900px]:justify-center"
			>
				<div className="flex flex-col items-start max-[900px]:items-center">
					<span className="text-2xl max-sm:text-xl font-bold text-white font-[Super]">10K+</span>
					<span className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Books</span>
				</div>
				<div className="w-px bg-white/10 self-stretch"></div>
				<div className="flex flex-col items-start max-[900px]:items-center">
					<span className="text-2xl max-sm:text-xl font-bold text-white font-[Super]">4.9★</span>
					<span className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Rating</span>
				</div>
				<div className="w-px bg-white/10 self-stretch"></div>
				<div className="flex flex-col items-start max-[900px]:items-center">
					<span className="text-2xl max-sm:text-xl font-bold text-white font-[Super]">Free</span>
					<span className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Always</span>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default HeroLeft;

