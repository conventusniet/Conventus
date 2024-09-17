import React, { useState } from 'react';
import { Users, Calendar, PiggyBank, BookOpen, Globe, Heart, Camera, Coffee } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const committeeSections = [
  {
    name: "Administrative Committees",
    committees: [
      {
        id: 1,
        name: 'Finance Committee',
        description: 'Manages financial planning and budgeting for the club.',
        details: 'The Finance Committee is responsible for overseeing the club\'s financial health, preparing annual budgets, and ensuring proper allocation of resources.',
        icon: PiggyBank,
      },
      {
        id: 2,
        name: 'Events Committee',
        description: 'Plans and organizes club events and activities.',
        details: 'The Events Committee coordinates all club events, from small meetups to large annual gatherings. They handle logistics, scheduling, and event promotion.',
        icon: Calendar,
      },
      {
        id: 3,
        name: 'Membership Committee',
        description: 'Handles member recruitment and retention.',
        details: 'The Membership Committee focuses on growing and maintaining the club\'s membership base. They develop strategies for attracting new members and ensuring current members remain engaged.',
        icon: Users,
      }
    ]
  },
  {
    name: "Educational Committees",
    committees: [
      {
        id: 4,
        name: 'Workshop Committee',
        description: 'Organizes educational workshops and seminars.',
        details: 'The Workshop Committee is dedicated to providing valuable learning experiences through workshops, seminars, and guest speaker sessions on various topics of interest to club members.',
        icon: BookOpen,
      },
      {
        id: 5,
        name: 'Research Committee',
        description: 'Conducts and promotes research activities.',
        details: 'The Research Committee facilitates and encourages research initiatives among club members, organizing symposiums and collaborating with academic institutions.',
        icon: Globe,
      }
    ]
  },
  {
    name: "Social and Cultural Committees",
    committees: [
      {
        id: 6,
        name: 'Community Outreach Committee',
        description: 'Manages the club\'s community service initiatives.',
        details: 'The Community Outreach Committee organizes volunteer opportunities and charity events, fostering strong relationships between the club and the local community.',
        icon: Heart,
      },
      {
        id: 7,
        name: 'Arts and Culture Committee',
        description: 'Promotes artistic and cultural activities within the club.',
        details: 'The Arts and Culture Committee arranges exhibitions, performances, and cultural exchanges to celebrate diversity and creativity among club members.',
        icon: Camera,
      },
      {
        id: 8,
        name: 'Social Events Committee',
        description: 'Plans casual social gatherings for members.',
        details: 'The Social Events Committee organizes informal meetups, game nights, and other social activities to foster friendships and networking among club members.',
        icon: Coffee,
      }
    ]
  }
];

const CommitteeCard = ({ committee }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/committee/${committee.id}`} target="_blank">
      <motion.div
        className="w-full h-64 cursor-pointer relative overflow-hidden rounded-xl shadow-lg"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 p-6 flex flex-col justify-between"
          initial={false}
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{committee.name}</h3>
            <committee.icon className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm text-gray-200">{committee.description}</p>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white p-6 flex flex-col justify-between"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isHovered ? 0 : 180 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-red-600 mb-2">{committee.name}</h3>
          <p className="text-sm text-gray-700 flex-grow overflow-y-auto">{committee.details}</p>
          <div className="text-xs text-gray-500">Click to learn more</div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const CommitteePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mt-20 mb-12 text-center text-red-600">
        Conventus Club Committees
      </h1>
      {committeeSections.map((section, index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-red-600 pb-2">
            {section.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.committees.map((committee) => (
              <CommitteeCard key={committee.id} committee={committee} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommitteePage;