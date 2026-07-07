// Central configuration for the CMUN registration flow.
// Safe to import on the client — DO NOT put secrets (keys, webhook URLs) here.
// Edit the values below to configure the conference.

// ---- Conference basics ----
export const CONFERENCE_NAME = 'CMUN Connect';
export const CONFERENCE_TAGLINE = 'Voices United Online';

// ---- Fee & payment (EDIT THESE) ----
// Tiered fee by email domain: NIET students (verified @niet.co.in) vs everyone else.
// The email is OTP-verified, so the @niet.co.in address is itself the proof of NIET status.
export const NIET_EMAIL_DOMAIN = 'niet.co.in';
export const REGISTRATION_FEES = {
  niet: 20, // INR — NIET students (email ends with @niet.co.in)
  external: 50, // INR — external / non-NIET participants
};

// Returns { category, amount, isNiet } for a given email.
export function feeForEmail(email) {
  const isNiet = String(email || '').trim().toLowerCase().endsWith(`@${NIET_EMAIL_DOMAIN}`);
  const category = isNiet ? 'niet' : 'external';
  return { category, amount: REGISTRATION_FEES[category], isNiet };
}

export const UPI_ID = '9950094483@slc'; // UPI ID (shown for manual entry)
export const UPI_PAYEE_NAME = 'Conventus MUN'; // TODO: confirm the exact name shown when someone pays this UPI
// Drop your payment QR image at public/payment-qr.png (or change this path).
export const PAYMENT_QR_SRC = '/payment-qr.png';

// ---- Support ----
export const SUPPORT_EMAIL = 'conventus@niet.co.in';

// Help & support contacts shown on the registration form (phone = call + WhatsApp).
export const SUPPORT_CONTACTS = [
  { name: 'Deepanjali Sharma', role: 'Vice President', phone: '+91 72506 47615' },
  { name: 'Rachit Sai Sheelwant', role: 'Social Media Manager', phone: '+91 87919 67742' },
  { name: 'Yash Gadia', role: 'Technical Co-Head', phone: '+91 99500 94483' },
];

// ---- Committees on offer (the four in the conference plan) ----
export const COMMITTEES = [
  { code: 'DISEC', name: 'DISEC — Disarmament & International Security' },
  { code: 'UNHRC', name: 'UNHRC — UN Human Rights Council' },
  { code: 'UNCSW', name: 'UNCSW — Commission on the Status of Women' },
  { code: 'AIPPM', name: 'AIPPM / Lok Sabha — All India Political Parties Meet' },
];

// ---- Dropdown options ----
export const ROLES = ['Delegate', 'International Press'];
export const EXPERIENCE_LEVELS = [
  'This is my first MUN',
  '1–2 conferences',
  '3–5 conferences',
  '5+ conferences',
];
