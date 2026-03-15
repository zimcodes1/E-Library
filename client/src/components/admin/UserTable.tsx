export interface User {
	id: number;
	username: string;
	email: string;
	isActive: boolean;
	joinedDate: string;
	booksUploaded: number;
	booksDownloaded: number;
	role: string;
}

interface UserTableProps {
	users: User[];
	onUserClick: (userId: number) => void;
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
}

const UserTable = ({ users, onUserClick, onEdit, onDelete }: UserTableProps) => {
	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-[#48576033] border-b border-gray-800">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">User</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Email</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Role</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Joined</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Uploads</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Downloads</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-800">
						{users.map((user) => (
							<tr key={user.id} className="hover:bg-[#48576033] transition cursor-pointer" onClick={() => onUserClick(user.id)}>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
											<span className="text-purple-400 font-semibold">{user.username[0].toUpperCase()}</span>
										</div>
										<span className="text-gray-50 font-medium">{user.username}</span>
									</div>
								</td>
								<td className="px-6 py-4 text-gray-400 text-sm">{user.email}</td>
								<td className="px-6 py-4">
									<span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
										{user.isActive ? 'Active' : 'Inactive'}
									</span>
								</td>
								<td className="px-6 py-4">
									<span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
										{user.role}
									</span>
								</td>
								<td className="px-6 py-4 text-gray-400 text-sm">{user.joinedDate}</td>
								<td className="px-6 py-4 text-gray-300 text-sm">{user.booksUploaded}</td>
								<td className="px-6 py-4 text-gray-300 text-sm">{user.booksDownloaded}</td>
								<td className="px-6 py-4">
									<button onClick={(e) => { e.stopPropagation(); onEdit(user); }} className="text-purple-400 hover:text-purple-300 mr-3">
										<i className="fa fa-edit"></i>
									</button>
									<button onClick={(e) => { e.stopPropagation(); onDelete(user); }} className="text-red-400 hover:text-red-300">
										<i className="fa fa-trash"></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;
