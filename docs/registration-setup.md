# CMUN Connect Registration — Setup

The `/cmun-connect` page runs a 3-step registration flow:

1. **Details** — name, email, phone, college, committee preferences, etc.
2. **Email verification** — a 6-digit code is emailed to the user; they enter it to prove the email is theirs.
3. **Payment** — the user scans your UPI QR, pays the fee, and uploads a screenshot. Payments are **verified manually** (no Razorpay).

The site never stores data itself. Three Next.js API routes (`pages/api/register/*`) forward everything to **one Google Apps Script web app**, which:

- sends the OTP email (via `MailApp`),
- saves each payment screenshot to Google Drive,
- appends a row per registration to a Google Sheet (status = `Pending Verification`).

Email verification is stateless: the OTP is HMAC-signed into a short-lived JWT (`REGISTRATION_SECRET`), so the code is only ever in the email, never exposed to the browser.

---

## 1. What you must fill in

**`lib/registration-config.js`** (safe, non-secret — committed):

| Value | What to set |
|---|---|
| `REGISTRATION_FEE` | your fee in INR |
| `UPI_ID` | your UPI ID (shown for manual entry) |
| `UPI_PAYEE_NAME` | the name on your UPI |
| `PAYMENT_QR_SRC` | path to your QR image (default `/payment-qr.png`) |
| `COMMITTEES` | already set to DISEC, UNHRC, UNCSW, AIPPM |

**Your QR image:** drop it at `public/payment-qr.png` (or change `PAYMENT_QR_SRC`). Until you do, the page shows a placeholder box instead of a broken image.

**Environment variables** (secret — never commit; set in `.env.local` and in Vercel):

```
REGISTRATION_SECRET=<a long random string — signs the email-verification tokens>
REGISTRATION_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Generate a secret with: `openssl rand -hex 32`

---

## 2. Google Apps Script backend

### a. Create the Sheet
Make a Google Sheet named e.g. **"CMUN Connect Registrations"**.

### b. Add the script
In the Sheet: **Extensions → Apps Script**. Delete the boilerplate and paste:

```javascript
// Conventus CMUN Connect — registration + OTP email backend.
var SHEET_NAME   = 'Registrations';
var DRIVE_FOLDER = 'CMUN Payment Screenshots';
var ADMIN_KEY    = 'PASTE-YOUR-ADMIN_KEY-HERE'; // must equal ADMIN_KEY in the site env

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.action === 'sendOtp')      return sendOtp_(body);
    if (body.action === 'register')     return register_(body);
    if (body.action === 'list')         return list_(body);
    if (body.action === 'lookup')       return lookup_(body);
    if (body.action === 'updateStatus') return updateStatus_(body);
    return json_({ error: 'unknown action' });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

// ---- Admin/delegate reads (gated by the shared ADMIN_KEY) ----
function requireAdmin_(b) {
  if (!ADMIN_KEY || ADMIN_KEY === 'PASTE-YOUR-ADMIN_KEY-HERE' || b.adminKey !== ADMIN_KEY) {
    throw new Error('unauthorized');
  }
}
function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
function rowsAsObjects_() {
  var values = sheet_().getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0], out = [];
  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) obj[headers[j]] = values[i][j];
    out.push(obj);
  }
  return out;
}
function list_(b) {
  requireAdmin_(b);
  return json_({ ok: true, registrations: rowsAsObjects_() });
}
function lookup_(b) {
  requireAdmin_(b);
  var email = String(b.email || '').toLowerCase();
  var regs = rowsAsObjects_().filter(function (r) {
    return String(r['Email'] || '').toLowerCase() === email;
  });
  return json_({ ok: true, registrations: regs });
}
function updateStatus_(b) {
  requireAdmin_(b);
  var sheet = sheet_();
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var idCol = headers.indexOf('Reg ID'), statusCol = headers.indexOf('Status');
  if (idCol < 0 || statusCol < 0) return json_({ error: 'columns not found' });
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(b.regId)) {
      sheet.getRange(i + 1, statusCol + 1).setValue(b.status);
      return json_({ ok: true, regId: b.regId, status: b.status });
    }
  }
  return json_({ error: 'registration not found' });
}

