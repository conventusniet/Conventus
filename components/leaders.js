"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Github, Instagram, PhoneIcon as WhatsApp } from "lucide-react"

const SocialIcon = ({ href, icon: Icon, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-${color}-600 hover:text-${color}-800 transition-colors`}
    >
        <Icon size={24} />
    </a>
)

const LeadershipCard = ({ name, role, imageUrl, description, socialLinks }) => (
    <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="w-64 h-64 rounded-3xl overflow-hidden mb-6 transform transition-transform duration-300 hover:scale-105 shadow-lg">
            <Image
                src={imageUrl || "/placeholder.svg"}
                alt={name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
            />
        </div>
        <h4 className="font-semibold text-2xl text-gray-800 mb-2">{name}</h4>
        <p className="text-xl text-red-600 font-medium mb-1">{role}</p>
        <p className="text-lg text-gray-600 mb-4">{description}</p>

        <div className="flex space-x-4">
            {socialLinks.linkedin && <SocialIcon href={socialLinks.linkedin} icon={Linkedin} color="blue" />}
            {socialLinks.github && <SocialIcon href={socialLinks.github} icon={Github} color="gray" />}
            {socialLinks.instagram && <SocialIcon href={socialLinks.instagram} icon={Instagram} color="pink" />}
            {socialLinks.whatsapp && <SocialIcon href={socialLinks.whatsapp} icon={WhatsApp} color="green" />}
        </div>
    </motion.div>
)

const leaders = [
    {
        name: "Anubhav Singh",
        role: "Technical Co-Head",
        imageUrl: "/images/tech_2.jpg",
        branch: "CSE - DS",
        socialLinks: {
            linkedin: "https://linkedin.com/in/anubhav-singh99",
            github: "https://github.com/AnubhavSingh99",
            instagram: "https://www.instagram.com/anu.bhav_skywalker",
            whatsapp: "https://wa.me/+917088963373",
        },
    },
    {
        name: "Sanskar Bhardwaj",
        role: "Technical Head",
        imageUrl: "/images/sanskar.jpg",
        branch: "Information Technology",
        socialLinks: {
            linkedin: "https://linkedin.com/in/sanskar-bhardwaj-618b82244",
            github: "https://github.com/Quantsanskar",
            instagram: "https://instagram.com/sanskar_.bhardwaj_",
            whatsapp: "https://wa.me/+917289939775",
        },
    },

    {
        name: "Revant Khanna",
        role: "Technical Co-Head",
        imageUrl: "/images/Revant.jpg",
        branch: "CSE - AI",
        socialLinks: {
            linkedin: "https://linkedin.com/in/revant-khanna-0b7447216",
            github: "https://github.com/revant7",
            instagram: "https://www.instagram.com/revant_72",
            whatsapp: "https://wa.me/+919870525753",
        },
    },
]

const LeadershipPage = () => (
    <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-white overflow-hidden">
            <div className="container mx-auto px-4 py-12">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-semibold text-center text-red-700 mb-6"
                >
                    O U R&nbsp;&nbsp;T E C H N I C A L&nbsp;&nbsp;T E A M
                </motion.h3>

                <motion.p
                    className="text-center mb-12 max-w-2xl mx-auto text-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Our dedicated technical team brings a wealth of expertise and innovation to Conventus MUN. With their combined
                    skills in various domains of computer science and information technology, they ensure seamless execution of
                    all technical aspects of our events.
                </motion.p>

                <div className="flex flex-wrap justify-center gap-24">
                    {leaders.map((leader, index) => (
                        <LeadershipCard key={leader.name} {...leader} />
                    ))}
                </div>
            </div>
        </main>
    </div>
)

export default LeadershipPage

