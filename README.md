# Facturer - Application Web de Gestion de Factures

## Présentation

Ce projet est un monorepo open-source pour une application de gestion de factures dynamiques. Il est conçu pour illustrer les bonnes pratiques et servir de base à des contributions étudiantes.

- **Frontend** : ReactJS (Vite), Tailwind CSS, Shadcn/ui, react-router-dom, react-toastify
- **Backend** : Node.js, Express, Sequelize (MySQL), JWT, Joi
- **Base de données** : MySQL

## Prérequis
- Node.js >= 18
- npm ou yarn
- MySQL
- (Optionnel) Docker & Docker Compose

## Installation

### 1. Laissez un Star (etoile) sur le projet
```bash
git clone <repo-url>
cd facturer
```
### 2. Forker le dépôt
```bash
git clone <repo-url>
cd facturer
```
### 3. Cloner le dépôt
```bash
git clone <repo-url>
cd facturer
```
### 2. Backend
```bash
cd server
cp .env.example .env
npm install
# Configurer la base de données MySQL dans .env
# Lancer les migrations et seeders si besoin (VOIR DANS LA ZONE script DE PACKAGE.JSON)
npm start
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Docker (optionnel)
```bash
docker-compose up --build
```

## Structure du projet
- `client/` : Frontend React
- `server/` : Backend Express

## API principales
- `POST /api/auth/register` : Inscription
- `POST /api/auth/login` : Connexion (JWT)
- `GET/POST/PUT/DELETE /api/companies` : CRUD Entreprises (auth requis)
- A completer...

## Autheur
Duplex Kamdjou de Bproo Dev [https://www.youtube.com/@BprooDev](https://www.youtube.com/@BprooDev)

## Contribution
- Forkez le repo, créez une branche, proposez une PR !
- La documentation serait une tres bonne contribution, cas le projet est actuelement documente seulement su un fichier dpf
- Voir le dossier `.github/` pour les instructions Copilot.

## Licence
MIT
