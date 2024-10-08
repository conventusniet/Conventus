import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

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
          <div className="absolute inset-0 bg-red-900 bg-opacity-70 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-xl">{slide.subtitle}</p>
          </div>
        </motion.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

const EventCard = ({ image, title, date, description, onClick }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105 flex h-80 border-2 border-red-200"
    onClick={onClick}
  >
    <div className="flex-1 p-8 flex flex-col justify-between">
      <div>
        <h3 className="text-red-800 text-3xl font-semibold mb-3">{title}</h3>
        <p className="text-red-600 text-lg mb-3"><Calendar className="inline mr-2" size={20} />{date}</p>
        <p className="text-gray-700 text-xl">{description}</p>
      </div>
      <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-lg self-start">
        Learn More
      </button>
    </div>
    <div className="relative h-auto w-2/5">
      <Image 
        src={image} 
        alt={title} 
        layout="fill" 
        objectFit="cover" 
      />
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
    <div className="max-w-2xl mx-auto relative bg-red-50 p-6 rounded-lg shadow-lg border-2 border-red-200">
      <button
        className="absolute top-4 right-4 text-red-600 hover:text-red-800"
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
        <h2 className="text-2xl font-bold text-red-800 mb-2">{event.title}</h2>
        <p className="text-md text-red-600 mb-4"><Calendar className="inline mr-2" size={18} />{event.date}</p>
        <p className="text-md text-gray-700 mb-4">{event.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Event Details</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Location: {event.location}</li>
          <li>Duration: {event.duration}</li>
          <li>Participants: {event.participants}</li>
        </ul>
      </div>
      <div className="text-center">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-8 text-red-800">
          Upcoming Events
        </h1>
        <p className="text-xl text-center mb-12 text-red-600">
          Discover and participate in our global events addressing crucial international issues
        </p>

        <div className="space-y-12">
          {events.map((event, index) => (
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
