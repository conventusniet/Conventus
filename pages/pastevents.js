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
      title: "Sabhyta and Silicon",
      date: "September 8th, 2024",
      description: "The Sabhyta and Silicon event by Conventus held on September 8, 2024, was a confluence of tradition and technology, highlighting the diverse culture and rich heritage of India under the theme Digital India. The event aimed to show how digital advancements are being used to preserve and promote Indian culture, providing participants with a platform to explore and present various aspects of Indian traditions in a modern context." ,
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "15 participants from Conventus and 500+ attendees"
    },
    { 
      image: "/images/coll5.png", 
      title: "Breaking Barriers",
      date: "October 10th, 2024",
      description: "Breaking Barriers was an event organized in collaboration between the HID Club and the Conventus Society on World Mental Health Day to raise awareness about mental health issues, with a special focus on speaking disorders. The event highlighted that Conventus values not only those who are fluent speakers but also those who face challenges, promoting inclusivity for all. Whether you're a confident speaker or aspire to improve, joining Conventus is open to everyone.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "9 partcipants from Conventus, 500+ attendees"
    },
    { 
      image: "/images/coll6.png", 
      title: "Art Binneale Stroll",
      date: "March 16th, 2024",
      description: "On 16th March 2024, 1st-year students were treated to an enriching experience at the Red Fort for the Biennale Art Exhibition and Cultural Stroll. Organized with the aim of immersing participants in India's cultural tapestry, the event provided a platform for exploration, intellectual discourse, and personal growth. Through guided tours, art exhibitions, and interactive sessions, students had the opportunity to deepen their understanding of art, history, and global perspectives.",
      location: "Red Fort, Delhi",
      duration: "1 day",
      participants: "40+ participants"
    },
    { 
      image: "/images/coll7.png", 
      title: "Sahitya Ajtak",
      date: "November 26th, 2023",
      description: "The objective of the Sahitya Aaj Tak visit was to immerse students in the rich literary heritage of India and enhance their understanding of Indian culture. By interacting with prominent figures in literature and indie authors, poets, buerocrats and journalists, students gained valuable insights and inspiration.",
      location: "Major Dhyanchand Stadium, Delhi",
      duration: "2 days",
      participants: "50+ participants from Conventus"
    },
    { 
      image: "/images/amimunteam.JPG", 
      title: "AMIMUN",
      date: "January 19-21, 2024",
      description: "The Amity International Model United Nations, a simulation and educational model of the United Nations, provided students with an educational platform to learn about diplomacy and international relations. Delegates, representing countries, organisations, or individuals, engaged in negotiations, conducted pre-conference research, formulated position papers, and created policy proposals. The conference culminated in debating and voting on draft resolutions, with the objective of passing them through majority votes. Conventus members partcipated in various committees including UNHRC, AIPPM, UNCSW and IP.",
      location: "Amity University Noida",
      duration: "3 days",
      participants: "15 participants from Conventus"
    },
    { 
      image: "/images/coll1.png", 
      title: "Anchoring of Various Events",
      date: "every month",
      description: "Conventus is responsible for managing and hosting most major events at NIET, including their anchoring. Over 20 members of Conventus have had the opportunity to anchor and host various events. The society believes in providing chances to newcomers and a diverse group of individuals, rather than limiting opportunities to a select few. This approach not only enhances the speaking skills of its members but also helps them overcome stage fear while fostering inclusivity and variety.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "20+ from Conventus"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-8 text-red-800">
          Past Events
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
