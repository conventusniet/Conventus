import React, { useState, useEffect, Suspense, lazy } from 'react';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Oheader from '../components/OHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import ConventusChatbot from '@/components/ConventusChatBot';
// Lazy load the RegistrationForm component
const RegistrationForm = lazy(() => import('./RegistrationForm'));
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/aboutus", label: "About Us" },
        { href: "/registration", label: "Register" },
        { href: "/committee", label: "Committees" },
        { href: "/media", label: "Media" },
        { href: "/ContactForm", label: "Contact" },
    ];

    const leftNavItems = navItems.slice(0, Math.ceil(navItems.length / 2));
    const rightNavItems = navItems.slice(Math.ceil(navItems.length / 2));

    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
    };

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    return (
        <>
            <motion.header
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <nav className="hidden lg:flex space-x-4 xl:space-x-8 flex-1 justify-end">
                        {leftNavItems.map((item) => (
                            <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Link href={item.href} className={`text-xl xl:text-1xl font-semibold ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <Link href="/" className="flex items-center space-x-4 mx-4 sm:mx-8">
                        <span className={`text-2xl sm:text-3xl font-bold ${scrolled ? "text-red-800" : "text-red-600"}`}>CONVENTUS</span>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white flex items-center justify-center p-1 shadow-lg">
                            <Image
                                src="/images/conv-logo.png"
                                alt="CONVENTUS Logo"
                                width={80}
                                height={80}
                                className="object-contain hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </Link>

                    <nav className="hidden lg:flex space-x-4 xl:space-x-8 flex-1">
                        {rightNavItems.map((item) => (
                            <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Link href={item.href} className={`text-xl xl:text-1xl font-semibold ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.button
                        className={`lg:hidden ${scrolled ? 'text-red-600 z-50' : 'text-red-600'}`}
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu size={24} />
                    </motion.button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 lg:hidden"
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col h-full justify-center items-center relative p-8">
                            <motion.button
                                className="absolute top-4 right-4 text-red-600 hover:text-red-400"
                                onClick={() => setIsOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    variants={itemVariants}
                                    custom={index}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="block py-4 px-8 text-2xl font-semibold text-red-800 hover:text-red-600 transition duration-300 w-full text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
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
            <Oheader />
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
                    </Suspense>
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