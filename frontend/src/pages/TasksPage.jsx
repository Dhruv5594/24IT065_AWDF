import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const TasksPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cacheMeta, setCacheMeta] = useState({ source: '', responseTimeMs: 0 });
  const [filterStatus, setFilterStatus] = useState('all');
  const [notification, setNotification] = useState(null);

  // Form Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async (statusFilter = filterStatus) => {
    setLoading(true);
    try {
      const url = statusFilter && statusFilter !== 'all'
        ? `/tasks?status=${statusFilter}`
        : '/tasks';
      
      const res = await api.get(url);
      if (res.data.success) {
        setTasks(res.data.data);
        setCacheMeta({
          source: res.data.source || (res.headers['x-cache'] === 'HIT' ? 'cache' : 'database'),
          responseTimeMs: res.data.responseTimeMs || 0,
        });
      }
    } catch (err) {
      console.error('[TasksPage] Fetch tasks error:', err);
      showNotification('error', err.response?.data?.message || 'Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filterStatus);
  }, [filterStatus]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setTaskForm({ title: '', description: '', status: 'pending', priority: 'medium' });
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      setFormError('Task title is required.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      if (editingTask) {
        // PUT /api/tasks/:id
        const res = await api.put(`/tasks/${editingTask._id}`, taskForm);
        if (res.data.success) {
          showNotification('success', `Task "${res.data.data.title}" updated successfully.`);
          setShowModal(false);
          fetchTasks();
        }
      } else {
        // POST /api/tasks (Triggers Practical 10 EventEmitter & Practical 9 Cache Invalidation)
        const res = await api.post('/tasks', taskForm);
        if (res.data.success) {
          const emittedAt = res.data.emittedTimestamp ? ` (EventEmitter notified at ${new Date(res.data.emittedTimestamp).toLocaleTimeString()})` : '';
          showNotification('success', `Task "${res.data.data.title}" created successfully!${emittedAt}`);
          setShowModal(false);
          fetchTasks();
        }
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error saving task.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete task "${title}"?`)) {
      return;
    }

    try {
      const res = await api.delete(`/tasks/${id}`);
      if (res.data.success) {
        showNotification('success', `Task "${title}" deleted. In-memory cache invalidated.`);
        fetchTasks();
      }
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Error deleting task.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header & Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              PRACTICALS 4, 5, 6, 7, 9 & 10
            </div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '6px' }}>
              Task Management Dashboard
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Authenticated user: <strong>{user?.name}</strong> ({user?.email}) • Isolated MongoDB storage
            </p>
          </div>

          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            ➕ Create New Task
          </button>
        </div>

        {/* Practical 9 Cache & Query Indicator Banner */}
        <div className="card" style={{ padding: '16px 20px', marginBottom: '24px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary)' }}>
                Cache Performance Monitor (Practical 9):
              </span>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Source:{' '}
                <strong style={{ color: cacheMeta.source === 'cache' ? 'var(--success)' : 'var(--primary)' }}>
                  {cacheMeta.source.toUpperCase() || 'QUERY'}
                </strong>{' '}
                • Latency: <strong>{cacheMeta.responseTimeMs}ms</strong> • Algorithm:{' '}
                <code>node-cache (stdTTL 60s)</code>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter Status:</span>
            {['all', 'pending', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-outline'}`}
                style={{ textTransform: 'capitalize' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {notification && (
          <div className={`toast-alert toast-${notification.type === 'error' ? 'error' : 'success'}`}>
            <span>{notification.type === 'error' ? '⚠️' : '✅'} {notification.message}</span>
            <button onClick={() => setNotification(null)} className="btn btn-sm btn-outline">✕</button>
          </div>
        )}

        {/* Task List */}
        {loading ? (
          <LoadingSpinner text="Retrieving tasks from database / node-cache..." />
        ) : tasks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '3rem' }}>📝</span>
            <h3 style={{ marginTop: '12px', color: 'var(--secondary)' }}>No Tasks Found</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '20px' }}>
              {filterStatus !== 'all'
                ? `You have no tasks matching status "${filterStatus}".`
                : 'Your task list is empty. Click "Create New Task" to add your first item.'}
            </p>
            <button onClick={handleOpenCreateModal} className="btn btn-primary">
              Create Your First Task
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {tasks.map((task) => (
              <div key={task._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span className={`badge badge-${task.status}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`badge badge-${task.priority}`}>
                      {task.priority} priority
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--secondary)' }}>
                    {task.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '16px', minHeight: '40px' }}>
                    {task.description || <em>No additional description provided.</em>}
                  </p>
                </div>

                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid var(--border)',
                    paddingTop: '10px',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    <span>ID: ...{task._id.slice(-6)}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEditModal(task)}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id, task.title)}
                      className="btn btn-danger btn-sm"
                      style={{ flex: 1 }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="card" style={{ width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--secondary)' }}>
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  ✕
                </button>
              </div>

              {formError && <div className="toast-alert toast-error">⚠️ {formError}</div>}

              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Task Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Build Dockerfile for ITUE301 backend"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (Optional)</label>
                  <textarea
                    rows="3"
                    className="form-textarea"
                    placeholder="Enter detailed task instructions or notes..."
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-outline"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
