import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, MapPin, X } from 'lucide-react';
import axios from 'axios';
import DelegateRegistrationForm from './DelegateRegis';
import OCRegistrationForm from './OCregis';
// const Modal = ({ isOpen, onClose, message, isError }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative border-4 border-red-600"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ type: 'spring', damping: 15 }}
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//             >
//               <X size={24} />
//             </button>
//             <h2 className={`text-2xl font-bold mb-4 ${isError ? 'text-red-600' : 'text-green-600'}`}>
//               {isError ? 'Error' : 'Success'}
//             </h2>
//             <p className="text-gray-700">{message}</p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

 const RegistrationForms = () => {
//   const [debateFormData, setDebateFormData] = useState({
//     name: '',
//     branch: '',
//     section: '',
//     year: '1ST',
//     phone: '',
//     lang: 'english',
//   });

//   const [tripFormData, setTripFormData] = useState({
//     name: '',
//     branch: '',
//     section: '',
//     year: '1ST',
//     erpid: '',
//     st1: '',
//     st2: '',
//     st3: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [isError, setIsError] = useState(false);

//   const handleDebateChange = (e) => {
//     const { id, value } = e.target;
//     setDebateFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleTripChange = (e) => {
//     const { id, value } = e.target;
//     setTripFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const validateDebateForm = () => {
//     for (const key in debateFormData) {
//       if (!debateFormData[key].trim()) {
//         setModalMessage(`Please fill in the ${key} field.`);
//         setIsError(true);
//         setModalOpen(true);
//         return false;
//       }
//     }
//     return true;
//   };

//   const validateTripForm = () => {
//     for (const key in tripFormData) {
//       if (!tripFormData[key].trim()) {
//         setModalMessage(`Please fill in the ${key} field.`);
//         setIsError(true);
//         setModalOpen(true);
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleDebateSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateDebateForm()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         'https://conventus.pythonanywhere.com/api/debate-registration/',
//         debateFormData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data && response.data.message) {
//         setModalMessage(response.data.message);
//         setIsError(response.data.message.toLowerCase().includes('failed'));
//         if (!isError) {
//           setDebateFormData({
//             name: '',
//             branch: '',
//             section: '',
//             year: '1ST',
//             phone: '',
//             lang: 'english',
//           });
//         }
//       } else {
//         setModalMessage('Registration completed successfully!');
//         setIsError(false);
//       }
//     } catch (err) {
//       setModalMessage(
//         err.response?.data?.message || 'An error occurred while submitting the form. Please try again.'
//       );
//       setIsError(true);
//     } finally {
//       setLoading(false);
//       setModalOpen(true);
//     }
//   };

//   const handleTripSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateTripForm()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         'https://conventus.pythonanywhere.com/api/trip-registration/',
//         tripFormData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data && response.data.message) {
//         setModalMessage(response.data.message);
//         setIsError(response.data.message.toLowerCase().includes('failed'));
//         if (!isError) {
//           setTripFormData({
//             name: '',
//             branch: '',
//             section: '',
//             year: '1ST',
//             erpid: '',
//             st1: '',
//             st2: '',
//             st3: '',
//           });
//         }
//       } else {
//         setModalMessage('Trip registration completed successfully!');
//         setIsError(false);
//       }
//     } catch (err) {
//       setModalMessage(
//         err.response?.data?.message || 'An error occurred while submitting the form. Please try again.'
//       );
//       setIsError(true);
//     } finally {
//       setLoading(false);
//       setModalOpen(true);
//     }
//   };

//   const debateFields = [
//     { id: 'name', label: 'Name', icon: User, type: 'text' },
//     { id: 'branch', label: 'Branch', icon: Building, type: 'text' },
//     { id: 'section', label: 'Section', icon: User, type: 'text' },
//     {
//       id: 'year',
//       label: 'Year',
//       icon: User,
//       type: 'select',
//       options: ['1ST', '2ND', '3RD', '4TH'],
//     },
//     { id: 'phone', label: 'Phone', icon: Phone, type: 'tel' },
//     {
//       id: 'lang',
//       label: 'Language',
//       icon: Building,
//       type: 'select',
//       options: ['english', 'hindi'],
//     },
//   ];

//   const tripFields = [
//     { id: 'name', label: 'Name', icon: User, type: 'text' },
//     { id: 'branch', label: 'Branch', icon: Building, type: 'text' },
//     { id: 'section', label: 'Section', icon: User, type: 'text' },
//     {
//       id: 'year',
//       label: 'Year',
//       icon: User,
//       type: 'select',
//       options: ['1ST', '2ND', '3RD', '4TH'],
//     },
//   ];

//   const tripTextareas = [
//     { id: 'erpid', label: 'ERP ID', icon: User },
//     { id: 'st1', label: 'Please agree to bring your college ID card, Without it you will not be allowed to travel (Please type yes to agree)', icon: User },
//     { id: 'st2', label: 'Cultural Strolls are not sponsored, Please acknowledge all expenditure will be your own (Please type yes to agree)', icon: User },
//     { id: 'st3', label: 'Incase of any misfortune or accident neither the college, club or the organizers are responsible (Please type yes to agree)', icon: User },
//   ];

  return (
    <div>
      <DelegateRegistrationForm/>
      <OCRegistrationForm/>
      {/* <div className="mb-16 bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-red-600">
          Debate Registration Form
        </h2>
        <motion.form
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleDebateSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {debateFields.map((field) => (
              <div key={field.id}>
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor={field.id}>
                  <field.icon className="inline-block mr-2 text-red-600" size={18} />
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                    id={field.id}
                    value={debateFormData[field.id]}
                    onChange={handleDebateChange}
                    required
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                    id={field.id}
                    type={field.type}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    value={debateFormData[field.id]}
                    onChange={handleDebateChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <motion.button
              className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Register for Debate'}
            </motion.button>
          </div>
        </motion.form>
      </div>

      <div className="mb-16 bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-red-600">
          Trip Registration Form
        </h2>
        <motion.form
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleTripSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            {tripFields.map((field) => (
              <div key={field.id} className="w-full md:w-1/4 px-3 mb-6">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor={field.id}>
                  <field.icon className="inline-block mr-2 text-red-600" size={18} />
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                    id={field.id}
                    value={tripFormData[field.id]}
                    onChange={handleTripChange}
                    required
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                    id={field.id}
                    type={field.type}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    value={tripFormData[field.id]}
                    onChange={handleTripChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          {tripTextareas.map((field) => (
            <div key={field.id} className="mb-6">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor={field.id}>
                <field.icon className="inline-block mr-2 text-red-600" size={18} />
                {field.label}
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                id={field.id}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                rows="3"
                value={tripFormData[field.id]}
                onChange={handleTripChange}
                required
              />
            </div>
          ))}

          <div className="mt-8 text-center">
            <motion.button
              className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Register for Trip'}
            </motion.button>
          </div>
        </motion.form>
      </div> */}

      {/* <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        isError={isError}
      /> */}
    </div>
  );
};

export default RegistrationForms;
