import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Oheader from '../components/OHeader';
import Footer from '../components/Footer';
import axios from 'axios';



const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';

// Modal Component
const Modal = ({ isOpen, onClose, message, isError }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative border-4 border-red-600"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <X size={24} />
                        </button>
                        <h2 className={`text-2xl font-bold mb-4 text-red-600`}>
                            {isError ? 'Error' : 'Success'}
                        </h2>
                        <p className="text-gray-700">{message}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setModalMessage('Please fill in all fields.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/contact/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data && response.data.message) {
                setModalMessage(response.data.message);
                setIsError(response.data.message.toLowerCase().includes('failed'));
                if (!isError) {
                    setFormData({ name: '', email: '', message: '' });
                }
            } else {
                setModalMessage('Submission completed, but the server response was unclear.');
                setIsError(false);
            }
        } catch (err) {
            setModalMessage(err.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
            setIsError(true);
        } finally {
            setLoading(false);
            setModalOpen(true);
        }
    };

    return (
        <>
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl font-bold mb-8 text-red-600 text-center">Contact Us</h2>
                <div className="mb-8">
                    <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-3 text-xl text-gray-700 border-b-2 border-red-600 focus:outline-none focus:border-red-800 transition-all duration-300"
                        required
                        whileFocus={{ scale: 1.05 }}
                    />
                </div>
                <div className="mb-8">
                    <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full px-4 py-3 text-xl text-gray-700 border-b-2 border-red-600 focus:outline-none focus:border-red-800 transition-all duration-300"
                        required
                        whileFocus={{ scale: 1.05 }}
                    />
                </div>
                <div className="mb-8">
                    <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="6"
                        className="w-full px-4 py-3 text-xl text-gray-700 border-2 border-red-600 rounded-lg focus:outline-none focus:border-red-800 transition-all duration-300 resize-none"
                        required
                        whileFocus={{ scale: 1.02 }}
                    ></motion.textarea>
                </div>
                <div className="flex items-center justify-center">
                    <motion.button
                        type="submit"
                        className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl focus:outline-none focus:shadow-outline transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </div>
            </motion.form>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message={modalMessage}
                isError={isError}
            />
        </>
    );
};

