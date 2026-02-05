import BookItem from "./BookItem";

const ShelveItem = () => {
  return (
    <div className="flex justify-between items-center h-fit max-[900px]:w-[48%] max-sm:w-full p-2 rounded-2xl bg-[#4857605a] border-gray-700">
      <BookItem
        bookImage="/images/books/google_adsense.png"
        bookDetails={{
          title: "Google Adsense explained",
          author: "Jane Doe",
          year: 2015,
          rating: 3.9,
        }}
      ></BookItem>
      <span className="flex w-27 max-sm:w-1/2 h-40 flex-col items-center justify-between text-gray-400 relative">
        <i className="fa fa-close text-red-400 absolute -top-2 max-sm:top-1 right-1 cursor-pointer"></i>
        <span className="flex flex-col justify-center items-center">
          <p className="text-sm text-gray-300 mt-3">
            Last Read <i className="fa fa-eye"></i>
          </p>
          <p className="text-xs">05-01-2026</p>
          <p className="text-sm text-gray-300 mt-2">
            Total <i className="fa fa-clock"></i>{" "}
          </p>
          <p className="text-xs">1hr 32 Min</p>
        </span>
        <span className="flex flex-col items-center w-full">
          <button className="text-xs cursor-pointer bg-purple-600 p-2 mb-1 rounded-lg text-gray-50 w-9/10">
            <i className="fa fa-download"></i>
          </button>
          <button className="text-[10px] p-2 block w-9/10 rounded-lg bg-gray-50 text-gray-800 cursor-pointer">Read <i className="fa fa-book"></i></button>
        </span>
      </span>
    </div>
  );
};

export default ShelveItem;
