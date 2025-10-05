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











// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from 'axios'
// import AutoCompleteInput from "../components/AutoCompleteInput";
// import { supportedCars } from "../data/supportedCars";
// import './SearchPage.css'

// function SearchPage() {
    
//     const [make, setMake] = useState('toyota')
//     const [model, setModel] = useState('camry')
//     const [availableModels, setAvailableModels] = useState([])
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate() 

//     useEffect(() => {
//         if (make && supportedCars.models[make]) {
//             setAvailableModels(supportedCars.models[make])
//             if (model && !supportedCars.models[make].includes(model)) {
//                 setModel('')
//             }
//         } else {
//             setAvailableModels([])
//             setModel('')       
//         }
//     }, [make, model])

//     const handleSearch = async (e) => {
//         e.preventDefault()

//         if (!make || !model) {
//             alert('Please fill in all fields')
//             return
//         }
//         setLoading(true)

//         navigate(`/search-results/${make.toLowerCase()}/${model.toLowerCase()}`)
//         setLoading(false)
//     }

//     const isFormValid = make && model

//     return (
//         <div className="search-page-main">
//             <div className="search-page-sub">
//                 <h1 className="search-page-heading"> Find Your Perfect Car</h1>

//                 <p className="search-page-subtext">
//                     Search for detailed specifications of wide range of car makes and models
//                 </p>
//                 <p className="search-page-subtext-other">
//                     Start typing to see available options
//                 </p>
//             </div>

//             <form action="" onSubmit={handleSearch} className="search-form">
//                 <div className="form-div">
//                     <AutoCompleteInput
//                     label="Make"
//                     value={make}
//                     onChange={setMake}
//                     options={supportedCars.makes}
//                     placeholder={"e.g., Toyota"}
//                     /> 

//                     <AutoCompleteInput
//                     label="Model"
//                     value={model}
//                     onChange={setModel}
//                     options={availableModels}
//                     placeholder={ make? "e.g., Toyota" : "Select make first"}
//                     disabled={!make}
//                     /> 
//                 </div>

//                 {(make || model) && (
//                     <div className="selected-parameters">
//                         <h4 className="selected-parameters-heading">Selected:</h4>
//                         <p className="selected-detail">
//                             <strong>Make:</strong> {make || 'Not seletected'}
//                         </p>
//                         <p className="selected-detail">
//                             <strong>Model:</strong> {model || 'Not seletected'}
//                         </p>
//                     </div>
//                 )}

//                 <div className="submit">
//                     <button 
//                     className="submit-button"
//                     type="submit"
//                     disabled={loading || !isFormValid}
//                     >
//                         {loading ? 'Searching' : 'Search Cars' }
//                     </button>
//                 </div>

//                 {!isFormValid && (
//                     <p className="form-notice">
//                         Please fill in all fields to search
//                     </p>
//                 )}
//             </form>
//         </div>
//     )
// }

// export default SearchPage