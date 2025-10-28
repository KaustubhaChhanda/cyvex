// Cyvex Background Service Worker
// Integrates with AbuseIPDB for IP reputation checks and manages extension state

class AbuseIPDBChecker {
  constructor() {
    this.cacheTtlMs = 6 * 60 * 60 * 1000; // 6 hours
  }

  async getApiKey() {
    // Get user-stored key only - no hardcoded fallback for security
    const { abuseIpdbApiKey } = await chrome.storage.sync.get(['abuseIpdbApiKey']);
    if (abuseIpdbApiKey && typeof abuseIpdbApiKey === 'string' && abuseIpdbApiKey.trim()) {
      return abuseIpdbApiKey.trim();
    }
    // Return null if no key is set - user must configure in settings
    return null;
  }

  async resolveDomainToIPs(domain) {
    try {
      const url = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`;
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) return [];
      const data = await res.json();
      if (!data || !Array.isArray(data.Answer)) return [];
      return data.Answer
        .filter(ans => ans.type === 1 && typeof ans.data === 'string')
        .map(ans => ans.data)
        .filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  async getFromCache(ip) {
    const { abuseCache } = await chrome.storage.local.get(['abuseCache']);
    const cache = abuseCache || {};
    const entry = cache[ip];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.cacheTtlMs) return null;
    return entry.result;
  }

  async setCache(ip, result) {
    const { abuseCache } = await chrome.storage.local.get(['abuseCache']);
    const cache = abuseCache || {};
    cache[ip] = { result, timestamp: Date.now() };
    await chrome.storage.local.set({ abuseCache: cache });
  }

  mapScoreToStatus(checkData) {
    const score = Number(checkData?.data?.abuseConfidenceScore || 0);
    const totalReports = Number(checkData?.data?.totalReports || 0);
    const lastReportedAt = checkData?.data?.lastReportedAt || null;

    if (Number.isNaN(score)) {
      return { status: 'unknown', message: 'Unable to interpret score', confidence: 'low' };
    }

    if (score >= 25 || totalReports >= 3) {
      return {
        status: 'danger',
        message: `High risk IP (score ${score}, reports ${totalReports})${lastReportedAt ? `, last: ${lastReportedAt}` : ''}`,
        confidence: 'high'
      };
    }

    if (score > 0 || totalReports > 0) {
      return {
        status: 'warning',
        message: `Some reports for IP (score ${score}, reports ${totalReports})`,
        confidence: 'medium'
      };
    }

    return { status: 'safe', message: 'No reports for this IP', confidence: 'high' };
  }

  async checkIpWithAbuseIPDB(ip) {
    const cached = await this.getFromCache(ip);
    if (cached) return cached;

    const apiKey = await this.getApiKey();
    
    // If no API key is configured, return safe status with message
    if (!apiKey) {
      const result = { 
        status: 'safe', 
        message: 'API key not configured. Please add your AbuseIPDB key in settings.', 
        confidence: 'low' 
      };
      await this.setCache(ip, result);
      return result;
    }

    const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90`;

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Key': apiKey,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        const text = await res.text();
        const result = { status: 'unknown', message: `API error ${res.status}: ${text}`, confidence: 'low' };
        await this.setCache(ip, result);
        return result;
      }

      const data = await res.json();
      const mapped = this.mapScoreToStatus(data);
      await this.setCache(ip, mapped);
      return mapped;
    } catch (e) {
      const result = { status: 'unknown', message: 'Network error contacting AbuseIPDB', confidence: 'low' };
      await this.setCache(ip, result);
      return result;
    }
  }

  async checkUrl(url) {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      const ips = await this.resolveDomainToIPs(domain);
      if (!ips.length) {
        return { status: 'unknown', message: 'No A records found for domain', confidence: 'low' };
      }

      // Check all resolved IPs and return the highest severity
      const results = await Promise.all(ips.map(ip => this.checkIpWithAbuseIPDB(ip)));

      // Prioritize by severity: danger > warning > safe > unknown
      const severityRank = { danger: 3, warning: 2, safe: 1, unknown: 0 };
      results.sort((a, b) => (severityRank[b.status] || 0) - (severityRank[a.status] || 0));
      const top = results[0];

      return { ...top, resolvedIps: ips };
    } catch (e) {
      return { status: 'unknown', message: 'Error checking URL', confidence: 'low' };
    }
  }
}

