import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <motion.header
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="rounded-full overflow-hidden bg-white p-1 shadow-md">
                        <Image src="/images/logo.png" alt="Conventus Logo" width={40} height={40} className="rounded-full" />
                    </div>
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}
                                className="block py-3 px-4 text-lg font-semibold text-gray-800 hover:bg-red-100 hover:text-red-600 transition duration-300">
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Conventus</h3>
                        <p className="text-gray-400 text-sm">Empowering students to lead, innovate, and make a difference.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Contact', 'Register'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}>
                                        <span className="text-gray-400 hover:text-red-400 transition duration-300 text-sm">{item}</span>
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
                                    <a href="#" className="flex items-center text-gray-400 hover:text-red-400 transition duration-300 text-sm">
                                        <item.icon className="w-4 h-4 mr-2" />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <address className="text-gray-400 not-italic text-sm">
                            123 Campus Drive<br />
                            College Town, ST 12345<br />
                            Email: info@conventus.edu<br />
                            Phone: (123) 456-7890
                        </address>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
                    © {currentYear} Conventus. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold mb-8 text-red-600 text-center">Contact Us</h2>
            <div className="mb-8">
                <label htmlFor="name" className="block text-gray-700 text-xl font-bold mb-3">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xl text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                />
            </div>
            <div className="mb-8">
                <label htmlFor="email" className="block text-gray-700 text-xl font-bold mb-3">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xl text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                />
            </div>
            <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 text-xl font-bold mb-3">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 text-xl text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                ></textarea>
            </div>
            <div className="flex items-center justify-center">
                <motion.button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-xl focus:outline-none focus:shadow-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Message
                </motion.button>
            </div>
        </motion.form>
    );
};

// Main Page Component
const ContactPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-100 flex items-center justify-center px-4">
                <div className="container mx-auto py-12 md:py-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8">Welcome to Conventus</h1>
                    <p className="text-xl text-center text-gray-700 mb-12">Empowering students to lead, innovate, and make a difference.</p>
                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;