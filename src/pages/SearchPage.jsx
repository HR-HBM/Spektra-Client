import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoCompleteInput from "../components/AutoCompleteInput";
import { supportedCars } from "../data/supportedCars";
import "./SearchPage.css";

function SearchPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const navigate = useNavigate();
  const [year, setYear] = useState("");


  // Update available models when brand changes
  useEffect(() => {
    if (brand && supportedCars.models[brand]) {
      setAvailableModels(supportedCars.models[brand]);
      setModel(""); // clear previous model selection
    } else {
      setAvailableModels([]);
      setModel("");
    }
  }, [brand]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!brand || !model ||!year) {
      alert("Please select both brand and model");
      return;
    }
    navigate(`/search-results/${year}/${brand.toLowerCase()}/${model.toLowerCase()}`);
  };

  return (
    <div className="search-page-main">
      <div className="search-page-sub">
        <h1 className="search-page-heading">Find Your Perfect Car</h1>
        <p className="search-page-subtext">
          Search detailed specifications of a wide range of car makes and models
        </p>
      </div>

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
            disabled={!brand || !model}
          >
            Search Cars
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchPage;

