import { useState, useEffect } from 'react';
import './Options.css';

function Options() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['abuseIpdbApiKey'], (result) => {
      if (result.abuseIpdbApiKey) {
        setApiKey(result.abuseIpdbApiKey);
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.sync.set({ abuseIpdbApiKey: apiKey }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div className="options-container">
      <div className="options-header">
        <h1>🛡️ Cyvex Settings</h1>
        <p>Configure your security extension</p>
      </div>

      <div className="options-content">
        <div className="option-section">
          <h2>AbuseIPDB API Key</h2>
          <p className="section-description">
            Get your free API key from{' '}
            <a href="https://www.abuseipdb.com/register" target="_blank" rel="noopener noreferrer">
              AbuseIPDB.com
            </a>
            {' '}to enable IP reputation checking.
          </p>
          
          <input
            type="text"
            className="api-key-input"
            placeholder="Enter your AbuseIPDB API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          
          <button className="save-button" onClick={handleSave}>
            💾 Save Settings
          </button>
          
          {saved && (
            <div className="save-success">
              ✅ Settings saved successfully!
            </div>
          )}
        </div>

        <div className="option-section">
          <h2>About Cyvex</h2>
          <p className="section-description">
            Cyvex protects you from phishing attacks by scanning links in real-time and providing security awareness tips.
          </p>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <div className="feature-title">Real-time Scanning</div>
              <div className="feature-desc">Automatic link checking on every page</div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🤖</div>
              <div className="feature-title">AI Assistant</div>
              <div className="feature-desc">CyvexBot helps with security questions</div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💡</div>
              <div className="feature-title">Security Tips</div>
              <div className="feature-desc">Learn best practices daily</div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">Keyboard Shortcut</div>
              <div className="feature-desc">Press Ctrl+Shift+X to toggle overlay</div>
            </div>
          </div>
        </div>

        <div className="option-section">
          <h2>How to Use</h2>
          <ol className="instructions-list">
            <li>Click the Cyvex icon in your toolbar to scan the current page</li>
            <li>Look for colored badges next to links:
              <ul>
                <li><span className="badge-safe">SAFE</span> - Verified secure link</li>
                <li><span className="badge-warn">WARN</span> - Proceed with caution</li>
                <li><span className="badge-danger">DANGER</span> - Do not click!</li>
              </ul>
            </li>
            <li>Click the 🤖 button to chat with CyvexBot</li>
            <li>Press <kbd>Ctrl+Shift+X</kbd> to show/hide the security overlay</li>
          </ol>
        </div>
      </div>

      <div className="options-footer">
        <p>Cyvex v1.2.0 - Built with ❤️ for your security</p>
      </div>
    </div>
  );
}

export default Options;
