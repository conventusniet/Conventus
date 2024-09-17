import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        image: '/images/coll1.png',
      },
      {
        id: 2,
        name: 'Events Committee',
        description: 'Plans and organizes club events and activities.',
        details: 'The Events Committee coordinates all club events, from small meetups to large annual gatherings. They handle logistics, scheduling, and event promotion.',
        image: '/images/coll2.png',
      },
      {
        id: 3,
        name: 'Membership Committee',
        description: 'Handles member recruitment and retention.',
        details: 'The Membership Committee focuses on growing and maintaining the club\'s membership base. They develop strategies for attracting new members and ensuring current members remain engaged.',
        image: '/images/coll3.png',
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
        image: '/images/coll4.png',
      },
      {
        id: 5,
        name: 'Research Committee',
        description: 'Conducts and promotes research activities.',
        details: 'The Research Committee facilitates and encourages research initiatives among club members, organizing symposiums and collaborating with academic institutions.',
        image: '/images/coll5.png',
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
        image: '/images/coll6.png',
      },
      {
        id: 7,
        name: 'Arts and Culture Committee',
        description: 'Promotes artistic and cultural activities within the club.',
        details: 'The Arts and Culture Committee arranges exhibitions, performances, and cultural exchanges to celebrate diversity and creativity among club members.',
        image: '/images/coll7.png',
      },
      {
        id: 8,
        name: 'Social Events Committee',
        description: 'Plans casual social gatherings for members.',
        details: 'The Social Events Committee organizes informal meetups, game nights, and other social activities to foster friendships and networking among club members.',
        image: '/images/coll8.png',
      }
    ]
  }
];

const CommitteeCard = ({ committee }) => {
  return (
    <Link href={`/committee/${committee.id}`}>
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-96"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="h-48 relative">
          <Image
            src={committee.image}
            alt={committee.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-red-600 mb-2">{committee.name}</h3>
          <p className="text-sm text-gray-600">{committee.description}</p>
        </div>
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