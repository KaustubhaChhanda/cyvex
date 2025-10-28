# Cyvex — React-Based Phishing Protection Extension

[![Manifest](https://img.shields.io/badge/Manifest-v3-4285F4)](https://developer.chrome.com/docs/extensions/mv3/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-2ea44f)](#license)

## Overview
Cyvex is a modern, React-based Chrome extension that provides real-time phishing protection through link scanning, security awareness tips, and threat detection using the AbuseIPDB reputation service.

### Why React?
- 🚀 **Modern Development**: Component-based architecture for better maintainability
- ⚡ **Hot Module Replacement**: Instant updates during development with Vite
- 🎨 **Better State Management**: React hooks for clean, predictable state handling
- 🔧 **Easier Testing**: Component isolation makes unit testing straightforward
- 📦 **Code Reusability**: Shared components between popup, options, and content

## Features
- ✅ Real-time link scanning with inline security indicators
- 🛡️ In-page React overlay with live threat statistics
- 💡 Rotating security tips to boost user awareness
- 📊 Recent scans history (stored locally)
- ⚡ Keyboard shortcut: `Ctrl + Shift + X` to toggle overlay
- 🔒 Privacy-focused: Only queries AbuseIPDB for IP reputation

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Chrome/Chromium browser

### Installation & Development

1. **Clone or download this repository**
```bash
cd /Users/kaliprasadbisoii/Downloads/cyvex_2
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the extension**
```bash
npm run build
```

4. **Load in Chrome**
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

### Development Workflow

**Development mode** (with auto-rebuild on changes):
```bash
npm run dev
```

After running `npm run dev`, reload the extension in Chrome manually when you make changes (Vite will rebuild automatically, but Chrome requires manual reload).

**Production build**:
```bash
npm run build
```

The built extension will be in the `dist/` directory.

---

## Project Structure

```
cyvex_2/
├── src/
│   ├── popup/              # React popup UI
│   │   ├── Popup.jsx
│   │   ├── main.jsx
│   │   ├── index.html
│   │   └── popup.css
│   ├── options/            # React options page
│   │   ├── Options.jsx
│   │   ├── main.jsx
│   │   ├── index.html
│   │   └── options.css
│   ├── content/            # React content script & overlay
│   │   ├── content.jsx
│   │   ├── SecurityOverlay.jsx
│   │   └── overlay.css
│   ├── background/         # Service worker (vanilla JS)
│   │   └── background.js
│   ├── components/         # Shared React components
│   │   ├── StatusIndicator.jsx
│   │   ├── SecuritySummary.jsx
│   │   ├── SecurityTip.jsx
│   │   ├── RecentScans.jsx
│   │   └── QuickActions.jsx
│   └── hooks/              # Custom React hooks
│       ├── useCurrentTab.js
│       ├── useScanResults.js
│       ├── useSecurityTip.js
│       └── useRecentScans.js
├── public/                 # Static assets
│   ├── manifest.json
│   └── icons/
├── dist/                   # Build output (load this in Chrome)
├── vite.config.js          # Vite configuration
├── package.json
└── README_REACT.md
```

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| UI Framework | React 18.3 |
| Build Tool | Vite 5.3 |
| State Management | React Hooks |
| Styling | CSS Modules |
| Extension API | Chrome MV3 |
| Reputation Service | AbuseIPDB API |

---

## Usage

1. **Scan a Page**: Click the extension icon → "Scan This Page"
2. **View Results**: See Safe/Warning/Danger counts in the popup and overlay
3. **Security Tips**: Click "New Tip" for fresh security advice
4. **Toggle Overlay**: Press `Ctrl + Shift + X` on any page
5. **Configure API Key**: Click "Settings" to add your AbuseIPDB API key

---

## Configuration

### AbuseIPDB API Key
1. Get a free API key from [abuseipdb.com](https://www.abuseipdb.com/)
2. Open extension → Settings
3. Paste your API key and save
4. Results are cached for 6 hours to minimize API calls

---

## Development Guide

### Adding New Components

Create components in `src/components/`:
```jsx
import React from 'react';

function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}

export default MyComponent;
```

### Adding New Hooks

Create hooks in `src/hooks/`:
```js
import { useState, useEffect } from 'react';

export function useMyHook() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // your logic
  }, []);
  
  return state;
}
```

### Chrome Extension APIs in React

Access Chrome APIs directly in components:
```jsx
useEffect(() => {
  chrome.storage.local.get(['key'], (result) => {
    setState(result.key);
  });
}, []);
```

### Hot Reload Tips
- Changes to popup/options will hot-reload automatically
- Content script changes require extension reload
- Background script changes require extension reload
- After any reload, refresh the target page to see content script updates

---

## Building for Production

```bash
# Clean build
rm -rf dist/
npm run build

# The dist/ folder is ready to:
# - Load in Chrome for testing
# - Package as .zip for Chrome Web Store
```

### Publishing to Chrome Web Store

1. Build the extension: `npm run build`
2. Zip the `dist/` folder: `cd dist && zip -r ../cyvex-extension.zip . && cd ..`
3. Upload to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Extension not loading | Ensure you're loading the `dist/` folder, not the root |
| Changes not reflected | Run `npm run build` and reload extension in `chrome://extensions` |
| Content script not working | Refresh the target webpage after reloading extension |
| Overlay not showing | Check console for errors; ensure page is http(s) |
| API key not saving | Check browser console for storage errors |

---

## Permissions Explained

| Permission | Why Needed |
|------------|------------|
| `activeTab` | Scan links on current page |
| `tabs` | Query current tab information |
| `scripting` | Inject content script when needed |
| `storage` | Save settings and cache API results |
| `alarms` | Periodic cache cleanup |
| `host_permissions` | Access http(s) pages for scanning |

---

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test thoroughly: build and load in Chrome
5. Submit a PR with clear description

### Code Style
- Use functional components with hooks
- Follow existing file structure
- Keep components small and focused
- Add comments for complex logic

---

## Roadmap

- [ ] Unit tests with Vitest
- [ ] TypeScript migration
- [ ] Dark mode support
- [ ] Domain-level threat detection
- [ ] Export scan reports
- [ ] Internationalization (i18n)
- [ ] Firefox support

---

## Security & Privacy

- ✅ No user data collection
- ✅ Only sends resolved IPs to AbuseIPDB
- ✅ All scans stored locally on-device
- ✅ No external analytics or tracking
- ✅ Cache auto-expires for freshness

Found a security issue? Please open a confidential issue or contact maintainers.

---

## License

MIT License - See `LICENSE` for details

---

## Acknowledgements

- [AbuseIPDB](https://www.abuseipdb.com/) for IP reputation API
- [Vite](https://vitejs.dev/) for blazing fast builds
- [React](https://react.dev/) for component framework
- Chrome Extensions team for MV3 documentation

---

## Migration Notes

This is the **React version** of Cyvex. The original vanilla JS version is preserved for reference. Key improvements:

- 🎯 Better code organization with components
- ⚡ Faster development with Vite HMR
- 🧪 Easier to test and maintain
- 📦 Modern build pipeline
- 🔄 Improved state management

**Migrating from vanilla version?** The `dist/` build is a drop-in replacement. All functionality is preserved and enhanced.

---

## Support

- 📖 [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- 🐛 [Report Issues](#)
- 💬 [Discussions](#)

**Built with ❤️ for safer browsing**

