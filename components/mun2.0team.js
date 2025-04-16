import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MUN2Team = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-red-50 to-white mb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">Our Team</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                    <p className="text-red-700 text-lg max-w-2xl mx-auto">
                        Meet the dedicated individuals who made CMUN 2.0 possible
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                        whileHover={{ y: -1 }}
                    >
                        <div className="relative aspect-[16/9] w-full">
                            <Image
                                src="/images/mun2.0/OC_Heads_group_min.webp"
                                alt="CMUN 2.0 Team"
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-2xl font-bold text-red-800 mb-3">CMUN 2.0 Organizing Committee</h3>
                            <p className="text-gray-700">
                                The success of CMUN 2.0 was made possible by this exceptional team, comprising students from diverse 
                                backgrounds who worked tirelessly to create a memorable diplomatic experience. From planning logistics 
                                to coordinating committees, each member played a vital role in bringing this conference to life.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MUN2Team;