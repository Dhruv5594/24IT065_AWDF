# CHARUSAT — ITUE301 Advanced Web Development Frameworks (AWDF)
## Complete Practicals 1 to 13 Enterprise Suite with Full Docker Containerization, CI/CD Pipeline & AI Integration

[![CI/CD Pipeline](https://github.com/Dhruv5594/AWDF/actions/workflows/ci.yml/badge.svg)](https://github.com/Dhruv5594/AWDF/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-brightgreen.svg)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF.svg)

**Student Name:** Dhruv Patel  
**Course Code:** ITUE301 (Advanced Web Development Frameworks)  
**Program:** B.Tech Information Technology (Semester 5)  
**Institute:** Chandubhai S. Patel Institute of Technology (CSPIT) / CHARUSAT  
**Repository:** [https://github.com/Dhruv5594/AWDF](https://github.com/Dhruv5594/AWDF)  

---

## 📌 Project Overview

This repository represents the comprehensive, production-grade implementation of all **13 Practicals** prescribed under the CHARUSAT ITUE301 syllabus. The project seamlessly integrates:
- Modern **React 18** Single-Page Application (SPA) with route-based code splitting.
- Modular **Node.js & Express** RESTful API with centralized error handling.
- Validated **MongoDB & Mongoose** data layer with compound indexing.
- In-memory query caching via **node-cache** (>1000x speedup).
- Decoupled asynchronous event processing with native **EventEmitter**.
- Multi-container orchestration via **Docker & Docker Compose** with persistent volumes.
- Continuous Integration and Delivery with **GitHub Actions (CI/CD)**.
- **AI API Integration** with prompt engineering and a responsible heuristic fallback engine.

```
+-------------------------------------------------------------------------------+
|                                CLIENT BROWSER                                 |
|                               http://localhost                                |
+-------------------------------------------------------------------------------+
                                      |
                                      | (Port 80)
                                      v
+-------------------------------------------------------------------------------+
|                       DOCKER SERVICE: itue301-frontend                        |
|                                                                               |
|  [Nginx Alpine Production Web Server]                                         |
|  * Static React SPA (/usr/share/nginx/html)                                   |
|  * SPA Fallback: try_files $uri $uri/ /index.html                             |
|  * Reverse Proxy: /api/* -> http://backend:5000/api/*                         |
+-------------------------------------------------------------------------------+
                                      |
                                      | (Internal Bridge Network: itue301_network)
                                      v
+-------------------------------------------------------------------------------+
|                        DOCKER SERVICE: itue301-backend                        |
|                                                                               |
|  [Node.js 20 Express REST API Server (Port 5000)]                             |
|  * Middleware: CORS, Request Logger, Centralized Error Handling               |
|  * Security: JWT Authentication & Bcrypt Password Hashing                     |
|  * Performance: Node-Cache In-Memory TTL & Per-User Cache Invalidation        |
|  * Async Event Bus: Node Native EventEmitter (task-created event)             |
|  * AI Service: Gemini / OpenAI Integration & Heuristic Fallback Engine        |
+-------------------------------------------------------------------------------+
                                      |
                                      | (Port 27017)
                                      v
+-------------------------------------------------------------------------------+
|                        DOCKER SERVICE: itue301-mongodb                        |
|                                                                               |
|  [Official MongoDB 7.0 Engine]                                                |
|  * Persistent Volume Mount: itue301_mongo_data -> /data/db                    |
|  * Healthcheck: mongosh --eval "db.adminCommand('ping')"                      |
+-------------------------------------------------------------------------------+
```

---

## 🚀 Practical Modules Mapping (1 to 13)

| Practical | Academic Aim & Requirement | Key Technologies / Source Files | Status |
| :--- | :--- | :--- | :---: |
| **Practical 1** | React Component Architecture & Student Portfolio | `frontend/src/components/Header.jsx`, `About.jsx`, `Skills.jsx`, `Footer.jsx` | **PASS** |
| **Practical 2** | State Management, Client-Side Routing & Forms | React Router v6, `frontend/src/pages/ProjectsPage.jsx`, `ContactPage.jsx` | **PASS** |
| **Practical 3** | Public REST API Integration & Data Rendering | GitHub API v3, `frontend/src/pages/ReposPage.jsx` (Loading, error, empty states) | **PASS** |
| **Practical 4** | RESTful API Development with Node.js & Express | `backend/server.js`, `backend/routes/taskRoutes.js`, `backend/middleware/loggerMiddleware.js` | **PASS** |
| **Practical 5** | MongoDB Schema Design & Mongoose Validation | `backend/models/Task.js`, `backend/config/db.js` | **PASS** |
| **Practical 6** | Full-Stack Integration (React + Express + MongoDB) | `frontend/src/pages/TasksPage.jsx`, `frontend/src/api/client.js` | **PASS** |
| **Practical 7** | JWT Authentication Pipeline & Ownership Isolation | `backend/models/User.js`, `backend/middleware/authMiddleware.js`, `backend/controllers/authController.js` | **PASS** |
| **Practical 8** | Frontend Performance Optimization & Lazy Loading | `frontend/src/App.jsx` (`React.lazy`, `<Suspense>` chunk splitting, Vite build) | **PASS** |
| **Practical 9** | In-Memory Caching & Latency Optimization | `backend/utils/cache.js` (`node-cache`, TTL, invalidation on mutations) | **PASS** |
| **Practical 10**| Asynchronous Decoupling via native EventEmitter | `backend/utils/eventEmitter.js` (`node:events`, non-blocking HTTP return) | **PASS** |
| **Practical 11**| Containerization with Docker & Docker Compose | `backend/Dockerfile`, `frontend/Dockerfile`, `frontend/nginx.conf`, `compose.yaml` | **PASS** |
| **Practical 12**| CI/CD Pipeline with GitHub Actions | `.github/workflows/ci.yml`, `backend/tests/ci-test-demo.js` | **PASS** |
| **Practical 13**| AI API Integration into a Web Application | `backend/services/aiService.js`, `frontend/src/pages/TasksPage.jsx`, `ai-integration.test.js` | **PASS** |

---

## 📂 Project Structure

```
d:\AWDF_SEM5\
├── .github/
│   └── workflows/
│       └── ci.yml                  # Practical 12: GitHub Actions CI/CD pipeline
├── compose.yaml                    # Official Docker Compose configuration
├── docker-compose.yml              # Alias Compose file for backward compatibility
├── .env.example                    # Template environment variables
├── .env                            # Local environment configuration (ignored in git)
├── .gitignore                      # Git ignore rules for dependencies and secrets
├── README.md                       # Master course documentation
├── PRACTICALS.md                   # Comprehensive Practicals 1-13 university report
├── DOCKER_GUIDE.md                 # Deep-dive guide on Docker containerization & Viva Q&A
├── TEST_REPORT.md                  # Test execution outcomes and verification benchmarks
│
├── backend/
│   ├── Dockerfile                  # Production Node.js 20 Alpine container definition
│   ├── .dockerignore               # Files excluded from backend container builds
│   ├── package.json                # Express, Mongoose, JWT, Bcrypt, Node-Cache dependencies
│   ├── server.js                   # Application entry point & route mounting
│   ├── config/
│   │   └── db.js                   # Mongoose connection manager
│   ├── models/
│   │   ├── User.js                 # User schema with bcrypt pre-save hashing & validation
│   │   └── Task.js                 # Task schema with title, status, priority, and user refs
│   ├── controllers/
│   │   ├── authController.js       # Registration, login, JWT token issuance
│   │   └── taskController.js       # CRUD logic, node-cache lookup, event emission, AI suggest
│   ├── services/
│   │   └── aiService.js            # Practical 13: Gemini/OpenAI API & Heuristic Fallback
│   ├── routes/
│   │   ├── healthRoutes.js         # GET /api/health endpoint
│   │   ├── authRoutes.js           # Auth routes (register, login, me)
│   │   └── taskRoutes.js           # Protected task routes (/api/tasks & /api/tasks/ai-suggest)
│   ├── middleware/
│   │   ├── authMiddleware.js       # Bearer JWT verification & req.user injection
│   │   ├── loggerMiddleware.js     # Custom HTTP request logger (method, url, status, time)
│   │   └── errorHandler.js         # Centralized error handler for CastError, validation, duplicates
│   ├── utils/
│   │   ├── cache.js                # Node-cache instance, keys, and invalidation helpers
│   │   └── eventEmitter.js         # Native node:events singleton and async consumer
│   └── tests/
│       ├── test-runner.js          # Full automated integration test suite
│       ├── cache-benchmark.js      # Practical 9 latency benchmark (DB vs Cache)
│       ├── event-emitter.test.js   # Practical 10 asynchronous event timing test
│       ├── ci-test-demo.js         # Practical 12 CI broken/fixed pipeline demonstrator
│       └── ai-integration.test.js  # Practical 13 AI integration & resilience test
│
└── frontend/
    ├── Dockerfile                  # Multi-stage build (Vite Builder -> Nginx Alpine Runner)
    ├── .dockerignore               # Build files excluded from frontend image
    ├── nginx.conf                  # Nginx configuration (SPA routing fallback & API proxy)
    ├── package.json                # React 18, React Router v6, Axios, Vite
    ├── vite.config.js              # Vite configuration with chunk splitting & proxy
    ├── index.html                  # HTML5 entry page with Google Fonts
    └── src/
        ├── main.jsx                # React DOM root with BrowserRouter & AuthProvider
        ├── App.jsx                 # Lazy-loaded routes with Suspense fallbacks
        ├── index.css               # Modern responsive design system
        ├── api/
        │   └── client.js           # Axios instance with JWT interceptors
        ├── context/
        │   └── AuthContext.jsx     # User authentication state provider
        ├── components/
        │   ├── Navbar.jsx          # Responsive navigation bar with auth badges
        │   ├── Header.jsx          # Hero header with student intro
        │   ├── About.jsx           # Student profile & CHARUSAT degree info
        │   ├── Skills.jsx          # Categorized technical skill matrix
        │   ├── Footer.jsx          # Dynamic year, university links, copyright
        │   ├── ProtectedRoute.jsx  # Route guard for authenticated views
        │   └── LoadingSpinner.jsx  # Visual spinner for lazy routes & API calls
        └── pages/
            ├── HomePage.jsx        # Landing page with Practicals 1-13 architecture map
            ├── ProjectsPage.jsx    # Practical 2: Dynamic category filter & detail toggles
            ├── ReposPage.jsx       # Practical 3: Live GitHub REST API repository browser
            ├── ContactPage.jsx     # Practical 2: Validated contact form with state feedback
            ├── TasksPage.jsx       # Practicals 6, 9, 10, 13: Task CRUD, Cache & AI Assistant
            ├── LoginPage.jsx       # Practical 7: User login form
            └── RegisterPage.jsx    # Practical 7: User registration form
```

---

## ⚙️ Environment Variables

Create `.env` in the root directory:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
# For Local Run:
MONGO_URI=mongodb://127.0.0.1:27017/itue301_db
# For Docker Compose:
# MONGO_URI=mongodb://mongodb:27017/itue301_db

# JWT Configuration
JWT_SECRET=itue301_super_secret_jwt_key_2026_charusat
JWT_EXPIRES_IN=7d

# Cache TTL (seconds)
CACHE_TTL=60

# Client Application URL
CLIENT_URL=http://localhost:5173

# Optional: External AI Service Keys (Practical 13)
# If omitted, application uses intelligent semantic fallback automatically!
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🏃 Running the Application Locally (Without Docker)

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
# Backend starts at: http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend starts at: http://localhost:5173
```

### 🔑 Pre-Configured Test Credentials:
- **Email:** `dhruv@charusat.edu.in`
- **Password:** `password123`

---

## 🐳 Running with Docker & Docker Compose (Practical 11)

### 1. Build and Start All Containers
```bash
docker compose up --build -d
```

### 2. Check Service Health and Status
```bash
docker compose ps
```

### 3. Inspect Container Logs
```bash
docker compose logs --tail=100 -f
```

### 4. Access Live URLs
- **Frontend SPA:** `http://localhost` (Port 80)
- **Backend API (via Nginx Reverse Proxy):** `http://localhost/api/`
- **Backend Direct Port:** `http://localhost:5000/api/`
- **MongoDB Direct Port:** `localhost:27017`
- **Persistent Volume:** `itue301_mongo_data` mounted to `/data/db`

---

## 🤖 Practical 13: AI Assistant Demonstration

1. Open `http://localhost:5173/tasks` and sign in.
2. Click **➕ Create New Task**.
3. Type any task title (e.g. `Deploy multi-container Docker Compose application` or `Prepare ITUE301 viva presentation`).
4. Click **✨ Auto-Fill with AI (Practical 13)**.
5. The description, subtask checklist, priority recommendation, and estimated duration populate automatically.
6. **Zero-Breakage Guarantee:** Even if external AI quotas or network connections drop, the local semantic fallback engine handles the request gracefully without interrupting user workflow.

---

## 🧪 Automated Testing & CI/CD Verification

Run the included automated verification scripts:

```bash
cd backend

# 1. Full Integration Test (Health, Auth, Validation, Isolation, CRUD, Invalidation)
npm test

# 2. Practical 9 In-Memory Cache Benchmark (~1200x speedup)
npm run test:cache

# 3. Practical 10 Asynchronous EventEmitter Pipeline Verification
npm run test:events

# 4. Practical 12 CI/CD Pipeline Failure & Success Demonstrator
npm run test:ci
node tests/ci-test-demo.js --fail   # Demonstrates broken pipeline (RED)
node tests/ci-test-demo.js          # Demonstrates fixed pipeline (GREEN)

# 5. Practical 13 AI Integration & Responsible Fallback Test
npm run test:ai
```

---

## 👥 Author

- **Dhruv Patel** — B.Tech IT, CHARUSAT
- Course: **ITUE301 Advanced Web Development Frameworks**
- GitHub: [@Dhruv5594](https://github.com/Dhruv5594)
