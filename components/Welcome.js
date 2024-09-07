import React, { useState, useEffect } from 'react';

const Welcome = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150); // Increased initial typing speed

    const toRotate = ['Innovate', 'Collaborate', 'Inspire'];
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setTypingSpeed(prevSpeed => prevSpeed / 1.5); // Faster deletion
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setTypingSpeed(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150); // Reset to initial typing speed
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center z-0 brightness-50"
                style={{ backgroundImage: "url('/images/background.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
            <div className="relative z-20 text-center px-4">
                <h1 className="text-6xl font-bold mb-6 text-shadow-lg">Welcome to Conventus</h1>
                <p className="text-4xl mb-8">Where we <span className="font-bold text-yellow-300">{text}</span></p>
                <p className="text-2xl mb-12 max-w-2xl mx-auto">Join us in shaping the future of our community</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105">
                    Get Started
                </button>
            </div>
            <svg className="absolute left-0 bottom-0 w-64 h-64 text-red-600 opacity-20 z-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M47.5,-57.5C59.3,-45.7,65.6,-28.9,67.4,-11.9C69.2,5.1,66.5,22.3,57.9,36.3C49.3,50.3,34.7,61.1,17.7,67.3C0.7,73.5,-18.7,75,-34.8,68.1C-50.9,61.2,-63.7,45.8,-70.6,28.3C-77.5,10.8,-78.5,-8.8,-71.8,-24.9C-65.1,-40.9,-50.8,-53.3,-36,-61.4C-21.1,-69.5,-5.7,-73.3,8.8,-71.9C23.3,-70.5,35.7,-69.3,47.5,-57.5Z" transform="translate(100 100)" />
            </svg>
            <svg className="absolute right-0 top-0 w-64 h-64 text-yellow-300 opacity-20 z-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M38.9,-47.8C49.8,-35.3,57.6,-22.1,61.4,-7.1C65.2,8,65,24.8,57.4,37.9C49.8,51,34.8,60.4,18.7,64.8C2.6,69.2,-14.6,68.5,-30.4,62.5C-46.2,56.5,-60.6,45.2,-67.4,30.5C-74.2,15.8,-73.4,-2.4,-67.3,-18.1C-61.2,-33.8,-49.8,-47,-36.5,-58.7C-23.2,-70.4,-7.9,-80.6,3.8,-75.6C15.5,-70.6,28,-60.4,38.9,-47.8Z" transform="translate(100 100)" />
            </svg>
        </section>
    );
};

export default Welcome;