const LinkTreeButton = () => (
    <motion.a
        href="https://linktr.ee/conventusclub"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center bg-[#4EEDB1] text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transition-all duration-300 mx-auto relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26px" height="26px" className="mr-2">
            <linearGradient id="SVGID_1_" x1="34.914" x2="13.079" y1="9.607" y2="31.443" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#60fea4" />
                <stop offset=".033" stopColor="#6afeaa" />
                <stop offset=".197" stopColor="#97fec4" />
                <stop offset=".362" stopColor="#bdffd9" />
                <stop offset=".525" stopColor="#daffea" />
                <stop offset=".687" stopColor="#eefff5" />
                <stop offset=".846" stopColor="#fbfffd" />
                <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <path fill="url(#SVGID_1_)" d="M9.533,17.869h8.352l-5.917-5.641c-0.403-0.384-0.415-1.022-0.027-1.421l2.258-2.321 c0.393-0.404,1.041-0.404,1.434,0l5.621,5.779V6c0-0.552,0.448-1,1-1h3.496c0.552,0,1,0.448,1,1v8.264l5.622-5.767 c0.392-0.402,1.039-0.403,1.432,0l2.253,2.309c0.389,0.399,0.377,1.039-0.026,1.423l-5.912,5.625h8.349c0.552,0,1,0.448,1,1v3.23 c0,0.552-0.448,1-1,1h-8.403l5.965,5.796c0.399,0.388,0.405,1.027,0.013,1.422l-2.246,2.263c-0.391,0.394-1.027,0.394-1.418,0.001 l-8.376-8.418l-8.379,8.42c-0.39,0.392-1.025,0.393-1.416,0.002l-2.253-2.253c-0.395-0.395-0.39-1.036,0.01-1.424l5.965-5.794 H9.533c-0.552,0-1-0.448-1-1v-3.23C8.533,18.316,8.98,17.869,9.533,17.869z" />
            <linearGradient id="SVGID_2_" x1="28.171" x2="19.803" y1="32.611" y2="40.978" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#60fea4" />
                <stop offset=".033" stopColor="#6afeaa" />
                <stop offset=".197" stopColor="#97fec4" />
                <stop offset=".362" stopColor="#bdffd9" />
                <stop offset=".525" stopColor="#daffea" />
                <stop offset=".687" stopColor="#eefff5" />
                <stop offset=".846" stopColor="#fbfffd" />
                <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <path fill="url(#SVGID_2_)" d="M22.238,30.589h3.496c0.552,0,1,0.448,1,1 V42c0,0.552-0.448,1-1,1h-3.496c-0.552,0-1-0.448-1-1V31.589C21.238,31.037,21.686,30.589,22.238,30.589z" />
            <path fill="none" stroke="#10e36c" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M26.58,26.739l-1.87-1.879c-0.391-0.393-1.027-0.393-1.418,0l-7.67,7.708c-0.39,0.392-1.025,0.393-1.416,0.002	l-2.253-2.253c-0.395-0.395-0.39-1.036,0.01-1.424l4.197-4.077c0.644-0.626,0.201-1.717-0.697-1.717H9.533c-0.552,0-1-0.448-1-1	v-3.23c0-0.552,0.448-1,1-1h5.854c0.902,0,1.343-1.101,0.69-1.724l-4.109-3.917c-0.403-0.384-0.415-1.022-0.027-1.421l2.258-2.321	c0.393-0.404,1.041-0.404,1.434,0l3.905,4.014c0.626,0.643,1.717,0.2,1.717-0.697v-0.738" />
            <path fill="none" stroke="#10e36c" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M21.253,6c0-0.552,0.448-1,1-1h3.496c0.552,0,1,0.448,1,1v5.805c0,0.897,1.09,1.34,1.716,0.698l3.906-4.007	c0.392-0.402,1.039-0.403,1.432,0l2.253,2.309c0.389,0.399,0.377,1.039-0.026,1.423l-4.1,3.901	c-0.654,0.622-0.214,1.724,0.689,1.724h5.848c0.552,0,1,0.448,1,1v3.23c0,0.552-0.448,1-1,1h-5.939	c-0.898,0-1.341,1.091-0.697,1.717l4.198,4.079c0.399,0.388,0.405,1.027,0.013,1.422l-2.246,2.263	c-0.391,0.394-1.027,0.394-1.418,0.001l-1.966-1.976" />
            <path fill="none" stroke="#10e36c" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M21.238,34.277v-2.687c0-0.552,0.448-1,1-1h3.496c0.552,0,1,0.448,1,1V42c0,0.552-0.448,1-1,1h-3.496	c-0.552,0-1-0.448-1-1v-2.064" />
        </svg>
        <span className="relative z-10">Explore Our Linktree</span>
        <motion.div
            className="absolute inset-0 bg-[#32C589] opacity-0 group-hover:opacity-100"
            initial={{ scaleX: 0 }}
            whileHover={{
                scaleX: 1,
                transition: { duration: 0.3 }
            }}
            style={{ transformOrigin: 'left' }}
        />
        <motion.div
            className="absolute top-0 bottom-0 w-4 bg-white opacity-50"
            initial={{ left: '-10%' }}
            whileHover={{
                left: '110%',
                transition: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 1,
                    ease: 'linear'
                }
            }}
        />
    </motion.a>
);
const ContactPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Oheader />
            <main className="flex-grow bg-gradient-to-b from-gray-100 to-red-100 flex items-center justify-center px-4">
                <div className="container mx-auto py-12 md:py-20 mt-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Welcome to Conventus
                    </motion.h1>
                    <motion.p
                        className="text-xl text-center text-gray-700 mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Empowering students to lead, innovate, and make a difference.
                    </motion.p>
                    <ContactForm />

                    {/* Spacer between form and Linktree button */}
                    <div className="h-16"></div>

                    <div className="flex justify-center">
                        <LinkTreeButton />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;