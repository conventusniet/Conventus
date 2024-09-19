import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src={slide.image} 
            alt={slide.title} 
            layout="fill" 
            objectFit="cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">{slide.title}</h1>
            <p className="text-xl md:text-2xl text-center">{slide.subtitle}</p>
          </div>
        </motion.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={32} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

const CommitteeCard = ({ logo, title, description, onClick }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <div className="relative h-48 w-full">
      <Image 
        src={logo} 
        alt={title} 
        layout="fill" 
        objectFit="cover" 
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description.slice(0, 100)}...</p>
    </div>
  </motion.div>
);

const CommitteeDetails = ({ committee, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{committee.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <Image 
          src={committee.logo} 
          alt={committee.title} 
          width={100} 
          height={100} 
          className="mx-auto mb-4 rounded-full" 
        />
        <p className="text-gray-600 mb-4">{committee.description}</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Committee Objectives</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {committee.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Expected Outcomes</h3>
        <p className="text-gray-600">{committee.expectedOutcomes}</p>
      </div>
    </motion.div>
  </motion.div>
);

const CommitteesPage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState(null);

  const slides = [
    { image: '/images/coll1.png', title: 'CONVENTUS', subtitle: 'Shaping the Future of Global Diplomacy' },
    { image: '/images/coll2.png', title: 'Join Our Committees', subtitle: 'Engage in Meaningful Discussions' },
    { image: '/images/coll3.png', title: 'Make a Difference', subtitle: 'Address Global Challenges Together' },
  ];

  const committees = [
    // ... (previous committee data remains the same)
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeroCarousel slides={slides} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Committees
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {committees.map((committee, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <CommitteeCard 
                logo={committee.logo}
                title={committee.title}
                description={committee.description}
                onClick={() => setSelectedCommittee(committee)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedCommittee && (
          <CommitteeDetails 
            committee={selectedCommittee} 
            onClose={() => setSelectedCommittee(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommitteesPage;
