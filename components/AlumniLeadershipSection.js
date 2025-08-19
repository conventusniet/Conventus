import React from 'react';
import Image from 'next/image';
import { Quote, Award, Sparkles } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const LeaderCard = ({ image, name, position, quote, linkedin, instagram, github, phone }) => (
    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 relative">
        {/* Quote Mark */}
        <div className="absolute -top-4 left-8">
            <Quote className="w-8 h-8 text-red-800 bg-white rounded-full p-1" />
        </div>

        <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-red-100 rounded-full" />
            <Image
                src={image}
                alt={name}
                fill
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center top'
                }}
                priority
            />
        </div>

        {/* Quote Text */}
        <p className="text-gray-700 text-lg text-center mb-6 italic leading-relaxed">
            {quote}
        </p>

        {/* Name and Position */}
        <div className="text-center">
            <h3 className="text-xl font-bold text-red-800 mb-1">{name}</h3>
            <p className="text-gray-600">{position}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-4">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-red-600 hover:text-red-800 transition" />
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-red-600 hover:text-red-800 transition" />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-red-600 hover:text-red-800 transition" />
            </a>
            <a href={`tel:${phone}`}>
                <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-red-600 hover:text-red-800 transition" />
            </a>
        </div>
    </div>
);

const FounderCard = ({ image, name, position, quote, linkedin, instagram, github, phone }) => (
    <div className="bg-gradient-to-br from-white via-red-50 to-red-100 rounded-3xl shadow-2xl p-12 transform hover:scale-105 transition-all duration-500 relative border-4 border-red-200 max-w-2xl mx-auto">
        {/* Award Icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-full p-3 shadow-lg">
                <Award className="w-10 h-10 text-white" />
            </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8">
            <div className="w-3 h-3 bg-red-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-12 right-12">
            <div className="w-2 h-2 bg-red-500 rounded-full opacity-80"></div>
        </div>
        <div className="absolute bottom-20 left-12">
            <div className="w-4 h-4 bg-red-300 rounded-full opacity-50"></div>
        </div>
        <div className="absolute top-20 right-8">
            <div className="w-2 h-8 bg-red-200 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-32 right-16">
            <div className="w-6 h-2 bg-red-300 rounded-full opacity-30"></div>
        </div>

        {/* Enhanced Quote Mark */}
        <div className="absolute top-6 right-8">
            <Quote className="w-12 h-12 text-red-700 bg-white rounded-full p-3 shadow-lg" />
        </div>

        <div className="relative w-80 h-80 mx-auto mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-400 rounded-full" />
            <div className="absolute inset-2 bg-white rounded-full shadow-inner" />
            <div className="absolute inset-4 overflow-hidden rounded-full ring-4 ring-red-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center top'
                    }}
                    priority
                />
            </div>
        </div>

        {/* Quote Text */}
        <p className="text-gray-700 text-xl text-center mb-8 italic leading-relaxed font-medium">
            "{quote}"
        </p>

        {/* Name and Position */}
        <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-red-800 mb-2">{name}</h3>
            <div className="flex items-center justify-center space-x-3">
                <div className="h-px bg-red-400 w-12"></div>
                <p className="text-red-600 font-semibold text-lg">{position}</p>
                <div className="h-px bg-red-400 w-12"></div>
            </div>
            <p className="text-gray-600 text-sm mt-3 font-medium">The Visionary Behind Conventus</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-red-50 border border-red-100">
                    <FontAwesomeIcon icon={faLinkedin} className="w-7 h-7 text-red-600 group-hover:text-red-800 transition" />
                </div>
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-red-50 border border-red-100">
                    <FontAwesomeIcon icon={faInstagram} className="w-7 h-7 text-red-600 group-hover:text-red-800 transition" />
                </div>
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-red-50 border border-red-100">
                    <FontAwesomeIcon icon={faGithub} className="w-7 h-7 text-red-600 group-hover:text-red-800 transition" />
                </div>
            </a>
            <a href={`tel:${phone}`} className="group">
                <div className="bg-white rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-red-50 border border-red-100">
                    <FontAwesomeIcon icon={faPhone} className="w-7 h-7 text-red-600 group-hover:text-red-800 transition" />
                </div>
            </a>
        </div>

        {/* Founding Year Badge */}
        <div className="absolute bottom-4 right-4">
            <div className="bg-red-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-red-700">
                Est. 2023
            </div>
        </div>
    </div>
);

const AlumniLeadershipSection = ({ leaders, sectionTitle, isFounderSection = false }) => {
    return (
        <div className={`min-h-screen bg-gradient-to-b from-red-50 to-red-100 py-20 px-4 ${isFounderSection ? 'bg-gradient-to-br from-red-100 via-red-50 to-white' : ''}`}>
            <div className="container mx-auto">
                {/* Section Title */}
                <h2 className={`text-4xl font-bold text-center text-red-800 mb-16 ${isFounderSection ? 'text-5xl mb-20' : ''}`}>
                    {isFounderSection && (
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="h-1 bg-red-400 w-16 rounded"></div>
                            <span>{sectionTitle}</span>
                            <div className="h-1 bg-red-400 w-16 rounded"></div>
                        </div>
                    )}
                    {!isFounderSection && sectionTitle}
                </h2>

                {/* Cards Container */}
                {isFounderSection ? (
                    <div className="flex justify-center">
                        {leaders.map((leader, index) => (
                            <FounderCard
                                key={index}
                                name={leader.name}
                                position={leader.position}
                                image={leader.image}
                                quote={leader.quote}
                                linkedin={leader.linkedin}
                                instagram={leader.instagram}
                                github={leader.github}
                                phone={leader.phone}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={`max-w-7xl mx-auto ${
                        leaders.length <= 2 
                            ? 'flex flex-col items-center gap-8' 
                            : 'grid grid-cols-1 md:grid-cols-3 gap-8'
                    }`}>
                        {leaders.map((leader, index) => (
                            <LeaderCard
                                key={index}
                                name={leader.name}
                                position={leader.position}
                                image={leader.image}
                                quote={leader.quote}
                                linkedin={leader.linkedin}
                                instagram={leader.instagram}
                                github={leader.github}
                                phone={leader.phone}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumniLeadershipSection;
