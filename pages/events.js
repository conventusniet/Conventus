import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ChevronLeft, ChevronRight, Search, Calendar } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/coll1.png', title: 'CONVENTUS Events', subtitle: 'Engage in Global Diplomacy' },
    { image: '/images/coll2.png', title: 'Upcoming Conferences', subtitle: 'Join Our International Forums' },
    { image: '/images/coll3.png', title: 'Workshops and Seminars', subtitle: 'Enhance Your Diplomatic Skills' },
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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-xl">{slide.subtitle}</p>
          </div>
        </motion.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

const EventCard = ({ image, title, date, description, onClick }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105"
    onClick={onClick}
  >
    <div className="relative h-48 w-full">
      <Image 
        src={image} 
        alt={title} 
        layout="fill" 
        objectFit="cover" 
      />
    </div>
    <div className="p-6">
      <h3 className="text-gray-800 text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2"><Calendar className="inline mr-2" size={16} />{date}</p>
      <p className="text-gray-600 text-md">{description.slice(0, 100)}...</p>
    </div>
  </motion.div>
);

const EventDetails = ({ event, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 bg-white z-50 overflow-y-auto p-4"
  >
    <div className="max-w-2xl mx-auto relative bg-gray-100 p-6 rounded-lg shadow-lg">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="text-center">
        <Image 
          src={event.image} 
          alt={event.title} 
          width={400} 
          height={200} 
          className="mx-auto mb-4 rounded-lg" 
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
        <p className="text-md text-gray-600 mb-4"><Calendar className="inline mr-2" size={18} />{event.date}</p>
        <p className="text-md text-gray-700 mb-4">{event.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Details</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Location: {event.location}</li>
          <li>Duration: {event.duration}</li>
          <li>Participants: {event.participants}</li>
        </ul>
      </div>
      <div className="text-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => alert(`You have registered for ${event.title}!`)}
        >
          Register Now
        </button>
      </div>
    </div>
  </motion.div>
);

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    { 
      image: "/images/coll4.png", 
      title: "Global Youth Summit",
      date: "August 15-17, 2023",
      description: "Join young leaders from around the world to discuss pressing global issues and develop innovative solutions.",
      location: "New York City, USA",
      duration: "3 days",
      participants: "500+ youth delegates"
    },
    { 
      image: "/images/coll5.png", 
      title: "Climate Action Conference",
      date: "September 22-24, 2023",
      description: "A platform for environmental experts, policymakers, and activists to address climate change challenges.",
      location: "Paris, France",
      duration: "3 days",
      participants: "1000+ attendees"
    },
    { 
      image: "/images/coll6.png", 
      title: "Diplomatic Skills Workshop",
      date: "October 5, 2023",
      description: "Enhance your negotiation and public speaking skills in this intensive one-day workshop.",
      location: "Online",
      duration: "1 day",
      participants: "Limited to 100 participants"
    },
    { 
      image: "/images/coll7.png", 
      title: "International Peace Symposium",
      date: "November 11-12, 2023",
      description: "Explore strategies for conflict resolution and peacebuilding in this two-day symposium.",
      location: "Geneva, Switzerland",
      duration: "2 days",
      participants: "300+ diplomats and peace advocates"
    },
    { 
      image: "/images/coll8.png", 
      title: "Sustainable Development Goals Forum",
      date: "January 20-22, 2024",
      description: "Discuss progress and challenges in achieving the UN Sustainable Development Goals.",
      location: "Tokyo, Japan",
      duration: "3 days",
      participants: "800+ global leaders and experts"
    },
    { 
      image: "/images/coll1.png", 
      title: "Model United Nations Conference",
      date: "March 15-18, 2024",
      description: "Simulate UN committees and debate global issues in this four-day conference for students.",
      location: "London, UK",
      duration: "4 days",
      participants: "1500+ student delegates"
    },
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Upcoming Events
        </h1>
        <p className="text-lg text-center mb-8 text-gray-600">
          Discover and participate in our global events addressing crucial international issues
        </p>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute top-4 right-4 text-gray-400" size={24} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard 
              key={index}
              image={event.image}
              title={event.title}
              date={event.date}
              description={event.description}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedEvent && (
          <EventDetails 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
