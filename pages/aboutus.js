'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react'
import Aboutpara from '@/components/aboutpara'
import { TestimonialOne } from '@/components/testmono'
import Footer from '../components/Footer';
import RegistrationButton from '../components/RegistrationButton'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';


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
                                <Link href={item.href} className={`text-xl xl:text-2xl font-semibold font-['Times_New_Roman'] ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <Link href="/" className="flex items-center space-x-4 mx-4 sm:mx-8">
                        <span className={`text-2xl sm:text-3xl font-bold font-['Times_New_Roman'] ${scrolled ? "text-red-800" : "text-red-600"}`}>CONVENTUS</span>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white flex items-center justify-center p-1 shadow-lg">
                            <Image
                                src="/images/conv-logo.png"
                                alt="CONVENTUS Logo"
                                width={96}
                                height={96}
                                className="object-contain hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </Link>

                    <nav className="hidden lg:flex space-x-4 xl:space-x-8 flex-1">
                        {rightNavItems.map((item) => (
                            <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Link href={item.href} className={`text-xl xl:text-2xl font-semibold font-['Times_New_Roman'] ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
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
                                        className="block py-4 px-8 text-2xl font-semibold text-red-800 hover:text-red-600 transition duration-300 w-full text-center font-['Times_New_Roman']"
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
const locations = [
    {
        title: 'Bengaluru office',
        timings: 'Mon-Sat 9am to 5pm.',
        address: '100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN',
    },
    {
        title: 'Head office',
        timings: 'Mon-Sat 9am to 5pm.',
        address: '12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN',
    },
    {
        title: 'Karnataka office',
        timings: 'Mon-Sat 9am to 5pm.',
        address: '42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN',
    },
]

const users = [
    {
        name: 'Manas Gupta',
        image: './images/President.jpg',
        position: 'President',
    },
    {
        name: 'Pragya Singh',
        image: './images/Vice President.jpg',
        position: 'Vice President',
    },
    {
        name: 'Yashraj Ranjan',
        image: './images/Vice President2.jpg',
        position: 'Vice President',
    },
]

export default function AboutPageOne() {

    return (
        <div className="bg-[#EEEFF2]">
            <Header />
            <div className="mx-auto max-w-7xl px-4">
                {/* Hero Map */}
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <div className="max-w-max rounded-full mt-10 border bg-gray-50 text-[#D42029] p-1 px-3">
                        <p className="text-xs font-semibold leading-normal md:text-sm">About the Club</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                        NIET Model United Nations 2024 by Conventus Club
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-xl">
                        Hosted by the Conventus Club, NIET MUN 2024 offers delegates a platform to explore the workings of the United Nations, sharpen diplomatic skills, and engage in global discussions. With dynamic committees, expert speakers, and interactive workshops, this year’s conference promises a more immersive and enriching experience than ever before.
                    </p>
                </div>
                <div className="w-full space-y-4">
                    <img
                        className="h-[200px] w-full rounded-xl object-cover md:h-full"
                        src="./images/background.jpg"
                        alt=""
                    />
                </div>
                {/* locations */}
                <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
                    {locations.map((location) => (
                        <div key={location.title} className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
                            <MapPin className="h-5 w-5" />
                            <p className="w-full text-xl font-semibold  text-gray-900">{location.title}</p>
                            <p className="w-full text-base text-gray-700">{location.timings}</p>
                            <p className="text-sm font-medium">{location.address}</p>
                        </div>
                    ))}
                </div>
                <hr className="mt-20" />
                <TestimonialOne />
                {/* greetings */}
                <div className="mt-16 flex items-center">
                    <div className="space-y-6 md:w-3/4">
                        <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                            <p className="text-xs font-semibold leading-normal md:text-sm">Join Us &rarr;</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 md:text-4xl">Meet our team</p>
                        <p className="max-w-4xl text-base text-gray-700 md:text-xl">
                            Our approach is straightforward — bring together a diverse, driven group of individuals and cultivate a culture that inspires everyone to achieve their best.
                        </p>
                        <div></div>
                    </div>
                </div>

                {/* TEAM */}
                <div className="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
                    {users.map((user) => (
                        <div className="rounded-md bg-white border" key={user.name}>
                            <img
                                src={user.image}
                                alt={user.name}
                                className="h-[300px] w-full rounded-lg object-cover "
                            />
                            <p className="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">{user.name}</p>
                            <p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                                {user.position}
                            </p>
                        </div>
                    ))}
                </div>
                {/*About Para*/}
                <Aboutpara />
                {/* Hiring Banner */}
                <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold md:text-base text-red-500">Join Conventus &rarr;</p>
                        <p className="text-3xl font-bold md:text-4xl">We&apos;re just getting started</p>
                        <p className="text-base text-gray-600 md:text-lg">
                            Conventus is a dynamic student organization dedicated to fostering leadership, innovation, and community engagement among college students.
                        </p>
                        {/* <button
                            type="button"
                            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Join Now
                        </button> */}
                        <RegistrationButton />
                    </div>
                    <div className="md:mt-o mt-10 w-full">
                        <img
                            src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                            alt="Getting Started"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
            <hr className="mt-6" />
            {/* <RegistrationButton /> */}
            <Footer />

        </div>
    )
}
