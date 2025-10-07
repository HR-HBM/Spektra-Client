import React from "react"
import { Link } from 'react-router-dom'
import './HomePage.css'


function HomePage() {
    return (
        <div>
            <p>Add description about what the app can do</p>
            <p>add description about rate limits</p>
            <p>add instructions about accessing previous search quesries</p>
            <Link to="/dashboard" className="">
            View your previous searches here
            </Link>
        </div>

    )
}

export default HomePage