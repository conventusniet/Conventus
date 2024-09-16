import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const LearnMoreSection = () => {
    const router = useRouter();

    const sections = [
        {
            title: "ABOUT US",
            description: "Find out about the organization and mission of CONVENTUS.",
            image: "/images/coll1.png",
            route: "/aboutus"
        },
        {
            title: "COMMITTEES",
            description: "Learn about the committees being offered at CONVENTUS and explore Procedure.",
            image: "/images/coll2.png",
            route: "/committee"
        },
        {
            title: "REGISTRATION",
            description: "Registration for CONVENTUS is now open! Register yourself and Secure your spot!",
            image: "/images/coll3.png",
            route: "/registration"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-red-50 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-red-800">Learn More</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden border border-red-800"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <motion.img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-48 object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-red-800">{section.title}</h3>
                                <p className="text-gray-800 mb-4">{section.description}</p>
                                <motion.button
                                    className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push(section.route)}
                                >
                                    LEARN MORE
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearnMoreSection;