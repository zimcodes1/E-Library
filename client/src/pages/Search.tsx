import SideMenu from "../components/SideMenu";
import { TopBar } from "../components/TopMenu";
import BookItem from "../components/BookItem";
import { useEffect, useState } from "react";
import { getBooks } from "../utils/books/bookService";
import { getCategories } from "../utils/categoryService";
import CustomSelect from "../components/ui/CustomSelect";

function SearchPage() {
	const [books, setBooks] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		document.title = "Search | Libronet";
		loadCategories();
	}, []);

	const loadCategories = async () => {
		try {
			const data = await getCategories();
			setCategories(data);
		} catch (err) {
			console.error("Failed to load categories:", err);
		}
	};

	const handleSearch = async () => {
		setLoading(true);
		try {
			const filters: any = {};
			if (searchQuery) filters.search = searchQuery;
			if (selectedCategory) filters.category = selectedCategory;
			const data = await getBooks(filters);
			setBooks(data);
		} catch (err) {
			console.error("Failed to search books:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-40">
			<SideMenu />
			<div className="w-6/7 max-[900px]:w-8/9 max-sm:w-full min-h-screen flex flex-col px-10 max-[900px]:px-5 max-sm:px-3 pt-5 relative">
				<TopBar />
				<div className="w-full h-full flex mt-15 max-sm:mt-3 flex-col">
					{/* Search Bar */}
					<div className="w-full max-w-4xl mx-auto">
						<div className="flex gap-3 max-sm:flex-col">
							<div className="md:flex-1 flex h-12 border border-gray-700 rounded-2xl overflow-hidden bg-[#4857605a]">
								<input
									type="text"
									placeholder="Search by title or author..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyPress={handleKeyPress}
									className="flex-1 px-4 bg-transparent outline-0 text-gray-200 placeholder-gray-500"
								/>
								<button
									onClick={handleSearch}
									className="w-12 bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition"
								>
									<i className="fa fa-search text-white"></i>
								</button>
							</div>
							<div
								className="h-12 px-4 flex justify-center items-center rounded-2xl bg-[#4857605a] border border-gray-700 text-gray-300 outline-0 cursor-pointer max-sm:w-full"
							>
								<CustomSelect
									defaultValue={selectedCategory || "All Categories"}
									options={[
										{ value: "", label: "All Categories" },
										...categories.map((cat) => ({
											value: cat.slug,
											label: cat.name,
										})),
									]}
									onChange={(value) => setSelectedCategory(value)}
									customStyles="bg-[#4857605a] border border-gray-700 max-sm:w-full"
								/>
							</div>
						</div>
					</div>

					{/* Results */}
					<div className="w-full mt-8">
						{loading ? (
							<p className="text-gray-400 text-center">Searching...</p>
						) : books.length > 0 ? (
							<>
								<p className="text-gray-400 mb-4">
									{books.length} results found
								</p>
								<div className="w-full overflow-hidden flex justify-start items-center py-2 flex-wrap gap-3 max-[900px]:gap-2 max-sm:gap-1">
									{books.map((book) => (
										<BookItem
											key={book.id}
											bookId={book.id}
											bookImage={book.cover_image}
											bookDetails={{
												title: book.title,
												author: book.author,
												rating: book.average_rating,
											}}
										/>
									))}
								</div>
							</>
						) : searchQuery || selectedCategory ? (
              <div className="text-center mt-10">
                <i className="fa fa-search text-6xl text-gray-700 mb-4"></i>
							<p className="text-gray-500 text-center mt-10">
								No books found. Try different search terms.
							</p>
						</div>) : (
							<div className="text-center mt-10">
								<i className="fa fa-search text-6xl text-gray-700 mb-4"></i>
								<p className="text-gray-500">
									Enter a search term or select a category to find books
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchPage;
