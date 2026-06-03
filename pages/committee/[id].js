import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/legacy/image';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const committeeData = [
    {
        id: 1,
        name: 'Finance Committee',
        description: 'Manages financial planning and budgeting for the club.',
        details: 'The Finance Committee is responsible for overseeing the club\'s financial health, preparing annual budgets, and ensuring proper allocation of resources.',
        image: '/images/coll1.png',
    },
    {
        id: 2,
        name: 'Events Committee',
        description: 'Plans and organizes club events and activities.',
        details: 'The Events Committee coordinates all club events, from small meetups to large annual gatherings. They handle logistics, scheduling, and event promotion.',
        image: '/images/coll2.png',
    },
    {
        id: 3,
        name: 'Membership Committee',
        description: 'Handles member recruitment and retention.',
        details: 'The Membership Committee focuses on growing and maintaining the club\'s membership base. They develop strategies for attracting new members and ensuring current members remain engaged.',
        image: '/images/coll3.png',
    },
    {
        id: 4,
        name: 'Workshop Committee',
        description: 'Organizes educational workshops and seminars.',
        details: 'The Workshop Committee is dedicated to providing valuable learning experiences through workshops, seminars, and guest speaker sessions on various topics of interest to club members.',
        image: '/images/coll4.png',
    },
    {
        id: 5,
        name: 'Research Committee',
        description: 'Conducts and promotes research activities.',
        details: 'The Research Committee facilitates and encourages research initiatives among club members, organizing symposiums and collaborating with academic institutions.',
        image: '/images/coll5.png',
    },
    {
        id: 6,
        name: 'Community Outreach Committee',
        description: 'Manages the club\'s community service initiatives.',
        details: 'The Community Outreach Committee organizes volunteer opportunities and charity events, fostering strong relationships between the club and the local community.',
        image: '/images/coll6.png',
    },
    {
        id: 7,
        name: 'Arts and Culture Committee',
        description: 'Promotes artistic and cultural activities within the club.',
        details: 'The Arts and Culture Committee arranges exhibitions, performances, and cultural exchanges to celebrate diversity and creativity among club members.',
        image: '/images/coll7.png',
    },
    {
        id: 8,
        name: 'Social Events Committee',
        description: 'Plans casual social gatherings for members.',
        details: 'The Social Events Committee organizes informal meetups, game nights, and other social activities to foster friendships and networking among club members.',
        image: '/images/coll8.png',
    }
];

const CommitteePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const committee = committeeData.find(c => c.id === parseInt(id));

    if (!committee) {
        return <div>Committee not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow mt-40 sm:mt-40 bg-gray-100 p-8">
                <motion.div
 className="max-w-4xl mx-auto bg-white overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="md:flex">
                        <motion.div
                            className="md:flex-shrink-0"
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={committee.image}
                                alt={committee.name}
                                width={300}
                                height={300}
                                className="h-48 w-full object-cover md:h-full md:w-48"
                            />
                        </motion.div>
                        <div className="p-8">
                            <motion.h1
                                className="text-3xl font-bold text-red-600 mb-4"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {committee.name}
                            </motion.h1>
                            <motion.p
                                className="text-gray-700 mb-4"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {committee.description}
                            </motion.p>
                            <motion.h2
                                className="text-xl font-semibold text-gray-800 mb-2"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                Details:
                            </motion.h2>
                            <motion.p
                                className="text-gray-700"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {committee.details}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default CommitteePage;