import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Header Component
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
        <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        <div className="flex items-center">
                            <div className="rounded-full overflow-hidden bg-white p-1 shadow-md">
                                <Image src="/images/logo.png" alt="Conventus Logo" width={40} height={40} className="rounded-full" />
                            </div>
                            <span className={`ml-2 text-2xl font-bold ${scrolled ? 'text-red-600' : 'text-white'}`}>Conventus</span>
                        </div>
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map((item, index) => (
                            <Link key={index} href={item.href}>
                                <span className={`text-sm font-medium ${scrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-200'} transition duration-300`}>
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                    <motion.button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </motion.button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-red-600 hover:bg-gray-100 transition duration-300">
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Conventus</h3>
                        <p className="text-gray-400">Empowering students to lead, innovate, and make a difference.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Contact', 'Register'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}>
                                        <span className="text-gray-400 hover:text-red-400 transition duration-300">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <ul className="space-y-2">
                            {[
                                { name: 'Facebook', icon: Facebook },
                                { name: 'Twitter', icon: Twitter },
                                { name: 'Instagram', icon: Instagram },
                                { name: 'LinkedIn', icon: Linkedin }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href="#" className="flex items-center text-gray-400 hover:text-red-400 transition duration-300">
                                        <item.icon className="w-5 h-5 mr-2" />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <address className="text-gray-400 not-italic">
                            123 Campus Drive<br />
                            College Town, ST 12345<br />
                            Email: info@conventus.edu<br />
                            Phone: (123) 456-7890
                        </address>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    © {currentYear} Conventus. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// Registration Form Component
const RegistrationForm = () => {
    return (
        <motion.form
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: 'name', label: 'Name', icon: User, type: 'text' },
                    { id: 'mobile', label: 'Mobile No.', icon: Phone, type: 'tel' },
                    { id: 'email', label: 'Email', icon: Mail, type: 'email' },
                    { id: 'organization', label: 'Organization/Institute/University', icon: Building, type: 'text' },
                ].map((field) => (
                    <div key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                            <field.icon className="inline-block mr-2 text-red-600" size={18} />
                            {field.label}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300"
                            id={field.id}
                            type={field.type}
                            placeholder={`Your ${field.label}`}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    <MapPin className="inline-block mr-2 text-red-600" size={18} />
                    Address
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300"
                    id="address"
                    placeholder="Your Address"
                    rows="3"
                ></textarea>
            </div>
            <div className="mt-8 text-center">
                <motion.button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                >
                    Register Now
                </motion.button>
            </div>
        </motion.form>
    );
};

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
                    <RegistrationForm />
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