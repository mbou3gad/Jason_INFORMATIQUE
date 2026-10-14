/* ─────────────────────────────────────────────────────────────
   js/admin-firebase.js
   Panneau Admin — Données en temps réel depuis Firestore
   Jason_INFORMATIQUE — Gad Jason MBOU
   ───────────────────────────────────────────────────────────── */
import { JasonAuth, JasonDB, formatDate, statusBadge } from './firebase-service.js';

// ── Vérifie que l'utilisateur est bien admin
JasonAuth.onStateChanged(async user => {
  if (!user) { window.location.href = 'connexion.html'; return; }
  if (user.email !== 'jasoninformatique7@gmail.com') {
    window.location.href = 'mon-espace.html'; return;
  }
  initAdminDashboard();
});

function initAdminDashboard() {

  // ── Compteurs du dashboard ──────────────────────────────────
  const counters = {
    reparations: document.getElementById('count-reparations') || document.getElementById('admin-count-rep'),
    commandes:   document.getElementById('count-commandes')   || document.getElementById('admin-count-cmd'),
    messages:    document.getElementById('count-messages')    || document.getElementById('admin-count-msg'),
    inscriptions:document.getElementById('count-inscriptions')|| document.getElementById('admin-count-ins'),
    tickets:     document.getElementById('count-tickets')     || document.getElementById('admin-count-tkt'),
    devis:       document.getElementById('count-devis')       || document.getElementById('admin-count-dev'),
  };

  // Crée un bandeau temps-réel si les counters natifs n'existent pas
  injectLivePanel();

  // ── Écoute temps réel — Réparations ────────────────────────
  JasonDB.listenAll('reparations', (docs) => {
    updateCounter('reparations', docs.length, docs.filter(d => d.status === 'nouveau').length);
    renderTable('admin-table-reparations', docs, rowReparation);
    updateLivePanel('reparations', docs);
  });

  // ── Écoute temps réel — Commandes ──────────────────────────
  JasonDB.listenAll('commandes', (docs) => {
    updateCounter('commandes', docs.length, docs.filter(d => d.status === 'nouveau').length);
    renderTable('admin-table-commandes', docs, rowCommande);
    updateLivePanel('commandes', docs);
  });

  // ── Écoute temps réel — Messages ───────────────────────────
  JasonDB.listenAll('messages', (docs) => {
    updateCounter('messages', docs.length, docs.filter(d => !d.lu).length);
    renderTable('admin-table-messages', docs, rowMessage);
    updateLivePanel('messages', docs);
  });

  // ── Écoute temps réel — Inscriptions formations ────────────
  JasonDB.listenAll('inscriptions', (docs) => {
    updateCounter('inscriptions', docs.length, docs.filter(d => d.status === 'nouveau').length);
    renderTable('admin-table-inscriptions', docs, rowInscription);
    updateLivePanel('inscriptions', docs);
  });

  // ── Écoute temps réel — Tickets ────────────────────────────
  JasonDB.listenAll('tickets', (docs) => {
    updateCounter('tickets', docs.length, docs.filter(d => d.status === 'nouveau').length);
    renderTable('admin-table-tickets', docs, rowTicket);
    updateLivePanel('tickets', docs);
  });

  // ── Écoute temps réel — Devis ──────────────────────────────
  JasonDB.listenAll('devis', (docs) => {
    updateCounter('devis', docs.length, docs.filter(d => d.status === 'nouveau').length);
    renderTable('admin-table-devis', docs, rowDevis);
    updateLivePanel('devis', docs);
  });

  // ── Écoute temps réel — Clients (utilisateurs) ─────────────
  JasonDB.listenAll('users', (docs) => {
    const clients = docs.filter(d => d.role !== 'admin');
    updateCounter('clients', clients.length, 0);
    renderTable('admin-table-clients', clients, rowClient);
    updateLivePanel('clients', clients);
  });
}

