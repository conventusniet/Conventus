import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2025-03-22T00:00:00');

        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-gradient-to-r from-red-50 to-red-100 py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-800">CONFERENCE</h2>
                    <p className="text-lg md:text-xl text-red-700 mt-2">begins in</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div
                            key={unit}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-white w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl shadow-lg 
                                flex items-center justify-center border-2 border-red-200 relative overflow-hidden 
                                group transform transition-transform hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-transparent opacity-50" />
                                <span className="text-2xl md:text-4xl font-bold text-red-800 relative z-10">
                                    {String(value).padStart(2, '0')}
                                </span>
                            </div>
                            <span className="mt-2 md:mt-4 text-sm md:text-lg font-medium text-red-700 capitalize">
                                {unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;