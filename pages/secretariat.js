'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Oheader from '@/components/OHeader'
import Footer from '@/components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'

const SecretariatMember = ({ name, branch }) => (
  <motion.div 
    className="mb-6 text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg md:text-xl font-semibold text-red-800">{name}</h3>
    <p className="text-sm md:text-base text-gray-600">{branch}</p>
  </motion.div>
)

export default function SecretariatPage() {
  const pageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"])
  const imageScale = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1])
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1])
  
  // Combined all members into a single array for row-wise display on large screens
  const allMembers = [
    { name: "Manas Gupta", branch: "Founder - President" },
    { name: "Pragya Singh", branch: "Secretary General" },
    { name: "Yashraj Ranjan", branch: "Director General" },
    { name: "Ameya Atreya", branch: "USG Delegate Affairs" },
    { name: "Sanskar Bhardwaj", branch: "UDG Web Operations" },
    { name: "Utkarsh Aggarwal", branch: "USG Media" },
    { name: "Disha Dubey", branch: "USG Social Media" },
    { name: "Ujjawal Sinha", branch: "UDG Design" },
    { name: "Shivanshu Pandey", branch: "USG Marketing & PR" },
    { name: "Apruv Krishna", branch: "UDG Logistics & Operations" },
    { name: "Anshuman Parashar", branch: "UDG Finance" },
    { name: "Ankit Mehra", branch: "UDG Hospitality" },
  ]
  
  // For smaller screens, we'll still use the left-right layout
  const leftMembers = [
    { name: "Manas Gupta", branch: "Founder - President" },
    { name: "Pragya Singh", branch: "Secretary General" },
    { name: "Yashraj Ranjan", branch: "Director General" },
    { name: "Ameya Atreya", branch: "USG Delegate Affairs" },
    { name: "Sanskar Bhardwaj", branch: "UDG Web Operations" },
    { name: "Utkarsh Aggarwal", branch: "USG Media" },
  ]
  
  const rightMembers = [
    { name: "Disha Dubey", branch: "USG Social Media" },
    { name: "Ujjawal Sinha", branch: "UDG Design" },
    { name: "Shivanshu Pandey", branch: "USG Marketing & PR" },
    { name: "Apruv Krishna", branch: "UDG Logistics & Operations" },
    { name: "Anshuman Parashar", branch: "UDG Finance" },
    { name: "Ankit Mehra", branch: "UDG Hospitality" },
  ]
  
  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <Oheader />
      
      <motion.div
        style={{ y: headerY }}
        className="fixed top-20 left-0 right-0 z-10 bg-gradient-to-r from-red-50 to-red-100 py-6 md:py-8 shadow-md"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-red-800 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SECRETARIAT
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-4xl font-semibold text-red-700 mb-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Second Edition
          </motion.h2>
          <motion.h3 
            className="text-xl md:text-3xl font-semibold text-red-700 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            2024-25
          </motion.h3>
          <motion.p 
            className="text-lg md:text-xl text-red-600 mb-3 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "Leadership is not about being in charge. It is about taking care of those in your charge."
          </motion.p>
          <motion.p 
            className="text-base md:text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Meet our dedicated team of individuals who work tirelessly behind the scenes to make every event a success.
          </motion.p>
        </div>
      </motion.div>
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-[40vh] md:mt-[50vh]">
        <motion.div 
          className="relative w-full aspect-video mt-44 mb-12 md:mb-16"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <Image
            src="/images/sc1.jpeg"
            alt="Secretariat Group Photo"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-xl"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            className="text-3xl font-bold text-red-800 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.h2>
          
          {/* Row-wise layout for large screens */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6">
              {allMembers.map((member, index) => (
                <SecretariatMember key={index} {...member} />
              ))}
            </div>
          </div>
          
          {/* Column-based layout with center divider for smaller screens */}
          <div className="lg:hidden relative">
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-300 to-red-500 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pr-2 md:pr-4">
                {leftMembers.map((member, index) => (
                  <SecretariatMember key={index} {...member} />
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pl-2 md:pl-4">
                {rightMembers.map((member, index) => (
                  <SecretariatMember key={index} {...member} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ConventusChatbot/>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}