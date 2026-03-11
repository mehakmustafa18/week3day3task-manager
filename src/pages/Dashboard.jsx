import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { getTasks, getStats } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()

  const [tasks, setTasks]     = useState([])
  const [stats, setStats]     = useState({ total: 0, completed: 0, pending: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [filter, setFilter]   = useState('all') // all | pending | completed

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  // ── Fetch tasks + stats on load ──
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const [tasksRes, statsRes] = await Promise.all([getTasks(), getStats()])
      setTasks(tasksRes.data.data)
      setStats(statsRes.data.data)
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
      } else {
        setError('Failed to load tasks. Please refresh.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Task added ──
  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev])
    setStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      pending: prev.pending + 1,
    }))
  }

  // ── Task updated ──
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    )
    // Recalculate stats
    setTasks((prev) => {
      const completed = prev.filter((t) => t.completed).length
      setStats({ total: prev.length, completed, pending: prev.length - completed })
      return prev
    })
  }

  // ── Task deleted ──
  const handleTaskDeleted = (deletedId) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t._id !== deletedId)
      const completed = updated.filter((t) => t.completed).length
      setStats({ total: updated.length, completed, pending: updated.length - completed })
      return updated
    })
  }

  // ── Filter tasks ──
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed
    if (filter === 'pending')   return !t.completed
    return true
  })

  return (
    <>
      <Navbar user={user} />

      <div className="dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Tasks 📋</h1>
          <p className="dashboard-subtitle">Manage your tasks efficiently</p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#4ade80' }}>{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#fb923c' }}>{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        {/* Add task form */}
        <TaskForm onTaskAdded={handleTaskAdded} />

        {/* Filter tabs */}
        <div className="filter-tabs">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <p className="tasks-section-title">
          {filter === 'all' ? 'All Tasks' : filter === 'completed' ? 'Completed Tasks' : 'Pending Tasks'}
          {' '}({filteredTasks.length})
        </p>

        {/* Error */}
        {error && <div className="alert-error">{error}</div>}

        {/* Loading */}
        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        )}

      </div>
    </>
  )
}

export default Dashboard
