import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CarDetails.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


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

  const pageHeading = `${car.model_year} ${car.model_trim}`
  const imageSearch = `${car.model_year} ${car.model_make_id} ${car.model_name}`



  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content')
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = 210
      const pageHeight = 295

      const margin = 15
      const imgWidth = pageWidth - margin*2

      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = margin

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
      heightLeft -= pageHeight - margin*2

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
        heightLeft -= pageHeight - margin*2
      }

      pdf.save(`${car.model_year} ${car.model_make_id} ${car.model_name} ${car.model_trim || 'car'}-details.pdf`)
    })
  }

  return (
    <div style={{ padding: '20px' }}>

      <button className='prev-page-navigator' onClick={() => navigate(-1)}>
        ← Back
      </button>

      <button 
        onClick={handleDownloadPDF} 
        className='download-pdf-btn' 
        style={{ marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
      >
        ⬇️ Download PDF
      </button>

      <a href={`https://www.google.com/search?q=${imageSearch}&tbm=isch`}>View {imageSearch}</a>


      <div className='brief-car-specs' id='pdf-content'>
        <h1 className='trim-subheading'>
          {pageHeading}
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