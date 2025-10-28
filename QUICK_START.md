# 🚀 Cyvex Quick Start Guide

## Installation (2 Minutes)

### React Version (With Chatbot) - **RECOMMENDED** ⭐

1. **Build the extension:**
   ```bash
   cd /Users/kaliprasadbisoii/Downloads/cyvex_2
   npm install
   npm run build
   ```

2. **Load in Chrome:**
   - Open Chrome → `chrome://extensions/`
   - Enable **Developer mode** (top-right)
   - Click **"Load unpacked"**
   - Select the `dist/` folder
   - Done! 🎉

### Vanilla JS Version (No Chatbot)

1. **Load in Chrome:**
   - Open Chrome → `chrome://extensions/`
   - Enable **Developer mode**
   - Click **"Load unpacked"**
   - Select the `/Users/kaliprasadbisoii/Downloads/cyvex_2` folder
   - Done! 🎉

---

## First Time Setup (30 Seconds)

### Configure AbuseIPDB API Key (Optional)

1. Click the **Cyvex icon** in Chrome toolbar
2. Click **"Options"** or go to `chrome://extensions/` → Cyvex → Details → Extension options
3. Paste your AbuseIPDB API key
4. Click **"Save Settings"**

> **Note:** The extension works without an API key, but link checking will be limited.

---

## Using Cyvex - Visual Guide

### 1️⃣ Automatic Link Scanning

When you visit any webpage, Cyvex automatically scans all links:

```
🔵 ●          = Checking...
🟢 SAFE       = Safe to click
🟠 WARN       = Be cautious
🔴 DANGER     = Don't click!
⚪ ?          = Can't verify
```

**Example:**
```
Visit Amazon: [Shop Now] SAFE
Click here for free iPhone: [Click] DANGER
```

### 2️⃣ Extension Popup

Click the **Cyvex icon** in toolbar to see:

```
┌─────────────────────────────┐
│   Cyvex - Phishing Guard    │
├─────────────────────────────┤
│ Current Page Status          │
│                             │
│ ✅ Safe Links: 15           │
│ ⚠️  Warnings: 2             │
│ 🚫 Dangerous: 0             │
│                             │
│ [Scan This Page]            │
├─────────────────────────────┤
│ 💡 Security Tip              │
│ Always verify sender...     │
├─────────────────────────────┤
│ Recent Scans                │
│ • example.com - Safe        │
│ • suspicious.net - Warning  │
└─────────────────────────────┘
```

### 3️⃣ Security Overlay

Press **`Ctrl + Shift + X`** on any page to show:

```
┌─────────────────────────────┐
│     🛡️ Cyvex Security       │
├─────────────────────────────┤
│ Safe:      15 🟢            │
│ Warnings:   2 🟠            │
│ Dangerous:  0 🔴            │
│ Errors:     1 ⚪            │
├─────────────────────────────┤
│ 💡 Security Tip              │
│ Hover over links before...  │
├─────────────────────────────┤
│ [View Details]  [Close]     │
└─────────────────────────────┘
```

### 4️⃣ AI Training Chatbot 🤖 **[NEW!]**

Look for the **purple robot button** in bottom-right corner:

```
                          ┌─────────────────────┐
                          │ 🤖 CyvexBot      ✕  │
                          ├─────────────────────┤
                          │                     │
                          │ 🤖 Hi! I'm Cyvex... │
                          │                     │
                          │     Your reply 👤   │
                          │                     │
                          ├─────────────────────┤
                          │ Quick questions:    │
                          │ [🎣 Spot phishing?] │
                          │ [🛡️ Use Cyvex?]     │
                          ├─────────────────────┤
                          │ Ask anything... ➤   │
                          └─────────────────────┘
                                    🤖
```

**Try asking:**
- "How do I spot a phishing email?"
- "What should I do if I see a dangerous link?"
- "How do I use the Cyvex extension?"
- "What is multi-factor authentication?"

---

## Feature Showcase

### Real-World Example 1: Shopping Online

**Scenario:** You're on Amazon and see an ad:

```
🔴 DANGER  "Get iPhone 15 for $10!"
           ↳ CyvexBot: "This is likely a scam. Real iPhones 
              cost $800+. The domain is flagged as malicious."
```

✅ **Result:** You avoided a phishing site!

### Real-World Example 2: Work Email

**Scenario:** You get an email from "IT Support":

