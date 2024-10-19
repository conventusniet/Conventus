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
import ConventusChatbot from '@/components/ConventusChatBot';

const PersonCard = ({ name, position, image, info }) => {
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
                            {info}
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
        "/public/images/AB1.jpg",
        "public/images/AB2.jpg",
        "public/images/AB3.jpg",
        "public/images/AB4.jpg",
        "public/images/AB5.jpg",
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
            name: "Dr. Om Prakash Agarwal",
            position: "Managing Director",
            image: "/images/mb-mfmdbanner.jpg",
            info: "'Work is Worship'  Success is not a one-shot process. It is the result of a continuous improvement after each failure. The fear of failure needs to be captured in order for a person to learn from his failure too. It is an invaluable opportunity to rectify errors and move forward. Failure in working for a good cause is better than success in working for a wrong cause. Over the years now, NIET has built quite a special position in the private higher education sector. With its distinctive culture, it provides a clear student-centered environment in which to explore existing technical knowledge, and gain new learning at the leading edges of technology development. Our unique educational system ensures that you gain not just depth and breadth in your chosen area of specialization, but also a holistic set of skills that will equip you to face the real world. At every stage, there will be opportunities to expand your boundaries, platforms for collaboration and learning, and recognitions for those who strive to excel. Thus, I would like each one of you to join NIET and aspire as global leaders and a successful human being."
        },
        {
            name: "Dr. Neema Agarwal",
            position: "Additional Managing Director",
            image: "/images/amdbanner.jpg",
            info: "'Education is the most powerful weapon which you can use to change the world' - Nelson Mandela\n\nIn the course of last 20 years, many technical & management institutes have sprung up all over the country. Graduates passing out every year are highly optimistic that technical courses ensure a rewarding career. The economic, corporate, and social environments are undergoing radical changes. To survive, manage, and excel in this dynamically changing atmosphere, it demands engagement of professionals who are well informed, competent, courageous, and versatile. Beyond the academics, the curriculum at NIET is strongly linked with several recent themes like latest technologies needed by organizations, soft skills, communication, among others. Our approach has resulted in programs of study relevant to the leadership trends and challenges of tomorrow. Classroom learning is made interesting by highly qualified and experienced faculty through interactions, presentations, role plays, case studies and out bound learning programs. This is further reinforced by practical learning through industrial visits and summer training. Students regularly undergo personality development and grooming sessions that lead to both extrinsic and intrinsic confidence boosting and prepares them for the corporate world. We appreciate your interest and want you to know that we are here to bring you a leading edge technical education."
        },

        {
            name: "Dr. Raman Batra",
            position: "Executive Vice President",
            image: "/images/mfevpbanner.jpg",
            info: "This new generation is an interesting one. Most of them were born into a world where technology has always been at the forefront. These students rely on Google, texting, social media and Wi-Fi, and they view email - not letter writing - as a formal form of communication. NIET has been helping students write their own stories since its inception. Committed to providing the best jobs by creating life-changing educational opportunities and collaborative learning environments, we have stayed at the forefront of innovation in higher education, providing the tools our students need to make them industry ready from day one and make an impact in the world. NIET has a Pyramid Finishing School, which provides training to the students according to the industry requirements giving the individual student a 360 degree in employability skills. The institute has also made tie-ups with MNCs like Microsoft, Oracle, KPMG, ICICI Direct, Prometric, and Pearson. These tie-ups not only promise to enhance student employability by a manifold, but also take the lead in encouraging 'innovative' learning like never before. Taking the league forward, we have established various innovation labs to provide students hands-on experience in various modern-day technologies. We impart experiential learning and thereby progressively enhance the competencies of our teaching staff and our students. I, thus, invite you to join our movement to create corporate citizens who become role models, wherever they go, for developing their professional career. I promise you a challenging academic experience, with an international flavour, which will truly transform your lives."
        },
        {
            name: "Dr. Vinod M Kapse",
            position: "Director",
            image: "/images/mfdbanner.jpg",
            info: "Welcome to Noida Institute of Engineering & Technology, Gr. Noida. Ever since its inception in 2001, our endeavour at NIET has been to provide excellent quality of education and training to young minds aspiring to become engineers, managers, pharmacists, and technocrats. In order to achieve this goal, we have established an infrastructure that conforms to the bests in the world. Our faculty members are highly talented and qualified. Additionally, we invite the finest minds from the industry and academia as guest lecturers. With the help of a very supportive staff, we ensure a healthy learning atmosphere for our students. We motivate our students to dream big and guarantee that right spirit and necessary talent are inculcated in the students to help them realize their objectives. We also continuously strive to instil ethical values in our wards so that they become responsible citizens of tomorrow. NIET has always stood for quality and excellence and we make every effort to constantly upgrade and improve ourselves. These efforts have been recognized, appreciated, and awarded by prestigious educational bodies both in India and abroad. I wish you the very best as you choose to become a part of this exciting and vibrant learning community."
        },
    ];

    const mentors = [
        {
            name: "Dr. Manish Kaushik",
            position: "Dean Student Welfare",
            image: "/images/manishkaushik.jpg",
            info: "Welfare of student is of utmost importance to us. The office of Dean Students' Welfare is responsible for all the aspects of students' welfare. The office therefore always motivates the students towards their bright future by engaging them in different academic as well as co-curricular activities so as to fulfill their dreams. The office strives to enhance the students' overall personality and to provide better career opportunities. The office looks after the functioning of various societies and clubs under which students take active participation."
        },
        {
            name: "Miss Kanika Jindal",
            position: "Associate Dean Student Welfare",
            image: "/images/kanika.png",
            info: "Is working as an Associate Dean Student Welfare and Assistant Professor in the Department of Electronics and Communication Engineering with experience of 13 years. She is graduated with honors in Electronics and Communication Engineering from Uttar Pradesh Technical University in 2010. She is Gold Medalist in M.Tech (VLSI Design) from Uttar Pradesh Technical University in 2012. She is young and dynamic in organizing cultural and technical events."
        },
        {
            name: "Neeti Taneja Mam",
            position: "Faculty Coordinator Conventus",
            image: "/images/neetitaneja.png",
            info: "Neeti Taneja, as the faculty coordinator of the Conventus club, plays a crucial role in guiding and mentoring students in organizing major events, including debates, Model United Nations (MUN), and awareness sessions. Her leadership and support have significantly contributed to the growth and success of the club, helping students develop their skills in public speaking, diplomacy, and event management. She is also known for her academic excellence and dedication to the IT department, fostering an environment that encourages innovation and collaborative learning.."
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
            image: "/images/pragyasingh.jpg",
            info: "As Vice President of Conventus MUN Club, I am committed to fostering an environment where students can explore global issues, enhance their diplomatic skills, and develop into confident leaders. My role involves ensuring that every event and initiative aligns with our mission to inspire meaningful dialogue and promote global understanding. I am passionate about providing opportunities for members to grow, both personally and intellectually, as they engage in the world of international relations and diplomacy. Together, we strive to create lasting impact through thoughtful debate and collaborative solutions. Passionate about creating platforms where dialogue inspires change and diplomacy meets action. Dedicated to empowering students to think globally and lead with purpose"
        },
        {
            name: "Yashraj Ranjan",
            position: "Vice President",
            image: "/images/yashrajranjan.jpg",
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
                <ConventusChatbot/>
            </div>

            <hr className="mt-6 sm:mt-12" />
            <Footer />
        </div>
    )
}
