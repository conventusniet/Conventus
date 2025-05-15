import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import Link from 'next/link';
import PDFViewer from './PDFViewer';

const FlipbookNewsletter = ({ 
  title, 
  imageUrl, 
  pdfUrl,
  showViewAll = false, 
  showDownload = false 
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Set this to your actual page count
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[70%] p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-red-800 mb-4">Conference Highlights</h3>
          <p className="text-gray-700 mb-6">
          At Conventus, Our newsletter is designed to keep you informed and engaged with the latest updates from the Club. Each edition will feature highlights from our recent events, upcoming workshops, and opportunities to get involved. We aim to foster a sense of community and support among our members, providing valuable resources for personal and professional growth. Join us as we explore the dynamic world of Model United Nations, share insights, and celebrate the achievements of our members. Stay connected and be part of our journey toward becoming impactful global citizens!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(true)}
            >
              <FileText className="mr-2" size={20} />
              Preview Newsletter
            </motion.button>
            
            {showViewAll && (
              <Link href="/news">
                <motion.button
                  className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Newsletters
                </motion.button>
              </Link>
            )}
            
            {showDownload && (
              <a 
                href={pdfUrl} 
                download
                className="flex items-center justify-center bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full transition-colors"
              >
                <Download className="mr-2" size={20} />
                Download PDF
              </a>
            )}
          </div>
        </div>
        
        <div className="md:w-[30%] relative" style={{ minHeight: '400px' }}>
          <div className="relative h-full overflow-hidden cursor-pointer" onClick={() => setShowPreview(true)}>
            <div className="relative h-full w-full flex justify-center items-center">
              <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={560}
                className="object-contain h-auto max-h-[95%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
              <div className="text-white">
                <p className="mb-2 text-sm font-medium bg-red-600 w-fit px-2 py-1 rounded-full">CMUN 2.0 Edition</p>
                <h3 className="text-2xl font-bold mb-2">March 2025</h3>
                <p className="mb-4 opacity-90">Click to view the full newsletter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PDFViewer
        pdfUrl={pdfUrl}
        title={title}
        currentPage={currentPage}
        totalPages={totalPages}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
};

export default FlipbookNewsletter;