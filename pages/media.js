import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sliderImages = [
    '/images/slider1.png',
    '/images/slider2.png',
    '/images/slider3.png',
    '/images/slider4.png',
    '/images/slider5.png',
    '/images/slider6.png',
];

const collageImages = [
    '/images/coll1.png',
    '/images/coll2.png',
    '/images/coll3.png',
    '/images/coll4.png',
    '/images/coll5.png',
    '/images/coll6.png',
    '/images/coll7.png',
    '/images/coll8.png',
];

const ImageModal = ({ src, alt, isOpen, onClose }) => {
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
                            alt={alt}
                            width={1000}
                            height={1000}
                            layout="intrinsic"
                            objectFit="contain"
                            className="rounded-lg"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-2xl"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const MediaPage = () => {
    const sliderRef = useRef(null);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        const slider = sliderRef.current;
        let scrollPosition = 0;

        const scroll = () => {
            scrollPosition += 1;
            if (scrollPosition >= slider.scrollWidth / 2) {
                scrollPosition = 0;
            }
            slider.scrollLeft = scrollPosition;
        };

        const intervalId = setInterval(scroll, 20);

        return () => clearInterval(intervalId);
    }, []);

    const openModal = (src) => {
        setModalImage(src);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl mt-20 md:text-6xl font-bold text-center mb-8">Welcome to Our Media Gallery</h2>
                    </div>
                </section>

                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Experience Our Journey</h2>
                        <div ref={sliderRef} className="overflow-hidden whitespace-nowrap">
                            <div className="inline-flex">
                                {[...sliderImages, ...sliderImages].map((src, index) => (
                                    <div key={index} className="w-64 h-40 mx-2 inline-block">
                                        <Image src={src} alt={`Slide ${index + 1}`} width={256} height={160} className="rounded-lg shadow-lg object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Moments in Collage</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {collageImages.map((src, index) => (
                                <motion.div
                                    key={index}
                                    className={`rounded-lg overflow-hidden shadow-lg cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openModal(src)}
                                >
                                    <Image
                                        src={src}
                                        alt={`Collage ${index + 1}`}
                                        width={index === 0 ? 800 : 400}
                                        height={index === 0 ? 800 : 400}
                                        layout="responsive"
                                        objectFit="cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <ImageModal
                src={modalImage}
                alt="Enlarged image"
                isOpen={!!modalImage}
                onClose={closeModal}
            />
        </div>
    );
};

export default MediaPage;