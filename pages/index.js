import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Maincontent from '../components/Maincontent';
import Contact from '../components/Contact';
import LearnMoreSection from '../components/LearnMore';
import leaders from '@/components/leaders';
import LeadershipPage from '@/components/leaders';
import Footer from '../components/Footer';
import LazyLoading from '../components/LazyLoading';
import ConventusChatbot from '@/components/ConventusChatBot';

import DiwaliModal from '@/components/DiwaliModal';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDiwaliModal, setShowDiwaliModal] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LazyLoading onLoadingComplete={() => setIsLoading(false)} />;
  }

  const handleDiwaliModalClose = () => {
    setShowDiwaliModal(false);
  };


  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <title>Conventus MUN NIET | Best Model United Nations Society in Greater Noida</title>
        <meta name="description" content="Join Conventus - NIET's Premier Model United Nations Society. Experience world-class MUN conferences, develop leadership skills, and engage in global diplomacy. Official MUN club of NIET Greater Noida." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta charSet="utf-8" />

        {/* Enhanced Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.conventusmun.com/" />
        <meta property="og:site_name" content="Conventus MUN NIET" />
        <meta property="og:title" content="Conventus MUN NIET | Leading Model United Nations Society" />
        <meta property="og:description" content="Discover Conventus - NIET's Official Model United Nations Society. Join the most prestigious MUN club in Greater Noida. Develop diplomatic skills, leadership abilities, and global awareness through immersive MUN experiences." />
        <meta property="og:image" content="https://www.conventusmun.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />

        {/* Enhanced Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ConventusNIET" />
        <meta name="twitter:creator" content="@ConventusNIET" />
        <meta name="twitter:url" content="https://www.conventusmun.com/" />
        <meta name="twitter:title" content="Conventus MUN NIET | Leading Model United Nations Society" />
        <meta name="twitter:description" content="Discover Conventus - NIET's Official Model United Nations Society. Join the most prestigious MUN club in Greater Noida. Develop diplomatic skills, leadership abilities, and global awareness through immersive MUN experiences." />
        <meta name="twitter:image" content="https://www.conventusmun.com/twitter-image.jpg" />

        {/* Extended Keywords */}
        <meta name="keywords" content="Conventus, MUN, Model United Nations, NIET, NIET Greater Noida, college club, diplomatic skills, global awareness, leadership, student organization, Noida, Greater Noida MUN, best MUN society, NIET clubs, NIET societies, MUN conferences, debate society, public speaking, international relations, United Nations" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Conventus MUN NIET" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="theme-color" content="#1a365d" />

        {/* Alternative Languages */}
        <link rel="alternate" hrefLang="en-IN" href="https://www.conventusmun.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.conventusmun.com/" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.conventusmun.com/" />

        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Conventus MUN NIET",
              "alternateName": ["Conventus", "NIET MUN Society"],
              "description": "Conventus is NIET's premier Model United Nations society, dedicated to fostering diplomatic skills, leadership abilities, and global awareness among students through immersive MUN experiences.",
              "url": "https://www.conventusmun.com/",
              "logo": "https://www.conventusmun.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/ConventusNIET",
                "https://twitter.com/ConventusNIET",
                "https://www.instagram.com/conventus_niet/",
                "https://www.linkedin.com/company/conventus-niet",
                "https://www.niet.co.in/clubs/conventus"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Greater Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201310",
                "addressCountry": "IN"
              },
              "parentOrganization": {
                "@type": "EducationalOrganization",
                "name": "Noida Institute of Engineering and Technology",
                "url": "https://www.niet.co.in"
              },
              "member": {
                "@type": "OrganizationRole",
                "roleName": "Student Society",
                "memberOf": {
                  "@type": "Organization",
                  "name": "NIET Greater Noida"
                }
              }
            }
          `}
        </script>
        {/* Additional Event Schema for MUN Conferences */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Event",
                  "name": "Conventus MUN Conference",
                  "description": "Annual Model United Nations conference organized by Conventus NIET",
                  "organizer": {
                    "@type": "Organization",
                    "name": "Conventus MUN NIET",
                    "url": "https://www.conventusmun.com"
                  },
                  "location": {
                    "@type": "Place",
                    "name": "NIET Greater Noida Campus",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Greater Noida",
                      "addressRegion": "Uttar Pradesh",
                      "addressCountry": "IN"
                    }
                  }
                }
              ]
            }
          `}
        </script>
      </Head>

      {/* Diwali Modal - Only show if not closed */}
      {DiwaliModal && !isLoading && (
        <DiwaliModal onClose={handleDiwaliModalClose} />
      )}

      <Header />
      <main>
        <Welcome />
        <Maincontent />
        <LearnMoreSection />
        <LeadershipPage />
        <Contact />
        <ConventusChatbot />
      </main>
      <Footer />
    </>
  );
}