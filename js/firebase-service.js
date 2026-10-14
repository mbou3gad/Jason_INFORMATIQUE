// ═══════════════════════════════════════════════════════════════
// js/firebase-service.js — Services Firebase (Auth + Firestore + Email)
// Jason_INFORMATIQUE — Gad Jason MBOU
// ═══════════════════════════════════════════════════════════════
import { db, auth, ADMIN_EMAIL } from './firebase-config.js';
import {
  collection, addDoc, doc, updateDoc, setDoc, getDoc,
  onSnapshot, query, orderBy, where, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// ─────────────────────────────────────────────────────────────
// 📧  WEB3FORMS — Notifications email directes dans votre Gmail
//
//  ✅ Étape 1 : Allez sur https://web3forms.com
//  ✅ Étape 2 : Entrez jasoninformatique7@gmail.com → Cliquez "Get Access Key"
//  ✅ Étape 3 : Copiez la clé reçue par email et collez-la ci-dessous
// ─────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = 'VOTRE_CLE_WEB3FORMS_ICI';  // ← SEUL CHANGEMENT À FAIRE
const EMAIL_ACTIVE  = WEB3FORMS_KEY !== 'VOTRE_CLE_WEB3FORMS_ICI';

// ─────────────────────────────────────────────────────────────
// 🔐  AUTH
// ─────────────────────────────────────────────────────────────
export const JasonAuth = {

  /** Connexion email + mot de passe */
  async signIn(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const role = user.email === ADMIN_EMAIL ? 'admin' : 'client';

    // Récupère le profil Firestore
    let profile = { name: user.displayName || email, email: user.email, role };
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) Object.assign(profile, snap.data());
    } catch (_) {}

    // Stocke la session localement pour compatibilité avec l'UI existante
    localStorage.setItem('jason-auth', 'true');
    localStorage.setItem('jason-auth-role', role);
    localStorage.setItem('jason-auth-user', JSON.stringify({
      uid: user.uid,
      name: profile.prenom ? `${profile.prenom} ${profile.nom}` : profile.name,
      email: user.email,
      role: role === 'admin' ? 'Fondateur & Super Administrateur' : 'Client',
      initials: (profile.prenom?.[0] || email[0]).toUpperCase() +
                (profile.nom?.[0] || email[1] || '').toUpperCase()
    }));

    return { user, role };
  },

  /** Inscription nouveau client */
  async register({ prenom, nom, email, password, telephone, type_compte }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    await updateProfile(user, { displayName: `${prenom} ${nom}` });

    // Crée le document utilisateur dans Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      prenom,
      nom,
      email,
      telephone: telephone || '',
      type_compte: type_compte || 'particulier',
      role: 'client',
      createdAt: serverTimestamp()
    });

    localStorage.setItem('jason-auth', 'true');
    localStorage.setItem('jason-auth-role', 'client');
    localStorage.setItem('jason-auth-user', JSON.stringify({
      uid: user.uid,
      name: `${prenom} ${nom}`,
      email,
      role: 'Client',
      initials: prenom[0].toUpperCase() + nom[0].toUpperCase()
    }));

    return user;
  },

  /** Déconnexion */
  async signOut() {
    await signOut(auth);
    localStorage.removeItem('jason-auth');
    localStorage.removeItem('jason-auth-role');
    localStorage.removeItem('jason-auth-user');
    window.location.href = 'connexion.html';
  },

  /** Écoute les changements d'état auth */
  onStateChanged: (cb) => onAuthStateChanged(auth, cb),

  /** Vérifie si l'utilisateur actuel est admin */
  isAdmin: () => auth.currentUser?.email === ADMIN_EMAIL,

  /** Retourne l'utilisateur courant */
  currentUser: () => auth.currentUser
};

// ─────────────────────────────────────────────────────────────
// 🗄️  FIRESTORE — Opérations sur les collections
// ─────────────────────────────────────────────────────────────
export const JasonDB = {

  /** Ajoute un document dans une collection */
  async add(collectionName, data) {
    const enriched = {
      ...data,
      userId: auth.currentUser?.uid || 'anonymous',
      userEmail: auth.currentUser?.email || data.email || '',
      status: data.status || 'nouveau',
      lu: false,
      createdAt: serverTimestamp()
    };
    const ref = await addDoc(collection(db, collectionName), enriched);
    return { id: ref.id, ...enriched };
  },

  /** Met à jour le statut d'un document */
  async updateStatus(collectionName, docId, status, note = '') {
    await updateDoc(doc(db, collectionName, docId), {
      status,
      noteAdmin: note,
      updatedAt: serverTimestamp()
    });
  },

  /** Marque un document comme lu */
  async markRead(collectionName, docId) {
    await updateDoc(doc(db, collectionName, docId), { lu: true });
  },

  /**
   * Écoute toute une collection en temps réel (admin)
   * Retourne la fonction d'arrêt de l'écoute (unsubscribe)
   */
  listenAll(collectionName, callback) {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error(`[JasonDB] ${collectionName}:`, err));
  },

  /**
   * Écoute uniquement les documents de l'utilisateur connecté
   */
  listenOwn(collectionName, uid, callback) {
    const q = query(
      collection(db, collectionName),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, snap => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error(`[JasonDB] own ${collectionName}:`, err));
  },

  /** Écoute le profil d'un utilisateur */
  listenProfile(uid, callback) {
    return onSnapshot(doc(db, 'users', uid), snap => {
      if (snap.exists()) callback({ id: snap.id, ...snap.data() });
    });
  }
};

