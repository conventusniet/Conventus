import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Building, MapPin } from 'lucide-react';

const RegistrationForm = () => {
    return (
        <motion.form
            className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {[
                { id: 'name', label: 'Name', icon: User, type: 'text' },
                { id: 'mobile', label: 'Mobile No.', icon: Phone, type: 'tel' },
                { id: 'email', label: 'Email', icon: Mail, type: 'email' },
                { id: 'organization', label: 'Organization/Institute/University', icon: Building, type: 'text' },
            ].map((field) => (
                <div key={field.id} className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                        <field.icon className="inline-block mr-2 text-red-600" size={18} />
                        {field.label}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300"
                        id={field.id}
                        type={field.type}
                        placeholder={`Your ${field.label}`}
                    />
                </div>
            ))}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    <MapPin className="inline-block mr-2 text-red-600" size={18} />
                    Address
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-300"
                    id="address"
                    placeholder="Your Address"
                    rows="3"
                ></textarea>
            </div>
        </motion.form>
    );
};

export default RegistrationForm;