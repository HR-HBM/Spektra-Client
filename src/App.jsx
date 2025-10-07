import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import CarList from './pages/CarList'
import Dashboard from './pages/Dashboard'
import CarDetails from './pages/CarDetails'
import SearchPage from './pages/SearchPage'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'


function AppContent() {

  const location = useLocation()
  const hideNavBarPaths = ['/', '/auth']

  return (

    
      <div className="App">
        {!hideNavBarPaths.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results/:year/:make/:model" element={<CarList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/homepage" element={<HomePage />}></Route>
        </Routes>
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