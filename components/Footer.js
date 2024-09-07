import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-4">Conventus</h3>
                        <p>Empowering students to lead, innovate, and make a difference.</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul>
                            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                            <li><Link href="#about" className="hover:text-gray-300">About</Link></li>
                            <li><Link href="#contact" className="hover:text-gray-300">Contact</Link></li>
                            <li><Link href="/registration" className="hover:text-gray-300">Register</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <ul>
                            <li><a href="#" className="hover:text-gray-300">Facebook</a></li>
                            <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
                            <li><a href="#" className="hover:text-gray-300">Instagram</a></li>
                            <li><a href="#" className="hover:text-gray-300">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <p>123 Campus Drive</p>
                        <p>College Town, ST 12345</p>
                        <p>Email: info@conventus.edu</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Conventus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;