// Cyvex Content Script
// Scans webpage for links and provides real-time security status

class LinkScanner {
  constructor() {
    this.scannedLinks = new Map();
    this.securityOverlay = null;
    this.init();
  }

  init() {
    // Wait for page to load completely
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.scanPage());
    } else {
      this.scanPage();
    }

    // Monitor for dynamically added links
    this.observeChanges();
  }

  scanPage() {
    const links = document.querySelectorAll('a[href]');
    // Scan all links on the page
    links.forEach(link => {
      this.processLink(link);
    });

    this.createSecurityOverlay();
  }

  async processLink(link) {
    const url = link.href;
    if (!url || this.scannedLinks.has(url)) return;

    // Filter out links we shouldn't scan
    if (!this.shouldScanLink(url, link)) return;

    this.scannedLinks.set(url, { status: 'checking', element: link });
    this.addCheckingIndicator(link);

    try {
      const result = await this.checkUrl(url);
      this.scannedLinks.set(url, { ...result, element: link });
      this.updateLinkIndicator(link, result);
      // Update overlay stats and notify popup
      this.updateStats();
      try { chrome.runtime.sendMessage({ action: 'updateScanResults' }); } catch (_) {}
    } catch (error) {
      console.error('Error checking URL:', error);
      this.scannedLinks.set(url, { status: 'error', element: link });
      this.updateLinkIndicator(link, { status: 'error' });
      this.updateStats();
      try { chrome.runtime.sendMessage({ action: 'updateScanResults' }); } catch (_) {}
    }
  }

  shouldScanLink(url, linkElement) {
    try {
      const urlObj = new URL(url);
      const currentDomain = window.location.hostname;

      // Skip non-http(s) protocols
      if (!urlObj.protocol.match(/^https?:/)) {
        return false;
      }

      // Skip same-domain navigation links (site's own UI)
      if (urlObj.hostname === currentDomain) {
        return false;
      }

      // Skip if link is hidden or very small (likely UI element)
      const rect = linkElement.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 10) {
        return false;
      }

      // Skip common UI patterns (role attributes)
      const role = linkElement.getAttribute('role');
      if (role === 'button' || role === 'tab' || role === 'menuitem') {
        return false;
      }

      // Skip if link has no visible text (icon-only buttons)
      const text = linkElement.textContent.trim();
      if (!text || text.length < 2) {
        return false;
      }

      // Skip if link is part of browser/page chrome (has specific classes)
      const skipClasses = ['nav', 'menu', 'header', 'footer', 'toolbar', 'tab'];
      const classList = linkElement.className.toLowerCase();
      if (skipClasses.some(cls => classList.includes(cls))) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  async checkUrl(url) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'checkUrl', url }, (response) => {
        // Ensure backward-compatible structure
        if (!response) {
          resolve({ status: 'unknown', message: 'No response', confidence: 'low' });
          return;
        }
        resolve(response);
      });
    });
  }

  addCheckingIndicator(link) {
    // Don't add if indicator already exists
    if (link.querySelector('.cyvex-indicator') || link.dataset.cyvexScanned) return;
    
    link.dataset.cyvexScanned = 'true';

    // Create COMPLETELY isolated badge with absolute positioning
    const indicator = document.createElement('div');
    indicator.className = 'cyvex-indicator cyvex-checking';
    indicator.textContent = '●';
    indicator.title = 'Checking link safety...';
    
    // Position relative to document (scrolls naturally)
    const rect = link.getBoundingClientRect();
    
    // Ultra-isolated badge with absolute positioning - scrolls with page
    indicator.style.cssText = `
      position: absolute !important;
      left: ${rect.right + window.scrollX + 5}px !important;
      top: ${rect.top + window.scrollY + (rect.height / 2) - 8}px !important;
      display: inline-block !important;
      padding: 2px 6px !important;
      font-size: 10px !important;
      font-weight: bold !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif !important;
      color: white !important;
      background-color: #2196F3 !important;
      border-radius: 3px !important;
      line-height: 1.2 !important;
      z-index: 999999 !important;
      pointer-events: none !important;
      transform: none !important;
      writing-mode: horizontal-tb !important;
      text-orientation: upright !important;
      white-space: nowrap !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
    `;
    
    // Store link reference
    indicator.dataset.linkId = Math.random().toString(36).substr(2, 9);
    link.dataset.indicatorId = indicator.dataset.linkId;
    
    // Append to body (complete isolation from parent CSS)
    document.body.appendChild(indicator);
    
    // Update position on window resize (not needed for scroll since it's absolute)
    const updatePosition = () => {
      if (!document.body.contains(indicator) || !document.body.contains(link)) {
        window.removeEventListener('resize', updatePosition);
        return;
      }
      const newRect = link.getBoundingClientRect();
      indicator.style.left = `${newRect.right + window.scrollX + 5}px`;
      indicator.style.top = `${newRect.top + window.scrollY + (newRect.height / 2) - 8}px`;
    };
    
    window.addEventListener('resize', updatePosition, { passive: true });
  }

  updateLinkIndicator(link, result) {
    // Find indicator by data attribute
    const indicatorId = link.dataset.indicatorId;
    if (!indicatorId) return;
    
    const indicator = document.querySelector(`.cyvex-indicator[data-link-id="${indicatorId}"]`);
    if (!indicator) return;

    indicator.className = `cyvex-indicator cyvex-${result.status}`;
    
    // Use text badges instead of emojis - guaranteed to work
    switch (result.status) {
      case 'safe':
        indicator.textContent = 'SAFE';
        indicator.title = 'Safe link - verified secure';
        indicator.style.backgroundColor = '#4CAF50';
        break;
      case 'warning':
        indicator.textContent = 'WARN';
        indicator.title = result.message || 'Warning - proceed with caution';
        indicator.style.backgroundColor = '#ff9800';
        break;
      case 'danger':
        indicator.textContent = 'DANGER';
        indicator.title = result.message || 'Dangerous link detected!';
        indicator.style.backgroundColor = '#f44336';
        this.highlightDangerousLink(link);
        break;
      case 'error':
        indicator.textContent = '?';
        indicator.title = 'Unable to verify link';
        indicator.style.backgroundColor = '#9e9e9e';
        break;
      default:
        indicator.textContent = '?';
        indicator.title = 'Unknown status';
        indicator.style.backgroundColor = '#9e9e9e';
    }
  }

  highlightDangerousLink(link) {
    link.style.border = '2px solid #ff4444';
    link.style.backgroundColor = '#ffe6e6';
    link.style.padding = '2px';
    link.style.borderRadius = '3px';
    
    // Add click warning
    link.addEventListener('click', (e) => {
      if (!confirm('⚠️ WARNING: This link has been flagged as potentially dangerous. Are you sure you want to proceed?')) {
        e.preventDefault();
      }
    });
  }

  createSecurityOverlay() {
    if (this.securityOverlay) return;

    this.securityOverlay = document.createElement('div');
    this.securityOverlay.id = 'cyvex-security-overlay';
    this.securityOverlay.innerHTML = `
      <div class="cyvex-overlay-content">
        <div class="cyvex-header">
          <span class="cyvex-logo">🛡️ Cyvex</span>
          <button class="cyvex-close" aria-label="Close">×</button>
        </div>
        <div class="cyvex-stats">
          <div class="cyvex-stat">
            <span class="cyvex-stat-number" id="cyvex-safe-count">0</span>
            <span class="cyvex-stat-label">Safe</span>
          </div>
          <div class="cyvex-stat">
            <span class="cyvex-stat-number" id="cyvex-warning-count">0</span>
            <span class="cyvex-stat-label">Warnings</span>
          </div>
          <div class="cyvex-stat">
            <span class="cyvex-stat-number" id="cyvex-danger-count">0</span>
            <span class="cyvex-stat-label">Dangerous</span>
          </div>
        </div>
        <div class="cyvex-tip" id="cyvex-tip">
          <div class="cyvex-tip-title">💡 Security Tip</div>
          <div class="cyvex-tip-content">Loading tip...</div>
        </div>
        <div class="cyvex-actions">
          <button class="cyvex-btn" data-cyvex-action="hide">Hide</button>
          <button class="cyvex-btn cyvex-btn-primary" data-cyvex-action="details">View Details</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.securityOverlay);
    this.updateStats();
    this.loadSecurityTip();

    // Wire up events without inline handlers to avoid CSP issues
    const closeBtn = this.securityOverlay.querySelector('.cyvex-close');
    const hideBtn = this.securityOverlay.querySelector('[data-cyvex-action="hide"]');
    const detailsBtn = this.securityOverlay.querySelector('[data-cyvex-action="details"]');

    const hideOverlay = () => {
      this.securityOverlay.style.display = 'none';
    };

    if (closeBtn) closeBtn.addEventListener('click', hideOverlay);
    if (hideBtn) hideBtn.addEventListener('click', hideOverlay);
    if (detailsBtn) detailsBtn.addEventListener('click', () => {
      try {
        chrome.runtime.sendMessage({ action: 'openPopup' });
      } catch (_) {}
    });
  }

  updateStats() {
    if (!this.securityOverlay) return;

    const stats = { safe: 0, warning: 0, danger: 0, error: 0 };
    
    this.scannedLinks.forEach(linkData => {
      if (linkData.status) {
        stats[linkData.status] = (stats[linkData.status] || 0) + 1;
      }
    });

    const safeCount = this.securityOverlay.querySelector('#cyvex-safe-count');
    const warningCount = this.securityOverlay.querySelector('#cyvex-warning-count');
    const dangerCount = this.securityOverlay.querySelector('#cyvex-danger-count');

    if (safeCount) safeCount.textContent = stats.safe;
    if (warningCount) warningCount.textContent = stats.warning;
    if (dangerCount) dangerCount.textContent = stats.danger;
    
    // Notify chatbot of updated scan results
    window.dispatchEvent(new CustomEvent('cyvex-scan-update', { detail: stats }));
  }

  async loadSecurityTip() {
    try {
      const tip = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'getSecurityTips' }, (response) => {
          resolve(response);
        });
      });

      const tipElement = this.securityOverlay.querySelector('#cyvex-tip .cyvex-tip-content');
      if (tipElement && tip) {
        tipElement.innerHTML = `
          <strong>${tip.title}</strong><br>
          <small>${tip.content}</small><br>
          <em>Category: ${tip.category}</em>
        `;
      }
    } catch (error) {
      console.error('Error loading security tip:', error);
    }
  }

  observeChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const links = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
            links.forEach(link => this.processLink(link));
            
            if (node.tagName === 'A' && node.href) {
              this.processLink(node);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize the link scanner
const linkScanner = new LinkScanner();

// Add keyboard shortcut to toggle overlay (Ctrl+Shift+X)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'X') {
    const overlay = document.getElementById('cyvex-security-overlay');
    if (overlay) {
      overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
    }
  }
});

// Listen for messages from popup to trigger scans and fetch results
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request && request.action === 'scanPage') {
      // Trigger a fresh scan
      linkScanner.scanPage();
      // Notify popup that scan is underway; it can poll results shortly
      sendResponse({ ok: true });
      return true;
    }

    if (request && request.action === 'getScanResults') {
      const results = [];
      linkScanner.scannedLinks.forEach((value, key) => {
        results.push({ url: key, status: value.status || 'unknown' });
      });
      sendResponse({ results });
      return true;
    }
  } catch (e) {
    // Best-effort error response
    try { sendResponse({ results: [], error: true }); } catch (_) {}
  }
  return false;
});