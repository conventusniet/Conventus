import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Building, X, Link, Upload, FileUp, Search } from 'lucide-react';

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
                            {isError ? 'Error' : 'Welcome to the NIET MUN 2.0'}
                        </h2>
                        <p className="text-gray-700">{message}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const DelegateRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        institute: '',
        branch: '',
        section: '',
        year: '',
        erp: '',
        officialEmail: '',
        transactionNumber: '',
        referralId: '',
        committeePreference1: '',
        portfolioPreference1: '',
        committeePreference2: '',
        portfolioPreference2: '',
        instituteCustom: '',
        paymentScreenshot: null
    });

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
        "ME", "CS", "IT", "IT(TWIN)", "AIML", "AIML(TWIN)", "BIOTECH", "MTECH", "IOT"
    ];
    const sectionOptions = ["A", "B", "C", "D", "E", "F"];

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

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
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
        if (!formData.email.trim()) {
            setModalMessage('Please enter your email.');
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
        if (!formData.institute) {
            setModalMessage('Please select your institute.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (formData.institute === 'NIET') {
            if (!formData.branch || !formData.section || !formData.year || !formData.erp || !formData.officialEmail) {
                setModalMessage('Please fill in all NIET-specific details.');
                setIsError(true);
                setModalOpen(true);
                return false;
            }
        } else if (!formData.instituteCustom) {
            setModalMessage('Please enter your institute name.');
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
        if (!formData.committeePreference1 || !formData.portfolioPreference1) {
            setModalMessage('Please fill in your first committee and portfolio preference.');
            setIsError(true);
            setModalOpen(true);
            return false;
        }
        if (!formData.paymentScreenshot) {
            setModalMessage('Please upload payment screenshot.');
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

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                setModalMessage('Registration completed successfully!');
                setIsError(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    institute: '',
                    branch: '',
                    section: '',
                    year: '',
                    erp: '',
                    officialEmail: '',
                    transactionNumber: '',
                    referralId: '',
                    committeePreference1: '',
                    portfolioPreference1: '',
                    committeePreference2: '',
                    portfolioPreference2: '',
                    instituteCustom: '',
                    paymentScreenshot: null
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
                Delegate Registration
            </h2>

            <div className="mb-6">
                {/* <h3 className="text-xl font-semibold mb-2">Registration Details</h3> */}
                <p className="text-gray-700 mb-4">Note:  The registration fee is non-refundable</p>
                <h3 className="text-xl font-semibold mb-4">Committees & Agendas</h3>
 
                <h5 className="text-xl font-semibold mb-2">AIPPM</h5>
                <p className="text-gray-700 mb-4">One Nation, One Election: Evaluating the feasibility, impact on governance, and democratic implications of simultaneous elections while balancing federalism.
                </p>
                <h5 className="text-xl font-semibold mb-2">UNHRC</h5>
                <p className="text-gray-700 mb-4">Rights of Refugees and Asylum Seekers Amidst Global Migration Crises : Balancing sovereignty with humanitarian responsibilities.
                </p>
                <h5 className="text-xl font-semibold mb-2">UNSC</h5>
                <p className="text-gray-700 mb-4">Addressing Security Crises and Regional Instability in Middle East while promoting reconstruction Governance and peace negotiations among key stakeholders.
                </p>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        <Link className="inline-block mr-2 text-red-600" size={18} />
                        Matrix
                    </label>
                    <a
                        href="YOUR_MATRIX_URL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline"
                    >
                        View Matrix
                    </a>
                </div>
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
                            <Mail className="inline-block mr-2 text-red-600" size={18} />
                            Email
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
                            <Phone className="inline-block mr-2 text-red-600" size={18} />
                            Mobile Number
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                            name="institute"
                            value={formData.institute}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Institute</option>
                            <option value="NIET">NIET</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    {formData.institute === 'NIET' && (
                        <>
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

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
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
                                    ERP ID
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                                    type="text"
                                    name="erp"
                                    value={formData.erp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    Official Email ID
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                                    type="email"
                                    name="officialEmail"
                                    value={formData.officialEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    Payable Amount
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
                                    type="text"
                                    value="₹499"
                                    disabled
                                />
                            </div>
                        </>
                    )}

                    {formData.institute === 'OTHER' && (
                        <>
                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    Institute Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                                    type="text"
                                    name="instituteCustom"
                                    value={formData.instituteCustom}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                    Payable Amount
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
                                    type="text"
                                    value="₹599"
                                    disabled
                                />
                            </div>
                        </>
                    )}

                    {formData.institute && (
                        <div>
                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                Transaction Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                                type="text"
                                name="transactionNumber"
                                value={formData.transactionNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Referral ID (Optional)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                            type="text"
                            name="referralId"
                            value={formData.referralId}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Committee Preference 1
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                            type="text"
                            name="committeePreference1"
                            value={formData.committeePreference1}
                            onChange={handleChange}
                            required
                            placeholder="Mention any 3 committees"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Portfolio Preference 1
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                            type="text"
                            name="portfolioPreference1"
                            value={formData.portfolioPreference1}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Committee Preference 2
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                            type="text"
                            name="committeePreference2"
                            value={formData.committeePreference2}
                            onChange={handleChange}
                            required
                            placeholder="Mention any 3 committees"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Portfolio Preference 2
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-600 transition duration-300"
                            type="text"
                            name="portfolioPreference2"
                            value={formData.portfolioPreference2}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            <Upload className="inline-block mr-2 text-red-600" size={18} />
                            Payment Screenshot
                        </label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-600 transition duration-300">
                            <div className="space-y-1 text-center">
                                <FileUp
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    aria-hidden="true"
                                />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="payment-screenshot"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="payment-screenshot"
                                            name="paymentScreenshot"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleChange}
                                            ref={fileInputRef}
                                            required
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                                {formData.paymentScreenshot && (
                                    <p className="text-sm text-green-600">
                                        Selected file: {formData.paymentScreenshot.name}
                                    </p>
                                )}
                            </div>
                        </div>
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

export default DelegateRegistrationForm;