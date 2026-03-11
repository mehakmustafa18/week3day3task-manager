import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ user }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">Task<span>Manager</span></div>

      {/* Desktop right side */}
      <div className="navbar-right">
        {user && (
          <span className="navbar-user">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Hamburger button — mobile only */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {user && (
          <span className="navbar-user">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar