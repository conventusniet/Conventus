import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import CommitteePage from '../components/commiteecards'
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/registration", label: "Register" },
    { href: "/committee", label: "Committees" },
    { href: "/media", label: "Media" },
    { href: "/ContactForm", label: "Contact" },
  ];

  const leftNavItems = navItems.slice(0, Math.ceil(navItems.length / 2));
  const rightNavItems = navItems.slice(Math.ceil(navItems.length / 2));

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <nav className="hidden md:flex space-x-8 flex-1 justify-end"> {/* Changed to justify-end */}
            {leftNavItems.map((item) => (
              <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href={item.href} className={`text-2xl font-semibold font-['Times_New_Roman'] ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <Link href="/" className="flex items-center space-x-4 mx-8"> {/* Added mx-8 for more space */}
            <span className={`text-3xl font-bold font-['Times_New_Roman'] ${scrolled ? "text-red-600" : "text-red-600"}`}>CONVENTUS</span>
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center p-1">
              <Image src="/images/logo.png" alt="CONVENTUS Logo" width={56} height={56} className="object-contain" />
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8 flex-1"> {/* Changed to flex-1 */}
            {rightNavItems.map((item) => (
              <motion.div key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href={item.href} className={`text-2xl font-semibold font-['Times_New_Roman'] ${scrolled ? 'text-red-800 hover:text-red-600' : 'text-red-600 hover:text-red-400'}`}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.button
            className={`md:hidden ${scrolled ? 'text-red-600 z-50' : 'text-red-200'}`}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 md:hidden"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full justify-center items-center relative p-8">
              <motion.button
                className="absolute top-4 right-4 text-red-600 hover:text-red-400"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="block py-4 px-8 text-2xl font-semibold text-red-800 hover:text-red-600 transition duration-300 w-full text-center font-['Times_New_Roman']"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};


const committee=() =>{
  return (
    <div>
      <Header />
      <CommitteePage />
      <Footer />
    </div>
  )
}

export default committee