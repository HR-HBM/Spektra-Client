import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import CarList from './pages/CarList'
import Dashboard from './pages/Dashboard'
import CarDetails from './pages/CarDetails'
import SearchPage from './pages/SearchPage'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import useToken from './useToken'
import Contact from "./pages/Contact";
// import ContactModal from './components/ContactModal';



function AppContent() {
  
  // const [showContact, setShowContact] = useState(false);
  const location = useLocation()
  const hideNavBarPaths = ['/', '/auth']
  const { token, setToken } = useToken()

  const storedToken = localStorage.getItem('token');

  if(!storedToken) {
    return (
      <div className='main-div'>
            <div className="content">
        <Routes>
        <Route path="/" element={<LandingPage setToken={setToken} />} />
        <Route path="/auth" element={<AuthPage setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      <Footer />

      </div>
      
    ) 
  }

  return (    
      <div className="App">
        {!hideNavBarPaths.includes(location.pathname) && <Navbar />}
            <div className="content">

        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/auth" element={<AuthPage setToken={setToken}/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results/:year/:make/:model" element={<CarList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/homepage" element={<HomePage />}></Route>
        </Routes>
        </div> 
        {/* <ContactModal isOpen={showContact} onClose={() => setShowContact(false)}
/> */}
        <Footer />

      </div>
    
  )
  
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}