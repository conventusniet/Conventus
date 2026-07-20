import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConventusChatbot from '@/components/ConventusChatBot';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, GraduationCap, Globe, MapPin, MessageSquare,
  Calendar, Video, CheckCircle, AlertCircle, ArrowRight, ArrowLeft,
  ShieldCheck, Upload, QrCode, Copy, X, BadgeCheck, Sparkles, Eye,
} from 'lucide-react';
import {
  CONFERENCE_NAME, CONFERENCE_TAGLINE, REGISTRATION_FEES, feeForEmail,
  UPI_ID, UPI_PAYEE_NAME, PAYMENT_QR_SRC, SUPPORT_EMAIL, SUPPORT_CONTACTS,
  COMMITTEES, ROLES, EXPERIENCE_LEVELS,
} from '../lib/registration-config';
import { COMMITTEE_PORTFOLIOS } from '../lib/committee-portfolios';

const STEPS = ['Details', 'Verify Email', 'Payment'];
const MAX_SCREENSHOT_BYTES = 3 * 1024 * 1024; // 3MB

// Live, view-only Google Sheet showing current portfolio/country allotment status.
// TODO: move this into lib/registration-config.js alongside UPI_ID etc. once that file is handy.
const IMATRIX_LINK = 'https://docs.google.com/spreadsheets/d/1ZkCzIetoXxm_e0zs3D5xPcj2giqanOwrsIU3gZgxw9E/edit?usp=drivesdk';

