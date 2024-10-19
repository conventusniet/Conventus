import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-red-800">
                    C O N T A C TㅤU S
                </h2>

                {/* Leadership Profiles */}
                <div className="mb-20">
                    <h3 className="text-2xl font-semibold text-center mb-12 text-red-700">Our Technical Team</h3>
                    <div className="flex flex-wrap justify-center gap-16">
                        <LeadershipProfile
                            name="Sanskar Bhardwaj"
                            designation="Technical Head"
                            branch="Information Technology"
                            imageUrl="/images/sanskar.jpg"
                        />
                        <LeadershipProfile
                            name="Anubhav Singh"
                            designation="Technical Co-Head"
                            branch="Data Science"
                            imageUrl="/images/sanskar.jpg"
                        />
                        <LeadershipProfile
                            name="Revant Khanna"
                            designation="Technical Co-Head"
                            branch="Artificial Intelligence"
                            imageUrl="/images/sanskar.jpg"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-4 justify-between">
                    {/* Left Column - Map and Address */}
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-start mb-4">
                                <MapPin className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                <p className="text-lg text-gray-800">
                                    NIET Plot-19, Institutional Area, Knowledge Park II, Greater Noida, Uttar Pradesh 201306
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
                        <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center">
                            <h3 className="text-2xl font-semibold mb-8 text-red-700 text-center">For More Information Contact Us</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <ContactPerson
                                    name="Manas Gupta"
                                    title="President"
                                    phone="+91 9289452713"
                                    email="4th Year"
                                />
                                <ContactPerson
                                    name="Yashraj Ranjan"
                                    title="Vice - President"
                                    phone="+91 7309328195"
                                    email="3rd Year"
                                />
                                <ContactPerson
                                    name="Pragya Singh"
                                    title="Vice - President"
                                    phone="+91 9953552547"
                                    email="3rd Year"
                                />
                                <ContactPerson
                                    name="Shagun Mishra"
                                    title="Head Co-Ordinator"
                                    phone="+91 9773649728"
                                    email="3rd Year"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const LeadershipProfile = ({ name, designation, branch, imageUrl }) => (
    <div className="flex flex-col items-center">
        <div className="w-52 h-52 rounded-3xl overflow-hidden mb-6 transform transition-transform duration-300 hover:scale-105 shadow-lg">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-semibold text-xl text-gray-800 mb-2">{name}</h4>
        <p className="text-lg text-red-600 font-medium mb-1">{designation}</p>
        <p className="text-md text-gray-600">{branch}</p>
    </div>
);

const ContactPerson = ({ name, title, phone, email }) => (
    <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
        <h4 className="font-semibold text-lg text-gray-800 mb-2">{name}</h4>
        <p className="text-sm text-red-600 font-medium mb-3">{title}</p>
        <div className="flex items-center justify-center mb-2">
            <Phone className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{phone}</p>
        </div>
        <div className="flex items-center justify-center">
            <Mail className="w-4 h-4 text-red-600 mr-2" />
            <p className="text-sm text-gray-700">{email}</p>
        </div>
    </div>
);

export default Contact;