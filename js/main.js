/* ============================================================
   JASON_INFORMATIQUE — JavaScript Principal
   ============================================================ */

'use strict';

/* ── PRELOADER ── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const letters = preloader.querySelectorAll('.preloader-letter');
  const delays  = [0, 400, 800, 1200, 1600];

  letters.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('active');
      setTimeout(() => el.classList.add('filled'), 300);
    }, delays[i]);
  });

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 3000);

  document.body.style.overflow = 'hidden';
})();

/* ── THEME ── */
const ThemeManager = {
  STORAGE_KEY: 'jason-theme',
  current: 'light',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.current = saved || (prefersDark ? 'dark' : 'light');
    this.apply();
    this.bindToggle();
  },

  apply() {
    document.documentElement.setAttribute('data-theme', this.current);
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
      icon.setAttribute('data-theme', this.current);
    });
  },

  toggle() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    localStorage.setItem(this.STORAGE_KEY, this.current);
    this.apply();
  },

  bindToggle() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  }
};

/* ── NAVIGATION ── */
const Nav = {
  init() {
    this.header   = document.getElementById('header');
    this.hamburger = document.getElementById('hamburger');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.bindScroll();
    this.bindHamburger();
    this.bindMobileAccordion();
    this.setActive();
    this.bindDropdownHover();
  },

  bindScroll() {
    let last = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (!this.header) return;
      if (y > 80) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      last = y;
    }, { passive: true });
  },

  bindHamburger() {
    if (!this.hamburger || !this.mobileMenu) return;
    this.hamburger.addEventListener('click', () => {
      const open = this.hamburger.classList.toggle('open');
      if (open) {
        this.mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        this.mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    // Close on backdrop
    this.mobileMenu.addEventListener('click', (e) => {
      if (e.target === this.mobileMenu) this.closeMenu();
    });
  },

  closeMenu() {
    if (this.hamburger) this.hamburger.classList.remove('open');
    if (this.mobileMenu) this.mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  },

  bindMobileAccordion() {
    document.querySelectorAll('.mobile-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.nextElementSibling;
        if (!sub) return;
        const isOpen = sub.style.maxHeight;
        document.querySelectorAll('.mobile-submenu').forEach(s => { s.style.maxHeight = ''; });
        if (!isOpen) {
          sub.style.maxHeight = sub.scrollHeight + 'px';
          btn.querySelector('.chevron')?.classList.toggle('rotate');
        }
      });
    });
  },

  setActive() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link[href], .mobile-nav-link[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && path === href) {
        link.classList.add('active');
      }
    });
  },

  bindDropdownHover() {
    // keyboard accessibility
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          const drop = item.querySelector('.dropdown');
          if (drop) { drop.style.opacity = '0'; drop.style.visibility = 'hidden'; }
        }
      });
    });
  }
};

/* ── SEARCH ── */
const Search = {
  overlay: null,
  input: null,

  init() {
    this.overlay = document.getElementById('search-overlay');
    this.input   = document.getElementById('search-input');
    this.bindOpen();
    this.bindClose();
    this.bindSuggestions();
    this.bindInput();
  },

  open() {
    if (!this.overlay) return;
    this.overlay.classList.add('open');
    setTimeout(() => this.input?.focus(), 100);
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  bindOpen() {
    document.querySelectorAll('.search-open-btn').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
  },

  bindClose() {
    if (!this.overlay) return;
    document.getElementById('search-close')?.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },

  bindSuggestions() {
    document.querySelectorAll('.search-chip, .search-suggestion').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        if (this.input) this.input.value = text;
        this.search(text);
      });
    });
  },

  bindInput() {
    if (!this.input) return;
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.search(this.input.value);
    });
  },

  search(query) {
    if (!query.trim()) return;
    const q = encodeURIComponent(query.trim());
    window.location.href = `pages/search.html?q=${q}`;
  }
};

/* ── CART ── */
const Cart = {
  STORAGE_KEY: 'jason-cart',
  items: [],

  init() {
    this.load();
    this.updateUI();
  },

  load() {
    try {
      this.items = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch { this.items = []; }
  },

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  },

  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty = Math.min(existing.qty + 1, existing.stock || 99);
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
    this.updateUI();
    Toast.show('Produit ajouté', `${product.name} a été ajouté au panier.`, 'success');
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.updateUI();
  },

  updateQty(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) { this.remove(id); return; }
    item.qty = qty;
    this.save();
    this.updateUI();
  },

  total() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  },

  count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  },

  updateUI() {
    const count = this.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  }
};

