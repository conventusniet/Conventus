import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MUN2Team = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoPlayRef = useRef();
    
    const images = [
        {
            src: '/images/mun2.0/OC_Heads_group_min.webp',
            alt: 'CMUN 2.0 Team Photo'
        },
        {
            src: '/images/mun2.0/team1.jpg',
            alt: 'CMUN 2.0 Team Members'
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        autoPlayRef.current = nextSlide;
    });

    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        };

        const interval = setInterval(play, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 bg-gradient-to-br from-red-50 to-white mb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">Our Amazing Team</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        The dedicated individuals who made CMUN 2.0 a resounding success through their hard work, 
                        passion, and commitment to excellence.
                    </p>
                </div>
                
                <div className="relative max-w-5xl mx-auto">
                    {/* Carousel Container */}
                    <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ height: "600px" }}>
                        {/* Image Carousel */}
                        <div className="relative h-full w-full">
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
                                    animate={{ 
                                        opacity: index === currentIndex ? 1 : 0,
                                        x: index === currentIndex ? 0 : (index > currentIndex ? 100 : -100)
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                                        <h3 className="text-white text-2xl font-bold">CMUN 2.0 Team</h3>
                                        <p className="text-white/80">Working together for the success of CMUN 2.0</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Carousel Controls */}
                    <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 px-4">
                        <button 
                            className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 focus:outline-none z-10"
                            onClick={prevSlide}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 focus:outline-none z-10"
                            onClick={nextSlide}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-red-600' : 'bg-white/50'}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MUN2Team;