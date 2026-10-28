# CHARUSAT — ITUE301 Advanced Web Development Frameworks
## Comprehensive Practical Lab Manual & Solutions (Practicals 1 to 11)

**Student Name:** Dhruv Patel  
**Course Code:** ITUE301 (AWDF)  
**Department:** Information Technology, CSPIT / CHARUSAT  

---

# PRACTICAL 1: INTRODUCTION TO REACT AND COMPONENT ARCHITECTURE

### Aim
Set up a modern React development environment and build a responsive student portfolio application using reusable functional components and component composition.

### Requirements & Problem Statement
- Initialize a React project using Vite.
- Design reusable, modular UI components: `Header`, `About`, `Skills`, and `Footer`.
- Compose components into a cohesive single-page layout.
- Use props to pass dynamic data (e.g., student name, university, skills list, theme color) from parent to child components.
- Ensure responsive layout across mobile, tablet, and desktop viewports.

### Technologies Used
- React 18
- Vite Build Tool
- CSS3 (Custom Properties / Variables, Flexbox, CSS Grid)

### Implementation Details
- `Header.jsx`: Functional hero component receiving `name` and `themeColor` props, displaying degree and specialization at CHARUSAT.
- `About.jsx`: Academic overview describing university background, ITUE301 practical syllabus, and full-stack interests.
- `Skills.jsx`: Renders technical skills grouped by frontend, backend, and DevOps.
- `Footer.jsx`: Dynamic copyright year calculation via `new Date().getFullYear()` and institutional contact details.

