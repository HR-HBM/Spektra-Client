import React from "react"
import { Link } from 'react-router-dom'
import './LandingPage.css'
import TypewriterEffect from "../components/TypewriterEffect";
import { useEffect } from "react";
import * as bootstrap from "bootstrap";



function LandingPage() {

    useEffect(() => {
        const carouselElement = document.querySelector("#carouselExampleAutoplaying");

        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
            interval: 6000,   // 3 seconds
            ride: "carousel",
            pause: false,
            wrap: true
            });
        }
        }, []);

    return (
        <div className="landingpage-main-div">
             
            <div className="px-4 py-5 my-5 text-center"> 
                <img className="d-block mx-auto mb-4 logo" src="/images/logo1.png" alt="" width="72" height="57" /> 
                <h1 className="fs-1 fs-md-2 fs-sm-3 display-4 text-body-emphasis">Discover Car Specs. Instantly</h1> 
                <div className="col-lg-6 mx-auto"> 
                    <div className="animated-text-container">
                <TypewriterEffect />
            </div>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center"> 
                        <div className="get-started">
                            <Link to="/auth" className="btn btn-outline-primary">
                             Get Started
                            </Link>
                        </div>
                    </div> 
                </div> 
            </div>

            <div className="carousel-container">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="3" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            <img src="/images/car1.jpg" className="d-block img-fluid" alt="image 1" />
                            <div className="carousel-overlay"></div>

                            <div className="carousel-caption">
                                <h5 className="fs-6 fs-md-4">Search by make, model, year</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="/images/car2.jpg" className="d-block img-fluid" alt="image 2" />
                            <div className="carousel-overlay"></div>

                            <div className="carousel-caption">
                                <h5 className="fs-6 fs-md-4">Browse a broad range of available trims</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="/images/car3.jpg" className="d-block img-fluid" alt="image 3" />
                            <div className="carousel-overlay"></div>

                            <div className="carousel-caption">
                                <h5 className="fs-6 fs-md-4">View comprehensive specs for engines, performance, safety, and more</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="/images/car4.jpg" className="d-block img-fluid" alt="image 4" />
                            <div className="carousel-overlay"></div>
                            
                            <div className="carousel-caption">
                                <h5 className="fs-6 fs-md-4" >Track and revisit your searches easily</h5>
                            </div>  
                        </div> 
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>

                </div>
            </div> 

            <div className="px-4 py-5 my-5 text-center"> 
                <div className="col-lg-6 mx-auto"> 
                    <p className="lead lead-sm-2 mb-4">Spektra helps you instantly explore trims and technical details for thousands of vehicles. Whether you're researching, comparing, or just curious, your car knowledge starts here.</p> 
                </div> 
            </div>

            <div className="get-started">
                <Link to="/auth" className="btn btn-outline-primary">
                Sign Up to Search
                </Link>
            </div>
                               
            
                      
        </div>
    )
}

export default LandingPage




