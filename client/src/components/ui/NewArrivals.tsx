import React from 'react';
import BookItem from "../BookItem";

interface Book {
  id: number | string;
  bookImage: string;
  // You can add title, author, etc., if BookItem supports them
}

interface NewArrivalsProps {
  books: Book[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ books }) => {
  // We double the array to ensure there's always content to fill the gap during the loop
  const displayBooks = [...books, ...books];

  return (
    <div className="w-[57%] h-full bg-transparent border border-gray-700 flex justify-between rounded-xl overflow-hidden group">
      {/* Sidebar Label */}
      <div className="w-1/13 h-full z-10 flex justify-center items-center bg-linear-to-b rounded-l-lg to-purple-900 from-[#b30220]">
        <p className="text-gray-50 text-sm -rotate-90 text-nowrap font-medium">
          New Arrivals
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="w-12/13 py-2 px-2 h-full flex overflow-hidden relative">
        <div className="flex w-full items-center justify-evenly">
          {displayBooks.map((book, index) => (
            <div key={`${book.id}-${index}`} className="shrink-0">
              <BookItem bookImage={book.bookImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;