```
Subject: Urgent - Verify Your Account

Dear User,
Your account will be suspended. Click here:
[Verify Now] 🔴 DANGER

👤 You: "I got an email asking me to verify my account."
🤖 CyvexBot: "Stop! This is likely phishing. Real IT never 
    asks for passwords via email. Here's what to do:
    1. Don't click the link
    2. Check the sender address
    3. Contact IT directly
    4. Report as phishing"
```

✅ **Result:** You prevented a breach!

### Real-World Example 3: Learning Mode

**Scenario:** New employee training:

```
👤 Employee: "What are the most important security tips?"

🤖 CyvexBot: "Great question! Here are the top 5:

    1. 🔐 Use strong, unique passwords
    2. ✅ Enable multi-factor authentication
    3. 🎣 Be suspicious of urgent emails
    4. 🔗 Hover over links before clicking
    5. 🛡️ Keep software updated

    Would you like me to explain any of these?"
```

✅ **Result:** Self-service training complete!

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + X` | Toggle security overlay |
| `Click 🤖 button` | Open chatbot |
| `Enter` in chat | Send message |

---

## Tips for Maximum Protection

### ✅ Do:
- ✅ Check badge colors before clicking links
- ✅ Ask CyvexBot when unsure
- ✅ Report suspicious links to IT
- ✅ Use the overlay to see page stats
- ✅ Configure AbuseIPDB API key for better detection

### ❌ Don't:
- ❌ Click on 🔴 DANGER links
- ❌ Ignore 🟠 WARN badges
- ❌ Disable the extension on work sites
- ❌ Share your API key publicly
- ❌ Trust shortened URLs without checking

---

## Troubleshooting

### Chatbot not working?

1. ✅ Check internet connection
2. ✅ Verify you're on the React version (`dist/` folder)
3. ✅ Reload the extension
4. ✅ Check browser console for errors

### Links not being scanned?

1. ✅ Make sure you're on an `http://` or `https://` page
2. ✅ Click "Scan This Page" in popup
3. ✅ Check if content script is loaded (browser console)
4. ✅ Reload the page

### Badges showing upside down?

1. ✅ Update to v1.1.2+ (fixed in latest version)
2. ✅ Rebuild from source: `npm run build`
3. ✅ Reload extension

### API key not saving?

1. ✅ Go to extension options (not popup)
2. ✅ Paste key and click "Save"
3. ✅ Check Chrome sync is enabled
4. ✅ Try local storage as backup

---

## For Developers

### Testing the Chatbot

```javascript
// Open browser console on any page
const testMessage = "How do I spot phishing?";
console.log("Testing chatbot with:", testMessage);

// The chatbot should respond within 2-3 seconds
```

### Customizing System Prompt

Edit `/src/services/chatbotService.js`:

```javascript
buildSystemPrompt() {
  return `You are CyvexBot...
    
    // Add custom company policies here
    // Add industry-specific advice here
  `;
}
```

### Using Your Own Gemini API Key

1. Get free key: https://makersuite.google.com/app/apikey
2. Edit `/src/services/chatbotService.js`
3. Replace: `this.apiKey = 'YOUR_KEY_HERE';`
4. Rebuild: `npm run build`

---

## Success Metrics

Track how Cyvex protects your team:

### Week 1:
- Links scanned: **~500**
- Threats blocked: **~10**
- Chatbot questions: **~20**
- Time saved: **~2 hours**

### Month 1:
- Links scanned: **~2,000**
- Threats blocked: **~50**
- Chatbot questions: **~100**
- Time saved: **~10 hours**

### ROI:
- Cost: **$0** (Free & open source)
- Value: **Priceless** (One blocked attack pays for itself)

---

## What's Next?

1. **Day 1:** Install & test on safe websites
2. **Week 1:** Train team on chatbot usage
3. **Month 1:** Review scan statistics
4. **Quarter 1:** Customize for your industry

---

## Support & Resources

📖 **Full Documentation:** [README.md](README.md)  
🤖 **Chatbot Guide:** [CHATBOT_GUIDE.md](CHATBOT_GUIDE.md)  
🐛 **Report Issues:** Open GitHub issue  
💡 **Feature Requests:** Pull requests welcome!  

---

**You're all set! Stay safe online with Cyvex! 🛡️**

*Version 1.2.0 - Last updated: October 2025*

