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
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Dashboard</h2>
        <button onClick={clearHistory} style={{ 
          padding: '8px 16px', 
          backgroundColor: '#dc3545', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Clear History
        </button>
      </div>

      <p>Total searches: {savedSearches.length}</p>

      {savedSearches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No searches yet!</p>
          <button onClick={() => navigate('/search')} style={{ 
            padding: '12px 24px', 
            backgroundColor: '#28a745', 
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Start Searching
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {savedSearches.map((search) => (
            <div key={search.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4>
                {search.searchParams.year} {search.searchParams.make} {search.searchParams.model}
              </h4>
              <p><strong>Results:</strong> {search.results.length} trims</p>
              <p><strong>Date:</strong> {new Date(search.timestamp).toLocaleDateString()}</p>
              
              <button onClick={() => viewSearchResults(search)} style={{ 
                padding: '8px 16px', 
                backgroundColor: '#2c5aa0', 
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
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