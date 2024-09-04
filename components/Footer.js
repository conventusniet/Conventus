import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <p>© 2024 Conventus. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <Link href="/">Home</Link>
                    <Link href="#about">About</Link>
                    <Link href="#contact">Contact</Link>
                    <Link href="#register">Register</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
