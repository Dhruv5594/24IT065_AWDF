import http from 'http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

let mongoServer;
let serverInstance;
let baseURL;

const runTests = async () => {
  console.log('========================================================');
  console.log('STARTING ITUE301 FULL AUTOMATED INTEGRATION TEST SUITE');
  console.log('========================================================\n');

  try {
    // 1. Initialize In-Memory MongoDB Server for self-contained testing
    console.log('[Setup] Starting MongoMemoryServer...');
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`[Setup] In-Memory MongoDB running at: ${uri}`);

    // Disconnect default connection if active and reconnect to memory server
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(uri);
    console.log('[Setup] Connected Mongoose to test memory database.');

    // 2. Start HTTP Test Server on random available port
    const testPort = 5555;
    await new Promise((resolve) => {
      serverInstance = app.listen(testPort, () => {
        baseURL = `http://127.0.0.1:${testPort}`;
        console.log(`[Setup] Express test instance listening at ${baseURL}\n`);
        resolve();
      });
    });

    let passCount = 0;
    let failCount = 0;

    const assert = (condition, testName) => {
      if (condition) {
        console.log(`  ✅ [PASS] ${testName}`);
        passCount++;
      } else {
        console.error(`  ❌ [FAIL] ${testName}`);
        failCount++;
      }
    };

    // Helper fetch wrapper
    const request = async (path, options = {}) => {
      const url = `${baseURL}${path}`;
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      });
      const data = await res.json().catch(() => ({}));
      return { status: res.status, headers: res.headers, data };
    };

    // ----------------------------------------------------
    // TEST 1: Health Endpoint (Practical 4)
    // ----------------------------------------------------
    console.log('--- TEST GROUP 1: HEALTH ENDPOINT (PRACTICAL 4) ---');
    const healthRes = await request('/api/health');
    assert(healthRes.status === 200, 'GET /api/health returns 200 OK');
    assert(healthRes.data.success === true, 'Health response success flag is true');
    assert(healthRes.data.database.connected === true, 'Health check confirms database is connected');

    // ----------------------------------------------------
    // TEST 2: Authentication & Validation (Practical 7)
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 2: AUTHENTICATION & VALIDATION (PRACTICAL 7) ---');
    // Register User A
    const regResA = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Dhruv Patel',
        email: 'dhruv@test.com',
        password: 'password123',
      }),
    });
    assert(regResA.status === 201, 'POST /api/auth/register returns 201 Created');
    assert(!!regResA.data.token, 'Registration returns valid JWT access token');
    assert(regResA.data.user.email === 'dhruv@test.com', 'User email correctly persisted');
    const tokenA = regResA.data.token;

    // Duplicate Registration Rejection
    const dupRes = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Dhruv Duplicate',
        email: 'dhruv@test.com',
        password: 'password123',
      }),
    });
    assert(dupRes.status === 400, 'Duplicate email registration rejected with 400 Bad Request');

    // Login with Valid Credentials
    const loginRes = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'dhruv@test.com',
        password: 'password123',
      }),
    });
    assert(loginRes.status === 200, 'POST /api/auth/login returns 200 OK');
    assert(!!loginRes.data.token, 'Login returns JWT token');

    // Login with Invalid Credentials
    const badLoginRes = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'dhruv@test.com',
        password: 'wrongpassword',
      }),
    });
    assert(badLoginRes.status === 401, 'Invalid password rejected with 401 Unauthorized');

    // ----------------------------------------------------
    // TEST 3: Protected Route & Task CRUD (Practical 4, 5, 6, 7)
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 3: CRUD ENDPOINTS & DATA VALIDATION (PRACTICAL 4, 5, 6, 7) ---');
    // Unauthorized access rejection
    const unauthRes = await request('/api/tasks');
    assert(unauthRes.status === 401, 'GET /api/tasks without token returns 401 Unauthorized');

    // Create Task (Practical 5 & 10)
    const createTaskRes = await request('/api/tasks', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: JSON.stringify({
        title: 'Master ITUE301 Docker Containerization',
        description: 'Complete Practical 1 to 11 with Compose and Nginx',
        status: 'in-progress',
        priority: 'high',
      }),
    });
    assert(createTaskRes.status === 201, 'POST /api/tasks returns 201 Created');
    assert(createTaskRes.data.data.title === 'Master ITUE301 Docker Containerization', 'Task title matches input');
    assert(createTaskRes.data.data.priority === 'high', 'Task priority enum stored correctly');
    assert(!!createTaskRes.data.emittedTimestamp, 'Practical 10: Event emission timestamp generated');
    const taskId = createTaskRes.data.data._id;

    // Body Validation: Missing Title Rejection
    const invalidTaskRes = await request('/api/tasks', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: JSON.stringify({ title: '' }),
    });
    assert(invalidTaskRes.status === 400, 'Creating task with empty title rejected with 400 Bad Request');

    // Retrieve Single Task by ID
    const getSingleRes = await request(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(getSingleRes.status === 200, `GET /api/tasks/:id returns 200 OK`);
    assert(getSingleRes.data.data._id === taskId, 'Retrieved task ID matches created task');

    // Update Task
    const updateRes = await request(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: JSON.stringify({
        status: 'completed',
        description: 'Updated description for university test verification',
      }),
    });
    assert(updateRes.status === 200, 'PUT /api/tasks/:id returns 200 OK');
    assert(updateRes.data.data.status === 'completed', 'Task status updated to "completed"');

    // ----------------------------------------------------
    // TEST 4: User Data Isolation & Security (Practical 7)
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 4: MULTI-USER ISOLATION (PRACTICAL 7) ---');
    // Register User B
    const regResB = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Second Student',
        email: 'userb@test.com',
        password: 'password456',
      }),
    });
    const tokenB = regResB.data.token;

    // User B tries to read User A's task
    const crossReadRes = await request(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(crossReadRes.status === 403, 'Cross-user task read blocked with 403 Forbidden');

    // User B tries to update User A's task
    const crossUpdateRes = await request(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokenB}` },
      body: JSON.stringify({ title: 'Hacked Title' }),
    });
    assert(crossUpdateRes.status === 403, 'Cross-user task update blocked with 403 Forbidden');

    // User B tries to delete User A's task
    const crossDeleteRes = await request(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(crossDeleteRes.status === 403, 'Cross-user task deletion blocked with 403 Forbidden');

    // User B's task list should be empty
    const userBTasksRes = await request('/api/tasks', {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(userBTasksRes.data.count === 0, 'User B sees only their own tasks (count = 0)');

    // ----------------------------------------------------
    // TEST 5: In-Memory Caching & Invalidation (Practical 9)
    // ----------------------------------------------------
    console.log('\n--- TEST GROUP 5: NODE-CACHE IN-MEMORY OPTIMIZATION (PRACTICAL 9) ---');
    // First request -> Cache MISS
    const fetch1 = await request('/api/tasks', {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(fetch1.data.source === 'database', 'First task list request results in Cache MISS (queried database)');

    // Second request -> Cache HIT
    const fetch2 = await request('/api/tasks', {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(fetch2.data.source === 'cache', 'Second immediate request results in Cache HIT (served from memory)');

    // Delete Task -> Cache Invalidation
    const delRes = await request(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(delRes.status === 200, 'DELETE /api/tasks/:id returns 200 OK');

    // Request after delete -> Cache MISS because cache was invalidated on mutation
    const fetch3 = await request('/api/tasks', {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(fetch3.data.source === 'database', 'Request after delete triggers fresh database query (cache invalidation verified)');
    assert(fetch3.data.count === 0, 'Task successfully removed from database');

    console.log('\n========================================================');
    console.log(`INTEGRATION TESTS SUMMARY: ${passCount} PASSED | ${failCount} FAILED`);
    console.log('========================================================\n');

    process.exit(failCount === 0 ? 0 : 1);
  } catch (err) {
    console.error('[TestRunner Exception]:', err);
    process.exit(1);
  } finally {
    if (serverInstance) serverInstance.close();
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  }
};

runTests();
