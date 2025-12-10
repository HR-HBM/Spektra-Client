import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './HomePage.css'
import axios from "axios";



function HomePage() {
    const [status, setStatus] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
    const fetchStatus = async () => {
      try {

        const tokenObj = JSON.parse(localStorage.getItem("token"));
        if (!tokenObj || !tokenObj.token) {
            console.error("No token found, user might not be logged in");
            return;
          }

        const res = await axios.get(
          `${API_BASE_URL}/api-calls/status`,
           {
            headers: {
                Authorization: `Bearer ${tokenObj.token}`,
            },
        }
        );
        setStatus(res.data);
      } catch (err) {
        console.error("Error loading API call status:", err);
      }
    };

    fetchStatus();
  }, [API_BASE_URL]);

    
    return (
      <div className="page-content">

        <div className="homepage-container">
      <h1>Welcome to the Car Lookup App</h1>

      <p>This app lets you search for detailed technical specifications.</p>

      <p>You can revisit your old searches anytime from the dashboard.</p>

      <h3>Your API Usage</h3>

      {status ? (
        <div className="api-stats-box">
          <p><strong>Month:</strong> {status.month_year}</p>
          <p><strong>Calls Used:</strong> {status.callsUsed}</p>
          <p><strong>Call Limit:</strong> {status.callLimit}</p>
          <p><strong>Days Until Reset:</strong> {status.daysRemaining}</p>
        </div>
      ) : (
        <p>Loading usage...</p>
      )}

      <Link to="/dashboard" className="homepage-dashboard-link">
        View your previous searches
      </Link>
    </div>
    </div>
    );
}

export default HomePage