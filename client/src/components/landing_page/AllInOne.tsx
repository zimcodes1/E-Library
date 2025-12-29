

function AllInOne() {
    return (
        <div className="flex flex-col justify-between items-center">
            <h1 className="text-5xl max-[900px]:text-4xl text-purple-950 font-semibold mb-10 yusei-magic-regular">All In One Platform</h1>
            <div className="flex max-sm:flex-wrap justify-evenly w-[60%] max-[900px]:w-full h-40 max-sm:h-fit bg-orange-200 rounded-2xl max-sm:py-5">
                <span className="flex w-1/4 max-sm:w-1/2 h-full max-sm:h-fit flex-col justify-center items-center">
                    <img src="/images/book.png" alt="E Books" />
                    <p className="font-medium text-gray-800 text-lg">E Books</p>
                </span>

                <span className="flex w-1/4 max-sm:w-1/2 h-full max-sm:h-fit flex-col justify-center items-center">
                    <img src="/images/book2.png" alt="Magazine" />
                    <p className="font-medium text-gray-800 text-lg">Magazine</p>
                </span>

                <span className="flex w-1/4 max-sm:w-1/2 h-full max-sm:h-fit flex-col justify-center items-center">
                    <img src="/images/headset.png" alt="Audio Books" />
                    <p className="font-medium text-gray-800 text-lg">Audio Books</p>
                </span>

                <span className="flex w-1/4 max-sm:w-1/2 h-full max-sm:h-fit flex-col justify-center items-center">
                    <img src="/images/pdf.png" alt="E Books" />
                    <p className="font-medium text-gray-800 text-lg">Documents</p>
                </span>
            </div>



        </div>
    )
}

export default AllInOne;