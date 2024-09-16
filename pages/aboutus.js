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
                                <Link href={item.href} className={`text-xl xl:text-1xl font-semibold font-['Times_New_Roman'] ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <Link href="/" className="flex items-center space-x-4 mx-4 sm:mx-8">
                        <span className={`text-2xl sm:text-3xl font-bold font-['Times_New_Roman'] ${scrolled ? "text-red-800" : "text-red-600"}`}>CONVENTUS</span>
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
                                <Link href={item.href} className={`text-xl xl:text-1xl font-semibold font-['Times_New_Roman'] ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.button
                        className={`lg:hidden ${scrolled ? 'text-red-600 z-50' : 'text-red-200'}`}
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



const PersonCard = ({ name, position, image, info }) => {
    return (
        <motion.div
            className="w-64 h-96 [perspective:1000px] group sm:w-full sm:max-w-sm md:w-80 lg:w-64"
            whileHover={{ scale: 1.05 }}
        >
            <motion.div
                className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
                <div className="absolute inset-0">
                    <Image
                        className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                        src={image}
                        alt={name}
                        width={256}
                        height={384}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-xl">
                        <h3 className="text-xl font-bold">{name}</h3>
                        <p>{position}</p>
                    </div>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex min-h-full flex-col items-center justify-center">
                        <p className="text-xl">{info}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const TeamSection = ({ title, members }) => (
    <div className="my-16 sm:my-32">
        <h3 className="text-4xl sm:text-6xl mt-20 font-bold text-gray-800 mb-10 sm:mb-20 text-center">{title}</h3>
        <div className="flex flex-wrap justify-center gap-12 sm:gap-24">
            {members.map((member, index) => (
                <PersonCard key={index} {...member} />
            ))}
        </div>
    </div>
);

export default function AboutPageOne() {
    const management = [
        { name: "John Doe", position: "CEO", image: "/images/coll1.png", info: "10 years of experience in tech management." },
        { name: "Jane Smith", position: "COO", image: "/images/coll2.png", info: "Expert in operations and strategy." },
        { name: "Mike Johnson", position: "CTO", image: "/images/coll3.png", info: "Passionate about innovative technologies." },
    ];

    const mentors = [
        { name: "Dr. Emily Brown", position: "Senior Mentor", image: "/images/coll4.png", info: "PhD in Computer Science, 15 years of teaching experience." },
        { name: "Prof. David Lee", position: "Research Mentor", image: "/images/coll5.png", info: "Leading expert in AI and Machine Learning." },
        { name: "Sarah Wilson", position: "Industry Mentor", image: "/images/coll6.png", info: "20 years of experience in Silicon Valley." },
    ];

    const leaders = [
        { name: "Manas Gupta", position: "President", image: "/images/President.jpg", info: "Manas is a visionary leader with a passion for innovation and community building. With his strategic mindset and inclusive approach, he's driving Conventus to new heights." },
        { name: "Pragya Singh", position: "Vice President", image: "/images/Vice President.jpg", info: "Pragya brings years of experience in event management and student engagement. Her creativity and dedication ensure that every Conventus event is a memorable success." },
        { name: "Yashraj Ranjan", position: "Vice President", image: "/images/vice President2.jpg", info: "Yashraj excels in operations and logistics. His attention to detail and problem-solving skills help streamline Conventus's processes and enhance member experiences." },
    ];

    return (
        <div className="bg-[#EEEFF2]">
            <Header />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Hero Map */}
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24 sm:space-y-16">
                    <div className="max-w-max rounded-full mt-10 sm:mt-20 border bg-gray-50 text-[#D42029] p-1 px-3">
                        <p className="text-xs font-semibold leading-normal md:text-sm sm:text-base">About the Club</p>
                    </div>
                    <motion.div
                        className="w-full mt-20 sm:mt-40 space-y-4 sm:space-y-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            className="w-full object-cover md:h-[400px] sm:h-[600px]"
                            src="/images/background.jpg"
                            alt=""
                            width={1200}
                            height={600}
                        />
                    </motion.div>

                    <p className="text-3xl sm:text-5xl font-bold text-gray-900 md:text-5xl md:leading-10 sm:leading-tight">
                        NIET Model United Nations 2024 by Conventus Club
                    </p>
                    <p className="max-w-4xl text-base sm:text-2xl text-gray-600 md:text-xl">
                        Hosted by the Conventus Club, NIET MUN 2024 offers delegates a platform to explore the workings of the United Nations, sharpen diplomatic skills, and engage in global discussions. With dynamic committees, expert speakers, and interactive workshops, this year's conference promises a more immersive and enriching experience than ever before.
                    </p>
                </div>
                <hr className="mt-20 sm:mt-40" />

                {/* greetings */}
                <div className="mt-16 sm:mt-32 flex items-center">
                    <div className="space-y-6 sm:space-y-12 md:w-3/4">
                        <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                            <p className="text-xs font-semibold leading-normal md:text-sm sm:text-base">Join Us &rarr;</p>
                        </div>
                        <p className="text-3xl sm:text-5xl font-bold text-gray-900 md:text-4xl">Meet our team</p>
                        <p className="max-w-4xl text-base sm:text-2xl text-gray-700 md:text-xl">
                            Our approach is straightforward — bring together a diverse, driven group of individuals and cultivate a culture that inspires everyone to achieve their best.
                        </p>
                    </div>
                </div>

                {/* TEAM */}
                <TeamSection title="Management" members={management} />
                <TeamSection title="Mentors" members={mentors} />

                <div className="my-16 sm:my-32">
                    <h3 className="text-4xl sm:text-6xl mt-20 font-bold text-gray-800 mb-10 sm:mb-20 text-center">Leaders</h3>
                    <div className="flex flex-col items-center gap-12 sm:gap-24">
                        <PersonCard {...leaders[0]} />
                        <div className="flex flex-col md:flex-row justify-center gap-12 sm:gap-24 w-full">
                            <PersonCard {...leaders[1]} />
                            <PersonCard {...leaders[2]} />
                        </div>
                    </div>
                </div>

                {/*About Para*/}
                <Aboutpara />

                {/* Hiring Banner */}
                <div className="flex flex-col items-center gap-x-4 gap-y-8 sm:gap-y-16 py-16 sm:py-32 md:flex-row">
                    <div className="space-y-6 sm:space-y-12">
                        <p className="text-sm sm:text-base font-semibold md:text-base text-red-500">Join Conventus &rarr;</p>
                        <p className="text-3xl sm:text-5xl font-bold md:text-4xl">We&apos;re just getting started</p>
                        <p className="text-base sm:text-2xl text-gray-600 md:text-lg">
                            Conventus is a dynamic student organization dedicated to fostering leadership, innovation, and community engagement among college students.
                        </p>
                        <RegistrationButton />
                    </div>
                    <div className="md:mt-0 mt-10 w-full">
                        <img
                            src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                            alt="Getting Started"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
            <hr className="mt-6 sm:mt-12" />
            <Footer />
        </div>
    )
}