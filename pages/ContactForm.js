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
      className="w-5 h-5 flex-shrink-0" 
      fill="currentColor"
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.42857 8.14286C9.42857 9.70013 8.17013 10.9586 6.61286 10.9586C5.05559 10.9586 3.79714 9.70013 3.79714 8.14286C3.79714 6.58559 5.05559 5.32714 6.61286 5.32714C8.17013 5.32714 9.42857 6.58559 9.42857 8.14286Z"/>
      <path d="M20.2029 8.14286C20.2029 9.70013 18.9444 10.9586 17.3871 10.9586C15.8299 10.9586 14.5714 9.70013 14.5714 8.14286C14.5714 6.58559 15.8299 5.32714 17.3871 5.32714C18.9444 5.32714 20.2029 6.58559 20.2029 8.14286Z"/>
      <path d="M14.5714 17.3871C14.5714 15.8299 15.8299 14.5714 17.3871 14.5714C18.9444 14.5714 20.2029 15.8299 20.2029 17.3871C20.2029 18.9444 18.9444 20.2029 17.3871 20.2029C15.8299 20.2029 14.5714 18.9444 14.5714 17.3871Z"/>
      <path d="M9.42857 17.3871C9.42857 18.9444 8.17013 20.2029 6.61286 20.2029C5.05559 20.2029 3.79714 18.9444 3.79714 17.3871C3.79714 15.8299 5.05559 14.5714 6.61286 14.5714C8.17013 14.5714 9.42857 15.8299 9.42857 17.3871Z"/>
      <path d="M14.5714 12.7643C14.5714 14.3215 13.3129 15.58 11.7557 15.58C10.1984 15.58 8.94 14.3215 8.94 12.7643C8.94 11.207 10.1984 9.94857 11.7557 9.94857C13.3129 9.94857 14.5714 11.207 14.5714 12.7643Z"/>
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
