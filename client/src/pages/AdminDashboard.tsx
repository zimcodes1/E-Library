import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/admin/StatCard";
import UserActivityChart from "../components/admin/UserActivityChart";
import CategoryDistributionChart from "../components/admin/CategoryDistributionChart";
import RecentActivityList from "../components/admin/RecentActivityList";
import TopBooksList from "../components/admin/TopBooksList";
import Preloader from "../components/ui/Preloader";
import { adminService } from "../utils/admin/adminService";

interface ActivityDataTypes {
	labels: string[], 
	data: any[]
}

const AdminDashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({
		totalUsers: 0,
		totalBooks: 0,
		totalDownloads: 0,
		activeUsers: 0,
	});
	const [activities, setActivities] = useState([]);
	const [topBooks, setTopBooks] = useState([]);
	const [userActivityData, setUserActivityData] = useState<ActivityDataTypes>();
	const [categoryData, setCategoryData] = useState<ActivityDataTypes>();
	const [error, setError] = useState('');

	useEffect(() => {
		document.title = "Admin Dashboard | Libronet";
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		try {
			const [statsData, activitiesData, booksData, activityChartData, categoryChartData] = await Promise.all([
				adminService.getStats(),
				adminService.getActivities(),
				adminService.getAllBooks(),
				adminService.getUserActivityData(),
				adminService.getCategoryDistribution()
			]);

			setStats({
				totalUsers: statsData?.total_users || 0,
				totalBooks: statsData?.total_books || 0,
				totalDownloads: statsData?.total_downloads || 0,
				activeUsers: statsData?.active_users || 0,
			});

			const formattedActivities = (activitiesData || []).map((activity: any) => ({
				id: activity.id,
				user: activity.user?.username || 'Unknown',
				action: activity.activity_type?.replace(/_/g, ' ') || 'Unknown',
				book: activity.book_title || '',
				time: new Date(activity.timestamp).toLocaleString(),
				type: activity.activity_type?.includes('upload') ? 'upload' : 
				      activity.activity_type?.includes('download') ? 'download' :
				      activity.activity_type?.includes('review') ? 'review' : 'register'
			}));
			setActivities(formattedActivities);

			const topBooksData = (booksData || [])
				.sort((a: any, b: any) => (b.download_count || 0) - (a.download_count || 0))
				.slice(0, 5)
				.map((book: any) => ({
					id: book.id,
					title: book.title,
					author: book.author,
					downloads: book.download_count || 0,
					rating: book.average_rating || 0
				}));
			setTopBooks(topBooksData);

			setUserActivityData(activityChartData);
			setCategoryData(categoryChartData);
		} catch (err) {
			console.error('Error fetching dashboard data:', err);
			setError('Failed to load dashboard data');
		} finally {
			setIsLoading(false);
		}
	};

	if (error) {
		return (
			<div className="min-h-screen bg-[#060410] flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-400 text-lg">{error}</p>
					<button 
						onClick={fetchDashboardData}
						className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<Preloader isLoading={isLoading} />
			<div className="min-h-screen bg-[#060410]">
				<div className="max-w-7xl mx-auto px-4 py-8">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-50 font-[Super]">
							Admin Dashboard
						</h1>
						<p className="text-gray-400 mt-2">
							Welcome back! Here's what's happening today.
						</p>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<Link to="/admin/dashboard/users">
							<StatCard
								title="Total Users"
								value={stats.totalUsers}
								icon="users"
								trend={{ value: 12, isPositive: true }}
								color="purple"
							/>
						</Link>
						<Link to="/admin/dashboard/books">
							<StatCard
								title="Total Books"
								value={stats.totalBooks}
								icon="book"
								trend={{ value: 8, isPositive: true }}
								color="blue"
							/>
						</Link>
						<Link to="/admin/dashboard/books">
							<StatCard
								title="Total Downloads"
								value={stats.totalDownloads}
								icon="download"
								trend={{ value: 15, isPositive: true }}
								color="green"
							/>
						</Link>
						<StatCard
							title="Active Users"
							value={stats.activeUsers}
							icon="user-check"
							trend={{ value: 3, isPositive: false }}
							color="yellow"
						/>
					</div>

					{/* Charts Row */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
						<UserActivityChart
							data={userActivityData?.data}
							labels={userActivityData?.labels}
						/>
						<CategoryDistributionChart
							data={categoryData?.data}
							labels={categoryData?.labels}
						/>
					</div>

					{/* Lists Row */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<RecentActivityList activities={activities} />
						<TopBooksList books={topBooks} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
