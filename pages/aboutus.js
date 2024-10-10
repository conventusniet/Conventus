import React, { useState, useEffect } from 'react';
import { X, Menu, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import Aboutpara from '@/components/aboutpara'
import { TestimonialOne } from '@/components/testmono'
import Header from '@/components/Header';
import Oheader from '../components/OHeader';
import Footer from '../components/Footer';
import RegistrationButton from '../components/RegistrationButton'
import Image from 'next/image';
import Link from 'next/link';
import JoinSection from '@/components/JoinSection';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PersonCard = ({ name, position, image, info }) => {
    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    return (
        <motion.div
            className="w-72 h-96 [perspective:1000px] group sm:w-full sm:max-w-sm md:w-96 lg:w-80"
            whileHover={{ scale: 1.05 }}
        >
            <motion.div
                className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
                {/* Front of the card */}
                <div className="absolute inset-0">
                    <Image
                        className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                        src={image}
                        alt={name}
                        width={288}
                        height={384}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-black p-4 rounded-b-xl">
                        <h3 className="text-xl font-bold">{name}</h3>
                        <p className="font-medium">{position}</p>
                    </div>
                </div>

                {/* Back of the card */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-red-50 px-6 py-8 text-center text-gray-800 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto">
                    <div className="flex min-h-full flex-col items-center justify-start">
                        <h3 className="text-2xl font-bold mb-4 text-red-800 font-sans">{name}</h3>
                        <p className="text-base leading-relaxed font-sans text-gray-700 tracking-wide">
                            {truncateText(info, 150)}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const TeamSection = ({ title, members }) => (
    <div className="my-8 sm:my-16">
        <h3 className="text-3xl sm:text-5xl text-gray-800 mb-10 sm:mb-10 text-center">{title}</h3>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {members.map((member, index) => (
                <PersonCard key={index} {...member} />
            ))}
        </div>
    </div>
);

const Carousel = () => {
    const images = [
        "/images/coll1.png",
        "/images/coll2.png",
        "/images/coll3.png",
        // "/images/coll4.png",
        "/images/coll5.png",
    ];

    const CustomArrow = ({ direction, onClick }) => (
        <button
            onClick={onClick}
            className={`absolute z-10 top-1/2 transform -translate-y-1/2 ${direction === 'left' ? 'left-4' : 'right-4'
                } bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300`}
        >
            {direction === 'left' ? (
                <ChevronLeft size={24} className="text-gray-800" />
            ) : (
                <ChevronRight size={24} className="text-gray-800" />
            )}
        </button>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomArrow direction="left" />,
        nextArrow: <CustomArrow direction="right" />,
    };

    return (
        <div className="w-full h-[calc(100vh-80px)] relative overflow-hidden">
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index} className="focus:outline-none">
                        <div className="w-full h-[calc(100vh-80px)] relative">
                            <Image
                                src={img}
                                alt={`Carousel image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                priority={index === 0}
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default function AboutPageOne() {
    const management = [
        {
            name: "John Doe",
            position: "CEO",
            image: "/images/coll1.png",
            info: "John Doe is visionary leader with over 10 years of experience in tech management. His innovative approach has guided numerous startups to success, making him a respected figure in the industry. John's expertise spans strategic planning, team building, and fostering a culture of innovation. He is passionate about leveraging technology to solve real-world problems and is known for his ability to inspire and motivate teams to achieve exceptional results. Under his leadership, the company has seen remarkable growth and has established itself as a pioneer in cutting-edge technologies."
        },
        {
            name: "Jane Smith",
            position: "COO",
            image: "/images/coll2.png",
            info: "Jane Smith is an accomplished executive with a proven track record in operations and strategy. With her keen analytical skills and deep understanding of business processes, she has successfully streamlined operations across various departments. Jane's expertise in project management and resource allocation has been instrumental in optimizing the company's efficiency and productivity. She is known for her collaborative leadership style and ability to navigate complex challenges. Jane's forward-thinking approach to operations has not only improved internal processes but has also significantly enhanced customer satisfaction and company growth."
        },
        {
            name: "Mike Johnson",
            position: "CTO",
            image: "/images/coll3.png",
            info: "Mike Johnson is a tech enthusiast and innovator, passionate about pushing the boundaries of technology. With a background in computer science and years of experience in software development, Mike has been at the forefront of adopting and implementing cutting-edge technologies. His expertise spans artificial intelligence, blockchain, and cloud computing. Mike is known for fostering a culture of continuous learning and innovation within the tech team. He has spearheaded several groundbreaking projects that have positioned the company as a technology leader in the industry. Mike's vision and technical acumen continue to drive the company's technological advancements."
        },
    ];

    const mentors = [
        {
            name: "Dr. Emily Brown",
            position: "Senior Mentor",
            image: "/images/coll4.png",
            info: "Dr. Emily Brown brings a wealth of knowledge and experience to her role as Senior Mentor. With a PhD in Computer Science and 15 years of teaching experience, she has shaped the minds of countless students and professionals. Her research in machine learning and data analytics has been widely recognized in academic circles. Dr. Brown is passionate about bridging the gap between theoretical knowledge and practical application. She has developed innovative teaching methodologies that have significantly improved student engagement and learning outcomes. Her mentorship extends beyond technical skills, focusing also on professional development and ethical considerations in technology."
        },
        {
            name: "Prof. David Lee",
            position: "Research Mentor",
            image: "/images/coll5.png",
            info: "Professor David Lee is a leading expert in AI and Machine Learning, with numerous publications and patents to his name. His groundbreaking research has contributed significantly to advancements in natural language processing and computer vision. As a Research Mentor, Prof. Lee guides students and researchers in exploring the frontiers of AI technology. He is known for his ability to simplify complex concepts and inspire creative problem-solving. Prof. Lee's mentorship has led to several award-winning research projects and has helped launch the careers of many prominent AI researchers. He is a strong advocate for responsible AI development and regularly speaks on ethical considerations in technology."
        },
        {
            name: "Sarah Wilson",
            position: "Industry Mentor",
            image: "/images/coll6.png",
            info: "Sarah Wilson brings 20 years of invaluable experience from Silicon Valley to her role as Industry Mentor. Her career spans multiple tech giants and successful startups, giving her a unique perspective on the industry's evolution. Sarah's expertise in product management, market strategy, and tech entrepreneurship makes her an invaluable resource for aspiring tech professionals. She is known for her practical, results-oriented approach to mentoring, helping mentees navigate real-world challenges in the tech industry. Sarah is passionate about promoting diversity in tech and has initiated several programs to support underrepresented groups in the field. Her network and insights continue to open doors for many in the tech community."
        },
    ];

    const leaders = [
        {
            name: "Manas Gupta",
            position: "President",
            image: "/images/President.jpg",
            info: "Manas Gupta is a visionary leader whose passion for innovation and community building has been the driving force behind Conventus's success. With a background in technology and a keen understanding of student needs, Manas has revolutionized the way Conventus operates and engages with its members. His strategic mindset has led to the implementation of several successful initiatives that have significantly increased student participation and community impact. Manas is known for his inclusive leadership style, always encouraging diverse perspectives and fostering a culture of collaboration. Under his guidance, Conventus has expanded its reach and formed valuable partnerships with industry leaders, enhancing opportunities for all members."
        },
        {
            name: "Pragya Singh",
            position: "Vice President",
            image: "/images/Vice President.jpg",
            info: "As Vice President of Conventus MUN Club, I am committed to fostering an environment where students can explore global issues, enhance their diplomatic skills, and develop into confident leaders. My role involves ensuring that every event and initiative aligns with our mission to inspire meaningful dialogue and promote global understanding. I am passionate about providing opportunities for members to grow, both personally and intellectually, as they engage in the world of international relations and diplomacy. Together, we strive to create lasting impact through thoughtful debate and collaborative solutions. Passionate about creating platforms where dialogue inspires change and diplomacy meets action. Dedicated to empowering students to think globally and lead with purpose"
        },
        {
            name: "Yashraj Ranjan",
            position: "Vice President",
            image: "/images/vice President2.jpg",
            info: "Yashraj Ranjan is the operational backbone of Conventus, excelling in logistics and process optimization. His meticulous attention to detail and exceptional problem-solving skills have transformed Conventus's internal operations, making them more efficient and effective. Yashraj has implemented several technological solutions that have streamlined membership management, event planning, and communication processes. His forward-thinking approach has not only improved the day-to-day running of Conventus but has also enhanced the overall member experience. Yashraj is known for his ability to handle complex challenges with ease and for his commitment to continuous improvement. His efforts have significantly contributed to Conventus's growth and its ability to serve an ever-expanding membership base."
        },
    ];

    return (
        <div className="bg-[#EEEFF2]">
            <Header />
            <Carousel />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-1 pb-10 pt-12 md:pt-24 sm:space-y-1">
                    <h1 className="text-5xl font-bold text-center">About</h1>
                    <div className="flex justify-center min-h-[200px]">

                        <p className="max-w-4xl text-base sm:text-2xl text-center text-gray-600 md:text-xl">The Conventusl Model United Nations Club is a student-centric body that allows us to provide a forum that will serve to engage with a transforming world and combine it with the ability to adapt that is integral to the NIET’S Vision as a bridge between delegates from various backgrounds, united in their ardour for debate and dialogue. We aim to encourage delegates to understand the fundamental working of the United Nations, where diplomacy, debate, and global engagement come to life! At Conventus, we are driven by a passion for international affairs, leadership, and collaboration. Our mission is to cultivate a platform that nurtures critical thinking, problem-solving, and public speaking skills, empowering students to take on the role of global leaders. We believe that every voice matters, and together, we can contribute to shaping a more just, peaceful, and interconnected world. Whether you're a seasoned MUN enthusiast or new to the world of diplomacy, our doors are always open for those who wish to make a difference. Conventus MUN offers more than just an extracurricular activity; it provides a transformative experience that prepares students for leadership roles both within and beyond the academic sphere. Looking to the future, Conventus MUN aims to establish itself as a renowned conference for its active engagement in national and international MUN circuits. We envision expanding our outreach by collaborating with other universities and organizations, hosting prestigious MUN conferences, and continuously evolving to meet the needs of a changing world. Our team is committed to promoting diplomacy, leadership, and global awareness through innovative events, engaging discussions, and impactful MUN conferences. Together, we ensure that Conventus remains a space where students can grow, connect, and make a difference. Our vision is to create a legacy of diplomats and leaders who are not only knowledgeable but also compassionate, ethical, and driven to create a better future for all. The talent is there, and the future is clear : We want to continue our MUN journey into the future with more experience and motivation and belief in our fellow young student diplomats. With endless opportunities for learning, personal growth, and making a global impact, Conventus is the perfect place for anyone who believes in the power of dialogue and action. Step into the world of diplomacy, engage with global issues, and be part of a community that strives to build bridges of understanding.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center mb-2">
                    <div className="space-y-6 md:w-3/4">
                        <h3 className="text-4xl sm:text-6xl font-bold text-gray-800 text-center">Meet Our Team</h3>
                        <p className="max-w-4xl text-base sm:text-2xl text-gray-700 md:text-xl">
                            At the heart of Conventus MUN Club is a dedicated team of passionate and driven individuals who work tirelessly to bring the club’s vision to life. Together, we ensure that Conventus remains a space where students can grow, connect, and make a differen
                        </p>
                    </div>
                </div>
                <TeamSection title="Management" members={management} />
                <TeamSection title="Mentors" members={mentors} />
                <div className="my-16 sm:my-32">
                    <h3 className="text-4xl sm:text-6xl mt-20 text-gray-800 mb-10 sm:mb-20 text-center">Leaders</h3>
                    <div className="flex flex-col items-center gap-12 sm:gap-24">
                        <PersonCard {...leaders[0]} />
                        <div className="flex flex-col md:flex-row justify-center gap-12 sm:gap-24 w-full">
                            <PersonCard {...leaders[1]} />
                            <PersonCard {...leaders[2]} />
                        </div>
                    </div>
                </div>
                <Aboutpara />
                <JoinSection />
            </div>

            <hr className="mt-6 sm:mt-12" />
            <Footer />
        </div>
    )
}
