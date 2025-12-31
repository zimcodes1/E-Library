

function SideMenu() {
    return (
        <div className="w-1/7 bg-white h-full flex flex-col justify-start items-center  pt-3 px-2 fixed left-0 top-0">
            <span className="flex w-full h-15 justify-start items-center">
                <img src="/images/logo.png" alt="Logo" className="h-10" />
                <h1 className="text-xl max-sm:text-3xl yusei-magic-regular gradient">Libronet</h1>

            </span>

            <span className="w-full h-fit mt-5 flex flex-col">
                <span className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-purple-950 px-2 hover:bg-purple-100 rounded-md transition duration-300">
                    <i className="fa fa-home"></i>
                    <p className="pl-2">Home</p>
                </span>
                <span className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-purple-950 px-2 hover:bg-purple-100 rounded-md transition duration-300">
                    <i className="fa fa-search"></i>
                    <p className="pl-2">Search</p>
                </span>
                <span className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-purple-950 px-2 hover:bg-purple-100 rounded-md transition duration-300">
                    <i className="fa fa-book"></i>
                    <p className="pl-2">My Shelve</p>
                </span>
                <span className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-purple-950 px-2 hover:bg-purple-100 rounded-md transition duration-300">
                    <i className="fa fa-plus-circle"></i>
                    <p className="pl-2">Upload</p>
                </span>
                <span className="w-full text-sm h-12 flex justify-start items-center cursor-pointer text-purple-950 px-2 hover:bg-purple-100 rounded-md transition duration-300">
                    <i className="fa-solid fa-hand-holding-heart"></i>
                    <p className="pl-2">Contribute</p>
                </span>
            </span>


            <span className="flex flex-col h-fit w-full text-gray-900 text-xs px-2 mt-auto mb-5">
                <a href="#" className="">About</a>
                <a href="#" className="my-2">Contact</a>
                <a href="#">Terms & Conditions</a>
            </span>
        </div>
    )
}

export default SideMenu
