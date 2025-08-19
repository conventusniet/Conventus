import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AlumniLeadershipSection from '../components/AlumniLeadershipSection';

const FounderPage = () => {
    // Founder data
    const founder = [
        {
            name: "Manas Gupta",
            position: "Founder President",
            image: "/images/p1.png",
            quote: "Creating a platform where young minds can engage with complex global challenges and develop innovative solutions.",
            linkedin: "https://www.linkedin.com/in/manasgupta--/",
            instagram: "https://www.instagram.com/14manasgupta/",
            github: "https://github.com/14ManasGupta/",
            phone: "+919289452713"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100">
            <Header />
            
            <main>
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 text-white py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-4">Founder</h1>
                        <p className="text-xl text-red-100">
                            The Visionary Behind Conventus
                        </p>
                    </div>
                </div>

                {/* Founder Section */}
                <AlumniLeadershipSection 
                    leaders={founder} 
                    sectionTitle="Founder" 
                    isFounderSection={true}
                />
            </main>

            <Footer />
        </div>
    );
};

export default FounderPage;
