import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link href="/">Conventus</Link>
                </div>
                <nav className="hidden md:flex space-x-6 text-white">
                    <Link href="#about">About</Link>
                    <Link href="#president">President</Link>
                    <Link href="#contact">Contact</Link>
                    <Link href="#register">Register</Link>
                </nav>
                <div className="md:hidden">
                    <button id="hamburger" aria-label="Open Menu">☰</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
