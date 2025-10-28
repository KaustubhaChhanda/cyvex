# Cyvex React Extension - Quick Start Guide

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies
```bash
cd /Users/kaliprasadbisoii/Downloads/cyvex_2
npm install
```

### 2. Build the Extension
```bash
npm run build
```

### 3. Load in Chrome
1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `dist/` folder from this project
5. Done! The extension is now active

---

## 🔧 Development Mode

For active development with auto-rebuild:

```bash
npm run dev
```

**Note**: After changes, you'll need to manually reload the extension in `chrome://extensions` (click the refresh icon).

---

## 📝 Making Changes

### Popup Changes
- Edit files in `src/popup/`
- Run `npm run build`
- Reload extension in Chrome
- Open popup to see changes

### Options Page Changes
- Edit files in `src/options/`
- Run `npm run build`
- Reload extension
- Open options to see changes

### Content Script Changes
- Edit files in `src/content/`
- Run `npm run build`
- Reload extension
- **Refresh the webpage** to see changes

### Background Script Changes
- Edit `src/background/background.js`
- Run `npm run build`
- Reload extension

---

## 🧪 Testing Your Changes

1. **Build**: `npm run build`
2. **Reload**: Go to `chrome://extensions` and click reload icon
3. **Test**: Open a website and click the extension icon
4. **Scan**: Click "Scan This Page" to test link detection
5. **Overlay**: Press `Ctrl + Shift + C` to toggle overlay

---

## 🎨 File Structure Quick Reference

```
src/
├── popup/          → Extension popup UI
├── options/        → Settings page
├── content/        → In-page overlay & link scanning
├── background/     → Service worker (handles API calls)
├── components/     → Reusable React components
└── hooks/          → Custom React hooks
```

---

## ⚙️ Configuration

### Add AbuseIPDB API Key
1. Get free key: https://www.abuseipdb.com/
2. Click extension icon → Settings
3. Paste API key → Save

---

## 🐛 Common Issues

**Issue**: Extension not loading  
**Fix**: Make sure you're selecting the `dist/` folder, not the root

**Issue**: Changes not showing  
**Fix**: Run `npm run build` then reload extension

**Issue**: Overlay not appearing  
**Fix**: Refresh the webpage after reloading extension

**Issue**: "npm: command not found"  
**Fix**: Install Node.js from https://nodejs.org/

---

## 📦 Building for Distribution

```bash
# Production build
npm run build

# Create zip for Chrome Web Store
cd dist
zip -r ../cyvex-extension.zip .
cd ..
```

Upload `cyvex-extension.zip` to Chrome Web Store Developer Console.

---

## 🎯 Next Steps

- [ ] Customize the UI in `src/popup/Popup.jsx`
- [ ] Add new components in `src/components/`
- [ ] Modify security tips in `src/background/background.js`
- [ ] Enhance link detection in `src/content/content.jsx`

Happy coding! 🚀

