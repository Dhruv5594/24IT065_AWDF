# CHARUSAT — ITUE301 Advanced Web Development Frameworks
# Complete Guide to Docker & Docker Compose Containerization

**Student:** Dhruv Patel  
**Course Code:** ITUE301 (AWDF)  
**Topic:** Practical 11 Containerization Architecture  

---

## 1. What is Docker?

Docker is an open-source platform that enables developers to automate the deployment, scaling, and management of applications inside lightweight, portable, self-sufficient environments called **containers**.

Unlike traditional Virtual Machines (VMs), which virtualize the entire hardware layer and require a guest operating system (OS), Docker containers virtualize at the OS kernel level. Containers share the host machine's Linux/Windows kernel, making them:
- **Instantaneous to boot** (seconds vs minutes for VMs).
- **Lightweight** (megabytes vs tens of gigabytes).
- **Resource-efficient** with minimal memory and CPU overhead.
- **Consistent across environments** ("It works on my machine" problem solved).

---

## 2. Core Concepts

### A. Docker Images vs Containers
- **Image:** An immutable, read-only template consisting of stacked layers (file system snapshots) and metadata instructions. An image contains everything needed to run an application: code, runtime, system libraries, environment variables, and configuration files.
- **Container:** A runnable, living instance of an image. When you execute `docker run`, Docker creates an isolated process sandbox with a thin, writable layer on top of the immutable image layers.

### B. Dockerfile Directives Explained
A `Dockerfile` is a text script containing sequential instructions that Docker executes to assemble an image:

| Directive | Purpose in our ITUE301 Project | Example |
| :--- | :--- | :--- |
| `FROM` | Specifies the base parent image | `FROM node:20-alpine AS builder` |
| `WORKDIR` | Sets the working directory inside the container | `WORKDIR /app` |
| `COPY` | Copies files from the host to the container filesystem | `COPY package*.json ./` |
| `RUN` | Executes shell commands during image build time | `RUN npm ci --only=production` |
| `USER` | Switches user context away from root for security | `USER node` |
| `EXPOSE` | Documents the port on which the container listens | `EXPOSE 5000` |
| `ENV` | Sets persistent environment variables inside the container | `ENV NODE_ENV=production` |
| `CMD` | Defines the default command to execute when container starts | `CMD ["node", "server.js"]` |

---

## 3. Multi-Stage Builds: Why and How

In traditional single-stage builds, an image includes compiler tools, npm package managers, devDependencies, and raw source code, bloating the image to over **1.2 GB**.

