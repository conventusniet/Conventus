import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConventusChatbot from '@/components/ConventusChatBot';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, GraduationCap, Globe, BookOpen, 
  Calendar, Video, Award, CheckCircle, AlertCircle, 
  ArrowRight, Landmark, MessageSquare, Bell, Hourglass, HelpCircle, Shield, Sparkles 
} from 'lucide-react';

const CMUNConnectTeaser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    interest: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
    if (!formData.interest) newErrors.interest = 'Please select your primary role of interest';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, submit: null }));

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', institution: '', interest: '' });
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message || 'Something went wrong. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header theme="red" />

      {/* Teaser Page Container */}
      <main className="bg-paper min-h-screen pt-28 pb-16 font-sans overflow-x-hidden">
        
        {/* Section 1: Hero Teaser Header */}
        <section className="relative bg-ink text-white py-24 px-6 border-b border-accent/20 overflow-hidden">
          {/* Banner photograph */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/h1.jpg')" }} />
          {/* Ink wash for legibility */}
          <div className="absolute inset-0 bg-ink/85" />
          {/* Subtle grid texture on top */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:30px_30px]" />
          
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Institution Badge */}
            <span className="eyebrow text-xs tracking-widest text-accent font-bold px-4 py-1.5 border border-accent/30 rounded-none inline-block mb-6 bg-accent/5">
              PRE-LAUNCH DOCKET
            </span>
            
            {/* Title / Wordmark */}
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-3">
              CMUN Connect
            </h1>
            <p className="font-serif-display text-2xl sm:text-3xl text-accent font-medium tracking-wide italic mb-6">
              "Voices United Online"
            </p>
            
            <div className="flex justify-center mb-8">
              <span className="double-rule border-accent/50" style={{ borderColor: 'rgba(200, 160, 75, 0.5)' }} />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-ink-100/80 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              Bridging the global divide through virtual advocacy. Conventus is staging its first fully-digital 
              conclave, bringing unparalleled security, human rights, and political simulation directly to your screen. 
              Break geographic barriers, engage in high-intensity debate, and claim your diplomatic seat.
            </p>

            {/* Quick Metrics Grid - Rebalanced to 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="bg-ink/50 border border-white/10 p-5 rounded-none flex items-start gap-4">
                <Calendar className="text-accent flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">CONFERENCE DATE</h3>
                  <p className="text-sm font-semibold">To Be Announced</p>
                </div>
              </div>

              <div className="bg-ink/50 border border-white/10 p-5 rounded-none flex items-start gap-4">
                <Video className="text-accent flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">PLATFORM</h3>
                  <p className="text-sm font-semibold">Fully Virtual</p>
                </div>
              </div>

              <div className="bg-ink/50 border border-white/10 p-5 rounded-none flex items-start gap-4">
                <Globe className="text-accent flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">ELIGIBILITY</h3>
                  <p className="text-sm font-semibold">Global (All Students)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Split Layout - Secretariat vision & Interactive Priority waitlist */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="bg-white border border-ink/15 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Secretariat Vision & Communiqué */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-ink/10 flex flex-col justify-between">
              <div>
                <span className="eyebrow text-xs text-primary font-bold">SECRETARIAT BRIEF</span>
                <h2 className="font-serif-display text-3xl font-bold text-ink mt-3 mb-6">Voices United</h2>
                
                <div className="w-12 h-[1px] bg-primary/40 mb-6" />

                <div className="space-y-6 text-sm text-ink-700 leading-relaxed text-justify">
                  <p>
                    <strong>Distinguished Colleagues and Future Diplomats,</strong>
                  </p>
                  <p>
                    As global dynamics shift, diplomacy must transcend borders and physical constraints. 
                    <em> CMUN Connect</em> represents a new chapter for Conventus. By shifting our 
                    high-end debate mechanics online, we invite talented voices from every corner of the world 
                    to collaborate without financial or logistical hurdles.
                  </p>
                  <p>
                    To maintain the premium academic standards Conventus is known for, participation slots will 
                    be carefully capped. Pre-registering on our waitlist guarantees you immediate priority notifications 
                    and portfolio allocation guides the exact second official registration opens.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-ink/10 mt-8">
                <p className="text-xs text-ink-500 italic">
                  "Advocacy is not silent; it is the collective volume of deliberate diplomacy."
                </p>
                <span className="block text-xs font-bold text-primary mt-2 uppercase tracking-wider">— The Conventus Secretariat</span>
              </div>
            </div>

            {/* Right Column: Pre-Launch Priority Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-paper/30 flex flex-col justify-center">
              <div className="mb-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/5 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Bell size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-ink">Priority Waitlist</h3>
                  <p className="text-xs text-ink-600 mt-1">Pre-register now to receive instant notifications and early-access portfolios.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from real users, traps bots */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {/* Full Name */}
                <div>
                  <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="name">
                    <User size={14} className="text-primary" />
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full py-2.5 px-3 border bg-white text-ink text-sm transition-colors focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.name ? 'border-primary' : 'border-ink/15'
                    }`}
                    placeholder="e.g., Alexander Mercer"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-primary text-xs mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="email">
                    <Mail size={14} className="text-primary" />
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full py-2.5 px-3 border bg-white text-ink text-sm transition-colors focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.email ? 'border-primary' : 'border-ink/15'
                    }`}
                    placeholder="alexander@institution.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-primary text-xs mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Institution Name */}
                <div>
                  <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="institution">
                    <GraduationCap size={14} className="text-primary" />
                    School / College / University <span className="text-primary">*</span>
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    className={`w-full py-2.5 px-3 border bg-white text-ink text-sm transition-colors focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.institution ? 'border-primary' : 'border-ink/15'
                    }`}
                    placeholder="Name of your institution"
                    value={formData.institution}
                    onChange={handleChange}
                  />
                  {errors.institution && (
                    <p className="text-primary text-xs mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle size={12} /> {errors.institution}
                    </p>
                  )}
                </div>

                {/* Preferred Role of Interest */}
                <div>
                  <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="interest">
                    <MessageSquare size={14} className="text-primary" />
                    Role of Interest <span className="text-primary">*</span>
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className={`w-full py-2.5 px-3 border bg-white text-ink text-sm transition-colors focus:ring-1 focus:ring-primary focus:border-primary ${
                      errors.interest ? 'border-primary' : 'border-ink/15'
                    }`}
                    value={formData.interest}
                    onChange={handleChange}
                  >
                    <option value="">Select Option</option>
                    <option value="Delegate">Delegate (Represent a nation)</option>
                    <option value="Executive Board">Executive Board (Dais/Chairperson)</option>
                    <option value="International Press">International Press (Reporter/Writer)</option>
                  </select>
                  {errors.interest && (
                    <p className="text-primary text-xs mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle size={12} /> {errors.interest}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold border border-primary/30 bg-primary/5 px-3 py-2">
                    <AlertCircle size={14} /> {errors.submit}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary bg-primary hover:bg-primary-800 text-white font-bold tracking-wider text-xs flex items-center justify-center gap-2 py-3 px-6 cursor-pointer border-none"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Auditing Credentials...
                      </>
                    ) : (
                      <>
                        SECURE WAITLIST POSITION <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>

        {/* Section 3: Premium Interactive Preview of Featured Committees */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <span className="eyebrow text-xs text-primary font-bold">COMMITTEES PREVIEW</span>
            <h2 className="font-serif-display text-3xl font-bold text-ink mt-3">Featured Simulations</h2>
            <div className="flex justify-center mt-3">
              <span className="accent-rule" />
            </div>
            <p className="text-sm text-ink-600 max-w-xl mx-auto mt-4 leading-relaxed">
              Explore the critical forums being prepared by our academic team. High-stakes dynamics, premium guides, and custom study briefs are currently in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Committee 1 */}
            <div className="card card-hover p-8 bg-white flex flex-col justify-between border-t-4 border-t-primary">
              <div>
                <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3 font-mono">UNSC</div>
                <h3 className="font-serif-display text-xl font-bold text-ink mb-3">UN Security Council</h3>
                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                  Focusing on geopolitical standoffs and regional crises. Delegates must manage high-stress crisis updates, strategic military intelligence, and draft binding international resolutions.
                </p>
              </div>
              <div className="pt-6 border-t border-ink/5 mt-6 flex justify-between items-center text-[11px] font-bold text-accent">
                <span>REPRESENT STATUS: SEALED</span>
                <span className="flex items-center gap-1 font-mono uppercase tracking-wider text-primary">Teaser <Sparkles size={10} /></span>
              </div>
            </div>

            {/* Committee 2 */}
            <div className="card card-hover p-8 bg-white flex flex-col justify-between border-t-4 border-t-accent">
              <div>
                <div className="text-xs font-bold text-accent tracking-widest uppercase mb-3 font-mono">UNHRC</div>
                <h3 className="font-serif-display text-xl font-bold text-ink mb-3">UN Human Rights Council</h3>
                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                  Championing universal liberties and individual rights across digital and sovereign frameworks. Address severe violations, state proctoring, and modern civil freedoms.
                </p>
              </div>
              <div className="pt-6 border-t border-ink/5 mt-6 flex justify-between items-center text-[11px] font-bold text-primary">
                <span>HUMANITARIAN AUDIT</span>
                <span className="flex items-center gap-1 font-mono uppercase tracking-wider text-accent">Teaser <Sparkles size={10} /></span>
              </div>
            </div>

            {/* Committee 3 */}
            <div className="card card-hover p-8 bg-white flex flex-col justify-between border-t-4 border-t-ink">
              <div>
                <div className="text-xs font-bold text-ink tracking-widest uppercase mb-3 font-mono">AIPPM</div>
                <h3 className="font-serif-display text-xl font-bold text-ink mb-3">All India Political Meet</h3>
                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                  Deconstructing critical national policies, legislative updates, and governance frameworks. Uncompromising party dynamics, state elections, and heated constitutional debates.
                </p>
              </div>
              <div className="pt-6 border-t border-ink/5 mt-6 flex justify-between items-center text-[11px] font-bold text-ink-700">
                <span>DOMESTIC LEGISLATION</span>
                <span className="flex items-center gap-1 font-mono uppercase tracking-wider text-ink">Teaser <Sparkles size={10} /></span>
              </div>
            </div>

          </div>
        </section>

      </main>

      <ConventusChatbot />
      <Footer />

      {/* Waitlist Success Modal Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white max-w-lg w-full p-8 text-center border-t-8 border-accent relative shadow-2xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSuccess(false)}
                className="absolute top-4 right-4 text-ink/50 hover:text-ink transition-colors border-none bg-transparent cursor-pointer"
                aria-label="Close waitlist success message"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center text-accent rounded-full">
                  <CheckCircle size={36} />
                </div>
              </div>

              <h2 className="font-serif-display text-3xl font-bold text-ink mb-3">
                Waitlist Confirmed
              </h2>
              <span className="eyebrow text-xs tracking-wider text-accent font-bold">
                CMUN CONNECT — PRIORITY QUEUE
              </span>

              <div className="w-12 h-[2px] bg-primary/20 mx-auto my-5" />

              <p className="text-sm text-ink-700 leading-relaxed mb-6">
                Excellent choice. You have been placed on Conventus's priority waitlist registry. 
                When official registrations, EB application dockets, and committee country guides go live, 
                an exclusive priority passcode will be sent to your email.
              </p>

              {/* Action Box */}
              <div className="bg-paper border border-ink/10 p-5 mb-8 text-left">
                <h4 className="text-xs uppercase font-bold tracking-wider text-accent mb-2">Waitlist Status</h4>
                <p className="text-xs text-ink-700 leading-normal">
                  You are now prioritized for direct email dispatches. Make sure to whitelist 
                  <span className="text-primary font-bold"> conventusmun@gmail.com</span> to avoid missing your EB or portfolio selection alerts.
                </p>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="w-full btn-primary bg-primary hover:bg-primary-800 text-white font-bold tracking-wider text-sm cursor-pointer border-none"
              >
                RETURN TO PREVIEW
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CMUNConnectTeaser;
