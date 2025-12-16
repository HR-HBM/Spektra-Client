import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function CarList() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { year, make, model } = useParams()
  const hasSaved = useRef(false)

  useEffect(() => {

    const fetchResults = async () => {
      if (location.state?.cachedResults) {
        setResults(location.state.cachedResults);
        setLoading(false);
        return;
      }

      setLoading(true)
      
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        const token = JSON.parse(localStorage.getItem("token"))?.token;


        // Fetch car data from external API
        const response = await axios.get(
          `${API_BASE_URL}/carData?year=${year}&make=${make}&model=${model}`
        )
        
        setResults(response.data)

        // Prevent duplicate saves
        if (hasSaved.current) {
          setLoading(false);
          return;
        }
        hasSaved.current = true;
        
        // Get search term and query_id 
        const searchTerm = location.state?.searchTerm;
        const query_id = location.state?.query_id;
        
        if (!searchTerm || !query_id) {
          console.error("Missing searchTerm or query_id from navigation state");
          setLoading(false);
          return;
        }


        let dataToSave;
        if (!response.data || response.data.length === 0) {
          dataToSave = JSON.stringify({ 
            message: "Information for this car was not available",
            results: []
          });
        } else {
          dataToSave = JSON.stringify(response.data);
        }

        // Save to database
        await axios.post(
          `${API_BASE_URL}/api-data`,
          {
            query_id: query_id,
            search_term: searchTerm,
            fetched_data: dataToSave,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
      } catch (error) {
        console.error('Search failed:', error)
        setError('Failed to fetch search results')
      }
      
      setLoading(false)
    }

    fetchResults()
  }, [year, make, model, location.state])

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