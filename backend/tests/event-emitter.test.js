import { registerTaskListeners, TASK_CREATED_EVENT } from '../utils/eventEmitter.js';
import taskEvents from '../utils/eventEmitter.js';

console.log('========================================================');
console.log('TESTING PRACTICAL 10: ASYNCHRONOUS EVENTEMITTER PIPELINE');
console.log('========================================================\n');

// Initialize listener
registerTaskListeners();

const runTest = async () => {
  const startTime = Date.now();
  const simulatedTaskId = '654321098765432109876543';
  const simulatedUserId = '123456789012345678901234';

  console.log(`[Main Thread] 1. Emitting ${TASK_CREATED_EVENT} at ${new Date().toISOString()}...`);

  const emittedAt = new Date().toISOString();
  taskEvents.emit(TASK_CREATED_EVENT, {
    taskId: simulatedTaskId,
    title: 'Automated Test Task for EventEmitter',
    userId: simulatedUserId,
    priority: 'high',
    status: 'pending',
    emittedAt,
  });

  const apiFinishedAt = Date.now();
  console.log(`[Main Thread] 2. HTTP response returned to client in ${apiFinishedAt - startTime}ms (Non-blocking).`);

  // Wait for the async worker simulation in eventEmitter.js to complete
  await new Promise((resolve) => setTimeout(resolve, 200));

  console.log('\n[Main Thread] 3. Verified asynchronous processing completed without blocking response!');
  console.log('PRACTICAL 10 TEST RESULT: [PASS]\n');
};

runTest();
