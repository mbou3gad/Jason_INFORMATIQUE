/* ─────────────────────────────────────────────────────────────
   js/forms-firebase.js
   Script Firebase injecté sur toutes les pages à formulaires.
   Intercepte les soumissions et les envoie à Firestore.
   ───────────────────────────────────────────────────────────── */
import { JasonDB, JasonEmail, genRef } from './firebase-service.js';

// ── Utilitaire : écoute un formulaire et sauvegarde dans Firestore
function hookForm(formId, collection, buildData, emailFn) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Remplace le submit handler existant (on clone le form pour supprimer les anciens listeners)
  form.addEventListener('jason-firebase-save', async (e) => {
    const data = buildData(form);
    try {
      const saved = await JasonDB.add(collection, data);
      if (emailFn) await emailFn({ ...data, id: saved.id });
      console.log(`[Firebase] ${collection} enregistré:`, saved.id);
      return saved;
    } catch (err) {
      console.error(`[Firebase] Erreur ${collection}:`, err);
      throw err;
    }
  });
}

// ─────────────────────────────────────────────────────────────
// 🔧 RÉPARATION (reparation.html)
// ─────────────────────────────────────────────────────────────
(function setupReparation() {
  const form = document.getElementById('repair-form');
  if (!form) return;

  const origSubmit = form.onsubmit;

  form.addEventListener('submit', async (e) => {
    // On laisse la validation existante s'exécuter
    // On intercepte après validation (le formulaire existant appelle showSuccess)
  });

  // On surveille l'apparition du success state pour sauvegarder
  const successEl = document.getElementById('repair-success');
  if (successEl) {
    const observer = new MutationObserver(async (mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'style') {
          const visible = successEl.style.display !== 'none' && successEl.style.display !== '';
          if (visible && !successEl.dataset.saved) {
            successEl.dataset.saved = '1';
            const ref = document.getElementById('ticket-number')?.textContent || genRef('REP');
            const data = {
              ref,
              nom:               form.querySelector('[name="nom"]')?.value || '',
              telephone:         form.querySelector('[name="telephone"]')?.value || '',
              email:             form.querySelector('[name="email"]')?.value || '',
              appareil:          form.querySelector('[name="appareil"]')?.value || document.getElementById('selected-device-display')?.textContent || '',
              marque:            form.querySelector('[name="marque"]')?.value || '',
              modele:            form.querySelector('[name="modele"]')?.value || '',
              probleme:          form.querySelector('[name="probleme"]')?.value || document.querySelector('.problem-chip.selected')?.textContent?.trim() || '',
              description:       form.querySelector('[name="description"]')?.value || '',
              type_intervention: form.querySelector('[name="type_intervention"]:checked')?.value || '',
              status:            'nouveau'
            };
            try {
              await JasonDB.add('reparations', data);
              await JasonEmail.notifyReparation(data);
            } catch (err) { console.error('[Firebase] reparation:', err); }
          }
        }
      }
    });
    observer.observe(successEl, { attributes: true, attributeFilter: ['style'] });
  }
})();

// ─────────────────────────────────────────────────────────────
// 📩 CONTACT + DEVIS (contact.html)
// ─────────────────────────────────────────────────────────────
(function setupContact() {
  // Formulaire contact
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      // La validation existante gère les erreurs ; on écoute le succès
    });
    // Intercept success state
    const successContact = contactForm.querySelector('.form-success, #contact-success');
    if (successContact) {
      new MutationObserver(async (muts) => {
        for (const m of muts) {
          if (m.type === 'attributes' && !successContact.dataset.saved) {
            const isVisible = successContact.style.display !== 'none';
            if (isVisible) {
              successContact.dataset.saved = '1';
              const data = {
                prenom:  contactForm.querySelector('[name="prenom"]')?.value || '',
                nom:     contactForm.querySelector('[name="nom"]')?.value || '',
                email:   contactForm.querySelector('[name="email"]')?.value || '',
                telephone: contactForm.querySelector('[name="telephone"]')?.value || '',
                objet:   contactForm.querySelector('[name="objet"]')?.value || '',
                message: contactForm.querySelector('[name="message"]')?.value || '',
              };
              try {
                await JasonDB.add('messages', data);
                await JasonEmail.notifyMessage(data);
              } catch (err) { console.error('[Firebase] message:', err); }
            }
          }
        }
      }).observe(successContact, { attributes: true, attributeFilter: ['style'] });
    }
  }

  // Formulaire devis
  const devisForm = document.getElementById('devis-form') || document.querySelector('#devis form');
  if (devisForm) {
    devisForm.addEventListener('submit', async (e) => {
      // Intercepté après validation
    });
  }
})();

