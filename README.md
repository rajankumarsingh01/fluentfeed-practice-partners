# 🗣️ FluentFeed Practice Partners

> AI-powered English practice partner matching platform — built as a Full-Stack Development Intern technical assignment for **FluentFeed**.

FluentFeed helps English learners create a profile, get matched with the most compatible practice partners based on their goals and preferences, send/accept connection requests, and receive a daily practice topic once connected.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Deployed](https://img.shields.io/badge/status-live-brightgreen)

---

## 🔗 Live Links

| Resource | Link |
|---|---|
| **Live App (Frontend)** | https://fluentfeed-practice-partners.vercel.app |
| **Backend API** | https://fluentfeed-server.onrender.com/api |
| **Health Check** | https://fluentfeed-server.onrender.com/api/health |
| **GitHub Repository** | https://github.com/rajankumarsingh01/fluentfeed-practice-partners |

> ⚠️ **Note:** The backend is hosted on Render's free tier, which spins down after periods of inactivity. The **first request after idle time may take 30–50 seconds** to respond while the server cold-starts — this is expected behavior, not a bug.

---

## 📋 Table of Contents

- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Database Setup](#️-database-setup)
- [API Documentation](#-api-documentation)
- [Matching Algorithm](#-matching-algorithm)
- [Assumptions Made](#-assumptions-made)
- [What I'd Improve With More Time](#-what-id-improve-with-more-time)
- [Deployment](#-deployment)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Axios |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB (MongoDB Atlas — cloud-hosted) |
| **Hosting** | Vercel (frontend) · Render (backend) · MongoDB Atlas (database) |

---

## 📁 Project Structure

```
fluentfeed-practice-partners/
├── client/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── api/                # Axios instance + typed API calls
│   │   ├── components/         # Reusable UI components
│   │   ├── context/             # UserContext (session), ToastContext (notifications)
│   │   ├── pages/               # WelcomePage, CreateProfile, FindPartners, MyConnections
│   │   └── types/                # Shared TypeScript types
│   ├── vercel.json
│   └── .env.example
├── server/                     # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── config/db.ts         # MongoDB connection
│   │   ├── controllers/          # profile, matches, users, connections
│   │   ├── models/                # User, Connection (Mongoose schemas)
│   │   ├── routes/                 # Express routers
│   │   └── data/missions.ts        # Practice mission topic bank
│   └── .env.example
├── render.yaml
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- A MongoDB connection string (free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster recommended)

### 1. Clone the repository
```bash
git clone https://github.com/rajankumarsingh01/fluentfeed-practice-partners.git
cd fluentfeed-practice-partners
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Run the backend in dev mode:
```bash
npm run dev
```
Server starts at `http://localhost:5000`. Health check: `GET /api/health`.

### 3. Frontend setup
Open a new terminal:
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```
App opens at `http://localhost:5173`.

### 4. Production build
```bash
# Backend
cd server && npm run build && npm start

# Frontend
cd client && npm run build && npm run preview
```

---

## 🗄️ Database Setup

Uses **MongoDB** via **Mongoose**, with two collections:

### `User` (Profile)
| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `englishLevel` | Enum | `Beginner` \| `Intermediate` \| `Advanced` |
| `learningGoal` | Enum | `IELTS` \| `TOEFL` \| `Job Interview` \| `Daily Communication` \| `Business English` |
| `nativeLanguage` | String | required |
| `country` | String | required |
| `preferredTime` | String | required (free text, e.g. `"Evening (6-9 PM)"`) |
| `bio` | String | required, max 300 chars |
| `createdAt` / `updatedAt` | Date | auto (Mongoose timestamps) |

### `Connection`
| Field | Type | Notes |
|---|---|---|
| `senderId` | ObjectId (ref `User`) | required |
| `receiverId` | ObjectId (ref `User`) | required |
| `status` | Enum | `pending` \| `accepted` \| `rejected` |
| `practiceMission` | `{ topic, durationMinutes }` | assigned automatically on accept |
| `createdAt` | Date | auto |

A **unique compound index** on `(senderId, receiverId)` prevents duplicate connection requests between the same pair of users.

> No manual seed script is included — create a few profiles from the UI (`/profile`) to populate matches and test the matching algorithm.

**Setting up your own MongoDB Atlas cluster:**
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`) since the backend is hosted on a platform with dynamic IPs
3. Under **Database Access**, create a database user with read/write permissions
4. Copy the connection string and append a database name, e.g. `.../fluentfeed?retryWrites=true&w=majority`

---

## 📡 API Documentation

**Base URL (local):** `http://localhost:5000/api`
**Base URL (production):** `https://fluentfeed-server.onrender.com/api`

All responses follow a consistent shape:
```json
{ "success": true, "data": {}, "message": "optional" }
```

### Profile
| Method | Endpoint | Body / Query | Description |
|---|---|---|---|
| `POST` | `/profile` | `{ name, englishLevel, learningGoal, nativeLanguage, country, preferredTime, bio }` | Create a new profile |
| `GET` | `/profile?userId=` | — | Get a profile by id |
| `PUT` | `/profile?userId=` | any subset of the fields above | Update a profile |

### Matches & Users
| Method | Endpoint | Query | Description |
|---|---|---|---|
| `GET` | `/matches?userId=` | — | Top 5 compatible users, sorted by match score |
| `GET` | `/users?englishLevel=&learningGoal=&country=&userId=` | all optional | Filterable user directory (excludes `userId` if provided) |

### Connections
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/connections` | `{ senderId, receiverId }` | Send a connection request |
| `GET` | `/connections?userId=&type=` | `type`: `incoming` \| `sent` \| `connected` (optional) | List connections for a user |
| `PUT` | `/connections/:id` | `{ status: "accepted" \| "rejected" }` | Accept/reject a request. On accept, a random practice mission is attached. |

### Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server status check |

---

## 🎯 Matching Algorithm

For a given user, every other profile is scored against them and the **top 5 highest-scoring users** are returned:

| Criteria | Points |
|---|---|
| Same Learning Goal | +40 |
| Same English Level | +25 |
| Same Preferred Practice Time | +20 |
| Same Country | +10 |
| Same Native Language | +5 |

**Maximum possible score is 100**, shown directly as a `matchPercentage` (e.g. `92% Match`).

Scores are computed **on the fly per request** rather than pre-cached, since the dataset size for this prototype is small — this keeps results always fresh without needing cache invalidation logic. If the dataset grows significantly, this could be optimized with pre-computed match scores refreshed on profile update.

---

## 💭 Assumptions Made

- **Preferred Practice Time** is stored as free text (e.g. `"Evening (6-9 PM)"`) rather than a fixed enum, so exact-string matching is used for that criterion. In production this would likely be a fixed set of time-slot buckets for more reliable matching.
- **No authentication/login system** — a created profile's MongoDB `_id` is stored in the browser (`localStorage`) and used as the "current user" for the session, since the assignment scope excludes auth.
- A connection request **cannot be sent twice** between the same two users (enforced via a unique compound index) — attempting to do so returns the existing connection's status instead of creating a duplicate.
- **Messaging/calling was explicitly out of scope**, so the "Connected" state only unlocks the Practice Mission card, per the assignment spec.
- Practice mission topics are a **static, hardcoded list of 15** (assignment asked for 10–20), with duration fixed at 5 minutes and randomly selected on connection accept.

---

## 🔮 What I'd Improve With More Time

- Add basic authentication (even a lightweight email/passwordless flow) instead of relying on a locally stored user id
- Convert "Preferred Practice Time" into a fixed set of time-slot options for more reliable matching instead of free text
- Add pagination to `GET /api/users` for larger datasets
- Add automated tests (Jest/Supertest for the API, React Testing Library for components)
- Persist and rotate practice missions per connection over time instead of assigning just once on accept
- Add a notifications badge in the navbar for pending incoming requests
- Add rate limiting and input sanitization middleware for production hardening
- Move the backend to a paid/always-on tier to eliminate cold-start latency

---

## 🌐 Deployment

| Service | Platform | Notes |
|---|---|---|
| **Backend** | [Render](https://render.com) | Deployed via Blueprint (`render.yaml`) · Build: `npm install && npm run build` · Start: `npm start` |
| **Frontend** | [Vercel](https://vercel.com) | Root directory: `client` · Build: `npm run build` · Output: `dist` |
| **Database** | MongoDB Atlas | Cloud-hosted, free tier |

- **Live app:** https://fluentfeed-practice-partners.vercel.app
- **Live API:** https://fluentfeed-server.onrender.com/api
- **Repository:** [github.com/rajankumarsingh01/fluentfeed-practice-partners](https://github.com/rajankumarsingh01/fluentfeed-practice-partners)

**Environment variables set on hosting platforms:**

| Platform | Variable | Value |
|---|---|---|
| Render (backend) | `MONGO_URI` | MongoDB Atlas connection string |
| Render (backend) | `CLIENT_URL` | `https://fluentfeed-practice-partners.vercel.app` |
| Vercel (frontend) | `VITE_API_URL` | `https://fluentfeed-server.onrender.com/api` |

---

## 📄 License

This project was built as a technical assignment and is not licensed for commercial use.