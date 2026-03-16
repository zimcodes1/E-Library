import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Document, Page, pdfjs } from "react-pdf"
import { getBookDetail, getBookReviews, recordBookView, addToShelf, downloadBook, getUserShelves, removeFromShelf, addRecentBook, addReadingTime } from "../utils/books/bookService"
import { getBookFileUrl } from "../utils/imageUtils"
import { getAvatarUrl } from "../utils/avatarUtils"
import truncate from "../utils/truncateText"
import Message from "../components/ui/Message"

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

function ReadBook() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [goToPage, setGoToPage] = useState<string>('');
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [viewRecorded, setViewRecorded] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [bookmarkStatus, setBookmarkStatus] = useState<{isBookmarked: boolean, shelveId?: number}>({isBookmarked: false});
    const [favoriteStatus, setFavoriteStatus] = useState<{isFavorited: boolean, shelveId?: number}>({isFavorited: false});
    const [readingStartTime, setReadingStartTime] = useState<number>(Date.now());
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bookId) {
            loadBook();
            loadReviews();
            checkShelveStatus();
        }
    }, [bookId]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const loadBook = async () => {
        try {
            const data = await getBookDetail(Number(bookId));
            setBook(data);
            document.title = `${data.title} | Libronet`;
        } catch (err) {
            console.error('Failed to load book:', err);
            navigate('/home');
        } finally {
            setLoading(false);
        }
    };

    const loadReviews = async () => {
        try {
            const data = await getBookReviews(Number(bookId));
            setReviews(data.slice(0, 3));
        } catch (err) {
            console.error('Failed to load reviews:', err);
        }
    };

    const checkShelveStatus = async () => {
        try {
            const shelves = await getUserShelves();
            const bookmark = shelves.find((s: any) => s.book === Number(bookId) && s.shelf_type === 'bookmark');
            const favorite = shelves.find((s: any) => s.book === Number(bookId) && s.shelf_type === 'favorite');
            setBookmarkStatus({isBookmarked: !!bookmark, shelveId: bookmark?.id});
            setFavoriteStatus({isFavorited: !!favorite, shelveId: favorite?.id});
        } catch (err) {
            console.error('Failed to check shelve status:', err);
        }
    };

    const handleBookmark = async () => {
        try {
            if (bookmarkStatus.isBookmarked && bookmarkStatus.shelveId) {
                await removeFromShelf(bookmarkStatus.shelveId);
                setBookmarkStatus({isBookmarked: false});
                setMessage({ type: 'success', text: 'Removed from bookmarks!' });
            } else {
                const result = await addToShelf(Number(bookId), 'bookmark');
                setBookmarkStatus({isBookmarked: true, shelveId: result.id});
                setMessage({ type: 'success', text: 'Added to bookmarks!' });
            }
        } catch (err) {
            console.error('Failed to bookmark:', err);
            setMessage({ type: 'error', text: 'Failed to update bookmark' });
        }
    };

    const handleFavorite = async () => {
        try {
            if (favoriteStatus.isFavorited && favoriteStatus.shelveId) {
                await removeFromShelf(favoriteStatus.shelveId);
                setFavoriteStatus({isFavorited: false});
                setMessage({ type: 'success', text: 'Removed from favorites!' });
            } else {
                const result = await addToShelf(Number(bookId), 'favorite');
                setFavoriteStatus({isFavorited: true, shelveId: result.id});
                setMessage({ type: 'success', text: 'Added to favorites!' });
            }
        } catch (err) {
            console.error('Failed to favorite:', err);
            setMessage({ type: 'error', text: 'Failed to update favorite' });
        }
    };

    const handleDownload = async () => {
        try {
            await downloadBook(Number(bookId));
            
            // Fetch the file as blob and download
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${book.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            setBook({ ...book, download_count: book.download_count + 1 });
        } catch (err) {
            console.error('Failed to download:', err);
            alert('Failed to download book. Please try again.');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        if (!viewRecorded && bookId) {
            recordBookView(Number(bookId)).catch(err => console.error('Failed to record view:', err));
            addRecentBook(Number(bookId)).catch(err => console.error('Failed to add recent book:', err));
            setViewRecorded(true);
        }
    }

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const secondsRead = Math.floor((Date.now() - readingStartTime) / 1000);
            if (secondsRead >= 30) {
                const minutes = secondsRead / 60;
                addReadingTime(minutes).catch(err => console.error('Failed to track time:', err));
                setReadingStartTime(Date.now());
            }
        }, 30000);

        return () => {
            clearInterval(interval);
            const secondsRead = Math.floor((Date.now() - readingStartTime) / 1000);
            if (secondsRead >= 30) {
                const minutes = secondsRead / 60;
                addReadingTime(minutes).catch(err => console.error('Failed to track time:', err));
            }
        };
    }, [readingStartTime]);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-screen bg-[#060410]">
                <p className="text-gray-400 text-lg">Loading book...</p>
            </div>
        );
    }

    if (!book) return null;

    const fileUrl = book.file_url || getBookFileUrl(book.file);
    console.log('Book data:', book);
    console.log('File URL for PDF:', fileUrl);

    return (
        <div className="w-full flex justify-end items-start bg-[#060410] min-h-screen pb-10 max-sm:pb-25">
            {message && <Message type={message.type} text={message.text} />}
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-7/8 max-sm:w-full h-fit flex flex-col px-10 pt-5 max-sm:p-3 relative">
                <TopBar />

                {/* Book Info Header */}
                <div className="w-full max-w-4xl mx-auto mt-15 max-sm:mt-2 mb-6 p-6 bg-[#48576019] border border-gray-700 rounded-2xl">
                    <div className="flex gap-6 max-sm:flex-col">
                        <div className="flex-1">
                            <h1 className="text-3xl max-sm:text-2xl font-bold text-gray-50 mb-2">{book.title}</h1>
                            <p className="text-gray-400 mb-1">by {book.author}</p>
                            <p className="text-gray-500 text-sm mb-3">{book.publication_year} • {book.language}</p>
                            <div className="flex gap-4 text-sm text-gray-400 mb-3">
                                <span><i className="fa fa-star text-yellow-400"></i> {book.average_rating.toFixed(1)}</span>
                                <span><i className="fa fa-eye"></i> {book.view_count} views</span>
                                <span><i className="fa fa-download"></i> {book.download_count} downloads</span>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{truncate(book.description, 100)}</p>
                            <div className="flex gap-3 flex-wrap">
                                <button onClick={handleFavorite} className={`px-4 py-2 ${favoriteStatus.isFavorited ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-lg transition flex items-center gap-2`}>
                                    <i className={`fa ${favoriteStatus.isFavorited ? 'fa-heart-broken' : 'fa-star'}`}></i> {favoriteStatus.isFavorited ? 'Unfavorite' : 'Favorite'}
                                </button>
                                <button onClick={handleBookmark} className={`px-4 py-2 ${bookmarkStatus.isBookmarked ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition flex items-center gap-2`}>
                                    <i className={`fa ${bookmarkStatus.isBookmarked ? 'fa-bookmark-o' : 'fa-bookmark'}`}></i> {bookmarkStatus.isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                                </button>
                                <button onClick={handleDownload} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2">
                                    <i className="fa fa-download"></i> Download
                                </button>
                                <Link to={`/bookdetails/${bookId}`} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition flex items-center gap-2">
                                    <i className="fa fa-arrow-left"></i> Back to Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="w-full h-fit flex flex-col justify-center items-center">
                    <div
                        ref={containerRef}
                        className="w-full max-w-4xl flex justify-center items-center min-h-150 bg-[#48576019] rounded-xl overflow-x-auto border border-gray-700 relative"
                    >
                        {pageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#48576099] backdrop-blur-sm z-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-300 text-sm">Loading page...</p>
                                </div>
                            </div>
                        )}
                        <Document 
                            file={fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={(error) => {
                                console.error('PDF load error:', error);
                                console.log('Attempted file URL:', fileUrl);
                            }}
                            loading={
                                <div className="flex items-center justify-center p-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-300 text-sm">Loading document...</p>
                                    </div>
                                </div>
                            }
                        >
                            <Page
                                pageNumber={pageNumber}
                                width={containerWidth > 0 ? Math.min(containerWidth - 20, containerWidth * 0.95) : undefined}
                                renderMode="canvas"
                                loading=""
                                onRenderSuccess={() => setPageLoading(false)}
                            />
                        </Document>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <p className="text-gray-400">Page {pageNumber} of {numPages}</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                max={numPages}
                                value={goToPage}
                                onChange={(e) => setGoToPage(e.target.value)}
                                placeholder="Go to"
                                className="w-20 px-2 py-1 bg-[#31303e] border border-gray-700 rounded text-gray-200 text-sm outline-none focus:border-purple-500"
                            />
                            <button
                                onClick={() => {
                                    const page = parseInt(goToPage);
                                    if (page >= 1 && page <= numPages) {
                                        setPageLoading(true);
                                        setPageNumber(page);
                                        setGoToPage('');
                                    }
                                }}
                                disabled={!goToPage || pageLoading}
                                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white text-sm rounded transition"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {reviews.length > 0 && (
                    <div className="w-full max-w-4xl mx-auto mt-10 mb-6 p-6 bg-[#48576019] border border-gray-700 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-50 mb-4">Recent Reviews</h2>
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-4 bg-[#31303e] rounded-lg border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={getAvatarUrl(review.user.avatar_url)} alt={review.user.username} className="w-10 h-10 rounded-full" />
                                        <div className="flex-1">
                                            <p className="text-gray-200 font-medium">{review.user.username}</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`fa fa-star text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}></i>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {review.title && <h4 className="text-gray-300 font-medium mb-1">{review.title}</h4>}
                                    <p className="text-gray-400 text-sm">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                {pageNumber > 1 && (
                    <button
                        onClick={() => {
                            setPageLoading(true);
                            setPageNumber(pageNumber - 1);
                        }}
                        disabled={pageLoading}
                        className="fixed z-50 left-[18%] max-sm:left-5 top-1/2 -translate-y-1/2 p-4 max-sm:p-3 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed border-2 border-purple-400 text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-110 disabled:hover:scale-100"
                        aria-label="Previous page"
                    >
                        <i className="fa fa-chevron-left text-xl"></i>
                    </button>
                )}

                {pageNumber < numPages && (
                    <button
                        onClick={() => {
                            setPageLoading(true);
                            setPageNumber(pageNumber + 1);
                        }}
                        disabled={pageLoading}
                        className="fixed z-50 right-[5%] max-sm:right-5 top-1/2 -translate-y-1/2 p-4 max-sm:p-3 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed border-2 border-purple-400 text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-110 disabled:hover:scale-100"
                        aria-label="Next page"
                    >
                        <i className="fa fa-chevron-right text-xl"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

export default ReadBook;