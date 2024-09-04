import React from 'react';
import Link from 'next/link';

const Registration = () => {
    return (
        <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Join Conventus</h2>
                <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded">
                    Register Now
                </Link>
            </div>
        </section>
    );
};

export default Registration;
