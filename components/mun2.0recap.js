import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, BookOpen, MessageSquare } from 'lucide-react';

const MUN2Recap = () => {
    const stats = [
        { icon: <Users className="w-10 h-10 text-red-600" />, value: '200+', label: 'Delegates' },
        { icon: <Globe className="w-10 h-10 text-red-600" />, value: '4', label: 'Committees' },
        { icon: <BookOpen className="w-10 h-10 text-red-600" />, value: '12', label: 'Resolutions' },
        { icon: <MessageSquare className="w-10 h-10 text-red-600" />, value: '48', label: 'Hours of Debate' },
    ];
    
    return (
        <section className="py-12 bg-white rounded-lg shadow-md mb-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-red-800">
                    Conference Recap
                </h2>
                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
                
                <motion.div
                    className="text-lg text-gray-700 text-center max-w-4xl mx-auto space-y-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <p>
                        The Secretariat is pleased to announce the successful conclusion
                        of the 2nd Edition of NIET Conventus Model United Nations 2025.
                        Building upon our inaugural assembly, this year's conference
                        elevated diplomatic discourse to unprecedented heights.
                    </p>

                    <p>
                        Distinguished delegates from across the region convened for two
                        days of substantive debate, coalition-building, and resolution
                        drafting. The committees addressed critical global challenges,
                        from climate security to international peacekeeping frameworks,
                        with delegates demonstrating exceptional diplomatic acumen and
                        negotiation skills.
                    </p>

                    <p>
                        The Dais extends formal recognition to all participating
                        delegations, honorable chairs, and esteemed faculty advisors
                        whose contributions ensured the conference's diplomatic success
                        and substantive excellence.
                    </p>
                </motion.div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-red-50 p-6 rounded-lg text-center flex flex-col items-center shadow-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {stat.icon}
                            <span className="text-4xl font-bold text-red-800 mt-3">{stat.value}</span>
                            <span className="text-gray-600 font-medium">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MUN2Recap;