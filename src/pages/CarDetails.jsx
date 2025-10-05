import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function CarDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { car } = location.state || {}

  if (!car) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
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
      <button onClick={() => navigate(-1)} style={{ 
        marginBottom: '20px',
        padding: '8px 16px', 
        backgroundColor: '#6c757d', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        ← Back
      </button>

      <div style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0'
      }}>
        <h1 style={{ color: '#2c5aa0', borderBottom: '2px solid #2c5aa0', paddingBottom: '10px' }}>
          {car.model_trim}
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '15px',
          marginTop: '20px'
        }}>
          {Object.entries(car).map(([key, value]) => (
            <div key={key} style={{ 
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e0e0e0'
            }}>
              <strong style={{ color: '#555' }}>{formatFieldName(key)}:</strong>{' '}
              <span style={{ color: '#333' }}>{formatValue(key, value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarDetails