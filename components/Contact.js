import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-red-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-5xl font-bold text-center mb-16 text-red-800"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Contact Us
                </motion.h2>
                <div className="flex flex-wrap -mx-4">
                    <motion.div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0" {...fadeInUp}>
                        <div className="bg-white rounded-lg shadow-xl p-8 h-full">
                            <h3 className="text-3xl font-bold mb-6 text-red-700">Get in Touch</h3>
                            <div className="flex items-center mb-4">
                                <Mail className="w-6 h-6 text-red-600 mr-4" />
                                <p className="text-lg"><strong>Email:</strong> info@conventus.edu</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <Phone className="w-6 h-6 text-red-600 mr-4" />
                                <p className="text-lg"><strong>Phone:</strong> +91 - 844-838-4611</p>
                            </div>
                            <div className="flex items-start mb-4">
                                <MapPin className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                <p className="text-lg"><strong>Address:</strong> Noida Institute of Engineering Technology 19, Knowledge Park- II, Institutional Area, Greater Noida (UP) - 201306</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="w-full lg:w-1/2 px-4" {...fadeInUp} transition={{ delay: 0.2 }}>
                        <form className="bg-white rounded-lg shadow-xl p-8">
                            <div className="mb-6">
                                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300" id="name" type="text" placeholder="Your Name" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300" id="email" type="email" placeholder="Your Email" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300" id="message" placeholder="Your Message" rows="4"></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <motion.button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Send Message
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
                <motion.div
                    className="mt-16 rounded-lg overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4019.3879596488964!2d77.49149934239581!3d28.46494644546897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e055d148a1%3A0x9f5207f7f0bc8f63!2sNoida%20Institute%20of%20Engineering%20and%20Technology%20(NIET%2C%20Greater%20Noida)!5e1!3m2!1sen!2sin!4v1725700007832!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>

                </motion.div>
            </div>
        </section>
    );
};

export default Contact;