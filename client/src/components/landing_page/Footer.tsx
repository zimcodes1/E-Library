import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full mt-24 px-10 max-sm:px-6 py-12 rounded-3xl radial-bg h-fit border border-purple-500/10 flex flex-col justify-between items-stretch">
            {/* Links Grid */}
            <div className="w-full grid grid-cols-4 max-[900px]:grid-cols-2 max-sm:grid-cols-1 gap-8 text-gray-300">
                {/* Column 1 */}
                <div className="flex flex-col items-start justify-start">
                    <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                    <Link to="/about" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">About Us</Link>
                    <Link to="/terms" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Terms & Conditions</Link>
                    <Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Privacy Policy</Link>
                </div>
                
                {/* Column 2 */}
                <div className="flex flex-col items-start justify-start">
                    <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                    <Link to="/search" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Browse Books</Link>
                    <Link to="/home" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Library</Link>
                    <Link to="/myshelve" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">My Shelve</Link>
                </div>
                
                {/* Column 3 */}
                <div className="flex flex-col items-start justify-start">
                    <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
                    <Link to="/login" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Login</Link>
                    <Link to="/signup" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Sign Up</Link>
                    <Link to="/profile" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2">Profile</Link>
                </div>
                
                {/* Column 4 */}
                <div className="flex flex-col items-start justify-start">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                    <a href="mailto:support@libronet.com" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2 flex items-center gap-2">
                        <i className="fa fa-envelope text-purple-400/80"></i> Email Us
                    </a>
                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                        <i className="fa fa-phone text-purple-400/80"></i> +234 707 143 0030
                    </p>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-purple-400 transition mt-2 flex items-center gap-2">
                        <i className="fab fa-facebook text-purple-400/80"></i> Facebook
                    </a>
                </div>
            </div>

            {/* Separator and Bottom Bar */}
            <div className="w-full border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Libronet. All rights reserved.</p>
                <div className="flex items-center gap-4 max-sm:flex-col">
                    <span className="text-sm text-gray-400 font-medium">Get our free apps:</span>
                    <div className="flex gap-2">
                        <img src="/images/playstore.png" className="h-8 w-auto hover:opacity-80 transition cursor-pointer" alt="Google Play Store" />
                        <img src="/images/appstore.png" className="h-8 w-auto hover:opacity-80 transition cursor-pointer" alt="Apple App Store" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;