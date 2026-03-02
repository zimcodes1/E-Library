import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import { getBookFileUrl } from "../utils/imageUtils";
import { downloadBook } from "../utils/books";

interface ShelveItemProps {
  shelveItem: {
    id: number;
    book_details: {
      id: number;
      title: string;
      author: string;
      publication_year: number;
      average_rating: number;
      cover_image: string;
      file?: string;
      file_url?: string;
      file_type: string;
    };
    shelf_type: string;
    added_date: string;
  };
  onRemove: (id: number) => void;
}

const ShelveItem = ({ shelveItem, onRemove }: ShelveItemProps) => {
  const handleDownload = async () => {
    try {
      await downloadBook(shelveItem.book_details.id);
      
      let fileUrl;
      if (shelveItem.book_details.file_type === 'url') {
        fileUrl = shelveItem.book_details.file_url;
      } else {
        fileUrl = getBookFileUrl(shelveItem.book_details.file);
      }
      
      if (fileUrl) {
        // Fetch the file as blob and download
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${shelveItem.book_details.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to download:', err);
      alert('Failed to download book. Please try again.');
    }
  };

  return (
    <div className="flex justify-between items-center h-fit max-[900px]:w-[48%] max-sm:w-full p-2 rounded-2xl bg-[#4857605a] border-gray-700">
      <BookItem
        bookImage={shelveItem.book_details.cover_image}
        bookDetails={{
          title: shelveItem.book_details.title,
          author: shelveItem.book_details.author,
          year: shelveItem.book_details.publication_year,
          rating: shelveItem.book_details.average_rating,
        }}
      ></BookItem>
      <span className="flex w-27 max-sm:w-1/2 h-40 flex-col items-center justify-between text-gray-400 relative">
        <i 
          onClick={() => onRemove(shelveItem.id)} 
          className="fa fa-close text-red-400 absolute -top-2 max-sm:top-1 right-1 cursor-pointer hover:text-red-500 transition"
          title="Remove from shelve"
        ></i>
        <span className="flex flex-col justify-center items-center">
          <p className="text-sm text-gray-300 mt-3">
            Added <i className="fa fa-calendar"></i>
          </p>
          <p className="text-xs">{new Date(shelveItem.added_date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-300 mt-2">
            Type <i className="fa fa-tag"></i>
          </p>
          <p className="text-xs capitalize">{shelveItem.shelf_type}</p>
        </span>
        <span className="flex flex-col items-center w-full">
          <button 
            onClick={handleDownload}
            className="text-xs cursor-pointer bg-purple-600 hover:bg-purple-700 p-2 mb-1 rounded-lg text-gray-50 w-9/10 transition"
          >
            <i className="fa fa-download"></i>
          </button>
          <Link 
            to={`/reading/${shelveItem.book_details.id}`}
            className="text-[10px] p-2 block w-9/10 text-center rounded-lg bg-gray-50 hover:bg-gray-200 text-gray-800 cursor-pointer transition"
          >
            Read <i className="fa fa-book"></i>
          </Link>
        </span>
      </span>
    </div>
  );
};

export default ShelveItem;
