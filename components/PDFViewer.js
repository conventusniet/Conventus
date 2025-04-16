import React from 'react';
import { X, Download } from 'lucide-react';

const PDFViewer = ({ pdfUrl, title, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-[95vw] md:w-[85vw] lg:w-[75vw] h-[90vh] overflow-hidden flex flex-col">
        {/* Header with title and close button */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-gradient-to-r from-red-700 to-red-900 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-2">
            <a 
              href={pdfUrl} 
              download
              className="p-2 rounded-full hover:bg-red-800 transition-colors duration-200"
              title="Download PDF"
            >
              <Download size={20} />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-red-800 transition-colors duration-200"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* PDF content with proper height */}
        <div className="flex-1 bg-gray-100 h-[calc(90vh-4rem)]">
          <iframe 
            src={pdfUrl}
            className="w-full h-full border-none"
            title={title}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;