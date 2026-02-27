import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroLeft() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.8 }}
			className="w-1/2 max-[900px]:w-full py-10 max-sm:px-5 max-sm:absolute z-10 max-sm:py-5 flex flex-col justify-center max-[900px]:items-center"
		>
			<h1 className="font-[Super] text-6xl max-[900px]:text-5xl max-sm:text-4xl max-[900px]:text-center text-blue-50 font-bold leading-tight">
				Experience the Freedom of a <span className="gradient">Boundless</span>{" "}
				Library
			</h1>
			<p className="text-gray-400 max-sm:text-gray-200 text-lg max-sm:text-base mt-6 max-[900px]:text-center max-w-xl">
				Access thousands of books and resources from the comfort of your device.
				Read, learn, and grow.
			</p>

			<div className="w-full max-w-xl h-14 max-sm:h-12 border-2 border-purple-500/30 bg-transparent backdrop-blur-2xl flex justify-between items-center rounded-full shadow-lg shadow-purple-500/10 mt-8 p-1.5 hover:border-purple-500/50 transition">
				<input
					type="text"
					placeholder="Search for a book..."
					className="w-full h-full pl-5 bg-transparent rounded-l-full outline-0 focus:ring-0 caret-purple-500 text-gray-200 placeholder-gray-500"
				/>
				<span className="w-12 h-full bg-gradient-to-r from-purple-600 to-purple-400 flex justify-center items-center rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition">
					<i className="fa fa-search text-white text-lg"></i>
				</span>
			</div>

			<div className="flex max-sm:flex-col gap-4 mt-8">
				<Link to='/login'>
					<Button
						icon="fa-arrow-right"
						text="Get Started"
						styles="px-8 py-3 text-base"
					/>
				</Link>
				<Link to="/home">
					<Button
						icon="fa-user"
						text="Browse as Guest"
						styles="bg-gradient-to-r from-purple-600 to-purple-400 text-gray-50 border-none px-8 py-3 text-base hover:shadow-lg hover:shadow-purple-500/50"
					/>
				</Link>
			</div>
		</motion.div>
	);
}

export default HeroLeft;
