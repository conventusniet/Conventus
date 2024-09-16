import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Building, MapPin } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        organization: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const validateForm = () => {
        for (const key in formData) {
            if (!formData[key].trim()) {
                setError(`Please fill in the ${key} field.`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setResponseMessage('');

        console.log('Attempting to send the following data to the backend:');
        console.log(JSON.stringify(formData, null, 2));

        try {
            const response = await axios.post(`${API_BASE_URL}/register/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Data successfully sent to the backend.');
            console.log('Server response:', response.data);

            if (response.data && response.data.message) {
                setResponseMessage(response.data.message);
                if (response.data.message.toLowerCase().includes('failed')) {
                    console.log('Registration failed according to server message.');
                    setError('Registration was not successful. Please try again or contact support.');
                } else {
                    console.log('Registration appears to be successful.');
                    // Reset form on success
                    setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        organization: '',
                        address: ''
                    });
                }
            } else {
                console.log('Server response does not contain a message field.');
                setResponseMessage('Registration completed, but the server response was unclear.');
            }
        } catch (err) {
            console.error('Failed to send data to the backend.');
            console.error('Error details:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { id: 'name', label: 'Name', icon: User, type: 'text' },
        { id: 'phone', label: 'Phone', icon: Phone, type: 'tel' },
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
            {responseMessage && (
                <div className="mt-4 text-blue-600 text-center">{responseMessage}</div>
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