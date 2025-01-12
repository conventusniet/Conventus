import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MovingStrip = () => {
  return (
    <div className="w-full bg-red-800/80 py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 text-white text-lg">• Building Tomorrow's Leaders Today</span>
        <span className="mx-4 text-white text-lg">• Join the Global Dialogue</span>
        <span className="mx-4 text-white text-lg">• Shape International Policy</span>
        <span className="mx-4 text-white text-lg">• Experience Diplomacy First-hand</span>
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
          <div className="flex-1 container mx-auto flex flex-col justify-center items-center px-4 space-y-16">
            {/* Title Section with Enhanced Typography */}
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

            {/* CTA Button with Enhanced Styling */}
            <Link
              href="/delegate-form"
              className="transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-red-700 hover:bg-red-600 text-white px-12 py-4 rounded-lg 
                            text-xl font-semibold shadow-lg hover:shadow-2xl 
                            border-2 border-red-400/30 backdrop-blur-sm">
                Register Now
              </div>
            </Link>
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