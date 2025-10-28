# Changelog

## v1.1.0 - Security & UX Improvements

### 🔒 Security Fixes
- **Fixed XSS vulnerability** in popup.js - replaced `innerHTML` with safe DOM manipulation
- **Removed hardcoded API key** from background.js - users must now configure their own key
- Added proper input sanitization for all user-generated content

### ✨ Improvements
- **Better error notifications** - replaced `alert()` with elegant toast notifications
- **Fixed message listeners** - added proper `sendResponse()` calls to prevent memory leaks
- **Changed keyboard shortcut** from `Ctrl+Shift+C` to `Ctrl+Shift+X` (avoids DevTools conflict)
- **Removed console.logs** from production code for cleaner console
- **Removed unused code** - cleaned up `saveScanResult()` function that was never called
- **Smart link filtering** - now skips same-domain navigation links and UI elements
- **Fixed indicator positioning** - emojis no longer appear upside-down or misaligned

### 🐛 Bug Fixes
- Fixed overlay close button not working
- Fixed "View Details" button in overlay
- Fixed scan count updates in real-time
- Improved content script injection for edge cases

### 📚 Documentation
- Updated all README files with new keyboard shortcut
- Added CHANGELOG.md for tracking changes
- Updated keyboard shortcut documentation throughout

---

## v1.0.0 - Initial Release

### Features
- Real-time link scanning with AbuseIPDB integration
- Visual safety indicators (Safe ✅, Warning ⚠️, Danger 🚨)
- In-page security overlay
- Security tips and awareness content
- Recent scans history
- Configurable settings page
- React version with Vite build system

