"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ChevronDown } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
            label: "Committee",
            dropdown: [
                { href: "/events", label: "Events" },
                { href: "/committee", label: "Committees" },
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
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2
            }
        },
        closed: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2
            }
        }
    };

    const NavItem = ({ item, isMobile = false }) => {
        if (item.dropdown) {
            return (
                <div className="relative group">
                    <button
                        className={`flex items-center space-x-1 text-xl xl:text-1xl font-semibold font-['Times_New_Roman'] ${
                            scrolled ? 'text-red-800 hover:text-red-600' : 'text-white hover:text-red-200'
                        }`}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                    >
                        <span>{item.label}</span>
                        <ChevronDown size={20} />
                    </button>
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${
                                    scrolled ? 'bg-white' : 'bg-red-800'
                                } ring-1 ring-black ring-opacity-5 z-50`}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={dropdownVariants}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {item.dropdown.map((subItem) => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className={`block px-4 py-2 text-sm ${
                                                scrolled ? 'text-red-800 hover:bg-red-100' : 'text-white hover:bg-red-700'
                                            }`}
                                            role="menuitem"
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                if (isMobile) setIsOpen(false);
                                            }}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }
        return (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                    href={item.href}
                    className={`text-xl xl:text-1xl font-semibold font-['Times_New_Roman'] ${
                        scrolled ? 'text-red-800 hover:text-red-600' : 'text-white hover:text-red-200'
                    }`}
                    onClick={() => {
                        if (isMobile) setIsOpen(false);
                    }}
                >
                    {item.label}
                </Link>
            </motion.div>
        );
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
                            <NavItem key={item.href} item={item} />
                        ))}
                    </nav>

                    <Link href="/" className="flex items-center space-x-4 mx-4 sm:mx-8">
                        <span className={`text-2xl sm:text-3xl font-bold font-['Times_New_Roman'] ${scrolled ? "text-red-600" : "text-white"}`}>CONVENTUS</span>
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
                            <NavItem key={item.href} item={item} />
                        ))}
                    </nav>

                    <motion.button
                        className={`lg:hidden ${scrolled ? 'text-red-600 z-50' : 'text-red-200'}`}
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
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
                                aria-label="Close menu"
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
                                    <NavItem item={item} isMobile={true} />
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

export default Header;
