# 🛠️ Sutradhar AI Backend (Node + Express)

<p align="left">
  <img src="../assets/sutradhar_ai_logo.jpg" alt="Sutradhar AI Logo" width="140" />
</p>

The **backend** powers the Sutradhar AI platform. It provides a secure JWT-protected REST API, AI service endpoints, and the data persistence layer (SQLite). All frontend components interact with these routes.

---

## 🚀 Quick Start (Backend Only)

```bash
# From the repository root
cd backend
npm install          # install dependencies
npm run dev          # starts the server on http://localhost:3000
```

The server expects an `.env` file in this directory. A minimal example:

```env
# backend/.env
PORT=3000
JWT_SECRET=your_super_secret_key_here
SEED_MOCK_DATA=true   # set to false in production
```

> **Tip:** Run `npm run lint` to lint the codebase. Use `npm start` for production mode (`NODE_ENV=production`).

---

## 📡 API Overview

All endpoints are prefixed with `/api` and require a valid JWT (except `/api/login`). See the **main repository README** for the complete API reference:

- [Root README – API Reference](../README.md#-api-reference)

Key groups:

- **Authentication** – `/api/login`, `/api/login-test`
- **CRM Resources** – contacts, companies, deals, activities, tickets
- **AI Services** – lead scoring, revenue forecasting, deal radar, AI copilot, audit logs
- **Utility** – dashboard aggregation, global search, notifications

---

## 🗄️ Database

- **SQLite 3** (`backend/crm.db`) – single‑file sovereign storage with foreign‑key enforcement.
- Migrations are handled automatically on server start; the file is created if missing.

---

## 🔧 Development

- **Hot reload** – `npm run dev` uses `nodemon` for automatic restarts on code changes.
- **Testing** – place Jest or Mocha tests under `backend/__tests__/` and run `npm test`.
- **Environment variables** – see `.env.example` for all configurable options.

---

## 🤝 Contributing

Backend contributions follow the same guidelines as the main project. See the root `README.md` for detailed steps.

---

## 📄 License

MIT – see the root LICENSE file.

---

*Built with ❤️ by the Sutradhar AI Team*
