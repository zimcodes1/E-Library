import React from 'react';
import BookItem from "../BookItem";

interface Book {
  id: number | string;
  bookImage: string;
  bookDetails?: { title?: string; author?: string; rating?: number; year?: number };
}

interface NewArrivalsProps {
  books: Book[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ books }) => {
  return (
    <div className="w-[57%] max-sm:w-full max-sm:h-43 max-sm:mt-3 h-full bg-transparent border border-purple-700/10 flex justify-between rounded-xl overflow-hidden">
      <div className="w-1/13 h-full z-10 flex justify-center items-center bg-linear-to-b rounded-l-lg to-purple-900 from-[#b30220]">
        <p className="text-gray-50 text-sm -rotate-90 text-nowrap font-medium">
          New Arrivals
        </p>
      </div>

      <div className="w-12/13 px-2 h-fit flex relative overflow-x-scroll no-scrollbar">
        {books.length === 0 ? (
          <div className="text-gray-500 w-full h-full flex flex-col items-center justify-center">
            <i className="fa fa-chain-broken text-6xl mt-10"></i>
            <p className="text-sm">No new books to load</p>
          </div>
        ) : (
          <div className="flex items-center justify-start gap-3 max-sm:gap-2">
            {books.map((book, index) => (
              <div key={`${book.id}-${index}`}>
                <BookItem bookImage={book.bookImage} bookDetails={book.bookDetails} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;