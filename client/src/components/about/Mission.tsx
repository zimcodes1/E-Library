function Mission() {
    return (
        <div className="w-full h-fit py-10 flex max-sm:flex-col justify-between items-center gap-10">
            <div className="w-1/2 max-sm:w-full">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" alt="Library" className="w-full h-auto rounded-3xl" />
            </div>
            <div className="w-1/2 max-sm:w-full">
                <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-50">Our Mission</h2>
                <p className="text-gray-300 mt-5 max-sm:text-sm">
                    We believe knowledge should be accessible to everyone, everywhere. Libronet connects readers with millions of books, creating a seamless digital reading experience that adapts to your lifestyle.
                </p>
            </div>
        </div>
    )
}

export default Mission
