import React, { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './AuthPage.css'



async function loginUser(credentials, endpoint) {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL            
    
     return fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

   .then(data => data.json())
}


function AuthPage({ setToken }) {

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)


    const navigate = useNavigate()

    const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isLogin && password !== confirmPassword) {
            setError('Make sure passwords match!')
            return
        }

        const endpoint = isLogin ? 'login' : 'signup'
        const payload = isLogin ? { email, password } : { email, password, username };

        const data = await loginUser(payload, endpoint);
        if (data.detail) {
            setError(data.detail); 
            return;
        }

        // Save token and email
        const userObj = { token: data.token, email: data.email };
        localStorage.setItem('token', JSON.stringify(userObj));
        
        setToken(userObj);
        navigate('/homepage')

    }    

    return (
        <div className='main-container'>
            <section className="" style={{backgroundColor: "#9A616D"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{borderRadius: "1rem"}}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="/images/car1.jpg" alt="login form" className="img-fluid auth-page-image" style={{borderRadius: "1rem 0 0 1rem"}} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form action="" onSubmit={handleSubmit} className=''>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <img src="/images/logo1.png" alt='logo' className='auth-logo' />
                                                </div>

                                                <h4 className="fw-bold mb-2 text-uppercase">Access Automotive Insights</h4>
                                                <p className="text-dark-50 mb-5">{isLogin ? 'Login to continue exploring' : 'Sign Up to begin your journey with Spektra.'}</p>

                                                {!isLogin && (
                                                    
                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form2Example17">Username</label>
                                                        <input type="name"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                        className="form-control form-control-lg" />
                                                    </div>
                                                )}

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                    <input type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="form-control form-control-lg"
                                                />
                                                </div> 

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                    <input type='password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="form-control form-control-lg"
                                                    />
                                                </div>

                                                {!isLogin && (
                                                    <div className="form-outline mb-4">

                                                        <label className="form-label" htmlFor="form2Example27">
                                                            Confirm Password
                                                        </label>

                                                         <input type='password'
                                                         value={confirmPassword}
                                                         onChange={(e) => setConfirmPassword(e.target.value)}
                                                         required
                                                        className="form-control form-control-lg"
                                                        />
                                                    </div>  
                                                )}   
                                                <div className="pt-1 mb-4">
                                                    <button type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block">
                                                        Submit
                                                    </button>
                                                </div>
                                                
                                                {error && <p>{error}</p>}

                                                {!isLogin && (
                                                    <p className="login-signup mb-5 pb-lg-2" style={{color: "#393f8"}}>Already have an account? <button onClick={() => viewLogin(true)} type="button" className="btn btn-link">Login</button></p>
                                                )}

                                                {isLogin && (
                                                    <p className="login-signup mb-5 pb-lg-2" style={{color: "#393f8"}}>Don't have an account? <button onClick={() => viewLogin(false)} type="button" className="btn btn-link">Sign Up</button></p>
                                                )}

                                            </form>


                                            <div className="d-flex justify-content-center text-center mt-4 pt-1">

                                                <a href="#!" className="text-dark"><i className="fab fa-facebook-f fa-lg"></i></a>
                                                <a href="#!" className="text-dark"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                                <a href="#!" className="text-dark"><i className="fab fa-google fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

AuthPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default AuthPage