/* ── TOAST NOTIFICATIONS ── */
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(title, msg = '', type = 'info', duration = 4000) {
    if (!this.container) this.init();
    const icons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-text">
        <div class="toast-title">${title}</div>
        ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
      </div>
    `;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

/* ── MODALS ── */
const Modal = {
  open(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.addEventListener('click', () => this.close(id));
    modal.addEventListener('click', (e) => { if (e.target === modal) this.close(id); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { Modal.close(id); document.removeEventListener('keydown', esc); }
    });
  },
  close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ── CHATBOT ── */
const Chatbot = {
  panel: null,
  btn: null,
  input: null,
  messages: null,
  isOpen: false,

  FAQ: [
    { patterns: ['horaire', 'heure', 'ouvert', 'ferme'], answer: 'Jason_INFORMATIQUE est ouvert du lundi au samedi, de 08h00 à 19h00. Le support sous contrat est disponible 24h/24 et 7j/7.' },
    { patterns: ['reparation', 'réparer', 'panne', 'cassé'], answer: 'Pour faire réparer votre appareil, rendez-vous sur notre page <a href="pages/reparation.html">Réparation</a>. Vous pouvez déposer une demande en ligne et nous vous contacterons rapidement.' },
    { patterns: ['formation', 'cours', 'apprendre', 'formation'], answer: 'Nous proposons plus de 22 formations en informatique, du débutant au niveau avancé. Découvrez notre <a href="pages/formations.html">catalogue de formations</a>.' },
    { patterns: ['devis', 'prix', 'tarif', 'cout', 'coût'], answer: 'Pour obtenir un devis personnalisé, remplissez notre <a href="pages/contact.html">formulaire de contact</a> ou cliquez sur "Demander un devis" dans la navigation.' },
    { patterns: ['contact', 'joindre', 'appeler', 'email', 'whatsapp'], answer: 'Contactez-nous par email à jasoninformatique7@gmail.com. Notre adresse : Mpila, Brazzaville, Congo. Vous pouvez aussi nous rejoindre sur WhatsApp.' },
    { patterns: ['localisation', 'adresse', 'où', 'situe', 'brazzaville'], answer: 'Jason_INFORMATIQUE est situé à Mpila, Brazzaville, République du Congo.' },
    { patterns: ['boutique', 'acheter', 'produit', 'ordinateur'], answer: 'Visitez notre <a href="pages/boutique.html">boutique en ligne</a> pour découvrir nos produits informatiques. Paiement à la livraison disponible.' },
    { patterns: ['guide', 'tuto', 'tutoriel', 'comment'], answer: 'Notre <a href="pages/guides.html">bibliothèque de guides techniques</a> contient des tutoriels détaillés sur la maintenance, Windows, Linux, réseaux et plus encore.' },
    { patterns: ['entreprise', 'pro', 'professionnel', 'société'], answer: 'Jason PRO propose des solutions adaptées aux entreprises : maintenance de parc, infogérance, sécurité informatique. Voir <a href="pages/entreprises.html">Jason PRO</a>.' },
    { patterns: ['bonjour', 'salut', 'bonsoir', 'hello', 'hi'], answer: 'Bonjour ! Je suis l\'assistant Jason. Comment puis-je vous aider aujourd\'hui ?' }
  ],

  init() {
    this.panel    = document.getElementById('chatbot-panel');
    this.btn      = document.getElementById('chatbot-btn');
    this.input    = document.getElementById('chatbot-input');
    this.messages = document.getElementById('chatbot-messages');

    if (!this.panel || !this.btn) return;

    this.btn.addEventListener('click', () => this.toggle());
    document.getElementById('chatbot-close')?.addEventListener('click', () => this.close());
    document.getElementById('chatbot-send')?.addEventListener('click', () => this.send());
    this.input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.send(); });
  },

  toggle() {
    this.isOpen ? this.close() : this.openChat();
  },

  openChat() {
    this.isOpen = true;
    this.panel.classList.add('open');
    if (this.messages && this.messages.children.length === 0) {
      this.addMessage('bot', 'Bonjour ! 👋 Je suis l\'assistant Jason. Comment puis-je vous aider ?');
      setTimeout(() => {
        this.addMessage('bot', 'Vous pouvez me poser des questions sur nos services, horaires, formations, réparations ou boutique.');
      }, 800);
    }
    this.input?.focus();
  },

  close() {
    this.isOpen = false;
    this.panel.classList.remove('open');
  },

  send() {
    const text = this.input?.value?.trim();
    if (!text) return;
    this.addMessage('user', text);
    this.input.value = '';
    setTimeout(() => this.respond(text), 500);
  },

  respond(text) {
    const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const match = this.FAQ.find(f => f.patterns.some(p => lower.includes(p)));
    const answer = match
      ? match.answer
      : 'Je n\'ai pas compris votre demande. Contactez-nous directement : <a href="pages/contact.html">formulaire de contact</a> ou par email à jasoninformatique7@gmail.com.';
    this.addMessage('bot', answer);
  },

  addMessage(role, text) {
    if (!this.messages) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = `<div class="chat-bubble">${text}</div>`;
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
};

/* ── INTERSECTION OBSERVER (Animations) ── */
const Animations = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in-up, .fade-in').forEach(el => {
      observer.observe(el);
    });
  }
};

/* ── SCROLL TO TOP ── */
const ScrollTop = {
  init() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
};

/* ── COOKIE BANNER ── */
const CookieBanner = {
  STORAGE_KEY: 'jason-cookie-consent',
  init() {
    if (localStorage.getItem(this.STORAGE_KEY)) return;
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    setTimeout(() => banner.classList.add('show'), 1500);
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem(this.STORAGE_KEY, 'accepted');
      banner.classList.remove('show');
    });
    document.getElementById('cookie-refuse')?.addEventListener('click', () => {
      localStorage.setItem(this.STORAGE_KEY, 'refused');
      banner.classList.remove('show');
    });
  }
};

/* ── FORM VALIDATION ── */
const FormValidator = {
  validate(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const error = form.querySelector(`[data-error="${field.name}"]`);
      if (!field.value.trim()) {
        field.classList.add('error');
        if (error) error.classList.add('show');
        valid = false;
      } else {
        field.classList.remove('error');
        if (error) error.classList.remove('show');
        if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
          field.classList.add('error');
          if (error) { error.textContent = 'Email invalide.'; error.classList.add('show'); }
          valid = false;
        }
      }
    });
    return valid;
  }
};

/* ── TICKET GENERATOR ── */
const TicketGen = {
  generate(prefix = 'JAI') {
    const date = new Date();
    const ymd  = `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
    const rand = Math.floor(Math.random() * 9000 + 1000);
    return `${prefix}-${ymd}-${rand}`;
  }
};

