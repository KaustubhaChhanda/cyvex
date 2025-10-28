// Cyvex Popup Script
// Handles popup interface and communicates with background script

class PopupManager {
  constructor() {
    this.currentTab = null;
    this.scanResults = [];
    this.init();
  }

  async init() {
    await this.getCurrentTab();
    this.setupEventListeners();
    this.loadSecurityTip();
    this.loadRecentScans();
    this.updateStatusIndicator();
  }

  async getCurrentTab() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      this.currentTab = tab;
    } catch (error) {
      console.error('Error getting current tab:', error);
    }
  }

  setupEventListeners() {
    // New tip button
    document.getElementById('newTipBtn').addEventListener('click', () => {
      this.loadSecurityTip();
    });

    // Scan page button
    document.getElementById('scanPageBtn').addEventListener('click', () => {
      this.scanCurrentPage();
    });

    // Settings button
    document.getElementById('viewSettingsBtn').addEventListener('click', () => {
      this.openSettings();
    });
  }

  async loadSecurityTip() {
    try {
      const tip = await this.sendMessage({ action: 'getSecurityTips' });
      this.displaySecurityTip(tip);
    } catch (error) {
      console.error('Error loading security tip:', error);
      this.displaySecurityTip({
        title: 'Stay Secure',
        content: 'Always verify links before clicking and keep your software updated.',
        category: 'General Security'
      });
    }
  }

  displaySecurityTip(tip) {
    const tipContent = document.getElementById('tipContent');
    if (tip && tipContent) {
      // Clear existing content
      tipContent.innerHTML = '';
      
      // Create elements safely without XSS risk
      const titleDiv = document.createElement('div');
      titleDiv.className = 'tip-title';
      titleDiv.textContent = tip.title;
      
      const textDiv = document.createElement('div');
      textDiv.className = 'tip-text';
      textDiv.textContent = tip.content;
      
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'tip-category';
      categoryDiv.textContent = `Category: ${tip.category}`;
      
      tipContent.appendChild(titleDiv);
      tipContent.appendChild(textDiv);
      tipContent.appendChild(categoryDiv);
    }
  }

  async scanCurrentPage() {
    const scanBtn = document.getElementById('scanPageBtn');
    const originalText = scanBtn.innerHTML;
    
    // Show loading state
    scanBtn.innerHTML = '<span class="btn-icon">🔄</span> Scanning...';
    scanBtn.disabled = true;
    scanBtn.classList.add('loading');

    try {
      // Send message to content script to scan page
      if (this.currentTab) {
        // Guard non http(s) schemes
        const url = this.currentTab.url || '';
        if (!/^https?:\/\//i.test(url)) {
          throw new Error('Unsupported page. Open an http(s) page to scan.');
        }

        try {
          await chrome.tabs.sendMessage(this.currentTab.id, { action: 'scanPage' });
        } catch (e) {
          // Attempt to inject content script if not present, then retry
          try {
            await chrome.scripting.executeScript({
              target: { tabId: this.currentTab.id },
              files: ['content.js']
            });
            await chrome.tabs.sendMessage(this.currentTab.id, { action: 'scanPage' });
          } catch (injectErr) {
            throw injectErr;
          }
        }
        
        // Wait a moment for results
        setTimeout(() => {
          this.updateScanResults();
          this.loadRecentScans();
        }, 2000);
      }
    } catch (error) {
      console.error('Error scanning page:', error);
      this.showError('Failed to scan page. Please try again.');
    } finally {
      // Reset button state
      scanBtn.innerHTML = originalText;
      scanBtn.disabled = false;
      scanBtn.classList.remove('loading');
    }
  }

  async updateScanResults() {
    try {
      // Get scan results from content script
      if (this.currentTab) {
        const url = this.currentTab.url || '';
        if (!/^https?:\/\//i.test(url)) return;

        let response;
        try {
          response = await chrome.tabs.sendMessage(this.currentTab.id, { action: 'getScanResults' });
        } catch (_) {
          try {
            await chrome.scripting.executeScript({
              target: { tabId: this.currentTab.id },
              files: ['content.js']
            });
            response = await chrome.tabs.sendMessage(this.currentTab.id, { action: 'getScanResults' });
          } catch (e) {
            console.error('Unable to retrieve scan results:', e);
            return;
          }
        }
        if (response && response.results) {
          this.scanResults = response.results;
          this.updateSummaryStats();
        }
      }
    } catch (error) {
      console.error('Error updating scan results:', error);
    }
  }

  updateSummaryStats() {
    const stats = { safe: 0, warning: 0, danger: 0, error: 0 };
    
    this.scanResults.forEach(result => {
      if (result.status) {
        stats[result.status] = (stats[result.status] || 0) + 1;
      }
    });

    // Update UI
    document.getElementById('safeCount').textContent = stats.safe;
    document.getElementById('warningCount').textContent = stats.warning;
    document.getElementById('dangerCount').textContent = stats.danger;

    // Update status indicator
    this.updateStatusIndicator(stats);
  }

  updateStatusIndicator(stats = null) {
    const indicator = document.getElementById('statusIndicator');
    if (!indicator) return;

    if (!stats) {
      // Default safe state
      indicator.className = 'status-indicator';
      indicator.querySelector('.status-icon').textContent = '✅';
      indicator.querySelector('.status-text').textContent = 'Secure';
      return;
    }

    if (stats.danger > 0) {
      indicator.className = 'status-indicator danger';
      indicator.querySelector('.status-icon').textContent = '🚨';
      indicator.querySelector('.status-text').textContent = 'Dangerous';
    } else if (stats.warning > 0) {
      indicator.className = 'status-indicator warning';
      indicator.querySelector('.status-icon').textContent = '⚠️';
      indicator.querySelector('.status-text').textContent = 'Warning';
    } else {
      indicator.className = 'status-indicator';
      indicator.querySelector('.status-icon').textContent = '✅';
      indicator.querySelector('.status-text').textContent = 'Secure';
    }
  }

  async loadRecentScans() {
    try {
      const stored = await chrome.storage.local.get(['recentScans']);
      const recentScans = stored.recentScans || [];
      
      this.displayRecentScans(recentScans.slice(0, 5)); // Show last 5 scans
    } catch (error) {
      console.error('Error loading recent scans:', error);
    }
  }

  displayRecentScans(scans) {
    const scanList = document.getElementById('scanList');
    if (!scanList) return;

    // Clear existing content
    scanList.innerHTML = '';

    if (scans.length === 0) {
      const emptyItem = document.createElement('div');
      emptyItem.className = 'scan-item';
      
      const urlSpan = document.createElement('span');
      urlSpan.className = 'scan-url';
      urlSpan.textContent = 'No recent scans';
      
      const statusSpan = document.createElement('span');
      statusSpan.className = 'scan-status';
      statusSpan.textContent = '-';
      
      emptyItem.appendChild(urlSpan);
      emptyItem.appendChild(statusSpan);
      scanList.appendChild(emptyItem);
      return;
    }

    // Create scan items safely
    scans.forEach(scan => {
      const scanItem = document.createElement('div');
      scanItem.className = 'scan-item';
      
      const urlSpan = document.createElement('span');
      urlSpan.className = 'scan-url';
      urlSpan.title = scan.url;
      urlSpan.textContent = this.truncateUrl(scan.url);
      
      const statusSpan = document.createElement('span');
      statusSpan.className = `scan-status ${scan.status}`;
      statusSpan.textContent = this.getStatusText(scan.status);
      
      scanItem.appendChild(urlSpan);
      scanItem.appendChild(statusSpan);
      scanList.appendChild(scanItem);
    });
  }

  truncateUrl(url) {
    if (url.length <= 30) return url;
    return url.substring(0, 27) + '...';
  }

  getStatusText(status) {
    const statusMap = {
      'safe': 'Safe',
      'warning': 'Warning',
      'danger': 'Danger',
      'error': 'Error'
    };
    return statusMap[status] || 'Unknown';
  }

  openSettings() {
    // Open extension options page
    chrome.runtime.openOptionsPage();
  }

  showError(message) {
    // Display error as toast notification instead of alert
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `cyvex-toast cyvex-toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInUp 0.3s ease-out;
    `;

    // Set background color based on type
    const colors = {
      error: '#f44336',
      success: '#4CAF50',
      warning: '#ff9800',
      info: '#2196F3'
    };
    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOutDown 0.3s ease-in';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  async sendMessage(message) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (response) => {
        resolve(response);
      });
    });
  }
}

// Keep a singleton instance so updates reuse the same state
let __popupManagerInstance = null;
// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  __popupManagerInstance = new PopupManager();
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateScanResults') {
    // Update the popup with new scan results
    if (!__popupManagerInstance) {
      __popupManagerInstance = new PopupManager();
    }
    __popupManagerInstance.updateScanResults();
    sendResponse({ received: true });
    return true;
  }
  return false;
});
