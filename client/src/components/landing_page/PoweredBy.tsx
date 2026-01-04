import PowerElement from "../ui/PowerElement";

function PoweredBy() {
    return (
        <div className="flex flex-col justify-between items-center mt-10">
            <h1 className="text-3xl max-[900px]:text-xl text-gray-400 font-semibold">Powered by:</h1>
            <div className="flex mt-20 max-sm:mt-0 max-[900px]:mt-5 max-sm:flex-wrap gap-5 max-sm:gap-0 justify-evenly items-center w-full max-[900px]:w-full h-fit max-sm:h-fit rounded-2xl">
                <PowerElement PowerName="Google Books" PowerImage="google_books.png"></PowerElement>
                <PowerElement PowerName="Libby" PowerImage="libby.png"></PowerElement>
                <PowerElement PowerName="Internet Archive" PowerImage="internet_archive.png"></PowerElement>
                <PowerElement PowerName="ManyBooks" PowerImage="manybooks.png"></PowerElement>
            </div>
        </div>
    )
}

export default PoweredBy;