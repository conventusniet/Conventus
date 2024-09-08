import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const AboutConventus = () => {
    const router = useRouter();

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-red-50 via-white to-red-100 overflow-hidden font-sans w-full">
            <div className="container mx-auto px-4 w-full">
                <motion.h2
                    className="text-5xl md:text-7xl font-extrabold text-center mb-16 text-red-800 tracking-tight leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                >
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Conventus</span>
                </motion.h2>
                <motion.div
                    className="flex flex-col items-center justify-center max-w-4xl mx-auto"
                    variants={staggerChildren}
                    initial="initial"
                    animate="animate"
                >
                    <motion.p
                        className="text-xl md:text-2xl mb-8 text-red-700 leading-relaxed text-center font-light"
                        variants={fadeInUp}
                    >
                        Conventus is a <span className="font-semibold">dynamic student organization</span> dedicated to fostering leadership, innovation, and community engagement among college students.
                    </motion.p>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 text-red-700 leading-relaxed text-center font-light"
                        variants={fadeInUp}
                    >
                        Our mission is to provide a <span className="font-semibold">platform for students</span> to develop their skills, network with peers and professionals, and make a positive impact on campus and beyond.
                    </motion.p>
                    <motion.p
                        className="text-xl md:text-2xl mb-12 text-red-700 leading-relaxed text-center font-light"
                        variants={fadeInUp}
                    >
                        Through <span className="font-semibold">workshops, seminars, and collaborative projects</span>, Conventus empowers the next generation of leaders to tackle real-world challenges and drive meaningful change.
                    </motion.p>
                    <motion.div
                        className="mt-12 text-center"
                        variants={fadeInUp}
                    >
                        <motion.button
                            className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-lg md:text-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/registration')}
                        >
                            Join Conventus
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutConventus;