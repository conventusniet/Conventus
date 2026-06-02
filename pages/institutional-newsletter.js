'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'
import ExternalNewsletter from '@/components/ExternalNewsletter'

const newsletters = [
  {
    title: 'NIET Times',
    description:
      'The Winter Edition 2026 builds upon the foundation of the first publication, marking 25 years of Noida Institute of Engineering and Technology. This edition celebrates the institution’s legacy while extending the benefits and reach established by the inaugural release.',
    imageUrl: '/images/NIET_Times_2026W.png',
    externalUrl:
      'https://noidainstituteofengtech-my.sharepoint.com/:b:/g/personal/conventus_niet_co_in/IQCs2LL_swYsS7hxU0oMoI6HATpe3fqsHVM--Nvcp7NwqtA?e=I4BpuN',
    edition: 'Winter Edition 2026',
    publishDate: '2026-01-26',
    displayDate: '26th January 2026',
    isAnniversary: true
  },
  {
    title: 'NIET Times',
    description:
      'The official newsletter of Noida Institute of Engineering and Technology featuring campus news, academic achievements, student activities, faculty insights, and institutional updates. This seminal Summer Edition marked the launch of NIET’s institutional publication.',
    imageUrl: '/images/NIET_Times_2025.png',
    externalUrl:
      'https://noidainstituteofengtech-my.sharepoint.com/:b:/g/personal/conventus_niet_co_in/EUvIhIaUZpBKtOWcUX-RdpIBNeiHLqF6sC3KZT9zB_hr-Q?e=o1hQyF',
    edition: 'Summer Edition 2025',
    publishDate: '2025-08-15',
    displayDate: '15th August 2025'
  }
]

export default function InstitutionalNewsletterPage() {
  const pageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end start']
  })

  const headerY = useTransform(scrollYProgress, [0, 0.2], ['0%', '-100%'])

  const sortedNewsletters = [...newsletters].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-red-50">
      <Header theme="red" />

      <motion.div
        style={{ y: headerY }}
        className="fixed top-20 left-0 right-0 z-10 bg-red-50 py-8"
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-3">
            INSTITUTIONAL NEWSLETTER
          </h1>
          <p className="text-2xl text-red-600 font-semibold mb-1">
            Official Publications
          </p>
          <p className="text-xl text-gray-700 italic">
            Noida Institute of Engineering and Technology
          </p>
        </div>
      </motion.div>

      <main className="flex-grow container mx-auto px-4 py-8 mt-[calc(100vh-40vh)]">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-800 mb-4 text-center">
            College Publications
          </h2>

          <p className="text-center text-red-600 mb-12 max-w-3xl mx-auto">
            Stay updated with the latest happenings across NIET through our
            official college newsletter
          </p>

          {sortedNewsletters.map((item, index) => {
            const isLatest = index === 0

            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className={`mb-12 rounded-xl bg-white transition-all ${ isLatest ? ' border border-red-700' : '' }`}
              >
                {/* Only latest label stays */}
                {isLatest && (
                  <div className="absolute top-4 left-4 z-20 bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Latest Issue
                  </div>
                )}

                <div className={isLatest ? 'scale-[1.02]' : 'scale-100'}>
                  <ExternalNewsletter
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    externalUrl={item.externalUrl}
                    publisherName="NIET Official"
                    edition={item.edition}
                    publishDate={item.displayDate}
                    isAnniversary={item.isAnniversary}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        <ConventusChatbot />
      </main>

      <Footer />
    </div>
  )
}
