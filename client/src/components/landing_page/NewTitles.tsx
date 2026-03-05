import truncate from "../../utils/truncateText";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getRecentBooks } from "../../utils/books/bookService";
import { getBookCoverUrl } from "../../utils/imageUtils";

function NewTitleItem({
	bookId,
	bookImage,
	bookDetails,
}: {
	bookId: number;
	bookImage: string;
	bookDetails?: {
		title?: string;
		author?: string;
		rating?: number;
		year?: number;
		category?: string;
	};
}) {
	let bookTitle = bookDetails?.title;
	if (bookDetails?.title !== undefined) {
		return (
			<Link
				to={`/bookdetails/${bookId}`}
				className="hover:scale-105 transition duration-300 w-1/4 max-[900px]:mt-5 max-[900px]:w-[31%] max-sm:w-full h-90 max-[900px]:h-fit flex relative rounded-3xl flex-col backdrop-blur-2xl overflow-hidden px-5 py-6 border bg-[#48576019] border-gray-800"
			>
				<span className="flex w-fit mx-auto h-7/11 max-[900px]:h-35">
					<img src={bookImage} className="h-full w-auto" alt={bookTitle} />
				</span>
				<h3 className="text-lg max-[900px]:text-sm text-gray-400 mt-5">
					{truncate(bookTitle, 24)}
				</h3>
				<p className="text-sm text-gray-400 mt-2">{bookDetails.category || 'Story Book'}</p>
				<p className="text-sm text-gray-400">
					{bookDetails.author}, {bookDetails.year}
				</p>
				<p className="text-sm text-gray-400">
					Rating: {bookDetails.rating?.toFixed(1)}{" "}
					<i className="fa fa-star text-amber-300"></i>{" "}
				</p>
				<Link
					to={`/read/${bookId}`}
					className="absolute right-4 bottom-4 mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition duration-300 text-center"
				>
					Read
				</Link>{" "}
			</Link>
		);
	}
}

function NewTitles() {
	const [books, setBooks] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBooks();
	}, []);

	const loadBooks = async () => {
		try {
			const data = await getRecentBooks();
			setBooks(data);
		} catch (err) {
			console.error("Failed to load new titles:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className="flex flex-col justify-between items-center mt-20 max-[900px]:mt-10 max-sm:mt-5"
		>
			<h1 className="text-3xl max-[900px]:text-xl max-sm:text-xl text-gray-400 font-semibold">
				New Titles
			</h1>
			<div className="flex max-sm:flex-col max-[900px]:flex-wrap gap-5 max-[900px]:gap-0 mt-20 max-sm:mt-5 max-[900px]:mt-10 justify-evenly items-center w-full h-fit max-sm:py-5">
				{loading ? (
					<div className="flex flex-col items-center gap-3 py-10">
						<div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
						<p className="text-gray-400 text-sm">Loading new titles...</p>
					</div>
				) : books.length === 0 ? (
					<div className="flex flex-col items-center gap-4 py-10">
						<i className="fa fa-book text-6xl text-gray-600"></i>
						<p className="text-gray-400 text-xl">No new titles available</p>
					</div>
				) : (
					books.map((book) => (
						<NewTitleItem
							key={book.id}
							bookId={book.id}
							bookImage={getBookCoverUrl(book.cover_image)}
							bookDetails={{
								title: book.title,
								author: book.author,
								year: book.publication_year,
								rating: book.average_rating,
							category: book.category?.name,
							}}
						/>
					))
				)}
			</div>
			<Link to="/home" className="text-gray-400 text-sm mt-5">
				View More <i className="fa fa-arrow-right ml-1"></i>
			</Link>
		</motion.div>
	);
}

export default NewTitles;
