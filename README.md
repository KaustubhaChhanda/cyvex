# Cyvex - Phishing Protection Chrome Extension

🛡️ **Protect your business from phishing attacks with real-time link checking and cybersecurity awareness tips**

Cyvex is a Chrome extension designed specifically for Small and Medium Enterprises (SMEs) that provides zero-setup, no-cost phishing protection with a focus on non-technical usability.

## Features

### 🔍 Real-time Link Scanning

- Automatically scans all links on web pages
- Checks IP reputation via AbuseIPDB (threat intelligence)
- Resolves domains to IPs using DNS-over-HTTPS
- Visual indicators show link safety status

### 🎯 Visual Safety Status

- **SAFE** (Green badge) - Link appears legitimate
- **WARN** (Orange badge) - Suspicious characteristics detected
- **DANGER** (Red badge) - Known phishing domain
- **?** (Gray badge) - Unable to verify

### 🤖 AI-Powered Training Assistant **[NEW in v1.2.0]**

- **CyvexBot** - Interactive security training chatbot
- Powered by Google Gemini AI
- Learn to spot phishing and social engineering
- Get instant answers to security questions
- Context-aware (knows current page scan results)
- 24/7 available training resource
- Quick-reply buttons for common questions
- Perfect for SME employee training

### 💡 Cybersecurity Awareness

- Random security tips displayed in popup
- Educational content for non-technical users
- Best practices for email and web security
- Regular updates with new security insights

### 🚀 Zero Setup Required

- No configuration needed
- Works immediately after installation
- No technical knowledge required

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the Cyvex folder
5. The extension will be installed and ready to use

## Usage

### Automatic Protection

- Cyvex automatically scans all links on any webpage you visit
- Look for the colored badge indicators next to links:
  - **●** (Blue) - Checking in progress
  - **SAFE** (Green) - Safe to click
  - **WARN** (Orange) - Proceed with caution
  - **DANGER** (Red) - Potentially dangerous

### Security Overlay

- Press `Ctrl+Shift+X` to toggle the security overlay
- View real-time statistics of link safety
- Get random security tips
- Access detailed security information

### Extension Popup

- Click the Cyvex icon in your browser toolbar
- View current page security status
- Get new security tips
- Access recent scan history

### AI Training Chatbot 🤖

- Click the **purple robot button** in the bottom-right corner
- Ask questions about security or how to use Cyvex
- Get instant, conversational answers
- Use quick-reply buttons for common topics:
  - 🎣 How to spot phishing?
  - 🛡️ How to use Cyvex?
  - 🔒 Security tips
  - ⚠️ Found dangerous link?
- Clear chat history or minimize anytime
- **See [CHATBOT_GUIDE.md](CHATBOT_GUIDE.md) for detailed usage**

## How It Works

### Malicious Site Detection

1. **DNS Resolution (DoH)**: Resolve domain to IPs via Google DNS-over-HTTPS
2. **AbuseIPDB Check**: Query each IP using AbuseIPDB `check` endpoint
3. **Risk Mapping**: Map Abuse Confidence Score and report counts to statuses
4. **Aggregation**: Use highest-risk status across all resolved IPs

### Security Tips

- Rotating collection of cybersecurity best practices
- Categorized by security type (Email, Web, Password, etc.)
- Updated regularly with new insights
- Designed for non-technical users

## Privacy & Security

- **No Data Collection**: Cyvex doesn't collect or store personal information
- **Minimal External Calls**: Only resolved IPs are queried against AbuseIPDB
- **Open Source**: Full source code available for review
- **No Tracking**: No user behavior tracking or analytics

## Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension standards
- **Content Scripts**: Scans web pages in real-time
- **Background Service Worker**: Resolves domains and queries AbuseIPDB
- **Popup Interface**: User-friendly dashboard for security status

### Threat Intelligence Integration

- Uses AbuseIPDB for IP reputation checks
- Local caching reduces API calls and latency
- Fallback to cached results if network unavailable
- No browsing history is uploaded; only IPs are checked

### AI Training Integration

- **Google Gemini Pro** for natural language understanding
- Specialized system prompt for security training
- Context-aware responses based on page scans
- Conversation history stored locally
- Response time: 2-3 seconds
- Privacy-focused: no data collection

## Development

### Project Structure

```
cyvex_2/
├── manifest.json                    # Extension configuration (Vanilla JS)
├── background.js                    # Service worker for link checking
├── content.js                      # Content script for page scanning
├── popup.html/js/css               # Extension popup interface
├── options.html/js/css             # Extension settings page
├── styles.css                      # Content script styling
├── icons/                          # Extension icons
├── src/                            # React source files
│   ├── popup/                      # React popup
│   ├── options/                    # React options
│   ├── content/                    # React content script
│   ├── components/                 # React components
│   │   └── ChatbotWidget.jsx       # AI chatbot component
│   └── services/                   # Shared services
│       └── chatbotService.js       # Gemini API integration
├── public/                         # React build assets
├── dist/                           # Built extension (React)
├── CHATBOT_GUIDE.md               # Chatbot usage guide
└── README.md                       # This file
```

### Building

**For Vanilla JS version:**
No build process required - the extension runs directly from source files.

**For React version (with chatbot):**
```bash
npm install        # Install dependencies
npm run build      # Build for production
```

The built extension will be in the `dist/` folder.

### Testing

1. Load the extension in Chrome developer mode
2. Visit various websites to test link scanning
3. Check the popup for security status updates
4. Verify security tips are displayed correctly

## Contributing

We welcome contributions! Please feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the MIT License.

## Support

For support, questions, or feature requests:

- Open an issue on GitHub
- Check the documentation
- Review the source code

## Version History

### v1.2.0 (Latest) 🎉

- **NEW**: AI-powered training chatbot (CyvexBot)
- **NEW**: Interactive security learning with Google Gemini
- **NEW**: Context-aware assistance based on scan results
- **NEW**: Quick-reply training buttons
- **NEW**: 24/7 security question answering
- Enhanced employee training capabilities
- Comprehensive chatbot documentation

### v1.1.2

- Fixed badge positioning issues
- Changed from emoji to text badges (SAFE, WARN, DANGER)
- Improved scrolling behavior
- Better visual isolation from page CSS

### v1.1.0

- Fixed critical XSS vulnerability in popup
- Improved error handling for non-http(s) tabs
- Added toast notifications
- Enhanced link filtering to avoid scanning UI elements
- Keyboard shortcut changed to Ctrl+Shift+X

### v1.0.0

- Initial release
- Real-time link scanning
- Phishing database integration
- Security tips system
- Visual safety indicators
- Zero-setup installation

---

**Cyvex** - Making cybersecurity accessible for everyone. 🛡️
