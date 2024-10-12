import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Maincontent from '../components/Maincontent';
import Contact from '../components/Contact';
import LearnMoreSection from '../components/LearnMore';
import Footer from '../components/Footer';
import LazyLoading from '../components/LazyLoading';
import DussehraGreeting from '../components/DussehraGreeting';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowGreeting(true);
    }, 4000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LazyLoading onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <Head>
        <title>Conventus - NIET College Club | Model United Nations (MUN)</title>
        <meta name="description" content="Conventus is the premier college club at NIET, focusing on Model United Nations (MUN) and fostering global awareness, leadership, and diplomatic skills among students." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.conventusmun.com/" />
        <meta property="og:title" content="Conventus - NIET College Club | Model United Nations (MUN)" />
        <meta property="og:description" content="Join Conventus, the leading MUN club at NIET, and develop your diplomatic skills, global awareness, and leadership abilities." />
        <meta property="og:image" content="https://www.conventusmun.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.conventusmun.com/" />
        <meta property="twitter:title" content="Conventus - NIET College Club | Model United Nations (MUN)" />
        <meta property="twitter:description" content="Join Conventus, the leading MUN club at NIET, and develop your diplomatic skills, global awareness, and leadership abilities." />
        <meta property="twitter:image" content="https://www.conventusmun.com/twitter-image.jpg" />

        {/* Keywords */}
        <meta name="keywords" content="Conventus, MUN, Model United Nations, NIET, college club, diplomatic skills, global awareness, leadership, student organization, Noida" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.conventusmun.com/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Conventus",
              "description": "Conventus is the premier college club at NIET, focusing on Model United Nations (MUN) and fostering global awareness, leadership, and diplomatic skills among students.",
              "url": "https://www.conventusmun.com/",
              "logo": "https://www.conventusmun.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/ConventusNIET",
                "https://twitter.com/ConventusNIET",
                "https://www.instagram.com/conventus_niet/"
              ]
            }
          `}
        </script>
      </Head>

      {showGreeting && <DussehraGreeting onClose={() => setShowGreeting(false)} />}

      <Header />
      <main>
        <Welcome />
        <Maincontent />
        <LearnMoreSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}