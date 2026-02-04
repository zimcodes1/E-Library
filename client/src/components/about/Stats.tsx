function Stats() {
    const stats = [
        { icon: "fa-book-open", value: "2M+", label: "Books Available" },
        { icon: "fa-users", value: "500K+", label: "Active Readers" },
        { icon: "fa-globe", value: "150+", label: "Countries" },
        { icon: "fa-star", value: "4.8", label: "Average Rating" }
    ]

    return (
        <div className="w-full h-fit py-10 my-10 rounded-3xl radial-bg">
            <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-5 p-10">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <i className={`fa ${stat.icon} text-3xl text-purple-400 mb-3`}></i>
                        <h3 className="text-4xl max-sm:text-2xl font-bold gradient">{stat.value}</h3>
                        <p className="text-gray-300 text-sm mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stats
