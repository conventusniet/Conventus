import React, { useState } from 'react';
import { Users, Calendar, PiggyBank, BookOpen, Globe, Heart, Camera, Coffee, X } from 'lucide-react';

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
        members: 8
      },
      {
        id: 2,
        name: 'Events Committee',
        description: 'Plans and organizes club events and activities.',
        details: 'The Events Committee coordinates all club events, from small meetups to large annual gatherings. They handle logistics, scheduling, and event promotion.',
        icon: Calendar,
        members: 12
      },
      {
        id: 3,
        name: 'Membership Committee',
        description: 'Handles member recruitment and retention.',
        details: 'The Membership Committee focuses on growing and maintaining the club\'s membership base. They develop strategies for attracting new members and ensuring current members remain engaged.',
        icon: Users,
        members: 6
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
        members: 7
      },
      {
        id: 5,
        name: 'Research Committee',
        description: 'Conducts and promotes research activities.',
        details: 'The Research Committee facilitates and encourages research initiatives among club members, organizing symposiums and collaborating with academic institutions.',
        icon: Globe,
        members: 5
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
        members: 10
      },
      {
        id: 7,
        name: 'Arts and Culture Committee',
        description: 'Promotes artistic and cultural activities within the club.',
        details: 'The Arts and Culture Committee arranges exhibitions, performances, and cultural exchanges to celebrate diversity and creativity among club members.',
        icon: Camera,
        members: 8
      },
      {
        id: 8,
        name: 'Social Events Committee',
        description: 'Plans casual social gatherings for members.',
        details: 'The Social Events Committee organizes informal meetups, game nights, and other social activities to foster friendships and networking among club members.',
        icon: Coffee,
        members: 6
      }
    ]
  }
];

const CommitteePage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [joinedCommittees, setJoinedCommittees] = useState([]);

  const handleJoin = (committeeId, event) => {
    event.stopPropagation();
    if (!joinedCommittees.includes(committeeId)) {
      setJoinedCommittees([...joinedCommittees, committeeId]);
    } else {
      setJoinedCommittees(joinedCommittees.filter(id => id !== committeeId));
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Conventus Club Committees</h1>
      {committeeSections.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-2">{section.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.committees.map((committee) => (
              <div 
                key={committee.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedCommittee(committee)}
              >
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">{committee.name}</h3>
                  <committee.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 mb-4">{committee.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {committee.members} members
                    </span>
                    <button
                      onClick={(e) => handleJoin(committee.id, e)}
                      className={`px-4 py-1 rounded text-sm font-medium transition-colors duration-300 ${
                        joinedCommittees.includes(committee.id)
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {joinedCommittees.includes(committee.id) ? 'Leave' : 'Join'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedCommittee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <selectedCommittee.icon className="w-6 h-6 mr-2 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">{selectedCommittee.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedCommittee(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedCommittee.description}</p>
            <p className="mb-6 text-gray-700">{selectedCommittee.details}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedCommittee(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommitteePage;
