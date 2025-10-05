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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
//   // const [count, setCount] = useState(0)
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     console.log('Starting API call...')
//     axios
//       .get('http://localhost:9000/carData')
//       .then(res => {
//         console.log('API Response:', res.data)
//         console.log('Data type:', typeof res.data)
//         console.log('Is array:', Array.isArray(res.data))
//         console.log('Data length:', res.data?.length)
        
//         setData(res.data)
//         setLoading(false)
//       })
//   }, [])

// // Function to format field names for better readability
//   const formatFieldName = (key) => {
//     return key.replace(/model_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
//   }

//   // Function to format values with units
//   const formatValue = (key, value) => {
//     if (value === null || value === undefined) return "N/A"
    
//     // Add units to specific fields
//     if (key.includes('cc')) return `${value} cc`
//     if (key.includes('power_ps')) return `${value} PS`
//     if (key.includes('torque_nm')) return `${value} Nm`
//     if (key.includes('weight_kg')) return `${value} lbs`
//     if (key.includes('fuel_cap_l')) return `${value} gallons`
//     if (key.includes('lkm')) return `${value} mpg`
    
//     return value
//   }

  return (

    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results/:year/:make/:model" element={<CarList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>

    // <>
    //   <div>
    //     <div className='mainContainer'>
    //       <h1 style={{ color: 'whitecd s  ', textAlign: 'center' }}>
    //         2019 Toyota Camry Specifications
    //       </h1>
          
    //       {loading && <p>Loading car specifications...</p>}
    //       {error && <p style={{ color: 'red' }}>{error}</p>}

    //       <div className="car-info">
    //         {Array.isArray(data) && data.length > 0 ? (
    //           data.map((trim, idx) => (
    //             <div key={idx} className="car-trim" style={{
    //               backgroundColor: '#f9f9f9',
    //               border: '1px solid #ddd',
    //               borderRadius: '8px',
    //               padding: '20px',
    //               margin: '20px 0'
    //             }}>
    //               <h2 style={{ color: '#2c5aa0', borderBottom: '2px solid #2c5aa0' }}>
    //                 {trim.model_trim}
    //               </h2>
                  
    //               <div style={{ 
    //                 display: 'grid', 
    //                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    //                 gap: '10px' 
    //               }}>
    //                 {Object.entries(trim).map(([key, value]) => (
    //                   <div className='specs' key={key} style={{ 
                        
    //                   }}>
    //                     <strong>{formatFieldName(key)}:</strong> {formatValue(key, value)}
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           ))
    //         ) : !loading && (
    //           "No car data available"
    //         )}
    //       </div>
    //     </div>
    //     </div>
    // </>
  )
}

export default App