// ─────────────────────────────────────────────────────────────
// 🖥️  Panneau Live injecté dynamiquement
// ─────────────────────────────────────────────────────────────
const liveData = { reparations: [], commandes: [], messages: [], inscriptions: [], tickets: [], devis: [], clients: [] };

function injectLivePanel() {
  if (document.getElementById('jason-live-panel')) return;

  const panel = document.createElement('div');
  panel.id = 'jason-live-panel';
  panel.style.cssText = `
    position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
    background:var(--blue-night,#071A2F); color:white;
    border-radius:12px; padding:12px 24px;
    display:flex; gap:20px; align-items:center; flex-wrap:wrap;
    box-shadow:0 8px 32px rgba(0,0,0,.4);
    z-index:9999; font-size:.8rem; border:1px solid rgba(56,189,248,.3);
    max-width:90vw;
  `;
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;font-weight:700;color:#38BDF8">
      <span style="width:8px;height:8px;border-radius:50%;background:#4ADE80;display:inline-block;animation:pulse 1.5s infinite"></span>
      TEMPS RÉEL
    </div>
    <div id="live-rep"  class="live-badge">🔧 0 réparations</div>
    <div id="live-cmd"  class="live-badge">🛒 0 commandes</div>
    <div id="live-msg"  class="live-badge">📩 0 messages</div>
    <div id="live-ins"  class="live-badge">🎓 0 inscriptions</div>
    <div id="live-tkt"  class="live-badge">🎫 0 tickets</div>
    <div id="live-dev"  class="live-badge">📋 0 devis</div>
    <div id="live-cli"  class="live-badge">👥 0 clients</div>
  `;

  // Style badges
  const style = document.createElement('style');
  style.textContent = `.live-badge{padding:4px 10px;border-radius:20px;background:rgba(255,255,255,.1);cursor:pointer;transition:.2s}.live-badge:hover{background:rgba(56,189,248,.2)}`;
  document.head.appendChild(style);
  document.body.appendChild(panel);
}

function updateLivePanel(type, docs) {
  liveData[type] = docs;
  const newCount = (arr) => arr.filter(d => d.status === 'nouveau' || !d.lu).length;
  const badge = (id, emoji, label, arr) => {
    const el = document.getElementById(id);
    if (!el) return;
    const n = newCount(arr);
    el.textContent = `${emoji} ${arr.length} ${label}${n > 0 ? ` (${n} 🆕)` : ''}`;
    el.style.background = n > 0 ? 'rgba(239,68,68,.3)' : 'rgba(255,255,255,.1)';
  };
  badge('live-rep', '🔧', 'réparations', liveData.reparations);
  badge('live-cmd', '🛒', 'commandes',   liveData.commandes);
  badge('live-msg', '📩', 'messages',    liveData.messages);
  badge('live-ins', '🎓', 'inscriptions',liveData.inscriptions);
  badge('live-tkt', '🎫', 'tickets',     liveData.tickets);
  badge('live-dev', '📋', 'devis',       liveData.devis);
  badge('live-cli', '👥', 'clients',     liveData.clients);
}

// ─────────────────────────────────────────────────────────────
// 🔢  Mise à jour des compteurs
// ─────────────────────────────────────────────────────────────
function updateCounter(type, total, newCount) {
  // Cherche tous les éléments portant un data-count ou des IDs courants
  const selectors = [
    `[data-count="${type}"]`,
    `#count-${type}`,
    `#admin-count-${type.slice(0,3)}`,
    `.stat-${type}`,
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.textContent = total;
    });
  });
  // Badge "nouveau"
  document.querySelectorAll(`[data-new="${type}"]`).forEach(el => {
    el.textContent = newCount;
    el.style.display = newCount > 0 ? 'inline-flex' : 'none';
  });
}

