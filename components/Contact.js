import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-purple-100 to-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-600"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                >
                    Get in Touch
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-purple-600">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaEnvelope className="text-purple-600 mr-4 text-xl" />
                                <p>contact@conventus.com</p>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-purple-600 mr-4 text-xl" />
                                <p>+123 456 7890</p>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-purple-600 mr-4 text-xl" />
                                <p>123 Innovation Street, Tech City, 12345</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h4 className="text-xl font-semibold mb-4 text-purple-600">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">
                                    <FaEnvelope className="text-2xl" />
                                </a>
                                <a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">
                                    <FaPhone className="text-2xl" />
                                </a>
                                <a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-purple-600">Send Us a Message</h3>
                        <form>
                            <motion.div
                                className="mb-4"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </motion.div>
                            <motion.div
                                className="mb-4"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                            </motion.div>
                            <motion.div
                                className="mb-4"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <textarea
                                    placeholder="Your Message"
                                    className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent h-32"
                                ></textarea>
                            </motion.div>
                            <motion.button
                                type="submit"
                                className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
