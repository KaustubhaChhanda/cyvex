# 🔧 Chatbot Troubleshooting Guide

## Quick Checklist

### ✅ Step 1: Verify You Loaded the CORRECT Folder

**IMPORTANT:** You must load the `dist/` folder, NOT the root folder!

```
❌ WRONG: /Users/kaliprasadbisoii/Downloads/cyvex_2
✅ RIGHT:  /Users/kaliprasadbisoii/Downloads/cyvex_2/dist
```

**How to check:**
1. Go to `chrome://extensions/`
2. Find "Cyvex - Phishing Protection"
3. Look at the path shown
4. It should end with `/dist`

**If it's wrong:**
1. Click "Remove" on the extension
2. Click "Load unpacked" again
3. Navigate to `/Users/kaliprasadbisoii/Downloads/cyvex_2/dist` (not the root!)
4. Select the `dist` folder

---

### ✅ Step 2: Make Sure You're on an HTTP(S) Page

**Chatbot only works on regular websites!**

```
❌ Won't work: chrome://extensions/
❌ Won't work: chrome://settings/
❌ Won't work: about:blank
❌ Won't work: file:///
✅ WORKS:     https://google.com
✅ WORKS:     https://github.com
✅ WORKS:     http://example.com
```

**Try this:**
1. Open a new tab
2. Go to: https://www.google.com
3. Wait 2 seconds
4. Look for the purple robot button 🤖 in bottom-right

---

### ✅ Step 3: Refresh the Page

After loading the extension, refresh any open tabs:

1. Press `Ctrl+R` (or `Cmd+R` on Mac)
2. Or click the refresh button
3. Wait 2-3 seconds
4. Look for the chatbot button

---

### ✅ Step 4: Check Browser Console

Open Developer Tools to see if there are any errors:

1. Press `F12` (or right-click → "Inspect")
2. Click the "Console" tab
3. Look for any RED error messages
4. Screenshot and share if you see errors

---

## 🐛 Common Issues & Fixes

### Issue 1: "I loaded the root folder by mistake"

**Fix:**
```bash
1. Remove extension from chrome://extensions/
2. Load unpacked again
3. Navigate to: /Users/kaliprasadbisoii/Downloads/cyvex_2/dist
4. Click "Select Folder" on the dist folder
```

### Issue 2: "I'm on chrome:// pages"

**Fix:**
```
Open a normal website like:
- https://google.com
- https://github.com
- https://amazon.com
```

### Issue 3: "I don't see the button at all"

**Fix:**
```bash
1. Check you're on http:// or https:// page
2. Refresh the page (Ctrl+R)
3. Scroll down (button is bottom-right)
4. Check if any other extension is blocking it
```

### Issue 4: "Extension icon is grayed out"

**Fix:**
```
Extension only works on http(s) pages.
Chrome disables extensions on:
- chrome:// pages
- Extension store pages
- New tab page (sometimes)
```

---

## 🔍 Diagnostic Test

### Test 1: Is Extension Loaded?

1. Go to: `chrome://extensions/`
2. Find: "Cyvex - Phishing Protection"
3. Check: Toggle is ON (blue)
4. Check: No errors shown

### Test 2: Does Content Script Load?

1. Go to: https://www.google.com
2. Press F12 (open console)
3. Type: `document.getElementById('cyvex-chatbot-container')`
4. Press Enter

**Expected:** Should show an HTML element (not `null`)

### Test 3: Is Chatbot Rendering?

1. Go to: https://www.google.com
2. Press F12
3. Type: `document.querySelector('.cyvex-chatbot-button')`
4. Press Enter

**Expected:** Should show a button element (not `null`)

---

## 📸 Visual Guide

### What You Should See:

```
┌─────────────────────────────────────────┐
│                                         │
│         Your Webpage Content            │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                            ┌─────────┐  │
│                            │   🤖    │  │ ← Purple button
│                            │   ?     │  │    here!
│                            └─────────┘  │
└─────────────────────────────────────────┘
```

### Where to Look:

- **Bottom-right corner** of the page
- **Purple gradient** circular button
- **Robot emoji** 🤖 in center
- **Small red "?" badge** on top

---

## 🛠️ Manual Re-build (If Needed)

If nothing works, try rebuilding:

```bash
cd /Users/kaliprasadbisoii/Downloads/cyvex_2
npm run build
```

Then:
1. Go to chrome://extensions/
2. Click refresh icon on Cyvex extension
3. Open https://google.com
4. Look for chatbot button

---

## 🆘 Still Not Working?

### Copy and paste this into browser console:

Go to https://google.com, press F12, paste this:

```javascript
console.log("=== CYVEX CHATBOT DIAGNOSTIC ===");
console.log("1. Chatbot container:", document.getElementById('cyvex-chatbot-container'));
console.log("2. Chatbot button:", document.querySelector('.cyvex-chatbot-button'));
console.log("3. Content script loaded:", typeof LinkScanner !== 'undefined');
console.log("4. Page URL:", window.location.href);
console.log("5. Protocol:", window.location.protocol);
```

**Share the output with me!**

---

## ✅ Success Checklist

When working correctly, you should see:

- [ ] Purple robot button in bottom-right
- [ ] Button has pulse animation
- [ ] Button has small red "?" badge
- [ ] Clicking button opens chat window
- [ ] Chat shows "Hi! 👋 I'm CyvexBot..."
- [ ] Quick-reply buttons are visible
- [ ] Can type in input field

---

## 📞 Quick Help Commands

### Reload Extension:
```
chrome://extensions/ → Click reload icon on Cyvex
```

### Check Loaded Folder:
```
chrome://extensions/ → Cyvex → Details → Check path
```

### Open Test Page:
```
Open new tab → https://www.google.com
```

### Check Console:
```
F12 → Console tab → Look for errors
```

---

**Let me know what you see and I'll help you fix it!** 🔧

