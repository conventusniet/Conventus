import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, X } from 'lucide-react';

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
            <h2 className={`text-2xl font-bold mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {isError ? 'Error' : 'Success'}
            </h2>
            <p className="text-gray-700">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const OCRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    phone: '',
    email: '',
    institute: 'NIET',
    branchSection: '',
    areasOfInterest: [],
    agreeToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const areaOptions = [
    {
      group: "International Press Team",
      options: ["English Journalism", "Hindi Joumanalism", "Photography"]
    },
    {
      group: "Other Teams",
      options: [
        "Social Media Team ( Videography - Recording and Editing)",
        "Design Team",
        "Marketing, Public Outreach and Sponsorship Team",
        "Technical Team",
        "Hospitality and Volunteering Team",
        "Delegate Affairs Team (Documentation and Communication)"
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeToTerms') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      } else {
        // Handle areas of interest checkboxes
        setFormData(prev => ({
          ...prev,
          areasOfInterest: checked 
            ? [...prev.areasOfInterest, value]
            : prev.areasOfInterest.filter(area => area !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setModalMessage('Please enter your name.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!formData.year) {
      setModalMessage('Please select your year.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!formData.phone.trim()) {
      setModalMessage('Please enter your phone number.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!formData.email.trim()) {
      setModalMessage('Please enter your email.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!formData.branchSection.trim()) {
      setModalMessage('Please enter your branch and section.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (formData.areasOfInterest.length === 0 || formData.areasOfInterest.length > 2) {
      setModalMessage('Please select 1 or 2 areas of interest.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!formData.agreeToTerms) {
      setModalMessage('Please agree to the terms and conditions.');
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
      const response = await fetch('https://conventus.pythonanywhere.com/api/oc-registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage('Registration completed successfully!');
        setIsError(false);
        setFormData({
          name: '',
          year: '',
          phone: '',
          email: '',
          institute: 'NIET',
          branchSection: '',
          areasOfInterest: [],
          agreeToTerms: false
        });
      } else {
        setModalMessage(data.message || 'Registration failed. Please try again.');
        setIsError(true);
      }
    } catch (err) {
      setModalMessage('An error occurred while submitting the form. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 mb-16">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-600">
        Conventus MUN OC Registration Form
      </h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">Details: Organising Committee (OC) will be involved in organising and Management of Conventus MUN in NIET Greater Noida.</p>
        <p className="text-gray-700 mb-2">OC Membership Fee: 200 Rs/- (Food Charges)</p>
        <p className="text-gray-700 mb-2">Last date to register: 23rd December 2024</p>
      </div>

      <motion.form
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <User className="inline-block mr-2 text-red-600" size={18} />
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <User className="inline-block mr-2 text-red-600" size={18} />
              Year
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <Phone className="inline-block mr-2 text-red-600" size={18} />
              Phone No.
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <Mail className="inline-block mr-2 text-red-600" size={18} />
              Official Email Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <Building className="inline-block mr-2 text-red-600" size={18} />
              Institute
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight"
              type="text"
              name="institute"
              value={formData.institute}
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <Building className="inline-block mr-2 text-red-600" size={18} />
              Branch and Section
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
              type="text"
              name="branchSection"
              value={formData.branchSection}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 text-sm font-bold mb-2">
            Area of Interest (Choose at most 2)
          </label>
          {areaOptions.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <p className="font-semibold mb-2">{group.group}</p>
              {group.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="areasOfInterest"
                    value={option}
                    checked={formData.areasOfInterest.includes(option)}
                    onChange={handleChange}
                    className="mr-2"
                    disabled={formData.areasOfInterest.length >= 2 && !formData.areasOfInterest.includes(option)}
                  />
                  <label className="text-gray-700">{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-gray-700">
              I Agree to pay Rs 200 as a membership fee after selection of me as an Organising Team Member and I understand that failing to pay this fee may result in cancellation of my selection as an Organising Team Member.
            </label>
          </div>
        </div>

        <div className="text-center">
          <motion.button
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </motion.button>
        </div>
      </motion.form>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        isError={isError}
      />
    </div>
  );
};

export default OCRegistrationForm;