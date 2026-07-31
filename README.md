# TaskPulse ⚫⚪

A clean, black‑and‑white task manager with a day/night toggle, custom accent colors, and smooth micro‑animations throughout. Built as a portfolio‑grade productivity app in the spirit of Todoist, Notion, and ClickUp.

> **Status:** the frontend is fully functional as a client‑side prototype (auth, tasks, calendar, analytics, settings all work using `localStorage`). The Node/Express/MongoDB backend described below is scaffolded in the project structure but not yet implemented — see [Roadmap](#-roadmap).

---

## ✨ Highlights

- **True black & white base, one accent color** — light and dark themes built from the same token system, so nothing looks "re-skinned."
- **Day/Night toggle** with no flash-of-wrong-theme on load, plus 4 selectable accent colors (amber, violet, teal, rose).
- **Full task management** — title, description, due date & time, priority, category, status, progress, labels, attachments, notes, and reminders.
- **Dashboard** with live stats (total / completed / pending / overdue), a completion-rate ring, weekly report, and category breakdown.
- **Calendar** — month grid with task dots + an agenda view, plus a day panel for quick triage.
- **Analytics** powered by Chart.js — weekly progress, priority split, category mix, and a 30‑day completion trend, with **CSV** and **print‑to‑PDF** export.
- **Search & filters** — by title, category, priority, status, and label, plus sortable views.
- **Drag-and-drop** task reordering, custom categories, and custom labels.
- **Profile & Settings** — avatar upload, personal info, password change, notification toggles, language/timezone, data export, and account deletion.
- Smooth, purposeful motion: staggered page‑load reveals, hover lifts, animated progress rings, and spring‑eased toggles — `prefers-reduced-motion` respected throughout.

---

## 🖥️ Tech Stack

| Layer | Choice |
|---|---|
| Frontend | HTML5, CSS3 (custom properties, no framework lock-in), vanilla JavaScript |
| Charts | [Chart.js](https://www.chartjs.org/) |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (data/labels) |
| Data (current) | `localStorage` — simulates auth & task persistence for the prototype |
| Backend (planned) | Node.js + Express |
| Database (planned) | MongoDB (Mongoose) |
| Auth (planned) | JWT + bcrypt, Google OAuth, GitHub OAuth |
| File storage (planned) | Cloudinary (avatars & attachments) |
| Deployment (planned) | Vercel (frontend) · Render (backend) · MongoDB Atlas (database) |

---

## 📁 Project Structure

```
todo-pro/
│
├── client/
│   ├── index.html            # Landing page
│   ├── login.html            # Login (+ Google/GitHub buttons, stubbed)
│   ├── register.html         # Sign up
│   ├── dashboard.html        # Stats, today/upcoming tasks, weekly report
│   ├── tasks.html            # Full task CRUD, filters, search, drag & drop
│   ├── calendar.html         # Month + Agenda views
│   ├── analytics.html        # Chart.js dashboards + CSV/PDF export
│   ├── notifications.html    # Due today / tomorrow / overdue feed
│   ├── profile.html          # Avatar, personal info, password, delete account
│   ├── settings.html         # Appearance, accent color, notifications, data
│   │
│   ├── css/
│   │   ├── variables.css     # Design tokens (light + dark)
│   │   ├── base.css          # Reset, typography, layout shell, components
│   │   ├── app-shell.css     # Sidebar/topbar/stat-card layout (inner pages)
│   │   ├── auth.css          # Login/Register split-panel layout
│   │   ├── tasks-page.css    # Task list, modal, chips
│   │   └── calendar-page.css # Month grid, agenda groups
│   │
│   ├── js/
│   │   ├── theme.js          # Dark/light toggle + accent color engine
│   │   ├── auth.js           # Simulated register/login/session (swap for API)
│   │   ├── tasks.js          # Task CRUD + stats (swap for API)
│   │   ├── sidebar.js        # Injects nav + highlights active page
│   │   └── app.js            # Toasts, avatar initials, date helpers
│   │
│   └── images/
│
├── server/                   # Planned Express API (see Roadmap)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── config/
│
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

The current build has **zero dependencies** — it's static HTML/CSS/JS.

```bash
git clone https://github.com/<your-username>/taskpulse.git
cd taskpulse/client

# Option A: just open it
open index.html          # macOS
start index.html         # Windows

# Option B: serve it (recommended, avoids some browser file:// restrictions)
npx serve .
# or
python3 -m http.server 5500
```

Then visit the served URL, click **Create free account**, and you're in — demo tasks are seeded automatically on first login.

---

## 🎨 Design System

- **Palette:** pure black/white surfaces (`--bg`, `--surface`, `--text`) with a single accent (`--accent`) that drives every highlight, badge, and progress bar. Swap it live from **Settings → Appearance**.
- **Type:** Space Grotesk for headings, Inter for body copy, JetBrains Mono for dates, times, and data labels — gives the UI a "product" feel instead of a generic template look.
- **Motion:** staggered `reveal` classes on load, spring-eased toggles/checkboxes, animated SVG progress rings, and a floating hero on the landing page. All wrapped in a `prefers-reduced-motion` guard.
- **Signature element:** the **Pulse Ring** — an animated circular progress indicator used as the brand mark and repeated on the landing hero and dashboard.

---

## 🗺️ Roadmap

The spec this project is based on calls for a full-stack app. Not yet built:

- [ ] Express + MongoDB backend (`/server`) — replace the `localStorage` layer in `auth.js` / `tasks.js` with real `fetch()` calls
- [ ] JWT auth with bcrypt password hashing, sessions, and refresh tokens
- [ ] Real Google & GitHub OAuth (buttons are currently stubbed)
- [ ] Forgot/Reset Password + Email Verification flows
- [ ] Cloudinary-backed file uploads for avatars & task attachments
- [ ] Real-time sync (Socket.io or polling)
- [ ] Team workspaces — invites, shared tasks, comments, activity log, task assignment
- [ ] Progressive Web App support (offline cache, installable)
- [ ] Help & Support, Privacy Policy, Terms & Conditions pages

---

## 📄 License

MIT — do whatever you'd like with it, attribution appreciated.
