import { motion } from "framer-motion";

function HeroRight() {
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="w-1/2 max-[900px]:w-full inset-0 max-sm:absolute max-sm:top-0 h-fit flex justify-center items-center relative"
		>   
			<div className="relative w-full max-w-md aspect-square flex justify-center items-center">
				<div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
				<img
					src="/images/book_image.png"
					alt="Hero Image"
					className="relative w-4/5 max-sm:w-1/2 h-auto drop-shadow-2xl max-sm:opacity-30"
				/>
			</div>
		</motion.div>
	);
}

export default HeroRight;
