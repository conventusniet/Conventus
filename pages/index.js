import React from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Leadership from '../components/Leadership';
import AboutConventus from '../components/AboutConventus';
import Contact from '../components/Contact';

const Index = () => {
    return (
        <div className="font-sans">
            <Header />
            <MainContent />
            <Leadership />
            <AboutConventus/>
            <Contact/>
        </div>
    );
};

export default Index;