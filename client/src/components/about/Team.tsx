function Team() {
    const team = [
        { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
        { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
        { name: "Emily Davis", role: "Head of Content", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
        { name: "David Wilson", role: "Lead Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" }
    ]

    return (
        <div className="w-full h-fit py-10">
            <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-50 text-center mb-10">Meet Our Team</h2>
            <div className="grid grid-cols-4 max-sm:grid-cols-2 max-[900px]:grid-cols-2 gap-5">
                {team.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-50 mt-4">{member.name}</h3>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Team