const CMUNRegistration = () => {
  const [step, setStep] = useState(1); // 1 Details, 2 Verify, 3 Payment
  const [form, setForm] = useState({
    name: '', email: '', phone: '', institution: '', courseYear: '', city: '',
    role: 'Delegate', committee1: '', committee2: '', committee3: '', portfolio1: '', portfolio2: '', portfolio3: '', experience: '',
  });
  const [errors, setErrors] = useState({});

  // Email verification state
  const [otpToken, setOtpToken] = useState('');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState('');
  const [resendIn, setResendIn] = useState(0);

  // Payment state
  const [screenshot, setScreenshot] = useState(null); // { dataUrl, name }
  const [txnRef, setTxnRef] = useState('');
  const [qrOk, setQrOk] = useState(true);
  const [copied, setCopied] = useState(false);

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // International Press don't represent a country, so country portfolios don't apply to them.
  const isPress = form.role === 'International Press';

  // Press get no portfolios and no 2nd/3rd committee choices — drop any values carried over
  // from a Delegate selection so hidden fields can't be submitted.
  useEffect(() => {
    if (!isPress) return;
    setForm((prev) => ({
      ...prev,
      committee2: '', committee3: '',
      portfolio1: '', portfolio2: '', portfolio3: '',
    }));
  }, [isPress]);

  // Each portfolio slot is tied to its own committee slot — clear only that slot's pick
  // when its corresponding committee choice changes.
  useEffect(() => {
    setForm((prev) => ({ ...prev, portfolio1: '' }));
  }, [form.committee1]);
  useEffect(() => {
    setForm((prev) => ({ ...prev, portfolio2: '' }));
  }, [form.committee2]);
  useEffect(() => {
    setForm((prev) => ({ ...prev, portfolio3: '' }));
  }, [form.committee3]);

  const set = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };
  const handleChange = (e) => set(e.target.name, e.target.value);

  // ---------- Step 1: validate details, then send OTP ----------
  const validateDetails = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please provide your full name';
    if (!form.email.trim()) e.email = 'Please provide your email address';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address';
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) e.phone = 'Please provide your phone number';
    else if (digits.length < 10 || digits.length > 12) e.phone = 'Enter a valid phone number';
    if (!form.institution.trim()) e.institution = 'College / institution is required';
    if (!form.role) e.role = 'Select how you want to register';
    // International Press cover the conference rather than representing a country, so a
    // committee is an optional coverage preference for them, not a requirement.
    if (!isPress && !form.committee1) e.committee1 = 'Select your first committee preference';
    if (!form.experience) e.experience = 'Select your MUN experience';
    if (form.committee2 && form.committee2 === form.committee1) e.committee2 = 'Choose a different committee';
    if (form.committee3 && (form.committee3 === form.committee1 || form.committee3 === form.committee2))
      e.committee3 = 'Choose a different committee';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = async () => {
    setSendingOtp(true);
    setErrors((prev) => ({ ...prev, submit: null }));
    try {
      const res = await fetch('/api/register/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), name: form.name.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send the verification email.');
      setOtpToken(data.token);
      setResendIn(45);
      setStep(2);
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setSendingOtp(false);
    }
  };

  const goFromDetails = () => {
    if (!validateDetails()) return;
    sendOtp();
  };

  // ---------- Step 2: verify OTP ----------
  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp.trim())) {
      setErrors((prev) => ({ ...prev, otp: 'Enter the 6-digit code' }));
      return;
    }
    setVerifyingOtp(true);
    setErrors((prev) => ({ ...prev, otp: null }));
    try {
      const res = await fetch('/api/register/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otpToken, otp: otp.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Verification failed.');
      setVerifiedToken(data.verifiedToken);
      setStep(3);
    } catch (err) {
      setErrors((prev) => ({ ...prev, otp: err.message }));
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ---------- Step 3: payment + screenshot ----------
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpe?g|webp)$/.test(file.type)) {
      setErrors((prev) => ({ ...prev, screenshot: 'Please upload a PNG or JPG image' }));
      return;
    }
    if (file.size > MAX_SCREENSHOT_BYTES) {
      setErrors((prev) => ({ ...prev, screenshot: 'Image is over 3MB — please crop or compress it' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshot({ dataUrl: reader.result, name: file.name });
      setErrors((prev) => ({ ...prev, screenshot: null }));
    };
    reader.readAsDataURL(file);
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const submitRegistration = async () => {
    if (!screenshot) {
      setErrors((prev) => ({ ...prev, screenshot: 'Please attach your payment screenshot' }));
      return;
    }
    setSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: null }));
    try {
      // Each portfolio is tied to its own committee choice, so pair them up individually
      // rather than tagging all three with committee1.
      const portfolioPairs = [1, 2, 3]
        .map((n) => ({ committee: form[`committee${n}`], portfolio: form[`portfolio${n}`].trim() }))
        .filter((p) => p.committee && p.portfolio);
      const portfolioValue = portfolioPairs.map((p) => `${p.portfolio} (${p.committee})`).join(', ');
      const res = await fetch('/api/register/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          portfolio: portfolioValue,
          txnRef: txnRef.trim(),
          verifiedToken,
          screenshot: screenshot.dataUrl,
          screenshotName: screenshot.name,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setRegistrationId(data.registrationId || '');
      setSuccess(true);
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  // Fee depends on the (OTP-verified) email domain — NIET vs external.
  const fee = feeForEmail(form.email);

  // Committee preferences must be distinct — disable an option already taken in another slot.
  const committeeTaken = (field, code) =>
    ['committee1', 'committee2', 'committee3'].some((f) => f !== field && form[f] === code);
  const inputClass = (field) =>
    `w-full py-2.5 px-3 border bg-white text-ink text-sm transition-colors focus:ring-1 focus:ring-primary focus:border-primary ${
      errors[field] ? 'border-primary' : 'border-ink/15'
    }`;

  const FieldError = ({ field }) =>
    errors[field] ? (
      <p className="text-primary text-xs mt-1 flex items-center gap-1 font-semibold">
        <AlertCircle size={12} /> {errors[field]}
      </p>
    ) : null;

  return (
    <>
      <Header theme="red" />

      <main className="bg-paper min-h-screen pt-28 pb-16 font-sans overflow-x-hidden">
        {/* Hero */}
        <section className="relative bg-ink text-white py-20 px-6 border-b border-accent/20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/h1.jpg')" }} />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <span className="eyebrow text-xs tracking-widest text-accent font-bold px-4 py-1.5 border border-accent/30 inline-block mb-6 bg-accent/5">
              REGISTRATIONS OPEN
            </span>
            <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-3">{CONFERENCE_NAME}</h1>
            <p className="font-serif-display text-2xl sm:text-3xl text-accent font-medium tracking-wide italic mb-6">
              &ldquo;{CONFERENCE_TAGLINE}&rdquo;
            </p>
            <div className="flex justify-center mb-8">
              <span className="double-rule border-accent/50" style={{ borderColor: 'rgba(200, 160, 75, 0.5)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="bg-ink/50 border border-white/10 p-5 flex items-start gap-4">
                <Calendar className="text-accent flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Committees</h3>
                  <p className="text-sm font-semibold">{COMMITTEES.length} Simulations</p>
                </div>
              </div>
              <div className="bg-ink/50 border border-white/10 p-5 flex items-start gap-4">
                <Video className="text-accent flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Registration Fee</h3>
                  <p className="text-sm font-semibold">₹{REGISTRATION_FEES.niet} NIET · ₹{REGISTRATION_FEES.external} Others</p>
                </div>
              </div>
              <div className="bg-ink/50 border border-white/10 p-5 flex items-start gap-4">
                <Globe className="text-accent flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Eligibility</h3>
                  <p className="text-sm font-semibold">Open to All Students</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration card */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-10">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const active = step === n;
              const done = step > n;
              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 flex items-center justify-center border text-sm font-bold transition-colors ${
                        done ? 'bg-primary border-primary text-white'
                          : active ? 'bg-white border-primary text-primary'
                          : 'bg-white border-ink/20 text-ink/40'
                      }`}
                    >
                      {done ? <CheckCircle size={18} /> : n}
                    </div>
                    <span className={`mt-2 text-[11px] font-bold uppercase tracking-wider ${active || done ? 'text-primary' : 'text-ink/40'}`}>
                      {label}
                    </span>
                  </div>
                  {n < STEPS.length && <div className={`h-[2px] w-12 sm:w-24 mx-2 mb-5 ${step > n ? 'bg-primary' : 'bg-ink/15'}`} />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="bg-white border border-ink/15 shadow-sm p-8 sm:p-10">
            {/* ---------- STEP 1: DETAILS ---------- */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <span className="eyebrow text-xs text-primary font-bold">DELEGATE DETAILS</span>
                  <h2 className="font-serif-display text-2xl font-bold text-ink mt-2">Tell us about yourself</h2>
                  <div className="w-12 h-px bg-primary/40 mt-3" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="name">
                      <User size={14} className="text-primary" /> Full Name <span className="text-primary">*</span>
                    </label>
                    <input id="name" name="name" type="text" className={inputClass('name')} placeholder="e.g., Ananya Sharma" value={form.name} onChange={handleChange} />
                    <FieldError field="name" />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="email">
                      <Mail size={14} className="text-primary" /> Email <span className="text-primary">*</span>
                    </label>
                    <input id="email" name="email" type="email" className={inputClass('email')} placeholder="you@college.edu" value={form.email} onChange={handleChange} />
                    <FieldError field="email" />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="phone">
                      <Phone size={14} className="text-primary" /> Phone <span className="text-primary">*</span>
                    </label>
                    <input id="phone" name="phone" type="tel" className={inputClass('phone')} placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} />
                    <FieldError field="phone" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="institution">
                      <GraduationCap size={14} className="text-primary" /> College / Institution <span className="text-primary">*</span>
                    </label>
                    <input id="institution" name="institution" type="text" className={inputClass('institution')} placeholder="Name of your college / university" value={form.institution} onChange={handleChange} />
                    <FieldError field="institution" />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="courseYear">
                      <GraduationCap size={14} className="text-primary" /> Course & Year
                    </label>
                    <input id="courseYear" name="courseYear" type="text" className={inputClass('courseYear')} placeholder="e.g., B.Tech CSE, 2nd year" value={form.courseYear} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="city">
                      <MapPin size={14} className="text-primary" /> City
                    </label>
                    <input id="city" name="city" type="text" className={inputClass('city')} placeholder="City / State" value={form.city} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="role">
                      <MessageSquare size={14} className="text-primary" /> Registering as <span className="text-primary">*</span>
                    </label>
                    <select id="role" name="role" className={inputClass('role')} value={form.role} onChange={handleChange}>
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <FieldError field="role" />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2 flex items-center gap-2" htmlFor="experience">
                      <Sparkles size={14} className="text-primary" /> MUN Experience <span className="text-primary">*</span>
                    </label>
                    <select id="experience" name="experience" className={inputClass('experience')} value={form.experience} onChange={handleChange}>
                      <option value="">Select</option>
                      {EXPERIENCE_LEVELS.map((x) => <option key={x} value={x}>{x}</option>)}
                    </select>
                    <FieldError field="experience" />
                  </div>

                  <div>
                    <label className="block text-ink text-xs font-bold mb-2" htmlFor="committee1">
                      {isPress ? (
                        <>Committee to Cover <span className="text-ink-500 font-normal">(optional)</span></>
                      ) : (
                        <>Committee Preference 1 <span className="text-primary">*</span></>
                      )}
                    </label>
                    <select id="committee1" name="committee1" className={inputClass('committee1')} value={form.committee1} onChange={handleChange}>
                      <option value="">{isPress ? 'Select (optional)' : 'Select'}</option>
                      {COMMITTEES.map((c) => <option key={c.code} value={c.code} disabled={committeeTaken('committee1', c.code)}>{c.name}</option>)}
                    </select>
                    <FieldError field="committee1" />
                  </div>

                  {/* Ranked 2nd/3rd choices only matter for delegates being allotted a country. */}
                  <div className={isPress ? 'hidden' : ''}>
                    <label className="block text-ink text-xs font-bold mb-2" htmlFor="committee2">Committee Preference 2</label>
                    <select id="committee2" name="committee2" className={inputClass('committee2')} value={form.committee2} onChange={handleChange}>
                      <option value="">Select (optional)</option>
                      {COMMITTEES.map((c) => <option key={c.code} value={c.code} disabled={committeeTaken('committee2', c.code)}>{c.name}</option>)}
                    </select>
                    <FieldError field="committee2" />
                  </div>

                  <div className={isPress ? 'hidden' : ''}>
                    <label className="block text-ink text-xs font-bold mb-2" htmlFor="committee3">Committee Preference 3</label>
                    <select id="committee3" name="committee3" className={inputClass('committee3')} value={form.committee3} onChange={handleChange}>
                      <option value="">Select (optional)</option>
                      {COMMITTEES.map((c) => <option key={c.code} value={c.code} disabled={committeeTaken('committee3', c.code)}>{c.name}</option>)}
                    </select>
                    <FieldError field="committee3" />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <label className="block text-ink text-xs font-bold">
                        Portfolio Preferences{' '}
                        <span className="text-ink-500 font-normal">
                          {isPress
                            ? '— not applicable to International Press'
                            : '— one portfolio per committee choice above'}
                        </span>
                      </label>
                      <a
                        href={IMATRIX_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-bold text-green-700 hover:underline flex-shrink-0"
                      >
                        <Eye size={14} /> Public Eye Matrix
                      </a>
                    </div>
                    {isPress ? (
                      <p className="text-xs text-ink-600 bg-paper border border-ink/10 p-3">
                        International Press cover the conference as journalists, photographers and
                        caricaturists — you don&apos;t represent a country, so no portfolio is needed.
                        Your press assignment is decided by the Secretariat after registration.
                      </p>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[1, 2, 3].map((n) => {
                        const field = `portfolio${n}`;
                        const committeeCode = form[`committee${n}`];
                        const options = COMMITTEE_PORTFOLIOS[committeeCode] || [];
                        return (
                          <div key={n}>
                            <p className="text-[11px] text-ink-500 mb-1 font-semibold uppercase tracking-wide">
                              {committeeCode ? committeeCode : `Committee ${n}`}
                            </p>
                            <select
                              id={field}
                              name={field}
                              className={inputClass(field)}
                              value={form[field]}
                              onChange={handleChange}
                              disabled={!committeeCode}
                            >
                              <option value="">{committeeCode ? 'Choose portfolio' : 'Pick a committee first'}</option>
                              {options.map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold border border-primary/30 bg-primary/5 px-3 py-2 mt-5">
                    <AlertCircle size={14} /> {errors.submit}
                  </div>
                )}

                <div className="pt-7">
                  <button onClick={goFromDetails} disabled={sendingOtp} className="btn-primary w-full disabled:opacity-60">
                    {sendingOtp ? 'Sending code…' : <>Continue to Email Verification <ArrowRight size={16} /></>}
                  </button>
                </div>
              </div>
            )}

            {/* ---------- STEP 2: VERIFY EMAIL ---------- */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <span className="eyebrow text-xs text-primary font-bold">EMAIL VERIFICATION</span>
                  <h2 className="font-serif-display text-2xl font-bold text-ink mt-2">Confirm your email</h2>
                  <div className="w-12 h-px bg-primary/40 mt-3" />
                </div>

                <div className="flex items-start gap-3 bg-paper border border-ink/10 p-4 mb-6">
                  <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700">
                    We&apos;ve emailed a 6-digit code to <span className="font-bold text-ink">{form.email}</span>.
                    Enter it below. Check spam if it doesn&apos;t arrive within a minute.
                  </p>
                </div>

                <label className="block text-ink text-xs font-bold mb-2" htmlFor="otp">Verification Code <span className="text-primary">*</span></label>
                <input
                  id="otp" inputMode="numeric" maxLength={6}
                  className={`w-full py-3 px-3 border bg-white text-ink text-center text-2xl tracking-[0.5em] font-bold focus:ring-1 focus:ring-primary focus:border-primary ${errors.otp ? 'border-primary' : 'border-ink/15'}`}
                  placeholder="______"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); if (errors.otp) setErrors((p) => ({ ...p, otp: null })); }}
                />
                <FieldError field="otp" />

                <div className="flex items-center justify-between mt-4 text-xs">
                  <button
                    onClick={sendOtp}
                    disabled={resendIn > 0 || sendingOtp}
                    className="text-primary font-bold disabled:text-ink/40 bg-transparent border-none cursor-pointer p-0"
                  >
                    {resendIn > 0 ? `Resend code in ${resendIn}s` : sendingOtp ? 'Sending…' : 'Resend code'}
                  </button>
                  <button onClick={() => setStep(1)} className="text-ink-600 font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer p-0">
                    <ArrowLeft size={12} /> Edit details
                  </button>
                </div>

                <div className="pt-7">
                  <button onClick={verifyOtp} disabled={verifyingOtp} className="btn-primary w-full disabled:opacity-60">
                    {verifyingOtp ? 'Verifying…' : <>Verify & Continue <ArrowRight size={16} /></>}
                  </button>
                </div>
              </div>
            )}

            {/* ---------- STEP 3: PAYMENT ---------- */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <span className="eyebrow text-xs text-primary font-bold">PAYMENT & CONFIRMATION</span>
                  <h2 className="font-serif-display text-2xl font-bold text-ink mt-2">Pay the registration fee</h2>
                  <div className="w-12 h-px bg-primary/40 mt-3" />
                </div>

                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold px-3 py-2 mb-6">
                  <BadgeCheck size={16} /> Email verified — {form.email}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* QR + UPI */}
                  <div className="border border-ink/10 p-5 bg-paper/40 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-600 mb-1">Scan to Pay</p>
                    <p className="font-serif-display text-2xl font-bold text-primary mb-0.5">₹{fee.amount}</p>
                    <p className="text-[11px] font-semibold text-ink-500 mb-4">{fee.isNiet ? 'NIET student rate' : 'External participant rate'}</p>
                    <div className="bg-white border border-ink/15 p-3 inline-block">
                      {qrOk ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={PAYMENT_QR_SRC} alt="Payment QR code" width={180} height={180} className="w-44 h-44 object-contain" onError={() => setQrOk(false)} />
                      ) : (
                        <div className="w-44 h-44 flex flex-col items-center justify-center text-ink/40 text-center px-3">
                          <QrCode size={40} />
                          <span className="text-[10px] mt-2 leading-tight">Add your QR at<br /><code>public/payment-qr.png</code></span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-left">
                      <p className="text-[11px] text-ink-500 uppercase tracking-wider font-bold">UPI ID</p>
                      <button onClick={copyUpi} className="flex items-center gap-2 text-sm font-semibold text-ink bg-transparent border-none cursor-pointer p-0">
                        {UPI_ID} <Copy size={13} className="text-primary" /> {copied && <span className="text-green-600 text-xs">Copied</span>}
                      </button>
                      <p className="text-xs text-ink-500 mt-1">Payee: {UPI_PAYEE_NAME}</p>
                    </div>
                  </div>

                  {/* Upload proof */}
                  <div className="flex flex-col">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">Upload Payment Screenshot <span className="text-primary">*</span></p>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className={`flex-1 min-h-[180px] border-2 border-dashed flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-colors ${errors.screenshot ? 'border-primary' : 'border-ink/25 hover:border-primary'}`}
                    >
                      {screenshot ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={screenshot.dataUrl} alt="Payment proof preview" className="max-h-40 object-contain" />
                      ) : (
                        <>
                          <Upload size={28} className="text-primary mb-2" />
                          <span className="text-sm font-semibold text-ink">Click to upload</span>
                          <span className="text-xs text-ink-500 mt-1">PNG or JPG, up to 3MB</span>
                        </>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={onFile} />
                    {screenshot && (
                      <button onClick={() => { setScreenshot(null); if (fileRef.current) fileRef.current.value = ''; }} className="text-xs text-ink-600 mt-2 flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 self-start">
                        <X size={12} /> Remove
                      </button>
                    )}
                    <FieldError field="screenshot" />

                    <label className="block text-ink text-xs font-bold mb-2 mt-4" htmlFor="txnRef">UPI / Transaction Reference</label>
                    <input id="txnRef" className={inputClass('txnRef')} placeholder="UTR / reference no. (optional)" value={txnRef} onChange={(e) => setTxnRef(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-ink-500 mt-5 bg-paper border border-ink/10 p-3">
                  <ShieldCheck size={14} className="text-primary flex-shrink-0 mt-0.5" />
                  Payments are verified manually by the Conventus team. You&apos;ll receive a confirmation email once your payment is checked. Keep your transaction reference handy.
                </div>

                {errors.submit && (
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold border border-primary/30 bg-primary/5 px-3 py-2 mt-5">
                    <AlertCircle size={14} /> {errors.submit}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-7">
                  <button onClick={() => setStep(2)} className="btn-ghost flex-shrink-0"><ArrowLeft size={16} /> Back</button>
                  <button onClick={submitRegistration} disabled={submitting} className="btn-primary flex-1 disabled:opacity-60">
                    {submitting ? 'Submitting…' : <>Complete Registration <ArrowRight size={16} /></>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help & Support */}
          <div className="mt-8 bg-white border border-ink/15 p-6">
            <h3 className="font-serif-display text-lg font-bold text-ink">Help &amp; Support</h3>
            <p className="text-xs text-ink-600 mt-1 mb-4">Stuck on registration or payment? Reach out to our team directly.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SUPPORT_CONTACTS.map((c) => {
                const digits = c.phone.replace(/\D/g, '');
                return (
                  <a
                    key={c.name}
                    href={`https://wa.me/${digits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-ink/10 p-3 hover:border-primary transition-colors block"
                  >
                    <p className="text-sm font-bold text-ink leading-tight">{c.name}</p>
                    <p className="text-[10px] text-ink-500 uppercase tracking-wider">{c.role}</p>
                    <p className="text-xs text-primary font-semibold mt-2 flex items-center gap-1"><Phone size={11} /> {c.phone}</p>
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-ink-500 mt-4">Or email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-semibold">{SUPPORT_EMAIL}</a></p>
          </div>
        </section>

        {/* Committees preview */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <span className="eyebrow text-xs text-primary font-bold">COMMITTEES</span>
            <h2 className="font-serif-display text-3xl font-bold text-ink mt-3">Featured Simulations</h2>
            <div className="flex justify-center mt-3"><span className="accent-rule" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMITTEES.map((c, i) => (
              <div key={c.code} className={`card card-hover p-6 bg-white flex flex-col justify-between border-t-4 ${['border-t-primary', 'border-t-accent', 'border-t-ink', 'border-t-primary'][i % 4]}`}>
                <div>
                  <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2 font-mono">{c.code}</div>
                  <h3 className="font-serif-display text-lg font-bold text-ink leading-snug">{c.name.split('—')[1]?.trim() || c.name}</h3>
                </div>
                <div className="pt-4 border-t border-ink/5 mt-4 text-[11px] font-bold text-accent flex items-center gap-1">
                  OPEN FOR REGISTRATION <Sparkles size={10} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ConventusChatbot />
      <Footer />

      {/* Success modal */}
      <AnimatePresence>
        {success && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 backdrop-blur-sm p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white max-w-lg w-full p-8 text-center border-t-8 border-accent relative shadow-2xl"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center text-accent rounded-full">
                  <CheckCircle size={36} />
                </div>
              </div>
              <h2 className="font-serif-display text-3xl font-bold text-ink mb-3">Registration Received</h2>
              <span className="eyebrow text-xs tracking-wider text-accent font-bold">{CONFERENCE_NAME} — PENDING VERIFICATION</span>
              <div className="w-12 h-[2px] bg-primary/20 mx-auto my-5" />
              <p className="text-sm text-ink-700 leading-relaxed mb-4">
                Thank you, {form.name.split(' ')[0]}. Your registration and payment proof have been submitted.
                Our team will verify your payment and email your confirmation shortly.
              </p>
              {registrationId && (
                <div className="bg-paper border border-ink/10 p-4 mb-6">
                  <p className="text-xs uppercase font-bold tracking-wider text-ink-500 mb-1">Your Registration ID</p>
                  <p className="text-lg font-bold text-primary tracking-wide">{registrationId}</p>
                </div>
              )}
              <button onClick={() => { window.location.href = '/'; }} className="btn-primary w-full">Back to Home</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CMUNRegistration;
