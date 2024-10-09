import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, X, ExternalLink } from 'lucide-react';
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
    className="flex items-center justify-center space-x-3 bg-[#39E09B] hover:bg-[#32C589] text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 mx-auto group w-64"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      className="flex-shrink-0"
    >
      <path d="M7.5 9h9v6h-9V9zM6 7.5v9a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0016.5 6h-9A1.5 1.5 0 006 7.5z"/>
      <path d="M4.5 4.5v15A1.5 1.5 0 006 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0021 3H6a1.5 1.5 0 00-1.5 1.5z"/>
    </svg>
    <span className="whitespace-nowrap">Explore Our Linktree</span>
    <ExternalLink className="w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
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
          
          <LinkTreeButton />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
