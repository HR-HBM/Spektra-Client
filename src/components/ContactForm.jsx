import { useState } from "react";
import { Link } from 'react-router-dom'
import './ContactForm.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function ContactForm({ isInModal = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="contact-success">
        <h3>Your message was submitted successfully!</h3>
        <Link to="/" className="btn btn-link">Return to Homepage</Link>      
      </div>
    );
  }

  return (

    <div className="container">
    <div className="row justify-content-center">
        <div className={isInModal ? "col-12" : "col-md-8 col-lg-6"}>

			<form onSubmit={handleSubmit} className="contact-form">
                                <h2 className="text-center mb-4">Contact Us</h2>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control" id="name"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control" id="email"
          placeholder="Your email address"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          name="message"
          className="form-control message" id="message"
          placeholder="Your message / inquiry"
          required
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
            </button>
      </div>

      

      {error && <p className="error-text">{error}</p>}
    </form>
		</div>
	</div>
    </div>




    
    



  );
}

export default ContactForm;
