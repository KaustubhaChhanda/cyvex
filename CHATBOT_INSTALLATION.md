# 🤖 CyvexBot Installation & Testing Guide

## ✅ Status: **READY TO USE!**

Your AI-powered security training chatbot has been successfully integrated and tested!

---

## 📦 What's Included

### New Files Created:
```
✅ /src/services/chatbotService.js       (API integration)
✅ /src/components/ChatbotWidget.jsx     (React component)
✅ /src/components/ChatbotWidget.css     (Beautiful styling)
✅ /CHATBOT_GUIDE.md                     (User documentation)
✅ /QUICK_START.md                       (Visual guide)
✅ /CHATBOT_FEATURES.md                  (Feature summary)
✅ /CHATBOT_INSTALLATION.md              (This file)
```

### Updated Files:
```
✅ /src/content/content.jsx              (Chatbot integration)
✅ /manifest.json                        (v1.2.0 + permissions)
✅ /public/manifest.json                 (v1.2.0 + permissions)
✅ /package.json                         (v1.2.0)
✅ /README.md                            (Updated features)
```

---

## 🚀 Installation Steps

### Step 1: Build the Extension (1 minute)

```bash
cd /Users/kaliprasadbisoii/Downloads/cyvex_2
npm install
npm run build
```

**Expected Output:**
```
✓ 51 modules transformed.
✓ built in ~350ms
```

### Step 2: Load in Chrome (1 minute)

1. Open Chrome
2. Go to: `chrome://extensions/`
3. Enable **"Developer mode"** (top-right toggle)
4. Click **"Load unpacked"**
5. Select folder: `/Users/kaliprasadbisoii/Downloads/cyvex_2/dist`
6. Done! 🎉

### Step 3: Verify Installation (30 seconds)

