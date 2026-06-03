import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';

const MovingStrip = () => {
  return (
    <div className="w-full bg-primary py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, index) => (
          <React.Fragment key={index}>
            <span className="mx-8 text-white text-2xl font-serif-display"><span className="text-white/70">&middot;</span> Negatio</span>
            <span className="mx-8 text-white text-2xl font-serif-display"><span className="text-white/70">&middot;</span> Solutio</span>
            <span className="mx-8 text-white text-2xl font-serif-display"><span className="text-white/70">&middot;</span> Actio</span>
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
            <div className="absolute inset-0 bg-ink/75" />
          </motion.div>
        ))}

        {/* Main Content - with higher z-index */}
        <div className="absolute inset-0 flex flex-col z-10">
          {/* Content Container */}
          <div className="flex-1 container mx-auto flex flex-col justify-center items-center px-4 space-y-12">
            <div className="text-center max-w-5xl">
              <p className="eyebrow text-xs sm:text-sm text-white/70 mb-5">Second Edition</p>
              <h2 className="font-serif-display text-4xl md:text-7xl font-semibold text-white leading-tight text-">
                Conventus
                <br className="block" />
                Model United Nations
              </h2>
              <div className="flex justify-center mt-7"><span className="accent-rule" /></div>
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
                className={`w-3 h-3 rounded-full transition-all ${ index === currentSlide ? 'bg-white scale-125' : 'bg-white/50' }`}
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

