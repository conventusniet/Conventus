'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ConventusChatbot from '../components/ConventusChatBot'
import HeroSection from '../components/mun2herosection'
import Oheader from '../components/OHeader'
import LeadershipSection from '@/components/mun2.oleadershipsec'
import CountdownTimer from '../components/mun2.0countdown'
import SponsorsSection from '../components/mun2.0sponsors'
import LearnMoreSection from '@/components/mun2.0learnmore'
import ContactInformation from '@/components/mun2.0moreinfo'
import Contact from '@/components/mun2.0contact'
const CommitteeCard = ({ name, description, image }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-48">
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-red-800">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
)

export default function MUN2Page() {
  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <div className='mb-6'><Oheader /></div>

      {/* Hero Section */}

      <div className='mt-20'><HeroSection /></div>

      <div><CountdownTimer /></div>

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Welcome to CMUN 2.5!</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            Building on the success of our inaugural edition, NIET Conventus MUN returns with an even more ambitious vision.
            Join us for two days of intensive diplomacy, debate, and dialogue as we tackle pressing global challenges.
          </p>
        </section>

        <div>
          <LeadershipSection />
        </div>

        {/* Committees Section */}
        <div>
          <LearnMoreSection />
        </div>



        <div>
          <SponsorsSection />
        </div>

        {/* Sponsors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Sponsors & Collaborators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Add sponsor logos here */}
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
          </div>
        </section>
      </main>

      <div>
        <Contact/>
      </div>
      <ConventusChatbot />
      <Footer />
    </div>
  )
}