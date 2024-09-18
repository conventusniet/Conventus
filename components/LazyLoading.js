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
        <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-center">
            <div className="w-32 h-32 mb-4">
                <Image
                    src="/images/conv-logo.png"
                    alt="Logo"
                    width={128}
                    height={128}
                    priority
                />
            </div>
            <div className="text-white text-2xl font-bold mb-2">{progress}%</div>
            <div className="w-64 h-2 bg-red-800 rounded-full">
                <div
                    className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LazyLoading;