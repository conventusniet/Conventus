import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import ConventusChatbot from '@/components/ConventusChatBot';
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/conventus_events.jpg', title: 'CONVENTUS Events', subtitle: 'Engage in Global Diplomacy' },
    { image: '/images/upcoming_conferences.JPG', title: 'Upcoming Conferences', subtitle: 'Join Our International Forums' },
    { image: '/images/workshopsand_seminars.JPG', title: 'Workshops and Seminars', subtitle: 'Enhance Your Diplomatic Skills' },
    { image: '/images/pastevents.jpg', title: 'Past Events', subtitle: 'Lets Revive our Past Events' },
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
      image: "/images/upcevt_1.jpg", 
      title: "Annual Debate Competition",
      date: "November 21-22, 2024",
      description: "The Conventus Club is thrilled to host its Annual Debate Competition, featuring themed debates,   group discussions, and JAM (Just A Minute) sessions. Participants will have the opportunity to showcase their speaking skills, express views on current issues, and engage in lively discussions. This event promises to be a platform for debate, collaboration, and quick thinking!",
      location: "Plot 19 campus NIET, Greater Noida",
      duration: "2 days",
      participants: "NA"
    },
    { 
      image: "/images/upcevt_2.jpg", 
      title: "NIET MUN 2.0",
      date: "February 2025",
      description: "The Conventus Club proudly announces the second edition of the NIET Model United Nations (MUN) conference, scheduled for February 2025. Building on the success of its inaugural edition, NIET MUN 2.0 promises to be even more dynamic and intellectually stimulating, bringing together over 200 participants from diverse backgrounds. Delegates will engage in diplomatic debates, tackling global challenges through a range of committees, including the United Nations Security Council (UNSC), the All India Political Parties Meet (AIPPM) and more. Participants will have the opportunity to enhance their public speaking, negotiation, and problem-solving skills while contributing to resolutions on critical international and national issues. Join us at NIET MUN 2.0 and be part of an event that shapes tomorrow’s leaders and diplomats",
      location: "NIET, Greater Noida",
      duration: "2 days",
      participants: "NA"
    },
    { 
      image: "/images/upcevt_3.jpg", 
      title: "Sahitya Ajtak",
      date: "November 23-24, 2024",
      description: "The Conventus Society is organizing an exciting trip to the renowned Sahitya Aaj Tak event at Major Dhyan Chand Stadium, Delhi, from November 22 to 24. This annual literary and cultural festival is a grand celebration of India's rich heritage in literature, art, and entertainment. For six years, it has drawn literature enthusiasts and artists alike, becoming a key attraction for lovers of Indian languages, art, and culture. Attendees will have the opportunity to immerse themselves in a vibrant atmosphere filled with engaging sessions, discussions, and performances, showcasing the brilliance of India's literary and artistic traditions. Join us for an unforgettable experience of creativity, culture, and learning!",
      location: "Major Dhyanchand Stadium, Delhi",
      duration: "2 days",
      participants: "NA"
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
        <ConventusChatbot/>
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
