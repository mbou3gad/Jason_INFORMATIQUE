// ═══════════════════════════════════════════════════════════════
// js/email-forms.js  —  Jason_INFORMATIQUE
// Envoie tous les formulaires directement dans votre Gmail
// via Web3Forms  ✉️  jasoninformatique7@gmail.com
// Clé : 4b5e8b88-fdad-4153-b550-6e69e70d95bd
// ═══════════════════════════════════════════════════════════════

const ACCESS_KEY = '4b5e8b88-fdad-4153-b550-6e69e70d95bd';

// ─────────────────────────────────────────────────────────────
// Envoi via Web3Forms (pattern officiel — FormData + fetch)
// ─────────────────────────────────────────────────────────────
async function envoyerFormulaire(form, sujet, champsSupp = {}) {
  const submitBtn     = form.querySelector('button[type="submit"]');
  const texteOriginal = submitBtn ? submitBtn.innerHTML : '';

  // Bouton → chargement
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px">
      <svg style="animation:spin .7s linear infinite" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
      </svg>Envoi en cours…</span>`;
  }

  // FormData depuis le formulaire HTML (captures tous les champs avec name=)
  const formData = new FormData(form);
  formData.append('access_key', ACCESS_KEY);
  formData.append('subject',    `[Jason_INFORMATIQUE] ${sujet}`);
  formData.append('from_name',  'Jason_INFORMATIQUE — Site Web');
  formData.append('botcheck',   '');                           // anti-spam

  // Champs supplémentaires (panier, référence, etc.)
  for (const [k, v] of Object.entries(champsSupp)) {
    formData.append(k, v);
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body:   formData
    });
    const data = await response.json();

    if (response.ok) {
      if (submitBtn) {
        submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Envoyé !`;
        submitBtn.style.background = '#16a34a';
        submitBtn.disabled = false;
      }
      return { ok: true, data };
    } else {
      throw new Error(data.message || 'Erreur Web3Forms');
    }
  } catch (err) {
    if (submitBtn) {
      submitBtn.innerHTML = texteOriginal;
      submitBtn.disabled  = false;
    }
    const msg = 'Erreur réseau. Contactez-nous par WhatsApp au +242 067814704.';
    if (window.Toast) Toast.show('Erreur', msg, 'error');
    console.error('[Web3Forms]', err);
    return { ok: false, error: err };
  }
}

