'use client'

import { useState, useEffect,useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { image: '/images/munc1.jpg', title: 'NEGATIO', subtitle: 'Make Negotiations' },
    { image: '/images/munc3.jpg', title: 'SOLUTIO', subtitle: 'Discover Solutions' },
    { image: '/images/munc2.jpg', title: 'ACTIO', subtitle: 'Implement Action' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

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
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-xl">{slide.subtitle}</p>
          </div>
        </motion.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  )
}

const MediaGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    '/images/mungallery (1).jpg', '/images/mungallery (2).jpg', '/images/mungallery (3).jpg', '/images/mungallery (4).jpg',
    '/images/mungallery (5).jpg', '/images/mungallery (6).jpg', '/images/mungallery (7).jpg', '/images/mungallery (8).jpg',
    '/images/mungallery (9).jpg', '/images/mungallery (10).jpg', '/images/mungallery (11).jpg', '/images/mungallery (12).jpg',
    '/images/mungallery (13).jpg', '/images/mungallery (14).jpg', '/images/mungallery (15).jpg', '/images/mungallery (16).jpg',
  ];

  const renderImage = (index, className) => (
    <motion.div
      key={index}
      className={`relative overflow-hidden rounded-lg cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedImage(images[index])}
    >
      <Image
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </motion.div>
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-4">
        {/* First row */}
        {renderImage(0, "col-span-1 row-span-2 h-[400px]")}
        {renderImage(1, "col-span-1 h-[200px]")}
        {renderImage(2, "col-span-1 h-[200px]")}
        {renderImage(3, "col-span-1 row-span-2 h-[400px]")}

        {/* Second row */}
        {renderImage(4, "col-span-1 h-[200px]")}
        {renderImage(5, "col-span-1 h-[200px]")}

        {/* Third row */}
        {renderImage(6, "col-span-1 row-span-2 h-[400px]")}
        {renderImage(7, "col-span-1 h-[200px]")}
        {renderImage(8, "col-span-1 h-[200px]")}
        {renderImage(9, "col-span-1 row-span-2 h-[400px]")}

        {/* Fourth row */}
        {renderImage(10, "col-span-1 h-[200px]")}
        {renderImage(11, "col-span-1 h-[200px]")}

        {/* Fifth row */}
        {renderImage(12, "col-span-1 h-[200px]")}
        {renderImage(13, "col-span-1 h-[200px]")}
        {renderImage(14, "col-span-1 h-[200px]")}
        {renderImage(15, "col-span-1 h-[200px]")}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-screen bg-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              layoutId={selectedImage}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Selected image"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <motion.button
                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const WinnerCard = ({ images, committee, winners }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 3000) // Change image every 3 seconds
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isHovering, images.length])

  const nextImage = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
    }),
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        className="relative h-64 w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
            style={{ perspective: '1000px' }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Winner from ${committee}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </AnimatePresence>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 transition-opacity opacity-0 hover:opacity-100 z-10"
          onClick={prevImage}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 transition-opacity opacity-0 hover:opacity-100 z-10"
          onClick={nextImage}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="bg-white p-4">
        <p className="text-center text-lg font-semibold text-red-800 mb-2">{committee}</p>
        <ul className="text-sm text-red-600">
          {winners.map((winner, index) => (
            <li key={index} className="mb-1">{winner}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}



const WinnersSection = () => (
  <div className="bg-red-100 py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-800">MUN Winners</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <WinnerCard
          images={['/images/unsc1.jpg', '/images/unsc2.jpg', '/images/unsc3.jpg']}
          committee="UNSC"
          winners={[
            "Best Delegate: Hariom Tiwari",
            "High Commendation: Daksh Sharma",
            "Special Mention: Sahil Saw"
          ]}
        />
        <WinnerCard
          images={['/images/uncsw1.jpg', '/images/uncsw2.jpg', '/images/uncsw3.jpg']}
          committee="UNCSW"
          winners={[
            "Best Delegate: Pragya Singh",
            "High Commendation: Shrasti Bhatnagar",
            "Special Mention: Shagun Mishra"
          ]}
        />
        <WinnerCard
          images={['/images/aippm1.jpg', '/images/aippm2.jpg', '/images/aippm3.jpg']}
          committee="AIPPM"
          winners={[
            "Best Delegate: Sujal Arora",
            "High Commendation: Suraj Kumar",
            "Special Mention: Apurv Krishna"
          ]}
        />
      </div>
    </div>
  </div>
)


const TeamMember = ({ name, role, image, bio }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-64 h-80 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm">{role}</p>
          </div>
        </div>
        <div
          className="absolute w-full h-full backface-hidden bg-red-100 rounded-lg p-4 flex flex-col justify-center items-center text-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-sm">{bio}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function CommitteesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="my-8">
          <Image
            src="/images/mun-main.JPG"
            alt="source"
            width={1200}
            height={300} // Reduced height from 400 to 300
            layout="responsive"
            className="rounded-lg"
          />
        </div>

        <div className="my-8 space-y-1">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center" style={{ color: '#800000' }}>Model United Nations</h1>
          {/* Subheadings */}
          <h2 className="text-3xl font-semibold text-center text-red-500">1st Edition</h2>
          <h3 className="text-2xl font-semibold text-center text-red-500">2023-24</h3>
          <p className="text-lg text-gray-700">
            The first edition of the NIET MUN, organised by The Conventus society, took place on April 22-23, 2024, at the Plot 19 campus of NIET. The event featured four committees ,namely, United Nations Security Council, United Nations Commission on Status of Women, Al India Political Party Meet and International Press, with over 200 participants. The primary goal was to simulate United Nations proceedings, allowing participants to engage in diplomatic debates, negotiate solutions to global issues, and enhance their public speaking, research, and international relations skills.The event fostered valuable lessons in diplomacy, responsibility, and community impact. Participants showcased enthusiasm, compassion, and a commitment to making a difference. The event's success was largely due to efficient management by Secretary General Manas Gupta and club coordinators Aditree Singh, Tejasv Gupta, and Ananya Rajeev.The initiative received praise from both faculty members and local residents, who appreciated the efforts of the participants and organisers. This first edition of NIET MUN set a strong foundation for future editions.


          </p>
          <p className="text-lg text-gray-700">
            Conventus aims to bring together passionate individuals from around the world to engage in discussions on pressing international issues. Its committees provide a platform for delegates to develop diplomacy skills, broaden their understanding of global affairs, and collaborate on innovative solutions. Covering topics from climate change to global health crises, Conventus encourages participants to shape the future of global diplomacy and make their voices heard.
          </p>
        </div>

        <div className="my-16">

          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <TeamMember
              name="Mr. Manish Kaushik"
              image="/images/deandsw.jpg"
              bio="Dean DSW "
            />
            <TeamMember
              name="Ms. Kanika Jindal "
              image="/images/asdeandsw.png"
              bio="Associate Dean DSW"
            />
            <TeamMember
              name="Manas Gupta"
              image="/images/p2.jpg"
              bio="Secretary General & Chairperson UNSC"
            />
            

          </div>
        </div>
      </main>

      <WinnersSection />
      <section className='mb-20'>
        <h2 className="text-3xl mt-20 text-center font-bold mb-8 text-red-800">Media Gallery</h2>
        <MediaGallery />
      </section>
      <ConventusChatbot />
      <Footer />
    </div>
  )
}
