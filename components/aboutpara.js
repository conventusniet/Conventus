'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

export default function AboutPara() {
  const [openSections, setOpenSections] = useState([0])

  const sections = [
    {
      title: "Diplomatic Commitment",
      content: "At Conventus NIET, we believe in the power of dialogue to resolve conflicts and foster understanding. Our club promotes diplomacy as the cornerstone of international relations, encouraging members to approach every debate with empathy, respect, and a solution-oriented mindset."
    },
    {
      title: "Leadership",
      content: "At Conventus, we nurture leaders who think critically, act decisively, and inspire others. By participating in MUN conferences and club initiatives, members develop the confidence and skills needed to lead with integrity on global platforms."
    },
    {
      title: "Creativity & Innovation",
      content: "We boost creativity among students, advocating for overall growth through participation in various disciplines and activities. Conventus MUN creates an environment that nurtures out-of-the-box thinking, encouraging delegates to approach problems with creativity and collaborate in innovative ways to solve complex global issues."
    },
    {
      title: "Collaboration",
      content: "Teamwork is at the heart of everything we do. Whether it’s drafting resolutions or organizing events, we emphasize collaboration, helping our members understand the importance of diverse perspectives in crafting sustainable solutions."
    },
    {
      title: "Global Awareness",
      content: "We encourage our members to be informed about pressing global issues. Through research, discussions, and debates, we promote a deeper understanding of international affairs, helping students appreciate the complexities of our interconnected world"
    }
  ]

  const values = [
    "We believe that education can empower individuals to think critically, challenge norms, and drive social change, equipping them with the skills necessary for effective global citizenship.",
    "We are committed to creating an inclusive environment where diverse perspectives are valued and every member feels respected, encouraging a rich exchange of ideas and experiences.",
    "We prioritize open and transparent communication, fostering trust and collaboration within our community. This allows members to express their views freely, leading to more meaningful discussions.",
    "We encourage a mindset of resilience, teaching members to embrace challenges, learn from failures, and develop the perseverance necessary to succeed in both MUN and life.",
    "We value mentorship as a vital aspect of growth. Experienced members provide guidance to newcomers, fostering a supportive community that promotes skill development and personal growth.",
    "We are dedicated to making a positive impact beyond our campus. Our club actively seeks opportunities to engage with local and global communities, contributing to meaningful solutions for real-world issues.",
    "We believe in the importance of ethical decision-making and accountability. Our members are encouraged to approach debates and discussions with integrity, ensuring that their actions align with our values.",
    "We embrace the concept of lifelong learning, recognizing that growth does not end after formal education. Our club fosters a culture of continuous improvement, encouraging members to seek knowledge and experiences beyond their comfort zones."
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
      <h1 className="text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center text-gray-800">L E A R NㅤM O R E </h1>

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
        <h2 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-center text-gray-700">O U RㅤV A L U E S</h2>
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
