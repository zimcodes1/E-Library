import { Link } from 'react-router-dom';
import type { FormattedBook as Book } from "../../pages/AdminBooks";

interface BookTableProps {
	books: Book[];
	onBookClick: (bookId: number) => void;
	onApprove: (bookId: number) => void;
	onReject: (bookId: number) => void;
	onDelete: (book: Book) => void;
	onToggleVisibility: (bookId: number) => void;
}

const BookTable = ({ books, onBookClick, onApprove, onReject, onDelete, onToggleVisibility }: BookTableProps) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'approved': return 'bg-green-500/20 text-green-400';
			case 'pending': return 'bg-yellow-500/20 text-yellow-400';
			case 'rejected': return 'bg-red-500/20 text-red-400';
			default: return 'bg-gray-500/20 text-gray-400';
		}
	};

	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-[#48576033] border-b border-gray-800">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Book</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Author</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Category</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Uploaded By</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Downloads</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Rating</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-800">
						{books.map((book) => (
							<tr key={book.id} className="hover:bg-[#48576033] transition cursor-pointer" onClick={() => onBookClick(+book.id)}>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center">
											<i className="fa fa-book text-blue-400"></i>
										</div>
										<Link to={`/bookdetails/${book.id}`} onClick={(e) => e.stopPropagation()} className="text-gray-50 font-medium hover:text-purple-400 transition">{book.title}</Link>
									</div>
								</td>
								<td className="px-6 py-4 text-gray-400 text-sm">{book.author}</td>
								<td className="px-6 py-4 text-gray-400 text-sm">{book.category}</td>
								<td className="px-6 py-4 text-gray-400 text-sm">{book.uploadedBy}</td>
								<td className="px-6 py-4 text-gray-400 text-sm">{book.uploadDate}</td>
								<td className="px-6 py-4 text-gray-300 text-sm">{book.downloads}</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-1">
										<i className="fa fa-star text-yellow-400 text-xs"></i>
										<span className="text-gray-300 text-sm">{book.rating}</span>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
										{book.status}
									</span>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										{book.status === 'pending' && (
											<>
												<button onClick={(e) => { e.stopPropagation(); onApprove(+book.id); }} className="text-green-400 hover:text-green-300" title="Approve">
													<i className="fa fa-check"></i>
												</button>
												<button onClick={(e) => { e.stopPropagation(); onReject(+book.id); }} className="text-yellow-400 hover:text-yellow-300" title="Reject">
													<i className="fa fa-times"></i>
												</button>
											</>
										)}
										<button onClick={(e) => { e.stopPropagation(); onToggleVisibility(+book.id); }} className={`${book.isPublished ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`} title={book.isPublished ? 'Visible - Click to Hide' : 'Hidden - Click to Show'}>
											<i className={`fa ${book.isPublished ? 'fa-eye' : 'fa-eye-slash'}`}></i>
										</button>
										<button onClick={(e) => { e.stopPropagation(); onDelete(book); }} className="text-red-400 hover:text-red-300" title="Delete">
											<i className="fa fa-trash"></i>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BookTable;
