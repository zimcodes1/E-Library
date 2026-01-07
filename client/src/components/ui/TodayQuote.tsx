import React, { useState, useEffect } from 'react';

// Define the shape of an individual quote
interface Quote {
  text: string;
  author: string;
}

// Define the component props
interface TodayQuotesProps {
  quotes: Quote[];
}

const TodayQuotes: React.FC<TodayQuotesProps> = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto-swipe logic
  useEffect(() => {
    if (!quotes || quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  // Guard clause for empty arrays
  if (!quotes || quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[currentIndex];

  return (
    <div className="w-4/10 h-full max-sm:h-40 max-sm:w-full flex rounded-xl bg-linear-to-br to-purple-900 from-[#b30220] transition-colors duration-500">
      <div className="w-full h-full flex flex-col p-5">
        <h1 className="text-lg text-gray-50 font-semibold">Today's Quote</h1>
        
        {/* Quote Text Container */}
        <div className="flex-1 flex flex-col justify-center">
          <p 
            key={currentIndex} 
            className="text-gray-100 text-sm my-3 animate-in fade-in slide-in-from-right-2 duration-500"
          >
            "{currentQuote.text}"
          </p>
          <p className="text-sm text-gray-50 ml-auto">~ {currentQuote.author}</p>
        </div>

        {/* Dynamic Pagination Dots */}
        <div className="flex justify-start items-center gap-1 mt-4">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to quote ${index + 1}`}
              className={`w-2 h-2 rounded-full border border-gray-50 transition-all duration-300 ${
                index === currentIndex ? "bg-amber-50" : "bg-transparent opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayQuotes;