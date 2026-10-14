# Jason_INFORMATIQUE — Plateforme Web Complète

**Votre partenaire pour des solutions informatiques modernes.**

Plateforme web professionnelle pour Jason_INFORMATIQUE, entreprise de services informatiques basée à Mpila, Brazzaville, République du Congo. Fondée en 2024 par Gad Jason MBOU.

---

## 📋 Description

Cette plateforme est une application web multi-pages en **HTML/CSS/JavaScript pur** (sans framework) combinant :

- 🏢 Site institutionnel informatique
- 🔧 Module de réparation et d'assistance (inspiration iFixit)
- 🛒 Boutique de matériel informatique
- 📚 Centre de formation numérique (22+ formations)
- 📖 Bibliothèque de guides techniques
- 👤 Portail client (espace personnel)
- ⚙️ Tableau de bord administrateur complet

---

## 🗂️ Structure du projet

```
jason-informatique/
├── index.html              # Page d'accueil
├── pages/
│   ├── services.html       # Catalogue des services
│   ├── reparation.html     # Module réparation
│   ├── boutique.html       # Boutique informatique
│   ├── formations.html     # Formations IT
│   ├── guides.html         # Guides techniques
│   ├── assistance.html     # Centre d'assistance
│   ├── entreprises.html    # Jason PRO (entreprises)
│   ├── a-propos.html       # À propos
│   ├── fondateur.html      # Le fondateur
│   ├── publications.html   # Publications
│   ├── contact.html        # Contact & devis
│   ├── connexion.html      # Connexion
│   ├── inscription.html    # Inscription
│   ├── mon-espace.html     # Espace client
│   ├── admin.html          # Administration
│   ├── mentions-legales.html
│   ├── confidentialite.html
│   └── cgv.html
├── css/
│   └── main.css            # Design system complet
├── js/
│   └── main.js             # Application JavaScript
└── assets/
    └── images/             # Images et médias
```

---

## 🚀 Démarrage rapide

### Ouvrir localement

1. Ouvrez `index.html` dans votre navigateur
2. Aucune installation requise — HTML/CSS/JS pur

### Avec un serveur local (recommandé)

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code Live Server
# Clic droit sur index.html → Open with Live Server
```

Accédez ensuite à `http://localhost:8080`

---

## 🎨 Design System

### Palette de couleurs

| Couleur | Variable CSS | Code |
|---------|-------------|------|
| Bleu principal | `--blue-primary` | `#0A66C2` |
| Bleu foncé | `--blue-dark` | `#003366` |
| Bleu nuit | `--blue-night` | `#071A2F` |
| Blanc | `--white` | `#FFFFFF` |
| Gris clair | `--gray-light` | `#F4F7FB` |
| Vert confirmation | `--green` | `#16A34A` |
| Orange alerte | `--orange` | `#F59E0B` |

### Typographie
- Police principale : **Poppins** (Google Fonts)
- Police secondaire : **Inter** (Google Fonts)

### Fonctionnalités du design
- ✅ Mode clair / Mode sombre (bascule automatique selon les préférences système)
- ✅ Design responsive (mobile-first)
- ✅ Animations et micro-interactions
- ✅ Preloader animé JASON (lettres J-A-S-O-N)
- ✅ Icônes SVG inline (style Lucide)

---

## ⚙️ Fonctionnalités

### Navigation
- Header sticky avec menus déroulants
- Menu hamburger mobile
- Barre de recherche globale (Ctrl+K)
- Suggestions de recherche

### Page d'accueil
- Section Hero avec terminal animé
- Barre de recherche intelligente avec suggestions
- 6 catégories interactives
- Processus en 4 étapes
- Services populaires
- Produits phares (démo)
- Formations populaires
- Guides techniques
- Présentation du fondateur Gad Jason MBOU
- Section publications (placeholder — informations à compléter)
- Témoignages illustratifs (clairement marqués)
- Appel à l'action

### Module Réparation
- Sélecteur d'appareils (8 types)
- Sélecteur de problèmes
- Formulaire de réparation complet
- Génération de numéro de ticket (REP-YYYYMMDD-XXXX)
- Suivi de statut en 7 étapes
- FAQ réparation

### Boutique
- Catalogue 12 produits (données démo)
- Filtres par catégorie et prix
- Système de panier (localStorage)
- Calcul automatique du total en FCFA
- Passage de commande (paiement à la livraison)
- Commande via WhatsApp

### Formations
- 22 formations en 3 niveaux (Débutant / Intermédiaire / Avancé)
- Filtres par niveau
- Fiches formation détaillées
- Formulaire d'inscription avec référence

