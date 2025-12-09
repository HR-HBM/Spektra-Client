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

function AppContent() {

  const location = useLocation()
  const hideNavBarPaths = ['/', '/auth']
  const { token, setToken } = useToken()

  const storedToken = localStorage.getItem('token');

  if(!storedToken) {
    return (
      <div>
        <Routes>
        <Route path="/" element={<LandingPage setToken={setToken} />} />
        <Route path="/auth" element={<AuthPage setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

      </div>
      
    ) 
  }

  return (    
      <div className="App">
        {!hideNavBarPaths.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/auth" element={<AuthPage setToken={setToken}/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results/:year/:make/:model" element={<CarList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/homepage" element={<HomePage />}></Route>
        </Routes>
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