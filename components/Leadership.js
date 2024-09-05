import React from 'react';
import { motion } from 'framer-motion';

const Leadership = () => {
    const leaders = [
        { name: 'Manas Gupta', position: 'President', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80' },
        { name: 'Pragya', position: 'Vice President', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80' },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="leadership" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12 text-purple-600"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                >
                    Meet Our Leaders
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl"
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <img src={leader.image} alt={leader.name} className="w-48 h-48 rounded-full object-cover mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800">{leader.name}</h3>
                            <p className="text-purple-600 font-medium">{leader.position}</p>
                            <p className="mt-4 text-center text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;