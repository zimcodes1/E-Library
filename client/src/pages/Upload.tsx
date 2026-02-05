import SideMenu from "../components/SideMenu";
import { TopBar } from "../components/TopMenu";
import CustomSelect from "../components/ui/CustomSelect";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import BookItem from "../components/BookItem";
import truncate from "../truncateText";

function Contribution() {
  return (
    <div className="h-50 max-sm:mt-2 w-fit max-sm:w-[32.5%] flex justify-between flex-col">
      <BookItem bookImage="/images/books/energy_hacks.png" customWidth="w-full" bookDetails={{ title: 'Top 10 Energy Hacks', author: 'Jane Doe', year: 2010, rating: 2.9 }}></BookItem>
      <span className="flex h-fit py-1 w-full px-1 rounded-4xl bg-[#4857605a] justify-between items-center border border-gray-700 shadow cursor-pointer">
        <span className="w-8 h-8 rounded-full overflow-hidden">
          <img src="/images/defaultUser.jpg" alt="User" />
        </span>
        <p className="text-xs text-gray-200">{truncate('Jane Doe', 15)}</p>
      </span>
    </div>
  )
}

function UploadPage() {

  useEffect(() => { document.title = 'Upload Your Book | Libronet' }, [])

  const [fileUploadFormat, setfileUploadFormat] = useState('PDF');
  return (
    <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10 max-sm:pb-25">
      {/* Side Navigation Menu */}
      <SideMenu />
      <div className="w-6/7 max-[900px]:w-8/9 max-sm:w-full max-sm:px-3 min-h-screen flex flex-col px-10 pt-5 relative">
        {/* Topbar component for Search Feature, Language Switch ... */}
        <TopBar />
        {/* Main Contents */}
        <div className="w-full h-full flex max-sm:flex-col max-[900px]:flex-col mt-15 max-sm:mt-3 justify-center items-center">
          <div className="w-1/2 max-[900px]:w-full flex h-full max-sm:h-fit justify-start max-[900px]:justify-center items-center">
            <form action="" className="flex-col w-8/10 h-9/10 max-sm:w-full p-5 rounded-2xl flex justify-between items-center bg-[#48576019] border border-gray-700">
              <div className="flex justify-between items-center w-full h-9/10 max-sm:flex-col">
                <div className="w-[65%] max-sm:w-9/10 h-full flex flex-col  overflow-scroll no-scrollbar">
                  <h3 className="text-gray-300 font-semibold"> Fill up book details</h3>
                  <span className="mt-5">
                    <input type="text" placeholder="Book Name" className="pl-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                    <input type="text" placeholder="Author" className="pl-3 mt-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                    <input type="number" max='2026' placeholder="Book Year" className="pl-3 mt-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                    <p className="text-gray-400 text-xs mt-2 text-center">Do you have the URL or the PDF file to upload?</p>
                    <span className="flex justify-between items-center mt-2 text-sm text-gray-400 px-5">
                      <span>Url <input type="radio" value='url' name="format" onChange={() => { setfileUploadFormat('URL') }} /></span>
                      <span>PDF <input type="radio" value='file' name="format" onChange={() => { setfileUploadFormat('PDF') }} defaultChecked /></span>
                    </span>
                    {(fileUploadFormat == 'URL') ? (
                      <input type="url" placeholder="Link to file..." className="pl-3 mt-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                    ) : (
                      <div onClick={() => { document.getElementById('fileInput')?.click() }} className="flex flex-col justify-center items-center mt-2 rounded-lg w-full h-25 bg-[#4857602f] border border-gray-800 cursor-pointer">
                        <i className="fa fa-file text-4xl text-[#6842ae3a]"></i>
                        <p className="text-gray-300 text-xs mt-1">Click to Upload file.</p>
                        <input type="file" accept=".pdf" className="hidden" id="fileInput" />
                      </div>
                    )}
                    <div onClick={() => { document.getElementById('bookCover')?.click() }} className="flex mt-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 justify-center items-center cursor-pointer">
                      <p className="text-gray-400">-- Select Book Cover --</p>
                      <input type="file" accept=".png, .jpg, .avif, .webp" className="hidden" id="bookCover" />
                    </div>
                  </span>
                </div>
                <div className="w-3/10 max-sm:w-9/10 max-sm:h-fit h-full flex flex-col justify-center items-center">
                  <span className="flex h-9 w-full mt-5 px-2 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer">
                    <CustomSelect defaultValue="Category" options={[{ value: "Science", label: "Science" }, { value: "Storybook", label: "Storybook" }]}></CustomSelect>
                  </span>
                  <span className="flex h-9 w-full mt-5 px-2 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer">
                    <CustomSelect defaultValue="Lang" options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }]}></CustomSelect>
                  </span>
                </div>
              </div>
              <Button text="Submit" styles="mt-4"></Button>
            </form>
          </div>
          <div className="w-1/2 max-[900px]:w-full max-[900px]:mt-5 max-sm:mt-5 flex flex-col h-full max-sm:h-fit justify-center items-start px-5">
            <h1 className="text-4xl text-gray-200 font-bold font-[Super]">Your <span className=" gradient">Contributions</span></h1>
            <h1 className="text-4xl text-gray-200 font-bold font-[Super]">Help Other to Learn 😇</h1>
            <p className="text-sm mt-5 text-gray-300">Recent Contributions</p>
            <div className="w-full h-fit mt-3 flex max-sm:flex-wrap justify-evenly max-sm:gap-1 items-center ">
              <Contribution></Contribution>
              <Contribution></Contribution>
              <Contribution></Contribution>
              <Contribution></Contribution>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
