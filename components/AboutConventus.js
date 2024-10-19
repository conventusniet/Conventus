import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const AboutConventus = () => {
    const router = useRouter();

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 }
    };

    const slideIn = {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { type: "spring", stiffness: 100, damping: 15 }
    };

    return (
        <section className="py-16 bg-gray-300 overflow-hidden w-full" >
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.h2
                    className="text-5xl md:text-6xl font-bold text-center mb-12 text-red-800 tracking-tight leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                >
                    Discover <span className="text-red-600">Conventus</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="space-y-6"
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.p
                            className="text-xl text-red-700 leading-relaxed"
                            variants={slideIn}
                        >
                            Conventus is a dynamic student organization fostering leadership, innovation, and community engagement among college students.
                        </motion.p>
                        <motion.p
                            className="text-xl text-red-700 leading-relaxed"
                            variants={slideIn}
                        >
                            Our mission is to provide a platform for students to develop their skills, network with peers and professionals, and make a positive impact.
                        </motion.p>
                        <motion.button
                            className="mt-8 px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full text-xl font-bold hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/aboutus')}
                        >
                            Read More
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="relative h-80 overflow-hidden rounded-lg shadow-2xl"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    >
                        <motion.img
                            src="/images/2.jpg"
                            alt="Conventus Activities"
                            className="object-cover w-full h-full"
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-800 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Empowering Future Leaders</h3>
                            <p className="text-red-100">Join us in shaping tomorrow's world</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutConventus;
