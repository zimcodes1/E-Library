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
		usersTrend: 0,
		booksTrend: 0,
		downloadsTrend: 0,
		activeUsersTrend: 0,
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
				usersTrend: statsData?.users_trend || 0,
				booksTrend: statsData?.books_trend || 0,
				downloadsTrend: statsData?.downloads_trend || 0,
				activeUsersTrend: statsData?.active_users_trend || 0,
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
								trend={{ value: stats.usersTrend, isPositive: stats.usersTrend >= 0 }}
								color="purple"
							/>
						</Link>
						<Link to="/admin/dashboard/books">
							<StatCard
								title="Total Books"
								value={stats.totalBooks}
								icon="book"
								trend={{ value: stats.booksTrend, isPositive: stats.booksTrend >= 0 }}
								color="blue"
							/>
						</Link>
						<Link to="/admin/dashboard/books">
							<StatCard
								title="Total Downloads"
								value={stats.totalDownloads}
								icon="download"
								trend={{ value: stats.downloadsTrend, isPositive: stats.downloadsTrend >= 0 }}
								color="green"
							/>
						</Link>
						<StatCard
							title="Active Users"
							value={stats.activeUsers}
							icon="user-check"
							trend={{ value: stats.activeUsersTrend, isPositive: stats.activeUsersTrend >= 0 }}
							color="yellow"
						/>
					</div>

					{/* Quick Links */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<Link to="/admin/dashboard/users" className="bg-[#4857605a] border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition">
							<i className="fa fa-users text-2xl text-purple-400 mb-3 block"></i>
							<h3 className="text-lg font-semibold text-gray-50 mb-1">Manage Users</h3>
							<p className="text-gray-400 text-sm">View and manage user accounts</p>
						</Link>
						<Link to="/admin/dashboard/books" className="bg-[#4857605a] border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition">
							<i className="fa fa-book text-2xl text-blue-400 mb-3 block"></i>
							<h3 className="text-lg font-semibold text-gray-50 mb-1">Manage Books</h3>
							<p className="text-gray-400 text-sm">Review and manage book uploads</p>
						</Link>
						<Link to="/admin/dashboard/feedbacks" className="bg-[#4857605a] border border-gray-700 rounded-lg p-6 hover:border-green-500 transition">
							<i className="fa fa-comments text-2xl text-green-400 mb-3 block"></i>
							<h3 className="text-lg font-semibold text-gray-50 mb-1">Manage Feedback</h3>
							<p className="text-gray-400 text-sm">Review and respond to user feedback</p>
						</Link>
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
