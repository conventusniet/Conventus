import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

    return (
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
                    {navItems.map((item, index) => (
                        <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link href={item.href} className={`text-lg font-semibold ${scrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-400'}`}>
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}
                </nav>
                <motion.button
                    className="md:hidden text-red-600"
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </motion.button>
            </div>
            <motion.div
                className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
            >
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}
                        className="block py-3 px-4 text-lg font-semibold text-gray-800 hover:bg-red-100 hover:text-red-600 transition duration-300">
                        {item.label}
                    </Link>
                ))}
            </motion.div>
        </motion.header>
    );
};

export default Header;