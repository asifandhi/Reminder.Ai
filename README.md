 # Re Mind

> Paste any WhatsApp or email text — AI extracts your tasks and syncs them to Google Calendar automatically.

---

## 🚀 Tech Stack

| | Technology |
|---|---|
| <img src="https://img.icons8.com/color/28/react-native.png"/> | React 19 + Vite |
| <img src="https://img.icons8.com/color/28/redux.png"/> | Redux Toolkit |
| <img src="https://img.icons8.com/color/28/tailwindcss.png"/> | Tailwind CSS v4 |
| <img src="https://img.icons8.com/fluency/28/node-js.png"/> | Node.js + Express 5 |
| <img src="https://img.icons8.com/color/28/mongodb.png"/> | MongoDB + Mongoose |
| <img src="https://img.icons8.com/color/28/google-logo.png"/> | Gemini 2.5 Flash |
| <img src="https://img.icons8.com/color/28/google-calendar--v2.png"/> | Google Calendar API |

---

## 💡 How It Works

Re-Mind is a full-stack MERN application. The user pastes any raw text — a WhatsApp message, email, or notice — into the input bar. The backend sends that text to Google Gemini, which extracts actionable tasks with deadlines and due times. Each task is saved to MongoDB and, if the user has connected Google Calendar, automatically creates a calendar event. Timed tasks get a popup reminder 30 minutes before; tasks with only a date get an all-day event with an 8-hour reminder.

---

## 📁 Project Structure

```
├── Backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── calendar.controller.js   ← Google OAuth + Calendar event creation
│   │   │   ├── sync.controller.js       ← Core: parse text, save tasks, push to Calendar
│   │   │   └── user.controller.js       ← Auth: register, login, logout, JWT
│   │   ├── db
│   │   │   └── index.js                 ← MongoDB connection
│   │   ├── middlewares
│   │   │   └── auth.middleware.js       ← JWT verification via httpOnly cookie
│   │   ├── models
│   │   │   ├── task.model.js            ← Task schema (task, description, deadline, dueTime)
│   │   │   └── user.model.js            ← User schema (name, email, password, googleTokens)
│   │   ├── routes
│   │   │   ├── calendar.route.js        ← /api/calendar routes
│   │   │   ├── sync.route.js            ← /api/sync routes
│   │   │   └── user.route.js            ← /api/user routes
│   │   └── utils
│   │       ├── apiError.js              ← Standardized error class
│   │       ├── apiResponse.js           ← Standardized response class
│   │       ├── asyncHandler.js          ← Async error wrapper
│   │       └── geminiService.js         ← Gemini prompt + response parser
├── Frontend
│   ├── src
│   │   ├── api
│   │   │   ├── auth.js                  ← Axios calls for auth routes
│   │   │   ├── calendar.js              ← Google OAuth redirect
│   │   │   └── sync.js                  ← Axios calls for reminder routes
│   │   ├── components
│   │   │   ├── bacisComponets
│   │   │   │   ├── Button.jsx           ← Reusable button (primary/ghost/cta/success/danger)
│   │   │   │   └── Input.jsx            ← Reusable themed input
│   │   │   ├── header/Header.jsx        ← Nav with auth state + logout
│   │   │   ├── AuthLayout.jsx           ← Route guard for protected pages
│   │   │   └── TaskCard.jsx             ← Task display with complete + delete actions
│   │   ├── pages
│   │   │   ├── Home.jsx                 ← Landing + logged-in reminder input
│   │   │   ├── Completed.jsx            ← Completed tasks list
│   │   │   ├── Settings.jsx             ← Profile, change password, Google connect
│   │   │   ├── Login.jsx                ← Login form
│   │   │   └── Signup.jsx               ← Register form
│   │   └── store
│   │       ├── authSlice.js             ← Redux auth state (status, userData)
│   │       └── store.js                 ← Redux store
```

---

## ⚙️ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### Backend `.env`

```env
PORT=8000
MONGODB_URI= 
CORS_ORIGIN= 

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
FRONTEND_URL=
NODE_ENV=development
```

---

## 🖥️ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Frontend `.env`

```env
VITE_API_BASE_URL=
```

---

## 🔑 Getting API Keys

### <img src="https://img.icons8.com/color/20/google-logo.png"/> Gemini API Key

1. Go to **[Google AI Studio](https://aistudio.google.com)**
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key in new project**
4. Copy the key → paste as `GEMINI_API_KEY` in Backend `.env`

---

### <img src="https://img.icons8.com/color/20/google-calendar--v2.png"/> Google Calendar OAuth2 Keys

1. Go to **[Google Cloud Console](https://console.cloud.google.com)**
2. Click **Select a project** → **New Project** → name it → **Create**
3. Go to **APIs & Services** → **Library**
4. Search **Google Calendar API** → Click → **Enable**
5. Go to **APIs & Services** → **OAuth consent screen**
   - User type: **External** → **Create**
   - Fill App name + support email → **Save and Continue**
   - Scopes → **Add or Remove Scopes** → add `calendar.events` → **Save**
   - Test users → add your Gmail → **Save**
6. Go to **APIs & Services** → **Credentials**
   - Click **+ Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs → **Add URI**:
     ```
      api/calendar/callback
     ```
   - Click **Create**
7. Copy **Client ID** → paste as `GOOGLE_CLIENT_ID`
8. Copy **Client Secret** → paste as `GOOGLE_CLIENT_SECRET`

---

## 📡 API Routes

### Auth `/api/user`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ✗ | Register new user |
| POST | `/login` | ✗ | Login + set cookies |
| POST | `/logout` | ✓ | Logout + clear cookies |
| GET | `/me` | ✓ | Get current user |
| POST | `/refresh-token` | ✗ | Refresh access token |
| POST | `/change-password` | ✓ | Change password |

### Sync `/api/sync`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/addreminder` | ✓ | Parse text → save task → push to Calendar |
| DELETE | `/deletereminder/:taskId` | ✓ | Delete task + Calendar event |
| PATCH | `/completereminder/:taskId` | ✓ | Mark task completed |
| GET | `/pending` | ✓ | Get pending tasks |
| GET | `/completed` | ✓ | Get completed tasks |

### Calendar `/api/calendar`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/auth` | ✓ | Start Google OAuth flow |
| GET | `/callback` | ✗ | OAuth callback — saves tokens |

---

## 🔄 App Flow

```
User pastes text
      ↓
Gemini extracts → task + description + deadline + dueTime
      ↓
Save to MongoDB
      ↓
Google Calendar connected?
  ├── YES + dueTime → Timed event + 30min popup reminder
  ├── YES, no time → All-day event + 8hr popup reminder
  └── NO → Skip Calendar, save task only
```

---

## 🔐 Auth Flow

- JWT access token (15min) + refresh token (7d)
- Stored in `httpOnly` cookies — never exposed to JavaScript
- Session auto-restored on page refresh via `/api/user/me`
- Google OAuth tokens stored per-user in MongoDB

---

## 📅 Connect Google Calendar

1. Login → go to **Settings**
2. Click **Connect Google Calendar**
3. Complete Google OAuth consent
4. Redirects back to Settings — shows **✓ Connected**
5. All future reminders auto-sync to your primary Google Calendar

---

<p align="center"> React + Node.js + Gemini AI</p>