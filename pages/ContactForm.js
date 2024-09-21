import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import Oheader from '../components/OHeader';
import Footer from '../components/Footer';
import axios from 'axios';

const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';

// Add the LazyLoading component
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


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showEventsDropdown, setShowEventsDropdown] = useState(false);
    const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

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
        {
            href: "#",
            label: "Events",
            dropdown: [
                { href: "/committee", label: "MUN" },
                { href: "/events", label: "Ink & Insights" },
                { href: "/more", label: "More" },
            ],
        },
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

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2
            }
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.2
            }
        }
    };

    const renderNavItem = (item, isMobile = false) => {
        if (item.dropdown) {
            return (
                <div
                    className={`relative group ${isMobile ? 'w-full' : ''}`}
                    onMouseEnter={() => !isMobile && setShowEventsDropdown(true)}
                    onMouseLeave={() => !isMobile && setShowEventsDropdown(false)}
                >
                    <button
                        className={`flex items-center justify-between w-full text-xl xl:text-1xl font-semibold font-['Times_New_Roman'] ${isMobile ? 'text-red-800 py-4' : (scrolled ? 'text-red-800 hover:text-red-600' : 'text-white hover:text-red-200')
                            }`}
                        onClick={() => isMobile && setMobileEventsOpen(!mobileEventsOpen)}
                    >
                        <span>{item.label}</span>
                        {isMobile ? <ChevronRight size={20} className={`transform transition-transform ${mobileEventsOpen ? 'rotate-90' : ''}`} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                        {((isMobile && mobileEventsOpen) || (!isMobile && showEventsDropdown)) && (
                            <motion.div
                                className={`${isMobile ? 'w-full' : 'absolute left-0 mt-2 w-48'} rounded-md shadow-lg`}
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <div className={`rounded-md ${isMobile ? 'bg-red-100' : 'bg-red-900'} shadow-xs`}>
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className={`block px-4 py-2 text-sm ${isMobile ? 'text-red-800' : 'text-white'} hover:bg-red-800 hover:text-white transition duration-150 ease-in-out`}
                                                role="menuitem"
                                                onClick={() => {
                                                    setShowEventsDropdown(false);
                                                    setMobileEventsOpen(false);
                                                    if (isMobile) setIsOpen(false);
                                                }}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }

        return (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={isMobile ? 'w-full' : ''}>
                <Link
                    href={item.href}
                    className={`block text-xl xl:text-1xl font-semibold font-['Times_New_Roman'] ${isMobile ? 'text-red-800 py-4' : (scrolled ? 'text-red-800 hover:text-red-600' : 'text-white hover:text-red-200')
                        }`}
                    onClick={() => isMobile && setIsOpen(false)}
                >
                    {item.label}
                </Link>
            </motion.div>
        );
    };

    return (
        <>
            <motion.header
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <nav className="hidden lg:flex space-x-4 xl:space-x-8 flex-1 justify-end">
                        {leftNavItems.map((item) => renderNavItem(item))}
                    </nav>

                    <Link href="/" className="flex items-center space-x-4 mx-4 sm:mx-8">
                        <span className={`text-2xl sm:text-3xl font-bold font-['Times_New_Roman'] ${scrolled
                            ? "text-red-600"
                            : "text-white lg:text-white"
                            }`}>CONVENTUS</span>
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
                        {rightNavItems.map((item) => renderNavItem(item))}
                    </nav>

                    <motion.button
                        className={`lg:hidden ${scrolled ? 'text-red-600' : 'text-white'} z-50`}
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
                            <div className="w-full space-y-6">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        variants={itemVariants}
                                        custom={index}
                                        className="w-full"
                                    >
                                        {renderNavItem(item, true)}
                                    </motion.div>
                                ))}
                            </div>
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

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setResponseMessage('');

        console.log('Attempting to send the following data to the backend:');
        console.log(JSON.stringify(formData, null, 2));

        try {
            const response = await axios.post(`${API_BASE_URL}/contact/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Data successfully sent to the backend.');
            console.log('Server response:', response.data);

            if (response.data && response.data.message) {
                setResponseMessage(response.data.message);
                if (response.data.message.toLowerCase().includes('failed')) {
                    console.log('Contact submission failed according to server message.');
                    setError('Submission was not successful. Please try again or contact support.');
                } else {
                    console.log('Contact submission appears to be successful.');
                    // Reset form on success
                    setFormData({ name: '', email: '', message: '' });
                }
            } else {
                console.log('Server response does not contain a message field.');
                setResponseMessage('Submission completed, but the server response was unclear.');
            }
        } catch (err) {
            console.error('Failed to send data to the backend.');
            console.error('Error details:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
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
                <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 text-xl text-gray-700 border-b-2 border-red-600 focus:outline-none focus:border-red-800 transition-all duration-300"
                    required
                    whileFocus={{ scale: 1.05 }}
                />
            </div>
            <div className="mb-8">
                <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 text-xl text-gray-700 border-b-2 border-red-600 focus:outline-none focus:border-red-800 transition-all duration-300"
                    required
                    whileFocus={{ scale: 1.05 }}
                />
            </div>
            <div className="mb-8">
                <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="6"
                    className="w-full px-4 py-3 text-xl text-gray-700 border-2 border-red-600 rounded-lg focus:outline-none focus:border-red-800 transition-all duration-300 resize-none"
                    required
                    whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
            </div>
            {error && (
                <div className="mt-4 text-red-600 text-center">{error}</div>
            )}
            {responseMessage && (
                <div className="mt-4 text-blue-600 text-center">{responseMessage}</div>
            )}
            <div className="flex items-center justify-center">
                <motion.button
                    type="submit"
                    className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl focus:outline-none focus:shadow-outline transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
            </div>
        </motion.form>
    );
};

const ContactPage = () => {
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     // Simulate content loading
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3000); // Adjust this time as needed

    //     return () => clearTimeout(timer);
    // }, []);

    // if (isLoading) {
    //     return <LazyLoading onLoadingComplete={() => setIsLoading(false)} />;
    // }

    return (
        <div className="min-h-screen flex flex-col">
            <Oheader />
            <main className="flex-grow bg-gradient-to-b from-gray-100 to-red-100 flex items-center justify-center px-4">
                <div className="container mx-auto py-12 md:py-20 mt-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Welcome to Conventus
                    </motion.h1>
                    <motion.p
                        className="text-xl text-center text-gray-700 mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Empowering students to lead, innovate, and make a difference.
                    </motion.p>
                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;