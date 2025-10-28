# 🤖 CyvexBot - AI Security Training Assistant

## Overview

CyvexBot is an AI-powered security training assistant integrated directly into the Cyvex extension. It helps employees at small and medium-sized businesses learn about cybersecurity through interactive conversations.

---

## 🌟 Features

### ✅ **What CyvexBot Can Do:**

1. **Security Training**
   - Teach how to spot phishing emails
   - Explain common attack vectors
   - Share best practices for safe browsing
   - Guide on password security and MFA

2. **Extension Help**
   - Explain how to use Cyvex
   - Interpret badge colors (SAFE, WARN, DANGER)
   - Show keyboard shortcuts
   - Help configure settings

3. **Context-Aware Assistance**
   - Knows current page scan results
   - Can explain why links are flagged
   - Provides page-specific advice

4. **Interactive & Friendly**
   - Natural conversation style
   - Quick reply buttons for common questions
   - Chat history saved locally
   - Clear, simple explanations

---

## 🚀 How to Use

### **Opening the Chatbot**

Click the **purple robot button** (🤖) in the bottom-right corner of any webpage.

### **Quick Start Questions**

When you first open CyvexBot, you'll see 4 quick-reply buttons:

| Button | What It Does |
|--------|--------------|
| 🎣 **How to spot phishing?** | Learn to identify phishing attempts |
| 🛡️ **How to use Cyvex?** | Get started with the extension |
| 🔒 **Security tips** | Learn best practices |
| ⚠️ **Found dangerous link?** | What to do about threats |

### **Having a Conversation**

1. Type your question in the input box
2. Press Enter or click the send button ➤
3. CyvexBot will respond in 2-3 seconds
4. Ask follow-up questions naturally!

### **Example Questions**

```
"How do I know if an email is phishing?"
"What should I do if I clicked a suspicious link?"
"How do I scan links on this page?"
"Why is this link marked as dangerous?"
"What's multi-factor authentication?"
```

---

## 🎨 Chat Interface

### **Chat Window Elements:**

```
┌─────────────────────────────────┐
│ 🤖 CyvexBot              🧹  ✕  │  ← Header with clear/close
├─────────────────────────────────┤
│                                 │
│  🤖 Hi! I'm CyvexBot...         │  ← Bot messages (white)
│                                 │
│          Your question... 👤    │  ← Your messages (purple)
│                                 │
├─────────────────────────────────┤
│ Quick questions:                │  ← Quick replies (first chat)
│ [🎣 Spot phishing] [🛡️ Use...] │
├─────────────────────────────────┤
│ Ask me anything... ➤            │  ← Input area
├─────────────────────────────────┤
│ Powered by Gemini AI            │  ← Footer
└─────────────────────────────────┘
```

### **Actions:**

- **🧹 Clear Chat** - Start a fresh conversation
- **✕ Close** - Minimize chatbot (click button to reopen)

---

## 🧠 What CyvexBot Knows

### **Security Topics:**

✅ Phishing & Spear Phishing  
✅ Social Engineering  
✅ Password Best Practices  
✅ Multi-Factor Authentication  
✅ Safe Browsing Habits  
✅ Email Security  
✅ Link Verification  
✅ Business Email Compromise (BEC)  
✅ Malware & Ransomware Basics  

### **Cyvex Extension:**

✅ How to scan links  
✅ Badge meanings (SAFE, WARN, DANGER)  
✅ Keyboard shortcuts  
✅ Settings configuration  
✅ Understanding scan results  
✅ Recent scans history  

### **Context Awareness:**

CyvexBot can see:
- Number of safe links on current page
- Number of warnings
- Number of dangerous links

Example: *"I see you have 3 dangerous links on this page. Would you like me to explain what makes a link dangerous?"*

---

## 🔧 Technical Details

### **Powered By:**

- **Google Gemini Pro** - Advanced AI language model
- **Real-time responses** - 2-3 second response time
- **Local storage** - Chat history stored on your device
- **Privacy-focused** - Conversations are not shared

### **API Configuration:**

The chatbot uses Google's Gemini API with these settings:

```javascript
Temperature: 0.7 (balanced creativity)
Max Tokens: 300 (concise responses)
Safety: Medium filtering
Context: Last 10 messages
```

### **Performance:**

- Response time: 2-3 seconds
- Network usage: ~5KB per message
- Storage: ~1KB per conversation
- Works offline: No (requires internet)

---

## 📊 Use Cases for SMEs

### **For Employees:**

1. **New Hire Training**
   - "I'm new here. What security things should I know?"
   - Get instant onboarding assistance

2. **Suspicious Email Received**
   - "I got an email asking for my password. Is this normal?"
   - Real-time threat assessment guidance

3. **Link Verification**
   - "How do I check if this link is safe?"
   - Step-by-step verification instructions

4. **Security Refresher**
   - "What are the top 5 security tips?"
   - Quick review of best practices

