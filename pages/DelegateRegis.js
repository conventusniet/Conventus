import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Building, X } from 'lucide-react';
import Oheader from '@/components/OHeader';
import Footer from '@/components/Footer';

const Modal = ({ isOpen, onClose, message }) => {
    return (
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
                <h2 className="text-2xl font-bold mb-4 text-red-600">
                    Registration Closed
                </h2>
                <p className="text-gray-700">{message}</p>
            </motion.div>
        </motion.div>
    );
};

const ContactPerson = ({ name, title, phone, email }) => (
    <motion.div
        className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
        <h4 className="font-semibold text-lg text-gray-800 mb-2">{name}</h4>
        <p className="text-sm text-red-600 font-medium mb-3">{title}</p>
        <div className="flex items-center justify-center mb-2">
            <Phone className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{phone}</p>
        </div>
        <div className="flex items-center justify-center">
            <Mail className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{email}</p>
        </div>
    </motion.div>
);

const DelegateRegistrationForm = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 mb-16 text-center max-w-4xl w-full">
                {/* Registration Closed Banner */}
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <X className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-lg font-bold text-red-700">
                                Registration Closed
                            </p>
                            <p className="text-red-700 mt-1">
                                Thank you for your interest in NIET MUN 2.0. The registration period has ended.
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-center mb-8 text-gray-500">
                    Delegate Registration
                </h2>

                <div className="mb-6 opacity-50">
                    <h3 className="text-xl font-semibold mb-4">Committees & Agendas</h3>

                    <h5 className="text-xl font-semibold mb-2">United Nations Security Council</h5>
                    <p className="text-gray-700 mb-4 text-justify">Addressing Security Crises and Regional Instability in Middle East while promoting reconstruction Governance and peace negotiations among key stakeholders.</p>

                    <h5 className="text-xl font-semibold mb-2">United Nations Human Rights Council</h5>
                    <p className="text-gray-700 mb-4 text-justify">Rights of Refugees and Asylum Seekers Amidst Global Migration Crises: Balancing sovereignty with humanitarian responsibilities.</p>

                    <h5 className="text-xl font-semibold mb-2">All India Political Party Meet</h5>
                    <p className="text-gray-700 mb-4 text-justify">One Nation, One Election: Evaluating the feasibility, impact on governance, and democratic implications of simultaneous elections while balancing federalism.</p>

                    <h5 className="text-xl font-semibold mb-2">IP</h5>
                    <p className="text-gray-700 mb-4 text-justify">It will consist of Journalists, Photographers and Videographers</p>
                </div>

                <motion.form
                    className="w-full max-w-3xl mx-auto pointer-events-none opacity-50"
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-500 text-sm font-bold mb-2">
                                <User className="inline-block mr-2 text-gray-400" size={18} />
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight text-center bg-gray-100"
                                type="text"
                                name="name"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-sm font-bold mb-2">
                                <Mail className="inline-block mr-2 text-gray-400" size={18} />
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight text-center bg-gray-100"
                                type="email"
                                name="email"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-sm font-bold mb-2">
                                <Phone className="inline-block mr-2 text-gray-400" size={18} />
                                Mobile Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight text-center bg-gray-100"
                                type="tel"
                                name="phone"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-sm font-bold mb-2">
                                <Building className="inline-block mr-2 text-gray-400" size={18} />
                                Institute
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight text-center bg-gray-100"
                                name="institute"
                                disabled
                            >
                                <option value="">Select Institute</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-center">
                        <motion.button
                            className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed opacity-50"
                            type="button"
                            disabled
                        >
                            Registration Closed
                        </motion.button>
                    </div>

                    <div className="bg-amber-50 border border-amber-300 mt-8 rounded-lg p-4 mb-6">
                        <div>
                            <div>
                                <h4 className="font-semibold text-amber-800 mb-1 text-xl">Contact Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <ContactPerson
                                        name="Yashraj Ranjan"
                                        title="Vice - President"
                                        phone="+91 7309328195"
                                        email="3rd Year"
                                    />
                                    <ContactPerson
                                        name="Pragya Singh"
                                        title="Vice - President"
                                        phone="+91 9953552547"
                                        email="3rd Year"
                                    />
                                    <ContactPerson
                                        name="Ameya Atreya"
                                        title="USG Delegate Affairs"
                                        phone="+91 84488 35989"
                                        email="2nd Year"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default DelegateRegistrationForm;