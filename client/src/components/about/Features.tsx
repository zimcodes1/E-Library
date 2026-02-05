interface FeatureProps {
    icon: string;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
    return (
        <div className="w-full h-45 max-sm:h-fit p-6 rounded-2xl bg-[#4857605a] border border-gray-700 flex flex-col items-center text-center">
            <i className={`fa ${icon} text-4xl gradient mb-4`}></i>
            <h3 className="text-xl font-semibold text-gray-50">{title}</h3>
            <p className="text-gray-300 text-sm mt-3">{description}</p>
        </div>
    )
}

function Features() {
    const features = [
        { icon: "fa-book", title: "Vast Library", description: "Access millions of books across all genres" },
        { icon: "fa-mobile", title: "Read Anywhere", description: "Sync across all your devices seamlessly" },
        { icon: "fa-users", title: "Community", description: "Connect with readers worldwide" },
        { icon: "fa-shield", title: "Secure", description: "Your data is protected with enterprise-grade security" }
    ]

    return (
        <div className="w-full h-fit py-10">
            <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-50 text-center mb-10">Why Choose Us</h2>
            <div className="grid grid-cols-4 max-sm:grid-cols-1 max-[900px]:grid-cols-2 gap-5">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </div>
    )
}

export default Features
