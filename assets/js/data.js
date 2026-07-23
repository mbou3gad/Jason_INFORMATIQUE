/**
 * JASON_INFORMATIQUE - Central Data Store
 * Full formations catalog + all services + 24 equipment products
 */

const JasonData = {
  company: {
    name: "Jason_INFORMATIQUE",
    slogan: "Votre partenaire pour des solutions informatiques modernes.",
    email: "jasoninformatique7@gmail.com",
    phone: "+242 06 781 47 04",
    whatsapp: "+242067814704",
    address: "MPILA ISG, Brazzaville",
    workingHours: "Lun - Sam: 08h00 - 19h00 (Support 24/7 pour contrats)"
  },

  // ============================================================
  // 19 SERVICES CATALOG
  // ============================================================
  services: [
    { id: "dev-web", title: "Développement Web", category: "development", icon: "fa-code", shortDesc: "Sites vitrines, plateformes e-commerce et applications web sur-mesure.", features: ["Architecture Microservices / REST", "Design UI/UX d'exception", "Optimisation SEO & Performances >95", "Sécurité renforcée XSS/CSRF"], popular: true },
    { id: "dev-mobile", title: "Développement Mobile", category: "development", icon: "fa-mobile-screen-button", shortDesc: "Applications natives et hybrides iOS & Android performantes.", features: ["Applications iOS & Android", "Interface fluide & réactive", "Mode Hors-Ligne & Sync Cloud", "Notifications Push & Analytics"], popular: true },
    { id: "admin-sys", title: "Administration Systèmes", category: "infrastructure", icon: "fa-server", shortDesc: "Gestion et maintenance globale de vos infrastructures serveurs Linux & Windows.", features: ["Linux / Windows Server", "Virtualisation Docker", "Supervision 24/7 Zabbix", "Plan de Reprise d'Activité"], popular: false },
    { id: "admin-reseau", title: "Administration Réseaux", category: "infrastructure", icon: "fa-network-wired", shortDesc: "Conception, routage, VLAN et sécurisation de vos réseaux d'entreprise.", features: ["VLAN, VPN IPSec/WireGuard", "Routage BGP, OSPF & QoS", "Firewalling", "Wifi Professionnel Mesh"], popular: false },
    { id: "cybersecurite", title: "Cybersécurité", category: "security", icon: "fa-shield-halved", shortDesc: "Audits, tests d'intrusion et protection contre les cybermenaces.", features: ["Audit OWASP & PenTest", "Protection Anti-Ransomware", "Conformité RGPD & ISO 27001", "SOC & Gestion Incidents"], popular: true },
    { id: "cloud-computing", title: "Cloud Computing", category: "cloud", icon: "fa-cloud-bolt", shortDesc: "Migration, déploiement et gestion d'infrastructures Cloud AWS, Azure, GCP.", features: ["AWS, Azure, Google Cloud", "DevOps & CI/CD", "Sauvegarde multi-régions", "Optimisation FinOps"], popular: true },
    { id: "maintenance-info", title: "Maintenance Informatique", category: "support", icon: "fa-screwdriver-wrench", shortDesc: "Contrats de maintenance préventive et curative pour garantir votre continuité.", features: ["Assistance technique dédiée", "Maintenance préventive", "Gestion des mises à jour", "Prêt de matériel"], popular: false },
    { id: "reparation-pc", title: "Réparation Ordinateurs", category: "support", icon: "fa-laptop-medical", shortDesc: "Diagnostic express, réparation matérielle et mise à niveau.", features: ["Diagnostic sous 24h", "Remplacement composants", "Récupération de données", "Nettoyage & optimisation OS"], popular: false },
    { id: "install-reseaux", title: "Installation Réseaux", category: "infrastructure", icon: "fa-ethernet", shortDesc: "Câblage structuré Cat6/7, fibre optique et baies de brassage.", features: ["Câblage Cat 6A / 7", "Fibre Optique", "Certification de liaisons", "Baies organisées"], popular: false },
    { id: "install-cameras-ip", title: "Installation Caméras IP", category: "security", icon: "fa-video", shortDesc: "Vidéosurveillance IP HD avec vision nocturne et accès mobile.", features: ["Caméras IP 4K", "Analyse IA", "Stockage NVR / Cloud", "Accès distant sécurisé"], popular: true },
    { id: "deploiement-serveurs", title: "Déploiement Serveurs", category: "infrastructure", icon: "fa-hard-drive", shortDesc: "Installation et mise en service de serveurs physiques et virtuels.", features: ["Active Directory / LDAP", "Stockage RAID", "Sauvegardes immuables", "VPN site-à-site"], popular: false },
    { id: "hebergement-web", title: "Hébergement Web High-Perf", category: "cloud", icon: "fa-globe", shortDesc: "Hébergement SSD NVMe avec anti-DDoS et SSL inclus.", features: ["SSD NVMe", "SSL Wildcard", "Anti-DDoS", "Sauvegardes 30j"], popular: false },
    { id: "creation-sites-web", title: "Création de Sites Web", category: "development", icon: "fa-laptop-code", shortDesc: "Sites vitrines, portails et boutiques en ligne sur-mesure.", features: ["Design unique", "CMS administrable", "Optimisé mobile", "Paiement en ligne"], popular: true },
    { id: "creation-apps", title: "Création d'Applications", category: "development", icon: "fa-cubes", shortDesc: "Logiciels SaaS, CRM/ERP personnalisés et automatisation.", features: ["Plateformes SaaS", "CRM / ERP métiers", "Intégration API", "Tableaux de bord"], popular: false },
    { id: "formation-pro", title: "Formation Professionnelle", category: "training", icon: "fa-graduation-cap", shortDesc: "Formations certifiantes en Développement, Réseaux, Cybersécurité et Cloud.", features: ["Programmes pratiques", "Formateurs experts", "Certifications incluses", "Support pédagogique"], popular: true },
    { id: "assistance-informatique", title: "Assistance Informatique", category: "support", icon: "fa-headset", shortDesc: "Support de proximité pour résoudre tous vos problèmes IT.", features: ["Prise en charge prioritaire", "Dépannage matériel & logiciel", "Configuration postes", "Assistance utilisateurs"], popular: false },
    { id: "support-distance", title: "Support à Distance", category: "support", icon: "fa-desktop", shortDesc: "Télémaintenance sécurisée (AnyDesk / TeamViewer).", features: ["Intervention sous 15 min", "Connexion chiffrée", "Résolution rapide", "Disponibilité étendue"], popular: false },
    { id: "community-management", title: "Community Management", category: "marketing", icon: "fa-hashtag", shortDesc: "Gestion de votre présence digitale et réseaux sociaux.", features: ["Contenus visuels & vidéos", "Planning éditorial", "Campagnes publicitaires", "Rapports mensuels"], popular: false },
    { id: "conseil-informatique", title: "Conseil Informatique (CIO)", category: "consulting", icon: "fa-chart-line", shortDesc: "Audit stratégique et accompagnement à la transformation digitale.", features: ["Audit de votre SI", "Stratégie digitale", "Aide au choix d'outils", "Gouvernance IT"], popular: true }
  ],

  // ============================================================
  // FORMATIONS CATALOG — Catalogue Complet (35 formations IT)
  // ============================================================
  formations: [

    // --- CYBERSÉCURITÉ & SÉCURITÉ (5) ---
    {
      id: "f-cyber-hacking",
      title: "Cybersécurité & Ethical Hacking",
      category: "cybersecurite",
      level: "Avancé",
      duration: "40h",
      price: "1 490 €",
      icon: "fa-user-secret",
      certif: "Certificat Jason_INF + Prépa CEH",
      desc: "Maîtrisez les techniques des hackers pour mieux défendre vos systèmes : pentest, exploitation, post-exploitation, reporting professionnel.",
      modules: ["Reconnaissance & OSINT", "Exploitation Web OWASP Top 10", "Post-Exploitation & Pivoting", "Rapport d'Audit Professionnel"]
    },
    {
      id: "f-soc",
      title: "SOC Analyst & Threat Intelligence",
      category: "cybersecurite",
      level: "Intermédiaire",
      duration: "35h",
      price: "1 290 €",
      icon: "fa-shield-halved",
      certif: "Certificat Jason_INF + Prépa CompTIA Security+",
      desc: "Opérez un centre de sécurité (SOC) : détection d'incidents, analyse de logs SIEM, réponse aux alertes et threat hunting.",
      modules: ["SIEM Splunk & Wazuh", "Analyse de Malwares", "Réponse à Incident", "Threat Hunting Avancé"]
    },
    {
      id: "f-rgpd",
      title: "RGPD & Conformité ISO 27001",
      category: "cybersecurite",
      level: "Tous niveaux",
      duration: "14h",
      price: "690 €",
      icon: "fa-scale-balanced",
      certif: "Attestation de Formation",
      desc: "Maîtrisez le cadre légal du RGPD et déployez un Système de Management de la Sécurité de l'Information (SMSI) conforme ISO 27001.",
      modules: ["Bases du RGPD", "Registre de Traitement", "Analyse de Risques ISO 27005", "Audit & Certification"]
    },
    {
      id: "f-network-security",
      title: "Sécurité Réseau & Firewall",
      category: "cybersecurite",
      level: "Intermédiaire",
      duration: "21h",
      price: "890 €",
      icon: "fa-fire",
      certif: "Certificat Jason_INF",
      desc: "Configurez et administrez des pare-feux professionnels (Fortinet, pfSense, iptables), VPN IPsec/SSL et systèmes IDS/IPS.",
      modules: ["Firewalls & Règles ACL", "VPN IPsec & SSL/TLS", "IDS/IPS Snort & Suricata", "Audit de Configuration"]
    },
    {
      id: "f-forensics",
      title: "Forensique Numérique & Investigation",
      category: "cybersecurite",
      level: "Avancé",
      duration: "28h",
      price: "1 190 €",
      icon: "fa-magnifying-glass",
      certif: "Certificat Jason_INF + Prépa CHFI",
      desc: "Conduisez des investigations numériques post-incident : collecte de preuves, analyse mémoire/disque, rédaction de rapport judiciaire.",
      modules: ["Collecte de Preuves Légales", "Analyse Mémoire Volatility", "Analyse Disque Autopsy", "Rapport Judiciaire"]
    },

    // --- DÉVELOPPEMENT WEB & MOBILE (7) ---
    {
      id: "f-html-css",
      title: "HTML5, CSS3 & Responsive Design",
      category: "developpement",
      level: "Débutant",
      duration: "25h",
      price: "590 €",
      icon: "fa-code",
      certif: "Attestation de Formation",
      desc: "Créez des pages web modernes, accessibles et adaptées à tous les écrans avec les dernières normes HTML5 et CSS3.",
      modules: ["Sémantique HTML5 & SEO", "CSS3 Avancé & Animations", "Flexbox & CSS Grid", "Responsive Design Mobile-First"]
    },
    {
      id: "f-javascript",
      title: "JavaScript ES6+ & DOM Manipulation",
      category: "developpement",
      level: "Débutant à Intermédiaire",
      duration: "30h",
      price: "790 €",
      icon: "fa-js",
      certif: "Attestation de Formation",
      desc: "Maîtrisez le langage JavaScript moderne : variables, fonctions, async/await, manipulation du DOM, fetch API et modules ES6.",
      modules: ["Fondamentaux ES6+", "Programmation Asynchrone", "Fetch API & REST", "Modules & Bundlers"]
    },
    {
      id: "f-react",
      title: "React.js & Next.js — Applications Web Modernes",
      category: "developpement",
      level: "Intermédiaire",
      duration: "40h",
      price: "1 190 €",
      icon: "fa-react",
      certif: "Certificat Jason_INF",
      desc: "Développez des Single Page Applications (SPA) et applications SSR/SSG performantes avec React 18, Next.js 14 et TypeScript.",
      modules: ["Composants & Hooks React", "State Management (Redux/Zustand)", "Next.js App Router & SSR", "Déploiement Vercel / AWS"]
    },
    {
      id: "f-fullstack",
      title: "Développement Full-Stack Node.js & Express",
      category: "developpement",
      level: "Intermédiaire à Avancé",
      duration: "60h",
      price: "1 490 €",
      icon: "fa-layer-group",
      certif: "Certificat Jason_INF",
      desc: "Construisez des API REST robustes, gérez bases de données SQL/NoSQL, authentification JWT et déployez en production.",
      modules: ["Node.js & Express REST API", "MongoDB & Mongoose / PostgreSQL", "Auth JWT & OAuth2", "Docker & CI/CD Déploiement"]
    },
    {
      id: "f-php-laravel",
      title: "PHP 8 & Laravel — Backend Professionnel",
      category: "developpement",
      level: "Intermédiaire",
      duration: "35h",
      price: "990 €",
      icon: "fa-php",
      certif: "Certificat Jason_INF",
      desc: "Développez des applications web backend robustes avec PHP 8 et Laravel 11 : ORM Eloquent, Blade, API RESTful, queues.",
      modules: ["PHP 8 Orienté Objet", "Laravel Routing & MVC", "Eloquent ORM & Migrations", "API REST & Tests Automatisés"]
    },
    {
      id: "f-mobile-flutter",
      title: "Développement Mobile Flutter & Dart",
      category: "developpement",
      level: "Intermédiaire",
      duration: "45h",
      price: "1 290 €",
      icon: "fa-mobile-screen-button",
      certif: "Certificat Jason_INF",
      desc: "Créez des applications mobiles iOS et Android avec une seule base de code Flutter, publiez sur l'App Store et le Play Store.",
      modules: ["Fondamentaux Dart & Flutter", "Widgets & Navigation", "State Management (Riverpod)", "Publication App Store & Play Store"]
    },
    {
      id: "f-python-web",
      title: "Python & Django — Web Development",
      category: "developpement",
      level: "Intermédiaire",
      duration: "35h",
      price: "990 €",
      icon: "fa-python",
      certif: "Certificat Jason_INF",
      desc: "Développez des applications web complètes avec Python 3 et Django 5, des APIs REST avec DRF et déployez sur le cloud.",
      modules: ["Python 3 & POO", "Django ORM & Modèles", "Django REST Framework", "Déploiement AWS / Heroku"]
    },

    // --- CLOUD & DEVOPS (5) ---
    {
      id: "f-aws",
      title: "Cloud AWS — Solutions Architect",
      category: "cloud",
      level: "Intermédiaire",
      duration: "45h",
      price: "1 390 €",
      icon: "fa-aws",
      certif: "Préparation AWS SAA-C03",
      desc: "Concevez des architectures cloud hautement disponibles sur AWS : EC2, S3, RDS, Lambda, VPC, IAM et services managés.",
      modules: ["Compute EC2 & Lambda", "Stockage S3 & EFS", "Réseaux VPC & Route 53", "Sécurité IAM & CloudTrail"]
    },
    {
      id: "f-azure",
      title: "Microsoft Azure Administrator",
      category: "cloud",
      level: "Intermédiaire",
      duration: "40h",
      price: "1 290 €",
      icon: "fa-microsoft",
      certif: "Préparation AZ-104",
      desc: "Administrez des ressources Azure : machines virtuelles, réseaux virtuels, stockage Azure, Azure AD et politiques de sécurité.",
      modules: ["Azure VMs & Availability Sets", "Azure Active Directory & MFA", "Azure Networking & VPN Gateway", "Monitoring & Costs"]
    },
    {
      id: "f-devops",
      title: "DevOps & CI/CD — Jenkins, GitLab, GitHub Actions",
      category: "cloud",
      level: "Avancé",
      duration: "40h",
      price: "1 390 €",
      icon: "fa-code-branch",
      certif: "Certificat Jason_INF",
      desc: "Automatisez le cycle de vie logiciel : intégration continue, livraison continue, tests automatisés et déploiements zero-downtime.",
      modules: ["Git & GitFlow Professionnel", "Pipelines CI/CD Jenkins & GitLab", "Tests Automatisés Unitaires", "Déploiement Blue/Green & Canary"]
    },
    {
      id: "f-docker-k8s",
      title: "Docker & Kubernetes — Conteneurisation",
      category: "cloud",
      level: "Intermédiaire à Avancé",
      duration: "35h",
      price: "1 190 €",
      icon: "fa-docker",
      certif: "Préparation CKA",
      desc: "Maîtrisez la conteneurisation avec Docker et l'orchestration de clusters Kubernetes en production.",
      modules: ["Docker & Docker Compose", "Images & Registry", "Kubernetes Pods & Deployments", "Helm Charts & Monitoring"]
    },
    {
      id: "f-terraform",
      title: "Infrastructure as Code — Terraform & Ansible",
      category: "cloud",
      level: "Avancé",
      duration: "28h",
      price: "1 090 €",
      icon: "fa-cubes-stacked",
      certif: "Certificat Jason_INF",
      desc: "Provisionnez et gérez votre infrastructure cloud de façon déclarative avec Terraform et automatisez les configurations avec Ansible.",
      modules: ["HCL Terraform — Providers", "Modules & State Management", "Ansible Playbooks", "GitOps & Infra Versionning"]
    },

    // --- RÉSEAUX & SYSTÈMES (5) ---
    {
      id: "f-ccna",
      title: "Administration Réseaux Cisco — CCNA",
      category: "reseaux",
      level: "Débutant à Intermédiaire",
      duration: "35h",
      price: "990 €",
      icon: "fa-network-wired",
      certif: "Préparation Cisco CCNA 200-301",
      desc: "Maîtrisez les fondamentaux des réseaux IP, la configuration de switchs/routeurs Cisco, VLAN, OSPF, NAT et VPN.",
      modules: ["Modèle OSI & TCP/IP", "Configuration Switchs & Routeurs Cisco", "OSPF, EIGRP & BGP", "VPN & Sécurité Réseau"]
    },
    {
      id: "f-linux",
      title: "Administration Linux — Systèmes & Services",
      category: "reseaux",
      level: "Intermédiaire",
      duration: "40h",
      price: "1 090 €",
      icon: "fa-linux",
      certif: "Préparation LPIC-1",
      desc: "Administrez des serveurs Linux en production : gestion des utilisateurs, services systemd, scripts Bash, sécurisation SSH, web servers.",
      modules: ["Commandes Shell & Bash Scripting", "Gestion Utilisateurs & Permissions", "Services Systemd & Cron", "Sécurisation & Firewall iptables"]
    },
    {
      id: "f-windows-server",
      title: "Windows Server & Active Directory",
      category: "reseaux",
      level: "Intermédiaire",
      duration: "35h",
      price: "990 €",
      icon: "fa-windows",
      certif: "Préparation MD-102",
      desc: "Administrez Windows Server 2022, Active Directory, Group Policies (GPO), DNS/DHCP, Remote Desktop Services et sauvegardes.",
      modules: ["Installation Windows Server 2022", "Active Directory & GPO", "DNS, DHCP & WSUS", "RDS & Hyper-V Virtualisation"]
    },
    {
      id: "f-virtualisation",
      title: "Virtualisation — VMware vSphere & Proxmox",
      category: "reseaux",
      level: "Intermédiaire",
      duration: "28h",
      price: "1 090 €",
      icon: "fa-server",
      certif: "Certificat Jason_INF + Prépa VCP",
      desc: "Créez et gérez des environnements virtualisés avec VMware vSphere et l'hyperviseur open-source Proxmox VE.",
      modules: ["Architecture Hyperviseur Type 1", "VMware vCenter & ESXi", "Proxmox VE & KVM", "Haute Disponibilité & vMotion"]
    },
    {
      id: "f-voip",
      title: "VoIP & Téléphonie IP — Asterisk & 3CX",
      category: "reseaux",
      level: "Intermédiaire",
      duration: "21h",
      price: "790 €",
      icon: "fa-phone-volume",
      certif: "Certificat Jason_INF",
      desc: "Déployez un IPBX d'entreprise avec Asterisk ou 3CX : trunk SIP, extensions, files d'attente, IVR et enregistrement des appels.",
      modules: ["Protocoles SIP & RTP", "Installation & Config Asterisk", "IPBX 3CX Administration", "Intégration CRM & Enregistrement"]
    },

    // --- DATA, IA & ANALYSE (5) ---
    {
      id: "f-python-data",
      title: "Python pour la Data Science",
      category: "data-ia",
      level: "Intermédiaire",
      duration: "40h",
      price: "1 190 €",
      icon: "fa-chart-line",
      certif: "Certificat Jason_INF",
      desc: "Analysez et visualisez des données massives avec Python, Pandas, NumPy, Matplotlib et Seaborn pour prendre des décisions éclairées.",
      modules: ["Python Pandas & NumPy", "Nettoyage & Traitement données", "Visualisation Matplotlib & Plotly", "Jupyter Notebooks & Storytelling"]
    },
    {
      id: "f-machine-learning",
      title: "Machine Learning & Intelligence Artificielle",
      category: "data-ia",
      level: "Avancé",
      duration: "50h",
      price: "1 690 €",
      icon: "fa-brain",
      certif: "Certificat Jason_INF",
      desc: "Construisez et déployez des modèles de Machine Learning supervisés/non supervisés avec Scikit-Learn, TensorFlow et PyTorch.",
      modules: ["Régression & Classification", "Deep Learning & Réseaux Neurones", "NLP & Traitement du Langage", "MLOps & Déploiement Modèles"]
    },
    {
      id: "f-sql",
      title: "SQL & Bases de Données Relationnelles",
      category: "data-ia",
      level: "Débutant à Intermédiaire",
      duration: "25h",
      price: "690 €",
      icon: "fa-database",
      certif: "Attestation de Formation",
      desc: "Maîtrisez le langage SQL, la conception de bases de données relationnelles (MySQL, PostgreSQL) et l'optimisation des requêtes.",
      modules: ["SQL Fondamentaux & Jointures", "Procédures Stockées & Vues", "Indexation & Optimisation", "Administration & Sauvegardes"]
    },
    {
      id: "f-nosql",
      title: "NoSQL — MongoDB, Redis & Elasticsearch",
      category: "data-ia",
      level: "Intermédiaire",
      duration: "21h",
      price: "790 €",
      icon: "fa-cubes",
      certif: "Certificat Jason_INF",
      desc: "Utilisez les bases de données NoSQL adaptées aux architectures modernes : documents, clé-valeur, recherche full-text.",
      modules: ["MongoDB CRUD & Aggregation", "Redis Cache & Pub/Sub", "Elasticsearch & Kibana", "Choix NoSQL selon le cas d'usage"]
    },
    {
      id: "f-powerbi",
      title: "Business Intelligence & Power BI",
      category: "data-ia",
      level: "Débutant à Intermédiaire",
      duration: "21h",
      price: "790 €",
      icon: "fa-chart-pie",
      certif: "Préparation PL-300 Microsoft",
      desc: "Créez des tableaux de bord interactifs et rapports d'entreprise avec Power BI Desktop, Power Query et DAX.",
      modules: ["Connexion & Transformation Données", "Modélisation & Relations", "Formules DAX", "Tableaux de Bord & Publication"]
    },

    // --- GESTION & MANAGEMENT IT (4) ---
    {
      id: "f-gestion-projet",
      title: "Gestion de Projet IT — Agile, Scrum & PMP",
      category: "management",
      level: "Tous niveaux",
      duration: "21h",
      price: "890 €",
      icon: "fa-diagram-project",
      certif: "Attestation + Prépa PMP / PSM1",
      desc: "Pilotez vos projets informatiques avec les méthodes Agile/Scrum, planification, gestion des risques et outils (Jira, Trello, MS Project).",
      modules: ["Méthode Agile & Scrum", "Sprints, Backlogs & Rétrospectives", "Outils Jira & MS Project", "Gestion Risques & Budget"]
    },
    {
      id: "f-helpdesk",
      title: "Technicien Helpdesk & Support IT Niveau 1/2",
      category: "management",
      level: "Débutant",
      duration: "28h",
      price: "690 €",
      icon: "fa-headset",
      certif: "Attestation + Prépa CompTIA A+",
      desc: "Devenez technicien support IT opérationnel : diagnostic, résolution d'incidents, ticketing ITSM, relation utilisateur.",
      modules: ["Diagnostic Matériel & Logiciel", "Windows & macOS Support", "Ticketing GLPI & Zendesk", "Communication & Relation Client"]
    },
    {
      id: "f-itil",
      title: "ITIL 4 — Gestion des Services IT",
      category: "management",
      level: "Intermédiaire",
      duration: "21h",
      price: "890 €",
      icon: "fa-book-open",
      certif: "Préparation ITIL 4 Foundation",
      desc: "Appliquez le cadre ITIL 4 pour optimiser la gestion des services informatiques : incidents, changements, niveaux de services.",
      modules: ["Concepts ITIL 4 & SVS", "Gestion des Incidents & Problèmes", "Gestion des Changements", "Amélioration Continue CSI"]
    },
    {
      id: "f-blockchain",
      title: "Blockchain & Smart Contracts — Solidity",
      category: "management",
      level: "Avancé",
      duration: "28h",
      price: "1 290 €",
      icon: "fa-link",
      certif: "Certificat Jason_INF",
      desc: "Développez des contrats intelligents Solidity sur Ethereum, découvrez le Web3, DeFi, NFT et déployez vos DApps.",
      modules: ["Fondamentaux Blockchain", "Solidity & Remix IDE", "Hardhat & Tests de Contrats", "DApps & Web3.js / Ethers.js"]
    },

    // --- BUREAUTIQUE & PRODUCTIVITÉ (4) ---
    {
      id: "f-office365",
      title: "Microsoft 365 & Office — Productivité Avancée",
      category: "bureautique",
      level: "Débutant à Intermédiaire",
      duration: "14h",
      price: "390 €",
      icon: "fa-file-word",
      certif: "Attestation de Formation",
      desc: "Maîtrisez Word, Excel, PowerPoint, Teams, SharePoint et OneDrive pour booster la productivité de vos collaborateurs.",
      modules: ["Word Avancé & Publipostage", "Excel & Tableaux Croisés Dynamiques", "Teams & Collaboration", "SharePoint & OneDrive"]
    },
    {
      id: "f-excel-vba",
      title: "Excel Avancé & VBA — Automatisation",
      category: "bureautique",
      level: "Intermédiaire",
      duration: "21h",
      price: "590 €",
      icon: "fa-file-excel",
      certif: "Attestation de Formation",
      desc: "Exploitez Excel à son plein potentiel : formules avancées, macros VBA, tableaux de bord automatisés, gestion de données.",
      modules: ["Formules Avancées & Imbriquées", "Tableaux Croisés & Graphiques", "VBA & Macros Automatisées", "Power Query & Power Pivot"]
    },
    {
      id: "f-google-workspace",
      title: "Google Workspace — Suite Collaborative",
      category: "bureautique",
      level: "Débutant",
      duration: "10h",
      price: "290 €",
      icon: "fa-google",
      certif: "Attestation de Formation",
      desc: "Optimisez votre collaboration avec Google Docs, Sheets, Slides, Meet, Drive et Google Apps Script.",
      modules: ["Google Docs & Sheets Avancé", "Google Slides & Présentations", "Google Meet & Chat", "Apps Script & Automatisation"]
    },
    {
      id: "f-uxui",
      title: "UX/UI Design — Figma & Design System",
      category: "bureautique",
      level: "Débutant à Intermédiaire",
      duration: "30h",
      price: "890 €",
      icon: "fa-pen-ruler",
      certif: "Certificat Jason_INF",
      desc: "Concevez des interfaces utilisateur modernes, ergonomiques et accessibles avec Figma, Adobe XD et les principes du design system.",
      modules: ["Principes UX & Design Thinking", "Figma : Composants & Auto Layout", "Prototypage & Tests Utilisateurs", "Design System & Handoff Développeurs"]
    }
  ],

  // 24 Equipment Products
  products: [
    { id: "prod-1", name: "Serveur Rack Dell PowerEdge R750", category: "servers", price: 3450, currency: "€", badge: "Neuf Pro", icon: "fa-server", specs: ["2x Intel Xeon Silver 4314", "64 GB RAM DDR4 ECC", "2x 960GB SSD NVMe RAID", "Garantie 3 ans J+1"], desc: "Serveur bi-pro haute densité idéal pour virtualisation Proxmox, VMware et bases de données d'entreprise." },
    { id: "prod-2", name: "Serveur Tour HP ProLiant ML350 Gen11", category: "servers", price: 2890, currency: "€", badge: "En Stock", icon: "fa-server", specs: ["Intel Xeon Gold 5416S", "32 GB RAM DDR5", "4x 2TB SAS 12G Hot-Plug", "Alimentation Redondante 800W"], desc: "Serveur tour ultra-silencieux et évolutif conçu pour les PME et bureaux distants." },
    { id: "prod-3", name: "Serveur Lame Cisco UCS B200 M6", category: "servers", price: 4200, currency: "€", badge: "Enterprise", icon: "fa-server", specs: ["Dual Intel Xeon Platinum", "128 GB RAM DDR4", "Cisco VIC 1440 Modular", "Châssis Blade Compatible"], desc: "Serveur lame hautes performances pour infrastructures de datacenters et cloud privés." },
    { id: "prod-4", name: "NAS Synology DiskStation DS1821+ (8 Baies)", category: "servers", price: 1150, currency: "€", badge: "Best Seller", icon: "fa-hard-drive", specs: ["8 Baies SATA Hot-Swap", "AMD Ryzen V1500B Quad-Core", "4x Ports 1GbE / Slot PCIe 10G", "Dual Cache M.2 NVMe"], desc: "Solution NAS centralisé de sauvegarde automatisée immuable avec chiffrement AES-256." },
    { id: "prod-5", name: "Baie SAN QNAP Enterprise ES1686dc", category: "servers", price: 6800, currency: "€", badge: "Haute Dispo", icon: "fa-hard-drive", specs: ["Double Contrôleur Actif-Actif", "16 Baies 3.5\" SAS 12Gb/s", "128 GB RAM ECC", "4x Ports 10GbE SFP+"], desc: "Stockage SAN/NAS d'entreprise zettabyte redondant à zéro interruption de service." },
    { id: "prod-6", name: "Serveur Supermicro 1U Dual AMD EPYC 9004", category: "servers", price: 5300, currency: "€", badge: "Supercalcul", icon: "fa-server", specs: ["2x AMD EPYC 9354 (64 Coeurs)", "256 GB RAM DDR5-4800", "4x U.2 NVMe Gen5 Hot-Swap", "Double Alim 1200W Titanium"], desc: "Puissance brute pour calcul scientifique, apprentissage IA et hébergement cloud intensif." },
    { id: "prod-7", name: "Switch Cisco Catalyst 9300 48P PoE+", category: "networking", price: 1890, currency: "€", badge: "Recommandé", icon: "fa-network-wired", specs: ["48 Ports Gigabit PoE+ (740W)", "Uplinks 4x 10G SFP+", "Stacking StackWise-480", "Licence Cisco DNA Premier"], desc: "Switch Gigabit PoE+ enterprise pour ordinateurs, téléphones IP et caméras." },
    { id: "prod-8", name: "Switch Mikrotik CRS354-48P-4S+2Q+RM 10G", category: "networking", price: 920, currency: "€", badge: "Rapport Q/P", icon: "fa-network-wired", specs: ["48 Ports RJ45 PoE (802.3af/at)", "4 Ports 10G SFP+", "2 Ports 40G QSFP+", "Alimentation 800W Intégrée"], desc: "Switch managé haute vitesse pour la distribution réseau de baies de brassage." },
    { id: "prod-9", name: "Borne Wifi 6 Pro Ubiquiti UniFi U6-Pro", category: "networking", price: 195, currency: "€", badge: "Top Vente", icon: "fa-wifi", specs: ["Wifi 6 Dual-Band (4x4 MIMO)", "Débit cumulé 5.3 Gbps", "Alimentation PoE (802.3at)", "Gestion UniFi OS Console"], desc: "Point d'accès Wifi 6 haute densité gérant plus de 300 connexions simultanées." },
    { id: "prod-10", name: "Firewall Fortinet FortiGate 60F NGFW", category: "networking", price: 890, currency: "€", badge: "Sécurité Pro", icon: "fa-shield-halved", specs: ["Débit Pare-feu 10 Gbps", "VPN IPsec 6.5 Gbps", "Inspect. SSL & Antivirus UTM", "10 Ports GE RJ45"], desc: "Pare-feu de nouvelle génération contre cyberattaques, ransomwares et intrusions." },
    { id: "prod-11", name: "Routeur Core Mikrotik CCR2216-1G-12XS-2XQ", category: "networking", price: 1650, currency: "€", badge: "Opérateur", icon: "fa-network-wired", specs: ["Processeur 16 Coeurs 2.0GHz", "12 Ports 25G SFP28", "2 Ports 100G QSFP28", "16 GB RAM DDR4"], desc: "Routeur opérateur capable de traiter les tables BGP mondiales." },
    { id: "prod-12", name: "Switch Netgear ProSAFE 8-Ports PoE+ Managé", category: "networking", price: 160, currency: "€", badge: "Compact", icon: "fa-network-wired", specs: ["8 Ports Gigabit PoE+ (123W)", "Administration Web / Cloud", "VLAN & QoS Intégrés", "Boîtier Métal Fanless"], desc: "Switch réseau silencieux pour petites agences et salles de réunion." },
    { id: "prod-13", name: "Caméra IP Dôme 4K Hikvision DarkFighter IA", category: "security", price: 280, currency: "€", badge: "IA 4K", icon: "fa-video", specs: ["Ultra HD 4K (8 Mégapixels)", "Vision Nocturne Couleur 50m", "Détection Véhicules & Humains", "Boîtier Anti-Vandalisme IK10"], desc: "Caméra extérieure 4K avec détection intelligente par intelligence artificielle." },
    { id: "prod-14", name: "Caméra IP Tube Dahua WizMind 8MP IR 60m", category: "security", price: 310, currency: "€", badge: "Longue Portée", icon: "fa-video", specs: ["Capteur 4K 8MP 1/1.8\"", "Objectif Varifocal Motorisé", "Projecteur IR Smart 60m", "Etanchéité IP67 & IK10"], desc: "Caméra haute précision pour la surveillance des périmètres industriels." },
    { id: "prod-15", name: "Enregistreur NVR 32 Canaux Hikvision DeepinMind", category: "security", price: 1120, currency: "€", badge: "32 Canaux", icon: "fa-video", specs: ["32 Canaux Caméras IP 4K", "4 Baies HDD jusqu'à 40TB", "Décodage H.265+ Ultra", "Recherche par visage & plaque"], desc: "Centrale NVR intelligente d'enregistrement continu pour grands sites." },
    { id: "prod-16", name: "Caméra PTZ Motorisée Axis Q6075-E 40x Zoom", category: "security", price: 2450, currency: "€", badge: "High-End", icon: "fa-video", specs: ["Zoom Optique 40x Puissant", "Autotracking & Orientation 360°", "Résolution HDTV 1080p 60fps", "Protection Climatique IP66"], desc: "Caméra dôme PTZ pour surveillance urbaine ou sites sensibles." },
    { id: "prod-17", name: "Contrôleur d'Accès Biométrique ZKTeco InBio260", category: "security", price: 340, currency: "€", badge: "Contrôle Accès", icon: "fa-fingerprint", specs: ["Gestion de 2 Portes / 4 Lecteurs", "Biométrie Empreinte & RFID", "Mémoire 30 000 Empreintes", "Communication TCP/IP RS485"], desc: "Centrale d'accès biométrique pour salles serveurs et bureaux de direction." },
    { id: "prod-18", name: "Station de Travail Lenovo ThinkPad P16 Gen 2", category: "laptops", price: 2490, currency: "€", badge: "Workstation", icon: "fa-laptop", specs: ["Intel Core i9-13900HX", "64 GB RAM DDR5-5600", "NVIDIA RTX 3500 Ada 12GB", "Écran 16\" 4K OLED Touch"], desc: "Portable surpuissant pour développeurs, ingénieurs cloud et créateurs 3D." },
    { id: "prod-19", name: "Desktop Workstation Dell Precision 7960 Tower", category: "laptops", price: 4100, currency: "€", badge: "Puissance Brute", icon: "fa-desktop", specs: ["Intel Xeon w7-3445 (20 Coeurs)", "128 GB RAM ECC DDR5", "NVIDIA RTX A6000 48GB", "2TB SSD NVMe Gen4 RAID"], desc: "Station de travail fixe certifiée ISV pour simulation d'ingénierie et IA." },
    { id: "prod-20", name: "Apple MacBook Pro 16\" M3 Max (64GB RAM)", category: "laptops", price: 3950, currency: "€", badge: "Apple M3", icon: "fa-laptop", specs: ["Puce Apple M3 Max (16 Coeurs CPU)", "GPU 40 Coeurs Intégré", "64 GB Mémoire Unifiée", "Autonomie jusqu'à 22h"], desc: "Le portable ultime des développeurs d'applications mobile et architectes cloud." },
    { id: "prod-21", name: "Laptop Robuste Panasonic Toughbook 55 VPro", category: "laptops", price: 2150, currency: "€", badge: "Durci IP53", icon: "fa-laptop-code", specs: ["Intel Core i7 vPro 12th Gen", "32 GB RAM / 1TB SSD", "Châssis Magnésium Résistant", "Écran Lisible Plein Soleil"], desc: "Ordinateur durci pour techniciens réseau en intervention terrain." },
    { id: "prod-22", name: "Onduleur Rackable APC Smart-UPS 3000VA LCD", category: "accessories", price: 1420, currency: "€", badge: "Onduleur 3kVA", icon: "fa-plug", specs: ["Puissance 2700W / 3000VA", "Onde Sinusoïdale Pure", "Carte réseau SNMP Inclus", "Autonomie Batterie 35 min"], desc: "Protection haute performance pour serveurs contre les coupures de courant." },
    { id: "prod-23", name: "Onduleur Eaton 9PX 5000i RT3U High Efficiency", category: "accessories", price: 2850, currency: "€", badge: "Onduleur 5kVA", icon: "fa-plug", specs: ["4500W / 5000VA Online Double Conversion", "Rendement 95%", "By-pass Manuel & Automatique", "Format Rackable 3U"], desc: "Onduleur Online Double Conversion pour protéger une baie informatique entière." },
    { id: "prod-24", name: "Coffret Baie de Brassage 19\" 22U Informatique", category: "accessories", price: 640, currency: "€", badge: "Baie Brassage", icon: "fa-box", specs: ["Format 19 Pouces / Hauteur 22U", "Porte Verre Sécurisée avec Clé", "Ventilation Thermostatée", "Panneau de Brassage Cat7 Inclus"], desc: "Baie réseau renforcée avec gestion propre des câbles et régulation thermique." }
  ],

  // Portfolio items
  projects: [
    { id: "p-bank", title: "Banque Digitale NeoPay", category: "development", client: "NeoPay Financial Group", tags: ["Web App", "Cybersécurité", "Cloud AWS"], desc: "Plateforme bancaire en ligne sécurisée avec authentification biométrique." },
    { id: "p-infra", title: "Modernisation SI & Cloud Hybrid", category: "cloud", client: "Groupe Logistics Europe", tags: ["Migration Cloud", "Docker", "VPN IPsec"], desc: "Migration cloud hybride AWS/On-Premise pour 1500 collaborateurs." },
    { id: "p-camera", title: "Vidéosurveillance IA & Réseau 4K", category: "security", client: "Complexe Industriel Technopark", tags: ["Caméras IP", "Analyse IA", "Réseau Fibre"], desc: "120 caméras 4K avec détection intelligente et NVR redondante." }
  ],

  testimonials: [
    { name: "Alexandre Mercier", role: "Directeur Général, InnoTech Global", text: "Professionnalisme exemplaire sur notre infrastructure cloud et réseaux.", rating: 5 },
    { name: "Sophie Laurent", role: "CTO, Retail Next Gen", text: "Réactivité et qualité de développement web SaaS impressionnantes.", rating: 5 },
    { name: "Marc Antoine Bertrand", role: "Responsable IT, Santé Plus", text: "Formation cybersécurité et matériel fournis avec excellence.", rating: 5 }
  ],

  faqs: [
    { q: "Quels sont les délais d'intervention pour une urgence informatique ?", a: "Moins de 15 minutes en support à distance et sous 2h sur site pour nos clients sous contrat de maintenance." },
    { q: "Proposez-vous la livraison et l'installation du matériel ?", a: "Oui ! Tous les équipements peuvent être livrés et configurés sur site par nos ingénieurs (baie, serveurs, caméras IP)." },
    { q: "Comment fonctionne l'assistant IA Jason AI ?", a: "Jason AI répond instantanément à vos questions sur nos services, le matériel disponible et prépare vos devis 24/7." }
  ]
};

// Conversion automatique Euro vers FCFA
JasonData.formations.forEach(f => {
    let euro = parseInt(f.price.replace(/\D/g,''));
    f.priceFCFA = (euro * 656).toLocaleString('fr-FR') + " FCFA";
});

JasonData.products.forEach(p => {
    p.priceFCFA = (p.price * 656).toLocaleString('fr-FR') + " FCFA";
});

Object.freeze(JasonData);
