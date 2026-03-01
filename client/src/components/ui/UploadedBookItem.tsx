import { getBookCoverUrl } from "../../utils/imageUtils";
import { useState } from "react";

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

  const handleDelete = async () => {
    if (!confirm(`Delete "${book.title}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(book.id);
    } catch (error) {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col p-2 bg-[#48576019] border border-gray-700 rounded-lg hover:border-purple-500 transition">
      <img src={getBookCoverUrl(book.cover_image)} alt={book.title} className="w-full h-32 object-cover rounded-lg" />
      <h3 className="text-xs text-gray-50 mt-2 truncate">{book.title}</h3>
      <p className="text-[10px] text-gray-400 truncate mb-2">{book.author}</p>
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onEdit(book.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1.5 rounded transition flex items-center justify-center gap-1"
          title="Edit book"
        >
          <i className="fa fa-edit"></i> Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white text-xs py-1.5 rounded transition flex items-center justify-center gap-1"
          title="Delete book"
        >
          <i className="fa fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default UploadedBookItem;
