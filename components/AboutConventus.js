import React from 'react';
import Image from 'next/image';

const AboutConventus = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">About Conventus</h2>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Image src="/images/conventus-event.jpg" alt="Conventus Event" width={500} height={300} className="rounded-lg shadow-lg" />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <p className="text-lg mb-4">
                            Conventus is a dynamic student organization dedicated to fostering leadership, innovation, and community engagement among college students.
                        </p>
                        <p className="text-lg mb-4">
                            Our mission is to provide a platform for students to develop their skills, network with peers and professionals, and make a positive impact on campus and beyond.
                        </p>
                        <p className="text-lg">
                            Through workshops, seminars, and collaborative projects, Conventus empowers the next generation of leaders to tackle real-world challenges and drive meaningful change.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutConventus;