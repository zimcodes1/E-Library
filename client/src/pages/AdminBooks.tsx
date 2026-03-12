import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookTable from "../components/admin/BookTable";
import Preloader from "../components/ui/Preloader";
import { adminService } from "../utils/admin/adminService";

//Raw book types interface
interface RawBook {
    id: string;
    title?: string;
    author?: string;
    category?: { name: string };
    uploaded_by?: { username: string };
    upload_date: string;
    download_count?: number;
    average_rating?: number;
}

// Formatted books type definition
export interface FormattedBook {
    id: string;
    title: string;
    author: string;
    category: string;
    uploadedBy: string;
    uploadDate: string;
    downloads: number;
    rating: number;
    status: "approved" | "pending" | "rejected";
}


const AdminBooks = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [books, setBooks] = useState<FormattedBook[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		document.title = "Books Management | Libronet Admin";
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			setError("");
			const booksData = await adminService.getAllBooks();
			const formattedBooks = (booksData as RawBook[] || []).map((book) => ({
				id: book.id,
				title: book.title || "Unknown",
				author: book.author || "Unknown",
				category: book.category?.name || "Uncategorized",
				uploadedBy: book.uploaded_by?.username || "Unknown",
				uploadDate: new Date(book.upload_date).toLocaleDateString(),
				downloads: book.download_count || 0,
				rating: book.average_rating || 0,
				status: "approved" as const,
			}));
			setBooks(formattedBooks);
		} catch (err) {
			console.error("Error fetching books:", err);
			setError("Failed to load books. Please check your authentication.");
		} finally {
			setIsLoading(false);
		}
	};

	const filteredBooks = books.filter((book) => {
		const matchesSearch =
			book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			book.author.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			filterCategory === "all" || book.category === filterCategory;
		const matchesStatus =
			filterStatus === "all" || book.status === filterStatus;
		return matchesSearch && matchesCategory && matchesStatus;
	});

	const handleApprove = async (bookId: number) => {
		try {
			await adminService.approveBook(bookId);
			fetchBooks();
		} catch (err) {
			console.error("Error approving book:", err);
			setError("Failed to approve book");
		}
	};

	const handleReject = async (bookId: number) => {
		const reason = prompt("Enter rejection reason:");
		if (reason) {
			try {
				await adminService.rejectBook(bookId, reason);
				fetchBooks();
			} catch (err) {
				console.error("Error rejecting book:", err);
				setError("Failed to reject book");
			}
		}
	};

	if (error) {
		return (
			<div className="min-h-screen bgImage flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-400 text-lg">{error}</p>
					<button
						onClick={fetchBooks}
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
			<div className="min-h-screen bgImage">
				<div className="max-w-7xl mx-auto px-4 py-8">
					{/* Header */}
					<div className="flex justify-between items-center mb-8">
						<div>
							<Link
								to="/admin/dashboard"
								className="text-purple-400 hover:text-purple-300 text-sm mb-2 inline-block"
							>
								<i className="fa fa-arrow-left mr-2"></i>Back to Dashboard
							</Link>
							<h1 className="text-3xl font-bold text-gray-50 font-[Super]">
								Books Management
							</h1>
							<p className="text-gray-400 mt-2">
								Manage and monitor all books in the library
							</p>
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
									<p className="text-2xl font-bold text-gray-50">
										{books.filter((b) => b.status === "approved").length}
									</p>
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
									<p className="text-2xl font-bold text-gray-50">
										{books.filter((b) => b.status === "pending").length}
									</p>
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
									<p className="text-2xl font-bold text-gray-50">
										{books.filter((b) => b.status === "rejected").length}
									</p>
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
									<p className="text-2xl font-bold text-gray-50">
										{books.reduce((sum, b) => sum + b.downloads, 0)}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Books Table */}
					<BookTable
						books={filteredBooks}
						onBookClick={() => {}}
						onApprove={handleApprove}
						onReject={handleReject}
						onDelete={() => {}}
					/>
				</div>
			</div>
		</>
	);
};

export default AdminBooks;
