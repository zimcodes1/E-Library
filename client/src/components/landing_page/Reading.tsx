
function Reading() {
    return (
        <div className="flex flex-col justify-between items-center mt-20 max-sm:mt-5 px-4 max-sm:px-0">
            <h1 className="text-3xl max-[900px]:text-2xl text-gray-400 font-semibold">Maximize Your Potential</h1>
            
            <div className="flex max-sm:flex-wrap justify-between items-center w-full mt-20 max-sm:mt-5 h-fit max-sm:py-5 flex-wrap gap-y-5">
                
                {/* Feature 1: Habit Building */}
                <div className="w-[32%] max-md:w-[48%] max-sm:w-full h-80 flex justify-center items-center rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-8 py-6 border bg-[#48576019] border-gray-800 text-center">
                    <i className="fa fa-calendar-check text-[#6842ae3a] text-8xl mb-4"></i>
                    <h3 className="text-gray-50 text-xl font-semibold mb-3">Cultivate a habit</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Set daily reading goals and track your streaks. Our smart reminders ensure you stay consistent and turn reading into a lifelong companion.
                    </p>
                </div>

                {/* Feature 2: Screen Time */}
                <div className="w-[32%] max-md:w-[48%] max-sm:w-full h-80 flex justify-center items-center rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-8 py-6 border bg-[#48576019] border-gray-800 text-center">
                    <i className="fa fa-clock text-[#6842ae3a] text-8xl mb-4"></i>
                    <h3 className="text-gray-50 text-xl font-semibold mb-3">Monitor screen time</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Balance your digital life with detailed insights into your reading sessions. Protect your eyes and optimize your focus with ease.
                    </p>
                </div>

                {/* Feature 3: Growth/Learning */}
                <div className="w-[32%] max-md:w-full max-sm:w-full h-80 flex justify-center items-center rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-8 py-6 border bg-[#48576019] border-gray-800 text-center">
                    <i className="fa fa-graduation-cap text-[#6842ae3a] text-8xl mb-4"></i>
                    <h3 className="text-gray-50 text-xl font-semibold mb-3">Learn effectively</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Utilize active recall and built-in highlighting tools to retain more information. Transform every page into a stepping stone for growth.
                    </p>
                </div>

                {/* Feature 4: Offline Access */}
                <div className="w-[49%] max-sm:w-full mt-5 h-40 flex justify-center items-center rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-10 py-6 border bg-[#48576019] border-gray-800 text-center">
                    <h3 className="text-gray-50 text-xl font-semibold mb-2">Read Anywhere, Offline</h3>
                    <p className="text-gray-400 text-sm max-w-md">
                        Download your favorite books and resources to keep learning even when you're off the grid. No internet, no problem.
                    </p>
                </div>

                {/* Feature 5: Personalized Discovery */}
                <div className="w-[49%] max-sm:w-full mt-5 h-40 flex justify-center items-center rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-10 py-6 border bg-[#48576019] border-gray-800 text-center">
                    <h3 className="text-gray-50 text-xl font-semibold mb-2">Personalized Insights</h3>
                    <p className="text-gray-400 text-sm max-w-md">
                        Get tailored recommendations based on your reading speed and interests. Discover your next favorite book faster than ever.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Reading;