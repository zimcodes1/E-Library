import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserTable from '../components/admin/UserTable';
import Preloader from '../components/ui/Preloader';

const AdminUsers = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.title = 'Users Management | Libronet Admin';
		setTimeout(() => setIsLoading(false), 2000);
	}, []);

	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [filterRole, setFilterRole] = useState('all');

	// Mock data - replace with API call
	const [users] = useState([
		{ id: 1, username: 'johndoe', email: 'john@example.com', isActive: true, joinedDate: '2024-01-15', booksUploaded: 12, booksDownloaded: 45, role: 'user' },
		{ id: 2, username: 'janesmith', email: 'jane@example.com', isActive: true, joinedDate: '2024-01-20', booksUploaded: 8, booksDownloaded: 32, role: 'user' },
		{ id: 3, username: 'admin', email: 'admin@libronet.com', isActive: true, joinedDate: '2023-12-01', booksUploaded: 150, booksDownloaded: 200, role: 'admin' },
		{ id: 4, username: 'mikejohnson', email: 'mike@example.com', isActive: false, joinedDate: '2024-02-10', booksUploaded: 3, booksDownloaded: 15, role: 'user' },
		{ id: 5, username: 'sarahwilliams', email: 'sarah@example.com', isActive: true, joinedDate: '2024-02-15', booksUploaded: 20, booksDownloaded: 67, role: 'user' },
		{ id: 6, username: 'tombrown', email: 'tom@example.com', isActive: true, joinedDate: '2024-03-01', booksUploaded: 5, booksDownloaded: 28, role: 'user' },
	]);

	const filteredUsers = users.filter(user => {
		const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
							  user.email.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' ? user.isActive : !user.isActive);
		const matchesRole = filterRole === 'all' || user.role === filterRole;
		return matchesSearch && matchesStatus && matchesRole;
	});

	const handleUserClick = (userId: number) => {
		console.log('User clicked:', userId);
		// Navigate to user details page later
	};

	return (
		<>
			<Preloader isLoading={isLoading} />
			<div className="min-h-screen bgImage">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<Link to="/admin/dashboard" className="text-purple-400 hover:text-purple-300 text-sm mb-2 inline-block">
							<i className="fa fa-arrow-left mr-2"></i>Back to Dashboard
						</Link>
						<h1 className="text-3xl font-bold text-gray-50 font-[Super]">Users Management</h1>
						<p className="text-gray-400 mt-2">Manage and monitor all registered users</p>
					</div>
					<div className="bg-[#48576019] border border-gray-800 rounded-xl px-6 py-4">
						<p className="text-gray-400 text-sm">Total Users</p>
						<p className="text-3xl font-bold text-gray-50">{users.length}</p>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="relative">
							<i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
							<input
								type="text"
								placeholder="Search by username or email..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full h-10 pl-10 pr-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
							/>
						</div>
						<select
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
							className="h-10 px-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
						>
							<option value="all">All Status</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
						<select
							value={filterRole}
							onChange={(e) => setFilterRole(e.target.value)}
							className="h-10 px-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
						>
							<option value="all">All Roles</option>
							<option value="admin">Admin</option>
							<option value="user">User</option>
						</select>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
								<i className="fa fa-user-check text-green-400 text-xl"></i>
							</div>
							<div>
								<p className="text-gray-400 text-sm">Active Users</p>
								<p className="text-2xl font-bold text-gray-50">{users.filter(u => u.isActive).length}</p>
							</div>
						</div>
					</div>
					<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
								<i className="fa fa-crown text-purple-400 text-xl"></i>
							</div>
							<div>
								<p className="text-gray-400 text-sm">Admins</p>
								<p className="text-2xl font-bold text-gray-50">{users.filter(u => u.role === 'admin').length}</p>
							</div>
						</div>
					</div>
					<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
								<i className="fa fa-upload text-blue-400 text-xl"></i>
							</div>
							<div>
								<p className="text-gray-400 text-sm">Total Uploads</p>
								<p className="text-2xl font-bold text-gray-50">{users.reduce((sum, u) => sum + u.booksUploaded, 0)}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Users Table */}
				<UserTable users={filteredUsers} onUserClick={handleUserClick} />
			</div>
		</div>
		</>
	);
};

export default AdminUsers;
