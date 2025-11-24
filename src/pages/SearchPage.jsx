import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoCompleteInput from "../components/AutoCompleteInput";
import { supportedCars } from "../data/supportedCars";
import "./SearchPage.css";
import axios from "axios";


function SearchPage() {
  
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [year, setYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentQueryId, setCurrentQueryId] = useState(null);
  const [limitModal, setLimitModal] = useState(false);
  const [apiLimitInfo, setApiLimitInfo] = useState(null);
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userEmail = JSON.parse(localStorage.getItem("token"))?.email;

  const fetchApiStatus = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.token;

      const res = await axios.get(
        `${API_BASE_URL}/api-calls/status`,

        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setApiLimitInfo(res.data);

      if (res.data.limitReached) {
        setIsSearchDisabled(true);
      }
    } catch (err) {
      console.error("Error fetching API status:", err);
    }
  };

  useEffect(() => {
    if (userEmail) fetchApiStatus();
  }, []);


  useEffect(() => {
    if (brand && supportedCars.models[brand]) {
      setAvailableModels(supportedCars.models[brand]);
      setModel(""); 
    } else {
      setAvailableModels([]);
      setModel("");
    }
  }, [brand]);


  const checkDuplicate = async (searchTerm) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))?.token;

    const res = await axios.post(`${API_BASE_URL}/search-term`, {
      search_term: searchTerm
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return {
      isDuplicate: res.data.duplicate,
      count: res.data.count || 0,
      query_id: res.data.query_id
    };
  } catch (err) {
    console.error("Error checking duplicate:", err);
    return { isDuplicate: false, count: 0, query_id: null };
  }
};

const handleSearch = async (e) => {
  e.preventDefault();

  if (!brand || !model || !year) {
    alert("Please select brand, model, and year");
    return;
  }

  if (isSearchDisabled) {
    setLimitModal(true);
    return;
  }

  const searchTerm = `${brand} ${model} ${year}`;
  setCurrentSearchTerm(searchTerm);

  const result = await checkDuplicate(searchTerm);

  if (result.isDuplicate) {
    setDuplicateCount(result.count);
    setCurrentQueryId(result.query_id);
    setShowModal(true);
  } else {
    navigate(`/search-results/${year}/${brand.toLowerCase()}/${model.toLowerCase()}`, {
      state: { 
        searchTerm,
        query_id: result.query_id 
      }
    });
  }
};

const proceedSearch = () => {
  const parts = currentSearchTerm.split(" ");
  const yearVal = parts[parts.length - 1];
  const brandVal = parts[0];
  const modelVal = parts.slice(1, -1).join(" ");
  
  setShowModal(false);
  
  navigate(`/search-results/${yearVal}/${brandVal.toLowerCase()}/${modelVal.toLowerCase()}`, {
    state: { 
      searchTerm: currentSearchTerm,
      query_id: currentQueryId,
      isDuplicateProceed: true 
    }
  });
};

const goToDashboard = () => {
  setShowModal(false);
  navigate(`/dashboard?search=${encodeURIComponent(currentSearchTerm)}`);
};

  return (
    <div className="search-page-main">
      <div className="search-page-sub">
        <h1 className="search-page-heading">Find Your Perfect Car</h1>
        <p className="search-page-subtext">
          Search detailed specifications of a wide range of car makes and models
        </p>
      </div>

      {/* API LIMIT WARNING BANNER */}
      {apiLimitInfo && apiLimitInfo.limitReached && (
        <div className="limit-warning">
          ⚠ You have reached your monthly API call limit ({apiLimitInfo.callLimit} calls).
          <br />
          Resets in {apiLimitInfo.daysRemaining} days.
        </div>
      )}

      <form onSubmit={handleSearch} className="search-form">
        <AutoCompleteInput
          label="Brand"
          options={supportedCars.makes}
          value={brand}
          onChange={setBrand}
          placeholder="Select brand"
        />

        <AutoCompleteInput
          label="Model"
          options={availableModels}
          value={model}
          onChange={setModel}
          placeholder={brand ? "Select model" : "Select brand first"}
          disabled={!brand}
        />

        <div className="input-wrapper">
          <label className="input-label">Enter Year</label>
          <input
            type="text"
            className="year-input"
            placeholder="e.g. 2020"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            maxLength={4}
          />
        </div>

        <div className="submit">
          <button
            type="submit"
            className="submit-button"
            disabled={!brand || !model || isSearchDisabled}
          >
            {isSearchDisabled ? "Limit Reached" : "Search Cars"}

          </button>
        </div>
      </form>

      {/* Duplicate Modal */}
      {showModal && (
        <div className="duplicate-modal">
          <h3>Duplicate Search Detected</h3>
          <p>
            You have already searched for <strong>{currentSearchTerm}</strong> {duplicateCount} time
            {duplicateCount > 1 ? "s" : ""}.
          </p>
          <button onClick={goToDashboard}>View in Dashboard</button>
          <button onClick={proceedSearch}>Proceed Anyway</button>
        </div>
      )}

       {/* API LIMIT MODAL */}
      {limitModal && apiLimitInfo && (
        <div className="limit-modal">
          <h3>API Limit Reached</h3>
          <p>
            You have used {apiLimitInfo.callsUsed}/{apiLimitInfo.callLimit} calls.
            <br />
            Reset in {apiLimitInfo.daysRemaining} days.
          </p>
          <button onClick={() => setLimitModal(false)}>Okay</button>
        </div>
      )}


    </div>
  );
}

export default SearchPage;

