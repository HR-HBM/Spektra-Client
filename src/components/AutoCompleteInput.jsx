import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./AutoCompleteInput.css";

function AutoCompleteInput({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder, 
  disabled = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef(null);

  // Filter options as user types
  useEffect(() => {
    if (value) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setHighlightIndex(0);
    } else {
      setFilteredOptions(options);
    }
  }, [value, options]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev === 0 ? filteredOptions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightIndex]) {
        handleOptionClick(filteredOptions[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="autocomplete-container" ref={containerRef}>
      {label && <label className="autocomplete-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="autocomplete-input"
        autoComplete="off"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="autocomplete-dropdown">
          {filteredOptions.map((option, idx) => (
            <div
              key={idx}
              className={`autocomplete-option ${
                idx === highlightIndex ? "highlighted" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {isOpen && filteredOptions.length === 0 && value && (
        <div className="autocomplete-dropdown">
          <div className="autocomplete-no-match">No matches found</div>
        </div>
      )}
    </div>
  );
}

AutoCompleteInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AutoCompleteInput;











// import React, { useState, useRef, useEffect } from 'react'
// import PropTypes from 'prop-types'

// function AutoCompleteInput({
//     value,
//     onChange,
//     options,
//     placeholder,
//     label,
//     disabled = false    
// }) {
//     const [isOpen, setIsOpen] = useState(false)
//     const [filteredOptions, setFilteredOptions] = useState([])
//     const inputRef = useRef(null)
//     const dropdownRef = useRef(null)

//     useEffect(() => {
//         if (value && options) {
//             const lowerCaseValue = value.toLowerCase()
//             const filtered = options.filter(option => 
//                 String(option)
//                 .toLowerCase()
//                 .includes(lowerCaseValue)
//             )
//             setFilteredOptions(filtered)
//         } else {
//             setFilteredOptions(options || [])
//         }
//     }, [value, options])

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false)
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     const handleInputChange = (e) => {
//         const inputValue = e.target.value
//         onChange(inputValue)
//         setIsOpen(true)
//     }

//     const handleOptionClick = (option) => {
//         onChange(option)
//         setIsOpen(false)
//         inputRef.current?.blur()
//     }

//     const handleInputFocus = () => {
//         if (!disabled && options && options.length > 0) {
//             setIsOpen(true)
//         }
//     }

//     const handleKeyDown = (e) => {
//         if (e.key === 'Escape') {
//             setIsOpen(false)
//         } else if (e.key === 'Enter') {
//             e.preventDefault()
//             if (filteredOptions.length === 1) {
//                 handleOptionClick(filteredOptions[0])
//             }
//         }
//     } 

//     return (
//         <div className='main' ref={dropdownRef}>
//             {label && (
//                 <label>
//                     {label}
//                 </label>
//             )}

//             <input 
//             ref={inputRef}
//             type="text"
//             value={value}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             onKeyDown={handleKeyDown}
//             placeholder={placeholder}
//             disabled={disabled}
//             className='input-style'
//             autoComplete='off'         
//             />

//             {isOpen && filteredOptions.length > 0 && (
//                 <div className='dropdown-style'>
//                     {filteredOptions.slice(0, 10).map((option, index) => (
//                         <div
//                         key={index}
//                         className='option-style'
//                         onClick={() => handleOptionClick(option)}
//                         >
//                             {option}
//                         </div>
//                     ))}
//                     {filteredOptions.length > 10 && (
//                         <div className='next-option-style'>
//                             ... and {filteredOptions.length - 10} more
//                         </div>
//                     )}
//                 </div>
//             )}

//             {isOpen && filteredOptions.length === 0 && value && (
//                 <div className='dropdown-style'>
//                     <div className='other-dropdown-style'>
//                         No matches found
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// AutoCompleteInput.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   options: PropTypes.array,
//   placeholder: PropTypes.string,
//   label: PropTypes.string,
//   disabled: PropTypes.bool
// }

// export default AutoCompleteInput