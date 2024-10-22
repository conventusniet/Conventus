import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, MapPin, X } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';

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
            <h2 className={`text-2xl font-bold mb-4 ${isError ? 'text-red-600' : 'text-red-600'}`}>
              {isError ? 'Error' : 'Success'}
            </h2>
            <p className="text-gray-700">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    section: '',
    year: '',
    phone: '',
    lang: '',
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key].trim()) {
        setModalMessage(`Please fill in the ${key} field.`);
        setIsError(true);
        setModalOpen(true);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.message) {
        setModalMessage(response.data.message);
        setIsError(response.data.message.toLowerCase().includes('failed'));
        if (!isError) {
          setFormData({
            name: '',
            phone: '',
            email: '',
            organization: '',
            address: '',
          });
        }
      } else {
        setModalMessage('Registration completed, but the server response was unclear.');
        setIsError(false);
      }
    } catch (err) {
      setModalMessage(
        err.response?.data?.message || 'An error occurred while submitting the form. Please try again.'
      );
      setIsError(true);
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  const fields = [
    { id: 'name', label: 'Name', icon: User, type: 'text' },
    { id: 'branch', label: 'Branch', icon: User, type: 'text' },
    { id: 'section', label: 'Section', icon: User, type: 'text' },
    { id: 'year', label: 'Year', icon: User, type: 'text' },
    { id: 'phone', label: 'Phone', icon: Mail, type: 'tel' },
    { id: 'lang', label: 'Language', icon: Building, type: 'text' },
  ];

  return (
    <>
      <motion.form
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto border-2 border-red-600"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor={field.id}>
                <field.icon className="inline-block mr-2 text-red-600" size={18} />
                {field.label}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
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
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="address">
            <MapPin className="inline-block mr-2 text-red-600" size={18} />
            Address
          </label>
          {/* <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
            id="address"
            placeholder="Your Address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea> */}
        </div>
        <div className="mt-8 text-center">
          <motion.button
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Register Now'}
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

export default RegistrationForm;