// ─────────────────────────────────────────────────────────────
// Référence unique lisible — ex : REP-20241014-4721
// ─────────────────────────────────────────────────────────────
function genRef(prefix) {
  const d    = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  return `${prefix}-${date}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// ─────────────────────────────────────────────────────────────
// Toast (si main.js est chargé) ou alert basique
// ─────────────────────────────────────────────────────────────
function toast(titre, msg, type = 'success') {
  if (window.Toast) Toast.show(titre, msg, type);
}

// ─────────────────────────────────────────────────────────────
// Affiche le panneau succès + masque le formulaire
// ─────────────────────────────────────────────────────────────
function montrerSucces(form, idSucces, ref) {
  // Met à jour la référence si présente dans la page
  ['ticket-number','ticket-ref','order-ref','commande-ref',
   'inscription-ref','repair-ref'].forEach(id => {
    const el = document.getElementById(id);
    if (el && ref) el.textContent = ref;
  });

  const successEl = document.getElementById(idSucces);
  if (successEl) {
    successEl.style.display = 'block';
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  form.style.display = 'none';
}

// ═══════════════════════════════════════════════════════════════
//  1.  🔧  RÉPARATION  —  reparation.html
//      Form id="repair-form"
//      Champs réels : appareil, probleme, nom, telephone, email,
//                     marque, modele, description, photo,
//                     intervention (radio), disponibilite, consent
// ═══════════════════════════════════════════════════════════════
(function setupReparation() {
  const form = document.getElementById('repair-form');
  if (!form || form.dataset.w3fHooked) return;
  form.dataset.w3fHooked = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();       // ← empêche le double-handler existant

    const ref       = genRef('REP');
    const appareil  = form.querySelector('[name="appareil"]')?.value
                   || document.querySelector('.device-card.selected span')?.textContent?.trim()
                   || 'Appareil non précisé';
    const client    = form.querySelector('[name="nom"]')?.value || '';

    const result = await envoyerFormulaire(form,
      `🔧 Réparation — ${appareil} — ${client} (${ref})`,
      {
        reference_ticket: ref,
        appareil_selectionne: appareil
      }
    );

    if (result.ok) {
      montrerSucces(form, 'repair-success', ref);
      toast('Demande envoyée ! 🔧',
        `Réf. ${ref} — Nous vous contacterons très rapidement.`, 'success');
    }
  }, true);  // ← capture phase : notre handler passe en premier
})();

// ═══════════════════════════════════════════════════════════════
//  2.  📩  CONTACT  —  contact.html
//      Form id="contact-form"
//      Champs réels : nom, email, telephone, objet, message, consentement
// ═══════════════════════════════════════════════════════════════
(function setupContact() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.w3fHooked) return;
  form.dataset.w3fHooked = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const objet = form.querySelector('[name="objet"]')?.value || 'Message';

    const result = await envoyerFormulaire(form,
      `📩 Message — ${objet}`
    );

    if (result.ok) {
      montrerSucces(form, 'contact-success', null);
      toast('Message envoyé ! 📩',
        'Nous vous répondrons dans les plus brefs délais.', 'success');
    }
  }, true);
})();

// ═══════════════════════════════════════════════════════════════
//  2b.  📋  DEVIS (dans contact.html)
//       Champs réels : nom, email, telephone, type_service,
//                      sous_type, urgence, budget,
//                      date_souhaitee, description, consentement
// ═══════════════════════════════════════════════════════════════
(function setupDevisContact() {
  // devis-form dans contact.html (second formulaire)
  const forms = [
    document.getElementById('devis-form'),
    document.querySelector('.devis-form'),
    document.querySelector('[data-type="devis"] form'),
  ].filter(Boolean);

  forms.forEach(form => {
    if (form.dataset.w3fHooked) return;
    form.dataset.w3fHooked = '1';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const ref     = genRef('DEV');
      const service = form.querySelector('[name="type_service"]')?.value || 'Service';

      const result = await envoyerFormulaire(form,
        `📋 Devis — ${service} (${ref})`,
        { reference_devis: ref }
      );

      if (result.ok) {
        montrerSucces(form, 'devis-success', ref);
        toast('Devis demandé ! 📋',
          `Réf. ${ref} — Nous vous répondrons rapidement avec un devis détaillé.`, 'success');
      }
    }, true);
  });
})();

// ═══════════════════════════════════════════════════════════════
//  3.  📋  DEVIS SERVICES  —  services.html
//      Form dans #devis-modal
//      Champs réels : nom, telephone, email, service, description
// ═══════════════════════════════════════════════════════════════
(function setupDevisServices() {
  const modal = document.getElementById('devis-modal');
  if (!modal) return;
  const form  = modal.querySelector('form');
  if (!form || form.dataset.w3fHooked) return;
  form.dataset.w3fHooked = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const ref     = genRef('DEV');
    const service = form.querySelector('[name="service"]')?.value || 'Service';
    const nom     = form.querySelector('[name="nom"]')?.value || '';

    const result = await envoyerFormulaire(form,
      `📋 Devis — ${service} — ${nom} (${ref})`,
      { reference_devis: ref }
    );

    if (result.ok) {
      toast('Devis demandé ! 📋',
        `Réf. ${ref} — Nous vous répondrons rapidement.`, 'success');
      form.reset();
      // Ferme le modal après 1.5s
      setTimeout(() => {
        if (window.Modal) Modal.close('devis-modal');
      }, 1500);
    }
  }, true);
})();

// ═══════════════════════════════════════════════════════════════
//  4.  🎓  INSCRIPTION FORMATION  —  formations.html
//      Form id="inscription-form-el"
//      Champs réels : prenom, nom, email, telephone, formation,
//                     niveau_actuel, mode_prefere, motivations, consentement
// ═══════════════════════════════════════════════════════════════
(function setupInscription() {
  const form = document.getElementById('inscription-form-el');
  if (!form || form.dataset.w3fHooked) return;
  form.dataset.w3fHooked = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const ref       = genRef('INS');
    const formation = form.querySelector('[name="formation"]')?.value || 'Formation';
    const prenom    = form.querySelector('[name="prenom"]')?.value || '';

    const result = await envoyerFormulaire(form,
      `🎓 Inscription — ${formation} — ${prenom} (${ref})`,
      { reference_inscription: ref }
    );

    if (result.ok) {
      montrerSucces(form, 'inscription-success', ref);
      toast('Inscription enregistrée ! 🎓',
        `Réf. ${ref} — Nous confirmerons votre inscription sous 24h.`, 'success');
    }
  }, true);
})();

// ═══════════════════════════════════════════════════════════════
//  5.  🛒  COMMANDE BOUTIQUE  —  boutique.html
//      Form id="order-form"
//      Champs réels : order-nom, order-prenom, order-telephone,
//                     order-adresse, delivery-mode, payment-mode, order-notes
// ═══════════════════════════════════════════════════════════════
(function setupCommande() {
  const form = document.getElementById('order-form');
  if (!form || form.dataset.w3fHooked) return;
  form.dataset.w3fHooked = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const ref       = genRef('CMD');
    const telephone = form.querySelector('[name="order-telephone"]')?.value || '';
    const nom       = form.querySelector('[name="order-nom"]')?.value || '';
    const prenom    = form.querySelector('[name="order-prenom"]')?.value || '';

    // ── Articles du panier (localStorage jason-cart)
    let articlesTexte = 'Panier non capturé';
    let totalFCFA     = 0;
    try {
      const cart = JSON.parse(localStorage.getItem('jason-cart') || '[]');
      if (cart.length) {
        articlesTexte = cart.map(i => {
          const qte  = i.quantity || 1;
          const prix = i.price || i.prix || 0;
          return `${i.name || i.titre || 'Article'} x${qte} = ${(prix * qte).toLocaleString('fr')} FCFA`;
        }).join(' | ');
        totalFCFA = cart.reduce((s, i) => s + (i.price || i.prix || 0) * (i.quantity || 1), 0);
      }
    } catch (_) {}

    const result = await envoyerFormulaire(form,
      `🛒 Commande — ${prenom} ${nom} (${ref})`,
      {
        reference_commande: ref,
        articles_panier:    articlesTexte,
        total_commande:     totalFCFA ? `${totalFCFA.toLocaleString('fr')} FCFA` : 'À calculer'
      }
    );

    if (result.ok) {
      montrerSucces(form, 'order-success', ref);
      toast('Commande envoyée ! 🛒',
        `Réf. ${ref} — Nous vous contacterons au ${telephone} pour confirmer.`, 'success');
      // Vide le panier
      localStorage.removeItem('jason-cart');
      document.querySelectorAll('.cart-count, #cart-count, .drawer-items-count')
              .forEach(el => el.textContent = '0');
    }
  }, true);
})();

// ═══════════════════════════════════════════════════════════════
//  6.  🎫  TICKET SUPPORT  —  assistance.html
//      Form id="ticket-form"
//      Champs réels : nom, email, telephone, type_demande,
//                     priorite, objet, description
// ═══════════════════════════════════════════════════════════════
(function setupTicket() {
  const form = document.getElementById('ticket-form');
  if (!form || form.dataset.w3fHooked) return;
  form.dataset.w3fHooked = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const ref      = genRef('TKT');
    const objet    = form.querySelector('[name="objet"]')?.value || 'Support';
    const priorite = (form.querySelector('[name="priorite"]')?.value
                   || form.querySelector('[name="priorite"]:checked')?.value
                   || 'normale').toUpperCase();

    const result = await envoyerFormulaire(form,
      `🎫 Ticket [${priorite}] — ${objet} (${ref})`,
      { reference_ticket: ref }
    );

    if (result.ok) {
      montrerSucces(form, 'ticket-success', ref);
      toast('Ticket ouvert ! 🎫',
        `Réf. ${ref} — Nous traitons votre demande en priorité ${priorite}.`, 'success');
    }
  }, true);
})();

// ─────────────────────────────────────────────────────────────
// Animation spinner (CSS injecté)
// ─────────────────────────────────────────────────────────────
const s = document.createElement('style');
s.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(s);

console.log('[Jason_INFORMATIQUE] ✓ Web3Forms actif — emails vers jasoninformatique7@gmail.com');