### **For Managers:**

1. **Training Tool**
   - Direct employees to CyvexBot for self-service learning
   - Reduce training time and costs

2. **Security Awareness**
   - Encourage regular chatbot use
   - Build security-conscious culture

3. **Incident Response**
   - Employees get immediate guidance
   - Reduce panic and mistakes

---

## 🎓 Training Scenarios

### **Scenario 1: Phishing Email**

**Employee:** *"I got an urgent email from IT asking me to verify my account. What should I do?"*

**CyvexBot:** *"🚨 Stop! This sounds like a phishing attempt. Real IT teams never ask for passwords via email. Here's what to do:*

*1. Don't click any links in that email*
*2. Check the sender's email address carefully*
*3. Contact your IT department directly*
*4. Report it as phishing*

*Would you like me to explain other phishing red flags?"*

### **Scenario 2: Unknown Link**

**Employee:** *"Someone sent me a link. How do I check if it's safe?"*

**CyvexBot:** *"Great question! Here's how to check links safely:*

*1. Hover over the link (don't click!) to see the URL*
*2. Use Cyvex: Click the extension icon → 'Scan This Page'*
*3. Look for these red flags:*
   *• Misspelled domain names*
   *• Strange characters or numbers*
   *• Shortened URLs (bit.ly, etc.)*

*Want me to explain what makes a URL suspicious?"*

---

## 🔐 Security & Privacy

### **Your Data:**

✅ **Conversations stored locally** - On your device only  
✅ **No data collection** - We don't track or store your chats  
✅ **API calls encrypted** - HTTPS to Google Gemini  
✅ **No sensitive data sent** - Never send passwords or personal info  

### **Best Practices:**

⚠️ **Don't share in chat:**
- Passwords
- Credit card numbers
- Social security numbers
- Personal identifying information

✅ **Do share:**
- General security questions
- Extension usage questions
- Learning and training needs

---

## ⚙️ Configuration

### **Changing API Key:**

If you want to use your own Gemini API key:

1. Edit `/src/services/chatbotService.js`
2. Change the `apiKey` value
3. Rebuild the extension: `npm run build`

### **Customizing Responses:**

Edit the `systemPrompt` in `chatbotService.js` to:
- Change bot personality
- Add company-specific policies
- Customize training content
- Add industry-specific advice

---

## 🐛 Troubleshooting

### **Chatbot Not Responding:**

1. ✅ Check internet connection
2. ✅ Verify API key is valid
3. ✅ Check browser console for errors
4. ✅ Reload the extension

### **Slow Responses:**

- Normal response time: 2-3 seconds
- If slower: Check network speed
- API rate limits: 60 requests/minute

### **Button Not Visible:**

1. ✅ Make sure you're on an http(s) page
2. ✅ Check if element is behind another widget
3. ✅ Try refreshing the page

---

## 📈 Metrics & Success

### **Training Effectiveness:**

Track how CyvexBot helps your team:

- Number of questions asked
- Topics most frequently discussed
- Employee engagement with security training
- Reduction in security incidents

### **ROI for SMEs:**

- ⏱️ **Time saved:** Instant answers vs manual training
- 💰 **Cost effective:** Free AI training vs paid courses
- 📚 **Always available:** 24/7 learning resource
- 🎯 **Contextual:** Page-specific guidance

---

## 🚀 Future Enhancements

Potential features for v2:

- 📊 Quiz mode (currently excluded per user request)
- 📈 Progress tracking
- 🏆 Achievement badges
- 📧 Email report summaries
- 🌐 Multi-language support
- 🎤 Voice interaction

---

## 💡 Tips for Maximum Value

1. **Encourage Daily Use**
   - Make it part of onboarding
   - Reference in security policies
   - Promote in team meetings

2. **Ask Specific Questions**
   - "How do I verify sender addresses?"
   - Better than: "Tell me about email"

3. **Use Quick Replies**
   - Fastest way to learn common topics

4. **Share Success Stories**
   - When employees spot phishing
   - When CyvexBot prevents incidents

---

## 📞 Support

**For technical issues:**
- Check browser console logs
- Verify manifest permissions
- Ensure API key is valid

**For training content:**
- Customize system prompt
- Add company-specific scenarios
- Update knowledge base

---

## 🎉 Benefits Summary

| Benefit | Description |
|---------|-------------|
| 🎓 **Always Learning** | 24/7 training available |
| 💬 **Interactive** | Natural conversations, not boring slides |
| 🎯 **Contextual** | Page-aware advice |
| 🚀 **Instant** | No waiting for training sessions |
| 💰 **Cost-effective** | Free AI-powered training |
| 🛡️ **Security-focused** | Built specifically for threat prevention |

---

**CyvexBot makes security training accessible, engaging, and effective for every employee!** 🤖✨

*Version 1.2.0 - Powered by Google Gemini AI*

