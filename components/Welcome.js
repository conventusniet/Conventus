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
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 object-cover w-full h-full z-0 brightness-50"
            >
                <source src="/videos/67358-521707474_medium.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
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
                            // onHoverStart={() => setIsHovered(true)}
                            // onHoverEnd={() => setIsHovered(false)}
                        >
                            {/* <span className="mr-2">🚀</span> */}
                            Register Now
                        </motion.button>
                    </Link>
                    {/* <AnimatePresence>
                        {isHovered && (
                            <motion.p
                                className="mt-4 text-sm text-gray-600 text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                Click to finalize your registration!
                            </motion.p>
                        )}
                    </AnimatePresence> */}
                </div>
            </div>
        </section>
    );
};

export default Welcome;
