import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navStyle = {
    backgroundColor: '#2c5aa0',
    padding: '15px',
    marginBottom: '20px'
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255,255,255,0.1)'
  }

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255,255,255,0.3)'
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={location.pathname === '/' ? activeLinkStyle : linkStyle}>
        Home
      </Link>
      <Link to="/search" style={location.pathname === '/search' ? activeLinkStyle : linkStyle}>
        Search Cars
      </Link>
      <Link to="/dashboard" style={location.pathname === '/dashboard' ? activeLinkStyle : linkStyle}>
        Dashboard
      </Link>
      <Link to="/auth" style={location.pathname === '/auth' ? activeLinkStyle : linkStyle}>
        Login
      </Link>
    </nav>
  )
}

export default Navbar