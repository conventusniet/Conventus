import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-4">Conventus</h3>
                        <p>Empowering students to lead, innovate, and make a difference.</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul>
                            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                            <li><Link href="#about" className="hover:text-gray-300">About</Link></li>
                            <li><Link href="#contact" className="hover:text-gray-300">Contact</Link></li>
                            <li><Link href="/registration" className="hover:text-gray-300">Register</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <ul>
                            <li><a href="#" className="hover:text-gray-300">Facebook</a></li>
                            <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
                            <li><a href="#" className="hover:text-gray-300">Instagram</a></li>
                            <li><a href="#" className="hover:text-gray-300">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <p>123 Campus Drive</p>
                        <p>College Town, ST 12345</p>
                        <p>Email: info@conventus.edu</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Conventus. All rights reserved.</p>
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
            className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-red-600">Contact Us</h2>
            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                ></textarea>
            </div>
            <div className="flex items-center justify-between">
                <motion.button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            <main className="flex-grow bg-gray-100">
                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-12">Welcome to Conventus</h1>
                        <p className="text-xl text-center text-gray-700 mb-12">Empowering students to lead, innovate, and make a difference.</p>
                        <ContactForm />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;