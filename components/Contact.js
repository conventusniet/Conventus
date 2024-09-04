import React from 'react';

const Contact = () => {
    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-4xl font-bold">Contact Us</h2>
                    <p className="mt-4">You can reach us via the following methods:</p>
                    <p className="mt-2">Email: contact@conventus.com</p>
                    <p className="mt-2">Phone: +123 456 7890</p>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">Get in Touch</h2>
                    <form className="mt-4">
                        <input type="text" placeholder="Your Name" className="w-full p-2 mb-4 border rounded" />
                        <input type="email" placeholder="Your Email" className="w-full p-2 mb-4 border rounded" />
                        <textarea placeholder="Your Message" className="w-full p-2 mb-4 border rounded"></textarea>
                        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Send</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
