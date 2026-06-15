import { useState } from 'react';
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { WindowControls } from "../components/index.js";
import { Download, ChevronLeft, ChevronRight } from "lucide-react"; // Import navigation icons
import { Document, pdfjs, Page } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Track current page

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPage => prevPage + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div className="flex flex-col h-full w-full">

            {/* Header */}
            <header id="window-header" className="shrink-0 flex items-center justify-between px-2 py-1 bg-gray-200 border-b border-gray-300 cursor-move">
                <div className="flex items-center gap-2">
                    <WindowControls target="resume" />
                    <h2 className="text-sm font-bold">Resume.pdf</h2>
                </div>

                <div className="flex items-center gap-3">
                    {/* Page Navigation Controls */}
                    <div className="flex items-center gap-1 bg-white rounded px-2 py-0.5 border border-gray-300 shadow-sm">
                        <button
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                            aria-label="Previous Page"
                            className="p-1 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded cursor-pointer transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="text-xs font-mono w-16 text-center select-none">
                            {pageNumber} / {numPages || '--'}
                        </span>

                        <button
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                            aria-label="Next Page"
                            className="p-1 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded cursor-pointer transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <a href="/files/resume.pdf" download className="cursor-pointer hover:bg-gray-300 p-1 rounded transition-colors" title="download resume">
                        <Download className="icon w-4 h-4"/>
                    </a>
                </div>
            </header>

            {/* Content Area */}
            <div className="overflow-auto flex-1 bg-gray-500/10 flex justify-center p-4">
                <Document
                    file="files/resume.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex justify-center"
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-xl"
                        width={600} // Adjust this width based on your window size
                    />
                </Document>
            </div>
        </div>
    );
}

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;