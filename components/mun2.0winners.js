import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';

const MUN2Winners = () => {
    const committees = [
        {
            name: "United Nations Security Council",
            logo: "/images/unsc_bg.jpg",
            winners: [
                { award: "Best Delegate", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "High Commendation", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Special Mention", name: "Coming Soon", institute: "Official Results Pending" }
            ]
        },
        {
            name: "United Nations Human Rights Council",
            logo: "/images/unhrc_bg.jpg",
            winners: [
                { award: "Best Delegate", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "High Commendation", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Special Mention", name: "Coming Soon", institute: "Official Results Pending" }
            ]
        },
        {
            name: "All India Political Parties Meet",
            logo: "/images/aippm_bg.png",
            winners: [
                { award: "Best Delegate", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "High Commendation", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Special Mention", name: "Coming Soon", institute: "Official Results Pending" }
            ]
        },
        {
            name: "International Press",
            logo: "/images/uip.jpeg",
            winners: [
                { award: "Best Journalist", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Best Photographer", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Best Cartoonist", name: "Coming Soon", institute: "Official Results Pending" }
            ]
        }
    ];

    const getAwardIcon = (award) => {
        if (award.includes("Best Delegate") || award.includes("Best Journalist"))
            return <Trophy className="w-5 h-5 text-yellow-500" />;
        else if (award.includes("High") || award.includes("Best Photographer"))
            return <Award className="w-5 h-5 text-gray-400" />;
        else
            return <Medal className="w-5 h-5 text-amber-700" />;
    };

    return (
        <section className="py-12 bg-white rounded-lg shadow-md mb-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-red-800">
                    Distinguished Delegates
                </h2>
                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {committees.map((committee, index) => (
                        <motion.div
                            key={index}
                            className="bg-red-50 rounded-lg shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative h-40 w-full">
                                <Image
                                    src={committee.logo}
                                    alt={committee.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent flex items-end">
                                    <h3 className="text-white font-bold text-xl p-4">{committee.name}</h3>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {committee.winners.map((winner, idx) => (
                                        <li key={idx} className="flex items-center space-x-3 p-2 bg-white rounded-md shadow-sm">
                                            {getAwardIcon(winner.award)}
                                            <div>
                                                <p className="font-semibold text-red-800">{winner.award}</p>
                                                <p className="text-gray-700">{winner.name}</p>
                                                <p className="text-sm text-gray-500">{winner.institute}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MUN2Winners;