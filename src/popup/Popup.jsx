import { useState, useEffect } from 'react';
import './Popup.css';

function Popup() {
  const [scanResults, setScanResults] = useState([]);
  const [stats, setStats] = useState({ safe: 0, warning: 0, danger: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [securityTip, setSecurityTip] = useState(null);

  useEffect(() => {
    loadSecurityTip();
    loadScanResults();
  }, []);

  const loadSecurityTip = () => {
    chrome.runtime.sendMessage({ action: 'getSecurityTips' }, (tip) => {
      if (tip) setSecurityTip(tip);
    });
  };

  const loadScanResults = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.id || !tab.url?.startsWith('http')) {
        return;
      }

      chrome.tabs.sendMessage(tab.id, { action: 'getScanResults' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('Content script not ready');
          return;
        }
        
        if (response?.results) {
          const results = Array.from(response.results);
          setScanResults(results);
          calculateStats(results);
        }
      });
    } catch (error) {
      console.error('Error loading scan results:', error);
    }
  };

  const calculateStats = (results) => {
    const newStats = { safe: 0, warning: 0, danger: 0 };
    results.forEach(([_, data]) => {
      if (data.status === 'safe') newStats.safe++;
      else if (data.status === 'warning') newStats.warning++;
      else if (data.status === 'danger') newStats.danger++;
    });
    setStats(newStats);
  };

  const handleScanPage = async () => {
    setIsScanning(true);
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.id || !tab.url?.startsWith('http')) {
        alert('Cannot scan this page. Please navigate to a website.');
        setIsScanning(false);
        return;
      }

      // Inject content script if not present
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['chatbot.js']
        });
        await chrome.scripting.insertCSS({
          target: { tabId: tab.id },
          files: ['styles.css', 'chatbot.css']
        });
      } catch (e) {
        // Already injected
      }

      // Wait a bit for scripts to load
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { action: 'scanPage' }, (response) => {
          setIsScanning(false);
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            setTimeout(loadScanResults, 1000);
          }
        });
      }, 500);

    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
    }
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1>🛡️ Cyvex Security</h1>
        <p>Phishing Protection</p>
      </div>

      <div className="popup-stats">
        <div className="stat-card stat-safe">
          <div className="stat-number">{stats.safe}</div>
          <div className="stat-label">Safe</div>
        </div>
        <div className="stat-card stat-warning">
          <div className="stat-number">{stats.warning}</div>
          <div className="stat-label">Warnings</div>
        </div>
        <div className="stat-card stat-danger">
          <div className="stat-number">{stats.danger}</div>
          <div className="stat-label">Dangerous</div>
        </div>
      </div>

      <button 
        className="scan-button" 
        onClick={handleScanPage}
        disabled={isScanning}
      >
        {isScanning ? '🔍 Scanning...' : '🔍 Scan This Page'}
      </button>

      {securityTip && (
        <div className="security-tip">
          <div className="tip-title">💡 Security Tip</div>
          <div className="tip-content">
            <strong>{securityTip.title}</strong>
            <p>{securityTip.content}</p>
            <em className="tip-category">{securityTip.category}</em>
          </div>
        </div>
      )}

      <div className="popup-footer">
        <button className="footer-button" onClick={openOptions}>
          ⚙️ Settings
        </button>
        <button className="footer-button" onClick={loadSecurityTip}>
          💡 New Tip
        </button>
      </div>
    </div>
  );
}

export default Popup;
