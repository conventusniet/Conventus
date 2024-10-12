import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const DussehraGreeting = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const audio = new Audio('/Music/Jai Shree Ram Ringtone Download Mp3 - MobCup.Com.Co.mp3');
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(onClose, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-3xl bg-blue-900 rounded-lg shadow-2xl overflow-hidden"
            style={{ height: '80vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors z-20 p-2"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-orange-500"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)' }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-yellow-400 to-orange-500"
              style={{ clipPath: 'polygon(0 25%, 100% 0%, 100% 100%, 0 100%)' }}
            />
            <div className="relative z-10 p-8 h-full flex items-center justify-center">
              <img
                src="/images/Dussehra Instagram Post.png"
                alt="Happy Dussehra"
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DussehraGreeting;
