import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConventusChatbot from '@/components/ConventusChatBot';
import PinterestGallery from '@/components/PinterestGallery';

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
    '/images/mun2.0/gallery/day1-1.webp',
    '/images/mun2.0/gallery/day2-2.webp',
    '/images/mun2.0/gallery/day1-3.webp',
    '/images/mun2.0/gallery/day2-4.webp',
    '/images/mun2.0/gallery/day1-5.webp',
    '/images/Slider (1).jpg',
    '/images/Slider (2).jpg',
    '/images/Slider (3).jpg',
    '/images/Slider (4).jpg',
    '/images/Slider (5).jpg',
];

const mun2Images = [
    { src: "/images/mun2.0/gallery/day1-1.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-2.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-3.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-4.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-5.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-6.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-7.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-8.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-9.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-10.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-11.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day1-12.webp", badge: "Day 1", day: 1 },
    { src: "/images/mun2.0/gallery/day2-1.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-2.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-3.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-4.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-5.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-6.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-7.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-8.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-9.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-10.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-11.webp", badge: "Day 2", day: 2 },
    { src: "/images/mun2.0/gallery/day2-12.webp", badge: "Day 2", day: 2 },
];

const mun1Images = [
    { src: '/images/Media (1).JPG', badge: "Other Events" },
    { src: '/images/Media (2).jpg', badge: "Other Events" },
    { src: '/images/Media (3).jpg', badge: "Other Events" },
    { src: '/images/Media (4).jpg', badge: "Other Events" },
    { src: '/images/Media (5).jpg', badge: "Other Events" },
    { src: '/images/Media (6).jpg', badge: "Other Events" },
    { src: '/images/Media (7).jpg', badge: "Other Events" },
    { src: '/images/Media (8).jpg', badge: "Other Events" },
    { src: '/images/Media (9).jpg', badge: "Other Events" },
    { src: '/images/Media (10).jpg', badge: "Other Events" },
    { src: '/images/Media (11).jpg', badge: "Other Events" },
    { src: '/images/Media (12).jpg', badge: "Other Events" },
    { src: '/images/Media (13).jpg', badge: "Other Events" },
    { src: '/images/Media (14).jpg', badge: "Other Events" },
    { src: '/images/Media (15).jpg', badge: "Other Events" },
    { src: '/images/Media (16).jpg', badge: "Other Events" },
    { src: '/images/Media (17).jpg', badge: "Other Events" },
    { src: '/images/Media (18).jpg', badge: "Other Events" },
];

const allGalleryImages = [
    ...mun2Images,
    ...mun1Images
];

const MediaPage = () => {
    const sliderRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);

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

    const filterFunction = (images, tab) => {
        switch(tab) {
            case 'mun2.0':
                return images.filter(img => img.day !== undefined);
            case 'other':
                return images.filter(img => img.badge === "Other Events");
            default:
                return images;
        }
    };

    const tabs = [
        { label: "All Images", value: "all" },
        { label: "MUN 2.0", value: "mun2.0" },
        { label: "Other Events", value: "other" }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl mt-20 md:text-6xl font-bold text-center mb-8">Welcome to Our Media Gallery</h2>
                    </div>
                </section>

                <section className="py-12 bg-gray-100 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Experience Our Journey</h2>
                        <div ref={sliderRef} className="overflow-x-hidden whitespace-nowrap">
                            <div className="inline-flex">
                                {[...sliderImages, ...sliderImages].map((src, index) => (
                                    <div key={index} className="w-64 h-40 mx-2 inline-block relative">
                                        <Image 
                                            src={src} 
                                            alt={`Slide ${index + 1}`} 
                                            layout="fill"
                                            objectFit="cover" 
                                            className="rounded-lg shadow-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-6">Our Moments at a Glance</h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8" />
                        
                        <PinterestGallery 
                            images={allGalleryImages}
                            tabs={tabs}
                            defaultTab="all"
                            filterFunction={filterFunction}
                        />
                    </div>
                </section>
                <ConventusChatbot />
            </main>

            <Footer />
        </div>
    );
};

export default MediaPage;