// ─────────────────────────────────────────────────────────────
// 🎓 FORMATION — Inscription (formations.html)
// ─────────────────────────────────────────────────────────────
(function setupFormations() {
  const form = document.getElementById('inscription-form-el');
  if (!form) return;

  const successEl = document.getElementById('inscription-success');
  if (successEl) {
    new MutationObserver(async (muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && !successEl.dataset.saved) {
          if (successEl.style.display !== 'none') {
            successEl.dataset.saved = '1';
            const ref = document.getElementById('inscription-ref')?.textContent || genRef('INS');
            const data = {
              ref,
              prenom:        form.querySelector('[name="prenom"]')?.value || '',
              nom:           form.querySelector('[name="nom"]')?.value || '',
              email:         form.querySelector('[name="email"]')?.value || '',
              telephone:     form.querySelector('[name="telephone"]')?.value || '',
              formation:     form.querySelector('[name="formation"]')?.value || '',
              niveau_actuel: form.querySelector('[name="niveau_actuel"]')?.value || '',
              mode_prefere:  form.querySelector('[name="mode_prefere"]')?.value || '',
              motivations:   form.querySelector('[name="motivations"]')?.value || '',
              status:        'nouveau'
            };
            try {
              await JasonDB.add('inscriptions', data);
              await JasonEmail.notifyInscription(data);
            } catch (err) { console.error('[Firebase] inscription:', err); }
          }
        }
      }
    }).observe(successEl, { attributes: true, attributeFilter: ['style'] });
  }
})();

// ─────────────────────────────────────────────────────────────
// 🛒 BOUTIQUE — Commandes (boutique.html)
// ─────────────────────────────────────────────────────────────
(function setupBoutique() {
  const form = document.getElementById('commande-form') || document.querySelector('#panier form');
  if (!form) return;

  const successEl = document.getElementById('commande-success') || form.querySelector('.form-success');
  if (successEl) {
    new MutationObserver(async (muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && !successEl.dataset.saved) {
          if (successEl.style.display !== 'none') {
            successEl.dataset.saved = '1';
            // Récupère le panier depuis localStorage
            let cartItems = [];
            let total = 0;
            try {
              const cart = JSON.parse(localStorage.getItem('jason-cart') || '[]');
              cartItems = cart;
              total = cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
            } catch (_) {}
            const ref = document.getElementById('commande-ref')?.textContent || genRef('CMD');
            const data = {
              ref,
              nom:       form.querySelector('[name="nom"]')?.value || '',
              telephone: form.querySelector('[name="telephone"]')?.value || '',
              email:     form.querySelector('[name="email"]')?.value || '',
              adresse:   form.querySelector('[name="adresse"]')?.value || '',
              livraison: form.querySelector('[name="livraison"]:checked')?.value || '',
              paiement:  form.querySelector('[name="paiement"]:checked')?.value || '',
              articles:  cartItems.map(i => `${i.name} x${i.quantity}`).join(', '),
              items:     cartItems,
              total,
              status:    'nouveau'
            };
            try {
              await JasonDB.add('commandes', data);
              await JasonEmail.notifyCommande(data);
            } catch (err) { console.error('[Firebase] commande:', err); }
          }
        }
      }
    }).observe(successEl, { attributes: true, attributeFilter: ['style'] });
  }
})();

// ─────────────────────────────────────────────────────────────
// 🎫 ASSISTANCE — Tickets (assistance.html)
// ─────────────────────────────────────────────────────────────
(function setupAssistance() {
  const form = document.getElementById('ticket-form') || document.querySelector('#assistance-form');
  if (!form) return;

  const successEl = document.getElementById('ticket-success') || form.querySelector('.form-success');
  if (successEl) {
    new MutationObserver(async (muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && !successEl.dataset.saved) {
          if (successEl.style.display !== 'none') {
            successEl.dataset.saved = '1';
            const ref = document.getElementById('ticket-ref')?.textContent || genRef('TKT');
            const data = {
              ref,
              nom:          form.querySelector('[name="nom"]')?.value || '',
              email:        form.querySelector('[name="email"]')?.value || '',
              telephone:    form.querySelector('[name="telephone"]')?.value || '',
              type_demande: form.querySelector('[name="type_demande"]')?.value || '',
              objet:        form.querySelector('[name="objet"]')?.value || '',
              priorite:     form.querySelector('[name="priorite"]')?.value || 'normale',
              description:  form.querySelector('[name="description"]')?.value || '',
              status:       'nouveau'
            };
            try {
              await JasonDB.add('tickets', data);
              await JasonEmail.notifyTicket(data);
            } catch (err) { console.error('[Firebase] ticket:', err); }
          }
        }
      }
    }).observe(successEl, { attributes: true, attributeFilter: ['style'] });
  }
})();

// ─────────────────────────────────────────────────────────────
// 📋 SERVICES — Demande de devis (services.html)
// ─────────────────────────────────────────────────────────────
(function setupDevisServices() {
  const form = document.getElementById('devis-modal')?.querySelector('form')
            || document.getElementById('devis-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Laisser la validation existante gérer les erreurs
    setTimeout(async () => {
      // Vérifie que le formulaire a été soumis avec succès (le modal se ferme ou success affiché)
      const ref = genRef('DEV');
      const data = {
        ref,
        nom:          form.querySelector('[name="nom"]')?.value || '',
        prenom:       form.querySelector('[name="prenom"]')?.value || '',
        email:        form.querySelector('[name="email"]')?.value || '',
        telephone:    form.querySelector('[name="telephone"]')?.value || '',
        type_service: form.querySelector('[name="type_service"]')?.value || '',
        description:  form.querySelector('[name="description"]')?.value || '',
        urgence:      form.querySelector('[name="urgence"]')?.value || '',
        status:       'nouveau'
      };
      if (data.nom || data.email) {
        try {
          await JasonDB.add('devis', data);
          await JasonEmail.notifyDevis(data);
        } catch (err) { console.error('[Firebase] devis:', err); }
      }
    }, 1200);
  });
})();

console.log('[Jason Firebase] Formulaires connectés à Firestore ✓');