Our frontend uses a **Multi-Stage Build** in [`frontend/Dockerfile`](file:///d:/AWDF_SEM5/frontend/Dockerfile):

```dockerfile
# STAGE 1: Build the React Application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # Produces optimized dist/ HTML/JS/CSS assets

# STAGE 2: Minimal Production Web Server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Benefits of Multi-Stage Architecture:
1. **Dramatic Size Reduction:** The final image contains *only* Nginx and compiled HTML/JS/CSS, dropping image size from **~1.1 GB** down to **~25 MB** (over 97% reduction).
2. **Security Hardening:** The production image contains no Node.js runtime, npm binaries, or build tools, eliminating attack surfaces.
3. **No Leaked Code:** Raw JSX components and config files are discarded after build.

---

## 4. Docker Networking & The Browser Dilemma

Understanding how network boundaries interact is one of the most critical topics for university practical viva examinations:

```
+-------------------------------------------------------------------------------+
| HOST MACHINE (Windows / Browser)                                              |
|                                                                               |
|  * User opens browser: http://localhost:80 (Mapped to itue301-frontend)       |
|  * Browser CANNOT resolve http://backend:5000 or http://mongodb:27017!         |
+-------------------------------------------------------------------------------+
                                      |
                         (Port 80 Host Port Mapping)
                                      v
+-------------------------------------------------------------------------------+
| DOCKER BRIDGE NETWORK: itue301_network (Private Subnet)                       |
|                                                                               |
|  1. itue301-frontend (Nginx):                                                 |
|     * Serves React files to browser                                           |
|     * Proxies /api/ requests internally to http://backend:5000/api/           |
|                                                                               |
|  2. itue301-backend (Express):                                                |
|     * Resolves and connects to: mongodb://mongodb:27017/itue301_db            |
|                                                                               |
|  3. itue301-mongodb (Database):                                               |
|     * Listens on internal port 27017                                          |
+-------------------------------------------------------------------------------+
```

### Why we use Nginx Reverse Proxy:
If the React application in the browser called `http://backend:5000/api`, it would fail because the browser executes on the host computer where the hostname `backend` does not exist in Windows DNS.  
By configuring Nginx in `frontend/nginx.conf`:
```nginx
location /api/ {
    proxy_pass http://backend:5000/api/;
    proxy_set_header Host $host;
}
```
The browser sends all API calls to `http://localhost/api/...`. Nginx on the Docker network receives this request and securely forwards it to `http://backend:5000/api/`. This completely eliminates CORS issues and hostname resolution errors.

---

## 5. Persistent Storage with Named Volumes

Containers are ephemeral by design. When a container is removed (`docker rm`), any data written inside its container layer is destroyed.

In [`compose.yaml`](file:///d:/AWDF_SEM5/compose.yaml), we attach a **Named Docker Volume**:
```yaml
services:
  mongodb:
    image: mongo:7.0
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
    name: itue301_mongo_data
```

### Volume Behavior:
- The directory `/data/db` inside the MongoDB container is mapped to a Docker-managed storage directory on the host.
- When you execute `docker compose down`, the container stops and is removed, but `itue301_mongo_data` remains intact.
- When you bring containers back up with `docker compose up -d`, MongoDB mounts the existing volume and all users and tasks are preserved!
- **Warning:** Running `docker compose down -v` deletes the named volumes and permanently removes your database data.

---

## 6. Docker Compose Commands Reference

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Build & Start (Background)** | `docker compose up --build -d` | Builds images and starts all 3 services in detached mode |
| **Check Status** | `docker compose ps` | Displays container names, status (Up/Exit), and port mappings |
| **View Logs (Recent 100)** | `docker compose logs --tail=100` | Shows the last 100 log lines from all containers |
| **Follow Live Logs** | `docker compose logs -f` | Streams real-time console output from all containers |
| **Follow Specific Service** | `docker compose logs -f backend` | Streams logs exclusively from the Express backend container |
| **Restart Services** | `docker compose restart` | Restarts all containers without deleting them |
| **Stop & Remove Containers** | `docker compose down` | Safely stops containers and networks, preserving database volumes |
| **Validate Configuration** | `docker compose config` | Parses and validates the YAML syntax and environment values |
| **Execute Shell in Container** | `docker exec -it itue301-backend sh` | Opens an interactive terminal inside the running container |

---

## 7. Troubleshooting Common Docker Issues

### Issue 1: Port Conflict (Error: `listen tcp 0.0.0.0:80: bind: address already in use`)
- **Cause:** Another process on Windows (like IIS, Skype, or Apache) is already using port 80.
- **Solution:** In `compose.yaml`, change the frontend port mapping from `"80:80"` to `"3000:80"`:
  ```yaml
  ports:
    - "3000:80"
  ```
  Then access the frontend at `http://localhost:3000`.

### Issue 2: Backend Cannot Connect to MongoDB (`MongoServerSelectionError`)
- **Cause:** Backend attempted to connect before MongoDB finished initializing its storage engine.
- **Solution:** Our `compose.yaml` uses a Docker health check:
  ```yaml
  depends_on:
    mongodb:
      condition: service_healthy
  ```
  This ensures the backend container starts *only after* MongoDB passes `mongosh ping`.

### Issue 3: Docker Daemon is Not Running
- **Cause:** Docker Desktop is closed or WSL2 is not enabled.
- **Solution:** Launch "Docker Desktop" from the Windows Start menu, wait until the tray icon turns steady green, and verify via PowerShell with `docker info`.

---

## 8. Five Key Viva Questions on Docker Containerization

1. **Q: What is the purpose of `.dockerignore`?**  
   *A:* Similar to `.gitignore`, `.dockerignore` prevents files (like `node_modules`, `.env`, `.git`, temporary logs) from being copied into the Docker build context. This speeds up build times and prevents local host secrets and host-compiled binaries from contaminating the container.
2. **Q: Why should containers run as a non-root user?**  
   *A:* By default, processes inside a container run as the root user (`UID 0`). If an application vulnerability allows container escape, the attacker gains root privileges on the host kernel. Switching to a non-root user (`USER node`) enforces the principle of least privilege.
3. **Q: What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile?**  
   *A:* `ENTRYPOINT` specifies the executable binary that should always run when the container starts. `CMD` provides default arguments that can be easily overridden by passing arguments to `docker run`.
4. **Q: How does Docker Compose resolve service names into IP addresses?**  
   *A:* Docker Compose creates a user-defined bridge network with an internal DNS server (listening at `127.0.0.11` inside each container). When a container queries the hostname `mongodb`, Docker's embedded DNS server resolves it to the private IP assigned to that service.
5. **Q: What is a Docker Healthcheck?**  
   *A:* A `HEALTHCHECK` directive instructs Docker how to periodically test if a container is functioning correctly (e.g., executing a command or pinging an HTTP endpoint). Containers can transition between `starting`, `healthy`, and `unhealthy` states, enabling Compose to manage service dependencies reliably.
