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

  const closeNavbar = () => {
  const navbar = document.getElementById('navbarSupportedContent')
  if (navbar && navbar.classList.contains('show')) {
    new window.bootstrap.Collapse(navbar).hide()
  }
}


  
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/homepage" >
    <img src="/images/logo.png" alt="spektra-logo" className='navbar-logo'  />
    </Link>
    <button className="navbar-toggler d-block d-sm-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
     
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
    
        
        <li className="nav-item">
          <Link className="nav-link" to="/homepage" onClick={closeNavbar}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search" onClick={closeNavbar}>Search Cars</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard" onClick={closeNavbar}>Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn btn-link" onClick={handleLogout}>Logout</Link>
          {/* <Link className="nav-link" onClick={handleLogout}>Logout</Link> */}
        </li>
      </ul>
    </div>
  </div>
</nav>
    
  )
}

export default Navbar