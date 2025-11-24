import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';


function Dashboard() {
  const navigate = useNavigate()
  const [ savedSearches, setSavedSearches] = useState([])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchFilter = queryParams.get("search") || "";
  const userEmail = JSON.parse(localStorage.getItem("token"))?.email;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  

  const getData =  async () => {

    try {
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    
    const res = await axios.get(`${API_BASE_URL}/api-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
      const data = res.data;

      if (searchFilter) {
        setSavedSearches(
          data.filter(item =>
            item.search_term.toLowerCase().includes(searchFilter.toLowerCase()) 
          )
        );
  
      } else {
        setSavedSearches(data);
      }

    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [searchFilter]);

  const viewSearchResults = (search) => {
    try {
      
    const [year, brand, model] = search.search_term.split(" ");

    const cachedResults = search.fetched_data;

    navigate(`/search-results/${year}/${brand.toLowerCase()}/${model.toLowerCase()}`, {
      state: { cachedResults }
    });

  } catch (err) {
    console.error("Error parsing search data:", err);
    console.error("Search data:", search.fetched_data);
    alert("Error loading search results. Please try searching again.");
  }
  };


  const clearHistory = async () => {
  if (!window.confirm('Are you sure you want to delete all your search history? This cannot be undone.')) {
    return;
  }

  try {
    const token = JSON.parse(localStorage.getItem("token"))?.token;

    await axios.delete(`${API_BASE_URL}/api-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSavedSearches([]);
    
    localStorage.removeItem('carSearches');
    
    alert('Search history cleared successfully!');
  } catch (err) {
    console.error('Error clearing history:', err);
    alert('Failed to clear history. Please try again.');
  }
};



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
        <div className="saved-searches-div">
          {savedSearches.map((search) => (
            <div className="saved-searched-item" key={search.search_id}>
              <h4>{search.search_term}</h4>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(search.fetched_at).toLocaleDateString()}
              </p>
              <button
                className="view-details-button"
                onClick={() => viewSearchResults(search)}
              >
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