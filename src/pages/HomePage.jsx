import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import './HomePage.css'
import axios from "axios";
import * as bootstrap from "bootstrap"
import ContactModal from "../components/ContactModal";
import { useRef } from "react"





function HomePage() {
  const modalRef = useRef(null);

    const [status, setStatus] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const [showContact, setShowContact] = useState(false);


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
        console.log("API STATUS RESPONSE:", res.data);

        setStatus(res.data);
      } catch (err) {
        console.error("Error loading API call status:", err);
      }
    };

    fetchStatus();
  }, [API_BASE_URL]);

  


  function AnimatedNumber({ target }) {
  const [value, setValue] = useState(0);
    const animatedRef = useRef(false);


  useEffect(() => {

    if (animatedRef.current) {
      setValue(target);
      return;
    }

        animatedRef.current = true;



    let start = 0;
    const duration = 1000;
    const stepTime = 30;
    const steps = Math.floor(duration / stepTime);
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <div>{value.toLocaleString()}</div>;
}

// const popover = new bootstrap.Popover('.popover-dismiss', {
//   trigger: 'focus'
// })

useEffect(() => {
  if (status) {
    const popovers = document.querySelectorAll('[data-bs-toggle="popover"]')
    popovers.forEach(el => {
      new bootstrap.Popover(el, {
        trigger: 'focus'
      })
    })
  }
}, [status])

useEffect(() => {
  if (modalRef.current) {
    const modalElement = modalRef.current;
    const bsModal = new bootstrap.Modal(modalElement);
    
    if (showContact) {
      bsModal.show();
    }

    const handleHidden = () => setShowContact(false);
    modalElement.addEventListener('hidden.bs.modal', handleHidden);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleHidden);
      bsModal.dispose();
    };
  }
}, [showContact]);


    
    return (
      <div className="page-content">

        <div className="homepage-container">
          {/* <div className="logo-container">
            <img src="/images/logo1.png" alt="spektra-logo" />

          </div> */}


          <div className="profile-intro p-5 rounded-3">
            {status && (
              <h2 className="greeting">Hi {status.username} 👋</h2>
            )}
    
              <p className="lead">Spektra lets you explore specifications across a wide spectrum of cars, helping you understand how cars evolve across generations and configurations.</p>
            
          </div>

          <section className="cta-section bg-primary text-white py-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-4 mb-lg-0 cta-container">
                  {/* <h2 className="mb-3">Explore Car Specs Instantly</h2> */}
                  <p className="lead mb-0 cta-description">Search by make, model, and year to instantly access detailed specifications across all available trims.</p>
                </div>
                <div className="search-btn-div col-lg-4 text-lg-end">
                  <Link className="cta-search-button search-btn btn btn-light btn-lg px-4 py-2 rounded-pill" to="/search">Search for a Car
                  <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                  
                  {/* <a href="#" className="btn btn-light btn-lg px-4 py-2 rounded-pill">
                    Sign Up Now
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </section>





          {status ? (





          <section className="gradient-section">
    <div className="container-fluid my-5" id="ScrollPast">
        <div className="row">
            <div className="col-md-12">
                <div className="section-title my-md-3 my-0">

                  {/* <button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here’s some amazing content. It’s very engaging. Right?">Click to toggle popover</button> */}

                  



                    <h2> <span type="button" data-bs-toggle="popover" tabIndex="0" data-bs-placement="top" data-bs-trigger="focus" data-bs-title="Why search limits have been set" data-bs-content="Each search uses one API call to fetch detailed car data from a third-party provider. To ensure fair usage and consistent performance for all users, Spektra applies a monthly search limit.">ⓘ</span> Monthly Usage Overview for</h2>
                    <p><strong>{status.month_year}</strong> </p>
                </div>
            </div>
        </div>

<div className="container py-5">
  <div className="row row-cols-1 row-cols-md-3 g-4">
    <div className="col">
      <div className="card h-100 text-center shadow">
        <div className="card-body">
          <div className="display-4 text-primary mb-2">
            <i className="bi bi-search"></i>
          </div>
          <h2 className="card-title mb-3"><AnimatedNumber target={status.callsUsed} /></h2>
          <p className="card-text text-muted">Searches made this month</p>
        </div>
      </div>
    </div>
    
    <div className="col">
      <div className="card h-100 text-center shadow">
        <div className="card-body">
          <div className="display-4 text-success mb-2">
<i className="bi bi-clipboard-data"></i>
          </div>
          <h2 className="card-title mb-3"><AnimatedNumber target={status.callLimit - status.callsUsed} /></h2>
          <p className="card-text text-muted">Searches left</p>
        </div>
      </div>
    </div>
    
    <div className="col">
      <div className="card h-100 text-center shadow">
        <div className="card-body">
          <div className="display-4 text-warning mb-2">
            <i className="bi bi-calendar-event"></i>
          </div>
          <h2 className="card-title mb-3"><AnimatedNumber target={status.daysRemaining} /></h2>
          <p className="card-text text-muted">Days left for search limit to reset</p>
        </div>
      </div>
    </div>
  </div>
</div>

        
    </div>
</section>

) : (
        <p>Loading usage...</p>
      )}




<div className="d-flex justify-content-center my-5 dashboard-cta-wrapper">

      <div className="card card-sleek">
  <div className="card-body">
    <h5 className="card-title">Explore Previous Searches</h5>
    <p className="card-text">See the cars you’ve already explored and continue where you left off.</p>
    <Link to="/dashboard" className="btn btn-sleek"> Go to Dashboard </Link>

    {/* <a href="#" className="btn btn-sleek">Go to Dashboard</a> */}
  </div>
</div>
</div>




      <div className="alert alert-success" role="alert">
  <h4 className="alert-heading"> <i className="bi bi-exclamation-triangle"></i> Disclaimer</h4>
  <p>Spektra retrieves vehicle specifications via third-party automotive APIs. Data availability and accuracy may vary depending on manufacturer disclosures and periodic updates from the API providers.</p>
  <hr />
  <p className="mb-0">Have questions, feedback, or suggestions? We’d love to hear from you.<button 
  type="button" 
  onClick={() => setShowContact(true)} 
  className="btn btn-link"
>
  Contact Us
</button> </p> <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
</div>

<div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <img src="./images/logo1.png" className="img-fluid contact-modal-logo" style={{height: 50}} alt="logo" />
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      </div>
    </div>
  </div>
</div>









      {/* <Link to="/dashboard" className="homepage-dashboard-link">
        View your previous searches
      </Link> */}
    </div>
    </div>
    );
}


export default HomePage