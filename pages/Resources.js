import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, BookOpen, Globe, GraduationCap, FileText } from 'lucide-react';
import ConventusChatbot from '@/components/ConventusChatBot';
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/Resources BG.jpg', title: 'Diplomatic Resources', subtitle: 'Empowering Future Global Leaders' },
    { image: '/images/Resources BG.jpg', title: 'Essential Materials', subtitle: 'Curated Content for Aspiring Diplomats' },
    { image: '/images/Resources BG.jpg', title: 'Expert Insights', subtitle: 'Learn from Experienced Diplomats' },
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

const ResourceCard = ({ icon, title, description, files }) => {
  let categorizedFiles = [];
  let currentCategory = "General";  // Default category if no division is specified
  let currentFiles = [];

  // Categorize files by detecting divisions
  files.forEach((file) => {
    if (file.startsWith("#division ")) {
      // Push previous group with the current category
      if (currentFiles.length > 0) {
        categorizedFiles.push({ category: currentCategory, files: currentFiles });
        currentFiles = [];
      }

      // Set the new category name by extracting it from the #division tag
      currentCategory = file.replace("#division ", "").replace(/'/g, "").trim();
    } else {
      currentFiles.push(file);
    }
  });

  // Push the last group
  if (currentFiles.length > 0) {
    categorizedFiles.push({ category: currentCategory, files: currentFiles });
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform flex flex-col border-2 border-red-150"
    >
      <div className="bg-red-600 p-4 text-white flex justify-center">
        {icon}
      </div>
      <div className="p-6 flex-grow">
        <h2 className="text-red-800 text-xl font-semibold mb-2 text-center" >{title}</h2>
        <p className="text-gray-700 text-center">{description}</p>

        <div className="max-h-52 overflow-y-auto pr-2 pb-8 pt-4">
          {categorizedFiles.map((group, index) => (
            <div key={index} className="mb-4">
              {/* Display the Category Title */}
              <h4 className="text-red-700 font-semibold text-lg mb-2 text-center">{group.category}</h4>
              
              <ul className="list-disc list-inside text-gray-700 pl-4">
                {group.files.map((file, fileIndex) => (
                  <li key={fileIndex}>
                    <a href={file} download className="text-red-600 hover:underline">
                      {file.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Add separator unless it's the last section */}
              {index !== categorizedFiles.length - 1 && (
                <hr className="border-t-2 border-gray-300 my-3" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};



// const ResourceDetails = ({ resource, onClose }) => (
//   <motion.div 
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     exit={{ opacity: 0, scale: 0.9 }}
//     className="fixed inset-0 bg-white z-50 overflow-y-auto p-4"
//   >
//     <div className="max-w-2xl mx-auto relative bg-red-50 p-6 rounded-lg shadow-lg border-2 border-red-200">
//       <button
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800"
//         onClick={onClose}
//       >
//         <X size={24} />
//       </button>
//       <div className="text-center">
//         <div className="text-red-600 mb-4">
//           {resource.icon}
//         </div>
//         <h2 className="text-2xl font-bold text-red-800 mb-2">{resource.title}</h2>
//         <p className="text-md text-gray-700 mb-4">{resource.description}</p>
//       </div>
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold text-red-800 mb-2">Resource Details</h3>
//         <ul className="list-disc list-inside text-gray-700">
//           {resource.details.map((detail, index) => (
//             <li key={index}>{detail}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="text-center">
//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//           onClick={() => alert(`Accessing ${resource.title}!`)}
//         >
//           Access Resource
//         </button>
//       </div>
//     </div>
//   </motion.div>
// );

const DiplomaticResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    { 
        icon: <BookOpen size={48} />,
        title: "Background Guides",
        description: "Comprehensive resources on key diplomatic topics and policies.",
        details: [
            "Classical texts on diplomacy",
            "Contemporary foreign policy analysis",
            "Case studies of successful negotiations"
        ],
        image: "/images/Resources BG.jpg",
        files: [
            "/BGs/BGs/UNHRC_BG.pdf",
            "/BGs/BGs/UNSC_BG.pdf",
            "/BGs/BGs/AIPPM_BG.pdf"
        ]
    },
    { 
        icon: <Globe size={48} />,
        title: "Rules of Procedure",
        description: "Fundamental rules of procedure for diplomatic simulations.",
        details: [
            "UN official languages courses",
            "Cultural context and etiquette",
            "Diplomatic terminology guides"
        ],
        image: "/images/Resources BG.jpg",
        files: [
            "/Basics - ROPs/Basics - ROPs/Delegate_Handbook.pdf",
            "/Basics - ROPs/Basics - ROPs/Guide to UN Committees.pdf",
            "/Basics - ROPs/Basics - ROPs/Rules_of_Parliamentary_procedure.pdf",
        ]
    },
    { 
        icon: <GraduationCap size={48} />,
        title: "Debating & Research",
        description: "Enhance argumentation and analytical skills for diplomacy.",
        details: [
            "Negotiation strategies and tactics",
            "Protocol and etiquette in diplomacy",
            "Crisis management simulations"
        ],
        image: "/images/Resources BG.jpg",
        files: [
            "#division 'Debating'", 
            "/Debating & Research/Debating & Research/Debating/Argumentation.pdf",
            "/Debating & Research/Debating & Research/Debating/Caucusing.pdf",
            "/Debating & Research/Debating & Research/Debating/Mod-Coc-Tips.jpg",
            "/Debating & Research/Debating & Research/Debating/MUN_Vocabulary.pdf",
            "/Debating & Research/Debating & Research/Debating/Points of Order Explained.pdf",
            "#division 'Researching'",
            "/Debating & Research/Debating & Research/Researching/Basic-Research-Guide.pdf",
            "/Debating & Research/Debating & Research/Researching/how-to-Research.pdf",
            "/Debating & Research/Debating & Research/Researching/Minor-Tips.jpg",
            "/Debating & Research/Debating & Research/Researching/Reasearch-Binder.pdf",
            
        ]
    },
    { 
        icon: <FileText size={48} />,
        title: "Documentation",
        description: "Essential resources for diplomatic references and reports.",
        details: [
            "Preparing for diplomatic service exams",
            "Writing effective diplomatic cables",
            "Public speaking for diplomats"
        ],
        image: "/images/Resources BG.jpg",
        files: [
          "#division 'Draft Resolution'",
          "/Documentation/Documentation/Draft Resolution/Resolution Phrases_.pdf",
          "/Documentation/Documentation/Draft Resolution/sample_dr.pdf",
          "/Documentation/Documentation/Draft Resolution/writing-guide.pdf",
          "#division 'Position Paper'",
          "/Documentation/Documentation/Position Paper/Sample_Position_Paper.pdf",
          "/Documentation/Documentation/Position Paper/winning_PP.pdf",
          "#division 'Working Paper'",
          "/Documentation/Documentation/Working Paper/Preambulatory and Operative Clauses 2020.pdf",
          "/Documentation/Documentation/Working Paper/Sample Working Paper.pdf",
          "/Documentation/Documentation/Working Paper/Sample-Working-Papers-1.pdf"
            
        ]
    }
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
              files={resource.files}
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
