import { EventEmitter } from 'node:events';

class TaskEventEmitter extends EventEmitter {
  constructor() {
    super();
    // Set max listeners to avoid memory leak warning
    this.setMaxListeners(20);
  }
}

// Singleton event emitter instance
const taskEvents = new TaskEventEmitter();

// Event name constant
export const TASK_CREATED_EVENT = 'task-created';

let isListenerRegistered = false;

/**
 * Register asynchronous event listeners once
 */
export const registerTaskListeners = () => {
  if (isListenerRegistered) {
    console.log('[EventEmitter] Listener already registered. Skipping duplicate registration.');
    return;
  }

  taskEvents.on(TASK_CREATED_EVENT, async (eventPayload) => {
    const handlerStartTime = new Date();
    const handlerStartTimeISO = handlerStartTime.toISOString();
    
    try {
      // Simulate non-blocking asynchronous work (e.g., email notification, push alert, audit logging)
      // We run asynchronously with setImmediate / Promise
      await new Promise((resolve) => setTimeout(resolve, 50));

      const handlerEndTime = new Date();
      const durationMs = handlerEndTime.getTime() - handlerStartTime.getTime();

      console.log('----------------------------------------------------');
      console.log(`[EventEmitter Async Worker] Event: ${TASK_CREATED_EVENT}`);
      console.log(`[EventEmitter Async Worker] Task ID: ${eventPayload.taskId}`);
      console.log(`[EventEmitter Async Worker] Title: "${eventPayload.title}"`);
      console.log(`[EventEmitter Async Worker] Assigned User ID: ${eventPayload.userId}`);
      console.log(`[EventEmitter Async Worker] Priority: ${eventPayload.priority} | Status: ${eventPayload.status}`);
      console.log(`[EventEmitter Async Worker] Event Emitted Timestamp:   ${eventPayload.emittedAt}`);
      console.log(`[EventEmitter Async Worker] Handler Started Timestamp:  ${handlerStartTimeISO}`);
      console.log(`[EventEmitter Async Worker] Processing Duration:        ${durationMs}ms`);
      console.log('----------------------------------------------------');
    } catch (err) {
      console.error('[EventEmitter Async Worker] Error during event processing:', err.message);
    }
  });

  isListenerRegistered = true;
  console.log('[EventEmitter] Native node:events listener initialized successfully.');
};

export default taskEvents;
