import React from 'react';

const MainContent = () => {
    return (
        <section className="h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
            style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}>
            <h1 className="text-5xl font-bold">Welcome to Conventus</h1>
            <p className="mt-4 text-2xl">
                <span className="typewriter">Inspiring Innovation and Leadership</span>
            </p>
        </section>
    );
};

export default MainContent;
