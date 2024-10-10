'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import Link from 'next/link'
import Oheader from '@/components/OHeader'
import Footer from '../components/Footer'

const CommitteeCard = ({ logo, title, description, onClick }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105"
    onClick={onClick}
  >
    <div className="relative h-48 w-full">
      <Image
        src={logo}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-red-800 text-xl font-semibold mb-2">{title}</h3>
      <p className="text-red-600 text-md">{description.slice(0, 100)}...</p>
    </div>
  </motion.div>
)

const CommitteeDetails = ({ committee, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 bg-white z-50 overflow-y-auto p-4"
  >
    <div className="max-w-2xl mx-auto relative bg-red-50 p-6 rounded-lg shadow-lg">
      <button
        className="absolute top-4 right-4 text-red-600 hover:text-red-800"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="text-center">
        <Image
          src={committee.logo}
          alt={committee.title}
          width={100}
          height={100}
          className="mx-auto mb-4 rounded-full"
        />
        <h2 className="text-2xl font-bold text-red-800 mb-4">{committee.title}</h2>
        <p className="text-md text-red-700 mb-4">{committee.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Committee Objectives</h3>
        <ul className="list-disc list-inside text-red-700">
          {committee.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Expected Outcomes</h3>
        <p className="text-md text-red-700">{committee.expectedOutcomes}</p>
      </div>
      <div className="text-center">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          onClick={() => alert(`You have joined the ${committee.title} committee!`)}
        >
          Join
        </button>
      </div>
    </div>
  </motion.div>
)

export default function CommitteesPage() {
  const [selectedCommittee, setSelectedCommittee] = useState(null)

  const onlineCommittees = [
    {
      logo: "/images/coll4.png",
      title: "United Nations Security Counci;",
      description: "The United Nations Security Council (UNSC) in Model United Nations (MUN) holds primary responsibility for maintaining international peace and security, reflecting the global commitment to address threats to peace.",
      objectives: [
        "- Address threats to international peace", 
"- Authorize peacekeeping operations",
"- Recommend solutions to international conflicts "

      ],
      expectedOutcomes: "Delegates will simulate crisis scenarios and collaboratively draft resolutions aimed at preserving global peace and security, developing actionable strategies to confront contemporary security threats and promoting diplomatic dialogue in an increasingly complex international landscape."
    },
    {
      logo: "/images/coll5.png",
      title: "United Nations Commission On Status Of Women",
      description: "The United Nations Commission on the Status of Women (UNCSW) in Model United Nations (MUN) focuses on   Preventing the Violation of Women’s Human Rights in Conflict and Post-Conflict Reconstruction  , addressing the unique challenges women face in conflict zones and their critical role in peacebuilding.",
      objectives: [
        "- Advocate for policies that protect women's rights in conflict situations", 
"- Ensure women's active engagement in post-conflict reconstruction efforts",  
"- Explore strategies to prevent rights violations and enhance women's participation"  

      ],
      expectedOutcomes: "Delegates will work towards creating actionable plans to improve the lives of children worldwide, focusing on education, health, and protection."
    },
    {
      logo: "/images/coll6.png",
      title: "Intergovernmental Panel On Climate Change",
      description: "The IPCC is the United Nations body for assessing the science related to climate change.",
      objectives: [
        "Assess latest climate change research",
        "Develop strategies for climate change mitigation",
        "Propose adaptation measures for vulnerable regions"
      ],
      expectedOutcomes: "Delegates will propose legal reforms, capacity-building initiatives, and safe spaces for women, empowering them as key agents of peace and societal progress while emphasizing the importance of gender equality and women's empowerment in achieving sustainable global peace and development."
    },
  ]

  const offlineCommittees = [
    {
      logo: "/images/coll7.png",
      title: "AIPPM",
      description: "The All India Political Parties Meet (AIPPM) in Model United Nations (MUN) simulates India's dynamic political landscape, where representatives from various political parties debate and negotiate on key national issues, including economic policies, social justice, and governance.",
      objectives: [
        "- Simulate India's domestic political environment",
"- Debate critical national issues like poverty, healthcare, and education",  
"- Encourage collaboration among diverse political ideologies"  

      ],
      expectedOutcomes: "Delegates will draft resolutions aimed at fostering sustainable development and addressing global economic and social challenges."
    },
  ]

  const  additionalCommittees = [
    {
      logo: "/images/coll2.png",
      title: "Journalism",
      description: "The Journalists Committee in Model United Nations (MUN) serves as the storytellers of the International Press, observing debates across various committees and capturing the essence of discussions and delegate interactions.",
      objectives: [
        "- Observe and report on committee debates and negotiations ",
"- Craft insightful articles reflecting key issues and dynamics  ",
"- Analyze the global and local impacts of MUN discussions  "


      ],
      expectedOutcomes: "Journalists will deliver well-crafted articles, showcasing their analytical skills and ability to communicate the significance of committee proceedings, offering a deeper understanding of the issues at hand."
    },
    {
      logo: "/images/coll3.png",
      title: "Photography",
      description: "The Photographers Committee in Model United Nations (MUN) captures the energy and spontaneity of the conference, immortalizing key moments through powerful visuals.

",
      objectives: [
        "- Capture the emotions, intensity, and key moments of the conference  ",
"- Portray the atmosphere and dynamics of committee sessions",  
"- Create a visual narrative that brings the event to life  "


      ],
      expectedOutcomes: "Photographers will produce a visual collection that conveys the essence of the MUN, showcasing the passion and deliberation of the participants through impactful images."
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <Oheader />
      <main className="flex-grow mt-20 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-800">
          Committees
        </h1>
        <p className="text-lg text-center mb-8 text-red-600">
          Explore our diverse range of committees addressing crucial global issues
        </p>

        <h2 className="text-3xl font-bold text-center mb-6 text-red-800">
          Online Committees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {onlineCommittees.map((committee, index) => (
            <CommitteeCard
              key={index}
              logo={committee.logo}
              title={committee.title}
              description={committee.description}
              onClick={() => setSelectedCommittee(committee)}
            />
          ))}
        </div>
        <div className="relative items-center justify-center text-center mb-10">
          <Link href="/registration" passHref>
            <motion.button
              className="inline-block mt-10 px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

            >

              Register Now
            </motion.button>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-red-800">
          Offline Committees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offlineCommittees.map((committee, index) => (
            <CommitteeCard
              key={index}
              logo={committee.logo}
              title={committee.title}
              description={committee.description}
              onClick={() => setSelectedCommittee(committee)}
            />
          ))}
        </div>
        <div className="relative items-center justify-center text-center mb-10">
          <Link href="/registration" passHref>
            <motion.button
              className="inline-block mt-10 px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

            >

              Register Now
            </motion.button>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-red-800">
          Additional Committees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalCommittees.map((committee, index) => (
            <CommitteeCard
              key={index}
              logo={committee.logo}
              title={committee.title}
              description={committee.description}
              onClick={() => setSelectedCommittee(committee)}
            />
          ))}
        </div>
        <div className="relative items-center justify-center text-center mb-10">
          <Link href="/registration" passHref>
            <motion.button
              className="inline-block mt-10 px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

            >

              Register Now
            </motion.button>
          </Link>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedCommittee && (
          <CommitteeDetails
            committee={selectedCommittee}
            onClose={() => setSelectedCommittee(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
