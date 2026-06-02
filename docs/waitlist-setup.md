# CMUN Connect Waitlist → Google Sheet

Submissions from the `/cmun-connect` waitlist form are sent to a Google Sheet
via a Google Apps Script web app. The site never holds the data — it forwards
each submission to the script through a server-side route (`pages/api/waitlist.js`).

## One-time setup

### 1. Create the Sheet
- Make a new Google Sheet, e.g. **"CMUN Connect Waitlist"**.

### 2. Add the Apps Script
- In the Sheet: **Extensions → Apps Script**.
- Delete any boilerplate and paste:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Write a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Submitted At', 'Name', 'Email', 'Institution', 'Role of Interest']);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.institution || '',
      data.interest || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

- **Save** (disk icon).

### 3. Deploy as a web app
- **Deploy → New deployment**.
- Click the gear → select **Web app**.
- **Execute as:** Me.
- **Who has access:** **Anyone**.  *(Required — our server calls it without a Google login. The URL stays secret server-side and the API route validates + has a bot honeypot.)*
- **Deploy**, then **Authorize access** and grant the permissions.
- Copy the **Web app URL** (it ends in `/exec`).

### 4. Point the site at it
- Put the URL in `.env.local`:

```
WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
```

- **Restart the dev server** (`npm run dev`) — env vars are read at startup.
- On the production host (e.g. Vercel), add the same `WAITLIST_WEBHOOK_URL`
  environment variable.

### 5. Test
- Open `/cmun-connect`, submit the form, and confirm a new row appears in the Sheet.

## Updating the script later
If you change the Apps Script, redeploy: **Deploy → Manage deployments → Edit (pencil)
→ Version: New version → Deploy.** The `/exec` URL stays the same.
