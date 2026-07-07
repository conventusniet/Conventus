# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for Conventus, the Model United Nations society of NIET, Greater Noida (conventusmun.com). Next.js 14 using the **Pages Router** (`pages/`, not `app/` — `app/` only holds the favicon). Plain JavaScript (`strict: false`, `allowJs`), Tailwind CSS 3, Framer Motion for animation. Path alias `@/*` maps to the repo root.

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build — use this to verify changes compile
npm start        # serve production build
```

There is no test framework and no ESLint config (`npm run lint` will prompt for first-time setup). Verification is `npm run build` plus exercising pages in the dev server.

Do not re-enable webpack disk caching in `next.config.mjs`; it is deliberately disabled in dev to avoid HMR filesystem lock races.

## Architecture

Mostly a content site: each page in `pages/` composes `components/Header.js` + page sections + `components/Footer.js`. Content (committee lists, leadership, event details) is hardcoded inline in page/component files — there is no CMS or database in this repo. Components live flat in `components/`; files prefixed `mun2.0*` belong to the CMUN 2.0 event page (`pages/mun2.0.js`).

Design system (Tailwind theme in `tailwind.config.js`): institutional/diplomatic look — primary red `#AA172C`, muted gold `accent`, warm `ink` neutrals instead of pure black/gray, ivory `paper` backgrounds. Match this palette in new UI.

### Server-side API routes (`pages/api/`)

- `chat.js` — chatbot proxy to OpenRouter. **Only free models (ids ending `:free`) may be used** — the key must not incur paid usage. It falls through an ordered model list on 429s. The chatbot's knowledge base is `lib/conventus-context.js`; edit that file (not the prompt in `chat.js`) to change what the bot knows.
- `register/send-otp.js`, `register/verify-otp.js`, `register/submit.js` — the CMUN Connect registration flow (page: `pages/cmun-connect.js`). Email verification is stateless: `send-otp` HMAC-signs the OTP into a 10-min JWT (`REGISTRATION_SECRET`) and emails the code; `verify-otp` checks it and issues a "verified" token; `submit` requires that token, then forwards the registration + base64 payment screenshot to `REGISTRATION_WEBHOOK_URL` (a Google Apps Script that emails OTPs, saves screenshots to Drive, and appends rows to a Sheet). Editable conference config (fee, UPI, committees, QR path) lives in `lib/registration-config.js` (client-safe, no secrets). Setup: `docs/registration-setup.md`. Payments are verified manually (no Razorpay). The old waitlist was removed.
- `admin/login|logout|verify.js` — admin auth via JWT in an httpOnly `adminToken` cookie (1h expiry). Credentials come from `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `JWT_SECRET`.

### External backends (not in this repo)

Several pages call third-party-hosted Django-style APIs directly from the client:

- `https://conventus.pythonanywhere.com/api` — contact form (`pages/ContactForm.js`), delegate/OC registration (`pages/DelegateRegis.js`, `pages/OCregis.js`), admin contact panel (`pages/admin/contact.js`).
- `https://conventus-interview-api.onrender.com/api` — interview flow (`pages/interview.js`, `pages/admin/interviews/`).
- `pages/admin/questions/ask/questions.js` still points at `http://localhost:8000` (a local dev backend).

These backends' contracts (trailing-slash endpoints, field names) cannot be changed from this repo.

### Environment variables

`.env.example` documents `OPENROUTER_API_KEY` (chatbot), `REGISTRATION_WEBHOOK_URL` and `REGISTRATION_SECRET` (registration flow). The admin auth routes additionally need `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET`, which are not in `.env.example`. An earlier key was committed to git history; never commit `.env*` values.