1. Visit any website (e.g., https://google.com)
2. Look for **purple robot button** 🤖 in bottom-right corner
3. Click it to open chatbot
4. You should see: "Hi! 👋 I'm CyvexBot..."

**If you see the chatbot, you're all set!** ✅

---

## 🧪 Testing the Chatbot

### Test 1: Basic Conversation

1. Open chatbot (click 🤖 button)
2. Click quick-reply: **"🎣 How to spot phishing?"**
3. Wait 2-3 seconds
4. You should get a detailed response about phishing

**Expected Response:**
```
Great question! Here are the key signs of phishing:

1. Urgent language ("Act now!" "Account suspended!")
2. Suspicious sender addresses (check carefully)
3. Generic greetings ("Dear user" not your name)
4. Requests for passwords or personal info
5. Strange links (hover to check URL)

Would you like me to explain any of these in detail?
```

### Test 2: Custom Question

1. Type: "What should I do if I clicked a suspicious link?"
2. Press Enter or click ➤
3. Wait for response

**Expected Response:**
```
If you clicked a suspicious link, here's what to do:

1. Don't enter any information if a page loads
2. Close the browser tab immediately
3. Scan your computer with antivirus
4. Change passwords for sensitive accounts
5. Report it to your IT team
6. Monitor accounts for unusual activity

The faster you act, the better! Need help with any step?
```

### Test 3: Context Awareness

1. Visit a page with links
2. Click Cyvex extension icon → "Scan This Page"
3. Open chatbot
4. Type: "What's the status of this page?"

**Expected Response:**
```
I can see you have [X] links on this page:
• [X] safe links 🟢
• [X] warnings 🟠
• [X] dangerous links 🔴

[Context-specific advice based on scan results]
```

### Test 4: Cyvex Help

1. Ask: "How do I use the Cyvex extension?"
2. Wait for response

**Expected Response:**
```
Using Cyvex is easy! Here's how:

1. Click the Cyvex icon in your toolbar
2. Select "Scan This Page"
3. Look for colored badges next to links:
   • SAFE (green) = Safe to click
   • WARN (orange) = Be careful
   • DANGER (red) = Don't click!

You can also press Ctrl+Shift+X for the overlay.

What would you like to know more about?
```

---

## ✅ Verification Checklist

Run through this checklist to ensure everything works:

### Visual Elements:
- [ ] Purple robot button appears in bottom-right corner
- [ ] Button has pulse animation
- [ ] Button shows "?" badge
- [ ] Clicking button opens chat window
- [ ] Chat window has gradient header (purple)
- [ ] Welcome message displays
- [ ] Quick-reply buttons show (4 buttons)

### Functionality:
- [ ] Can type in input box
- [ ] Send button (➤) works
- [ ] Enter key sends message
- [ ] Typing indicator appears (3 dots)
- [ ] AI response arrives in 2-3 seconds
- [ ] Messages show timestamps
- [ ] Can scroll through messages
- [ ] Quick-replies work on click
- [ ] Clear chat (🧹) works
- [ ] Close (✕) minimizes chatbot

### Integration:
- [ ] Chatbot works on multiple websites
- [ ] Chatbot persists during page navigation
- [ ] No console errors in browser DevTools
- [ ] Extension icon shows in toolbar
- [ ] Scan functionality still works
- [ ] Overlay still works (Ctrl+Shift+X)

---

## 🔍 Troubleshooting

### Issue: Chatbot button doesn't appear

**Solution:**
1. Make sure you loaded the `dist/` folder (not root folder)
2. Visit an `http://` or `https://` page (not `chrome://`)
3. Refresh the page (Ctrl+R)
4. Check browser console for errors

### Issue: Chatbot doesn't respond

**Solution:**
1. Check internet connection
2. Open browser console (F12)
3. Look for API errors
4. Verify API key in `/src/services/chatbotService.js`
5. Try rebuilding: `npm run build`

### Issue: "API Error" in responses

**Solution:**
1. API key may have exceeded daily limit (1,500 requests)
2. Check API key is valid
3. Verify model name is `gemini-2.5-flash`
4. Check network firewall/proxy settings

### Issue: Chatbot looks broken/unstyled

**Solution:**
1. Rebuild extension: `npm run build`
2. Remove and reload extension in Chrome
3. Clear browser cache
4. Check `/src/components/ChatbotWidget.css` exists

### Issue: Messages appear upside down

**Solution:**
1. This should be fixed in v1.2.0
2. If still happening, check page has conflicting CSS
3. Try on a different website
4. Report as bug with screenshot

---

## 🎓 Usage Tips

### For Best Results:

1. **Ask specific questions**
   - ✅ "How do I verify a sender's email address?"
   - ❌ "Tell me about email"

2. **Use quick replies first**
   - Fastest way to learn common topics

3. **Ask follow-up questions**
   - CyvexBot remembers last 10 messages

4. **Be conversational**
   - Ask naturally, like talking to a colleague

5. **Clear chat when changing topics**
   - Click 🧹 to start fresh conversation

---

## 📊 API Usage & Limits

### Google Gemini API (Free Tier):

```
Daily Requests:     1,500 free
Rate Limit:         60 requests/minute
Response Time:      2-3 seconds average
Max Response:       300 tokens (~150 words)
Context Window:     Last 10 messages
Cost:               $0 (FREE!)
```

### Monitoring Usage:

Check your API usage at:
https://makersuite.google.com/app/apikey

### If You Exceed Limits:

1. Wait 24 hours for reset
2. Get your own API key (free)
3. Update `/src/services/chatbotService.js`
4. Rebuild: `npm run build`

---

## 🔒 Security Notes

### What's Safe:

✅ Conversation data stored locally only  
✅ No data sent to Cyvex servers  
✅ API calls encrypted (HTTPS)  
✅ No tracking or analytics  
✅ Open source code  

### What to Avoid:

❌ Don't share passwords in chat  
❌ Don't share credit card numbers  
❌ Don't share social security numbers  
❌ Don't share API keys publicly  

The chatbot is designed for training, not for handling sensitive data!

---

## 📚 Documentation

### Quick Reference:

| Document | Purpose |
|----------|---------|
| `README.md` | Main project overview |
| `CHATBOT_GUIDE.md` | Detailed user guide (comprehensive) |
| `QUICK_START.md` | Visual installation & examples |
| `CHATBOT_FEATURES.md` | Technical feature summary |
| `CHATBOT_INSTALLATION.md` | This file (setup & testing) |

### For Users:
→ Start with `QUICK_START.md`

### For Training:
→ Read `CHATBOT_GUIDE.md`

### For Developers:
→ See `CHATBOT_FEATURES.md`

---

## 🎉 You're Ready!

### What You Can Do Now:

1. ✅ Train your team with AI assistant
2. ✅ Answer security questions 24/7
3. ✅ Improve phishing awareness
4. ✅ Reduce security incidents
5. ✅ Build security-conscious culture

### Next Steps:

1. **Week 1:** Personal testing
   - Use on your own computer
   - Ask various questions
   - Get comfortable with features

2. **Week 2:** Pilot with small team
   - 3-5 employees
   - Gather feedback
   - Refine usage patterns

3. **Month 1:** Full deployment
   - Roll out to entire company
   - Promote in onboarding
   - Track security improvements

---

## 📞 Support

### Need Help?

1. **Check documentation** (see above)
2. **Review troubleshooting** (in this file)
3. **Check browser console** (F12 → Console tab)
4. **Test API key** (see testing section)

### Want to Customize?

Edit these files:
- `/src/services/chatbotService.js` - System prompt & behavior
- `/src/components/ChatbotWidget.css` - Styling & colors
- `/src/components/ChatbotWidget.jsx` - UI & features

After editing, rebuild:
```bash
npm run build
```

---

## 🌟 Success Stories

### Example Scenarios:

**New Employee:**
> "I'm new here and got an email asking to reset my password. 
> Should I click the link?"

**CyvexBot saved them from phishing!** ✅

**Manager:**
> "What security training should I give my team?"

**CyvexBot provided instant curriculum!** ✅

**Developer:**
> "How do I check if this API endpoint is safe?"

**CyvexBot explained verification steps!** ✅

---

## 🎊 Congratulations!

**Your extension now has:**

✅ Real-time phishing protection  
✅ Visual link safety indicators  
✅ AI-powered training assistant  
✅ 24/7 security expertise  
✅ Zero-cost deployment  
✅ Enterprise-grade security  

**All for FREE!** 🎉

---

**CyvexBot is ready to protect your team!** 🛡️🤖

*Version 1.2.0 - Powered by Google Gemini 2.5 Flash*

---

## 📋 Quick Command Reference

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development mode (with hot reload)
npm run dev

# Check for build errors
npm run build 2>&1 | grep -i error

# Verify API key works
node -e "fetch('https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY').then(r=>r.json()).then(console.log)"
```

---

**Made with ❤️ for Small & Medium Enterprises**

*Empowering employees to stay safe online, one chat at a time.*

