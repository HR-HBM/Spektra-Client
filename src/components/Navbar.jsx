import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useToken from '../useToken'
import './Navbar.css'


function Navbar() {
  const location = useLocation()
  const { removeToken } = useToken()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    // setTimeout(() => navigate('/'), 0)
    navigate('/')
  }

  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/homepage">
    <img src="/images/logo.png" alt="spektra-logo" className='logo'  />
    Spektra
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
     
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    
        
        <li className="nav-item">
          <Link className="nav-link" to="/homepage">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search">Search Cars</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
          {/* <Link className="nav-link" onClick={handleLogout}>Logout</Link> */}
        </li>
      </ul>
    </div>
  </div>
</nav>
    
  )
}

export default Navbar