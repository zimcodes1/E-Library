

function AllInOne() {
    return (
        <div className="flex flex-col justify-between items-center">
            <h1 className="text-5xl text-purple-950 font-semibold mb-10">All In One Platform</h1>
            <div className="flex justify-evenly w-[60%] h-40">
                <span className="flex w-1/4 h-full flex-col justify-center items-center">
                    <img src="/images/book.png" alt="E Books" />
                    <p className="font-medium text-gray-800 text-lg">E Books</p>
                </span>

                <span className="flex w-1/4 h-full flex-col justify-center items-center">
                    <img src="/images/book2.png" alt="Magazine" />
                    <p className="font-medium text-gray-800 text-lg">Magazine</p>
                </span>

                <span className="flex w-1/4 h-full flex-col justify-center items-center">
                    <img src="/images/headset.png" alt="Audio Books" />
                    <p className="font-medium text-gray-800 text-lg">Audio Books</p>
                </span>

                <span className="flex w-1/4 h-full flex-col justify-center items-center">
                    <img src="/images/pdf.png" alt="E Books" />
                    <p className="font-medium text-gray-800 text-lg">Documents</p>
                </span>
            </div>



        </div>
    )
}

export default AllInOne;