// CyvexBot - Vanilla JavaScript Chatbot
class CyvexChatbot {
  constructor() {
    this.apiKey = 'AIzaSyDNUf-pSYSHhNiIujwotce3kPWWYTWlwDc';
    this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    this.conversationHistory = [];
    this.isOpen = false;
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
    this.initialX = 0;
    this.initialY = 0;
    this.scanResults = { safe: 0, warning: 0, danger: 0 };
    
    this.init();
  }

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
  }

  createChatbotUI() {
    // Create floating button
    this.floatingButton = document.createElement('button');
    this.floatingButton.id = 'cyvex-chatbot-button';
    this.floatingButton.innerHTML = '🤖';
    this.floatingButton.title = 'Open CyvexBot Assistant';
    
    // Create chat window (hidden by default)
    this.chatWindow = document.createElement('div');
    this.chatWindow.id = 'cyvex-chatbot-window';
    this.chatWindow.style.display = 'none';
    this.chatWindow.innerHTML = `
      <div id="cyvex-chatbot-header">
        <span class="cyvex-chatbot-title">🛡️ CyvexBot Assistant</span>
        <button id="cyvex-chatbot-close">×</button>
      </div>
      <div id="cyvex-chatbot-messages">
        <div class="cyvex-chat-message cyvex-bot-message">
          <div class="cyvex-message-content">
            👋 Hi! I'm CyvexBot, your security training assistant!
            <br><br>
            I can help you with:
            <br>• Understanding security warnings
            <br>• Learning about phishing
            <br>• Using the Cyvex extension
            <br>• Security best practices
            <br><br>
            Ask me anything! 😊
          </div>
        </div>
      </div>
      <div id="cyvex-chatbot-quick-replies">
        <button class="cyvex-quick-reply">What is phishing?</button>
        <button class="cyvex-quick-reply">How do I use Cyvex?</button>
        <button class="cyvex-quick-reply">Security tips?</button>
      </div>
      <div id="cyvex-chatbot-input-container">
        <textarea id="cyvex-chatbot-input" placeholder="Ask me anything..." rows="2"></textarea>
        <button id="cyvex-chatbot-send">Send</button>
      </div>
    `;

    // Append to body
    document.body.appendChild(this.floatingButton);
    document.body.appendChild(this.chatWindow);
  }

  attachEventListeners() {
    // Toggle chat window
    this.floatingButton.addEventListener('click', () => this.toggleChat());
    
    // Close button
    const closeBtn = document.getElementById('cyvex-chatbot-close');
    closeBtn.addEventListener('click', () => this.toggleChat());

    // Send button
    const sendBtn = document.getElementById('cyvex-chatbot-send');
    sendBtn.addEventListener('click', () => this.sendMessage());

    // Input field - send on Enter (Shift+Enter for new line)
    const input = document.getElementById('cyvex-chatbot-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Quick reply buttons
    const quickReplies = document.querySelectorAll('.cyvex-quick-reply');
    quickReplies.forEach(btn => {
      btn.addEventListener('click', () => {
        const message = btn.textContent;
        input.value = message;
        this.sendMessage();
      });
    });

    // Make chat window draggable
    const header = document.getElementById('cyvex-chatbot-header');
    header.addEventListener('mousedown', (e) => this.dragStart(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.dragEnd());
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatWindow.style.display = this.isOpen ? 'flex' : 'none';
    
    if (this.isOpen) {
      document.getElementById('cyvex-chatbot-input').focus();
    }
  }

  async sendMessage() {
    const input = document.getElementById('cyvex-chatbot-input');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;

    // Clear input
    input.value = '';

    // Add user message to chat
    this.addMessage(userMessage, 'user');

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Send to Gemini API via background script
      const response = await this.callGeminiAPI(userMessage);
      
      // Remove typing indicator
      this.removeTypingIndicator();

      // Add bot response
      this.addMessage(response, 'bot');

    } catch (error) {
      console.error('Chatbot error:', error);
      this.removeTypingIndicator();
      this.addMessage(
        "I'm having trouble connecting right now. Please check your internet connection and try again! 🔄",
        'bot'
      );
    }
  }

  async callGeminiAPI(userMessage) {
    // Build context from scan results
    const contextPrompt = `
Current page scan results:
- Safe links: ${this.scanResults.safe}
- Warning links: ${this.scanResults.warning}
- Dangerous links: ${this.scanResults.danger}

User question: ${userMessage}
`;

    // Add to conversation history
    this.conversationHistory.push({
      role: 'user',
      parts: [{ text: contextPrompt }]
    });

    const requestBody = {
      contents: this.conversationHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
      systemInstruction: {
        parts: [{
          text: `You are CyvexBot, a friendly and knowledgeable security training assistant for the Cyvex phishing protection extension. Your role is to help employees at small and medium-sized businesses learn about cybersecurity and how to use Cyvex effectively.

YOUR PERSONALITY:
- Friendly, patient, and encouraging
- Use simple language (avoid technical jargon)
- Be concise but thorough
- Use emojis occasionally to be friendly 😊

YOUR EXPERTISE:
1. **Cyvex Extension Usage**:
   - How to scan links (click extension icon → "Scan This Page")
   - Understanding badges: SAFE (green), WARN (orange), DANGER (red)
   - Using keyboard shortcut: Ctrl+Shift+X to toggle overlay
   - Viewing recent scans and security tips

2. **Phishing Detection**:
   - How to spot phishing emails
   - Red flags in suspicious links
   - Checking sender email addresses
   - Verifying website authenticity
   - What to do if you receive a phishing attempt

3. **Security Best Practices**:
   - Password hygiene
   - Multi-factor authentication (MFA)
   - Safe browsing habits
   - Protecting sensitive information
   - Responding to security incidents

IMPORTANT GUIDELINES:
- Keep responses under 150 words
- If user asks about current page, reference the scan results provided
- Don't mention quiz scores or assessments
- Always be encouraging and supportive
- If you don't know something, admit it honestly`
        }]
      }
    };

    // Send request via background script (content scripts can't make external API calls)
    const response = await chrome.runtime.sendMessage({
      action: 'chatbotQuery',
      apiEndpoint: this.apiEndpoint,
      apiKey: this.apiKey,
      requestBody: requestBody
    });

    if (!response || !response.success) {
      throw new Error(response?.error || 'API call failed');
    }

    const assistantMessage = response.data.candidates[0]?.content?.parts[0]?.text || 
                             "I'm having trouble responding right now. Please try again!";

    // Add to conversation history
    this.conversationHistory.push({
      role: 'model',
      parts: [{ text: assistantMessage }]
    });

    return assistantMessage;
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('cyvex-chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `cyvex-chat-message cyvex-${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'cyvex-message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('cyvex-chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'cyvex-typing-indicator';
    typingDiv.className = 'cyvex-chat-message cyvex-bot-message';
    typingDiv.innerHTML = `
      <div class="cyvex-message-content">
        <div class="cyvex-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const typingIndicator = document.getElementById('cyvex-typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  updateScanResults(results) {
    this.scanResults = results;
  }

  // Drag functionality
  dragStart(e) {
    if (e.target === document.getElementById('cyvex-chatbot-close')) return;
    
    this.isDragging = true;
    this.initialX = e.clientX - this.currentX;
    this.initialY = e.clientY - this.currentY;
  }

  drag(e) {
    if (!this.isDragging) return;
    
    e.preventDefault();
    this.currentX = e.clientX - this.initialX;
    this.currentY = e.clientY - this.initialY;
    
    this.chatWindow.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  dragEnd() {
    this.isDragging = false;
  }
}

// Initialize chatbot when page loads
let cyvexChatbot;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    cyvexChatbot = new CyvexChatbot();
  });
} else {
  cyvexChatbot = new CyvexChatbot();
}

// Listen for scan result updates from LinkScanner
window.addEventListener('cyvex-scan-update', (event) => {
  if (cyvexChatbot && event.detail) {
    cyvexChatbot.updateScanResults(event.detail);
  }
});

