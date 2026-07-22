/**
 * JASON_INFORMATIQUE - Jason AI Assistant Conversational Engine
 * Handles floating chat UI, intelligent keyword matching, automated quotes/appointments,
 * and includes a pluggable architecture for OpenAI, Gemini, Claude, DeepSeek, Ollama or REST APIs.
 */

class JasonAIEngine {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.activeProvider = "INTERNAL_ENGINE"; // Pluggable provider
    this.apiConfig = null;
    this.init();
  }

  init() {
    this.createUIElements();
    this.bindEvents();
    this.addBotMessage("Bonjour ! Je suis **Jason AI**, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ? (Devis, rendez-vous, services, formations, tarifs...)");
  }

  createUIElements() {
    if (document.getElementById('ai-widget-launcher')) return;

    const launcher = document.createElement('button');
    launcher.id = 'ai-widget-launcher';
    launcher.className = 'ai-widget-launcher';
    launcher.setAttribute('aria-label', 'Ouvrir Jason AI');
    launcher.innerHTML = `
      <i class="fa-solid fa-robot"></i>
      <span class="ai-notification-badge"></span>
    `;

    const chatModal = document.createElement('div');
    chatModal.id = 'ai-chat-modal';
    chatModal.className = 'ai-chat-modal';
    chatModal.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-brand-info">
          <div class="ai-avatar">
            <i class="fa-solid fa-brain"></i>
            <span class="ai-online-status"></span>
          </div>
          <div class="ai-title-wrapper">
            <h5>Jason AI</h5>
            <div class="ai-status-subtitle">
              <i class="fa-solid fa-bolt" style="color: var(--secondary);"></i>
              <span id="ai-provider-label">Assistant Virtuel 24/7</span>
            </div>
          </div>
        </div>
        <button class="ai-close-btn" id="ai-close-btn" aria-label="Fermer chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="ai-chat-body" id="ai-chat-body"></div>

      <div class="ai-quick-chips">
        <button class="chip-btn" data-intent="devis">💼 Devis Express</button>
        <button class="chip-btn" data-intent="rdv">📅 Rendez-vous</button>
        <button class="chip-btn" data-intent="services">💻 Nos Services</button>
        <button class="chip-btn" data-intent="formations">🎓 Formations</button>
        <button class="chip-btn" data-intent="contact">📞 Contact & Map</button>
      </div>

      <div class="ai-chat-input-area">
        <input type="text" id="ai-chat-input" class="ai-chat-input" placeholder="Posez votre question à Jason AI..." autocomplete="off" />
        <button id="ai-send-btn" class="ai-send-btn" aria-label="Envoyer">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chatModal);

    this.launcherEl = launcher;
    this.modalEl = chatModal;
    this.chatBodyEl = document.getElementById('ai-chat-body');
    this.inputEl = document.getElementById('ai-chat-input');
    this.sendBtnEl = document.getElementById('ai-send-btn');
  }

  bindEvents() {
    this.launcherEl.addEventListener('click', () => this.toggleChat());
    document.getElementById('ai-close-btn').addEventListener('click', () => this.toggleChat(false));

    this.sendBtnEl.addEventListener('click', () => this.handleUserSubmit());
    this.inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserSubmit();
    });

    // Quick prompt chips
    this.modalEl.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const intent = e.target.dataset.intent;
        this.triggerQuickIntent(intent);
      });
    });
  }

  toggleChat(forceState = null) {
    this.isOpen = forceState !== null ? forceState : !this.isOpen;
    if (this.isOpen) {
      this.modalEl.classList.add('active');
      this.inputEl.focus();
    } else {
      this.modalEl.classList.remove('active');
    }
  }

  addUserMessage(text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-message user-message';
    msgEl.innerHTML = `
      <div class="msg-bubble">
        ${this.escapeHTML(text)}
        <span class="msg-time">${time}</span>
      </div>
    `;
    this.chatBodyEl.appendChild(msgEl);
    this.scrollToBottom();
  }

  addBotMessage(text, isTyping = false) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-message bot-message';
    msgEl.innerHTML = `
      <div class="ai-avatar" style="width:28px; height:28px; font-size:0.8rem; flex-shrink:0;">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="msg-bubble">
        ${this.formatMarkdown(text)}
        <span class="msg-time">${time}</span>
      </div>
    `;
    this.chatBodyEl.appendChild(msgEl);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.id = 'ai-typing';
    typingEl.className = 'ai-message bot-message';
    typingEl.innerHTML = `
      <div class="ai-avatar" style="width:28px; height:28px; font-size:0.8rem; flex-shrink:0;">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="ai-typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    this.chatBodyEl.appendChild(typingEl);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const typingEl = document.getElementById('ai-typing');
    if (typingEl) typingEl.remove();
  }

  async handleUserSubmit() {
    const query = this.inputEl.value.trim();
    if (!query) return;

    this.addUserMessage(query);
    this.inputEl.value = '';
    this.showTypingIndicator();

    // Response generation
    setTimeout(async () => {
      this.removeTypingIndicator();
      const botResponse = await this.generateResponse(query);
      this.addBotMessage(botResponse);
    }, 600);
  }

  triggerQuickIntent(intent) {
    let prompt = "";
    switch(intent) {
      case 'devis': prompt = "Je souhaite demander un devis personnalisé."; break;
      case 'rdv': prompt = "Je veux prendre un rendez-vous avec un expert."; break;
      case 'services': prompt = "Quels sont tous les services proposés par Jason_INFORMATIQUE ?"; break;
      case 'formations': prompt = "Quelles sont les formations professionnelles certifiantes disponibles ?"; break;
      case 'contact': prompt = "Quels sont vos contacts, adresse et numéros de téléphone ?"; break;
    }
    this.inputEl.value = prompt;
    this.handleUserSubmit();
  }

  async generateResponse(query) {
    // Check if external API provider is configured
    if (this.activeProvider !== "INTERNAL_ENGINE" && this.apiConfig) {
      return await this.callExternalAPI(query);
    }

    const q = query.toLowerCase();

    if (q.includes('devis') || q.includes('tarif') || q.includes('prix') || q.includes('coût')) {
      return "Absolument ! Pour obtenir un **devis sur-mesure sous 24h**, vous pouvez remplir notre [Formulaire de Contact](contact.html) ou réserver une téléconsultation gratuite avec notre équipe technique.";
    }

    if (q.includes('rendez-vous') || q.includes('rdv') || q.includes('démo') || q.includes('consulter')) {
      return "📅 Nous serons ravis de planifier un rendez-vous avec vous ! Vous pouvez nous contacter directement par **WhatsApp (+33600000000)** ou via le formulaire sur la page [Contact](contact.html).";
    }

    if (q.includes('formation') || q.includes('cours') || q.includes('apprendre') || q.includes('étudier')) {
      return "🎓 **Jason_INFORMATIQUE** propose des formations certifiantes de haut niveau en :\n• Cybersécurité & Ethical Hacking\n• Développement Web Full-Stack\n• Cloud AWS & Kubernetes\n• Administration Réseaux Cisco\nDécouvrez tous nos programmes sur la page [Formations](formations.html).";
    }

    if (q.includes('service') || q.includes('activité') || q.includes('web') || q.includes('mobile') || q.includes('cyber') || q.includes('cloud') || q.includes('caméra')) {
      return "💻 Nos 19 pôles d'expertise incluent :\n• **Développement** : Web & Mobile, Applications métier\n• **Infrastructures** : Serveurs, Réseaux, Cloud, Hébergement\n• **Sécurité** : Cybersécurité, Caméras IP, Sauvegardes\n• **Support** : Dépannage, Télémaintenance 24/7\nConsultez l'ensemble sur [Services](services.html).";
    }

    if (q.includes('contact') || q.includes('adresse') || q.includes('téléphone') || q.includes('localisation') || q.includes('mail')) {
      return "📍 **Jason_INFORMATIQUE**\n• Adresse : 124 Avenue des Technologies, Paris\n• Téléphone : +33 1 89 20 45 00\n• E-mail : contact@jason-informatique.com\n• Horaires : Lun - Sam (08h00 - 19h00)\nAccédez au plan d'accès sur [Contact](contact.html).";
    }

    return "Merci pour votre message ! En tant qu'assistant de **Jason_INFORMATIQUE**, je peux vous renseigner sur nos 19 expertises informatiques, nos tarifs, nos formations ou planifier un rendez-vous. N'hésitez pas à nous contacter par téléphone au **+33 1 89 20 45 00** ou sur WhatsApp.";
  }

  /**
   * Pluggable API Architecture Method
   * Allows plugging OpenAI, Gemini, Claude, DeepSeek, Ollama or any REST API
   */
  setAPIProvider(providerName, apiKey, endpoint) {
    this.activeProvider = providerName;
    this.apiConfig = { apiKey, endpoint };
    document.getElementById('ai-provider-label').textContent = `Alimenté par ${providerName}`;
    console.log(`[Jason AI] Switched engine provider to ${providerName}`);
  }

  async callExternalAPI(userMessage) {
    try {
      // Prepared REST payload schema for OpenAI / Gemini / Ollama / Custom Backend
      const response = await fetch(this.apiConfig.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiConfig.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [
            { role: "system", content: "Vous êtes Jason AI, l'assistant officiel de l'entreprise Jason_INFORMATIQUE." },
            { role: "user", content: userMessage }
          ]
        })
      });
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.warn("[Jason AI] API Provider Error, falling back to internal engine.", err);
      return this.generateResponse(userMessage);
    }
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  formatMarkdown(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:var(--secondary); text-decoration:underline;">$1</a>')
      .replace(/\n/g, '<br/>');
  }

  scrollToBottom() {
    this.chatBodyEl.scrollTop = this.chatBodyEl.scrollHeight;
  }
}

// Instantiate Jason AI on page load
document.addEventListener('DOMContentLoaded', () => {
  window.JasonAI = new JasonAIEngine();
});
