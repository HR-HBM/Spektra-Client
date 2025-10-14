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
      <div className='error-container'>
        <h2>Error</h2>
        <p className='error-paragraph'>{error}</p>
        <button className='back-to-search-button' onClick={goBackToSearch}>
          Back to Search
        </button>
      </div>
    )
  }

  return (
    <div className='main-div'>
      <div className='sub-div'>
        <button className='search-button' onClick={goBackToSearch}>
          ← Back to Search
        </button>
        
        <h2 className='car-heading'>
          {year} {make.charAt(0).toUpperCase() + make.slice(1)} {model.charAt(0).toUpperCase() + model.slice(1)}
        </h2>
      </div>

      {results.length === 0 ? (
        <div className='no-results-div'>
          <h3>No Results Found</h3>
          <p>Sorry, we couldn't find any trims for {year} {make} {model}.</p>
          <p>Try searching for a different make, model or production year</p>
        </div>
      ) : (
        <div>
          <h3 className='number-of-trims'>
            Found {results.length} trim{results.length !== 1 ? 's' : ''} available
          </h3>
          
          <div className='trim-grid'>
            {results.map((car, index) => (
              <div className='grid-item' key={index}>
                
                <h4 className='trim-subheading'>
                  {car.model_trim}
                </h4>
                
                <div className='specs-preview-container'>
                  <p className='previewed-spec-item'>
                    <strong>Engine:</strong> {car.model_engine_cc}cc {car.model_engine_cyl}-cylinder {car.model_engine_type}
                  </p>
                  <p className='previewed-spec-item'>
                    <strong>Power:</strong> {car.model_engine_power_ps} PS
                  </p>
                  <p className='previewed-spec-item'>
                    <strong>Body Type:</strong> {car.model_body}
                  </p>
                  <p className='previewed-spec-item'>
                    <strong>Transmission:</strong> {car.model_transmission_type}
                  </p>
                  <p className='previewed-spec-item'>
                    <strong>Drive Type:</strong> {car.model_drive}
                  </p>
                </div>
                
                <button className='full-spec-button' onClick={() => viewCarDetails(car)}>
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