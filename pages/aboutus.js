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
            className="w-64 h-96 [perspective:1000px] group sm:w-full sm:max-w-sm md:w-80 lg:w-64"
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
                        width={256}
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
    <div className="my-16 sm:my-32">
        <h3 className="text-3xl sm:text-5xl mt-20  text-gray-800 mb-10 sm:mb-20 text-center">{title}</h3>
        <div className="flex flex-wrap justify-center gap-12 sm:gap-24">
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
        "/images/coll4.png",
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
        speed: 300,
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
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                <h2 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
                                    NIET Model United Nations 2024
                                </h2>
                            </div>
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
            info: "John Doe is a visionary leader with over 10 years of experience in tech management. His innovative approach has guided numerous startups to success, making him a respected figure in the industry. John's expertise spans strategic planning, team building, and fostering a culture of innovation. He is passionate about leveraging technology to solve real-world problems and is known for his ability to inspire and motivate teams to achieve exceptional results. Under his leadership, the company has seen remarkable growth and has established itself as a pioneer in cutting-edge technologies."
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
            info: "Pragya Singh brings a wealth of experience in event management and student engagement to her role as Vice President of Conventus. Her creative approach to programming has resulted in a series of highly successful and innovative events that have become hallmarks of the Conventus experience. Pragya's dedication to understanding and meeting student needs has led to record-breaking attendance and satisfaction rates at Conventus events. She has a talent for identifying emerging trends and incorporating them into Conventus's offerings, keeping the organization at the cutting edge of student engagement. Pragya's leadership has also strengthened Conventus's relationships with sponsors and partners, securing valuable resources and opportunities for members."
        },
        {
            name: "Yashraj Ranjan",
            position: "Vice President",
            image: "/images/vice President2.jpg",
            info: "Yashraj Ranjan is the operational backbone of Conventus, excelling in logistics and process optimization. His meticulous attention to detail and exceptional problem-solving skills have transformed Conventus's internal operations, making them more efficient and effective. Yashraj has implemented several technological solutions that have streamlined membership management, event planning, and communication processes. His forward-thinking approach has not only improved the day-to-day running of Conventus but has also enhanced the overall member experience. Yashraj is known for his ability to handle complex challenges with ease and for his commitment to continuous improvement. His efforts have significantly contributed to Conventus's growth and its ability to serve an ever-expanding membership base."
        },
    ];
    // if (isLoading) {
    //     return <LazyLoading onLoadingComplete={() => setIsLoading(false)} />;
    // }

    return (
        <div className="bg-[#EEEFF2]">
            {/* <Oheader /> */}
            <Header/>

            <Carousel />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24 sm:space-y-16">
                    <p className="text-3xl sm:text-5xl font-bold text-gray-900 text-center md:text-5xl md:leading-10 sm:leading-tight">
                        NIET Model United Nations 2024 by Conventus Club
                    </p>
                    <div className="flex items-center justify-center min-h-[200px]">
                        <p className="max-w-4xl text-base sm:text-2xl text-center text-gray-600 md:text-xl">
                            Hosted by the Conventus Club, NIET MUN 2024 offers delegates a platform to explore the workings of the United Nations, sharpen diplomatic skills, and engage in global discussions. With dynamic committees, expert speakers, and interactive workshops, this year's conference promises a more immersive and enriching experience than ever before.
                        </p>
                    </div>
                </div>
                <hr className="mt-8 sm:mt-8" />

                {/* greetings */}
                <div className="flex items-center justify-center">
                    <div className="space-y-6 sm:space-y-12 md:w-3/4">
                        {/* <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                            <p className="text-xs font-semibold leading-normal md:text-sm sm:text-base">Join Us &rarr;</p>
                        </div> */}
                        <h3 className="text-4xl sm:text-6xl mt-20 font-bold text-gray-800 mb-10 sm:mb-20 text-center">Meet Our Team</h3>
                        <p className="max-w-4xl text-base sm:text-2xl text-gray-700 md:text-xl">
                            Our approach is straightforward — bring together a diverse, driven group of individuals and cultivate a culture that inspires everyone to achieve their best.
                        </p>
                    </div>
                </div>

                {/* TEAM */}
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

                {/*About Para*/}
                <Aboutpara />

                {/* Hiring Banner */}
                {/* <div className="flex flex-col items-center gap-x-4 gap-y-8 sm:gap-y-16 py-16 sm:py-32 md:flex-row">
                    <div className="space-y-6 sm:space-y-12">
                        <p className="text-sm sm:text-base font-semibold md:text-base text-red-500">Join Conventus &rarr;</p>
                        <p className="text-3xl sm:text-5xl font-bold md:text-4xl">We&apos;re just getting started</p>
                        <p className="text-base sm:text-2xl text-gray-600 md:text-lg">
                            Conventus is a dynamic student organization dedicated to fostering leadership, innovation, and community engagement among college students.
                        </p>
                        <RegistrationButton />
                    </div>
                    <div className="md:mt-0 mt-10 w-full">
                        <img
                            src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                            alt="Getting Started"
                            className="rounded-lg"
                        />
                    </div>
                </div> */}
                <JoinSection/>
            </div>
            <hr className="mt-6 sm:mt-12" />
            <Footer />
        </div>
    )
}