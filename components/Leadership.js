import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LeadershipCard = ({ name, role, image, description }) => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="relative h-80 w-80 mx-auto mt-8 rounded-full overflow-hidden">
            <Image
                src={image}
                alt={name}
                layout="fill"
                objectFit="cover"
                objectPosition="center 30%"
                className="transition-transform duration-300 hover:scale-110"
            />
        </div>
        <div className="p-6 text-center">
            <h3 className="text-3xl font-bold mb-1">{name}</h3>
            <p className="text-xl font-semibold text-red-400 mb-4">{role}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const Leadership = () => {
    const leaders = [
        {
            name: "Manas Gupta",
            role: "President",
            image: "/images/President.jpg",
            description: "Manas is a visionary leader with a passion for innovation and community building. With his strategic mindset and inclusive approach, he's driving Conventus to new heights."
        },
        {
            name: "Pragya Singh",
            role: "Vice President",
            image: "/images/Vice President.jpg",
            description: "Pragya brings years of experience in event management and student engagement. Her creativity and dedication ensure that every Conventus event is a memorable success."
        },
        {
            name: "Yashraj Ranjan",
            role: "Vice President",
            image: "/images/Vice President2.jpg",
            description: "Yashraj excels in operations and logistics. His attention to detail and problem-solving skills help streamline Conventus's processes and enhance member experiences."
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-200 w-full">
            <div className="container mx-auto px-4 w-full">
                <motion.h2
                    className="text-5xl font-bold text-center mb-16 text-gray-800"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Leadership
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {leaders.map((leader, index) => (
                        <LeadershipCard key={index} {...leader} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;