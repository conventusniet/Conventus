import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConventusChatbot from '@/components/ConventusChatBot';
const LazyLoading = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    onLoadingComplete();
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <div className="fixed inset-0 bg-[#AA172C] flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 overflow-hidden">
                <div className="w-24 h-24 relative">
                    <Image
                        src="/images/conv-logo.png"
                        alt="CONVENTUS Logo"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
            </div>
            <div className="text-white text-4xl font-bold mb-4">{progress}%</div>
            <div className="w-64 h-2 bg-[#8A1323] rounded-full overflow-hidden">
                <div
                    className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="mt-4 text-white text-xl font-light">NAGATIO | SOLUTIO | ACTIO</div>
        </div>
    );
};

const sliderImages = [
        '/images/artbinnealeteam.JPG',
        '/images/sahityaajtakteam.JPG',
        '/images/coll1.jpg',
        '/images/coll2.jpg',
        '/images/coll3.jpg',
        '/images/coll4.jpg',
        '/images/coll5.jpg',
        '/images/coll6.jpg',
        '/images/coll7.jpg',
        '/images/coll8.jpg',
        '/images/amimunteam.jpg',
];

const collageImages = [
    '/images/coll1.png',
    '/images/coll2.png',
    '/images/coll3.png',
    '/images/coll5.png',
    '/images/coll6.png',
    '/images/coll7.png',
    '/images/coll8.png',
    '/images/coll1.png',
    '/images/coll2.png',
    '/images/coll3.png',
    '/images/coll5.png',
    '/images/coll6.png',
    '/images/coll7.png',
    '/images/coll8.png',
    '/images/coll1.png',
    '/images/coll2.png',
    '/images/coll3.png',
    '/images/coll5.png',
    '/images/coll6.png',
    '/images/coll7.png',
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
        let intervalId;

        const scroll = () => {
            if (slider) {
                scrollPosition += 1;
                if (scrollPosition >= slider.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                slider.scrollLeft = scrollPosition;
            }
        };

        const startScrolling = () => {
            if (slider && slider.scrollWidth > 0) {
                intervalId = setInterval(scroll, 20);
            } else {
                setTimeout(startScrolling, 100);
            }
        };

        const scrollTimer = setTimeout(startScrolling, 100);

        return () => {
            clearInterval(intervalId);
            clearTimeout(scrollTimer);
        };
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {collageImages.map((src, index) => (
                                <motion.div
                                    key={index}
                                    className={`rounded-lg overflow-hidden shadow-lg cursor-pointer ${index % 7 === 0 ? 'col-span-2 row-span-2' : ''
                                        }`}
                                    whileHover={{ scale: 1.05, rotate: Math.random() * 10 - 5 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => openModal(src)}
                                >
                                    <Image
                                        src={src}
                                        alt={`Collage ${index + 1}`}
                                        width={400}
                                        height={400}
                                        layout="responsive"
                                        objectFit="cover"
                                        className="transform transition-transform duration-500 hover:scale-110"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                <ConventusChatbot/>
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
