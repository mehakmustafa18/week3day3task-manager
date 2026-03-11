import { useState } from 'react'
import { updateTask, deleteTask } from '../services/api'

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [editingId, setEditingId]     = useState(null)
  const [editTitle, setEditTitle]     = useState('')
  const [loadingId, setLoadingId]     = useState(null)

  // ── Toggle complete ──
  const handleToggle = async (task) => {
    setLoadingId(task._id)
    try {
      const res = await updateTask(task._id, { completed: !task.completed })
      onTaskUpdated(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  // ── Start editing ──
  const startEdit = (task) => {
    setEditingId(task._id)
    setEditTitle(task.title)
  }

  // ── Save edit ──
  const handleSave = async (id) => {
    if (!editTitle.trim()) return
    setLoadingId(id)
    try {
      const res = await updateTask(id, { title: editTitle.trim() })
      onTaskUpdated(res.data.data)
      setEditingId(null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    setLoadingId(id)
    try {
      await deleteTask(id)
      onTaskDeleted(id)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <p>No tasks yet — add one above!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>

          {/* Checkbox */}
          <div
            className={`task-checkbox ${task.completed ? 'checked' : ''}`}
            onClick={() => !loadingId && handleToggle(task)}
          />

          {/* Title or Edit Input */}
          {editingId === task._id ? (
            <input
              className="task-edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave(task._id)}
              autoFocus
            />
          ) : (
            <span className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </span>
          )}

          {/* Action buttons */}
          <div className="task-actions">
            {editingId === task._id ? (
              <>
                <button className="btn-save" onClick={() => handleSave(task._id)}
                  disabled={loadingId === task._id}>
                  {loadingId === task._id ? '...' : 'Save'}
                </button>
                <button className="btn-cancel" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="btn-edit" onClick={() => startEdit(task)}
                  disabled={!!loadingId}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(task._id)}
                  disabled={loadingId === task._id}>
                  {loadingId === task._id ? '...' : 'Delete'}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
