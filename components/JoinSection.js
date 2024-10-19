import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const JoinSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-16 sm:py-32 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12">
                        We&apos;re just getting started
                    </h2>
                    
                    <div className="w-full max-w-3xl mb-12">
                        <Image
                            src="/images/gs.jpg"
                            alt="Getting Started"
                            width={2340}
                            height={1560}
                            layout="responsive"
                            className="rounded-lg"
                        />
                    </div>
                    
                    <div className="relative">
                        <Link href="/registration" passHref>
                            <motion.button
                                className="inline-block px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-red-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                            >
                                <span className="mr-2">🚀</span>
                                Launch Your Journey
                            </motion.button>
                        </Link>
                        <AnimatePresence>
                            {isHovered && (
                                <motion.p
                                    className="mt-4 text-sm text-gray-600 text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    Click to finalize your registration!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinSection;
