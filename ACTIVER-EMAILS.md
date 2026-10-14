# ✉️ Activer les emails — 2 étapes seulement

## Étape 1 — Obtenir votre clé gratuite

1. Ouvrez ce lien dans votre navigateur :  
   👉 **https://web3forms.com**

2. Dans le champ email, entrez :  
   `jasoninformatique7@gmail.com`

3. Cliquez **"Get Access Key"**

4. Ouvrez votre Gmail → vous avez reçu un email de Web3Forms  
   → Copiez la clé (ressemble à : `2cf24dba-5fb0-...`)

---

## Étape 2 — Coller la clé dans le site

Ouvrez le fichier :  
📄 `js/email-forms.js`

Trouvez la ligne 15 :
```js
const W3F_KEY = 'VOTRE_CLE_ICI';
```

Remplacez par votre clé, exemple :
```js
const W3F_KEY = '2cf24dba-5fb0-4ddc-9a14-abc123456789';
```

Sauvegardez. **C'est tout.**

---

## Ce qui se passe ensuite

Dès qu'un client remplit et soumet un formulaire sur votre site,
vous recevez **immédiatement un email** dans `jasoninformatique7@gmail.com`
avec **toutes les informations saisies** :

| Formulaire | Email reçu |
|---|---|
| Demande de réparation | 🔧 Nouvelle réparation — [appareil] de [client] |
| Commande boutique | 🛒 Nouvelle commande — CMD-XXXXXXXX |
| Message de contact | 📩 Nouveau message — [objet] |
| Demande de devis | 📋 Demande de devis — [service] |
| Inscription formation | 🎓 Nouvelle inscription — [formation] |
| Ticket support | 🎫 Ticket [PRIORITÉ] — [objet] |

> **Gratuit** : 250 emails/mois sur Web3Forms.  
> Pour plus, créez un compte gratuit sur web3forms.com (1 000 emails/mois).
