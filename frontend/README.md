# 🎉 Sutradhar AI Frontend (React + Vite)

<p align="left">
  <img src="../assets/sutradhar_ai_logo.jpg" alt="Sutradhar AI Logo" width="140" />
</p>

A **premium glass-morphic dark-theme** single-page application that powers the **Revenue Command Center**. It connects to the Node/Express backend and provides real-time KPI dashboards, AI Copilot drawer, and full CRUD interfaces for contacts, companies, deals, activities, and tickets.

---

## 🚀 Quick Start (Frontend Only)

```bash
# From the repository root
cd frontend
npm install          # install dependencies
npm run dev          # starts Vite dev server at http://localhost:5173
```

The frontend expects the backend API at `http://localhost:3000/api`. Adjust `VITE_API_BASE_URL` in `vite.config.js` if needed.

---

## 📂 Project Highlights

- **React 19** with Vite 8 for lightning‑fast HMR.
- **Recharts** visualizations (KPI cards, revenue‑forecast area chart, deal‑risk radar).
- **Lucide icons** and **TailwindCSS** for a sleek glass‑morphic UI.
- **AI Copilot Drawer** – a conversational side panel powered by the backend AI agents.
- **PWA support** – installable on desktop, tablet, or mobile.
- **Capacitor integration** – builds native Android APKs from the same codebase.

---

## 📖 Further Documentation

For the full project overview, architecture diagram, API reference, and deployment guides, see the **main README** at the repository root:

[../README.md](../README.md)

---

## 🛠️ Development Tips

- Run the root `npm run dev` script to launch **both** the frontend (Vite) and backend (Express) simultaneously.
- Use `npm run lint` to lint the codebase with ESLint.
- To build a production bundle, run `npm run build`.

---

## 🤝 Contributing

Feel free to open issues or submit pull requests. Follow the contribution guidelines in the main README.

---

*Built with ❤️ by the Sutradhar AI Team*
