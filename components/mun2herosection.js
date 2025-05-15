import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MovingStrip = () => {
  return (
    <div className="w-full bg-red-800 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, index) => (
          <React.Fragment key={index}>
            <span className="mx-8 text-white text-2xl font-semibold">• Negatio</span>
            <span className="mx-8 text-white text-2xl font-semibold">• Solutio</span>
            <span className="mx-8 text-white text-2xl font-semibold">• Actio</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 1;
  const autoPlayRef = useRef();
  
  const images = [
    "/images/AB1.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
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
    <div className="relative w-full">
      {/* Background Image Carousel */}
      <div className="relative h-screen">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              zIndex: 0 
            }}
            transition={{ duration: 1.2 }}
          >
            <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
              <Image
                src={img}
                alt={`CMUN Banner ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
                className="brightness-50 min-w-full min-h-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 to-red-900/70" />
          </motion.div>
        ))}

        {/* Main Content - with higher z-index */}
        <div className="absolute inset-0 flex flex-col z-10">
          {/* Content Container */}
          <div className="flex-1 container mx-auto flex flex-col justify-center items-center px-4 space-y-12">
            <div className="text-center max-w-5xl">
              <h1 className="text-1xl md:text-2xl font-bold text-white mb-6 tracking-tight">
                2nd Edition of
              </h1>
              <h2 className="text-3xl md:text-6xl font-semibold text-white leading-tight">
                CONVENTUS
                <br className="block" />
                MODEL UNITED NATIONS
              </h2>
            </div>

            {/* Session Adjourned Notice */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="inline-block border-t-2 border-b-2 border-white/70 py-3 px-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">THE SESSION WAS A DIPLOMATIC SUCCESS</h3>
                <p className="text-white/90 text-lg">Conventus Model United Nations March 2025</p>
              </div>
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Moving Strip at Bottom */}
          <div className="w-full mt-auto">
            <MovingStrip />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

