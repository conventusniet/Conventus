import React from 'react';
import { X, Download } from 'lucide-react';

const isAbsolute = (url) => /^(https?:)?\/\//i.test(url);

const PDFViewer = ({ pdfUrl, title, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Resolve URL relative to current origin if it's a site-root path
  let resolvedUrl = pdfUrl;
  try {
    resolvedUrl = isAbsolute(pdfUrl) ? pdfUrl : new URL(pdfUrl, typeof window !== 'undefined' ? window.location.origin : '/').href;
  } catch (e) {
    // fallback to raw value
    resolvedUrl = pdfUrl;
  }

  // Encode to preserve spaces and other characters
  const safeUrl = encodeURI(resolvedUrl);

  // Determine whether we can embed the PDF in an iframe (same-origin)
  let canEmbed = false;
  try {
    if (typeof window !== 'undefined') {
      const parsed = new URL(resolvedUrl);
      canEmbed = parsed.origin === window.location.origin;
    }
  } catch (e) {
    canEmbed = false;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-[95vw] md:w-[85vw] lg:w-[75vw] h-[90vh] overflow-hidden flex flex-col">
        {/* Header with title and close button */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-gradient-to-r from-red-700 to-red-900 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-2">
            {canEmbed ? (
              <a
                href={safeUrl}
                download
                className="p-2 rounded-full hover:bg-red-800 transition-colors duration-200"
                title="Download PDF"
              >
                <Download size={20} />
              </a>
            ) : (
              <a
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-red-800 transition-colors duration-200"
                title="Open in new tab"
              >
                <Download size={20} />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-red-800 transition-colors duration-200"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF content area */}
        <div className="flex-1 bg-gray-100 h-[calc(90vh-4rem)] flex items-center justify-center">
          {canEmbed ? (
            <iframe
              src={safeUrl}
              className="w-full h-full border-none"
              title={title}
              loading="lazy"
            />
          ) : (
            <div className="p-8 text-center max-w-3xl">
              <p className="text-lg font-semibold mb-4">Unable to preview this PDF inside the site.</p>
              <p className="text-sm text-gray-700 mb-6">
                This file is hosted on an external server that prevents embedding (common for cloud storage like SharePoint or Google Drive). You can open or download it in a new tab.
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
                >
                  Open in new tab
                </a>
                <button
                  onClick={() => {
                    // try to navigate to the file in a new tab
                    window.open(safeUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full"
                >
                  Download / View
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;