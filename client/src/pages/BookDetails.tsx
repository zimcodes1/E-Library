import SideMenu from "../components/SideMenu";
import { TopBar } from "../components/TopMenu";
import Review from "../components/Review";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReviewModal from "../components/ui/ReviewModal";
import Message from "../components/ui/Message";
import {
	getBookDetail,
	getBookReviews,
	addToShelf,
	addReview,
} from "../utils/books/bookService";
import { getBookCoverUrl } from "../utils/imageUtils";
import { getAvatarUrl } from "../utils/avatarUtils";
import truncate from "../utils/truncateText";

function BookDetails() {
	const { bookId } = useParams();
	const navigate = useNavigate();
	const [book, setBook] = useState<any>(null);
	const [reviews, setReviews] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeState, setActiveState] = useState("hidden");
	const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

	useEffect(() => {
		if (bookId) {
			loadBook();
			loadReviews();
		}
	}, [bookId]);

	const loadBook = async () => {
		try {
			const data = await getBookDetail(Number(bookId));
			setBook(data);
			document.title = `${data.title} | Libronet`;
		} catch (err) {
			console.error("Failed to load book:", err);
			navigate("/home");
		} finally {
			setLoading(false);
		}
	};

	const loadReviews = async () => {
		try {
			const data = await getBookReviews(Number(bookId));
			setReviews(data);
		} catch (err) {
			console.error("Failed to load reviews:", err);
		}
	};

	const handleBookmark = async () => {
		try {
			await addToShelf(Number(bookId), "bookmark");
			showMessage('success', 'Added to bookmarks!');
		} catch (err) {
			console.error("Failed to bookmark:", err);
			showMessage('error', 'Failed to add bookmark');
		}
	};

	const showMessage = (type: string, text: string) => {
		setMessage({ type, text });
		setTimeout(() => setMessage(null), 3000);
	};

	const handleSubmitReview = async (rating: number, title: string, content: string) => {
		try {
			await addReview(Number(bookId), { rating, title, content });
			showMessage('success', 'Review submitted successfully!');
			loadReviews();
			loadBook();
		} catch (err: any) {
			console.error('Failed to submit review:', err);
			showMessage('error', 'Failed to submit review. You may have already reviewed this book.');
		}
	};

	if (loading) {
		return (
			<div className="w-full flex justify-center items-center min-h-screen bgImage">
				<p className="text-gray-400 text-lg">Loading book details...</p>
			</div>
		);
	}

	if (!book) return null;
	return (
		<div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-25">
			{message && <Message type={message.type} text={message.text} />}
			{/* Side Navigation Menu */}
			<SideMenu />
			<div className="w-6/7 max-[900px]:w-7/8 max-sm:w-full min-h-screen flex flex-col px-10 max-[900px]:px-5 max-sm:px-3 pt-5 relative">
				{/* Topbar component for Search Feature, Language Switch ... */}
				<TopBar />
				{/* Main Contents */}
				<div className="w-full h-full flex mt-15 max-sm:mt-3 justify-center items-start">
					<div className="w-8/10 max-[900px]:w-9/10 max-sm:w-full h-fit flex flex-col">
						{/* Book Info Section */}
						<div className="flex relative w-full h-fit overflow-hidden bg-linear-to-br to-purple-900 from-[#b30220] p-6 rounded-2xl justify-between max-sm:flex-col max-sm:justify-center">
							<div className="w-4/5 max-sm:w-full h-full flex gap-4">
								<div className="w-32 h-48 overflow-hidden rounded-lg shrink-0">
									<img
										src={getBookCoverUrl(book.cover_image)}
										className="w-full h-full object-cover"
										alt={book.title}
									/>
								</div>
								<div className="flex-1 flex-col text-gray-50">
									<h2 className="font-semibold text-2xl max-sm:text-xl mb-3">
										{book.title}
									</h2>
									<p className="mt-2">
										<i className="fa fa-user"></i>{" "}
										<span className="text-gray-200">Author: </span>
										{book.author}
									</p>
									<p className="mt-2">
										<i className="fa fa-folder-open"></i>{" "}
										<span className="text-gray-200">Category: </span>
										{book.category.name}
									</p>
									<p className="mt-2">
										<i className="fa fa-star text-amber-300"></i>{" "}
										<span className="text-gray-200">Rating: </span>{" "}
										{book.average_rating.toFixed(1)}
									</p>
									<p className="mt-2">
										<i className="fa fa-calendar"></i>{" "}
										<span className="text-gray-200">Year: </span>{" "}
										{book.publication_year}
									</p>
									<p className="mt-2 text-gray-200 text-sm">
										{truncate(book.description, 80)}
									</p>
									<span className="flex items-center mt-2">
										<span className="w-8 h-8 flex rounded-full overflow-hidden">
											<img
												src={getAvatarUrl(book.uploaded_by.avatar)}
												className="w-full h-full object-cover"
												alt={book.uploaded_by.username}
											/>
										</span>
										<p className="ml-2 text-gray-100">
											{book.uploaded_by.username}
										</p>
									</span>
								</div>
							</div>
							<div className="w-1/5 max-sm:w-full h-full flex flex-col justify-between items-end max-sm:flex-row max-sm:mt-4">
								<Link
									to={`/reading/${bookId}`}
									className="text-gray-50 font-semibold bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-lg hover:bg-white hover:text-purple-600 transition duration-300 border border-white/30"
								>
									Read Now
								</Link>
							</div>
							<i
								onClick={handleBookmark}
								className=" right-4 bottom-5 absolute fa fa-bookmark text-3xl text-gray-100 hover:text-amber-300 cursor-pointer transition"
							></i>
						</div>
						<div className="w-full h-fit flex flex-col items-center p-5">
							<h2 className="font-semibold text-2xl text-gray-400">
								About The Book
							</h2>
							<p className="text-center text-gray-300 mt-5">
								{book.description}
							</p>
						</div>

						<h2 className="font-semibold text-2xl text-gray-400 mx-auto my-5">
							Book Reviews
						</h2>
						<div className="w-full h-fit flex flex-wrap justify-between items-center gap-4">
							{reviews.length === 0 ? (
								<p className="text-gray-500 text-center w-full">
									No reviews yet. Be the first to review!
								</p>
							) : (
								reviews
									.slice(0, 3)
									.map((review) => (
										<Review
											key={review.id}
											text={review.content}
											userName={review.user.username}
											userImage={getAvatarUrl(review.user.avatar)}
											rating={review.rating}
											date={new Date(review.created_at).toLocaleDateString()}
										/>
									))
							)}
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						setActiveState("flex");
					}}
					className="text-gray-800 w-30 mx-auto mt-5 cursor-pointer py-2 rounded-2xl bg-gray-50 inline-block"
				>
					{" "}
					<i className="fa fa-pen"></i> Review
				</button>
			</div>
			<div
				className={`w-full h-full top-0 left-0 ${activeState} justify-center items-center bg-[#48576019] backdrop-blur-2xl fixed z-999`}
			>
				<ReviewModal
					onClose={() => {
						setActiveState("hidden");
					}}
					onSubmit={handleSubmitReview}
				></ReviewModal>
			</div>
		</div>
	);
}

export default BookDetails;
