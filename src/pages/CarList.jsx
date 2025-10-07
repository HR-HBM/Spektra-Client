import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// src/pages/SearchResultsPage.jsx


function CarList() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { year, make, model } = useParams()

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      
      try {

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


        const response = await axios.get(`${API_BASE_URL}/carData?year=${year}&make=${make}&model=${model}`)
        setResults(response.data)
        
        // Save to localStorage for dashboard
        const savedSearches = JSON.parse(localStorage.getItem('carSearches') || '[]')
        savedSearches.push({
          id: Date.now(),
          searchParams: { year, make, model },
          results: response.data,
          timestamp: new Date().toISOString()
        })
        localStorage.setItem('carSearches', JSON.stringify(savedSearches))
        
      } catch (error) {
        console.error('Search failed:', error)
        setError('Failed to fetch search results')
      }
      
      setLoading(false)
    }

    fetchResults()
  }, [year, make, model])

  const viewCarDetails = (car) => {
    navigate(`/car-details/${car.model_id}`, { state: { car } })
  }

  const goBackToSearch = () => {
    navigate('/search')
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Searching for {year} {make} {model}...</h2>
        <p>Please wait while we fetch the results.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Error</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={goBackToSearch} style={{ 
          padding: '12px 24px', 
          backgroundColor: '#6c757d', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Back to Search
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={goBackToSearch} style={{ 
          padding: '8px 16px', 
          backgroundColor: '#6c757d', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '15px'
        }}>
          ← Back to Search
        </button>
        
        <h2 style={{ display: 'inline', color: '#2c5aa0' }}>
          {year} {make.charAt(0).toUpperCase() + make.slice(1)} {model.charAt(0).toUpperCase() + model.slice(1)}
        </h2>
      </div>

      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No Results Found</h3>
          <p>Sorry, we couldn't find any trims for {year} {make} {model}.</p>
          <p>Try adjusting your search parameters.</p>
        </div>
      ) : (
        <div>
          <h3 style={{ marginBottom: '20px' }}>
            Found {results.length} trim{results.length !== 1 ? 's' : ''} available
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '20px' 
          }}>
            {results.map((car, index) => (
              <div key={index} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                
                <h4 style={{ 
                  color: '#2c5aa0', 
                  marginBottom: '15px',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: '10px'
                }}>
                  {car.model_trim}
                </h4>
                
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Engine:</strong> {car.model_engine_cc}cc {car.model_engine_cyl}-cylinder {car.model_engine_type}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Power:</strong> {car.model_engine_power_ps} PS
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Body Type:</strong> {car.model_body}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Transmission:</strong> {car.model_transmission_type}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Drive Type:</strong> {car.model_drive}
                  </p>
                </div>
                
                <button onClick={() => viewCarDetails(car)} style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#2c5aa0', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3d6f'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2c5aa0'}>
                  View Full Specifications
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CarList