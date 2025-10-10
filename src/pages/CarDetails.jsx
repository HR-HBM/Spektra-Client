import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CarDetails.css'



function CarDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { car } = location.state || {}

  if (!car) {
    return (
      <div className='message'>
        <h2>Car not found</h2>
        <button onClick={() => navigate('/search')}>Go Back to Search</button>
      </div>
    )
  }

  const formatFieldName = (key) => {
    return key.replace(/model_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return "N/A"
    
    if (key.includes('cc')) return `${value} cc`
    if (key.includes('power_ps')) return `${value} PS`
    if (key.includes('torque_nm')) return `${value} Nm`
    if (key.includes('weight_kg')) return `${value} lbs`
    if (key.includes('fuel_cap_l')) return `${value} gallons`
    if (key.includes('lkm')) return `${value} mpg`
    
    return value
  }

  return (
    <div style={{ padding: '20px' }}>
      <button className='prev-page-navigator' onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className='brief-car-specs'>
        <h1 className='trim-subheading'>
          {car.model_trim}
        </h1>
        
        <div className='specs-grid'>
          {Object.entries(car).map(([key, value]) => (
            <div className='displayed-spec' key={key}>
              <strong className='spec-key'>{formatFieldName(key)}:</strong>{' '}
              <span className='spec-value'>{formatValue(key, value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarDetails