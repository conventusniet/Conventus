'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Share2, FileText, Download } from 'lucide-react'
import Image from 'next/image'
import Oheader from '@/components/OHeader'
import Footer from '@/components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'
import PDFViewer from '@/components/PDFViewer'

// Flipbook component for CMUN 2.0 newsletter
const FlipbookNewsletter = ({ title, imageUrl, pdfUrl }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 mb-10">
      <div className="relative">
        <div className="relative h-96 w-full">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg">Latest Edition</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">
          Our latest newsletter covers all the highlights from CMUN 2.0, featuring committee sessions, 
          memorable speeches, and the passionate debates that defined this year's conference.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
          >
            <FileText className="mr-2" size={18} />
            Preview PDF
          </button>
          <a
            href={pdfUrl}
            download
            className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
          >
            <Download className="mr-2" size={18} />
            Download PDF
          </a>
        </div>
      </div>

      <PDFViewer
        pdfUrl={pdfUrl}
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

const NewsletterCard = ({ day, imageUrl, pdfUrl }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${day} Newsletter - CMUN`,
          url: pdfUrl,
        })
      } else {
        navigator.clipboard.writeText(pdfUrl)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <div className="relative">
        <div className="relative h-64 w-full">
          <Image
            src={imageUrl}
            alt={`${day} Newsletter`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-bold">{day} Day</h3>
          <p className="text-lg">CMUN 1.0 Newsletter</p>
        </div>
      </div>
      <div className="p-4 flex justify-between">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-red-600 hover:text-red-800 font-semibold"
        >
          <FileText className="mr-2" size={18} />
          Read PDF
        </a>
        <button
          onClick={handleShare}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <Share2 className="mr-2" size={18} />
          Share
        </button>
      </div>
    </div>
  )
}

// Photo gallery with hover effects
const PhotoGallery = () => {
  const images = [
    '/images/news_1.jpg',
    '/images/news_2.jpg',
    '/images/news_3.jpg',
    '/images/news_4.jpg'
  ]

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative rounded-lg overflow-hidden h-48 md:h-64"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function NewsletterPage() {
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
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-4">
            NEWSLETTERS
          </h1>
          <p className="text-xl text-red-600">
            Stay updated with our digital publications covering all Conventus events
          </p>

          <p className="text-lg mt-10 text-gray-700">
            Our newsletters capture the essence of Conventus events with comprehensive 
            coverage, featuring highlights, interviews, and impactful moments.
          </p>
        </div>
      </motion.div>

      <main className="flex-grow container mx-auto px-4 py-8 mt-[calc(100vh-25vh)]">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-8">Latest Edition</h2>
          <FlipbookNewsletter
            title="CMUN 2.0 Newsletter"
            imageUrl="/images/mun2.0/newsletter-preview.jpg"
            pdfUrl="/pdfs/CMUN_2.0_Newsletter.pdf"
          />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-8">Previous Editions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NewsletterCard
              day="First"
              imageUrl="/images/Newsletter.jpg"
              pdfUrl="/pdfs/Newsletter Day1.pdf"
            />
            <NewsletterCard
              day="Second"
              imageUrl="/images/Newsletter.jpg"
              pdfUrl="/pdfs/Newsletter Day2.pdf"
            />
          </div>
        </div>

        <PhotoGallery />

        <ConventusChatbot />
      </main>

      <Footer />
    </div>
  )
}
