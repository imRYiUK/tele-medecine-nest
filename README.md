# 🩺 Backend SunuSanté – NestJS

Bienvenue dans le backend du projet **SunuSanté** ! 🚀

---

## ✨ Présentation

Ce dépôt contient l'API backend du projet de télémédecine, développée avec [NestJS](https://nestjs.com/) et TypeScript. Elle gère l'authentification, la gestion des utilisateurs, la communication temps réel, la gestion des dossiers médicaux et l'intégration DICOM.

---

## ⚙️ Fonctionnalités principales

- 🔐 Authentification JWT
- 👨‍⚕️ Gestion des utilisateurs (patients, médecins, admin)
- 💬 Communication temps réel (WebSocket)
- 🖼️ Intégration DICOM (images médicales)
- 🔗 API REST sécurisée

---

## 🛠️ Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [PostgreSQL](https://www.postgresql.org/) (ou accès à une base cloud)
- [Docker](https://www.docker.com/) (optionnel, pour le déploiement)

---

## 🚀 Installation

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/imRYiUK/tele-medecine-nest
   cd tele-medecine-nest
   ```
2. **Installez les dépendances :**
   ```bash
   npm install
   ```
3. **Configurez les variables d'environnement dans `.env` :**
   ```env
   JWT_SECRET=... # Clé secrète JWT
   JWT_EXPIRATION=7d
   PORT=3001
   NODE_ENV=development
   DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
   ```
4. **Lancez les migrations Prisma (si nécessaire) :**
   ```bash
   npx prisma migrate deploy
   ```

---

## 🏃‍♂️ Lancement du serveur

- **Développement** :
  ```bash
  npm run start:dev
  ```
- **Production** :
  ```bash
  npm run start:prod
  ```
- **Tests** :
  ```bash
  npm run test
  npm run test:e2e
  npm run test:cov
  ```

---

## 🗂️ Structure du projet

```
tele-medecine-nest/
├── src/           # Code source principal (contrôleurs, services, modules)
├── prisma/        # Schéma et migrations de la base de données
├── test/          # Tests unitaires et end-to-end
├── docker-compose.yml  # Déploiement Docker
└── ...
```

---

## 🚢 Déploiement

- **Render** : connectez le repo et déployez automatiquement

---

## 👥 Membres de l'équipe

- 🧑‍💻 Mouhamed DIAGNE
- 🧑‍💻 Cheikh Ahmed Tidiane THIANDOUM
- 🧑‍💻 Assane MBENGUE
- 🧑‍💻 Anna Sow

---

## 📄 Licence

Ce projet est sous licence **MIT**.
