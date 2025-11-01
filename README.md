# Cyvex - Phishing Protection Browser Extension

🛡️ **Protect your business from phishing attacks with real-time link checking and cybersecurity awareness tips**

## What This Project Does

Cyvex is a comprehensive browser extension that provides **real-time phishing protection** and **cybersecurity training** for businesses and individuals. Here's what it does:

### 🛡️ Real-Time Phishing Protection
- **Automatically scans all links** on every webpage you visit
- **Checks link safety** by resolving domains to IP addresses and querying threat intelligence databases
- **Displays visual warnings** (colored badges) next to dangerous or suspicious links
- **Protects you before you click** by showing link safety status in real-time

### 🤖 AI-Powered Security Training
- **CyvexBot chatbot** provides 24/7 security education and answers questions
- **Context-aware assistance** that understands what links you're viewing
- **Interactive learning** with quick-reply buttons for common security topics
- **No technical knowledge required** - designed for non-technical users

### 📊 Security Awareness & Monitoring
- **Security overlay** with keyboard shortcut (Ctrl+Shift+X) to view page security statistics
- **Security tips** displayed randomly to help users learn best practices
- **Scan history** and detailed link analysis in the extension popup
- **Real-time statistics** showing safe, warning, and dangerous links on each page

### 🎯 Designed for Small & Medium Businesses
- **Zero-setup required** - works immediately after installation
- **No-cost protection** - optional free API key for enhanced features
- **Privacy-focused** - no data collection, no tracking
- **Easy to use** - visual indicators and simple interface

Cyvex combines automated threat detection with human-friendly security education, making it perfect for SMEs who need strong cybersecurity protection without complex IT infrastructure.

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

- No configuration needed (optional AbuseIPDB API key for enhanced protection)
- Works immediately after installation
- No technical knowledge required
- Optional API key can be added in settings for better threat detection

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
- Conversation history is stored locally and never shared

## How It Works

### Malicious Site Detection Process

1. **Link Discovery**: Content script automatically finds all links on web pages
2. **Link Filtering**: Skips same-domain links, UI elements, and non-HTTP(S) protocols
3. **DNS Resolution (DoH)**: Resolves domain names to IP addresses via Google DNS-over-HTTPS
4. **IP Reputation Check**: Queries each resolved IP using AbuseIPDB API to check for reported abuse
5. **Risk Assessment**: Maps Abuse Confidence Score and report counts to safety statuses:
   - **DANGER**: Score ≥ 25 or ≥ 3 reports (high risk)
   - **WARN**: Score > 0 or reports > 0 (medium risk)
   - **SAFE**: No reports found (low risk)
6. **Status Aggregation**: Uses the highest-risk status across all resolved IPs for a domain
7. **Visual Indicators**: Displays colored badges next to links based on risk assessment
8. **Caching**: Results are cached locally for 6 hours to reduce API calls and improve performance

### Link Scanning Features

- **Automatic Scanning**: Scans links as pages load
- **Dynamic Content**: Monitors for dynamically added links using MutationObserver
- **Smart Filtering**: Ignores navigation links, UI buttons, and small/invisible elements
- **Real-time Updates**: Badges update as scan results become available
- **Overlay Statistics**: Keyboard shortcut (Ctrl+Shift+X) shows overall page security stats

### Security Tips System

- Rotating collection of cybersecurity best practices
- Categorized by security type (Email, Web, Password, Multi-factor Authentication, etc.)
- Displayed randomly in popup and overlay
- Updated regularly with new security insights
- Designed for non-technical users with simple, actionable advice

### AI Chatbot (CyvexBot) Functionality

- **Context Awareness**: Knows current page scan results (safe/warning/danger counts)
- **Intelligent Responses**: Uses Google Gemini Pro to provide helpful, conversational answers
- **Training Focus**: Specialized prompts for security education and phishing detection
- **Quick Actions**: Pre-configured buttons for common questions
- **Local Storage**: Conversation history stored locally in browser
- **Privacy-First**: No conversation data sent to third parties except Gemini API for responses

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

- **AbuseIPDB Integration**: Uses AbuseIPDB API for IP reputation checks
- **Free Tier Available**: Works without API key (limited functionality), optional key for full features
- **Local Caching**: Results cached for 6 hours to reduce API calls and improve latency
- **Offline Support**: Falls back to cached results if network is unavailable
- **Privacy Protection**: No browsing history is uploaded; only resolved IP addresses are checked
- **Rate Limiting**: Caching prevents excessive API calls and respects AbuseIPDB rate limits

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
cyvex/
├── manifest.json                    # Extension configuration
├── background.js                    # Service worker for link checking & API calls
├── content.js                      # Content script for page scanning
├── chatbot.js                      # CyvexBot chatbot implementation
├── popup.html/js/css               # Extension popup interface (Vanilla JS)
├── options.html/js/css             # Extension settings page (Vanilla JS)
├── styles.css                      # Content script styling
├── chatbot.css                     # Chatbot widget styling
├── icons/                          # Extension icons
├── src/                            # React source files (optional)
│   ├── popup/                      # React popup components
│   │   ├── Popup.jsx              # Main popup component
│   │   └── Popup.css              # Popup styling
│   ├── options/                    # React options components
│   │   ├── Options.jsx            # Main options component
│   │   └── Options.css            # Options styling
│   └── ...
├── public/                         # Public assets
├── dist/                           # Built extension (from React build)
├── package.json                    # Node dependencies
├── vite.config.js                  # Vite build configuration
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

### Configuration

**Optional: AbuseIPDB API Key Setup**

For full threat detection capabilities, you can optionally configure an AbuseIPDB API key:

1. Register for a free account at [AbuseIPDB.com](https://www.abuseipdb.com/register)
2. Generate an API key from your account dashboard
3. Click the Cyvex extension icon → ⚙️ Settings
4. Enter your API key in the settings page
5. Click "Save Settings"

**Note**: The extension works without an API key, but with limited functionality. Adding a key enables full IP reputation checking.

### Testing

1. Load the extension in Chrome developer mode
2. Visit various websites to test link scanning
3. Check the popup for security status updates
4. Verify security tips are displayed correctly
5. Test the chatbot by clicking the purple robot button
6. Test keyboard shortcut (Ctrl+Shift+X) to toggle security overlay

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
