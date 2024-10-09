'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Oheader from '@/components/OHeader'
import Footer from '@/components/Footer'

const SecretariatMember = ({ name, branch }) => (
  <div className="mb-6 md:mb-8 text-center">
    <h3 className="text-lg md:text-xl font-semibold text-red-800">{name}</h3>
    <p className="text-sm md:text-base text-gray-600">{branch}</p>
  </div>
)

export default function SecretariatPage() {
  const pageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"])
  
  const leftMembers = [
    { name: "John Doe", branch: "Computer Science" },
    { name: "Jane Smith", branch: "Electrical Engineering" },
    { name: "Alex Johnson", branch: "Mechanical Engineering" },
    { name: "Sarah Williams", branch: "Chemical Engineering" },
    { name: "Mike Brown", branch: "Civil Engineering" },
    { name: "Emily Davis", branch: "Aerospace Engineering" },
    { name: "Chris Wilson", branch: "Biotechnology" }
  ]
  
  const rightMembers = [
    { name: "Rachel Green", branch: "Electronics" },
    { name: "Ross Geller", branch: "Information Technology" },
    { name: "Chandler Bing", branch: "Data Science" },
    { name: "Monica Geller", branch: "Robotics" },
    { name: "Joey Tribbiani", branch: "Artificial Intelligence" },
    { name: "Phoebe Buffay", branch: "Software Engineering" },
    { name: "Ted Mosby", branch: "Architecture" }
  ]
  
  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-red-50">
      <Oheader />
      
      <motion.div
        style={{ y: headerY }}
        className="fixed top-20 left-0 right-0 z-10 bg-red-50 py-8 md:py-12"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-2 md:mb-4">
            SECRETARIAT
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-red-700 mb-1 md:mb-2">
            First Edition
          </h2>
          <h3 className="text-xl md:text-3xl font-semibold text-red-700 mb-4 md:mb-6">
            2023-24
          </h3>
          <p className="text-lg md:text-xl text-red-600 mb-4 md:mb-6">
            "Leadership is not about being in charge. It is about taking care of those in your charge."
          </p>
          <p className="text-base md:text-lg text-gray-700">
            Meet our dedicated team of individuals who work tirelessly behind the scenes to make every event a success. Our secretariat members bring diverse skills and perspectives, united by their passion for excellence and commitment to our organization's mission.
          </p>
        </div>
      </motion.div>
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-[60vh] md:mt-[75vh]">
        <div className="relative w-full aspect-video mb-8 md:mb-12">
          <Image
            src="/images/coll1.png"
            alt="Secretariat Group Photo"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-2xl"
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-red-300"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-2 md:space-y-4 pr-2 md:pr-4">
                {leftMembers.map((member, index) => (
                  <SecretariatMember key={index} {...member} />
                ))}
              </div>
              
              <div className="space-y-2 md:space-y-4 pl-2 md:pl-4">
                {rightMembers.map((member, index) => (
                  <SecretariatMember key={index} {...member} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
