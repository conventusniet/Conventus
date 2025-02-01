import React, { memo } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X, Mail, RefreshCcw } from 'lucide-react';
import Oheader from '@/components/OHeader';
import Footer from '@/components/Footer';
import Link from 'next/link';

const API_BASE_URL = 'https://conventus.pythonanywhere.com/api';

// Define a fetcher function for SWR
const fetcher = url => axios.get(url).then(res => res.data);

// Memoized table row for performance
const SubmissionRow = memo(({ submission, onReply }) => (
  <tr key={submission.id}>
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
      {new Date(submission.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
      <button
        onClick={() => onReply(submission.email)}
        className="flex items-center hover:text-red-700 transition-colors"
        aria-label={`Reply to ${submission.email}`}
      >
        <Mail className="w-4 h-4 mr-2" />
        <span>Reply</span>
      </button>
    </td>
  </tr>
));

const AdminContactPage = () => {
  const { data: submissions, error, mutate } = useSWR(
    `${API_BASE_URL}/contact/`,
    fetcher,
    { refreshInterval: 60000 } // Optional: auto-refresh every minute
  );

  const handleReply = (email) => {
    window.location.href = `mailto:${email}?subject=Re: Your Contact Submission to Conventus`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Oheader />

      <main className="flex-grow container mx-auto px-4 mt-24 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center">
          <h1 className="text-3xl font-bold flex-1 text-center text-red-600 mb-4 sm:mb-0">
            Contact Submissions
          </h1>
          <div className="flex items-center space-x-4">
            <button
              // onClick={() => mutate()}
              onClick={() => window.location.reload()}
              
            >
              <RefreshCcw className="w-5 h-5 mr-2 text-red-600" />
       
            </button>
            <Link
              href="/"
              className="text-red-600 hover:text-red-700 flex items-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {(!submissions && !error) ? (
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
                      Date
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
                      onReply={handleReply}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminContactPage;
