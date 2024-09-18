import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Maincontent from '../components/Maincontent';
import Contact from '../components/Contact';
import LearnMoreSection from '../components/LearnMore';
import Footer from '../components/Footer';
import LazyLoading from '../components/LazyLoading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LazyLoading onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <Head>
        <title>conventus - College Club</title>
        <meta name="description" content="Your website description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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