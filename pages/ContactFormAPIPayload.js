import {React,useState} from 'react';
import axios from 'axios'; // Import axios for API calls

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponseMessage('');

        try {
            const response = await axios.post('https://conventus.pythonanywhere.com/api/contact/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.data && response.data.message) {
                setResponseMessage(response.data.message);
            } else {
                setResponseMessage('Your message has been sent successfully.');
            }
            setFormData({ name: '', email: '', message: '' }); // Clear the form
        } catch (err) {
            setError('Failed to send the message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold mb-8 text-red-600 text-center">Contact Us</h2>
            <div className="mb-8">
                <label htmlFor="name" className="block text-gray-700 text-xl font-bold mb-3">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xl text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                />
            </div>
            <div className="mb-8">
                <label htmlFor="email" className="block text-gray-700 text-xl font-bold mb-3">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xl text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                />
            </div>
            <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 text-xl font-bold mb-3">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 text-xl text-gray-700 border rounded-lg focus:outline-none focus:border-red-500"
                    required
                ></textarea>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {responseMessage && <p className="text-green-500 text-center mb-4">{responseMessage}</p>}
            <div className="flex items-center justify-center">
                <motion.button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-xl focus:outline-none focus:shadow-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
            </div>
        </motion.form>
    );
};
export default ContactForm;