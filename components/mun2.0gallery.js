import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageModal = ({ src, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        className="relative max-w-4xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={src}
                            alt="CMUN 2.0 Gallery Image"
                            width={1000}
                            height={1000}
                            layout="intrinsic"
                            objectFit="contain"
                            className="rounded-lg"
                        />
                        <motion.button
                            className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                        >
                            <X size={24} />
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const MUN2Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    const galleryImages = [
        { src: "/images/mun2.0/gallery/day1-1.jpg", day: 1 },
        { src: "/images/mun2.0/gallery/day1-2.jpg", day: 1 },
        { src: "/images/mun2.0/gallery/day1-3.jpg", day: 1 },
        { src: "/images/mun2.0/gallery/day1-4.jpg", day: 1 },
        { src: "/images/mun2.0/gallery/day1-5.jpg", day: 1 },
        { src: "/images/mun2.0/gallery/day1-6.jpg", day: 1 },
        { src: "/images/mun2.0/gallery/day2-1.jpg", day: 2 },
        { src: "/images/mun2.0/gallery/day2-2.jpg", day: 2 },
        { src: "/images/mun2.0/gallery/day2-3.jpg", day: 2 },
        { src: "/images/mun2.0/gallery/day2-4.jpg", day: 2 },
        { src: "/images/mun2.0/gallery/day2-5.jpg", day: 2 },
        { src: "/images/mun2.0/gallery/day2-6.jpg", day: 2 },
    ];

    const openModal = (src) => {
        setSelectedImage(src);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const getImageSize = (index) => {
        // Make every 5th image larger (2x2 grid span)
        if (index % 5 === 0) {
            return "col-span-2 row-span-2";
        }
        return "";
    };

    const filteredImages = activeTab === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.day === parseInt(activeTab));

    return (
        <section className="py-16 bg-gradient-to-r from-red-50 to-white mb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">Event Gallery</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                    <p className="text-red-700 text-lg max-w-2xl mx-auto mb-8">
                        Capturing the memorable moments from CMUN 2.0
                    </p>
                    
                    {/* Day Filter Tabs */}
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <button 
                            onClick={() => setActiveTab('all')}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                                activeTab === 'all' 
                                    ? 'bg-red-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            All Days
                        </button>
                        <button 
                            onClick={() => setActiveTab('1')}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                                activeTab === '1' 
                                    ? 'bg-red-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Day 1
                        </button>
                        <button 
                            onClick={() => setActiveTab('2')}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                                activeTab === '2' 
                                    ? 'bg-red-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Day 2
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                    >
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className={`relative overflow-hidden rounded-lg cursor-pointer shadow-md ${getImageSize(index)}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => openModal(image.src)}
                            >
                                <Image
                                    src={image.src}
                                    alt={`CMUN 2.0 Day ${image.day}`}
                                    width={400}
                                    height={400}
                                    layout="responsive"
                                    objectFit="cover"
                                    className="transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                                    <span className="text-white text-sm font-medium m-3 px-2 py-1 bg-red-600 rounded-full">Day {image.day}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className="text-center mt-10">
                    <a 
                        href="/media" 
                        className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-300"
                    >
                        View Full Gallery
                    </a>
                </div>
            </div>

            <ImageModal
                src={selectedImage}
                isOpen={!!selectedImage}
                onClose={closeModal}
            />
        </section>
    );
};

export default MUN2Gallery;