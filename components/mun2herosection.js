import React from 'react';
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
  return (
    <div className="relative w-full">
      {/* Background Image with Overlay */}
      <div className="relative h-screen">
        <Image
          src="/images/AB1.jpg"
          alt="CMUN Banner"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 to-red-900/70" />

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col">
          {/* Content Container */}
          <div className="flex-1 container mx-auto flex flex-col justify-center items-center px-4 space-y-12">
            <div className="text-center max-w-5xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                2nd Edition of
              </h1>
              <h2 className="text-3xl md:text-6xl font-semibold text-white leading-tight">
                CONVENTUS
                <br className="hidden md:block" />
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
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">SESSION ADJOURNED</h3>
                <p className="text-white/90 text-lg">The Secretariat thanks all delegations for their diplomatic excellence</p>
              </div>
            </motion.div>
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

