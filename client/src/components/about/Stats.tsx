import { useState, useEffect } from 'react';
import { getPublicStats, type PublicStats } from '../../utils/stats/statsService';

function Stats() {
    const [stats, setStats] = useState<PublicStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getPublicStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to load stats:', error);
                // Fallback to default values
                setStats({
                    total_books: 0,
                    total_users: 0,
                    total_downloads: 0,
                    average_rating: 0
                });
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-fit py-10 my-10 rounded-3xl radial-bg">
                <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-5 p-10">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-600 rounded mb-3 animate-pulse"></div>
                            <div className="w-16 h-8 bg-gray-600 rounded mb-2 animate-pulse"></div>
                            <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const displayStats = [
        { icon: "fa-book-open", value: stats?.total_books.toLocaleString() || "0", label: "Books Available" },
        { icon: "fa-users", value: stats?.total_users.toLocaleString() || "0", label: "Active Readers" },
        { icon: "fa-download", value: stats?.total_downloads.toLocaleString() || "0", label: "Downloads" },
        { icon: "fa-star", value: stats?.average_rating.toString() || "0", label: "Average Rating" }
    ];

    return (
        <div className="w-full h-fit py-10 my-10 rounded-3xl radial-bg">
            <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-5 p-10">
                {displayStats.map((stat, index) => (
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
