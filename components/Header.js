import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 fixed w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-3xl font-bold">
                    <Link href="/">Conventus</Link>
                </div>
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex space-y-4 md:space-y-0 md:space-x-6 text-white absolute md:relative top-16 md:top-0 left-0 md:left-auto bg-purple-600 md:bg-transparent w-full md:w-auto p-4 md:p-0`}>
                    <Link href="#about" className="block md:inline-block hover:text-purple-200 transition duration-300">About</Link>
                    <Link href="#leadership" className="block md:inline-block hover:text-purple-200 transition duration-300">Leadership</Link>
                    <Link href="#contact" className="block md:inline-block hover:text-purple-200 transition duration-300">Contact</Link>
                    <Link href="#register" className="block md:inline-block bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-purple-200 transition duration-300">Register</Link>
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Toggle Menu">
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;