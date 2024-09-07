import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
        { href: "#about", label: "About" },
        { href: "/ContactForm", label: "Contact" },
        { href: "/registration", label: "Register" },
    ];

    const sidebarVariants = {
        open: { x: 0, transition: { type: 'tween' } },
        closed: { x: '100%', transition: { type: 'tween' } },
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
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src="/images/logo.png" alt="Conventus Logo" width={40} height={40} className="rounded-full" />
                        <span className="text-2xl font-bold text-red-600">Conventus</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Link href={item.href} className={`text-lg font-semibold ${scrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-400'}`}>
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                    <motion.button
                        className="md:hidden text-red-600 z-50"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                variants={{
                                    closed: { d: "M4 6h16M4 12h16M4 18h16" },
                                    open: { d: "M6 18L18 6M6 6l12 12" },
                                }}
                                initial="closed"
                                animate={isOpen ? "open" : "closed"}
                                transition={{ duration: 0.3 }}
                            />
                        </svg>
                    </motion.button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 md:hidden"
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col h-full justify-center items-center relative">
                            <motion.button
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block py-4 px-8 text-xl font-semibold text-gray-800 hover:bg-red-100 hover:text-red-600 transition duration-300 w-full text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Header;