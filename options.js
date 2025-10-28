// Cyvex Options Page Script
// Handles settings management and database operations

class OptionsManager {
  constructor() {
    this.settings = {
      autoScanEnabled: true,
      showOverlay: true,
      blockDangerous: true,
      checkShortenedUrls: true,
      checkSuspiciousPatterns: true,
      showTips: true
    };
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupEventListeners();
    this.updateDatabaseInfo();
    this.loadApiKeyStatus();
  }

  async loadSettings() {
    try {
      const stored = await chrome.storage.sync.get(this.settings);
      this.settings = { ...this.settings, ...stored };
      this.updateUI();
    } catch (error) {
      console.error('Error loading settings:', error);
      this.showMessage('Error loading settings', 'error');
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.sync.set(this.settings);
      this.showMessage('Settings saved successfully', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showMessage('Error saving settings', 'error');
    }
  }

  updateUI() {
    // Update checkboxes
    Object.keys(this.settings).forEach(key => {
      const checkbox = document.getElementById(key);
      if (checkbox) {
        checkbox.checked = this.settings[key];
      }
    });
  }

  setupEventListeners() {
    // Checkbox change events
    Object.keys(this.settings).forEach(key => {
      const checkbox = document.getElementById(key);
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          this.settings[key] = e.target.checked;
        });
      }
    });

    // Save settings button
    document.getElementById('saveSettingsBtn').addEventListener('click', () => {
      this.saveSettings();
    });

    // Reset settings button
    document.getElementById('resetSettingsBtn').addEventListener('click', () => {
      this.resetSettings();
    });

    // Update database button
    document.getElementById('updateDatabaseBtn').addEventListener('click', () => {
      this.refreshCache();
    });

    // Clear cache button
    document.getElementById('clearCacheBtn').addEventListener('click', () => {
      this.clearCache();
    });

    // Save API key button
    const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
    if (saveApiKeyBtn) {
      saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
    }
  }

  async resetSettings() {
    if (confirm('Are you sure you want to reset all settings to their default values?')) {
      this.settings = {
        autoScanEnabled: true,
        showOverlay: true,
        blockDangerous: true,
        checkShortenedUrls: true,
        checkSuspiciousPatterns: true,
        showTips: true
      };
      this.updateUI();
      await this.saveSettings();
    }
  }

  async refreshCache() {
    const btn = document.getElementById('updateDatabaseBtn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span class="btn-icon">🔄</span> Refreshing...';
    btn.disabled = true;
    btn.classList.add('loading');

    try {
      // For AbuseIPDB, cache is passive; we just update info panel
      
      // Wait a moment for update to complete
      setTimeout(() => {
        this.updateDatabaseInfo();
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.classList.remove('loading');
        this.showMessage('Cache refreshed', 'success');
      }, 2000);
    } catch (error) {
      console.error('Error updating database:', error);
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.classList.remove('loading');
      this.showMessage('Error refreshing cache', 'error');
    }
  }

  async clearCache() {
    if (confirm('Are you sure you want to clear the cache? This will remove all stored scan results and cached data.')) {
      try {
        await chrome.storage.local.clear();
        this.updateDatabaseInfo();
        this.showMessage('Cache cleared successfully', 'success');
      } catch (error) {
        console.error('Error clearing cache:', error);
        this.showMessage('Error clearing cache', 'error');
      }
    }
  }

  async updateDatabaseInfo() {
    try {
      const stored = await chrome.storage.local.get(['abuseCache']);
      
      // Update last updated time
      const lastUpdatedEl = document.getElementById('lastUpdated');
      if (lastUpdatedEl) {
        const cache = stored.abuseCache || {};
        const latestTs = Object.values(cache).reduce((max, v) => Math.max(max, v.timestamp || 0), 0);
        if (latestTs) {
          lastUpdatedEl.textContent = new Date(latestTs).toLocaleString();
        } else {
          lastUpdatedEl.textContent = 'Never';
        }
      }

      // Update domain count
      const domainCountEl = document.getElementById('domainCount');
      if (domainCountEl) {
        domainCountEl.textContent = 'N/A (using AbuseIPDB)';
      }
    } catch (error) {
      console.error('Error updating database info:', error);
    }
  }

  async loadApiKeyStatus() {
    try {
      const { abuseIpdbApiKey } = await chrome.storage.sync.get(['abuseIpdbApiKey']);
      const el = document.getElementById('apiKeyStatus');
      const input = document.getElementById('apiKeyInput');
      if (el) {
        el.textContent = abuseIpdbApiKey ? 'Set' : 'Not set';
      }
      if (input && abuseIpdbApiKey) {
        input.value = abuseIpdbApiKey;
      }
    } catch (e) {
      // ignore
    }
  }

  async saveApiKey() {
    const input = document.getElementById('apiKeyInput');
    if (!input || !input.value.trim()) {
      this.showMessage('Please enter a valid API key', 'error');
      return;
    }
    try {
      await chrome.runtime.sendMessage({ action: 'setAbuseKey', key: input.value.trim() });
      await this.loadApiKeyStatus();
      this.showMessage('API key saved', 'success');
    } catch (e) {
      this.showMessage('Failed to save API key', 'error');
    }
  }

  showMessage(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    if (type === 'success') {
      notification.style.background = '#4CAF50';
    } else if (type === 'error') {
      notification.style.background = '#f44336';
    } else {
      notification.style.background = '#2196F3';
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize options page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OptionsManager();
});
