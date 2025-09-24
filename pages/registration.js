import React, { useState, useEffect, Suspense, lazy } from 'react';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import ConventusChatbot from '@/components/ConventusChatBot';
// Lazy load the RegistrationForm component
const RegistrationForm = lazy(() => import('./RegistrationForm'));

// LazyLoading component
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
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 overflow-hidden">
                <div className="w-24 h-24 relative">
                    <Image
                        src="/images/conv-logo.png"
                        alt="CONVENTUS Logo"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
            </div>
            <div className="text-white text-4xl font-bold mb-4">{progress}%</div>
            <div className="w-64 h-2 bg-[#8A1323] rounded-full overflow-hidden">
                <div
                    className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="mt-4 text-white text-xl font-light">NAGATIO | SOLUTIO | ACTIO</div>
        </div>
    );
};

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
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     // Simulate content loading
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3000); // Adjust this time as needed

    //     return () => clearTimeout(timer);
    // }, []);

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

    // if (isLoading) {
    //     return <LazyLoading onLoadingComplete={() => setIsLoading(false)} />;
    // }

    return (
        <>
            <Header theme="red" />
            <section className="py-32 bg-gradient-to-b from-gray-100 to-red-100 min-h-screen flex items-center justify-center">
                <motion.div
                    className="container mx-auto px-4 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                <motion.h2
                    className="text-5xl font-bold mb-8 text-center text-red-600"
                    variants={itemVariants}
                >
                    CMUN 2025 - Session Adjourned
                </motion.h2>

                <motion.p
                    className="text-2xl font-bold mb-6 text-center max-w-2xl mx-auto text-gray-700"
                    variants={itemVariants}
                >
                    OFFICIAL COMMUNIQUÉ
                </motion.p>

                <motion.p
                    className="text-xl mb-8 text-center max-w-3xl mx-auto text-gray-700"
                    variants={itemVariants}
                >
                    The Secretariat announces that Conventus Model United Nations 2025 has officially concluded. The Dais extends sincere appreciation to all distinguished delegates, honorable chairs, and esteemed faculty advisors for their diplomatic engagement and substantive debate.
                </motion.p>

                <motion.p
                    className="text-lg mb-8 text-center max-w-3xl mx-auto text-gray-700"
                    variants={itemVariants}
                >
                    Resolutions passed during this session have been archived and the conference outcomes have been formally documented.
                </motion.p>

                <motion.p
                    className="text-lg mb-12 text-center max-w-2xl mx-auto text-red-600 font-semibold"
                    variants={itemVariants}
                >
                    Registration for CMUN 2025 is now closed. The Secretariat looks forward to welcoming returning and new delegations at future sessions.
                </motion.p>
      
                    {/*
                    
                    Registrations form for CMUN 2.0
                    
                    <motion.h2
                        className="text-5xl font-bold mb-8 text-center text-red-600"
                        variants={itemVariants}
                    >
                        Register For Conventus MUN

                    </motion.h2>

                    <motion.p
                        className="text-2xl font-bold mb-12 text-center max-w-2xl mx-auto text-gray-700"
                        variants={itemVariants}
                    >
                        ACCOMMODATION SLOTS FOR CMUN ARE NOW FULL.

                        DELEGATES SHOULD REGISTER ONLY IF THEY CAN ARRANGE THEIR OWN STAY. THERE IS STRICTLY NO ACCOMMODATION FOR GIRLS, AND BOYS MUST CONFIRM AVAILABLE OPTIONS WITH THE DIRECTOR GENERAL BEFORE REGISTERING.
                    </motion.p>
                    <motion.p
                        className="text-xl mb-12 text-center max-w-2xl mx-auto text-gray-700"
                        variants={itemVariants}
                    >
                        Embark on a journey of leadership, innovation, and community engagement. Register now to be part of something extraordinary!
                    </motion.p>

                    <motion.p
                        className="text-lg mb-12 text-center max-w-2xl mx-auto text-gray-600"
                        variants={itemVariants}
                    >
                        <a
                            href="/pdfs/CMUN 2025 Brochure.pdf"
                            className="text-red-600 hover:text-red-700 underline transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Check out official Brochure for details here
                        </a>
                    </motion.p>
                    <Suspense fallback={<DuckLoader />}>
                        <motion.div
                            className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl mx-auto"
                            variants={itemVariants}
                        >
                            <RegistrationForm />
                        </motion.div>
                    </Suspense>*/}
                    {/* <motion.div
                        className="mt-16 text-center"
                        variants={itemVariants}
                    >
                        <motion.button
                            className="inline-block px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
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
                                    className="mt-4 text-sm text-gray-600"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    Click to finalize your registration!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div> */}
                </motion.div>
            </section>
            <ConventusChatbot />
            <Footer />
        </>
    );
};

export default Registration;