import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DiwaliModal = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');

    useEffect(() => {
        // Trigger entry animation
        const timer = setTimeout(() => {
            setAnimationClass('opacity-100 scale-100');
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setAnimationClass('opacity-0 scale-95');

        // Wait for animation to complete before fully closing
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);

        return () => clearTimeout(timer);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            style={{ backdropFilter: 'blur(5px)' }}
        >
            <Image
                src="/gif/Diwali.gif"
                alt="Diwali Wishes"
                width={575}  // Same as previous
                height={500}  // Reduced height to fit laptop screen
                className={`transform transition-all duration-300 ease-in-out ${animationClass}`}
            />

            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none z-10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default DiwaliModal;