# MERN Summer Internship (July '26 – Aug '26)

> Day-by-day progress log for a **MERN Stack Summer Internship** — daily lecture exercises, standalone assignments, and the full-stack capstone project **NoteFi** (a note-sharing platform).

---

## 📁 Repository Structure

```
MERN_SUMMER_Internship-July26-Aug26-/
├── .postman/                # Postman workspace metadata
├── postman/                 # Postman workspace — collections & environments (API testing)
├── Assignment/              # Daily assignments, organised by date (July 1 → July 29)
├── Lec1/  →  Lec16/         # Daily lecture folders (HTML/CSS → JS → Node/Express → React)
├── Note_Sharing_Platform/   # 🚀 Capstone — NoteFi (full-stack MERN app)
└── README.md
```

Each folder is self-contained — `cd` into it and follow that folder's own README (where present).

---

## 🗓️ Lecture-by-Lecture Breakdown

The internship follows a day-by-day schedule: frontend fundamentals first (HTML/CSS/JavaScript), then the backend (Node.js → Express → MongoDB), and finally React, which feeds into the capstone project.

| Folder | Topic |
|---|---|
| **Lec1** | HTML fundamentals — forms, tables & lists |
| **Lec2** | CSS — selectors (class/id), inline/internal/external styles, box model, Flexbox, Grid & positioning |
| **Lec3** | Assignment day — notes for the Medium & Coding Blocks clones |
| **Lec4** | JavaScript — variables, `let` vs `var` scope, hoisting, arrays & objects; CSS animations |
| **Lec5** | JavaScript — functions, arrow functions, closures, currying & higher-order functions |
| **Lec6** | JavaScript — array methods (`map`, `filter`, `reduce`) & arrays of objects |
| **Lec7** | JavaScript — DOM manipulation, Promises & chaining, `setInterval`/`setTimeout` |
| **Lec8** | Node.js — core modules (`fs` sync/async) & custom modules (`module.exports`) |
| **Lec9** | Node.js — HTTP module: first server with routing & serving HTML |
| **Lec10** | Express — first app, routes & serving files |
| **Lec11** | Express — routing with query strings & URL params |
| **Lec12** | Express — serving JSON mock data & filtering by id |
| **Lec13** | Express — modular routes scaffold (`app.js` + `routes/`) |
| **Lec14** | MongoDB + Mongoose — schema/model, controllers, routes & DB connection (full CRUD) |
| **Lec15** | Express auth — register/login with bcrypt password hashing |
| **Lec16 / adtu** | React + Vite — first app, `useState` & props (Card component) |

> Note: Lecture numbering follows the internship's daily schedule and may skip a day (e.g., review/no-code days).

---

## 📝 Assignment

The `Assignment/` folder holds standalone daily exercises, organised by date:

| Date | Content |
|---|---|
| **July 1** | Java pattern programs |
| **July 3** | HTML/CSS clones — Medium & Coding Blocks |
| **July 6 – 7** | JavaScript exercises (closures, buttons) |
| **July 13** | CSS Grid & calculator |
| **July 15 – 16** | JavaScript exercises |
| **July 20 – 29** | Work in progress |

HTML/CSS/JS exercises run directly in the browser; Java files run via your Java toolchain.

---

## 🚀 Capstone Project: NoteFi

The main project of the internship lives in **`Note_Sharing_Platform/`** — a full-stack MERN application for sharing and discovering study notes.

**Highlights:**
- 🔐 Authentication with email verification (JWT, httpOnly cookies)
- 📄 Note upload & sharing (PDF/DOC/PPT)
- 🔍 Browse, search & vote on notes
- 💬 Reddit-style nested comment threads
- 🤖 AI-powered summarization (Gemini) & recommendations (Groq)
- 💬 AI chatbot for Q&A on notes
- ⭐ Premium page & user profiles

**Tech stack:** React 19 + Vite · Tailwind CSS v4 · Node.js/Express 5 · MongoDB/Mongoose 8 · Cloudinary · Resend · Google Gemini · Groq

👉 Full setup, environment variables, API routes, and deployment instructions are documented in the project's own README:
**[`Note_Sharing_Platform/README.md`](./Note_Sharing_Platform/README.md)**

---

## 🧰 API Testing

The `.postman/` and `postman/` folders set up a Postman workspace for testing the backend routes used across the lecture exercises and the NoteFi API. Open the workspace in Postman's Local View and drop collections in `postman/collections/` to try out the endpoints.

---

## 🛠️ General Prerequisites

- Node.js 18+
- MongoDB (Atlas or local) — required for Lec14+ and NoteFi
- npm

Each folder (`Lec*`, `Assignment`, `Note_Sharing_Platform`) is self-contained — `cd` into it, run `npm install`, then start with the script noted in that folder's README (`npm run dev` / `npm start`).

---

## 📌 License

This repository is for academic/educational purposes as part of a MERN Stack Summer Internship (July–Aug 2026).