// ─────────────────────────────────────────────────────────────
// 📋  Rendu des tableaux
// ─────────────────────────────────────────────────────────────
function renderTable(tableId, docs, rowFn) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const tbody = table.querySelector('tbody') || table;

  if (docs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--text-muted)">Aucune entrée pour le moment.</td></tr>`;
    return;
  }
  tbody.innerHTML = docs.map(d => rowFn(d)).join('');

  // Bind actions
  tbody.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const { action, id, col } = btn.dataset;
      if (action === 'view') showDetailModal(col, id, docs);
      if (action === 'status') changeStatus(col, id);
      if (action === 'read')   JasonDB.markRead(col, id);
    });
  });
}

function showDetailModal(collection, id, docs) {
  const doc = docs.find(d => d.id === id);
  if (!doc) return;
  const existing = document.getElementById('jason-detail-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'jason-detail-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px';
  modal.innerHTML = `
    <div style="background:var(--bg-card);border-radius:16px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.4)">
      <div style="padding:20px 24px;border-bottom:1px solid var(--border-color);display:flex;justify-content:space-between;align-items:center">
        <h3 style="font-size:1.1rem;font-weight:700">${collection.charAt(0).toUpperCase()+collection.slice(1)} — ${doc.ref || doc.id}</h3>
        <button onclick="document.getElementById('jason-detail-modal').remove()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text-muted)">&times;</button>
      </div>
      <div style="padding:24px">
        ${Object.entries(doc)
          .filter(([k]) => !['id','userId','userEmail','lu'].includes(k))
          .map(([k,v]) => `
            <div style="display:flex;gap:16px;padding:8px 0;border-bottom:1px solid var(--border-color)">
              <div style="width:140px;flex-shrink:0;font-size:.8rem;color:var(--text-muted);text-transform:capitalize">${k.replace(/_/g,' ')}</div>
              <div style="font-size:.875rem;font-weight:500">${typeof v === 'object' && v?.toDate ? formatDate(v) : (v || '—')}</div>
            </div>`).join('')}
        <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap">
          <button onclick="window.jasonChangeStatus('${collection}','${id}')" class="btn btn-primary btn-sm">Changer le statut</button>
          <button onclick="document.getElementById('jason-detail-modal').remove()" class="btn btn-ghost btn-sm">Fermer</button>
        </div>
      </div>
    </div>
  `;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
  if (doc.id && !doc.lu) JasonDB.markRead(collection, id);
}

window.jasonChangeStatus = async (collection, id) => {
  const statuses = ['nouveau','en-cours','en-attente','termine','annule'];
  const current = document.querySelector(`[data-id="${id}"]`)?.dataset?.status || 'nouveau';
  const next = statuses[(statuses.indexOf(current) + 1) % statuses.length];
  await JasonDB.updateStatus(collection, id, next);
  const modal = document.getElementById('jason-detail-modal');
  if (modal) modal.remove();
};

async function changeStatus(collection, id) {
  const statuses = ['nouveau','en-cours','en-attente','termine','annule'];
  const row = document.querySelector(`[data-id="${id}"]`);
  const current = row?.dataset?.status || 'nouveau';
  const next = statuses[(statuses.indexOf(current) + 1) % statuses.length];
  await JasonDB.updateStatus(collection, id, next);
}

// ─────────────────────────────────────────────────────────────
// 🏗️  Générateurs de lignes de tableau
// ─────────────────────────────────────────────────────────────
function rowReparation(d) {
  return `<tr data-id="${d.id}" data-status="${d.status}">
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td><strong>${d.nom||'—'}</strong><br><small style="color:var(--text-muted)">${d.telephone||''}</small></td>
    <td>${d.appareil||'—'}</td>
    <td>${d.probleme||'—'}</td>
    <td>${d.type_intervention||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-action="view" data-id="${d.id}" data-col="reparations">Voir</button>
      <button class="btn btn-sm btn-outline" data-action="status" data-id="${d.id}" data-col="reparations">Statut</button>
    </td>
  </tr>`;
}

function rowCommande(d) {
  return `<tr data-id="${d.id}" data-status="${d.status}">
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td><strong>${d.nom||'—'}</strong><br><small>${d.telephone||''}</small></td>
    <td style="font-size:.8rem">${d.articles||'—'}</td>
    <td><strong>${(d.total||0).toLocaleString('fr')} FCFA</strong></td>
    <td>${d.livraison||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-action="view" data-id="${d.id}" data-col="commandes">Voir</button>
      <button class="btn btn-sm btn-outline" data-action="status" data-id="${d.id}" data-col="commandes">Statut</button>
    </td>
  </tr>`;
}

function rowMessage(d) {
  return `<tr data-id="${d.id}" data-status="${d.status}" style="${!d.lu?'font-weight:600;background:rgba(10,102,194,.04)':''}">
    <td>${d.lu ? '' : '<span style="width:8px;height:8px;border-radius:50%;background:var(--blue-primary);display:inline-block"></span>'}</td>
    <td>${d.prenom||''} ${d.nom||''}<br><small style="color:var(--text-muted)">${d.email||''}</small></td>
    <td>${d.objet||'—'}</td>
    <td style="font-size:.8rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.message||'—'}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-action="view" data-id="${d.id}" data-col="messages">Lire</button>
      <a href="mailto:${d.email}" class="btn btn-sm btn-outline">Répondre</a>
    </td>
  </tr>`;
}

function rowInscription(d) {
  return `<tr data-id="${d.id}" data-status="${d.status}">
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td><strong>${d.prenom||''} ${d.nom||''}</strong><br><small>${d.email||''}</small></td>
    <td>${d.formation||'—'}</td>
    <td>${d.mode_prefere||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-action="view" data-id="${d.id}" data-col="inscriptions">Voir</button>
      <a href="mailto:${d.email}" class="btn btn-sm btn-outline">Contacter</a>
    </td>
  </tr>`;
}

function rowTicket(d) {
  return `<tr data-id="${d.id}" data-status="${d.status}">
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td><strong>${d.nom||'—'}</strong><br><small>${d.email||''}</small></td>
    <td>${d.type_demande||'—'}</td>
    <td>${d.objet||'—'}</td>
    <td><span class="badge ${d.priorite==='urgente'?'badge-danger':d.priorite==='haute'?'badge-warning':'badge-gray'}">${d.priorite||'—'}</span></td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-action="view" data-id="${d.id}" data-col="tickets">Voir</button>
      <button class="btn btn-sm btn-outline" data-action="status" data-id="${d.id}" data-col="tickets">Statut</button>
    </td>
  </tr>`;
}

function rowDevis(d) {
  return `<tr data-id="${d.id}" data-status="${d.status}">
    <td><code style="font-size:.75rem">${d.ref||'—'}</code></td>
    <td><strong>${d.prenom||''} ${d.nom||''}</strong><br><small>${d.email||''}</small></td>
    <td>${d.type_service||'—'}</td>
    <td>${d.urgence||'—'}</td>
    <td>${statusBadge(d.status)}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td>
      <button class="btn btn-sm btn-primary" data-action="view" data-id="${d.id}" data-col="devis">Voir</button>
      <a href="mailto:${d.email}" class="btn btn-sm btn-outline">Répondre</a>
    </td>
  </tr>`;
}

function rowClient(d) {
  return `<tr data-id="${d.id}">
    <td><div style="width:36px;height:36px;border-radius:50%;background:var(--blue-primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem">${(d.prenom?.[0]||'?').toUpperCase()}</div></td>
    <td><strong>${d.prenom||''} ${d.nom||''}</strong></td>
    <td>${d.email||'—'}</td>
    <td>${d.telephone||'—'}</td>
    <td>${d.type_compte||'particulier'}</td>
    <td style="font-size:.75rem;color:var(--text-muted)">${formatDate(d.createdAt)}</td>
    <td><a href="mailto:${d.email}" class="btn btn-sm btn-outline">Contacter</a></td>
  </tr>`;
}

console.log('[Jason Admin] Tableau de bord temps réel activé ✓');