/* ── TABS ── */
const Tabs = {
  init(container) {
    const btns = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        container.querySelector(`#tab-${target}`)?.classList.add('active');
      });
    });
  }
};

/* ── REPAIR MODULE ── */
const Repair = {
  step: 1,
  data: {},

  init() {
    this.bindSteps();
    this.bindForm();
  },

  bindSteps() {
    document.querySelectorAll('[data-repair-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.goTo(parseInt(btn.dataset.repairStep));
      });
    });
  },

  goTo(step) {
    document.querySelectorAll('.repair-panel').forEach((p, i) => {
      p.style.display = i + 1 === step ? 'block' : 'none';
    });
    document.querySelectorAll('.repair-step-tab').forEach((t, i) => {
      t.classList.toggle('active', i + 1 === step);
      t.classList.toggle('done', i + 1 < step);
    });
    this.step = step;
  },

  bindForm() {
    const form = document.getElementById('repair-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!FormValidator.validate(form)) return;
      const ticket = TicketGen.generate('REP');
      document.getElementById('ticket-number').textContent = ticket;
      form.style.display = 'none';
      document.getElementById('repair-success').style.display = 'block';
      Toast.show('Demande envoyée', `Votre ticket de réparation ${ticket} a été créé.`, 'success');
    });
  }
};

/* ── QUOTE FORM ── */
const QuoteForm = {
  init() {
    const form = document.getElementById('quote-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!FormValidator.validate(form)) return;
      const ref = TicketGen.generate('DEV');
      Toast.show('Demande reçue', `Votre demande de devis ${ref} a été enregistrée. Nous vous contacterons sous 24h.`, 'success');
      form.reset();
    });
  }
};

/* ── CONTACT FORM ── */
const ContactForm = {
  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!FormValidator.validate(form)) return;
      const ref = TicketGen.generate('MSG');
      Toast.show('Message envoyé', `Référence : ${ref}. Nous vous répondrons dans les plus brefs délais.`, 'success');
      form.reset();
    });
  }
};

/* ── FILTERS ── */
const Filters = {
  init(containerSelector, itemSelector, filterSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const filters = container.querySelectorAll(filterSelector);
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        container.querySelectorAll(itemSelector).forEach(item => {
          const matches = cat === 'all' || item.dataset.category === cat || item.dataset.level === cat;
          item.style.display = matches ? '' : 'none';
        });
      });
    });
  }
};

/* ── COUNTER ANIMATION ── */
const Counter = {
  animate(el) {
    const target = parseInt(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('fr-FR') + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  },

  init() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          Counter.animate(entry.target);
        }
      });
    });
    document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
  }
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Nav.init();
  Search.init();
  Cart.init();
  Toast.init();
  Chatbot.init();
  Animations.init();
  ScrollTop.init();
  CookieBanner.init();
  Repair.init();
  QuoteForm.init();
  ContactForm.init();
  Counter.init();

  // Init tabs
  document.querySelectorAll('[data-tabs]').forEach(container => Tabs.init(container));

  // Filter buttons
  Filters.init('.filter-container', '[data-category], [data-level]', '.filter-btn');

  // Devis modal
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => Modal.open(btn.dataset.openModal));
  });

  // Search shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      Search.open();
    }
  });
});

/* Export globals */
window.JasonApp = { Cart, Toast, Modal, Search, ThemeManager, TicketGen, FormValidator };
