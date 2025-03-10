import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
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

const LeadershipSection = () => {
    const leaders = [
        {
            name: "Pragya Singh",
            position: "Secretary General",
            image: "/images/vp1.png",
            quote: "Building bridges across cultures through meaningful dialogue and shared understanding.",
            linkedin: "https://www.linkedin.com/in/pragya-singh-0715b9248/",
            instagram: "https://www.instagram.com/pragyasingghh/",
            github: "https://github.com/pragyasingh08/",
            phone: "+919953552547"
        },
        {
            name: "Manas Gupta",
            position: "Founder President",
            image: "/images/p1.png",
            quote: "Creating a platform where young minds can engage with complex global challenges and develop innovative solutions.",
            linkedin: "https://www.linkedin.com/in/manasgupta--/",
            instagram: "https://www.instagram.com/14manasgupta/",
            github: "https://github.com/14ManasGupta/",
            phone: "+919289452713"
        },
        {
            name: "Yashraj Ranjan",
            position: "Director General",
            image: "/images/1738895725813-removebg-preview.png",
            quote: "Empowering youth to become tomorrow's global leaders through diplomatic discourse and international cooperation.",
            linkedin: "https://www.linkedin.com/in/yashrajranjan29/",
            instagram: "https://www.instagram.com/yashrajranjan29/",
            github: "https://github.com/yashrajranjan29/",
            phone: "+917309328195"
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 py-20 px-4">
            <div className="container mx-auto">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center text-red-800 mb-16">
                    Our Leaders
                </h2>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
            </div>
        </div>
    );
};

export default LeadershipSection;