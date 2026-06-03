import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AlumniLeadershipSection from '../components/AlumniLeadershipSection';
import PageHeader from '../components/PageHeader';

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
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                <PageHeader
                    eyebrow="Our Origins"
                    title="The Founder"
                    subtitle="The visionary behind Conventus."
                />

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
