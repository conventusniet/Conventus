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

    return (
        <section className="py-24 bg-gradient-to-br from-red-50 via-white to-red-100 overflow-hidden">
            <div className="container mx-auto px-4 relative">
                <motion.h2
                    className="text-6xl font-bold text-center mb-16 text-red-800 tracking-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About Conventus
                </motion.h2>
                <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <motion.p
                        className="text-2xl mb-8 text-red-700 leading-relaxed text-center font-light"
                        {...fadeInUp}
                    >
                        Conventus is a dynamic student organization dedicated to fostering leadership, innovation, and community engagement among college students.
                    </motion.p>
                    <motion.p
                        className="text-2xl mb-8 text-red-700 leading-relaxed text-center font-light"
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                    >
                        Our mission is to provide a platform for students to develop their skills, network with peers and professionals, and make a positive impact on campus and beyond.
                    </motion.p>
                    <motion.p
                        className="text-2xl mb-12 text-red-700 leading-relaxed text-center font-light"
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                    >
                        Through workshops, seminars, and collaborative projects, Conventus empowers the next generation of leaders to tackle real-world challenges and drive meaningful change.
                    </motion.p>
                    <motion.button
                        className="mt-8 px-12 py-4 bg-red-600 text-white rounded-full text-xl font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/registration')}
                    >
                        Join Conventus
                    </motion.button>
                </div>
            </div>
            <svg className="absolute left-0 top-0 text-red-200 opacity-20 transform rotate-180" width="404" height="784" fill="none" viewBox="0 0 404 784">
                <defs>
                    <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
            </svg>
        </section>
    );
};

export default AboutConventus;