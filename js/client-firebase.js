/* ─────────────────────────────────────────────────────────────
   js/client-firebase.js
   Espace Client — Données personnelles depuis Firestore
   Jason_INFORMATIQUE
   ───────────────────────────────────────────────────────────── */
import { JasonAuth, JasonDB, formatDate, statusBadge } from './firebase-service.js';

JasonAuth.onStateChanged(async user => {
  if (!user) { window.location.href = 'connexion.html'; return; }

  // Redirige admin vers le panneau admin
  if (user.email === 'jasoninformatique7@gmail.com') {
    window.location.href = 'admin.html'; return;
  }

  const uid = user.uid;
  initClientDashboard(uid);
});

function initClientDashboard(uid) {
  // ── Profil utilisateur
  JasonDB.listenProfile(uid, (profile) => {
    const nameEls = document.querySelectorAll('.client-name, #client-name, .user-name');
    nameEls.forEach(el => el.textContent = `${profile.prenom || ''} ${profile.nom || ''}`.trim() || profile.email);
    const emailEls = document.querySelectorAll('.client-email, #client-email');
    emailEls.forEach(el => el.textContent = profile.email || '');
    const telEls = document.querySelectorAll('.client-telephone, #client-telephone');
    telEls.forEach(el => el.textContent = profile.telephone || '—');
  });

  // ── Réparations
  JasonDB.listenOwn('reparations', uid, (docs) => {
    updateClientCount('client-count-reparations', docs.length);
    renderClientTable('client-table-reparations', docs, clientRowReparation);
    renderClientTable('mes-reparations-list', docs, clientRowReparation);
  });

  // ── Commandes
  JasonDB.listenOwn('commandes', uid, (docs) => {
    updateClientCount('client-count-commandes', docs.length);
    renderClientTable('client-table-commandes', docs, clientRowCommande);
    renderClientTable('mes-commandes-list', docs, clientRowCommande);
  });

  // ── Inscriptions formations
  JasonDB.listenOwn('inscriptions', uid, (docs) => {
    updateClientCount('client-count-formations', docs.length);
    renderClientTable('client-table-formations', docs, clientRowFormation);
    renderClientTable('mes-formations-list', docs, clientRowFormation);
  });

  // ── Tickets
  JasonDB.listenOwn('tickets', uid, (docs) => {
    updateClientCount('client-count-tickets', docs.length);
    renderClientTable('client-table-tickets', docs, clientRowTicket);
    renderClientTable('mes-tickets-list', docs, clientRowTicket);
  });

  // ── Devis
  JasonDB.listenOwn('devis', uid, (docs) => {
    renderClientTable('client-table-devis', docs, clientRowDevis);
  });

  // Bouton déconnexion
  document.querySelectorAll('[data-action="logout"], #btn-logout, .logout-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); JasonAuth.signOut(); });
  });
}

function updateClientCount(id, count) {
  const el = document.getElementById(id);
  if (el) el.textContent = count;
}

function renderClientTable(id, docs, rowFn) {
  const container = document.getElementById(id);
  if (!container) return;

  if (docs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px;color:var(--text-muted)">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 12px;display:block;opacity:.4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Aucune entrée pour le moment.
      </div>`;
    return;
  }

  // Si c'est un tableau
  if (container.tagName === 'TBODY' || container.tagName === 'TABLE') {
    const tbody = container.tagName === 'TABLE' ? (container.querySelector('tbody') || container) : container;
    tbody.innerHTML = docs.map(rowFn).join('');
  } else {
    container.innerHTML = docs.map(d => rowFn(d, true)).join('');
  }
}

// Lignes pour les tableaux client
function clientRowReparation(d, asCard = false) {
  if (asCard) return `
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-weight:700">${d.appareil || '—'}</div>
          <div style="font-size:.8rem;color:var(--text-muted)">${d.probleme || '—'} · ${d.type_intervention || ''}</div>
          <code style="font-size:.75rem;color:var(--blue-primary)">${d.ref || '—'}</code>
        </div>
        <div style="text-align:right">
          ${statusBadge(d.status)}
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">${formatDate(d.createdAt)}</div>
        </div>
      </div>
    </div>`;
  return `<tr>
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td>${d.appareil||'—'}</td>
    <td>${d.probleme||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
  </tr>`;
}

function clientRowCommande(d, asCard = false) {
  if (asCard) return `
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
        <div>
          <code style="font-size:.75rem;color:var(--blue-primary)">${d.ref||'—'}</code>
          <div style="font-size:.85rem;margin-top:4px">${d.articles||'—'}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">${(d.total||0).toLocaleString('fr')} FCFA</div>
          ${statusBadge(d.status)}
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">${formatDate(d.createdAt)}</div>
        </div>
      </div>
    </div>`;
  return `<tr>
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td style="font-size:.8rem">${d.articles||'—'}</td>
    <td><strong>${(d.total||0).toLocaleString('fr')} FCFA</strong></td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
  </tr>`;
}

function clientRowFormation(d, asCard = false) {
  if (asCard) return `
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-weight:700">${d.formation||'—'}</div>
          <div style="font-size:.8rem;color:var(--text-muted)">${d.mode_prefere||''}</div>
          <code style="font-size:.75rem;color:var(--blue-primary)">${d.ref||'—'}</code>
        </div>
        ${statusBadge(d.status)}
      </div>
    </div>`;
  return `<tr>
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td>${d.formation||'—'}</td>
    <td>${d.mode_prefere||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
  </tr>`;
}

function clientRowTicket(d, asCard = false) {
  if (asCard) return `
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-weight:700">${d.objet||'—'}</div>
          <div style="font-size:.8rem;color:var(--text-muted)">${d.type_demande||''} · Priorité: ${d.priorite||'—'}</div>
          <code style="font-size:.75rem;color:var(--blue-primary)">${d.ref||'—'}</code>
        </div>
        ${statusBadge(d.status)}
      </div>
    </div>`;
  return `<tr>
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td>${d.objet||'—'}</td>
    <td>${d.type_demande||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
  </tr>`;
}

function clientRowDevis(d, asCard = false) {
  return `<tr>
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td>${d.type_service||'—'}</td>
    <td>${d.urgence||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
  </tr>`;
}

console.log('[Jason Client] Espace client connecté à Firestore ✓');
