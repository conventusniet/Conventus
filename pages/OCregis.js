import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, X, Link, Upload, FileUp, Search, ChevronDown } from 'lucide-react';

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
    institute: 'NIET',
    transactionNumber: '',
    email: '',
    branch: '',
    section: '',
    areasOfInterest: [],
    agreeToTerms: false,
  });

  const [paymentFile, setPaymentFile] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef(null);
  const [branchOpen, setBranchOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState('');
  const [sectionSearch, setSectionSearch] = useState('');

  const branchRef = useRef(null);
  const sectionRef = useRef(null);

  const branchOptions = [
    "ECE", "CSBS", "CSE", "CSE(TWIN)", "CSE-R", "AI", "AI(TWIN)", "DS", "CYS",
    "ME", "CS", "IT", "IT(TWIN)", "AIML", "AIML(TWIN)", "BIOTECH", "MTECH", "IOT", "B. Pharma", "MBA", "MCA", "PGDM"
  ];
  const sectionOptions = ["A", "B", "C", "D", "E", "F"];

  const areaOptions = [
    {
      group: "Teams",
      type: "radio",
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (branchRef.current && !branchRef.current.contains(event.target)) {
        setBranchOpen(false);
      }
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setSectionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setModalMessage('Please upload a valid image file (JPG, PNG, or GIF)');
      setIsError(true);
      setModalOpen(true);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setModalMessage('File size should be less than 10MB');
      setIsError(true);
      setModalOpen(true);
      return;
    }

    setPaymentFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'file') {
      handleFileChange(e);
      return;
    }

    if (type === 'checkbox') {
      if (name === 'agreeToTerms') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          areasOfInterest: checked
            ? [...prev.areasOfInterest, value]
            : prev.areasOfInterest.filter(area => area !== value)
        }));
      }
    } else if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        areasOfInterest: [value]
      }));
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
    if (!formData.transactionNumber) {
      setModalMessage('Please enter transaction number.');
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
    if (!formData.branch) {
      setModalMessage('Please select your branch.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!formData.section) {
      setModalMessage('Please select your section.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    const TeamSelections = formData.areasOfInterest.filter(area =>
      areaOptions[0].options.includes(area)
    );

    if (TeamSelections.length === 0) {
      setModalMessage('Please select option from Area of Interest.');
      setIsError(true);
      setModalOpen(true);
      return false;
    }
    if (!paymentFile) {
      setModalMessage('Please upload payment screenshot.');
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

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData instance for multipart/form-data
      const submitData = new FormData();

      // Append all form fields with proper type conversion
      Object.keys(formData).forEach(key => {
        if (key === 'areasOfInterest') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (key === 'agreeToTerms') {
          // Convert JavaScript boolean to string 'True' or 'False' for Python
          submitData.append(key, formData[key] ? 'True' : 'False');
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Append the file
      if (paymentFile) {
        submitData.append('paymentScreenshot', paymentFile);
      }

      // Debug log to check what's being sent
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch('https://conventus.pythonanywhere.com/api/oc-registration/', {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage('Registration completed successfully!');
        setIsError(false);
        // Reset form
        setFormData({
          name: '',
          year: '',
          phone: '',
          institute: 'NIET',
          transactionNumber: '',
          email: '',
          branch: '',
          section: '',
          areasOfInterest: [],
          agreeToTerms: false,
        });
        setPaymentFile(null);
        setPaymentPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        console.error("Backend error response:", data);
        setModalMessage(Array.isArray(data) ? data.join(' ') : (data.message || 'Registration failed. Please try again.'));
        setIsError(true);
      }
    } catch (err) {
      console.error("Error during submission:", err);
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
        OC Registration
      </h2>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">Details: Organising Committee (OC) will be involved in organising and Management of Conventus MUN in NIET Greater Noida.</p>
        <p className="text-gray-700 mb-2">OC Membership Fee: Rs 200</p>
        <p className="text-gray-700 mb-2">Last date to register: 15th February 2025</p>
        {/* <a
          href="https://rzp.io/rzp/ZjW03Dh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 underline mr-4"
        >
          Payment Link
        </a> */}
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
              <Building className="inline-block mr-2 text-red-600" size={18} />
              Institute
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 bg-gray-100"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              disabled
              required
            >
              <option value="NIET">NIET</option>
            </select>
          </div>



          <div className="md:col-span-2 mt-4">
            {/* <label className="block text-gray-800 text-sm font-bold mb-2">
              <Link className="inline-block mr-2 text-red-600" size={18} />
              Link
            </label> */}

            {/* <div>
              <a
                href="https://rzp.io/rzp/ZjW03Dh "
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 underline mr-4"
              >
                Payment Link
              </a>
            </div> */}

            <div className="flex flex-col items-center space-y-4">

              <div className="w-48 h-48 border rounded-lg p-2 bg-white shadow-md">
                <img
                  src="/QR's/OC.jpg"
                  alt="NIET Payment QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <a
                href="https://rzp.io/rzp/ZjW03Dh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 underline"
              >
                Payment Link
              </a>
            </div>

          </div>


          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Transaction Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 text-center"
              type="text"
              name="transactionNumber"
              value={formData.transactionNumber}
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

          <div ref={branchRef} className="relative">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <Building className="inline-block mr-2 text-red-600" size={18} />
              Branch
            </label>
            <div
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 cursor-pointer"
              onClick={() => setBranchOpen(!branchOpen)}
            >
              {formData.branch || "Select Branch"}
            </div>
            {branchOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="flex items-center p-2 border-b">
                  <Search className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full focus:outline-none"
                    value={branchSearch}
                    onChange={(e) => setBranchSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <ul className="max-h-60 overflow-auto">
                  {branchOptions
                    .filter(option => option.toLowerCase().includes(branchSearch.toLowerCase()))
                    .map((option, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleChange({ target: { name: 'branch', value: option } });
                          setBranchOpen(false);
                          setBranchSearch('');
                        }}
                      >
                        {option}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <div ref={sectionRef} className="relative">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              <Building className="inline-block mr-2 text-red-600" size={18} />
              Section
            </label>
            <div
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300 cursor-pointer"
              onClick={() => setSectionOpen(!sectionOpen)}
            >
              {formData.section || "Select Section"}
            </div>
            {sectionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="flex items-center p-2 border-b">
                  <Search className="text-gray-400 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full focus:outline-none"
                    value={sectionSearch}
                    onChange={(e) => setSectionSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <ul className="max-h-60 overflow-auto">
                  {sectionOptions
                    .filter(option => option.toLowerCase().includes(sectionSearch.toLowerCase()))
                    .map((option, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleChange({ target: { name: 'section', value: option } });
                          setSectionOpen(false);
                          setSectionSearch('');
                        }}
                      >
                        {option}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 text-sm font-bold mb-2">
            Area of Interest (Choose a option from Teams)
          </label>
          {areaOptions.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <p className="font-semibold mb-2">{group.group}</p>
              {group.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type={group.type}
                    name={group.type === 'radio' ? 'otherTeams' : 'areasOfInterest'}
                    value={option}
                    checked={formData.areasOfInterest.includes(option)}
                    onChange={handleChange}
                    className={`mr-2 form-${group.type} h-5 w-5 text-red-600 rounded-full`}
                    disabled={
                      group.type === 'checkbox' &&
                      formData.areasOfInterest.length >= 2 &&
                      !formData.areasOfInterest.includes(option)
                    }
                  />
                  <label className="text-gray-700">{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-800 text-sm font-bold mb-2">
            <Upload className="inline-block mr-2 text-red-600" size={18} />
            Payment Screenshot
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-600 transition duration-300">
            <div className="space-y-1 text-center">
              {paymentPreview ? (
                <div className="mt-2">
                  <img
                    src={paymentPreview}
                    alt="Payment Screenshot Preview"
                    className="mx-auto h-48 w-auto object-contain"
                  />
                  <button
                    onClick={() => {
                      setPaymentFile(null);
                      setPaymentPreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="mt-2 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <FileUp
                    className="mx-auto h-12 w-12 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="ocpayment-screenshot"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="ocpayment-screenshot"
                        name="paymentScreenshot"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2 form-checkbox h-5 w-5 text-red-600 rounded-full"
              required
            />
            <label className="text-gray-700">
              I Agree to pay Rs 200 as a membership fee after selection of me as an Organising Team Member and I understand that failing to pay this fee may result in cancellation of my selection as an Organising Team Member.
            </label>
          </div>
        </div>

        <div className="text-center">
          <motion.button
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''
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

