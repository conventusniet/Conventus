'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

export default function AboutPara() {
  const [openSections, setOpenSections] = useState([0])

  const sections = [
    {
      title: "Absolute Commitment",
      content: "The Secretariat of the Conventus International Model United Nations Conference is a dedicated team exhibiting diligence and knowledge, ensuring Conventus MUN principles are upheld with utmost dedication. With a meticulous approach to every detail, the Secretariat strives to make the event a global success, bringing together participants from diverse backgrounds to foster understanding and cooperation on an international scale."
    },
    {
      title: "International Platform",
      content: "Conventus NIET provides a diverse platform for incorporating ideas, opinions, and perspectives, collaborating with international organizations to impart knowledge of global affairs. The platform encourages the exchange of ideas, fostering an environment where innovative solutions to global challenges can be discussed and debated, preparing students to be the global leaders of tomorrow."
    },
    {
      title: "Creativity & Innovation",
      content: "We boost creativity among students, advocating for overall growth through participation in various disciplines and activities. Conventus MUN creates an environment that nurtures out-of-the-box thinking, encouraging delegates to approach problems with creativity and collaborate in innovative ways to solve complex global issues."
    },
    {
      title: "Brush Up Ingenuity",
      content: "Conventus MUN provides a platform for delegates to hone strategic abilities and create solutions for grave world issues. The conference allows participants to enhance their analytical skills, develop a deeper understanding of international diplomacy, and work together to craft resolutions that can make a tangible difference in the world."
    },
    {
      title: "Engaging Motions",
      content: "The Conventus MUN fraternity offers intriguing motions to encourage high-quality debate on challenging global issues. Each motion is crafted to ignite thought-provoking discussions, enabling delegates to explore various perspectives, challenge the status quo, and develop meaningful conclusions that could influence global policy decisions."
    }
  ]

  const values = [
    "Academic Excellence: Striving to achieve the highest standards in all our academic endeavors, fostering intellectual curiosity and critical thinking.",
    "Integrity & Ethics: Promoting honesty, transparency, and ethical decision-making both in personal actions and within the larger global community.",
    "Diversity & Mutual Respect: Embracing and celebrating differences, fostering an inclusive environment where every voice is heard and respected.",
    "Expanding Horizons of Knowledge: Encouraging continuous learning and exploration of new ideas, breaking down barriers to understanding in a rapidly changing world.",
    "Shared Governance: Advocating for collaborative decision-making and shared responsibility in leadership, empowering individuals to contribute meaningfully to governance.",
    "Social Responsibility: Instilling a sense of responsibility towards society, encouraging actions that positively impact communities both locally and globally.",
    "Environmental Responsibility: Emphasizing the need to protect and sustain our planet, promoting practices that contribute to environmental preservation and sustainability.",
    "Service: Fostering a spirit of service to others, encouraging individuals to give back to their communities and to the global society through meaningful, impactful actions."
  ]

  const toggleSection = (index) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center text-gray-800">Learn More</h1>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <button
              onClick={() => toggleSection(index)}
              className="w-full p-4 md:p-6 text-left focus:outline-none"
              aria-expanded={openSections.includes(index)}
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center">
                {openSections.includes(index) ? (
                  <ChevronDown className="w-5 h-5 mr-2 text-red-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 mr-2 text-red-500" />
                )}
                {section.title}
              </h2>
            </button>
            {openSections.includes(index) && (
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-gray-600">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 bg-white p-4 md:p-6 rounded-lg shadow-sm">
        <h2 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-center text-gray-700">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((value, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0" aria-hidden="true"></div>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
