# Sutradhar AI - Deployment Guide

This guide covers deployment for both the **Frontend** and the **Backend** of Sutradhar AI.

---

## 🌐 1. Frontend Deployment (Vercel)

### Method A: One-Click Git Deployment via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Import the repository: `Mradul-Consultancy/Sutradhar-AI`.
4. In the configuration settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` *(Click Edit and select the `frontend` folder)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: URL of your deployed backend (e.g., `https://your-backend.up.railway.app/api`)
6. Click **Deploy**. Vercel will build and assign you a global production URL (e.g., `https://sutradhar-ai.vercel.app`).

### Method B: Vercel CLI (From your Terminal)

```bash
cd frontend
npx vercel
# Follow the interactive login prompt in your browser, then deploy to production:
npx vercel --prod
```

---

## 🖥️ 2. Backend Deployment

Because the backend uses SQLite (`backend/crm.db`) and Express, you need a Node.js host with persistent storage or a container runner.

### Option A: Railway (Easiest & Free Tier Available)

1. Visit [railway.app](https://railway.app) and sign in with GitHub.
2. Click **"New Project"** -> **"Deploy from GitHub repo"**.
3. Select `Mradul-Consultancy/Sutradhar-AI`.
4. Go to **Settings**:
   - **Root Directory**: `/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Variables**, add:
   - `PORT`: `3000`
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `[generate a secure random 32+ character key]`
   - `SEED_MOCK_DATA`: `false` (or `true` if you want initial mock CRM records)
6. Under **Volumes**, click **Add Volume**:
   - Mount path: `/app/backend` (to persist `crm.db` across redeployments).
7. Under **Networking**, click **Generate Domain** (e.g., `sutradhar-ai-backend.up.railway.app`).

---

### Option B: Render (Web Service)

1. Go to [render.com](https://render.com) and create a **New Web Service**.
2. Connect `Mradul-Consultancy/Sutradhar-AI`.
3. Configure:
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables (`PORT=3000`, `JWT_SECRET=...`, `NODE_ENV=production`).
5. (Optional) Add a Persistent Disk mounted at `/var/data` and update SQLite path in `backend/db.js` if permanent data persistence is required on free tiers.

---

### Option C: Fly.io (CLI Deployment)

Fly.io provides global container instances with persistent volume support:

```bash
cd backend
fly launch
fly volumes create crm_data --size 1
fly deploy
```

---

## ⚡ 3. Instant Live Tunnel (ngrok)

If you need to share a live demo with anyone right now without setting up cloud accounts:

```bash
# 1. Start backend (Terminal 1)
cd backend && npm run dev

# 2. Start frontend (Terminal 2)
cd frontend && npm run dev

# 3. In Terminal 3, create a public tunnel to your frontend
ngrok http 5173
```
You will get a public URL (e.g. `https://xxxx.ngrok-free.app`) accessible from any phone or browser.
