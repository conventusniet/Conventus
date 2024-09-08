import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Leadership from '../components/Leadership';
import AboutConventus from '../components/AboutConventus';
import Contact from '../components/Contact';
import RegistrationButton from '../components/RegistrationButton';
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
        <Leadership />
        <AboutConventus />
        <Contact />
        <RegistrationButton /> 
      </main>

      <Footer />
    </div>
  )
}