// ─────────────────────────────────────────────────────────────
// 📧  EMAIL — Notifications via EmailJS
// ─────────────────────────────────────────────────────────────
export const JasonEmail = {

  _init() {
    if (!EMAIL_CONFIGURED) return false;
    if (!window.emailjs) { console.warn('[EmailJS] SDK non chargé'); return false; }
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
    return true;
  },

  async send(subject, details, clientEmail = '') {
    if (!this._init()) return;
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: ADMIN_EMAIL,
        reply_to: clientEmail || ADMIN_EMAIL,
        subject,
        details,
        site_name: 'Jason_INFORMATIQUE',
        site_url: window.location.origin
      });
      console.log('[EmailJS] Email envoyé ✓');
    } catch (e) {
      console.error('[EmailJS] Erreur:', e);
    }
  },

  notifyReparation: (d) => JasonEmail.send(
    `🔧 Nouvelle réparation — ${d.appareil} de ${d.nom}`,
    `Ticket : ${d.ref}\nClient : ${d.nom} — ${d.telephone}\nAppareil : ${d.appareil}\nProblème : ${d.probleme}\nIntervention : ${d.type_intervention}\nDescription : ${d.description}`,
    d.email
  ),

  notifyCommande: (d) => JasonEmail.send(
    `🛒 Nouvelle commande — ${d.ref}`,
    `Commande : ${d.ref}\nClient : ${d.nom} — ${d.telephone}\nArticles : ${d.articles}\nTotal : ${d.total} FCFA\nLivraison : ${d.livraison}`,
    d.email
  ),

  notifyMessage: (d) => JasonEmail.send(
    `📩 Nouveau message — ${d.objet}`,
    `De : ${d.prenom} ${d.nom} — ${d.email}\nObjet : ${d.objet}\nMessage : ${d.message}`,
    d.email
  ),

  notifyDevis: (d) => JasonEmail.send(
    `📋 Demande de devis — ${d.type_service}`,
    `Référence : ${d.ref}\nClient : ${d.prenom} ${d.nom} — ${d.telephone}\nService : ${d.type_service}\nUrgence : ${d.urgence}\nDescription : ${d.description}`,
    d.email
  ),

  notifyInscription: (d) => JasonEmail.send(
    `🎓 Nouvelle inscription — ${d.formation}`,
    `Référence : ${d.ref}\nApprenant : ${d.prenom} ${d.nom} — ${d.telephone}\nFormation : ${d.formation}\nModalité : ${d.mode_prefere}`,
    d.email
  ),

  notifyTicket: (d) => JasonEmail.send(
    `🎫 Nouveau ticket [${d.priorite}] — ${d.objet}`,
    `Ticket : ${d.ref}\nClient : ${d.nom} — ${d.email}\nType : ${d.type_demande}\nPriorité : ${d.priorite}\nDescription : ${d.description}`,
    d.email
  )
};

// ─────────────────────────────────────────────────────────────
// 🔢  Génère une référence unique lisible
// ─────────────────────────────────────────────────────────────
export function genRef(prefix) {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${date}-${rand}`;
}

// ─────────────────────────────────────────────────────────────
// ⏱️  Formate un Timestamp Firestore en chaîne lisible
// ─────────────────────────────────────────────────────────────
export function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

// ─────────────────────────────────────────────────────────────
// 🏷️  Badge HTML selon statut
// ─────────────────────────────────────────────────────────────
export function statusBadge(status) {
  const map = {
    nouveau:      ['badge-warning',  '🆕 Nouveau'],
    'en-cours':   ['badge-primary',  '⚙️ En cours'],
    'en-attente': ['badge-orange',   '⏳ En attente'],
    termine:      ['badge-success',  '✅ Terminé'],
    livre:        ['badge-success',  '📦 Livré'],
    annule:       ['badge-danger',   '❌ Annulé'],
    lu:           ['badge-gray',     '👁 Lu'],
    traite:       ['badge-success',  '✅ Traité'],
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}
