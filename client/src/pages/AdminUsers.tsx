import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserTable from '../components/admin/UserTable';
import Preloader from '../components/ui/Preloader';
import { adminService } from '../utils/admin/adminService';
import type { User } from '../components/admin/UserTable';
import Button from '../components/ui/Button';
import ConfirmModal from '../components/ui/ConfirmModal';
import EditUserRoleModal from '../components/admin/EditUserRoleModal';

const AdminUsers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [filterRole, setFilterRole] = useState('all');
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState('');
	const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
	const [editModal, setEditModal] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });

	useEffect(() => {
		document.title = 'Users Management | Libronet Admin';
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setError('');
			const usersData = await adminService.getAllUsers();
			setUsers(usersData || []);
		} catch (err) {
			console.error('Error fetching users:', err);
			setError('Failed to load users. Please check your authentication.');
		} finally {
			setIsLoading(false);
		}
	};

	const filteredUsers = users.filter(user => {
		const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
							  user.email.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' ? user.isActive : !user.isActive);
		const matchesRole = filterRole === 'all' || user.role === filterRole;
		return matchesSearch && matchesStatus && matchesRole;
	});

	const handleDeleteUser = async () => {
		if (!deleteModal.user) return;
		try {
			await adminService.deleteUser(deleteModal.user.id);
			setUsers(users.filter(u => u.id !== deleteModal.user!.id));
		} catch (err) {
			console.error('Error deleting user:', err);
			setError('Failed to delete user');
		}
	};

	const handleUpdateUser = async (role: string, isActive: boolean) => {
		if (!editModal.user) return;
		try {
			await adminService.updateUser(editModal.user.id, { role, isActive });
			setUsers(users.map(u => u.id === editModal.user!.id ? { ...u, role, isActive } : u));
		} catch (err) {
			console.error('Error updating user:', err);
			setError('Failed to update user');
		}
	};

	if (error) {
		return (
			<div className="min-h-screen bg-[#060410] flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-400 text-lg">{error}</p>
					<Button 
						onClick={fetchUsers}
						className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
						text='Retry'
					>
						
					</Button>
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
							<p className="text-3xl font-bold text-gray-50">{users?.length}</p>
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
									<p className="text-2xl font-bold text-gray-50">{users?.filter(u => u.isActive).length}</p>
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
									<p className="text-2xl font-bold text-gray-50">{users?.filter(u => u.role === 'admin').length}</p>
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
									<p className="text-2xl font-bold text-gray-50">{users?.reduce((sum, u) => sum + (u.booksUploaded || 0), 0)}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Users Table */}
					<UserTable 
						users={filteredUsers} 
						onUserClick={() => {}} 
						onEdit={(user) => setEditModal({ isOpen: true, user })}
						onDelete={(user) => setDeleteModal({ isOpen: true, user })}
					/>
				</div>
			</div>

			<ConfirmModal
				isOpen={deleteModal.isOpen}
				onClose={() => setDeleteModal({ isOpen: false, user: null })}
				onConfirm={handleDeleteUser}
				title="Delete User"
				message={`Are you sure you want to delete ${deleteModal.user?.username}? This action cannot be undone.`}
				confirmText="Delete"
				type="danger"
			/>

			{editModal.user && (
				<EditUserRoleModal
					isOpen={editModal.isOpen}
					onClose={() => setEditModal({ isOpen: false, user: null })}
					onSave={handleUpdateUser}
					user={editModal.user}
				/>
			)}
		</>
	);
};

export default AdminUsers;
