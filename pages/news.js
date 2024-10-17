'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Share2, FileText } from 'lucide-react'
import Image from 'next/image'
import Oheader from '@/components/OHeader'
import Footer from '@/components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'
const NewsletterCard = ({ day, imageUrl, pdfUrl }) => {
  const [showReadNow, setShowReadNow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowReadNow(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleShare = async () => {
    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const file = new File([blob], `${day}_Newsletter_2023-24.pdf`, { type: 'application/pdf' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${day} Newsletter 2023-24`,
        })
      } else {
        // Fallback for browsers that don't support file sharing
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `${day}_Newsletter_2023-24.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error sharing file:', error)
      alert('Unable to share the file. You can download it directly from the "Read Now" link.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-[3/4] mx-auto overflow-hidden rounded-xl"
    >
      <Image
        src={imageUrl}
        alt={`${day} Day Newsletter`}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-gradient-to-r from-black/50 via-black/30 to-transparent p-2 rounded-lg inline-block mb-4">
          <h3 className="text-2xl font-semibold text-white">
            {day} Day
          </h3>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showReadNow ? { opacity: 1 } : { opacity: 0 }}
          className="flex justify-between items-center"
        >
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition text-sm"
          >
            <FileText className="mr-2" size={16} />
            Read Now
          </a>
          <button
            onClick={handleShare}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
          >
            <Share2 size={20} className="text-gray-800" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function NewsletterPage() {
  const newsletters = [
    {
      day: "First",
      imageUrl: "/images/n1.jpg",
      pdfUrl: "/pdfs/Newsletter Day1.pdf"
    },
    {
      day: "Second",
      imageUrl: "/images/n1.jpg",
      pdfUrl: "/pdfs/Newsletter Day2.pdf"
    }
  ]

  const pageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"])

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-red-50">
      <Oheader />

      <motion.div
        style={{ y: headerY }}
        className="fixed top-20 left-0 right-0 z-10 bg-red-50 py-12"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-red-800 mb-4">
            NEWSLETTER
          </h1>
          <h2 className="text-4xl font-semibold text-red-700 mb-6">
            2023-24
          </h2>
          <p className="text-xl text-red-600">
            Stay updated with our bi-annual newsletters covering all the important events
            and achievements throughout the academic year.
          </p>

          <p className="text-lg mt-10 text-gray-700">
            At Conventus, Our newsletter is designed to keep you informed and engaged with the latest updates from the Club. Each edition will feature highlights from our recent events, upcoming workshops, and opportunities to get involved. We aim to foster a sense of community and support among our members, providing valuable resources for personal and professional growth. Join us as we explore the dynamic world of Model United Nations, share insights, and celebrate the achievements of our members. Stay connected and be part of our journey toward becoming impactful global citizens! 
          </p>
        </div>
      </motion.div>

      <main className="flex-grow container mx-auto px-4 py-8 mt-[calc(100vh-25vh)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsletters.map((newsletter, index) => (
            <NewsletterCard
              key={index}
              day={newsletter.day}
              imageUrl={newsletter.imageUrl}
              pdfUrl={newsletter.pdfUrl}
            />
          ))}
        </div>
        <ConventusChatbot/>
      </main>

      <Footer />
    </div>
  )
}
