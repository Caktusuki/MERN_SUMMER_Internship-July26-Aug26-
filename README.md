# NoteFi — Note Sharing Platform

A full-stack MERN application for sharing and discovering study notes. Users can upload notes, browse, search, vote, and comment on notes (Reddit-style nested threads), use AI-powered summarization and recommendations, and chat with an AI study assistant.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Axios

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose 8
- JWT authentication (httpOnly cookies)
- Cloudinary (file storage)
- Resend (email verification & password reset)
- Google Gemini AI (summarization)
- Groq (AI chatbot & recommendations)

---

## Features

- 🔐 **Authentication** — signup with email verification, login, forgot/reset password, logout
- 👁️ **Password visibility toggle** on login & registration forms
- 📄 **Note upload & sharing** — PDF, DOC, PPT with subject/course/tags
- 🔍 **Browse & search** notes
- ⬆️⬇️ **Voting** — upvote/downvote notes and comments
- 💬 **Comments** — Reddit-style nested threaded replies, per-comment voting, collapse/expand, edit & delete
- 🤖 **AI features** — one-click note summarization and personalized recommendations
- 💬 **AI Chatbot** — ask questions about your notes
- ⭐ **Premium page** — upgrade/membership info
- 👤 **Profile** — view stats, edit bio

---

## Project Structure

```
Note_Sharing_Platform/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Navbar, NoteCard, Chatbot, CommentThread, etc.
│   │   ├── pages/           # Login, Register, Home, Dashboard, UploadNote, ...
│   │   └── utils/api.js     # Axios instance (VITE_API_URL)
│   ├── vercel.json          # SPA rewrite rules
│   └── vite.config.js
└── server/                  # Express backend
    ├── config/              # DB, Cloudinary, Gemini, Groq config
    ├── controllers/         # auth, notes, votes, comments, AI, chatbot, users
    ├── middleware/          # auth (protect), upload, error handler
    ├── models/              # User, Note, Vote, Comment, CommentVote
    ├── routes/
    └── server.js
```

---

## Setup (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- Accounts: Cloudinary, Resend, Google AI (Gemini), Groq

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # or create .env manually
npm run dev            # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev            # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `localhost:5000`.

---

## Environment Variables

### `server/.env`

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `CLIENT_URL` | Frontend origin (`http://localhost:5173` in dev, Vercel URL in prod) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GEMINI_API_KEY` | Google Gemini API key (AI summary) |
| `GROQ_API_KEY` | Groq API key (chatbot/recommendations) |
| `RESEND_API_KEY` | Resend API key (emails) |
| `PORT` | Port (default `5000`) |
| `NODE_ENV` | `development` / `production` |

### `client/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL (`http://localhost:5000` in dev, Render URL in prod) |

---

## API Routes

### Auth — `/api/auth`
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/signup` | Create account (sends verification email) | No |
| POST | `/verify-email` | Verify email with code | No |
| POST | `/resend-code` | Resend verification code | No |
| POST | `/login` | Login, sets `jwt` httpOnly cookie | No |
| POST | `/logout` | Clear cookie | No |
| GET | `/me` | Current user | Yes |
| POST | `/forgot-password` | Send reset link | No |
| POST | `/reset-password` | Reset password with token | No |

### Notes — `/api/notes`
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/` | List notes | No |
| GET | `/mine` | My uploaded notes | Yes |
| POST | `/` | Upload a note (multipart) | Yes |
| GET | `/:id` | Note detail | No |
| GET | `/:id/download` | Download file | No |
| PUT | `/:id` | Update note | Yes |
| POST | `/:id/vote` | Vote on note | Yes |
| GET | `/:id/vote` | My vote on note | Yes |

### AI — `/api/notes/:id`
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/summarize` | AI summary of note | Yes |
| GET | `/recommendations` | Recommended notes | No |

### Comments — `/api/notes/:id/comments`
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/` | Comment tree for a note | No |
| POST | `/` | Add comment (or reply) | Yes |
| GET | `/votes` | My comment votes | Yes |
| POST | `/:commentId/vote` | Vote on a comment | Yes |
| PUT | `/:commentId` | Edit comment | Yes |
| DELETE | `/:commentId` | Delete comment | Yes |

### Users — `/api/users`
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/me` | Profile + stats | Yes |
| PATCH | `/me` | Update profile | Yes |

### Chatbot — `/api/chatbot`
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/` | Chat with AI assistant | No |

---

## Deployment

### Vercel (Frontend)
1. **Root Directory**: `Note_Sharing_Platform/client`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment**: `VITE_API_URL` → your Render backend URL
5. `client/vercel.json` handles SPA routing (rewrites all routes to `index.html`)

### Render (Backend)
1. **Root Directory**: `Note_Sharing_Platform/server`
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Environment**: all variables from `server/.env`, plus `NODE_ENV=production` and `CLIENT_URL` = your Vercel URL

### Cross-domain auth (important)
Because frontend (Vercel) and backend (Render) are on different domains, the backend sets the JWT cookie with `secure: true` and `sameSite: 'none'`, and CORS is configured with `credentials: true` and an explicit origin.

---

## Credentials

> **Note:** API keys, secrets, and the MongoDB URI are stored in environment variables and are **not** committed to the repository.

- Demo/test user credentials: _(add your test account details here)_
- Database: MongoDB Atlas
- File storage: Cloudinary
- Email: Resend

---

## Screenshots

| Screenshot | Link |
|---|---|
| Home | _(add screenshot here)_ |
| Login | _(add screenshot here)_ |
| Register | _(add screenshot here)_ |
| Note details + comments | _(add screenshot here)_ |
| Chatbot | _(add screenshot here)_ |
| Dashboard / Profile | _(add screenshot here)_ |

---

## License

This project is for academic/educational purposes (MERN Summer Internship).
