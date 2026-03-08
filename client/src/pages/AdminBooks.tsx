import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookTable from '../components/admin/BookTable';
import Preloader from '../components/ui/Preloader';

const AdminBooks = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.title = 'Books Management | Libronet Admin';
		setTimeout(() => setIsLoading(false), 2000);
	}, []);

	const [searchQuery, setSearchQuery] = useState('');
	const [filterCategory, setFilterCategory] = useState('all');
	const [filterStatus, setFilterStatus] = useState('all');

	// Mock data - replace with API call
	const [books] = useState([
		{ id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', uploadedBy: 'johndoe', uploadDate: '2024-01-15', downloads: 1234, rating: 4.8, status: 'approved' as const },
		{ id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', uploadedBy: 'janesmith', uploadDate: '2024-01-20', downloads: 1100, rating: 4.7, status: 'approved' as const },
		{ id: 3, title: 'Design Patterns', author: 'Gang of Four', category: 'Technology', uploadedBy: 'mikejohnson', uploadDate: '2024-02-10', downloads: 980, rating: 4.6, status: 'pending' as const },
		{ id: 4, title: 'Refactoring', author: 'Martin Fowler', category: 'Technology', uploadedBy: 'sarahwilliams', uploadDate: '2024-02-15', downloads: 850, rating: 4.5, status: 'approved' as const },
		{ id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', uploadedBy: 'tombrown', uploadDate: '2024-03-01', downloads: 720, rating: 4.4, status: 'pending' as const },
		{ id: 6, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', uploadedBy: 'johndoe', uploadDate: '2024-03-05', downloads: 650, rating: 4.7, status: 'rejected' as const },
	]);

	const filteredBooks = books.filter(book => {
		const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
							  book.author.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
		const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
		return matchesSearch && matchesCategory && matchesStatus;
	});

	const handleBookClick = (bookId: number) => {
		console.log('Book clicked:', bookId);
	};

	const handleApprove = (bookId: number) => {
		console.log('Approve book:', bookId);
	};

	const handleReject = (bookId: number) => {
		console.log('Reject book:', bookId);
	};

	const handleDelete = (bookId: number) => {
		console.log('Delete book:', bookId);
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
							<h1 className="text-3xl font-bold text-gray-50 font-[Super]">Books Management</h1>
							<p className="text-gray-400 mt-2">Manage and monitor all books in the library</p>
						</div>
						<div className="bg-[#48576019] border border-gray-800 rounded-xl px-6 py-4">
							<p className="text-gray-400 text-sm">Total Books</p>
							<p className="text-3xl font-bold text-gray-50">{books.length}</p>
						</div>
					</div>

					{/* Filters */}
					<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6 mb-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="relative">
								<i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
								<input
									type="text"
									placeholder="Search by title or author..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full h-10 pl-10 pr-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
								/>
							</div>
							<select
								value={filterCategory}
								onChange={(e) => setFilterCategory(e.target.value)}
								className="h-10 px-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
							>
								<option value="all">All Categories</option>
								<option value="Technology">Technology</option>
								<option value="Science">Science</option>
								<option value="Fiction">Fiction</option>
								<option value="History">History</option>
								<option value="Arts">Arts</option>
							</select>
							<select
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value)}
								className="h-10 px-4 bg-[#4857602f] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 transition"
							>
								<option value="all">All Status</option>
								<option value="approved">Approved</option>
								<option value="pending">Pending</option>
								<option value="rejected">Rejected</option>
							</select>
						</div>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
						<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
									<i className="fa fa-check-circle text-green-400 text-xl"></i>
								</div>
								<div>
									<p className="text-gray-400 text-sm">Approved</p>
									<p className="text-2xl font-bold text-gray-50">{books.filter(b => b.status === 'approved').length}</p>
								</div>
							</div>
						</div>
						<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
									<i className="fa fa-clock text-yellow-400 text-xl"></i>
								</div>
								<div>
									<p className="text-gray-400 text-sm">Pending</p>
									<p className="text-2xl font-bold text-gray-50">{books.filter(b => b.status === 'pending').length}</p>
								</div>
							</div>
						</div>
						<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
									<i className="fa fa-times-circle text-red-400 text-xl"></i>
								</div>
								<div>
									<p className="text-gray-400 text-sm">Rejected</p>
									<p className="text-2xl font-bold text-gray-50">{books.filter(b => b.status === 'rejected').length}</p>
								</div>
							</div>
						</div>
						<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
									<i className="fa fa-download text-blue-400 text-xl"></i>
								</div>
								<div>
									<p className="text-gray-400 text-sm">Total Downloads</p>
									<p className="text-2xl font-bold text-gray-50">{books.reduce((sum, b) => sum + b.downloads, 0)}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Books Table */}
					<BookTable 
						books={filteredBooks} 
						onBookClick={handleBookClick}
						onApprove={handleApprove}
						onReject={handleReject}
						onDelete={handleDelete}
					/>
				</div>
			</div>
		</>
	);
};

export default AdminBooks;