// Initialize checker
const checker = new AbuseIPDBChecker();

// Listen for messages from content/popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkUrl') {
    checker.checkUrl(request.url).then(sendResponse);
    return true; // keep message channel open for async response
  }
  if (request.action === 'getSecurityTips') {
    sendResponse(getRandomSecurityTip());
    return true;
  }
  if (request.action === 'updateDatabase') {
    // No-op with AbuseIPDB (kept for options UI compatibility)
    sendResponse({ ok: true });
    return true;
  }
  if (request.action === 'setAbuseKey' && typeof request.key === 'string') {
    chrome.storage.sync.set({ abuseIpdbApiKey: request.key.trim() }).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (request.action === 'openPopup') {
    const url = chrome.runtime.getURL('popup.html');
    chrome.tabs.create({ url }).then(() => sendResponse({ ok: true })).catch(() => sendResponse({ ok: false }));
    return true;
  }
  if (request.action === 'chatbotQuery') {
    // Handle Gemini API calls from chatbot (content scripts can't make external API calls directly)
    handleChatbotQuery(request).then(sendResponse).catch(err => {
      sendResponse({ success: false, error: err.message });
    });
    return true; // keep message channel open for async response
  }
});

// Handle Gemini API queries
async function handleChatbotQuery(request) {
  try {
    const { apiEndpoint, apiKey, requestBody } = request;
    
    // Make the API call from background script (has full network permissions)
    const response = await fetch(`${apiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Chatbot API error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Security tips database
function getRandomSecurityTip() {
  const tips = [
    {
      title: "Verify Email Senders",
      content: "Always verify the sender's email address. Phishing emails often use similar-looking domains.",
      category: "Email Security"
    },
    {
      title: "Check for HTTPS",
      content: "Look for the lock icon and 'https://' in the address bar before entering sensitive information.",
      category: "Web Security"
    },
    {
      title: "Be Wary of Urgent Requests",
      content: "Phishing attacks often create urgency. Take time to verify requests for sensitive information.",
      category: "Social Engineering"
    },
    {
      title: "Verify Links Before Clicking",
      content: "Hover over links to see the actual destination URL before clicking.",
      category: "Link Safety"
    },
    {
      title: "Use Multi-Factor Authentication",
      content: "Enable MFA on all important accounts to add an extra layer of security.",
      category: "Account Security"
    },
    {
      title: "Keep Software Updated",
      content: "Regularly update your browser, operating system, and applications to patch security vulnerabilities.",
      category: "System Security"
    },
    {
      title: "Be Cautious with Attachments",
      content: "Don't open email attachments from unknown senders, even if they appear legitimate.",
      category: "Email Security"
    },
    {
      title: "Use Strong, Unique Passwords",
      content: "Create complex passwords and use a password manager to store them securely.",
      category: "Password Security"
    }
  ];

  return tips[Math.floor(Math.random() * tips.length)];
}

// Periodic cache cleanup (daily)
chrome.alarms.create('cyvexCacheCleanup', { periodInMinutes: 1440 });
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'cyvexCacheCleanup') {
    const { abuseCache } = await chrome.storage.local.get(['abuseCache']);
    const cache = abuseCache || {};
    const now = Date.now();
    const cleaned = Object.fromEntries(Object.entries(cache).filter(([_, v]) => now - (v.timestamp || 0) <= checker.cacheTtlMs));
    await chrome.storage.local.set({ abuseCache: cleaned });
  }
});
