import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '../components/Header';
import Footer from '../components/Footer';
// Lazy load the RegistrationForm component
const RegistrationForm = lazy(() => import('./RegistrationForm'));


// Duck walking animation component
const DuckLoader = () => (
    <div className="flex flex-col items-center justify-center h-64">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
            <motion.path
                d="M10,50 Q25,30 40,50 T70,50"
                fill="none"
                stroke="#FF0000"
                strokeWidth="4"
                animate={{
                    d: [
                        "M10,50 Q25,30 40,50 T70,50",
                        "M10,50 Q25,70 40,50 T70,50",
                        "M10,50 Q25,30 40,50 T70,50"
                    ]
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                }}
            />
            <circle cx="70" cy="50" r="5" fill="#FF0000" />
        </svg>
        <p className="mt-4 text-lg font-semibold text-red-600">Loading...</p>
    </div>
);

// Main Registration Component
const Registration = () => {
    const [isHovered, setIsHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
            <Header />
            <section className="py-32 bg-gradient-to-br from-red-600 to-red-800 text-white min-h-screen flex items-center justify-center">
                <motion.div
                    className="container mx-auto px-4 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2
                        className="text-5xl font-bold mb-8 text-center"
                        variants={itemVariants}
                    >
                        Join Conventus
                    </motion.h2>
                    <motion.p
                        className="text-xl mb-12 text-center max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Embark on a journey of leadership, innovation, and community engagement. Register now to be part of something extraordinary!
                    </motion.p>
                    <Suspense fallback={<DuckLoader />}>
                        <RegistrationForm />
                    </Suspense>
                    <motion.div
                        className="mt-16 text-center"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <span className="mr-2">🚀</span>
                            Launch Your Journey
                        </motion.button>
                        <AnimatePresence>
                            {isHovered && (
                                <motion.p
                                    className="mt-4 text-sm"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    Click to finalize your registration!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </section>
            <Footer />
        </>
    );
};

export default Registration;