import React from 'react';

const MainContent = () => {
    return (
        <section className="min-h-screen bg-cover bg-center text-white flex flex-col justify-center items-center px-4"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")' }}>
            <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Conventus</h1>
                <p className="mt-4 text-xl md:text-3xl">
                    <span className="typewriter">Inspiring Innovation and Leadership</span>
                </p>
                <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                    Learn More
                </button>
            </div>
        </section>
    );
};

export default MainContent;