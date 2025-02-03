import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, ExternalLink } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyAzB3UMIo9hHjO-f5i6s0s6nLVG9i3CSK8');

const TypewriterEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const index = useRef(0);

    useEffect(() => {
        if (index.current < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index.current]);
                index.current += 1;
            }, 30);
            return () => clearTimeout(timeoutId);
        }
    }, [displayedText, text]);

    return <span>{displayedText}</span>;
};

const ConventusChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    text: "Hello! I'm the Conventus Club MUN assistant. How can I help you today? You can ask me about our events, registration, or how to contact us.",
                    sender: 'bot'
                }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
            setInputValue('');
            setIsLoading(true);

            try {
                const response = await getBotResponse(inputValue);
                setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
            } catch (error) {
                console.error('Error getting bot response:', error);
                setMessages(prev => [...prev, { text: "I'm sorry, I encountered an error. Please try again.", sender: 'bot' }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getBotResponse = async (userMessage) => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are an AI assistant for the Conventus Club MUN (Model United Nations) at NIET College, Greater Noida. Your responses should be focused on providing information about the club, MUN events, and related activities at NIET College. 

Additional information:
- The official website is conventusmun.com
- For registration, direct users to https://conventusmun.com/registration
- For contact, direct users to https://conventusmun.com/ContactForm

Please respond to the following query: "${userMessage}"

If the query is about registration or contacting the club, make sure to include the appropriate link in your response.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    };

    const renderMessage = (message) => {
        const text = message.text;
        const registrationLink = 'https://conventusmun.com/registration';
        const contactLink = 'https://conventusmun.com/ContactForm';

        if (text.includes(registrationLink) || text.includes(contactLink)) {
            return (
                <>
                    <TypewriterEffect text={text} />
                    <div className="mt-2">
                        {text.includes(registrationLink) && (
                            <a
                                href={registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                            >
                                Register <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                        {text.includes(contactLink) && (
                            <a
                                href={contactLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2"
                            >
                                Contact Us <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                    </div>
                </>
            );
        }
        return <TypewriterEffect text={text} />;
    };

    const chatVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
        exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={chatVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col overflow-hidden"
                    >
                        <motion.div
                            className="bg-red-600 text-white p-4 flex justify-between items-center"
                            whileHover={{ backgroundColor: '#C53030' }}
                        >
                            <h3 className="font-bold">Conventus Club MUN Chat</h3>
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={20} />
                            </motion.button>
                        </motion.div>
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            <AnimatePresence>
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        variants={messageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                                    >
                                        <span
                                            className={`inline-block p-2 rounded-lg ${message.sender === 'user'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {message.sender === 'bot' ? renderMessage(message) : message.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {isLoading && (
                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.span
                                        className="inline-block p-2 bg-gray-100 text-gray-800 rounded-lg"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        Thinking...
                                    </motion.span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask about Conventus Club MUN..."
                                    className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                                <motion.button
                                    onClick={handleSendMessage}
                                    className="bg-red-600 text-white p-2 rounded-r-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send size={20} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                    <MessageCircle size={24} />
                </motion.button>
            )}
        </div>
    );
};

export default ConventusChatbot;