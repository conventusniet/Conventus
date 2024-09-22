import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Instagram, Linkedin, TreeDeciduous } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Conventus</h3>
                        <p className="text-gray-400">Empowering students to lead, innovate, and make a difference.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <ul className="space-y-2">
                            {[
                                { name: 'Linktree', icon: TreeDeciduous, url: 'https://linktr.ee/conventusclub' },
                                { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/niet_conventus/' },
                                { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/niet-conventus/' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-400 hover:text-red-400 transition duration-300"
                                    >
                                        <item.icon className="w-5 h-5 mr-2" />
                                        <span className="font-['Berlingske-Serif']">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <address className="text-gray-400 not-italic">
                            19, Institutional Area, <br />
                            Knowledge Park II,<br />
                            Greater Noida,<br />
                            Uttar Pradesh, 201306<br />
                            Email: info@conventus.edu<br />
                            Contact: +91 - 844-838-4611
                        </address>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400">
                    © {currentYear} Conventus. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;