### Espace Client
- Connexion sécurisée (demo : demo@jason.cg / demo1234)
- Tableau de bord personnalisé
- Suivi des réparations, commandes, formations
- Création de tickets support
- Gestion du profil

### Administration
- Accès : admin@jason.cg / admin1234 (mode démo)
- Dashboard avec statistiques (démo)
- Gestion clients, produits, réparations, formations
- Paramètres de l'entreprise

### Jason Assistant (Chatbot)
- Chatbot flottant basé sur FAQ
- Répond aux questions sur les horaires, services, formations, etc.
- Extensible via API IA côté serveur

---

## 🔐 Accès de démonstration

> ⚠️ **Mode démonstration** : Aucune donnée n'est réellement enregistrée. Ces identifiants sont fournis à titre de démonstration uniquement.

| Compte | Email | Mot de passe | Accès |
|--------|-------|-------------|-------|
| Client | demo@jason.cg | demo1234 | Espace client |
| Admin | admin@jason.cg | admin1234 | Panneau admin |

---

## 📱 Compatibilité

| Navigateur | Support |
|-----------|---------|
| Chrome 90+ | ✅ Complet |
| Firefox 88+ | ✅ Complet |
| Safari 14+ | ✅ Complet |
| Edge 90+ | ✅ Complet |
| Mobile (iOS/Android) | ✅ Responsive |

---

## 📋 Pages et routes

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/index.html` | Page principale |
| Services | `/pages/services.html` | Catalogue complet |
| Réparation | `/pages/reparation.html` | Module réparation |
| Boutique | `/pages/boutique.html` | E-commerce |
| Formations | `/pages/formations.html` | 22 formations |
| Guides | `/pages/guides.html` | Bibliothèque technique |
| Assistance | `/pages/assistance.html` | Support & tickets |
| Entreprises | `/pages/entreprises.html` | Jason PRO |
| À propos | `/pages/a-propos.html` | Histoire & valeurs |
| Fondateur | `/pages/fondateur.html` | Gad Jason MBOU |
| Publications | `/pages/publications.html` | Livres & articles |
| Contact | `/pages/contact.html` | Formulaire & devis |
| Connexion | `/pages/connexion.html` | Authentification |
| Inscription | `/pages/inscription.html` | Création compte |
| Espace client | `/pages/mon-espace.html` | Dashboard client |
| Administration | `/pages/admin.html` | Panneau admin |
| Mentions légales | `/pages/mentions-legales.html` | Informations légales |
| Confidentialité | `/pages/confidentialite.html` | Politique RGPD |
| CGV | `/pages/cgv.html` | Conditions de vente |

---

## ⚠️ Informations importantes

### Données à compléter

Les éléments suivants nécessitent une mise à jour avant mise en production :

- **Photo du fondateur** : Remplacer le placeholder dans `pages/fondateur.html` et `index.html`
- **Publication/Livre** : Compléter le titre, la couverture, le résumé dans `pages/publications.html`
- **Numéro WhatsApp** : Remplacer `https://wa.me/00000000` par le vrai numéro dans tous les fichiers
- **Réseaux sociaux** : Mettre à jour les liens dans le footer
- **Numéro de téléphone** : À ajouter dans les informations de contact
- **Localisation précise** : Carte interactive à intégrer dans `pages/contact.html`

### Ce que cette version ne fait PAS
- Aucune transaction financière réelle
- Aucun stockage serveur des données (version frontend uniquement)
- Aucun email transactionnel réel
- Aucune vraie authentification (mode démo)

### Pour une version production complète
- Ajouter un backend (Node.js/PHP/Python)
- Connecter une base de données (PostgreSQL/MySQL)
- Implémenter une vraie authentification (JWT/sessions)
- Configurer un serveur SMTP pour les emails
- Intégrer une API de paiement mobile
- Héberger sur un serveur (Render, Railway, VPS, etc.)

---

## 🗺️ SEO

Le site inclut :
- Titres `<title>` uniques par page
- Balises `<meta description>` et `<meta keywords>`
- Structure de titres H1-H3
- HTML sémantique
- Attributs `alt` sur les images
- Mots-clés naturels : maintenance informatique Brazzaville, réparation ordinateur Congo, formation informatique...

---

## 📞 Contact

**Jason_INFORMATIQUE**  
Mpila, Brazzaville, République du Congo  
Email : jasoninformatique7@gmail.com  
Horaires : Lundi – Samedi, 08h00 – 19h00

---

## 📄 Licence

© 2026 Jason_INFORMATIQUE — Fondé par **Gad Jason MBOU**.  
Tous droits réservés. Code développé pour usage exclusif de Jason_INFORMATIQUE.

---

*Plateforme développée en HTML/CSS/JavaScript pur — Version 1.0 — Octobre 2026*
