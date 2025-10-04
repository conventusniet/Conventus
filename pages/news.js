'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Share2, FileText } from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'
import FlipbookNewsletter from '@/components/FlipbookNewsletter'
import ExternalNewsletter from '@/components/ExternalNewsletter'

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
        {/* If pdfUrl is external (absolute), open in new tab; otherwise encode local path */}
        <a
          href={/^(https?:)?\/\//.test(pdfUrl) ? pdfUrl : encodeURI(pdfUrl)}
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
    '/images/news_3.jpg',
    '/images/news_4.jpg',
    '/images/news_5.webp',
    '/images/news_6.webp',
    '/images/news_7.webp'
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
      <Header theme="red" />
      <motion.div
        style={{ y: headerY }}
        className="fixed top-20 left-0 right-0 z-10 bg-red-50 py-8"
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-3">
            NEWSLETTERS
          </h1>
          <p className="text-2xl text-red-600 font-semibold mb-1">
            Conventus Model United Nations 2025
          </p>
          <p className="text-xl text-gray-700 italic">
            Noida Institute of Engineering and Technology
          </p>

          {/* 
          <p className="text-lg mt-10 text-gray-700">
            Our newsletters capture the essence of Conventus events with comprehensive 
            coverage, featuring highlights, interviews, and impactful moments.
          </p>
          */}
        </div>
      </motion.div>

      <main className="flex-grow container mx-auto px-4 py-8 mt-[calc(100vh-40vh)]">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">Latest Edition</h2>
          <FlipbookNewsletter
            title="CMUN 2.0 Newsletter"
            imageUrl="/images/mun2.0/newsletter-preview.jpg"
            pdfUrl="/pdfs/CMUN_2.0_Newsletter.pdf"
            showDownload={true}
          />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">Previous Editions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NewsletterCard
              day="First"
              imageUrl="/images/Newsletter.jpg"
              pdfUrl="/pdfs/Newsletter%20Day1.pdf"
            />
            <NewsletterCard
              day="Second"
              imageUrl="/images/Newsletter.jpg"
              pdfUrl="/pdfs/Newsletter%20Day2.pdf"
            />
          </div>
        </div>

        {/* NIET Times Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-4 text-center">College Publications</h2>
          <p className="text-center text-red-600 mb-8 max-w-3xl mx-auto">
            Stay updated with the latest happenings across NIET through our official college newsletter
          </p>
          <ExternalNewsletter
            title="NIET Times"
            description="The official newsletter of Noida Institute of Engineering and Technology featuring campus news, academic achievements, student activities, faculty insights, and institutional updates. Stay connected with the broader NIET community through comprehensive coverage of college life and developments."
            imageUrl="/images/NIET_Times_2025.png"
            externalUrl="https://noidainstituteofengtech-my.sharepoint.com/personal/conventus_niet_co_in/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Fconventus%5Fniet%5Fco%5Fin%2FDocuments%2FNIET%20Times%2F00%20Summer%20Edition%2F%23219%5FNIET%5FTimes%2Epdf&parent=%2Fpersonal%2Fconventus%5Fniet%5Fco%5Fin%2FDocuments%2FNIET%20Times%2F00%20Summer%20Edition"
            publisherName="NIET Official"
            edition="Summer Edition 2025"
            publishDate="2025"
          />
        </div>

        <PhotoGallery />

        <ConventusChatbot />
      </main>

      <Footer />
    </div>
  )
}
