'use client'

// import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import Header from '../components/Header'
import Footer from '../components/Footer'
import ConventusChatbot from '../components/ConventusChatBot'
import HeroSection from '../components/mun2herosection'
import Oheader from '../components/OHeader'
import LeadershipSection from '@/components/mun2.oleadershipsec'
import SessionAdjournedBanner from '../components/mun2.0SessionAdjournedBanner'
import SponsorsSection from '../components/mun2.0sponsors'
import LearnMoreSection from '@/components/mun2.0learnmore'
// import ContactInformation from '@/components/mun2.0moreinfo'
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

      <div><SessionAdjournedBanner /></div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-red-800">CMUN 2025 - A Diplomatic Success</h2>
            
            <div className="text-lg text-gray-700 text-center max-w-4xl mx-auto space-y-4">
              <p>
                The Secretariat is pleased to announce the successful conclusion of the 2nd Edition of NIET Conventus Model United Nations 2025.
                Building upon our inaugural assembly, this year's conference elevated diplomatic discourse to unprecedented heights.
              </p>
              
              <p>
                Distinguished delegates from across the region convened for two days of substantive debate, coalition-building, and resolution drafting.
                The committees addressed critical global challenges, from climate security to international peacekeeping frameworks, with delegates
                demonstrating exceptional diplomatic acumen and negotiation skills.
              </p>
              
              <p>
                The Dais extends formal recognition to all participating delegations, honorable chairs, and esteemed faculty advisors
                whose contributions ensured the conference's diplomatic success and substantive excellence.
              </p>
            </div>
          </motion.div>
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
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Sponsors & Collaborators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
       
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
            <div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
          </div>
        </section> */}
      </main>

      <div>
        <Contact />
      </div>
      <ConventusChatbot />
      <Footer />
    </div>
  )
}