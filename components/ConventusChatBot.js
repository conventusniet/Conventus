import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, ExternalLink, Bot, User, Sparkles, Minimize2 } from 'lucide-react';

// Akash Chat API configuration
const AKASH_API_BASE_URL = 'https://chatapi.akash.network/api/v1';
const AKASH_API_KEY = 'sk-TNsjOxd5JnuOirScxHJjxQ'; // Replace with your actual API key

// HTTP client for Akash Chat API
const akashChatAPI = {
    async post(endpoint, data) {
        const response = await fetch(`${AKASH_API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AKASH_API_KEY}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
};

const TypewriterEffect = ({ text, className = "" }) => {
    const [displayedText, setDisplayedText] = useState('');
    const index = useRef(0);

    useEffect(() => {
        setDisplayedText('');
        index.current = 0;
    }, [text]);

    useEffect(() => {
        if (index.current < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index.current]);
                index.current += 1;
            }, 20);
            return () => clearTimeout(timeoutId);
        }
    }, [displayedText, text]);

    return <span className={className}>{displayedText}</span>;
};

const ConventusChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [iconSize, setIconSize] = useState(20); // default for small screens

    useEffect(() => {
        const updateSize = () => {
            const isLargeScreen = window.innerWidth >= 1024; // Tailwind 'lg' breakpoint
            setIconSize(isLargeScreen ? 40 : 20);
        };

        updateSize(); // Initial check
        window.addEventListener('resize', updateSize); // Update on resize
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    text: "Hello! I'm the Conventus Club MUN assistant. How can I help you today? You can ask me about our events, registration, or how to contact us.",
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            const userMessage = inputValue.trim();
            setMessages(prev => [...prev, {
                text: userMessage,
                sender: 'user',
                timestamp: new Date()
            }]);
            setInputValue('');
            setIsLoading(true);

            try {
                const response = await getBotResponse(userMessage);
                // Clean the response and ensure it's a valid string
                const cleanResponse = (response || '').toString().trim();
                if (cleanResponse) {
                    setMessages(prev => [...prev, {
                        text: cleanResponse,
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                } else {
                    setMessages(prev => [...prev, {
                        text: "I'm sorry, I didn't receive a proper response. Please try again.",
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                }
            } catch (error) {
                console.error('Error getting bot response:', error);
                setMessages(prev => [...prev, {
                    text: "I'm sorry, I encountered an error. Please try again later.",
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getBotResponse = async (userMessage) => {
        try {
            const response = await akashChatAPI.post('/chat/completions', {
                model: "Meta-Llama-3-1-8B-Instruct-FP8",
                messages: [
                    {
                        role: "system",
                        content: `You are an AI assistant for the Conventus Club MUN (Model United Nations) at NIET College, Greater Noida. Your responses should be focused on providing information about the club, MUN events, and related activities at NIET College. 

Additional information:
- The official website is conventusmun.com
- For registration, direct users to: https://conventusmun.com/registration
- For contact, direct users to: https://conventusmun.com/ContactForm

Keep responses concise, helpful, and professional. If the query is about registration or contacting the club, make sure to mention the appropriate links in your response.`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            });

            // Safely extract the response content with fallback
            const content = response?.choices?.[0]?.message?.content;
            if (!content || typeof content !== 'string') {
                throw new Error('Invalid response format from API');
            }

            return content.trim();
        } catch (error) {
            console.error('Akash API Error:', error);
            throw error;
        }
    };

    const renderMessage = (message) => {
        const text = message.text || '';
        const registrationLink = 'https://conventusmun.com/registration';
        const contactLink = 'https://conventusmun.com/ContactForm';

        // Clean the text by removing any trailing "undefined" or similar artifacts
        const cleanText = text.replace(/undefined$/, '').trim();

        if (cleanText.includes(registrationLink) || cleanText.includes(contactLink)) {
            return (
                <div className="space-y-4">
                    <TypewriterEffect text={cleanText} />
                    <div className="flex flex-wrap gap-3 pt-2">
                        {cleanText.includes(registrationLink) && (
                            <a
                                href={registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Register Now
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                        {cleanText.includes(contactLink) && (
                            <a
                                href={contactLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                            >
                                Contact Us
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                    </div>
                </div>
            );
        }
        return <TypewriterEffect text={cleanText} />;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-inter">
            {/* Chat Window */}
            {isOpen && (
                <div className={`mb-4 bg-white rounded-2xl shadow-1xl border border-gray-200/50 overflow-hidden backdrop-blur-xl transition-all duration-300 ${isMinimized
                    ? 'w-16 h-16'
                    : 'lg:w-[420px] lg:h-[600px] w-[300px] h-[400px] max-h-[80vh]'
                    } flex flex-col animate-in slide-in-from-bottom-4`}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
                        <div className="relative flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold lg:text-xl md:text-lg text-sm tracking-tight">Conventus MUN</h3>
                                
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-red-300"
                                >
                                    <X size={iconSize} />
                                </button>
                            </div>
                        </div>
                        {/* <div className="absolute -bottom-2 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-6 -left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div> */}
                    </div>

                    {/* Messages Container */}
                    {!isMinimized && (
                        <>
                            <div className="flex-grow overflow-y-auto px-2 py-2 space-y-6 bg-gradient-to-b from-gray-50/50 to-white">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-50 slide-in-from-bottom-2 duration-500`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start space-x-3 max-w-[85%] group">
                                            {message.sender === 'bot' && (
                                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-red-100 group-hover:ring-red-200 transition-all duration-200">
                                                    <Bot className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                            <div className="flex flex-col space-y-1 max-w-full">
                                                <div
                                                    className={`px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 ${message.sender === 'user'
                                                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-md shadow-red-200/50 hover:shadow-red-200/70'
                                                        : 'bg-white border border-gray-200/80 text-gray-800 rounded-bl-md hover:border-gray-300/80 hover:shadow-md'
                                                        }`}
                                                >
                                                    <div className="leading-relaxed">
                                                        {message.sender === 'bot' ? renderMessage(message) : message.text}
                                                    </div>
                                                </div>
                                                <span className={`text-xs text-gray-400 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${message.sender === 'user' ? 'text-right' : 'text-left'
                                                    }`}>
                                                    {formatTime(message.timestamp)}
                                                </span>
                                            </div>
                                            {message.sender === 'user' && (
                                                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-200">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Loading indicator */}
                                {isLoading && (
                                    <div className="flex justify-start animate-in fade-in-50">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-red-100">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="bg-white border border-gray-200/80 px-5 py-4 rounded-2xl rounded-bl-md shadow-sm">
                                                <div className="flex space-x-1.5">
                                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-gray-100">
                                <div className="flex items-center space-x-2 bg-gray-50/80 rounded-2xl p-1 border-2 border-gray-200/80 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-lg transition-all duration-200">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                                        placeholder="Type your message here..."
                                        className="flex-grow bg-transparent px-2 py-1 focus:outline-none text-gray-700 placeholder-gray-500 font-medium"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !inputValue.trim()}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3.5 rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-5 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300/50 transition-all duration-300 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <MessageCircle size={28} className="relative z-10" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-lg">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -top-1 -left-1 bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full shadow-lg transform -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Chat Now!
                    </div>
                </button>
            )}
        </div>
    );
};

export default ConventusChatbot; 