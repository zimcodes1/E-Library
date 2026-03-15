import { getBookCoverUrl } from "../../utils/imageUtils";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import truncate from "../../utils/truncateText";

interface UploadedBookItemProps {
  book: {
    id: number;
    title: string;
    author: string;
    cover_image: string;
  };
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const UploadedBookItem = ({ book, onDelete, onEdit }: UploadedBookItemProps) => {
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(book.id);
    } catch (error) {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col p-2 bg-[#48576019] border border-gray-700 rounded-xl hover:border-purple-500 transition">
      <img src={getBookCoverUrl(book.cover_image)} alt={book.title} className="w-full h-32 object-cover rounded-xl" />
      <h3 className="text-xs text-gray-50 mt-2" title={book.title}>{truncate(book.title, 20)}</h3>
      <p className="text-[10px] text-gray-400 mb-2" title={book.author}>{truncate(book.author, 25)}</p>
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onEdit(book.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1.5 rounded transition flex items-center justify-center gap-1"
          title="Edit book"
        >
          <i className="fa fa-edit"></i> <p className="max-sm:hidden">Edit</p>
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          disabled={deleting}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white text-xs py-1.5 rounded transition flex items-center justify-center gap-1"
          title="Delete book"
        >
          <i className="fa fa-trash"></i> <p className="max-sm:hidden">Delete</p>
        </button>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default UploadedBookItem;
