interface Book {
	id: number;
	title: string;
	author: string;
	downloads: number;
	rating: number;
}

interface TopBooksListProps {
	books: Book[];
}

const TopBooksList = ({ books }: TopBooksListProps) => {
	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
			<h3 className="text-lg font-semibold text-gray-50 mb-4">Top Books</h3>
			<div className="space-y-4">
				{books.length > 0 ? (
					books.map((book, index) => (
						<div key={book.id} className="flex items-center gap-4 pb-4 border-b border-gray-800 last:border-0">
							<div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
								<span className="text-purple-400 font-bold text-sm">{index + 1}</span>
							</div>
							<div className="flex-1">
								<h4 className="text-gray-50 font-medium text-sm">{book.title}</h4>
								<p className="text-gray-400 text-xs">{book.author}</p>
							</div>
							<div className="text-right">
								<p className="text-gray-300 text-sm font-semibold">{book.downloads}</p>
								<div className="flex items-center gap-1 mt-1">
									<i className="fa fa-star text-yellow-400 text-xs"></i>
									<span className="text-gray-400 text-xs">{book.rating}</span>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center py-8 gap-2">
						<i className="fa fa-book text-gray-500 text-3xl"></i>
						<p className="text-gray-400">No books available</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TopBooksList;
