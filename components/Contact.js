import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section className="py-12 bg-gradient-to-br from-red-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                

                {/* Leadership Profiles */}
                <div className="mb-20">
                    <h3 className="text-2xl font-semibold text-center mb-12 text-red-700">Our Technical Team</h3>
                    <div className="flex flex-wrap justify-center gap-24">
                        <LeadershipProfile
                            name="Sanskar Bhardwaj"
                            designation="Technical Head"
                            branch="Information Technology"
                            imageUrl="/images/sanskar.jpg"
                        />
                        <LeadershipProfile
                            name="Anubhav Singh"
                            designation="Technical Co-Head"
                            branch="CSE - DS"
                            imageUrl="/images/anubhav.jpg"
                        />
                        <LeadershipProfile
                            name="Revant Khanna"
                            designation="Technical Co-Head"
                            branch="CSE - AI"
                            imageUrl="/images/revant.jpg"
                        />
                    </div>
                    <motion.p
                        className="text-center mt-12 max-w-2xl mx-auto text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Our dedicated technical team brings a wealth of expertise and innovation to Conventus MUN.
                        With their combined skills in various domains of computer science and information technology,
                        they ensure seamless execution of all technical aspects of our events.
                    </motion.p>
                </div>

                <h2 className="text-4xl font-bold text-center mb-12 text-red-800">
                    C O N T A C TㅤU S
                </h2>

                <div className="flex flex-wrap -mx-4 justify-between">
                    {/* Left Column - Map and Address */}
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6 mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-start mb-4">
                                <MapPin className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                <p className="text-lg text-gray-800">
                                    NIET Plot-19, Institutional Area, Knowledge Park II, Greater Noida, Uttar Pradesh 201306
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="rounded-lg overflow-hidden shadow-md h-64 lg:h-80"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7272.647372248688!2d77.48567048001864!3d28.461737551967666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e055d148a1%3A0x9f5207f7f0bc8f63!2sNoida%20Institute%20of%20Engineering%20and%20Technology%20(NIET%2C%20Greater%20Noida)!5e0!3m2!1sen!2sin!4v1726474747676!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    </div>

                    {/* Right Column - Contact Information */}
                    <div className="w-full lg:w-1/2 px-4">
                        <motion.div
                            className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
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
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const LeadershipProfile = ({ name, designation, branch, imageUrl }) => (
    <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="w-64 h-64 rounded-3xl overflow-hidden mb-6 transform transition-transform duration-300 hover:scale-105 shadow-lg">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-semibold text-2xl text-gray-800 mb-2">{name}</h4>
        <p className="text-xl text-red-600 font-medium mb-1">{designation}</p>
        <p className="text-lg text-gray-600">{branch}</p>
    </motion.div>
);

const ContactPerson = ({ name, title, phone, email }) => (
    <motion.div
        className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
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
    </motion.div>
);

export default Contact;