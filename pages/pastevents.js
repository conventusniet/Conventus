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
    { image: '/images/HomePage.jpg', title: 'CONVENTUS Events', subtitle: 'Engage in Global Diplomacy' },
    { image: '/images/HomePage.jpg', title: 'Upcoming Conferences', subtitle: 'Join Our International Forums' },
    { image: '/images/HomePage.jpg', title: 'Workshops and Seminars', subtitle: 'Enhance Your Diplomatic Skills' },
     { image: '/images/HomePage.jpg', title: 'Past Events', subtitle: 'Lets Revive our Past Events' },
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
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex h-104 border-2 border-red-200"
    onClick={onClick}
  >
    <div className="flex-1 p-8 flex flex-col justify-between">
      <div>
        <h3 className="text-red-800 text-3xl text-center font-semibold mb-3">{title}</h3>
        <p className="text-red-600 text-md text-center mb-3"><Calendar className="inline mr-2" size={16} />{date}</p>
        <p className="text-gray-700 text-md overflow-y-auto max-h-60 mb-3">{description}</p>
      </div>
      <button className="bg-red-600 text-white text-center px-4 py-1 rounded-lg hover:bg-red-700 transition text-lg self-center">
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
          className="absolute -top-1 right-0 text-red-600 hover:text-red-800"
          onClick={onClose}
        >
          <X size={32} />
        </button>
      <div className="text-center">
        <Image 
          src={event.image} 
          alt={event.title} 
          width={800} 
          height={400} 
          className="mx-auto mb-4 rounded-lg" 
        />
        <h2 className="text-3xl font-bold text-red-800 mb-2">{event.title}</h2>
        <p className="text-lg text-red-600 mb-4"><Calendar className="inline mr-2" size={18} />{event.date}</p>
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
      image: "/images/pstevt_1.jpg", 
      title: "Sabhyta and Silicon",
      date: "September 8th, 2024",
      description: "The Sabhyta and Silicon event by Conventus held on September 8, 2024 during Padharo Mhare Desh, was a confluence of tradition and technology, highlighting the diverse culture and rich heritage of India under the theme Digital India. The event aimed to show how digital advancements are being used to preserve and promote Indian culture, providing participants with a platform to explore and present various aspects of Indian traditions in a modern context." ,
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "15 participants from Conventus and 500+ attendees"
    },
    { 
      image: "/images/pstevt_2.jpg", 
      title: "Breaking Barriers",
      date: "October 10th, 2024",
      description: "Breaking Barriers was an event organized by the Conventus Society during Jugnu - World Mental Health Day awareness by HID Club, with a special focus on speaking disorders. The event highlighted that Conventus values not only those who are fluent speakers but also those who face challenges, promoting inclusivity for all. Whether you're a confident speaker or aspire to improve, joining Conventus is open to everyone.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "9 partcipants from Conventus, 500+ attendees"
    },
    { 
      image: "/images/pstevt_3.jpg", 
      title: "Art Binneale Stroll",
      date: "March 16th, 2024",
      description: "On 16th March 2024, 1st-year students were treated to an enriching experience at the Red Fort for the Biennale Art Exhibition and Cultural Stroll. Organized with the aim of immersing participants in India's cultural tapestry, the event provided a platform for exploration, intellectual discourse, and personal growth. Through guided tours, art exhibitions, and interactive sessions, students had the opportunity to deepen their understanding of art, history, and global perspectives.",
      location: "Red Fort, Delhi",
      duration: "1 day",
      participants: "40+ participants"
    },
    { 
      image: "/images/pstevt_4.jpg", 
      title: "Sahitya Ajtak",
      date: "November 26th, 2023",
      description: "The objective of the Sahitya Aaj Tak visit was to immerse students in the rich literary heritage of India and enhance their understanding of Indian culture. By interacting with prominent figures in literature and indie authors, poets, buerocrats and journalists, students gained valuable insights and inspiration.",
      location: "Major Dhyanchand Stadium, Delhi",
      duration: "2 days",
      participants: "50+ participants from Conventus"
    },
    { 
      image: "/images/pstevt_5.jpg", 
      title: "AMIMUN",
      date: "January 19-21, 2024",
      description: "The Amity International Model United Nations, a simulation and educational model of the United Nations, provided students with an educational platform to learn about diplomacy and international relations. Delegates, representing countries, organisations, or individuals, engaged in negotiations, conducted pre-conference research, formulated position papers, and created policy proposals. The conference culminated in debating and voting on draft resolutions, with the objective of passing them through majority votes. Conventus members partcipated in various committees including UNHRC, AIPPM, UNCSW and IP.",
      location: "Amity University Noida",
      duration: "3 days",
      participants: "15 participants from Conventus"
    },
        { 
      image: "/images/pstevt_6.jpg", 
      title: "GLBMUN",
      date: "September 26-27, 2024",
      description: "The President and Vice Presidents of the Conventus Society—Manas Gupta, Yashraj Ranjan, and Pragya Singh—were invited to judge the UNSC and AIPPM committees at the GL Bajaj MUN. This recognition underscores their expertise, skills, and experience, while also reflecting their high regards and acceptance within the Greater Noida MUN circle.",
      location: "GLBITM, Greater Noida",
      duration: "2 days",
      participants: "3 judges from Conventus"
    },
    { 
      image: "/images/pstevt_7.jpg", 
      title: "Anchoring of Various Events",
      date: "every month",
      description: "Conventus is responsible for managing and hosting most major events at NIET, including their anchoring. Over 20 members of Conventus have had the opportunity to anchor and host various events. The society believes in providing chances to newcomers and a diverse group of individuals, rather than limiting opportunities to a select few. This approach not only enhances the speaking skills of its members but also helps them overcome stage fear while fostering inclusivity and variety.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "20+ from Conventus"
    },
       { 
      image: "/images/pstevt_8.jpg", 
      title: "Concord",
      date: "September 4th, 2024",
      description: "The CONCORD event, held on 4th September 2024, was a collaborative initiative between the Hope in Darkness Club and the Conventus Society, designed to inspire students to overcome self-doubt and foster self-confidence. The focal point of the event was a powerful speech delivered by A. Laxmi Manasa, a 2nd-year student from the ECE branch, who shared her personal journey from self-doubt to self-confidence, leaving a lasting impact on the audience.",
      location: "NIET, Greater Noida",
      duration: "5 days",
      participants: "3 participants from Conventus"
    },
        { 
      image: "/images/pstevt_9.jpg", 
      title: "World Food Day",
      date: "October 16th, 2023",
      description: "Grateful for the heartwarming success of our World Food Day feeding drive, made possible through the incredible collaboration with Conventus Society, Green Gold Society and Megapixels Club and with the support and guidance of FIAPO @fiapoindia. Special acknowledgement to every dedicated member who's been instrumental in feeding not just mouths but also sowing seeds of love. Together, we're nurturing our world one meal at a time. On World Food Day, October 16th, Green Gold Society teamed up with Conventus and Megapixels for a feeding drive at Jagat Farm Market, Greater Noida, and nearby areas. Let's feed animals, share the love, and raise awareness about our furry friends.",
      location: "Jagat Farm, Greater Noida",
      duration: "1 Day",
      participants: "24"
    },
        { 
      image: "/images/pstevt_10.jpg", 
      title: "Independence Day",
      date: "August 15th, 2024",
      description: "On the occasion of Independence Day, Vice President of The Conventus society, Yashraj Ranjan, delivered a heart-touching poem that celebrated India's glorious history. The poem took the audience on a journey through India's past, starting from the Indus Valley Civilization, through the era of Mahajanapadas and great empires, to the period of British rule. The poem also emphasized India's current stature as a global powerhouse, highlighting the country's booming economy, its role as the pharmacy of the world, advancements in the tech industry, and leadership in the spices industry. Yashraj urged everyone to remember the bravery of the unsung heroes whose legacy continues to inspire the nation",
      location: "NIET , Greater Noida",
      duration: "1 Day",
      participants: "2"
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