function sendOtp_(b) {
  // Stop before the account's daily email cap (100 personal / 1500 Workspace) is exhausted.
  if (MailApp.getRemainingDailyQuota() < 1) {
    return json_({ error: 'daily_limit' });
  }
  MailApp.sendEmail({
    to: b.email,
    subject: 'Your CMUN Connect verification code',
    htmlBody:
      '<p>Hi ' + (b.name || '') + ',</p>' +
      '<p>Your Conventus CMUN Connect email verification code is:</p>' +
      '<p style="font-size:26px;font-weight:bold;letter-spacing:6px">' + b.otp + '</p>' +
      '<p>This code expires in 10 minutes. If you did not request it, ignore this email.</p>' +
      '<p>— Conventus MUN</p>'
  });
  return json_({ ok: true });
}

function register_(b) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At','Reg ID','Name','Email','Phone','Institution',
      'Course/Year','City','Role','Committee 1','Committee 2','Committee 3',
      'Portfolio Pref','Experience','Category','Fee (₹)','Txn Ref',
      'Payment Screenshot','Status']);
  }

  var regId = 'CMUN-' +
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyMMdd') +
    '-' + (sheet.getLastRow());

  var link = '';
  if (b.screenshot) {
    var parts = b.screenshot.split(',');
    var contentType = parts[0].substring(parts[0].indexOf(':') + 1, parts[0].indexOf(';'));
    var blob = Utilities.newBlob(Utilities.base64Decode(parts[1]), contentType,
      regId + '-' + (b.screenshotName || 'payment'));
    var folder = getFolder_(DRIVE_FOLDER);
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    link = file.getUrl();
  }

  sheet.appendRow([
    b.submittedAt || new Date().toISOString(), regId, b.name, b.email, b.phone,
    b.institution, b.courseYear || '', b.city || '', b.role, b.committee1,
    b.committee2 || '', b.committee3 || '', b.portfolio || '', b.experience,
    b.feeCategory || '', b.feeAmount || '', b.txnRef || '', link, 'Pending Verification'
  ]);
  return json_({ ok: true, registrationId: regId });
}

function getFolder_(name) {
  var it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### c. Deploy
- **Deploy → New deployment → Web app**.
- **Execute as:** Me. **Who has access:** Anyone.
- Authorize when prompted (it needs Gmail + Drive + Sheets access).
- Copy the **Web app URL** → this is your `REGISTRATION_WEBHOOK_URL`.

> The first `register` call creates the Drive folder and the header row automatically.

---

## 3. Email quota

`MailApp` sends from the Google account that owns the script:
- **Consumer Gmail:** ~100 emails/day.
- **Google Workspace:** ~1,500 emails/day.

Each registration uses one OTP email (plus resends). On a busy launch day a personal Gmail may hit the cap — use a Workspace account if you expect high volume.

---

## 4. Verifying payments

Two ways:

- **In the Sheet:** each row has the payment-screenshot Drive link and a `Status` of `Pending Verification`. Check the screenshot against your UPI history, then change `Status` to `Verified` (or `Rejected`).
- **In the admin dashboard (below):** log in, view screenshots, and click Verify/Reject.

## 5. Admin dashboard + delegate portal

- **Admin dashboard** — `/admin/registrations`. Log in (ADMIN_USERNAME / ADMIN_PASSWORD) to see all registrations, open payment screenshots, filter/search, see totals + fees collected, and mark rows Verified/Rejected.
- **Delegate portal** — `/status`. A registrant signs in with their email + a one-time code (same OTP system) and sees only their own registration and its status.

Both read live from your Sheet through three admin-gated Apps Script actions (`list`, `lookup`, `updateStatus`).

### Activate them
1. **Update the Apps Script** with the newer version in section 2b (it now includes those three actions). At the top, set `ADMIN_KEY` to the **same value** as `ADMIN_KEY` in your site env.
2. **Redeploy the new version:** in the Apps Script editor, **Deploy → Manage deployments → (edit / pencil) → Version: New version → Deploy**. The `/exec` URL stays the same.
3. **Set the env vars** (`.env.local` and Vercel): `ADMIN_USERNAME`, `ADMIN_PASSWORD` (choose a strong one), and `ADMIN_KEY` (generate with `openssl rand -hex 24`).

Until the script is redeployed with the new actions, the dashboard and portal load but show no data (the old deployment doesn't know those actions yet).
