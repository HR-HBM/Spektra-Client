import React from "react"
import { Link } from 'react-router-dom'
import './LandingPage.css'
// import './Footer.jsx'


function LandingPage() {
    return (
        <div className="landingpage-main-div">
            <h1>Welcome to Spektra</h1>
            <p>Your Ultimate car specification lookup tool</p>
            <p>Discover detailed specifications for a wide range of car makes and models</p>

            <div className="get-started">
                <Link to="/auth" className="get-started-link">
                Get Started
                </Link>
            </div>
        </div>
    )
}

export default LandingPage