### Source Files
- [`frontend/src/components/Header.jsx`](file:///d:/AWDF_SEM5/frontend/src/components/Header.jsx)
- [`frontend/src/components/About.jsx`](file:///d:/AWDF_SEM5/frontend/src/components/About.jsx)
- [`frontend/src/components/Skills.jsx`](file:///d:/AWDF_SEM5/frontend/src/components/Skills.jsx)
- [`frontend/src/components/Footer.jsx`](file:///d:/AWDF_SEM5/frontend/src/components/Footer.jsx)
- [`frontend/src/pages/HomePage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/HomePage.jsx)

### Execution Commands
```bash
cd frontend
npm install
npm run dev
```

### Testing Procedure
1. Open `http://localhost:5173/` in a web browser.
2. Confirm the hero banner displays "Hi, I'm Dhruv Patel".
3. Verify that the Skills section renders the skill badges.
4. Resize the browser window or use DevTools Device Toolbar (Ctrl+Shift+M) to verify mobile responsiveness.

### Expected Output
A responsive single-page student portfolio containing a navbar, hero header, about me card, skills grid, and copyright footer.

### Viva Questions & Answers
1. **Q: What is a React component and what is the difference between functional and class components?**  
   *A:* A React component is an independent, reusable piece of UI. Functional components are JavaScript functions that accept props and return JSX, utilizing React Hooks for state and lifecycle operations. Class components extend `React.Component` and use the `render()` method; functional components are the modern industry standard.
2. **Q: What are React Props and are they mutable?**  
   *A:* Props (properties) are read-only inputs passed from a parent component to a child component to customize its rendering. Props are immutable within the child component to maintain unidirectional data flow.
3. **Q: Why is Vite preferred over Create React App (CRA)?**  
   *A:* Vite leverages native browser ES Modules (ESM) during development and utilizes `esbuild` (written in Go) for pre-bundling, delivering instant server start times and sub-millisecond Hot Module Replacement (HMR), unlike Webpack-based CRA which bundles the entire app upfront.
4. **Q: What is JSX and how does the browser execute it?**  
   *A:* JSX (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like markup inside JS. Browsers cannot parse JSX directly; transpilers (like Babel or SWC in Vite) transform JSX into standard `React.createElement()` or `_jsx()` function calls.
5. **Q: How does unidirectional data flow benefit application architecture?**  
   *A:* In React, data flows strictly downward from parent to child via props. This ensures deterministic state management, predictable debugging, and isolated side effects.

---

# PRACTICAL 2: STATE MANAGEMENT AND ROUTING IN REACT

### Aim
Implement client-side multi-page routing and application state to build interactive views and a validated contact form.

### Requirements & Problem Statement
- Configure client-side navigation using React Router DOM.
- Implement distinct routes for `Home`, `Projects`, and `Contact`.
- Manage interactive UI state using `useState` to dynamically show/hide content and filter project categories.
- Build a controlled Contact form with real-time field validation, error cues, character counter, and submission feedback.
- Guarantee that direct URL navigation and browser refreshes work without 404 errors.

### Technologies Used
- React 18, React Router DOM v6
- React Hooks: `useState`, `useNavigate`, `useLocation`

### Implementation Details
- `ProjectsPage.jsx`: State `activeCategory` filters projects between 'All', 'Full-Stack', 'Frontend', and 'AI & Python'. State `expandedId` toggles architecture details dynamically.
- `ContactPage.jsx`: Controlled form inputs (`formData.name`, `formData.email`, `formData.subject`, `formData.message`). Validates input length and email regex, displaying errors per field and showing a dismissible confirmation banner upon valid submission.

### Source Files
- [`frontend/src/pages/ProjectsPage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/ProjectsPage.jsx)
- [`frontend/src/pages/ContactPage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/ContactPage.jsx)
- [`frontend/src/components/Navbar.jsx`](file:///d:/AWDF_SEM5/frontend/src/components/Navbar.jsx)

### Execution Commands
```bash
cd frontend
npm run dev
```

### Testing Procedure
1. Navigate to `/projects` and click different category filter tabs.
2. Click "View Architecture Details" to expand project specifications.
3. Navigate to `/contact` and attempt to submit an empty form. Verify that field-level error messages appear.
4. Fill valid inputs and submit. Confirm the success notification appears and form fields reset.
5. Refresh the browser on `/contact` to confirm the route resolves without 404.

### Expected Output
Smooth, instantaneous page transitions without full-page reloads, active navigation link highlighting, dynamic project filtering, and a functional validated contact form.

### Viva Questions & Answers
1. **Q: How does React Router enable Single-Page Application (SPA) navigation without page refreshes?**  
   *A:* React Router intercepts browser link clicks, prevents default browser HTTP navigation via the HTML5 History API (`pushState`, `replaceState`, and `popstate` events), and dynamically renders the matching component tree without reloading the page.
2. **Q: What is a controlled component in React?**  
   *A:* A controlled component is an input element whose value is bound to and controlled by React component state (`value={state}` and `onChange={(e) => setState(e.target.value)}`), making React state the single source of truth.
3. **Q: What is the purpose of the `NavLink` component?**  
   *A:* `NavLink` is a specialized version of `Link` that automatically detects when its target route matches the current URL and applies an `active` class or active styling function, ideal for navigation bars.
4. **Q: Why do SPAs encounter 404 errors on browser refresh in production, and how is it resolved?**  
   *A:* In production, a static web server looks for a physical file matching `/contact`. Because the route exists only in client-side JavaScript memory, the server returns 404. The fix is configuring a SPA fallback on the web server (e.g., Nginx `try_files $uri $uri/ /index.html;`) to redirect all non-file requests to `index.html`.
5. **Q: When should state be lifted up to a parent component?**  
   *A:* When multiple sibling components need access to the same state or need to synchronize changes, the state should be lifted up to their closest common ancestor.

---

# PRACTICAL 3: API INTEGRATION AND DATA RENDERING IN REACT

### Aim
Consume a public REST API (GitHub API v3) to dynamically fetch and display repository data while managing asynchronous lifecycles, loading indicators, error handling, and empty states.

### Requirements & Problem Statement
- Make asynchronous HTTP GET requests to GitHub's public API (`https://api.github.com/users/{username}/repos`).
- Manage side effects using the `useEffect` Hook with cleanup to prevent memory leaks and state updates on unmounted components.
- Present distinct UI states: Loading spinner, Success data grid, Error banner, and Empty repository state.
- Gracefully handle network failures and API rate limits by providing a resilient offline fallback dataset.

### Technologies Used
- React 18 (`useState`, `useEffect`)
- Browser Fetch API
- GitHub REST API v3

### Implementation Details
- `ReposPage.jsx`: Queries GitHub's `/users/{username}/repos` endpoint with sort parameters.
- Uses an `isMounted` flag in `useEffect` cleanup to avoid memory leak warnings.
- Catches HTTP 403 (rate limits) and 404 (user not found), falling back to offline project items so the student portfolio remains visually complete and testable.
- Displays star counts, fork counts, primary programming language, and last updated timestamps.

### Source Files
- [`frontend/src/pages/ReposPage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/ReposPage.jsx)

### Execution Commands
```bash
cd frontend
npm run dev
# Navigate to: http://localhost:5173/repos
```

### Testing Procedure
1. Navigate to `/repos`. Verify the loading spinner displays while fetching.
2. Inspect the returned repository cards (stars, forks, language badges, GitHub external link).
3. Enter an alternate username in the search input and click "Fetch Repos".
4. Disconnect network or query an invalid user to verify that the error toast displays and fallback data keeps the UI functional.

### Expected Output
Dynamic display of real GitHub repository data with interactive username search, graceful rate-limit handling, and responsive cards.

### Viva Questions & Answers
1. **Q: What is the role of the dependency array in the `useEffect` Hook?**  
   *A:* The dependency array tells React when to re-execute the effect. If omitted, the effect runs after every render. If empty (`[]`), it runs once when the component mounts. If it contains variables (`[username]`), the effect runs only when those specific variables change.
2. **Q: Why is cleanup necessary in `useEffect`?**  
   *A:* Cleanup functions (returned from the effect) cancel subscriptions, clear timers, or abort in-flight HTTP requests (`AbortController`), preventing memory leaks and avoiding updates on unmounted components.
3. **Q: What is the difference between Axios and the native `fetch` API?**  
   *A:* `fetch` is built into browsers, does not reject HTTP error statuses (like 404 or 500) automatically, and requires manual `res.json()` parsing. Axios automatically transforms JSON, rejects non-2xx status codes, supports request/response interceptors, and handles request cancellation.
4. **Q: What causes CORS issues when calling public APIs from a frontend?**  
   *A:* Cross-Origin Resource Sharing (CORS) is a browser security mechanism that restricts web pages from making AJAX requests to a different domain, port, or protocol unless the target server explicitly returns an `Access-Control-Allow-Origin` header allowing the caller.
5. **Q: How should sensitive API keys be stored in a React frontend?**  
   *A:* Frontend code is public; environment variables prefixed with `VITE_` are bundled into client JavaScript and can be inspected by anyone. Sensitive credentials must never be in frontend code; they should reside in a backend server that proxies the requests.

---

# PRACTICAL 4: BUILDING A RESTFUL API WITH NODE.JS AND EXPRESS

### Aim
Build a structured, modular RESTful API for task management featuring CRUD endpoints, custom request logging middleware, centralized error handling, and consistent JSON responses.

### Requirements & Problem Statement
- Architect an Express backend with clear separation of routes, controllers, models, and middleware.
- Implement RESTful endpoints:
  - `GET /api/health`
  - `GET /api/tasks`
  - `GET /api/tasks/:id`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Implement custom HTTP request logging middleware recording method, path, response status, and duration in milliseconds.
- Implement centralized error-handling middleware returning standardized JSON error schemas.
- Validate request bodies and route parameters (e.g. valid IDs).

### Technologies Used
- Node.js (v20+)
- Express.js (v4.21+)
- CORS & Dotenv

### Implementation Details
- `server.js`: Configures Express application, binds to `0.0.0.0:5000`, mounts routers, and attaches logging and error middlewares.
- `loggerMiddleware.js`: Listens to `res.on('finish')` event to measure elapsed time and color-code response codes.
- `errorHandler.js`: Intercepts unhandled errors, formats CastError/ValidationError, and suppresses stack traces in production.
- `taskRoutes.js` & `taskController.js`: Modular route handlers returning HTTP 200, 201, 400, 404, and 500.

### Source Files
- [`backend/server.js`](file:///d:/AWDF_SEM5/backend/server.js)
- [`backend/routes/healthRoutes.js`](file:///d:/AWDF_SEM5/backend/routes/healthRoutes.js)
- [`backend/routes/taskRoutes.js`](file:///d:/AWDF_SEM5/backend/routes/taskRoutes.js)
- [`backend/controllers/taskController.js`](file:///d:/AWDF_SEM5/backend/controllers/taskController.js)
- [`backend/middleware/loggerMiddleware.js`](file:///d:/AWDF_SEM5/backend/middleware/loggerMiddleware.js)
- [`backend/middleware/errorHandler.js`](file:///d:/AWDF_SEM5/backend/middleware/errorHandler.js)

### Execution Commands
```bash
cd backend
npm run dev
```

### Testing Procedure
```bash
# Test Health
curl http://localhost:5000/api/health

# Test Root
curl http://localhost:5000/
```

### Expected Output
Standardized JSON responses containing `success: true/false`, descriptive messages, and accurate HTTP status codes.

### Viva Questions & Answers
1. **Q: What is Express middleware and what is the role of `next()`?**  
   *A:* Middleware functions have access to the request object (`req`), response object (`res`), and the next middleware function (`next`). Calling `next()` passes control to the next middleware in the pipeline; failing to call `next()` or send a response hangs the request.
2. **Q: What are the key architectural constraints of REST?**  
   *A:* Statelessness, Client-Server separation, Cacheability, Uniform Interface (standard HTTP verbs: GET, POST, PUT, DELETE), and Layered System.
3. **Q: What is the difference between PUT and PATCH?**  
   *A:* `PUT` is idempotent and replaces the entire resource with the payload provided. `PATCH` applies partial modifications to an existing resource.
4. **Q: Why must centralized error handling middleware take four arguments `(err, req, res, next)`?**  
   *A:* Express identifies error-handling middleware strictly by the function's arity (number of declared arguments). If four arguments are declared, Express treats it as an error handler; if three are declared, it is treated as regular middleware.
5. **Q: Why should a backend listen on `0.0.0.0` instead of `127.0.0.1`?**  
   *A:* `127.0.0.1` is the loopback interface accessible only from the local host itself. In containerized environments like Docker, listening on `0.0.0.0` binds the server to all network interfaces, allowing requests arriving from outside the container.

---

# PRACTICAL 5: MONGODB INTEGRATION AND SCHEMA DESIGN

### Aim
Connect the Express backend to MongoDB using Mongoose, define structured schemas with field validations, and guarantee persistent document storage.

### Requirements & Problem Statement
- Establish a resilient connection to MongoDB using Mongoose with timeout configurations.
- Design a `Task` schema with:
  - `title`: String, required, trimmed, max length 120.
  - `description`: String, trimmed, max length 500.
  - `status`: String, enum `['pending', 'in-progress', 'completed']`, default `'pending'`.
  - `priority`: String, enum `['low', 'medium', 'high']`, default `'medium'`.
  - `user`: ObjectId referencing `'User'`, required.
  - `timestamps`: Automatic `createdAt` and `updatedAt`.
- Index fields for query performance.
- Enforce validation rules and return user-friendly database validation errors.

### Technologies Used
- MongoDB & Mongoose (v8.9+)
- MongoDB BSON ObjectIDs

### Implementation Details
- `backend/config/db.js`: Encapsulates `mongoose.connect()` with `serverSelectionTimeoutMS: 5000` and diagnostic logging.
- `backend/models/Task.js`: Enforces schema constraints, custom enum validation error messages, and compound index `{ user: 1, createdAt: -1 }`.

### Source Files
- [`backend/config/db.js`](file:///d:/AWDF_SEM5/backend/config/db.js)
- [`backend/models/Task.js`](file:///d:/AWDF_SEM5/backend/models/Task.js)

### Execution Commands
```bash
cd backend
npm test
```

### Testing Procedure
1. Execute the automated test suite.
2. Confirm valid tasks with status and priority are saved to the database.
3. Attempt saving a task with an invalid status (e.g., `'archived'`) or an empty title, and confirm Mongoose rejects it with a validation error.

### Expected Output
Clean document insertion into the `tasks` collection with generated `_id` and ISO 8601 timestamps, with schema violations rejected with HTTP 400.

### Viva Questions & Answers
1. **Q: What is Mongoose and what advantages does it offer over the native MongoDB driver?**  
   *A:* Mongoose is an Object Data Modeling (ODM) library for MongoDB. It provides schema validation, type casting, middleware hooks (pre/post hooks), query building, and business logic methods that native MongoDB does not provide natively.
2. **Q: What is a BSON ObjectId and how is it constructed?**  
   *A:* An ObjectId is a 12-byte unique identifier composed of a 4-byte Unix timestamp, a 5-byte random value (machine and process identifier), and a 3-byte incrementing counter.
3. **Q: How does compound indexing optimize database queries?**  
   *A:* An index on `{ user: 1, createdAt: -1 }` creates a B-tree data structure that allows MongoDB to rapidly filter tasks belonging to a specific user and sort them by descending creation date without performing a costly in-memory collection scan (`COLLSCAN`).
4. **Q: What is the purpose of Mongoose timestamps `{ timestamps: true }`?**  
   *A:* It automatically adds and manages `createdAt` and `updatedAt` Date fields on documents upon creation and update.
5. **Q: What is the difference between embedding documents and referencing documents in MongoDB?**  
   *A:* Embedding stores related sub-documents inside the parent document (denormalized, ideal for 1:few relationships with atomic reads). Referencing stores the `ObjectId` of the related document in another collection (normalized, ideal for 1:many or many:many relationships, avoiding the 16MB document size limit).

---

# PRACTICAL 6: FULL-STACK INTEGRATION

### Aim
Connect the React Single-Page Application with the Express/Node.js REST API and MongoDB into a complete, functioning end-to-end full-stack web application.

### Requirements & Problem Statement
- Configure centralized API communication using an Axios client.
- Handle Cross-Origin Resource Sharing (CORS) between frontend (`http://localhost:5173` or `http://localhost:80`) and backend (`http://localhost:5000`).
- Implement end-to-end task operations via the user interface:
  - Task creation with title, description, status, and priority.
  - Task listing with real-time state synchronization.
  - Modal-based task editing with optimistic or refreshed state.
  - Task deletion with confirmation prompts.
- Display loading indicators and notification banners for user feedback.

### Technologies Used
- React 18, Axios
- Express, MongoDB, CORS middleware

### Implementation Details
- `frontend/src/api/client.js`: Configured Axios client with baseURL `/api` and automatic JWT header injection.
- `frontend/src/pages/TasksPage.jsx`: State variables `tasks`, `loading`, `showModal`, `editingTask`, and `notification`.
- Triggers `GET`, `POST`, `PUT`, `DELETE` HTTP calls with dynamic UI updates.

### Source Files
- [`frontend/src/api/client.js`](file:///d:/AWDF_SEM5/frontend/src/api/client.js)
- [`frontend/src/pages/TasksPage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/TasksPage.jsx)
- [`backend/server.js`](file:///d:/AWDF_SEM5/backend/server.js)

### Execution Commands
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Testing Procedure
1. Open `http://localhost:5173/tasks` in the browser.
2. Click "Create New Task", fill in task details, and submit.
3. Verify the task immediately renders in the dashboard.
4. Click "Edit", modify the status to "Completed", and submit. Verify the badge changes to green.
5. Click "Delete" and confirm. Verify the item disappears from the list.

### Expected Output
A responsive task management UI performing live CRUD operations against the Express backend and persisting changes in MongoDB.

### Viva Questions & Answers
1. **Q: What is an API base URL and why should it be centralized?**  
   *A:* An API base URL is the common root prefix for all backend endpoints. Centralizing it in a single configuration file or environment variable (`VITE_API_URL`) ensures that changing deployment domains (e.g., from `http://localhost:5000` to a cloud server or Docker reverse proxy) requires editing only one line of code.
2. **Q: What is an Axios interceptor?**  
   *A:* An interceptor is a middleware function that Axios executes before a request is sent (e.g., automatically attaching a JWT token to the `Authorization` header) or before a response is handled by `then`/`catch` (e.g., handling global 401 Unauthorized errors).
3. **Q: How does the Vite development server proxy solve CORS in development?**  
   *A:* The Vite proxy intercepts client requests to `/api` and forwards them server-to-server to `http://localhost:5000`. Because CORS is a browser security constraint, server-to-server requests bypass CORS completely.
4. **Q: What is optimistic UI updating versus pessimistic UI updating?**  
   *A:* Optimistic updating updates the local UI immediately before the server responds, assuming success and rolling back if an error occurs. Pessimistic updating waits for the server's successful HTTP response before updating the UI, ensuring consistency at the expense of slight UI latency.
5. **Q: What HTTP status code should be returned after successfully creating a resource?**  
   *A:* HTTP `201 Created`, typically accompanied by the newly created resource in the response body.

---

# PRACTICAL 7: AUTHENTICATION AND MIDDLEWARE PIPELINE

### Aim
Implement secure user registration, login, bcrypt password hashing, JSON Web Token (JWT) generation, and authentication middleware for user task isolation.

### Requirements & Problem Statement
- Design a `User` schema with fields: `name`, `email` (unique, validated), and `password`.
- Never store plain-text passwords; hash passwords using `bcryptjs` with salt rounds.
- Generate signed JWT access tokens using a secret key.
- Implement an `authMiddleware` that validates Bearer tokens from the `Authorization` header and populates `req.user`.
- Protect all `/api/tasks` routes so unauthenticated requests are rejected with HTTP 401.
- Ensure strict multi-tenant isolation: Users cannot view, update, or delete tasks belonging to other users (HTTP 403 Forbidden).

### Technologies Used
- `bcryptjs` (v2.4+)
- `jsonwebtoken` (v9.0+)
- Express Middleware & Mongoose

### Implementation Details
- `User.js`: Pre-save hook hashes password using `bcrypt.hash(password, 10)` only when modified. The `password` field is configured with `select: false`.
- `authController.js`: Issues JWT with `{ id: user._id }` payload and expiration period (`7d`).
- `authMiddleware.js`: Extracts `Bearer <token>`, calls `jwt.verify()`, and injects the user into `req.user`.
- `taskController.js`: Enforces ownership check `if (task.user.toString() !== req.user._id.toString()) return res.status(403)`.

### Source Files
- [`backend/models/User.js`](file:///d:/AWDF_SEM5/backend/models/User.js)
- [`backend/controllers/authController.js`](file:///d:/AWDF_SEM5/backend/controllers/authController.js)
- [`backend/middleware/authMiddleware.js`](file:///d:/AWDF_SEM5/backend/middleware/authMiddleware.js)
- [`frontend/src/context/AuthContext.jsx`](file:///d:/AWDF_SEM5/frontend/src/context/AuthContext.jsx)
- [`frontend/src/pages/LoginPage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/LoginPage.jsx)
- [`frontend/src/pages/RegisterPage.jsx`](file:///d:/AWDF_SEM5/frontend/src/pages/RegisterPage.jsx)

### Execution Commands
```bash
cd backend
npm test
```

### Testing Procedure
1. Register User A (`dhruv@test.com`) and create a task.
2. Register User B (`userb@test.com`).
3. Attempt to fetch or delete User A's task using User B's token.
4. Verify the server returns HTTP 403 Forbidden.
5. Attempt request without token and verify HTTP 401 Unauthorized.

### Expected Output
Secure user authentication, encrypted passwords in the database, and strict per-user task isolation.

### Viva Questions & Answers
1. **Q: What is a JSON Web Token (JWT) and what are its three parts?**  
   *A:* A JWT is a compact, URL-safe means of representing claims securely between two parties. Its three parts are: Header (algorithm & token type), Payload (user claims & expiry), and Signature (HMAC-SHA256 hash of header + payload signed with a secret).
2. **Q: Why should passwords never be stored in plain text or using MD5/SHA1?**  
   *A:* Plaintext exposes user credentials immediately if the database is breached. Fast hash functions like MD5 or SHA1 can be cracked in seconds using precomputed rainbow tables or GPU brute-force attacks. Bcrypt is deliberately slow and includes an adaptive cost factor (salt rounds) that mitigates brute-force attacks.
3. **Q: What is salt in password hashing?**  
   *A:* A salt is a cryptographically random string appended to the password before hashing. It ensures that two users with identical passwords have completely distinct hashes, preventing rainbow table lookups.
4. **Q: What is the difference between Authentication and Authorization?**  
   *A:* Authentication verifies *who* the user is (e.g., logging in with email and password). Authorization determines *what* permissions the authenticated user has (e.g., allowing a user to delete only their own tasks).
5. **Q: Where should JWT tokens be stored on the client side?**  
   *A:* For single-page web applications, tokens are often stored in `localStorage` or memory, but storing them in an `httpOnly`, `secure`, `SameSite=Strict` cookie is the most secure approach because JavaScript cannot read `httpOnly` cookies, protecting against Cross-Site Scripting (XSS).

---

# PRACTICAL 8: PERFORMANCE OPTIMIZATION AND LAZY LOADING

### Aim
Optimize frontend delivery, reduce initial JavaScript bundle size, and accelerate First Contentful Paint (FCP) through route-based code splitting using `React.lazy()` and `<Suspense>`.

### Requirements & Problem Statement
- Analyze standard monolithic client bundles where all pages are loaded on first visit.
- Split route pages (`HomePage`, `ProjectsPage`, `ReposPage`, `TasksPage`, `ContactPage`, `LoginPage`, `RegisterPage`) into separate asynchronous chunks using `React.lazy()`.
- Wrap routes in a `<Suspense>` boundary displaying a `<LoadingSpinner>` fallback while fetching chunks.
- Configure Rollup manual chunks in Vite for vendor library separation.
- Build production frontend and verify generated chunks.

### Technologies Used
- React 18 Dynamic Imports (`React.lazy`, `<Suspense>`)
- Vite & Rollup Chunk Splitting

### Implementation Details
- `frontend/src/App.jsx`: Replaced static imports with `const TasksPage = lazy(() => import('./pages/TasksPage'));`.
- `frontend/vite.config.js`: Added `rollupOptions.output.manualChunks` splitting `vendor` (`react`, `react-dom`, `react-router-dom`) and `network` (`axios`).

### Source Files
- [`frontend/src/App.jsx`](file:///d:/AWDF_SEM5/frontend/src/App.jsx)
- [`frontend/vite.config.js`](file:///d:/AWDF_SEM5/frontend/vite.config.js)
- [`frontend/src/components/LoadingSpinner.jsx`](file:///d:/AWDF_SEM5/frontend/src/components/LoadingSpinner.jsx)

### Execution Commands
```bash
cd frontend
npm run build
```

### Testing Procedure
1. Run `npm run build` in the `frontend` folder.
2. Inspect the terminal output showing distinct chunk files in `dist/assets/`.
3. Verify that vendor code is isolated into `vendor-[hash].js` and individual pages are separate chunks loaded on demand.

### Expected Output
Vite outputs separate `.js` files for each lazy-loaded page route rather than a single monolithic `index.js` file, improving initial page load performance.

### Viva Questions & Answers
1. **Q: What is Code Splitting and why is it important in SPAs?**  
   *A:* Code splitting is the practice of splitting a large JavaScript bundle into smaller chunks loaded on demand. It significantly reduces initial page load time, saves mobile data, and improves Core Web Vitals (FCP and LCP).
2. **Q: What is the purpose of the `<Suspense>` component in React?**  
   *A:* `<Suspense>` lets you display a fallback UI (like a loading spinner or skeleton) while its child components are waiting for an asynchronous operation—such as downloading a lazy-loaded chunk or fetching data—to complete.
3. **Q: What happens if a lazy-loaded component fails to download due to a network drop?**  
   *A:* The promise rejected by the dynamic `import()` throws an error in the React component tree. If not caught, the application crashes. An Error Boundary component should wrap `<Suspense>` to display a retry button.
4. **Q: What is Tree Shaking?**  
   *A:* Tree shaking is a build-tool optimization (utilized by Vite and Rollup) that analyzes static ES module `import`/`export` statements to eliminate dead or unused JavaScript code from the final production bundle.
5. **Q: How does route-based code splitting differ from component-based code splitting?**  
   *A:* Route-based code splitting splits code at page boundaries (e.g., loading `/tasks` code only when visiting `/tasks`). Component-based code splitting splits heavy standalone widgets (like a rich text editor or charting library) that render only conditionally.

---

# PRACTICAL 9: IN-MEMORY CACHING AND QUERY OPTIMIZATION

### Aim
Implement an in-memory caching layer for the `GET /api/tasks` endpoint using `node-cache`, implement cache invalidation upon data mutations, and measure response latency improvements.

### Requirements & Problem Statement
- Prevent repetitive database roundtrips for identical read queries.
- Install and configure `node-cache` with a configurable Time-To-Live (TTL).
- Generate user-specific cache keys: `tasks:user:<userId>:<queryParams>` to prevent cache leakage across users.
- Invalidate relevant user cache keys when tasks are created, updated, or deleted.
- Add `X-Cache` (`HIT` or `MISS`) and `X-Response-Time-Ms` HTTP headers.
- Write an automated benchmark script comparing database query latency versus cache hit latency.

### Technologies Used
- `node-cache` (v5.1+)
- Node.js High-Resolution Timer (`performance.now()`)

### Implementation Details
- `backend/utils/cache.js`: Singleton instance with `stdTTL: 60`, key generator `getTasksCacheKey`, and `invalidateUserTasksCache`.
- `backend/controllers/taskController.js`: Checks cache on `GET /api/tasks`. If present, returns in ~0.5ms with `X-Cache: HIT`. If missing, queries MongoDB, populates cache, and returns with `X-Cache: MISS`.
- Invalidation called inside `createTask`, `updateTask`, and `deleteTask`.

### Source Files
- [`backend/utils/cache.js`](file:///d:/AWDF_SEM5/backend/utils/cache.js)
- [`backend/controllers/taskController.js`](file:///d:/AWDF_SEM5/backend/controllers/taskController.js)
- [`backend/tests/cache-benchmark.js`](file:///d:/AWDF_SEM5/backend/tests/cache-benchmark.js)

### Execution Commands
```bash
cd backend
npm run test:cache
```

### Testing Procedure
1. Execute the benchmark script: `npm run test:cache`.
2. Inspect the output comparing cold database fetch latency (~30ms) against cached fetch latency (~0.1ms).
3. Verify that calling `invalidateUserTasksCache` purges keys and forces a fresh query.

### Expected Output
Demonstrated latency reduction of **50x to 100x** on cached reads with immediate invalidation upon task mutation.

### Viva Questions & Answers
1. **Q: What is in-memory caching and why is it faster than database queries?**  
   *A:* In-memory caching stores data directly in the application's RAM (random-access memory) as JavaScript objects. Accessing RAM has microsecond latency, whereas database queries require serialization, TCP socket communication, disk I/O, and query parsing.
2. **Q: What is Cache Invalidation and why is it challenging?**  
   *A:* Cache invalidation is the process of purging or updating cached data when the underlying database records change. It is challenging because failing to invalidate causes stale or incorrect data to be served to users, while over-invalidating degrades performance.
3. **Q: What is Time-To-Live (TTL) in caching?**  
   *A:* TTL is a timer associated with a cached key defining how long the item remains valid before being automatically expired and removed by the caching engine.
4. **Q: Why must cache keys include the user ID in multi-user applications?**  
   *A:* If cache keys are generic (e.g., `tasks_all`), User A's private tasks would be returned from the cache to User B, creating a severe data breach. Keys must be isolated by user identity (e.g., `tasks:user:123`).
5. **Q: What is the difference between an in-process cache (like `node-cache`) and a distributed cache (like Redis)?**  
   *A:* `node-cache` lives inside the single Node.js process memory; it is fast and simple, but lost on process restart and not shared across multiple load-balanced server instances. Redis is an external distributed in-memory database accessible across multiple server instances.

---

# PRACTICAL 10: ASYNCHRONOUS PROCESSING WITH EVENTEMITTER

### Aim
Implement decoupled asynchronous background processing using Node.js's native `EventEmitter` to process task creation notifications without blocking the HTTP response cycle.

### Requirements & Problem Statement
- Utilize the native `node:events` module.
- Emit a `task-created` event after a task is successfully committed to MongoDB.
- Process the event asynchronously (e.g., notification simulation, audit logging, analytics) on the event loop.
- Return the HTTP 201 response immediately without waiting for background worker completion.
- Record and demonstrate timestamps proving non-blocking behavior.
- Ensure event listeners are registered only once to prevent memory leaks and duplicate execution on hot reloads.

### Technologies Used
- Node.js built-in `node:events` module
- Asynchronous Promise / `setImmediate` execution

### Implementation Details
- `backend/utils/eventEmitter.js`: Extends `EventEmitter`, defines `TASK_CREATED_EVENT`, and guards against duplicate listeners via `isListenerRegistered`.
- `backend/controllers/taskController.js`: Captures emission timestamp `emittedAt`, emits event with task payload, and immediately sends HTTP 201 response.
- Background listener handles notification logging asynchronously.

### Source Files
- [`backend/utils/eventEmitter.js`](file:///d:/AWDF_SEM5/backend/utils/eventEmitter.js)
- [`backend/controllers/taskController.js`](file:///d:/AWDF_SEM5/backend/controllers/taskController.js)
- [`backend/tests/event-emitter.test.js`](file:///d:/AWDF_SEM5/backend/tests/event-emitter.test.js)

### Execution Commands
```bash
cd backend
npm run test:events
```

### Testing Procedure
1. Execute `npm run test:events`.
2. Inspect log timestamps showing HTTP response completion timestamp occurring before the background event handler finishes.

### Expected Output
Clean execution logs proving that the client receives its response immediately while background work completes independently.

### Viva Questions & Answers
1. **Q: What is an EventEmitter in Node.js?**  
   *A:* `EventEmitter` is a core Node.js class in the `events` module that implements the Observer pattern, allowing objects to emit named events that trigger registered listener functions.
2. **Q: Does EventEmitter run code in separate worker threads?**  
   *A:* No. Standard EventEmitter listeners execute synchronously or asynchronously within the same single-threaded Node.js event loop. Asynchronous decoupling is achieved by scheduling work with `setImmediate()`, `process.nextTick()`, or `setTimeout()`.
3. **Q: What are the architectural limitations of in-process EventEmitter?**  
   *A:* Because EventEmitter is in-memory and in-process, events are lost if the server crashes before processing them. It cannot distribute jobs across multiple server instances. For mission-critical background jobs, persistent message brokers (like RabbitMQ, Kafka, or Redis BullMQ) are used.
4. **Q: What is the cause of the `MaxListenersExceededWarning`?**  
   *A:* By default, an `EventEmitter` prints a warning if more than 10 listeners are added for a single event to help developers catch memory leaks (such as registering new listeners inside an HTTP request handler).
5. **Q: What is the difference between `emitter.on()` and `emitter.once()`?**  
   *A:* `emitter.on()` registers a persistent listener invoked every time the event is emitted. `emitter.once()` registers a one-time listener that automatically unregisters itself after being triggered once.

---

# PRACTICAL 11: CONTAINERIZATION WITH DOCKER AND DOCKER COMPOSE

### Aim
Containerize the complete multi-tier application stack (React SPA, Express API, MongoDB) using multi-stage Dockerfiles and Docker Compose orchestration with persistent storage and internal networking.

### Requirements & Problem Statement
- Create an optimized production Dockerfile for the Express backend using Node.js Alpine and a non-root user.
- Create a multi-stage Dockerfile for the React frontend (Vite builder -> Nginx Alpine server).
- Configure Nginx with SPA routing fallback (`try_files $uri $uri/ /index.html;`) and reverse proxy (`/api/` -> `http://backend:5000/api/`).
- Create a root `compose.yaml` orchestrating `frontend`, `backend`, and `mongodb` services.
- Configure an isolated bridge network `itue301_network`.
- Configure a persistent named volume `itue301_mongo_data` for MongoDB.
- Add database health checks and service dependency conditions.

### Technologies Used
- Docker Engine
- Docker Compose v2
- Nginx Alpine
- Node.js 20 Alpine
- MongoDB 7.0

### Implementation Details
- `backend/Dockerfile`: Copies package files, installs production dependencies, sets `USER node`, exposes port 5000, runs `node server.js`.
- `frontend/Dockerfile`: Stage 1 builds React bundle with Vite. Stage 2 copies output to Nginx, copies `nginx.conf`, exposes port 80.
- `compose.yaml`: Connects services via internal DNS hostnames (`backend`, `mongodb`), mounts persistent volume, exposes frontend on port 80.

### Source Files
- [`backend/Dockerfile`](file:///d:/AWDF_SEM5/backend/Dockerfile)
- [`backend/.dockerignore`](file:///d:/AWDF_SEM5/backend/.dockerignore)
- [`frontend/Dockerfile`](file:///d:/AWDF_SEM5/frontend/Dockerfile)
- [`frontend/nginx.conf`](file:///d:/AWDF_SEM5/frontend/nginx.conf)
- [`frontend/.dockerignore`](file:///d:/AWDF_SEM5/frontend/.dockerignore)
- [`compose.yaml`](file:///d:/AWDF_SEM5/compose.yaml)
- [`docker-compose.yml`](file:///d:/AWDF_SEM5/docker-compose.yml)

### Execution Commands
```bash
# Build and run containers
docker compose up --build -d

# Check running status
docker compose ps

# View container logs
docker compose logs -f

# Verify persistence across restarts
docker compose restart
```

### Testing Procedure
1. Execute `docker compose up --build -d`.
2. Verify all three services report `Up` via `docker compose ps`.
3. Open `http://localhost` in the browser; register a user and create tasks.
4. Run `docker compose restart` or `docker compose down` followed by `docker compose up -d`.
5. Re-open `http://localhost` and verify all tasks and users are preserved in MongoDB.

### Expected Output
Three healthy containers running in harmony, fully accessible via `http://localhost`, with API reverse proxying, SPA routing, and persistent database storage.

### Viva Questions & Answers
1. **Q: What is the difference between a Docker Image and a Docker Container?**  
   *A:* An Image is an immutable, read-only template with instructions and layers defining an application and its dependencies. A Container is a runnable, isolated instance of an image with a thin read-write layer on top.
2. **Q: Why are multi-stage Docker builds beneficial?**  
   *A:* Multi-stage builds separate the build environment from the runtime environment. Bulky build tools, compilers, source code, and development dependencies are discarded; only the final production artifacts (e.g., compiled static assets inside a lightweight Nginx image) are copied, drastically reducing image size and attack surface.
3. **Q: Why can a browser not connect to `http://mongodb:27017` or `http://backend:5000` directly?**  
   *A:* Docker container hostnames (like `backend` or `mongodb`) resolve only within the internal Docker bridge network via Docker's embedded DNS server. The client's web browser runs on the host machine outside that private network and cannot resolve internal Docker hostnames. Reverse proxying via Nginx resolves this.
4. **Q: What is a Docker Volume and why is it necessary for databases?**  
   *A:* Containers are ephemeral; by default, any data written inside a container's writable layer is permanently lost when the container is deleted. Docker Volumes are storage directories managed by Docker outside the container filesystem on the host machine, ensuring database persistence across container removals and upgrades.
5. **Q: What is the difference between `docker compose down` and `docker compose down -v`?**  
   *A:* `docker compose down` stops and removes containers and networks, leaving named volumes intact. `docker compose down -v` also deletes all named volumes, which would permanently erase all database data.

---
*End of ITUE301 Practicals 1 to 11 Manual — Prepared for CHARUSAT Practical Examination*
