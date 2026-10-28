# CHARUSAT — ITUE301 Advanced Web Development Frameworks (AWDF)
## Complete Practical 1 to 11 Enterprise Suite with Full Docker Containerization

**Student Name:** Dhruv Patel  
**Course Code:** ITUE301 (Advanced Web Development Frameworks)  
**Program:** B.Tech Information Technology (Semester 5)  
**Institute:** Chandubhai S. Patel Institute of Technology (CSPIT) / CHARUSAT  

---

## 📌 Project Overview

This repository represents the comprehensive, production-grade implementation of all **11 Practicals** prescribed under the CHARUSAT ITUE301 syllabus. The project seamlessly integrates a modern **React 18** Single-Page Application (SPA), a modular **Node.js & Express** RESTful API, a validated **MongoDB & Mongoose** data layer, in-memory caching via **node-cache**, decoupled asynchronous event processing with **EventEmitter**, and **Docker & Docker Compose** multi-container orchestration.

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

## 🚀 Practical Modules Mapping

| Practical | Academic Aim & Requirement | Key Technologies / Source Files |
| :--- | :--- | :--- |
| **Practical 1** | React Component Architecture & Student Portfolio | `frontend/src/components/Header.jsx`, `About.jsx`, `Skills.jsx`, `Footer.jsx` |
| **Practical 2** | State Management, Client-Side Routing & Forms | React Router v6, `frontend/src/pages/ProjectsPage.jsx`, `ContactPage.jsx` |
| **Practical 3** | Public REST API Integration & Data Rendering | GitHub API v3, `frontend/src/pages/ReposPage.jsx` (Loading, error, empty states) |
| **Practical 4** | RESTful API Development with Node.js & Express | `backend/server.js`, `backend/routes/taskRoutes.js`, `backend/middleware/loggerMiddleware.js` |
| **Practical 5** | MongoDB Schema Design & Mongoose Validation | `backend/models/Task.js`, `backend/config/db.js` |
| **Practical 6** | Full-Stack Integration (React + Express + MongoDB) | `frontend/src/pages/TasksPage.jsx`, `frontend/src/api/client.js` |
| **Practical 7** | JWT Authentication Pipeline & Ownership Isolation | `backend/models/User.js`, `backend/middleware/authMiddleware.js`, `backend/controllers/authController.js` |
| **Practical 8** | Frontend Performance Optimization & Lazy Loading | `frontend/src/App.jsx` (`React.lazy`, `<Suspense>` chunk splitting, Vite build) |
| **Practical 9** | In-Memory Caching & Latency Optimization | `backend/utils/cache.js` (`node-cache`, TTL, invalidation on mutations) |
| **Practical 10**| Asynchronous Decoupling via native EventEmitter | `backend/utils/eventEmitter.js` (`node:events`, non-blocking HTTP return) |
| **Practical 11**| Containerization with Docker & Docker Compose | `backend/Dockerfile`, `frontend/Dockerfile`, `frontend/nginx.conf`, `compose.yaml` |

---

## 📂 Project Structure

```
d:\AWDF_SEM5\
├── compose.yaml                    # Official Docker Compose configuration
├── docker-compose.yml              # Alias Compose file for backward compatibility
├── .env.example                    # Template environment variables
├── .env                            # Local environment configuration (ignored in git)
├── .gitignore                      # Git ignore rules for dependencies and secrets
├── README.md                       # Master course documentation
├── PRACTICALS.md                   # Comprehensive Practicals 1-11 university report
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
│   │   └── taskController.js       # CRUD logic, node-cache lookup, event emission
│   ├── routes/
│   │   ├── healthRoutes.js         # GET /api/health endpoint
│   │   ├── authRoutes.js           # Auth routes (register, login, me)
│   │   └── taskRoutes.js           # Protected task routes (/api/tasks)
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
│       └── event-emitter.test.js   # Practical 10 asynchronous event timing test
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
            ├── HomePage.jsx        # Landing page
            ├── ProjectsPage.jsx    # Practical 2: Dynamic category filter & detail toggles
            ├── ReposPage.jsx       # Practical 3: Live GitHub REST API repository browser
            ├── ContactPage.jsx     # Practical 2: Validated contact form with state feedback
            ├── TasksPage.jsx       # Practical 6: Task CRUD dashboard with Cache & Event badges
            ├── LoginPage.jsx       # Practical 7: User login form
            └── RegisterPage.jsx    # Practical 7: User registration form
```

---

## ⚙️ Environment Variables

Create `.env` in the root and configure:

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

---

## 🐳 Running with Docker & Docker Compose (Practical 11)

### Prerequisites:
1. Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
2. Enable WSL2 backend in Docker Desktop Settings.
3. Start Docker Desktop and verify:
   ```powershell
   docker --version
   docker compose version
   docker info
   ```

### 1. Build and Start All Containers
```bash
docker compose up --build -d
```

### 2. Check Service Health and Status
```bash
docker compose ps
```
*Expected status:*
- `itue301-mongodb`: `Up (healthy)` on port `0.0.0.0:27017->27017/tcp`
- `itue301-backend`: `Up` on port `0.0.0.0:5000->5000/tcp`
- `itue301-frontend`: `Up` on port `0.0.0.0:80->80/tcp`

### 3. Inspect Container Logs
```bash
docker compose logs --tail=100 -f
```

### 4. Access the Live Application
- **Frontend Web UI:** `http://localhost`
- **Backend Health Check:** `http://localhost/api/health` or `http://localhost:5000/api/health`

### 5. Verify MongoDB Data Persistence
```bash
# Stop containers without erasing the named volume
docker compose down

# Bring them back up
docker compose up -d

# Your created users and tasks remain completely intact!
```

---

## 🧪 Automated Testing

Run the included automated verification scripts:

```bash
# 1. Full Integration Test (Health, Auth, Validation, Isolation, CRUD, Invalidation)
cd backend
npm test

# 2. Practical 9 In-Memory Cache Benchmark
npm run test:cache

# 3. Practical 10 Asynchronous EventEmitter Pipeline Verification
npm run test:events
```

---

## 👥 Author

- **Dhruv Patel** — B.Tech IT, CHARUSAT
- Course: **ITUE301 Advanced Web Development Frameworks**
