import React from 'react';
import PinterestGallery from './PinterestGallery';

const MUN2Gallery = () => {
    const galleryImages = [
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
        { src: "/images/mun2.0/gallery/day1-13.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-14.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-15.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-16.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-17.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-18.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-19.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-20.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-21.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-22.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-23.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-24.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-25.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-26.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-27.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-28.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-29.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-30.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-31.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-32.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-33.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-34.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-35.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-36.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-37.webp", badge: "Day 1", day: 1 },
        { src: "/images/mun2.0/gallery/day1-38.webp", badge: "Day 1", day: 1 },
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
        { src: "/images/mun2.0/gallery/day2-13.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-14.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-15.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-16.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-17.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-18.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-19.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-20.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-21.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-22.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-23.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-24.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-25.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-26.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-27.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-28.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-29.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-30.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-31.webp", badge: "Day 2", day: 2 },
        { src: "/images/mun2.0/gallery/day2-32.webp", badge: "Day 2", day: 2 }
    ];

    const filterFunction = (images, tab) => {
        if (tab === 'all') return images;
        return images.filter(img => img.day === parseInt(tab));
    };

    const tabs = [
        { label: "All Days", value: "all" },
        { label: "Day 1", value: "1" },
        { label: "Day 2", value: "2" }
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-red-50 to-white mb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">Event Gallery</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                    <p className="text-red-700 text-lg max-w-2xl mx-auto mb-8">
                        Capturing the memorable moments from CMUN 2.0
                    </p>
                </div>
                
                <PinterestGallery 
                    images={galleryImages}
                    tabs={tabs}
                    defaultTab="all"
                    filterFunction={filterFunction}
                />

                <div className="text-center mt-10">
                    <a 
                        href="/media" 
                        className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-300"
                    >
                        View Full Gallery
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MUN2Gallery;