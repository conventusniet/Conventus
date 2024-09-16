import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-red-800">
                    Contact Us
                </h2>
                <div className="flex flex-wrap -mx-4 justify-between">
                    {/* Left Column - Map and Address */}
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-start mb-4">
                                <MapPin className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                <p className="text-lg text-gray-800">
                                    19, Institutional Area, Knowledge Park II, Greater Noida, Uttar Pradesh 201306
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-md h-64 lg:h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7272.647372248688!2d77.48567048001864!3d28.461737551967666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e055d148a1%3A0x9f5207f7f0bc8f63!2sNoida%20Institute%20of%20Engineering%20and%20Technology%20(NIET%2C%20Greater%20Noida)!5e0!3m2!1sen!2sin!4v1726474747676!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Column - Contact Information */}
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="bg-white rounded-lg shadow-md p-6 h-full">
                            <h3 className="text-2xl font-semibold mb-6 text-red-700">For More Information Contact Us -</h3>
                            <ContactPerson
                                name="Gauri Sareen"
                                title="Secretary General"
                                phone="+919810430090"
                                email="sgamimun@gmail.com"
                            />
                            <ContactPerson
                                name="Sagar CV"
                                title="Director General"
                                phone="+918373936260"
                                email="dgamimun@gmail.com"
                            />
                            <ContactPerson
                                name="Adisree Telem"
                                title="Charge' D' Affaires"
                                phone="+919863020623"
                                email="chargedaffairsamimun@gmail.com"
                            />
                            <ContactPerson
                                name="Khyati Saxena"
                                title="Chef D' Cabinet"
                                phone="+917428121611"
                                email="cdcamimun@gmail.com"
                            />
                            <ContactPerson
                                name="Amishi Arora"
                                title="USG Delegate Affairs"
                                phone="+918750800663"
                                email="delegateaffairsamimun24@gmail.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactPerson = ({ name, title, phone, email }) => (
    <div className="mb-4 last:mb-0">
        <h4 className="font-semibold text-lg text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <div className="flex items-center mb-1">
            <Phone className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{phone}</p>
        </div>
        <div className="flex items-center">
            <Mail className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{email}</p>
        </div>
    </div>
);

export default Contact;