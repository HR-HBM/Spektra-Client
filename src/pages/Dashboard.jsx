import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [savedSearches, setSavedSearches] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('carSearches') || '[]')
    setSavedSearches(searches)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('carSearches')
    setSavedSearches([])
  }

  const viewSearchResults = (search) => {
    // You could navigate to a results page or show results inline
    console.log('Viewing search:', search)
  }

  return (
    <div className='main-div'>
      <div className='sub-div'>
        <h2>Your Dashboard</h2>
        <button className='dashboard-button' onClick={clearHistory}>
          Clear History
        </button>
      </div>

      <p>Total searches: {savedSearches.length}</p>

      {savedSearches.length === 0 ? (
        <div className='car-detail-div'>
          <p>No searches yet!</p>
          <button className='car-detail-button' onClick={() => navigate('/search')}>
            Start Searching
          </button>
        </div>
      ) : (
        <div className='saved-searches-div'>
          {savedSearches.map((search) => (
            <div className='saved-searched-item' key={search.id}>
              <h4>
                {search.searchParams.year} {search.searchParams.make} {search.searchParams.model}
              </h4>
              <p><strong>Results:</strong> {search.results.length} trims</p>
              <p><strong>Date:</strong> {new Date(search.timestamp).toLocaleDateString()}</p>
              
              <button onClick={() => viewSearchResults(search)} className='view-details-button'>
                View Results
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard