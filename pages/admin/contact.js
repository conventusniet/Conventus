import {React,useEffect, useState, memo } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, RefreshCcw } from 'lucide-react';
import Oheader from '@/components/OHeader';
import Footer from '@/components/Footer';
import Link from 'next/link'
import { getCookie, setCookie } from 'cookies-next';
const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';


export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = getCookie('adminToken', { req, res });

    if (!token) {
        return { redirect: { destination: '/admin/login', permanent: false } };
    }
    console.log('Token exists:', !!token);
    console.log('Token value:', token?.slice(-10) + '...'); // Last 10 chars
    try {
        // Add JWT import
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        if (decoded.role !== 'admin' || decoded.exp < Date.now() / 1000) {
            throw new Error('Invalid token');
        }

        return { props: {} };
    } catch (error) {
        console.error('Token verification failed:', error.message);
        console.error('Verification error:', error);
        setCookie('adminToken', '', { req, res, maxAge: -1 });
        return { redirect: { destination: '/admin/login', permanent: false } };
    }
}

// Date formatting utility
const formatTimestamp = (timestamp) => {
    try {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        };
        return new Date(timestamp).toLocaleString('en-US', options);
    } catch (error) {
        console.error('Invalid date format:', timestamp);
        return 'Invalid date';
    }
};

// Memoized table row component
const SubmissionRow = memo(({ submission, onReply }) => (
    <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {submission.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <a
                href={`mailto:${submission.email}`}
                className="text-red-600 hover:text-red-700"
                aria-label={`Email ${submission.name}`}
            >
                {submission.email}
            </a>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs break-words">
            {submission.message}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span className="block">{formatTimestamp(submission.timestamp)}</span>
            <span className="text-xs text-gray-400">
                ({new Date(submission.timestamp).toTimeString().slice(9, 15)})
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
            <button
                onClick={() => onReply(submission)}
                className="flex items-center hover:text-red-700 transition-colors"
                aria-label={`Reply to ${submission.email}`}
            >
                <Mail className="w-4 h-4 mr-2" />
                <span>Reply</span>
            </button>
        </td>
    </tr>
));

const ReplyModal = ({ isOpen, onClose, submission, onSubmit }) => {
    const [replyText, setReplyText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Reset form when modal opens/closes
   useEffect(() => {
        if (isOpen) {
            setReplyText('');
            setErrorMsg('');
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg('');

        try {
            // Construct the payload with necessary data
            const payload = {
                name: submission.name,
                email: submission.email,
                admin_reply: replyText,
            };

            // POST the reply to the backend endpoint
            await axios.post(`${API_BASE_URL}/contact_reply/`, payload);

            // Optionally, you might want to show a success message or update UI accordingly
            onSubmit();
            onClose();
        } catch (error) {
            console.error('Error sending reply:', error);
            setErrorMsg('Failed to send reply. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center px-4 py-3 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Reply to {submission.name}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={submission.email}
                                        disabled
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Your Reply
                                    </label>
                                    <textarea
                                        required
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        placeholder="Type your response here..."
                                    ></textarea>
                                </div>
                                {errorMsg && (
                                    <div className="text-sm text-red-600">{errorMsg}</div>
                                )}
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
                                    >
                                        {submitting && (
                                            <svg
                                                className="animate-spin mr-2 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                ></path>
                                            </svg>
                                        )}
                                        Submit Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const AdminContactPage = () => {
    const { data: submissions, error, mutate } = useSWR(
        `${API_BASE_URL}/contact/`,
        (url) => axios.get(url).then((res) => res.data),
        {
            refreshInterval: 60000,
            revalidateOnFocus: false,
            errorRetryCount: 3,
        }
    );
  


    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);

    const openReplyModal = (submission) => {
        setCurrentSubmission(submission);
        setIsModalOpen(true);
    };

    const closeReplyModal = () => {
        setIsModalOpen(false);
        setCurrentSubmission(null);
    };

    // Optional: Callback after a successful reply to refetch data or show a toast
    const handleReplySubmit = () => {
        // e.g., mutate(); or show a success toast notification
    };
    const handleLogout = async () => {
        await axios.post('/api/admin/logout');
        window.location.href = '/admin/login';
    };
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Oheader />

            <main className="flex-grow container mx-auto px-4 mt-24 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex flex-col sm:flex-row justify-center items-center">
                    <h1 className="text-3xl font-bold flex-1 text-center text-red-600 mb-4 sm:mb-0">
                        Contact Responses
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.location.reload()}
                            aria-label="Refresh submissions"
                        >
                            <RefreshCcw className="w-5 h-5 mr-2 text-red-500" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700"
                        >
                            Logout
                        </button>
                        <Link
                            href="/"
                            className="text-red-600 hover:text-red-700 flex items-center"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                {!submissions && !error ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading submissions...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 p-4 rounded-lg text-red-700 flex items-center">
                        <X className="w-5 h-5 mr-2" />
                        Failed to fetch submissions. Please try again later.
                    </div>
                ) : (
                    <motion.div
                        className="bg-white rounded-lg shadow-xl overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Total Submissions: {submissions.length}
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                            Message
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-red-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {submissions.map((submission) => (
                                        <SubmissionRow
                                            key={submission.id}
                                            submission={submission}
                                            onReply={openReplyModal}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Reply Modal */}
                {currentSubmission && (
                    <ReplyModal
                        isOpen={isModalOpen}
                        onClose={closeReplyModal}
                        submission={currentSubmission}
                        onSubmit={handleReplySubmit}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
};

export default AdminContactPage;
