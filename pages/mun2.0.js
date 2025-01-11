'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-04-20T00:00:00') // Example date

    const updateTimer = () => {
      const now = new Date()
      const difference = targetDate - now

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    const timer = setInterval(updateTimer, 1000)
    updateTimer()

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center space-x-4 text-white">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-red-800 rounded-lg p-4 w-20 text-center">
            <span className="text-2xl font-bold">{value}</span>
          </div>
          <span className="text-red-800 mt-2 capitalize">{unit}</span>
        </div>
      ))}
    </div>
  )
}

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
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-red-900 to-red-700">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">2nd Edition of</h1>
          <h2 className="text-4xl font-semibold mb-8">CONVENTUS MODEL UNITED NATIONS</h2>
          <CountdownTimer />
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Welcome to CMUN 2.5!</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            Building on the success of our inaugural edition, NIET Conventus MUN returns with an even more ambitious vision. 
            Join us for two days of intensive diplomacy, debate, and dialogue as we tackle pressing global challenges.
          </p>
        </section>

        {/* Committees Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Committees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CommitteeCard
              name="UNSC"
              description="United Nations Security Council - Addressing international peace and security challenges"
              image="/images/unsc1.jpg"
            />
            <CommitteeCard
              name="UNHRC"
              description="United Nations Human Rights Council - Promoting and protecting human rights worldwide"
              image="/images/uncsw1.jpg"
            />
            <CommitteeCard
              name="AIPPM"
              description="All India Political Parties Meet - Discussing domestic political issues"
              image="/images/aippm1.jpg"
            />
          </div>
        </section>

        {/* Registration Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Registration</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Delegate Applications Now Open!</h3>
            <div className="flex justify-center">
              <button className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors">
                Apply as Delegate
              </button>
            </div>
          </div>
        </section>

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

      <ConventusChatbot />
      <Footer />
    </div>
  )
}