import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
      <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-8 overflow-hidden">
        <div className="w-56 h-56 relative">
          <Image
            src="/images/Conventus-png-min.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="text-white text-4xl font-bold mb-4">{progress}%</div>
      <div className="w-3/4 h-1 bg-[#8A1323] rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LazyLoading;