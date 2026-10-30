import mongoose from 'mongoose';
import Task from '../models/Task.js';
import cache, { getTasksCacheKey, invalidateUserTasksCache } from '../utils/cache.js';
import taskEvents, { TASK_CREATED_EVENT } from '../utils/eventEmitter.js';
import { getAiTaskSuggestion } from '../services/aiService.js';

/**
 * @desc    Get all tasks for the logged in user
 * @route   GET /api/tasks
 * @access  Private (Practical 4, 7, 9)
 */
export const getTasks = async (req, res, next) => {
  const requestStartTime = Date.now();
  try {
    const userId = req.user._id.toString();
    const { status, priority, search } = req.query;

    // Cache key incorporates user ID and filter parameters
    const cacheKey = getTasksCacheKey(userId, { status, priority, search });

    // Check in-memory cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      const responseTime = Date.now() - requestStartTime;
      res.set('X-Cache', 'HIT');
      res.set('X-Response-Time-Ms', responseTime.toString());
      return res.status(200).json({
        success: true,
        source: 'cache',
        count: cachedData.length,
        responseTimeMs: responseTime,
        data: cachedData,
      });
    }

    // Build query criteria
    const query = { user: req.user._id };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Fetch from MongoDB
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    // Store in node-cache
    cache.set(cacheKey, tasks);

    const responseTime = Date.now() - requestStartTime;
    res.set('X-Cache', 'MISS');
    res.set('X-Response-Time-Ms', responseTime.toString());

    return res.status(200).json({
      success: true,
      source: 'database',
      count: tasks.length,
      responseTimeMs: responseTime,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid task ID format: ${id}`,
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${id}`,
      });
    }

    // Authorization check: task must belong to authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to access this task.',
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private (Practical 4, 5, 6, 7, 9, 10)
 */
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title is required and cannot be empty',
      });
    }

    // Create task in MongoDB
    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'pending',
      priority: priority || 'medium',
      user: req.user._id,
    });

    // Invalidate user cache on creation
    invalidateUserTasksCache(req.user._id.toString());

    // Practical 10: Asynchronous Processing via EventEmitter
    const apiResponseTimestamp = new Date().toISOString();
    taskEvents.emit(TASK_CREATED_EVENT, {
      taskId: task._id.toString(),
      title: task.title,
      userId: req.user._id.toString(),
      priority: task.priority,
      status: task.status,
      emittedAt: apiResponseTimestamp,
    });

    // Return immediate response to the client
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      emittedTimestamp: apiResponseTimestamp,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task by ID
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid task ID format: ${id}`,
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${id}`,
      });
    }

    // Ownership authorization check
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You cannot update tasks owned by other users.',
      });
    }

    const { title, description, status, priority } = req.body;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    const updatedTask = await task.save();

    // Invalidate cache
    invalidateUserTasksCache(req.user._id.toString());

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete task by ID
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid task ID format: ${id}`,
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${id}`,
      });
    }

    // Ownership authorization check
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You cannot delete tasks owned by other users.',
      });
    }

    await Task.findByIdAndDelete(id);

    // Invalidate cache
    invalidateUserTasksCache(req.user._id.toString());

    return res.status(200).json({
      success: true,
      message: `Task "${task.title}" deleted successfully`,
      deletedId: id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get AI recommendations for task description, priority, and deadline
 * @route   POST /api/tasks/ai-suggest
 * @access  Private (Practical 13)
 */
export const suggestAiTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title to generate AI suggestions',
      });
    }

    const suggestion = await getAiTaskSuggestion(title.trim());
    return res.status(200).json({
      success: true,
      message: 'AI suggestion generated successfully',
      data: suggestion,
    });
  } catch (error) {
    next(error);
  }
};
