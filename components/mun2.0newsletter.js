import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import PDFViewer from './PDFViewer';

const MUN2Newsletter = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; // Set this to your actual page count
    
    const newsletterPdf = "/pdfs/CMUN_2.0_Newsletter.pdf"; // Update with actual path
    
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
        <section className="py-16 bg-gradient-to-r from-red-50 to-white mb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">CMUN 2.0 Newsletter</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                    <p className="text-red-700 text-lg max-w-2xl mx-auto">
                        Stay informed with our comprehensive coverage of the second edition
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-red-800 mb-4">Conference Highlights</h3>
                            <p className="text-gray-700 mb-6">
                                Our newsletter captures the essence of CMUN 2.0, featuring keynote speeches, 
                                committee sessions, and diplomatic achievements. Discover the dynamic debates 
                                and resolutions that shaped this year's conference.
                            </p>
                            <p className="text-gray-700 mb-6">
                                The publication includes exclusive interviews with delegates, insights from 
                                committee chairs, and behind-the-scenes moments that made CMUN 2.0 a memorable 
                                diplomatic experience for all participants.
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
                                <Link href="/news">
                                    <motion.button
                                        className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full flex items-center justify-center transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View All Newsletters
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="md:w-1/2 relative" style={{ minHeight: '400px' }}>
                            <div className="relative h-full overflow-hidden cursor-pointer" onClick={() => setShowPreview(true)}>
                                <Image
                                    src="/images/mun2.0/newsletter-preview.jpg" // Update with actual preview image
                                    alt="Newsletter Preview"
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 hover:scale-105"
                                />
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
                </div>
            </div>
            
            <PDFViewer
                pdfUrl={newsletterPdf}
                title="CMUN 2.0 Newsletter"
                currentPage={currentPage}
                totalPages={totalPages}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                onNextPage={nextPage}
                onPrevPage={prevPage}
            />
        </section>
    );
};

export default MUN2Newsletter;