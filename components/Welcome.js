import React, { useState, useEffect } from 'react';
const Welcome = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150); // Increased initial typing speed

    const toRotate = ['Nagatio', 'Solutio', 'Actio'];
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setTypingSpeed(prevSpeed => prevSpeed / 1.5); // Faster deletion
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setTypingSpeed(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150); // Reset to initial typing speed
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 object-cover w-full h-full z-0 brightness-50"
            >
                <source src="/videos/67358-521707474_medium.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
            <div className="relative z-20 text-center px-4">
                <h1 className="text-6xl font-bold mb-6 text-shadow-lg">Conventus</h1>
                <p className="text-4xl mb-8">|ㅤ<span className="font-bold text-yellow-300">{text}</span>ㅤ|</p>
            </div>
        </section>

    );
};

export default Welcome;