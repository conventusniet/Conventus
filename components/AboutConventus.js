import React from 'react';
import { motion } from 'framer-motion';

const AboutConventus = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="about" className="py-20 bg-gradient-to-b from-white to-purple-100">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-600"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                >
                    About Conventus
                </motion.h2>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <motion.div
                        className="md:w-1/2 mb-8 md:mb-0"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                            Conventus is a dynamic club that fosters leadership, innovation, and collaboration among ambitious individuals. Our mission is to create a platform where ideas flourish, skills are honed, and networks are built.
                        </p>
                        <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                            Through workshops, seminars, and hands-on projects, we empower our members to push boundaries and make a real impact in their fields. Join us in shaping the future of leadership and innovation!
                        </p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                            Join Conventus
                        </button>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="About Conventus"
                            className="rounded-lg shadow-xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutConventus;