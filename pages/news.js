'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Share2, FileText } from 'lucide-react'
import Image from 'next/image'
import Oheader from '@/components/OHeader'
import Footer from '@/components/Footer'

const NewsletterCard = ({ semester, imageUrl }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const [showReadNow, setShowReadNow] = useState(false)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setShowReadNow(true), 500)
    }
  }, [isInView])

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${semester} Newsletter 2023-24`,
        url: `/pdfs/${semester.toLowerCase()}-2023-24.pdf`
      })
    } catch (error) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px] flex flex-col"
    >
      <div className="relative h-3/4">
        <Image
          src={imageUrl}
          alt={`${semester} Semester Newsletter`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex-grow p-6 flex flex-col justify-between bg-white">
        <h3 className="text-2xl font-semibold text-red-800">
          {semester} Semester
        </h3>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={showReadNow ? { opacity: 1 } : { opacity: 0 }}
          className="flex justify-between items-center mt-4"
        >
          <a
            href={`/pdfs/${semester.toLowerCase()}-2023-24.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition text-lg"
          >
            <FileText className="mr-2" size={20} />
            Read Now
          </a>
          <button
            onClick={handleShare}
            className="p-3 text-red-600 hover:text-red-800 transition"
          >
            <Share2 size={24} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function NewsletterPage() {
  const newsletters = [
    {
      semester: "First",
      imageUrl: "/images/coll1.png"
    },
    {
      semester: "Second",
      imageUrl: "/images/coll2.png"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Oheader />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            NEWSLETTER
          </h1>
          <h2 className="text-3xl font-semibold text-red-700 mb-6">
            2023-24
          </h2>
          <p className="text-lg text-red-600 mb-12">
            Stay updated with our bi-annual newsletters covering all the important events 
            and achievements throughout the academic year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {newsletters.map((newsletter, index) => (
            <NewsletterCard 
              key={index}
              semester={newsletter.semester}
              imageUrl={newsletter.imageUrl}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
