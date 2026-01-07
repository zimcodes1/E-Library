import SideMenu from "../components/SideMenu"
import { TopBar } from "../components/TopMenu"
import { useState, useRef, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

function ReadBook() {
    useEffect(()=>{document.title = 'Reading... | Libronet'})
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    // Ref to measure the parent container's width
    const containerRef = useRef<HTMLDivElement>(null);

    const fileUrl = '/pdfs/two_boys.pdf';

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    }

    // Effect to handle window resizing
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth(); // Set initial width
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <div className="w-full flex justify-end items-center max-sm:items-start bgImage min-h-screen pb-10">
            <SideMenu />
            <div className="w-6/7 max-[900px]:w-7/8 max-sm:w-full h-fit flex flex-col px-10 pt-5 max-sm:p-3 relative">
                <TopBar />

                <div className="w-full h-fit flex flex-col mt-15 justify-center items-center">
                    {/* Container for PDF */}
                    <div
                        ref={containerRef}
                        className="w-full max-w-4xl flex justify-center items-center h-fit bg-[#48576019] rounded-md overflow-hidden"
                    >
                        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            {/* width prop makes the PDF scale to the container */}
                            <Page
                                pageNumber={pageNumber}
                                width={containerWidth > 0 ? containerWidth : undefined}
                                renderMode="canvas"
                            />
                        </Document>
                    </div>

                    <p className="mt-4 text-gray-400">Page {pageNumber} of {numPages}</p>
                </div>

                {/* Navigation Buttons */}
                {pageNumber > 1 && (
                    <span
                        onClick={() => setPageNumber(pageNumber - 1)}
                        className="p-4 max-sm:p-3 fixed z-50 left-[18%] max-sm:left-5 top-[45%] cursor-pointer rounded-full bg-black/30 backdrop-blur-sm border border-gray-700 text-gray-50 hover:bg-black/50 transition-colors"
                    >
                        <i className="fa fa-angle-left"></i>
                    </span>
                )}

                {pageNumber < numPages && (
                    <span
                        onClick={() => setPageNumber(pageNumber + 1)}
                        className="p-4 max-sm:p-3 fixed z-50 right-[5%] max-sm:right-5 top-[45%] cursor-pointer rounded-full bg-black/30 backdrop-blur-sm border border-gray-700 text-gray-50 hover:bg-black/50 transition-colors"
                    >
                        <i className="fa fa-angle-right"></i>
                    </span>
                )}
            </div>
        </div>
    )
}

export default ReadBook;