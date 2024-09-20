import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ChevronRight, ExternalLink } from 'lucide-react';

const HeroSection = () => (
  <div className="relative h-[60vh] overflow-hidden">
    <Image 
      src="/images/coll1.png" 
      alt="CONVENTUS More" 
      layout="fill" 
      style={{ objectFit: 'cover' }} 
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-2">Explore More with CONVENTUS</h1>
      <p className="text-xl">Discover Resources, Opportunities, and Insights</p>
    </div>
  </div>
);

const ResourceCard = ({ icon, title, description, link, onClick }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105"
    onClick={onClick}
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-gray-800 text-xl font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-gray-600 text-md mb-4">{description}</p>
      <a href={link} className="text-blue-600 hover:text-blue-800 flex items-center" target="_blank" rel="noopener noreferrer">
        Learn More <ExternalLink size={16} className="ml-1" />
      </a>
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
    <div className="max-w-2xl mx-auto relative bg-gray-100 p-6 rounded-lg shadow-lg">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="text-center mb-6">
        {resource.icon}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{resource.title}</h2>
      </div>
      <div className="mb-6">
        <p className="text-md text-gray-700">{resource.fullDescription}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700">
          {resource.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center"
        >
          Access Resource <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </div>
  </motion.div>
);

const MorePage = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    { 
      icon: <Image src="/images/coll4.png" alt="Research Database" width={40} height={40} />,
      title: "Research Database",
      description: "Access a comprehensive collection of diplomatic research and policy papers.",
      fullDescription: "Our Research Database is a treasure trove of diplomatic knowledge, featuring peer-reviewed articles, policy briefs, and in-depth analyses from leading experts in international relations and global politics.",
      features: [
        "Thousands of searchable documents",
        "Regular updates with latest research",
        "Categorized by topics and regions",
        "Downloadable PDFs for offline reading"
      ],
      link: "https://example.com/research-database"
    },
    { 
      icon: <Image src="/images/coll5.png" alt="Online Courses" width={40} height={40} />,
      title: "Online Courses",
      description: "Enhance your diplomatic skills with our curated online courses.",
      fullDescription: "Our Online Courses platform offers a wide range of learning opportunities designed to boost your understanding of international relations, diplomacy, and global issues. From beginner to advanced levels, there's something for everyone.",
      features: [
        "Self-paced learning modules",
        "Interactive quizzes and assignments",
        "Expert-led video lectures",
        "Certificates upon completion"
      ],
      link: "https://example.com/online-courses"
    },
    { 
      icon: <Image src="/images/coll6.png" alt="Networking Platform" width={40} height={40} />,
      title: "Networking Platform",
      description: "Connect with fellow diplomats and international relations professionals.",
      fullDescription: "Our Networking Platform is designed to foster connections among diplomats, policy makers, and international relations professionals from around the world. Build your professional network, share insights, and collaborate on global initiatives.",
      features: [
        "Professional profiles and messaging",
        "Discussion forums on current global issues",
        "Job board for diplomatic and IR positions",
        "Virtual networking events"
      ],
      link: "https://example.com/networking"
    },
    { 
      icon: <Image src="/images/coll7.png" alt="Publication Opportunities" width={40} height={40} />,
      title: "Publication Opportunities",
      description: "Submit your research and articles for publication in our journal.",
      fullDescription: "CONVENTUS offers various publication opportunities for researchers, diplomats, and students in the field of international relations. Get your work recognized and contribute to the global dialogue on pressing issues.",
      features: [
        "Peer-reviewed journal submissions",
        "Blog post contributions",
        "Policy brief publications",
        "Annual essay competitions"
      ],
      link: "https://example.com/publications"
    },
    { 
      icon: <Image src="/images/coll8.png" alt="Mentorship Program" width={40} height={40} />,
      title: "Mentorship Program",
      description: "Get guidance from experienced diplomats and international experts.",
      fullDescription: "Our Mentorship Program pairs aspiring diplomats and international relations students with seasoned professionals in the field. Gain invaluable insights, career advice, and personal growth opportunities through one-on-one mentoring relationships.",
      features: [
        "Personalized mentor matching",
        "Regular mentoring sessions",
        "Career development workshops",
        "Networking opportunities with mentors"
      ],
      link: "https://example.com/mentorship"
    },
    { 
      icon: <Image src="/images/coll1.png" alt="Diplomatic Simulations" width={40} height={40} />,
      title: "Diplomatic Simulations",
      description: "Participate in realistic diplomatic scenarios and crisis simulations.",
      fullDescription: "Experience the challenges and complexities of international diplomacy through our immersive Diplomatic Simulations. These realistic scenarios put your negotiation, problem-solving, and decision-making skills to the test in a safe, educational environment.",
      features: [
        "Real-time crisis management exercises",
        "Multi-party negotiation simulations",
        "Historical and hypothetical scenarios",
        "Debriefing and feedback sessions"
      ],
      link: "https://example.com/simulations"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <HeroSection />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Additional Resources
        </h1>
        <p className="text-lg text-center mb-8 text-gray-600">
          Explore our range of resources to enhance your diplomatic knowledge and skills
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard 
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              link={resource.link}
              onClick={() => setSelectedResource(resource)}
            />
          ))}
        </div>
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

export default MorePage;
