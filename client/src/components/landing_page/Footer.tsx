import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full px-10 rounded-3xl max-sm:px-5 py-10 radial-bg h-80 max-sm:h-fit flex flex-col justify-evenly items-start">
            <div className="w-full h-3/4 max-sm:flex-wrap max-sm:h-fit flex justify-evenly items-start">
                <span className="w-1/4 max-sm:w-1/2 flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Company</h3>
                    <Link to="/about" className="text-sm mt-2 hover:text-purple-400 transition">About Us</Link>
                    <Link to="/terms" className="text-sm mt-2 hover:text-purple-400 transition">Terms & Conditions</Link>
                    <Link to="/" className="text-sm mt-2 hover:text-purple-400 transition">Privacy Policy</Link>
                </span>
                <span className="w-1/4 max-sm:w-1/2 max-sm:items-end flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Resources</h3>
                    <Link to="/search" className="text-sm mt-2 hover:text-purple-400 transition">Browse Books</Link>
                    <Link to="/home" className="text-sm mt-2 hover:text-purple-400 transition">Library</Link>
                    <Link to="/shelve" className="text-sm mt-2 hover:text-purple-400 transition">My Shelve</Link>
                </span>
                <span className="w-1/4 max-sm:w-1/2 max-sm:mt-5 flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Account</h3>
                    <Link to="/login" className="text-sm mt-2 hover:text-purple-400 transition">Login</Link>
                    <Link to="/signup" className="text-sm mt-2 hover:text-purple-400 transition">Sign Up</Link>
                    <Link to="/profile" className="text-sm mt-2 hover:text-purple-400 transition">Profile</Link>
                </span>
                <span className="w-1/4 max-sm:w-1/2 max-sm:mt-5 max-sm:items-end flex flex-col items-start justify-center text-gray-200">
                    <h3 className="text-lg font-semibold text-gray-50">Contact</h3>
                    <a href="mailto:support@libronet.com" className="text-sm mt-2 hover:text-purple-400 transition"><i className="fa fa-envelope text-red-500"></i> Email Us</a>
                    <p className="text-sm mt-2"><i className="fa fa-phone"></i> Call Us: +2347071430030</p>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm mt-2 hover:text-purple-400 transition"><i className="fa fab fa-facebook text-blue-500"></i> Facebook</a>
                </span>
            </div>

            {/* Download App Section */}
            <div className="w-full h-1/4 max-sm:h-fit max-sm:mt-3 flex max-sm:flex-col justify-center items-center">
                <span className="text-gray-400">Get our free apps:</span>
                <span className="flex justify-between max-sm:mt-5">
                    <img src="/images/playstore.png" className="w-auto h-10 cursor-pointer" alt="Google Play Store" />
                    <img src="/images/appstore.png" className="w-auto h-10 cursor-pointer mx-2" alt="Apple App Store" />
                </span>
            </div>
        </div>
    )
}

export default Footer