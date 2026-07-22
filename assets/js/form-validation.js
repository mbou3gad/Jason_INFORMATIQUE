/**
 * JASON_INFORMATIQUE - Form Validation & Security Module
 * Performs real-time client-side validation, XSS sanitization, and modal feedback.
 * Ready for EmailJS, Firebase, or custom backend endpoints.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateContactForm(contactForm)) {
        submitContactForm(contactForm);
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateNewsletterForm(newsletterForm)) {
        showSuccessModal("Abonnement Réussi !", "Merci de vous être abonné à la newsletter de Jason_INFORMATIQUE. Vous recevrez nos dernières actualités technologiques.");
        newsletterForm.reset();
      }
    });
  }
});

/**
 * Validates the contact form fields.
 */
function validateContactForm(form) {
  let isValid = true;

  const nameInput = form.querySelector('[name="fullname"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const serviceInput = form.querySelector('[name="service"]');
  const messageInput = form.querySelector('[name="message"]');

  // Name Validation
  if (nameInput) {
    if (nameInput.value.trim().length < 2) {
      setError(nameInput, "Veuillez entrer votre nom complet (au moins 2 caractères).");
      isValid = false;
    } else {
      clearError(nameInput);
    }
  }

  // Email Validation
  if (emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, "Veuillez entrer une adresse e-mail valide.");
      isValid = false;
    } else {
      clearError(emailInput);
    }
  }

  // Phone Validation
  if (phoneInput && phoneInput.value.trim().length > 0) {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      setError(phoneInput, "Format de numéro de téléphone invalide.");
      isValid = false;
    } else {
      clearError(phoneInput);
    }
  }

  // Message Validation
  if (messageInput) {
    if (messageInput.value.trim().length < 10) {
      setError(messageInput, "Veuillez détailler votre demande (au moins 10 caractères).");
      isValid = false;
    } else {
      clearError(messageInput);
    }
  }

  return isValid;
}

function validateNewsletterForm(form) {
  const emailInput = form.querySelector('input[type="email"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
    alert("Veuillez saisir une adresse e-mail valide.");
    return false;
  }
  return true;
}

function setError(inputEl, message) {
  const group = inputEl.closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    let errorEl = group.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }
}

function clearError(inputEl) {
  const group = inputEl.closest('.form-group');
  if (group) {
    group.classList.remove('has-error');
  }
}

/**
 * Handles Form Submission with feedback modal.
 * Ready to connect with EmailJS / Firebase / REST endpoint.
 */

async function submitContactForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Traitement...`;

  const formData = new FormData(form);
  const payload = {
    fullname: sanitizeXSS(formData.get('fullname') || ''),
    email: sanitizeXSS(formData.get('email') || ''),
    phone: sanitizeXSS(formData.get('phone') || ''),
    service: sanitizeXSS(formData.get('service') || ''),
    message: sanitizeXSS(formData.get('message') || ''),
    timestamp: new Date().toISOString()
  };

  console.log("[Contact Form Submit] Payload ready for EmailJS/Firebase:", payload);

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    form.reset();

    showSuccessModal(
      "Demande Envoyée avec Succès !",
      "Merci d'avoir contacté **Jason_INFORMATIQUE**. Un ingénieur spécialisé analysera votre message et vous répondra sous 2h."
    );
  }, 1200);
}

function sanitizeXSS(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function showSuccessModal(title, text) {
  let modalOverlay = document.getElementById('feedback-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'feedback-modal';
    modalOverlay.className = 'intro-overlay';
    modalOverlay.style.background = 'rgba(6, 8, 16, 0.9)';
    modalOverlay.style.backdropFilter = 'blur(16px)';
    modalOverlay.innerHTML = `
      <div class="glass-card" style="max-width: 480px; text-align: center; padding: 2.5rem; border-color: var(--secondary);">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 2rem; color: #fff;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 id="feedback-modal-title" style="margin-bottom: 1rem;">${title}</h3>
        <p id="feedback-modal-text" style="color: var(--text-secondary); margin-bottom: 2rem;">${text}</p>
        <button class="btn btn-primary" onclick="document.getElementById('feedback-modal').style.display='none'">Fermer</button>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  } else {
    document.getElementById('feedback-modal-title').textContent = title;
    document.getElementById('feedback-modal-text').textContent = text;
    modalOverlay.style.display = 'flex';
  }
}
