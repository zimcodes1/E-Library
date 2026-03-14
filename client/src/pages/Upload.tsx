import SideMenu from "../components/SideMenu";
import { TopBar } from "../components/TopMenu";
import CustomSelect from "../components/ui/CustomSelect";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Message from "../components/ui/Message";
import ConfirmModal from "../components/ui/ConfirmModal";
import { uploadBook, getUserUploadedBooks, deleteBook } from "../utils/books";
import { getCategories } from "../utils/user/interests";
import { getBookCoverUrl } from "../utils/imageUtils";
import truncate from "../utils/truncateText";
import { uploadToCloudinary } from "../utils/cloudinary";

function UploadPage() {
	useEffect(() => {
		document.title = "Upload Your Book | Libronet";
	}, []);

	const [fileUploadFormat, setFileUploadFormat] = useState("pdf");
	const [coverPreview, setCoverPreview] = useState<string | null>(null);
	const [userBooks, setUserBooks] = useState<any[]>([]);
	const [message, setMessage] = useState<{ type: string; text: string } | null>(
		null,
	);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<{ id: number; name: string }[]>(
		[],
	);
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		bookId: number | null;
	}>({ isOpen: false, bookId: null });

	const [formData, setFormData] = useState({
		title: "",
		author: "",
		description: "",
		category: "",
		publication_year: "",
		language: "English",
		pages: "",
		file: null as File | null,
		file_url: "",
		cover_image: null as File | null,
	});

	useEffect(() => {
		fetchUserBooks();
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const cats = await getCategories();
			setCategories(cats);
		} catch (err) {
			console.error("Failed to fetch categories");
		}
	};

	const fetchUserBooks = async () => {
		try {
			const books = await getUserUploadedBooks();
			console.log("Fetched user books:", books);
			setUserBooks(books);
		} catch (err) {
			console.error("Failed to fetch user books:", err);
			showMessage("error", "Failed to load your books");
		}
	};

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFormData({ ...formData, cover_image: file });
			const reader = new FileReader();
			reader.onloadend = () => setCoverPreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) setFormData({ ...formData, file });
	};

	const showMessage = (type: string, text: string) => {
		setMessage({ type, text });
		setTimeout(() => setMessage(null), 3000);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.title ||
			!formData.author ||
			!formData.category ||
			!formData.publication_year ||
			!formData.cover_image
		) {
			showMessage("error", "Please fill all required fields");
			return;
		}

		if (fileUploadFormat === "pdf" && !formData.file) {
			showMessage("error", "Please upload a PDF file");
			return;
		}

		if (fileUploadFormat === "url" && !formData.file_url) {
			showMessage("error", "Please provide a file URL");
			return;
		}

		try {
			setLoading(true);
			
			// Upload cover image to Cloudinary
			const coverUrl = await uploadToCloudinary(formData.cover_image);
			
			// Upload PDF to Cloudinary if file type is pdf
			let fileUrl = formData.file_url;
			if (fileUploadFormat === "pdf" && formData.file) {
				fileUrl = await uploadToCloudinary(formData.file);
			}

			// Send only URLs to backend
			const bookData = {
				title: formData.title,
				author: formData.author,
				description: formData.description,
				category: formData.category,
				publication_year: formData.publication_year,
				language: formData.language,
				file_type: fileUploadFormat,
				cover_image: coverUrl,
				file_url: fileUrl,
				...(formData.pages && { pages: formData.pages }),
			};

			await uploadBook(bookData);
			showMessage("success", "Book uploaded successfully!");

			setFormData({
				title: "",
				author: "",
				description: "",
				category: "",
				publication_year: "",
				language: "English",
				pages: "",
				file: null,
				file_url: "",
				cover_image: null,
			});
			setCoverPreview(null);
			fetchUserBooks();
		} catch (err: any) {
			showMessage("error", err.message || "Failed to upload book");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (bookId: number) => {
		try {
			await deleteBook(bookId);
			showMessage("success", "Book deleted successfully");
			fetchUserBooks();
		} catch (err: any) {
			showMessage("error", err.message || "Failed to delete book");
		}
	};

	return (
		<div className="w-full flex justify-end items-center bg-[#060410] min-h-screen pb-10 max-sm:pb-25">
			{message && <Message type={message.type} text={message.text} />}
			<ConfirmModal
				isOpen={deleteModal.isOpen}
				onClose={() => setDeleteModal({ isOpen: false, bookId: null })}
				onConfirm={() => deleteModal.bookId && handleDelete(deleteModal.bookId)}
				title="Delete Book"
				message="Are you sure you want to delete this book? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				type="danger"
			/>
			<SideMenu />
			<div className="w-6/7 max-[900px]:w-8/9 max-sm:w-full max-sm:px-3 min-h-screen flex flex-col px-10 pt-5 relative">
				<TopBar />
				<div className="w-full h-full flex max-sm:flex-col max-[900px]:flex-col mt-15 max-sm:mt-3 justify-center items-center">
					<div className="w-1/2 max-[900px]:w-full flex h-full max-sm:h-fit justify-start max-[900px]:justify-center items-center">
						<form
							onSubmit={handleSubmit}
							className="flex-col w-8/10 h-9/10 max-sm:w-full p-5 rounded-2xl flex justify-between items-center sm:bg-[#48576019] sm:border sm:border-purple-600/10"
						>
							<div className="flex justify-between items-center w-full h-9/10 max-sm:flex-col">
								<div className="w-[65%] max-sm:w-9/10 h-full flex flex-col overflow-scroll no-scrollbar">
									<h3 className="text-gray-300 font-semibold">
										Fill up book details
									</h3>
									<span className="mt-5">
										<input
											type="text"
											value={formData.title}
											onChange={(e) =>
												setFormData({ ...formData, title: e.target.value })
											}
											placeholder="Book Name *"
											className="pl-3 h-12 rounded-lg w-full bg-purple-500/5 border border-purple-500/20  focus:ring-0 text-gray-300 outline-0 ring-0"
											required
										/>
										<input
											type="text"
											value={formData.author}
											onChange={(e) =>
												setFormData({ ...formData, author: e.target.value })
											}
											placeholder="Author *"
											className="pl-3 mt-3 h-12 rounded-lg w-full bg-purple-500/5 border border-purple-500/20  focus:ring-0 text-gray-300 outline-0 ring-0"
											required
										/>
										<textarea
											maxLength={500}
											value={formData.description}
											onChange={(e) =>
												setFormData({
													...formData,
													description: e.target.value,
												})
											}
											placeholder="Description"
											className="pl-3 no-scrollbar pt-3 mt-3 h-20 rounded-lg w-full bg-purple-500/5 border border-purple-500/20 focus:ring-0 text-gray-300 outline-0 ring-0 resize-none"
										/>
										<input
											type="number"
											value={formData.publication_year}
											onChange={(e) =>
												setFormData({
													...formData,
													publication_year: e.target.value,
												})
											}
											min="1000"
											max="2026"
											placeholder="Publication Year *"
											className="pl-3 mt-3 h-12 rounded-lg w-full bg-purple-500/5 border border-purple-500/20  focus:ring-0 text-gray-300 outline-0 ring-0"
											required
										/>
										<input
											type="number"
											value={formData.pages}
											onChange={(e) =>
												setFormData({ ...formData, pages: e.target.value })
											}
											min="1"
											placeholder="Number of Pages"
											className="pl-3 mt-3 h-12 rounded-lg w-full bg-purple-500/5 border border-purple-500/20  focus:ring-0 text-gray-300 outline-0 ring-0"
										/>
										<p className="text-gray-400 text-xs mt-3 text-center">
											Do you have the URL or the PDF file to upload?
										</p>
										<span className="flex justify-between items-center mt-2 text-sm text-gray-400 px-5">
											<span>
												URL{" "}
												<input
													type="radio"
													value="url"
													name="format"
                          className="accent-purple-500"
													onChange={() => setFileUploadFormat("url")}
												/>
											</span>
											<span>
												PDF{" "}
												<input
													type="radio"
													value="pdf"
													name="format"
                          className="accent-purple-500"
													onChange={() => setFileUploadFormat("pdf")}
													defaultChecked
												/>
											</span>
										</span>
										{fileUploadFormat === "url" ? (
											<input
												type="url"
												value={formData.file_url}
												onChange={(e) =>
													setFormData({ ...formData, file_url: e.target.value })
												}
												placeholder="Link to file..."
												className="pl-3 mt-3 h-12 rounded-lg w-full bg-purple-500/5 border border-purple-500/20  text-gray-300 outline-0 ring-0"
											/>
										) : (
											<div
												onClick={() =>
													document.getElementById("fileInput")?.click()
												}
												className="flex flex-col justify-center items-center mt-2 rounded-lg w-full h-25 bg-purple-500/5 border border-purple-500/20  cursor-pointer"
											>
												<i className="fa fa-file text-4xl text-[#6842ae3a]"></i>
												<p className="text-gray-300 text-xs mt-1">
													{formData.file
														? formData.file.name
														: "Click to Upload PDF"}
												</p>
												<input
													type="file"
													accept=".pdf"
													onChange={handleFileChange}
													className="hidden"
													id="fileInput"
												/>
											</div>
										)}
									</span>
								</div>
								<div className="w-3/10 max-sm:w-9/10 max-sm:h-fit h-full flex flex-col justify-start items-center">
									<div
										onClick={() =>
											document.getElementById("bookCover")?.click()
										}
										className="max-sm:mt-2 w-full h-60 rounded-lg bg-purple-500/5 border border-purple-500/20  cursor-pointer overflow-hidden flex items-center justify-center"
									>
										{coverPreview ? (
											<img
												src={coverPreview}
												alt="Cover Preview"
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="flex flex-col items-center">
												<i className="fa fa-image text-4xl text-gray-600"></i>
												<p className="text-gray-400 text-xs mt-2">
													Upload Cover *
												</p>
											</div>
										)}
										<input
											type="file"
											accept=".png,.jpg,.jpeg,.avif,.webp"
											onChange={handleCoverChange}
											className="hidden"
											id="bookCover"
											required
										/>
									</div>
									<span className="flex w-full flex-col max-sm:flex-row justify-between">
										<span className="flex h-9 w-full max-sm:w-5/11 mt-5 px-2 rounded-4xl bg-purple-500/5 justify-center items-center border border-purple-500/20 shadow cursor-pointer">
											<CustomSelect
												defaultValue="Category"
												options={categories.map((cat) => ({
													value: cat.id.toString(),
													label: cat.name,
												}))}
												onChange={(val) =>
													setFormData({ ...formData, category: val })
												}
											></CustomSelect>
										</span>
										<span className="flex h-9 w-full max-sm:w-5/11 mt-5 px-2 rounded-4xl bg-purple-500/5 justify-center items-center border border-purple-500/20 shadow cursor-pointer">
											<CustomSelect
												defaultValue="Language"
												options={[
													{ value: "English", label: "English" },
													{ value: "Spanish", label: "Spanish" },
													{ value: "French", label: "French" },
													{ value: "German", label: "German" },
													{ value: "Chinese", label: "Chinese" },
													{ value: "Japanese", label: "Japanese" },
													{ value: "Arabic", label: "Arabic" },
													{ value: "Portuguese", label: "Portuguese" },
													{ value: "Russian", label: "Russian" },
													{ value: "Italian", label: "Italian" },
												]}
												onChange={(val) =>
													setFormData({ ...formData, language: val })
												}
											></CustomSelect>
										</span>
									</span>
								</div>
							</div>
							<Button
								text={loading ? "Uploading..." : "Submit"}
								styles="mt-5 rounded-lg w-[95%]"
								disabled={loading}
							></Button>
						</form>
					</div>
					<div className="w-1/2 max-[900px]:w-full max-[900px]:mt-5 max-sm:mt-5 flex flex-col h-full max-sm:h-fit justify-center items-start px-5">
						<h1 className="text-4xl text-gray-200 font-bold font-[Super]">
							Your <span className="gradient">Contributions</span>
						</h1>
						<h1 className="text-4xl text-gray-200 font-bold font-[Super]">
							Help Others to Learn 😇
						</h1>
						<p className="text-sm mt-5 text-gray-300">Recent Contributions</p>
						<div className="w-full h-fit mt-3 flex max-sm:flex-wrap justify-center items-center">
							{userBooks.length === 0 ? (
								<p className="text-gray-500 text-sm py-10">
									No contributions yet
								</p>
							) : (
								<div className="w-full flex flex-wrap gap-3">
									{userBooks.slice(0, 4).map((book) => (
										<div
											key={book.id}
											className="w-27 h-40 flex flex-col p-2 bg-[#31303e6d] border border-gray-700 rounded-2xl relative group"
										>
											<button
												onClick={() =>
													setDeleteModal({ isOpen: true, bookId: book.id })
												}
												className="absolute top-1 right-1 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
												title="Delete book"
											>
												<i className="fa fa-trash text-xs text-white"></i>
											</button>
											<img
												src={getBookCoverUrl(book.cover_image)}
												alt={book.title}
												className="h-7/11 w-full object-cover rounded-lg"
											/>
											<h3
												className="text-xs text-gray-50 mt-1.5"
												title={book.title}
											>
												{truncate(book.title, 15)}
											</h3>
											<p
												className="text-[10px] text-gray-400"
												title={book.author}
											>
												{truncate(book.author, 20)}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UploadPage;
