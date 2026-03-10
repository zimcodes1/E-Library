import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/admin/StatCard";
import UserActivityChart from "../components/admin/UserActivityChart";
import CategoryDistributionChart from "../components/admin/CategoryDistributionChart";
import RecentActivityList from "../components/admin/RecentActivityList";
import TopBooksList from "../components/admin/TopBooksList";
import Preloader from "../components/ui/Preloader";
import { adminService } from "../utils/admin/adminService";

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

	useEffect(() => {
		document.title = "Admin Dashboard | Libronet";
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		try {
			const [statsData, activitiesData, booksData] = await Promise.all([
				adminService.getStats(),
				adminService.getActivities(),
				adminService.getAllBooks()
			]);

			setStats({
				totalUsers: statsData.total_users,
				totalBooks: statsData.total_books,
				totalDownloads: statsData.total_downloads,
				activeUsers: statsData.active_users,
			});

			const formattedActivities = activitiesData.map((activity: any) => ({
				id: activity.id,
				user: activity.user.username,
				action: activity.activity_type.replace('_', ' '),
				book: activity.book_title,
				time: new Date(activity.timestamp).toLocaleString(),
				type: activity.activity_type.includes('upload') ? 'upload' : 
				      activity.activity_type.includes('download') ? 'download' :
				      activity.activity_type.includes('review') ? 'review' : 'register'
			}));
			setActivities(formattedActivities);

			const topBooksData = booksData
				.sort((a: any, b: any) => b.download_count - a.download_count)
				.slice(0, 5)
				.map((book: any) => ({
					id: book.id,
					title: book.title,
					author: book.author,
					downloads: book.download_count,
					rating: book.average_rating
				}));
			setTopBooks(topBooksData);
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const userActivityData = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		data: [120, 150, 180, 140, 200, 170, 190],
	};

	const categoryData = {
		labels: ["Science", "Technology", "Fiction", "History", "Arts"],
		data: [120, 95, 150, 80, 60],
	};

	return (
		<>
			<Preloader isLoading={isLoading} />
			<div className="min-h-screen bgImage">
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
							data={userActivityData.data}
							labels={userActivityData.labels}
						/>
						<CategoryDistributionChart
							data={categoryData.data}
							labels={categoryData.labels}
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
