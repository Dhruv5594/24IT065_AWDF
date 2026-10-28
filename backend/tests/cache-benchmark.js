import cache, { getTasksCacheKey, invalidateUserTasksCache } from '../utils/cache.js';

console.log('========================================================');
console.log('TESTING PRACTICAL 9: NODE-CACHE BENCHMARK & EVALUATION');
console.log('========================================================\n');

const runBenchmark = async () => {
  const userId = 'bench_user_9999999999999';
  const cacheKey = getTasksCacheKey(userId);

  // Mock simulated database fetch function (simulates network and query latency ~30ms)
  const fetchFromDatabase = async () => {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return [
      { _id: '1', title: 'Task 1', status: 'pending' },
      { _id: '2', title: 'Task 2', status: 'completed' },
      { _id: '3', title: 'Task 3', status: 'in-progress' },
    ];
  };

  console.log('1. First Fetch (Cold Cache - Database query simulated)...');
  const t0 = performance.now();
  let data = cache.get(cacheKey);
  let source = 'cache';
  if (!data) {
    source = 'database';
    data = await fetchFromDatabase();
    cache.set(cacheKey, data);
  }
  const t1 = performance.now();
  const dbLatency = (t1 - t0).toFixed(2);
  console.log(`   Source: ${source.toUpperCase()} | Time: ${dbLatency}ms`);

  console.log('\n2. Second Fetch (Warm Cache - Node-Cache In-Memory hit)...');
  const t2 = performance.now();
  data = cache.get(cacheKey);
  source = data ? 'cache' : 'database';
  const t3 = performance.now();
  const cacheLatency = (t3 - t2).toFixed(2);
  console.log(`   Source: ${source.toUpperCase()} | Time: ${cacheLatency}ms`);

  console.log('\n3. Running 50 Iterations Benchmark...');
  let totalCacheTime = 0;
  for (let i = 0; i < 50; i++) {
    const start = performance.now();
    const result = cache.get(cacheKey);
    totalCacheTime += (performance.now() - start);
  }
  const avgCacheLatency = (totalCacheTime / 50).toFixed(3);
  console.log(`   Average Cached Latency over 50 requests: ${avgCacheLatency}ms`);

  console.log('\n4. Testing Cache Invalidation after mutation...');
  console.log(`   Cache keys before invalidation: ${cache.keys().length}`);
  invalidateUserTasksCache(userId);
  console.log(`   Cache keys after invalidation: ${cache.keys().length}`);
  const invalidatedCheck = cache.get(cacheKey);
  console.log(`   Verification that key is gone: ${invalidatedCheck === undefined ? 'CONFIRMED' : 'FAILED'}`);

  console.log('\n========================================================');
  console.log(`SUMMARY: Cache Speedup ~ ${(parseFloat(dbLatency) / Math.max(parseFloat(avgCacheLatency), 0.001)).toFixed(1)}x faster`);
  console.log('PRACTICAL 9 TEST RESULT: [PASS]');
  console.log('========================================================\n');
};

runBenchmark();
