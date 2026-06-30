import Review from "../ui/Review";
import { motion } from 'framer-motion';

function Reviews() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-[90%] max-[900px]:w-full max-sm:w-full h-fit flex flex-col mx-auto mt-24 max-sm:mt-16 max-[900px]:mt-20"
        >
            <h1 className="text-3xl max-[900px]:text-2xl text-gray-400 font-semibold text-center tracking-wide">
                What Our Readers Say
            </h1>
            
            {/* Reviews List */}
            <div className="w-full mt-24 max-sm:mt-16 flex flex-row max-[900px]:flex-col justify-between items-stretch max-[900px]:items-center max-[900px]:gap-16 gap-4 px-4">
                <Review 
                    text="Libronet has completely transformed my reading habits. The clean interface, seamless sync, and tracking features keep me motivated every single day!" 
                    userImage="/images/avatar1.png" 
                    userName="Mercy"
                    rating={5}
                />
                <Review 
                    text="Being able to access my library and read offline while traveling is a complete game-changer. It's the best digital reading experience I've ever used." 
                    userImage="/images/avatar2.png" 
                    userName="Precious"
                    rating={5}
                />
                <Review 
                    text="The layout is extremely intuitive and the book collection is incredible. I love the customizable themes and the reading stats tracking!" 
                    userImage="/images/avatar3.png" 
                    userName="Miracle"
                    rating={5}
                />
            </div>
        </motion.div>
    )
}

export default Reviews;