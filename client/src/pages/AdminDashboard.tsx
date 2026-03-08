import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/admin/StatCard";
import UserActivityChart from "../components/admin/UserActivityChart";
import CategoryDistributionChart from "../components/admin/CategoryDistributionChart";
import RecentActivityList from "../components/admin/RecentActivityList";
import TopBooksList from "../components/admin/TopBooksList";
import Preloader from "../components/ui/Preloader";

const AdminDashboard = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.title = "Admin Dashboard | Libronet";
		setTimeout(() => setIsLoading(false), 2000);
	}, []);

	// Mock data - replace with API calls later
	const [stats] = useState({
		totalUsers: 1234,
		totalBooks: 567,
		totalDownloads: 8901,
		activeUsers: 234,
	});

	const [userActivityData] = useState({
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		data: [120, 150, 180, 140, 200, 170, 190],
	});

	const [categoryData] = useState({
		labels: ["Science", "Technology", "Fiction", "History", "Arts"],
		data: [120, 95, 150, 80, 60],
	});

	const [recentActivities] = useState([
		{
			id: 1,
			user: "John Doe",
			action: "uploaded",
			book: "Clean Code",
			time: "2 minutes ago",
			type: "upload" as const,
		},
		{
			id: 2,
			user: "Jane Smith",
			action: "downloaded",
			book: "The Pragmatic Programmer",
			time: "5 minutes ago",
			type: "download" as const,
		},
		{
			id: 3,
			user: "Mike Johnson",
			action: "left a review on",
			book: "Design Patterns",
			time: "10 minutes ago",
			type: "review" as const,
		},
		{
			id: 4,
			user: "Sarah Williams",
			action: "registered",
			time: "15 minutes ago",
			type: "register" as const,
		},
		{
			id: 5,
			user: "Tom Brown",
			action: "uploaded",
			book: "Refactoring",
			time: "20 minutes ago",
			type: "upload" as const,
		},
	]);

	const [topBooks] = useState([
		{
			id: 1,
			title: "Clean Code",
			author: "Robert C. Martin",
			downloads: 1234,
			rating: 4.8,
		},
		{
			id: 2,
			title: "The Pragmatic Programmer",
			author: "Andrew Hunt",
			downloads: 1100,
			rating: 4.7,
		},
		{
			id: 3,
			title: "Design Patterns",
			author: "Gang of Four",
			downloads: 980,
			rating: 4.6,
		},
		{
			id: 4,
			title: "Refactoring",
			author: "Martin Fowler",
			downloads: 850,
			rating: 4.5,
		},
		{
			id: 5,
			title: "Code Complete",
			author: "Steve McConnell",
			downloads: 720,
			rating: 4.4,
		},
	]);

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
						<RecentActivityList activities={recentActivities} />
						<TopBooksList books={topBooks} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
