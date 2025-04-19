import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, ChevronLeft, ChevronRight } from 'lucide-react';

const CommitteeImageCarousel = ({ images, committeeName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoPlayRef = useRef(null);
    
    const nextSlide = () => {
        if (images.length <= 1) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    
    const prevSlide = () => {
        if (images.length <= 1) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    useEffect(() => {
        autoPlayRef.current = nextSlide;
    });
    
    useEffect(() => {
        if (images.length <= 1) return;
        const play = () => {
            autoPlayRef.current();
        };
        const interval = setInterval(play, 4000);
        return () => clearInterval(interval);
    }, [images.length]);
    
    if (images.length === 0) return null;
    
    return (
        <div className="relative h-56 w-full">
            {/* Images container */}
            {images.map((img, idx) => (
                <motion.div
                    key={idx}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: idx === currentIndex ? 1 : 0,
                        zIndex: idx === currentIndex ? 1 : 0 
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={img}
                        alt={`${committeeName} - Image ${idx + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </motion.div>
            ))}
            
            {/* Persistent overlay with gradient and committee name - always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent flex items-end z-[5]">
                <h3 className="text-white font-bold text-xl p-4">{committeeName}</h3>
            </div>
            
            {/* Navigation controls */}
            {images.length > 1 && (
                <>
                    <button 
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 backdrop-blur-sm transition-all z-10"
                        onClick={prevSlide}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>
                    
                    <button 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 backdrop-blur-sm transition-all z-10"
                        onClick={nextSlide}
                        aria-label="Next image"
                    >
                        <ChevronRight size={20} className="text-white" />
                    </button>
                    
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const MUN2Winners = () => {
    const committees = [
        {
            name: "United Nations Security Council",
            images: [
                "/images/unsc_bg.jpg",
                "/images/unhrc_bg.jpg",
            ],
            winners: [
                { award: "Best Delegate", name: "Rakshit Kapoor", institute: "France" },
                { award: "High Commendation", name: "Stuti Agarwal", institute: "Greece" },
                { award: "Special Mention", name: "Deepanjali Sharma", institute: "Russia" },
                { award: "Verbal Mentions", names: ["Mohammed Akram (Qatar)", "Aakanksha Choudhary (Jordan)", "Piyush Thakur (UK)"] }
            ]
        },
        {
            name: "United Nations Human Rights Council",
            images: [
                "/images/unhrc_bg.jpg",
            ],
            winners: [
                { award: "Best Delegate", name: "Sarthak Srivastava", institute: "Saudi Arabia" },
                { award: "High Commendation", name: "", institute: "France" },
                { award: "Special Mention", name: "Ujala Khatri", institute: "USA" },
                { award: "Verbal Mentions", names: ["Adavya Pratap Singh (Luxembourg)", "Swayam Dhar Singh (Belgium)", "Purvi Bhasin (Uganda)", "Vibha Chauhan (Panama)", "Shafaque Praveen (Japan)"] }
            ]
        },
        {
            name: "All India Political Parties Meet",
            images: [
                "/images/aippm_bg.png",
            ],
            winners: [
                { award: "Best Delegate", name: "Soumya Mishra", institute: "Kapil Sibal" },
                { award: "High Commendation", name: "Kumar Satyam", institute: "Manoj Jha" },
                { award: "Special Mention", name: "Anushk Tyagi", institute: "S. Jaishankar" },
                { award: "Honorable & Verbal Mentions", names: ["Sujal Arora (Rahul Gandhi)", "Aryan Kushwaha (Shivraj Singh Chauhan)", "Surya Prakash (Piyush Goyal)", "Urvashi (Priyanka Gandhi)", "Himanshu Kumar (M.K. Stalin)"] }
            ]
        },
        {
            name: "International Press",
            images: [
                "/images/uip.jpeg",
            ],
            winners: [
                { award: "Best Journalist", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Best Photographer", name: "Coming Soon", institute: "Official Results Pending" },
                { award: "Best Cartoonist", name: "Coming Soon", institute: "Official Results Pending" }
            ]
        }
    ];

    const getAwardIcon = (award) => {
        if (award.includes("Best Delegate") || award.includes("Best Journalist"))
            return <Trophy className="w-5 h-5 text-yellow-500" />;
        else if (award.includes("High") || award.includes("Best Photographer"))
            return <Award className="w-5 h-5 text-gray-400" />;
        else
            return <Medal className="w-5 h-5 text-amber-700" />;
    };

    return (
        <section className="py-12 bg-white rounded-lg shadow-md mb-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-red-800">
                    Distinguished Delegates
                </h2>
                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {committees.map((committee, index) => (
                        <motion.div
                            key={index}
                            className="bg-red-50 rounded-lg shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <CommitteeImageCarousel 
                                images={committee.images} 
                                committeeName={committee.name} 
                            />
                            
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {committee.winners.map((winner, idx) => (
                                        <li key={idx} className="flex items-start space-x-3 p-3 bg-white rounded-md shadow-sm">
                                            {winner.names ? (
                                                <div className="mt-1">
                                                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                                                        <span className="text-xs font-semibold text-red-600">VM</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-1">
                                                    {getAwardIcon(winner.award)}
                                                </div>
                                            )}
                                            
                                            <div className="flex-1">
                                                <p className="font-semibold text-red-800">{winner.award}</p>
                                                
                                                {winner.names ? (
                                                    <div className="mt-1">
                                                        <ul className="text-sm text-gray-700 space-y-1">
                                                            {winner.names.map((name, i) => (
                                                                <li key={i} className="border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                                                                    {name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p className="text-gray-700">{winner.name}</p>
                                                        <p className="text-sm text-gray-500">{winner.institute}</p>
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MUN2Winners;