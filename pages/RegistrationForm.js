import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Building, MapPin } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://conventus.pythonanywhere.com/api'; // Adjust this to match your Django server URL

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        organization: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(`${API_BASE_URL}/register/`, formData);
            setSuccess(true);
            setFormData({
                name: '',
                mobile: '',
                email: '',
                organization: '',
                address: ''
            });
            console.log('Registration successful:', response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
            console.error('Registration error:', err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { id: 'name', label: 'Name', icon: User, type: 'text' },
        { id: 'mobile', label: 'Mobile No.', icon: Phone, type: 'tel' },
        { id: 'email', label: 'Email', icon: Mail, type: 'email' },
        { id: 'organization', label: 'Organization/Institute/University', icon: Building, type: 'text' },
    ];

    return (
        <motion.form
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                    <div key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                            <field.icon className="inline-block mr-2 text-red-600" size={18} />
                            {field.label}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300"
                            id={field.id}
                            type={field.type}
                            placeholder={`Your ${field.label}`}
                            value={formData[field.id]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    <MapPin className="inline-block mr-2 text-red-600" size={18} />
                    Address
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300"
                    id="address"
                    placeholder="Your Address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            {error && (
                <div className="mt-4 text-red-600 text-center">{error}</div>
            )}
            {success && (
                <div className="mt-4 text-green-600 text-center">Registration successful!</div>
            )}
            <div className="mt-8 text-center">
                <motion.button
                    className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Register Now'}
                </motion.button>
            </div>
            
        </motion.form>
    );
};

export default RegistrationForm;