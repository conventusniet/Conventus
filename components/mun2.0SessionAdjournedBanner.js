import { motion } from 'framer-motion';

const SessionAdjournedBanner = () => {
  return (
    <motion.div 
      className="bg-white py-8 px-4 rounded-lg shadow-md my-8 max-w-4xl mx-auto border-l-4 border-red-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-red-800">
        Session Adjourned
      </h2>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-1 bg-red-800"></div>
      </div>
      <p className="text-lg text-gray-700 text-center mb-4">
        The CMUN 2025 proceedings have officially concluded. The Secretariat thanks all delegations for their diplomatic contributions.
      </p>
      <p className="text-md text-gray-600 text-center">
        Conference outcomes and passed resolutions have been archived.
      </p>
    </motion.div>
  );
};

export default SessionAdjournedBanner;