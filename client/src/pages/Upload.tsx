import SideMenu from "../components/SideMenu";
import { TopBar } from "../components/TopMenu";
import CustomSelect from "../components/ui/CustomSelect";
import { useState } from "react";
import Button from "../components/ui/Button";


function UploadPage() {

  const [fileUploadFormat, setfileUploadFormat] = useState('PDF');
  return (
    <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10">
      {/* Side Navigation Menu */}
      <SideMenu />
      <div className="w-6/7 h-screen flex flex-col px-10 pt-5 relative">
        {/* Topbar component for Search Feature, Language Switch ... */}
        <TopBar />
        {/* Main Contents */}
        <div className="w-8/10 h-full flex mt-15 justify-between items-center">
          <div className="w-1/2 flex h-full justify-start items-center">
            <form action="" className="w-full h-9/10 p-5 rounded-2xl flex justify-between items-center bg-[#48576019] border border-gray-700">
              <div className="w-[65%] h-full flex flex-col">
                <h3 className="text-gray-300 font-semibold"> Fill up book details</h3>
                <span className="mt-10">
                  <input type="text" placeholder="Book Name" className="pl-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                  <input type="text" placeholder="Author" className="pl-3 mt-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                  <input type="number" max='2026' placeholder="Book Year" className="pl-3 mt-3 h-12 rounded-lg w-full bg-[#4857602f] border border-gray-800 text-gray-300 outline-0 ring-0" />
                  <p className="text-gray-400 text-xs mt-2 text-center">Do you have the URL or the PDF file to upload?</p>
                  <span className="flex justify-between items-center mt-2 text-sm text-gray-400 px-5">
                    <span>Url <input type="radio" value='url' name="format" onChange={() => { setfileUploadFormat('URL') }} /></span>
                    <span>PDF <input type="radio" value='file' name="format" onChange={() => { setfileUploadFormat('PDF') }} /></span>
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
                </span>
                <Button text="Submit" styles="mt-4"></Button>
              </div>
              <div className="w-3/10 h-full flex flex-col justify-center items-center">
                <span className="flex h-9 w-full mt-5 px-2 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer">
                  <CustomSelect defaultValue="Category" options={[{ value: "Science", label: "Science" }, { value: "Storybook", label: "Storybook" }]}></CustomSelect>
                </span>
                <span className="flex h-9 w-full mt-5 px-2 rounded-4xl bg-[#4857605a] justify-center items-center border border-gray-700 shadow cursor-pointer">
                  <CustomSelect defaultValue="Lang" options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }]}></CustomSelect>
                </span>
              </div>
            </form>
          </div>
          <div className="w-1/2 flex h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
