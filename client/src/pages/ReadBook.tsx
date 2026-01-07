import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
//Import neccessary styles for text and annotation layers.
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

//configure the pdf.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


function ReadBook() {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1)
    const fileUrl = '/pdfs/google_adsense.pdf';

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }
    return (
        <div className="w-full flex justify-end items-center bgImage min-h-screen pb-10">
            {/* Side Navigation Menu */}
            <SideMenu />
            <div className="w-6/7 h-fit flex flex-col px-10 pt-5 relative">
                {/* Topbar component for Search Feature, Language Switch ... */}
                <TopBar />
                {/* Main Contents */}
                <div className="w-full h-fit flex flex-col mt-15 justify-center items-center">
                    <div className="max-w-8/10 h-fit overflow-hidden bg-[#48576019] rounded-md">
                        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber}></Page>
                        </Document>
                    </div>
                    <p className="mt-4 text-gray-400">Page {pageNumber} of {numPages}</p>
                </div>
                {/* Page Navigation */}
                {(pageNumber < 2) ? null : <span onClick={() => { setPageNumber(pageNumber - 1) }} title="Previous Page" className="p-4 fixed z-50 left-1/6 top-[45%] cursor-pointer rounded-full bg-[#48576019] border border-gray-700 text-gray-50"><i className="fa fa-angle-left"></i></span>}
                {(pageNumber >= numPages) ? null : <span onClick={() => { setPageNumber(pageNumber + 1) }} title="Next Page" className="p-4 fixed z-50 right-1/12 top-[45%] cursor-pointer rounded-full bg-[#48576019] border border-gray-700 text-gray-50"><i className="fa fa-angle-right"></i></span>}
            </div>
        </div>
    )
}


export default ReadBook