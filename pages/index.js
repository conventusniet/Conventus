import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Leadership from '../components/Leadership';
import AboutConventus from '../components/AboutConventus';
import Contact from '../components/Contact';
import Registration from '../components/Registration';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Head>
                <title>Conventus Club</title>
                <meta name="description" content="Official website of the Conventus Club" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <MainContent />
            <Leadership />
            <AboutConventus />
            <Contact />
            <Registration />
            <Footer />
        </>
    );
}
