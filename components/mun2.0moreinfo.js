import React from 'react';
import { Phone } from 'lucide-react';

const ContactInformation = () => {
    const contacts = [
        {
            name: "Pragya Singh",
            designation: "Secretary General",
            phone: "+91 99535 52547"
        },
        {
            name: "Yashraj Ranjan",
            designation: "Director General",
            phone: "+91 73093 28195"
        },
        {
            name: "Shagun Mishra",
            designation: "Chef De Cabinet",
            phone: "+91 97736 49728"
        },
        {
            name: "Ameya Atreya",
            designation: "Delegate Affairs",
            phone: "+91 84488 35989"
        }
    ];

    return (
        <section className="py-12 bg-red-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-red-800">
                    Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                            <div className="pb-2">
                                <h3 className="text-xl font-semibold text-red-800">
                                    {contact.name}
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-2">{contact.designation}</p>
                                <div className="flex items-center text-gray-700">
                                    <Phone className="h-4 w-4 mr-2 text-red-600" />
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="hover:text-red-600 transition-colors duration-300"
                                    >
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactInformation;