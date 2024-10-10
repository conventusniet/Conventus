import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X, Play, Pause } from 'lucide-react';


const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { image: '/images/coll1.png', title: 'Ink & Insights', subtitle: 'Explore the World of Writing' },
        { image: '/images/coll2.png', title: 'Student Perspectives', subtitle: 'Fresh Voices in Literature' },
        { image: '/images/coll3.png', title: 'Author Spotlights', subtitle: 'Meet the Minds Behind the Books' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative h-[60vh] overflow-hidden">
            {slides.map((slide, index) => (
                <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentSlide === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-red-900 bg-opacity-70 flex flex-col justify-center items-center text-white">
                        <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                        <p className="text-xl">{slide.subtitle}</p>
                    </div>
                </motion.div>
            ))}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
            >
                <ChevronLeft size={28} />
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
            >
                <ChevronRight size={28} />
            </button>
        </div>
    );
};

const YouTubeShort = ({ videoId, isPlaying, isMuted, onTogglePlay, onToggleMute }) => {
    return (
        <div className="relative w-full pt-[177.78%]">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            {/* Custom play button overlay */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={onTogglePlay}
                >
                    <div className="bg-red-600 rounded-full p-4">
                        <Play size={48} color="white" />
                    </div>
                </div>
            )}
            {/* Control buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                    className="bg-white p-2 rounded-full z-10"
                    onClick={onToggleMute}
                >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <button
                    className="bg-white p-2 rounded-full z-10"
                    onClick={onTogglePlay}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
        </div>
    );
};

const AuthorSection = ({ image, name, bio, reversed }) => (
    <div className={`flex flex-col md:flex-row items-center my-12 ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Image
                src={image}
                alt={name}
                width={300}
                height={400}
                objectFit="cover"
                className="rounded-lg"
            />
        </div>
        <div className="w-full md:w-2/3 md:px-8">
            <h3 className="text-2xl font-bold mb-4 text-red-800">{name}</h3>
            <p className="text-lg text-red-700">{bio}</p>
        </div>
    </div>
);
const MediaGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const images = [
        '/images/coll1.png', '/images/coll2.png', '/images/coll3.png',
        '/images/coll5.png', '/images/coll6.png', '/images/coll7.png', '/images/coll8.png',
        '/images/coll1.png', '/images/coll2.png', '/images/coll3.png',
        '/images/coll5.png', '/images/coll6.png', '/images/coll7.png', '/images/coll8.png',
        '/images/coll1.png', '/images/coll2.png', '/images/coll3.png', '/images/coll1.png', '/images/coll2.png', '/images/coll3.png',
    ];

    return (
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            width={400}
                            height={300}
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            layoutId={selectedImage}
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected image"
                                width={800}
                                height={600}
                                objectFit="contain"
                            />
                            <motion.button
                                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={24} />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InkAndInsightsPage = () => {
    const youtubeShorts = [
        'EGVbRNW4SJE',
        'EGVbRNW4SJE',
        'EGVbRNW4SJE'
    ];
    const [playingVideo, setPlayingVideo] = useState(1); // Default to middle video (index 1)
    const [mutedVideos, setMutedVideos] = useState([true, false, true]); // Middle video unmuted by default

    const handleTogglePlay = (index) => {
        if (playingVideo !== index) {
            // Pause and mute the previously playing video
            setMutedVideos(prev => prev.map((_, i) => i !== index));
        }
        setPlayingVideo(prevIndex => prevIndex === index ? null : index);
    };

    const handleToggleMute = (index) => {
        setMutedVideos(prev => prev.map((muted, i) => i === index ? !muted : muted));
    };

    const authors = [
        { image: '/images/coll4.png', name: 'S.P. Mittson', bio: 'S.P. Mittson is a remarkable figure who has successfully transitioned from a career as a Chartered Accountant (CA) to becoming an acclaimed author. Her journey from the corporate world of finance to the realm of literature is truly inspiring, demonstrating her versatility and passion for storytelling. Her debut novel, The Wandering Star, has quickly gained widespread attention and is now an Amazon Best Seller, a testament to her skill in weaving captivating narratives that resonate deeply with readers.

Despite her background in finance, S.P. Mittson’s literary talent has allowed her to make a significant mark in the publishing world. Her ability to create rich, immersive stories filled with emotion and depth has garnered her a dedicated readership. Currently, she is working with one of India’s top publishing houses, which further solidifies her status as an emerging literary talent in the country.

Her unique perspective, shaped by her experience as a CA, gives her stories a distinctive edge, blending precision with creativity. With her growing reputation and the success of her debut, S.P. Mittson is undoubtedly a rising star in contemporary Indian literature, and readers eagerly await her future works.' },
        { image: '/images/coll4.png', name: 'Pranay Bhalerao', bio: 'Pranay Bhalerao is a distinguished author and a rising star in the literary world, known for his captivating storytelling and gripping narratives. He is the author of the Amazon Best Seller The Lost World Trilogy, a series that gained widespread acclaim for its immersive world-building and intricate plots. Building on this success, Pranay is currently working on the second book of the Kavaach Trilogy, which has already become a best-selling series, captivating readers with its thrilling storyline and complex characters.  
In addition to his accomplishments as an author, Pranay also works at T-Systems, a global leader in IT services and consulting. His ability to balance a successful career in the corporate world while excelling in his creative pursuits has earned him numerous accolades, including awards for his literary work. With a unique blend of creativity and technical expertise, Pranay continues to inspire and captivate readers worldwide.
' },
        { image: '/images/coll4.png', name: 'Tanisha Tiwari', bio: 'Tanisha Tiwari is a highly acclaimed, award-winning author with a powerful voice in contemporary literature. Her debut book quickly rose to the top, becoming an Amazon Best Seller, a testament to her ability to connect with readers through her engaging writing and thought-provoking themes. Beyond her success as an author, Tanisha has an impressive professional background, having worked with The Times of India, one of the country’s leading news organizations, where she demonstrated her skills in journalism and content creation.  
Tanisha also played a significant role in heading content for the G20 Global Summit, showcasing her leadership and expertise in handling high-stakes global events. She is currently working on her next book, which is eagerly anticipated and set to be published by one of the biggest names in the publishing industry. With her growing reputation in both the literary and media worlds, Tanisha Tiwari continues to make a significant impact with her insightful and compelling work.' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-red-50">
            <Header />
            <HeroCarousel />
            <main className="flex-grow container mx-auto px-4 py-12">
                <section className="mb-16">
                    <h1 className="text-5xl font-bold text-center mb-8 text-red-800">
                        Ink & Insights
                    </h1>
                    <p className="text-xl text-center mb-12 text-red-600">
                        Welcome to Ink & Insights, where we celebrate the art of writing, showcase emerging talents, and connect readers with authors. Dive into our world of literary exploration and creativity.
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="text-3xl text-center font-bold mb-8 text-red-800">Our Students on Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {youtubeShorts.map((videoId, index) => (
                            <YouTubeShort
                                key={index}
                                videoId={videoId}
                                isPlaying={playingVideo === index}
                                isMuted={mutedVideos[index]}
                                onTogglePlay={() => handleTogglePlay(index)}
                                onToggleMute={() => handleToggleMute(index)}
                            />
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl text-center font-bold mb-8 text-red-800">About the Authors</h2>
                    {authors.map((author, index) => (
                        <AuthorSection
                            key={index}
                            image={author.image}
                            name={author.name}
                            bio={author.bio}
                            reversed={index % 2 !== 0}
                        />
                    ))}
                </section>

                <section>
                    <h2 className="text-3xl text-center font-bold mb-8 text-red-800">Media Gallery</h2>
                    <MediaGallery />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default InkAndInsightsPage;
