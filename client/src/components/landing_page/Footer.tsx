function Footer() {
    return (
        <div className="w-full px-10 rounded-3xl max-sm:px-5 py-10 radial-bg h-80 max-sm:h-fit flex flex-col justify-evenly items-start">
            <div className="w-full h-3/4 max-sm:flex-wrap max-sm:h-fit flex justify-evenly items-start">
                <span className="w-1/4 max-sm:w-1/2 flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Company</h3>
                    <p className="text-sm mt-2">About Us</p>
                    <p className="text-sm mt-2">Careers</p>
                    <p className="text-sm mt-2">Our Team</p>
                </span>
                <span className="w-1/4 max-sm:w-1/2 max-sm:items-end flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Resources</h3>
                    <p className="text-sm mt-2">Blog</p>
                    <p className="text-sm mt-2">Help Center</p>
                    <p className="text-sm mt-2">Support</p>
                </span>
                <span className="w-1/4 max-sm:w-1/2 max-sm:mt-2 flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Legal</h3>
                    <p className="text-sm mt-2">Privacy Policy</p>
                    <p className="text-sm mt-2">Terms of Service</p>
                </span>
                <span className="w-1/4 max-sm:w-1/2 max-sm:mt-2 max-sm:items-end flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Contact</h3>
                    <p className="text-sm mt-2"><i className="fa fa-envelope text-red-500"></i> Email Us</p>
                    <p className="text-sm mt-2"><i className="fa fa-phone"></i>Call Us</p>
                    <p className="text-sm mt-2"><i className="fa fab fa-facebook text-blue-500"></i>acebook</p>
                </span>
            </div>

            {/* Download App Section */}
            <div className="w-full h-1/4 max-sm:h-fit max-sm:mt-3 flex justify-center items-center">
                <span className="text-gray-400">Get our free apps:</span>
                <span className="flex justify-between">
                    <img src="/images/playstore.png" className="w-auto h-10 cursor-pointer" alt="Google Play Store" />
                    <img src="/images/appstore.png" className="w-auto h-10 cursor-pointer mx-2" alt="Apple App Store" />
                </span>
            </div>
        </div>
    )
}

export default Footer