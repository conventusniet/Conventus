import React from 'react';

const Leadership = () => {
    const leaders = [
        { name: 'Manas Gupta', position: 'President', image: '/john.jpg' },
        { name: 'Pragya', position: 'Vice President', image: '/jane.jpg' },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Meet Our Leaders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {leaders.map((leader) => (
                        <div key={leader.name} className="flex flex-col items-center">
                            <img src={leader.image} alt={leader.name} className="w-48 h-48 rounded-full object-cover" />
                            <h3 className="mt-4 text-2xl font-semibold">{leader.name}</h3>
                            <p className="text-blue-600">{leader.position}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
