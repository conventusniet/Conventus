import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Welcome = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const toRotate = ['Negatio', 'Solutio', 'Actio'];
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
            setTypingSpeed(prevSpeed => prevSpeed / 1.5);
        }
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setTypingSpeed(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150);
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center z-0 brightness-50"
                style={{
                    backgroundImage: "url('/images/niet.jpeg')"
                }}
            />
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
            <div className="relative z-20 text-center px-4">
                <h1 className="text-6xl font-bold mb-6 text-shadow-lg">Conventus</h1>
                <div className="flex justify-center items-center">
                    <span className="text-4xl">|</span>
                    <p className="text-4xl w-48 inline-block text-left">
                        <span className="font-bold text-yellow-300">ㅤ{text}</span>
                    </p>
                    <span className="text-4xl">|</span>
                </div>
                <div className="relative">
                    <Link href="/registration" passHref>
                        <motion.button
                            className="inline-block mt-20 px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-red-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register Now
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
