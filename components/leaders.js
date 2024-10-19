import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LeadershipCard = ({ name, role, imageUrl, description }) => {
    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-64 h-64 rounded-3xl overflow-hidden mb-6 transform transition-transform duration-300 hover:scale-105 shadow-lg">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                />
            </div>
            <h4 className="font-semibold text-2xl text-gray-800 mb-2">{name}</h4>
            <p className="text-xl text-red-600 font-medium mb-1">{role}</p>
            <p className="text-lg text-gray-600">{description}</p>
        </motion.div>
    );
};

const LeadershipPage = () => {
    const leaders = [
        {
            name: "Sanskar Bhardwaj",
            role: "Technical Head",
            imageUrl: "/images/sanskar.jpg",
            branch: "Information Technology"
        },
        {
            name: "Anubhav Singh",
            role: "Technical Co-Head",
            imageUrl: "/images/aditya.jpg",
            branch: "CSE - DS"
        },
        {
            name: "Revant Khanna",
            role: "Technical Co-Head",
            imageUrl: "/images/aditya.jpg",
            branch: "CSE - AI"
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-white overflow-hidden">
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-4xl font-semibold text-center mb-12 text-red-700">
                            O U RㅤT E C H N I C A LㅤT E A M
                        </h3>
                    </motion.div>

                    <motion.p
                        className="text-center mt-12 mb-20 max-w-2xl mx-auto text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Our dedicated technical team brings a wealth of expertise and innovation to Conventus MUN.
                        With their combined skills in various domains of computer science and information technology,
                        they ensure seamless execution of all technical aspects of our events.
                    </motion.p>

                    <div className="flex flex-wrap justify-center gap-24">
                        {leaders.map((leader, index) => (
                            <LeadershipCard
                                key={index}
                                name={leader.name}
                                role={leader.role}
                                imageUrl={leader.imageUrl}
                                description={leader.branch}
                            />
                        ))}
                    </div>


                </div>
            </main>
        </div>
    );
};

export default LeadershipPage;