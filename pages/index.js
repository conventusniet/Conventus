import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Maincontent from '../components/mainContent';
import Contact from '../components/Contact';
import LearnMoreSection from '../components/LearnMore';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Conventus - College Club</title>
        <meta name="description" content="Conventus college club website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <Welcome />
        <Maincontent/>
        <LearnMoreSection/>
        <Contact />
      </main>

      <Footer />
    </div>
  )
}