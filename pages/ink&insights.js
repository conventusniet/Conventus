import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from 'lucide-react';


const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { image: '/images/coll1.png', title: 'Ink & Insights', subtitle: 'Explore the World of Writing' },
        { image: '/images/coll2.png', title: 'Student Perspectives', subtitle: 'Fresh Voices in Literature' },
        { image: '/images/coll3.png', title: 'Author Spotlights', subtitle: 'Meet the Minds Behind the Books' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative h-[60vh] overflow-hidden">
            {slides.map((slide, index) => (
                <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentSlide === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-red-900 bg-opacity-70 flex flex-col justify-center items-center text-white">
                        <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                        <p className="text-xl">{slide.subtitle}</p>
                    </div>
                </motion.div>
            ))}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
            >
                <ChevronLeft size={28} />
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
            >
                <ChevronRight size={28} />
            </button>
        </div>
    );
};

const YouTubeShort = ({ videoId }) => {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="relative w-full pt-[177.78%]"> {/* 16:9 Aspect Ratio */}
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1&playsinline=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <button
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full z-10"
                onClick={() => setIsMuted(!isMuted)}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
        </div>
    );
};


const AuthorSection = ({ image, name, bio, reversed }) => (
    <div className={`flex flex-col md:flex-row items-center my-12 ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Image
                src={image}
                alt={name}
                width={300}
                height={400}
                objectFit="cover"
                className="rounded-lg"
            />
        </div>
        <div className="w-full md:w-2/3 md:px-8">
            <h3 className="text-2xl font-bold mb-4 text-red-800">{name}</h3>
            <p className="text-lg text-red-700">{bio}</p>
        </div>
    </div>
);
const MediaGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const images = [
        '/images/coll1.png', '/images/coll2.png', '/images/coll3.png', '/images/coll4.png',
        '/images/coll5.png', '/images/coll6.png', '/images/coll7.png', '/images/coll8.png',
        '/images/coll1.png', '/images/coll2.png', '/images/coll3.png', '/images/coll4.png',
        '/images/coll5.png', '/images/coll6.png', '/images/coll7.png', '/images/coll8.png',
        '/images/coll1.png', '/images/coll2.png', '/images/coll3.png', '/images/coll4.png',
    ];

    return (
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            width={400}
                            height={300}
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            layoutId={selectedImage}
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected image"
                                width={800}
                                height={600}
                                objectFit="contain"
                            />
                            <motion.button
                                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={24} />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InkAndInsightsPage = () => {
    const youtubeShorts = [
        'EGVbRNW4SJE',
        'EGVbRNW4SJE',
        'EGVbRNW4SJE'
    ];
    const authors = [
        { image: '/images/coll4.png', name: 'Author 1', bio: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
        { image: '/images/coll4.png', name: 'Author 2', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..' },
        { image: '/images/coll4.png', name: 'Author 3', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-red-50">
            <Header />
            <HeroCarousel />
            <main className="flex-grow container mx-auto px-4 py-12">
                <section className="mb-16">
                    <h1 className="text-5xl font-bold text-center mb-8 text-red-800">
                        Ink & Insights
                    </h1>
                    <p className="text-xl text-center mb-12 text-red-600">
                        Welcome to Ink & Insights, where we celebrate the art of writing, showcase emerging talents, and connect readers with authors. Dive into our world of literary exploration and creativity.
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="text-3xl text-center font-bold mb-8 text-red-800">Our Students on Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {youtubeShorts.map((videoId, index) => (
                            <YouTubeShort key={index} videoId={videoId} />
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl text-center font-bold mb-8 text-red-800">About the Authors</h2>
                    {authors.map((author, index) => (
                        <AuthorSection
                            key={index}
                            image={author.image}
                            name={author.name}
                            bio={author.bio}
                            reversed={index % 2 !== 0}
                        />
                    ))}
                </section>

                <section>
                    <h2 className="text-3xl text-center font-bold mb-8 text-red-800">Media Gallery</h2>
                    <MediaGallery />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default InkAndInsightsPage;