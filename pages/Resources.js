import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, Book, Globe, Video, Download } from 'lucide-react';
import ConventusChatbot from '@/components/ConventusChatBot';
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/coll1.png', title: 'Diplomatic Resources', subtitle: 'Empowering Future Global Leaders' },
    { image: '/images/coll2.png', title: 'Essential Materials', subtitle: 'Curated Content for Aspiring Diplomats' },
    { image: '/images/coll3.png', title: 'Expert Insights', subtitle: 'Learn from Experienced Diplomats' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[60vh] overflow-hidden">
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
            style={{ objectFit: 'cover' }} 
          />
          <div className="absolute inset-0 bg-red-900 bg-opacity-70 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-xl">{slide.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ResourceCard = ({ icon, title, description, onClick }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105 flex flex-col h-64 border-2 border-red-200"
    onClick={onClick}
  >
    <div className="bg-red-600 p-4 text-white">
      {icon}
    </div>
    <div className="p-6 flex-grow">
      <h3 className="text-red-800 text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </motion.div>
);

const ResourceDetails = ({ resource, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 bg-white z-50 overflow-y-auto p-4"
  >
    <div className="max-w-2xl mx-auto relative bg-red-50 p-6 rounded-lg shadow-lg border-2 border-red-200">
      <button
        className="absolute top-4 right-4 text-red-600 hover:text-red-800"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="text-center">
        <div className="text-red-600 mb-4">
          {resource.icon}
        </div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">{resource.title}</h2>
        <p className="text-md text-gray-700 mb-4">{resource.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Resource Details</h3>
        <ul className="list-disc list-inside text-gray-700">
          {resource.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          onClick={() => alert(`Accessing ${resource.title}!`)}
        >
          Access Resource
        </button>
      </div>
    </div>
  </motion.div>
);

const DiplomaticResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    { 
      icon: <Book size={48} />,
      title: "Essential Readings",
      description: "Curated list of books and articles on diplomacy and international relations.",
      details: [
        "Classical texts on diplomacy",
        "Contemporary foreign policy analysis",
        "Case studies of successful negotiations"
      ],
      image: "/images/Resources BG.jpg"
    },
    { 
      icon: <Globe size={48} />,
      title: "Language Learning",
      description: "Resources for mastering languages crucial for diplomatic careers.",
      details: [
        "UN official languages courses",
        "Cultural context and etiquette",
        "Diplomatic terminology guides"
      ],
      image: "/images/Resources BG.jpg"
    },
    { 
      icon: <Video size={48} />,
      title: "Video Lectures",
      description: "Exclusive talks by experienced diplomats and foreign policy experts.",
      details: [
        "Negotiation strategies and tactics",
        "Protocol and etiquette in diplomacy",
        "Crisis management simulations"
      ],
      image: "/images/Resources BG.jpg"
    },
    { 
      icon: <Download size={48} />,
      title: "Downloadable Guides",
      description: "Practical handbooks and checklists for aspiring diplomats.",
      details: [
        "Preparing for diplomatic service exams",
        "Writing effective diplomatic cables",
        "Public speaking for diplomats"
      ],
      image: "/images/Resources BG.jpg"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-red-800">
          Explore Our Resources
        </h2>
        <p className="text-xl text-center mb-12 text-red-600">
          Enhance your diplomatic skills with our comprehensive collection of resources
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard 
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              onClick={() => setSelectedResource(resource)}
            />
          ))}
        </div>
        <ConventusChatbot/>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedResource && (
          <ResourceDetails 
            resource={selectedResource} 
            onClose={() => setSelectedResource(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiplomaticResourcesPage;
