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
        
        setToken(data.token)
        navigate('/homepage')

    }

        console.log(isLogin ? 'Logging in....' : 'Signing Up.....', {email, password, username})
    

    return (
        <div className='main-container'>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form action="" onSubmit={handleSubmit} className=''>

                {!isLogin && (

                    <div className='authentication-form'>
                    <input type="name"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                     />
                    </div>
                )}

                <div className='authentication-form'>
                    <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                     />
                </div>  

                <div className='authentication-form'>
                    <input type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                {!isLogin && (
                  <div className='authentication-form'>
                    <input type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </div>  
                )}


                <button type='submit' className='user-authenticator'>
                    Submit
                </button>  

                {error && <p>{error}</p>}
          
            </form>

            <div className="auth-options">
            <button onClick={() => viewLogin(false)} style={{ backgroundColor : !isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}>Sign Up</button>
            <button onClick={() => viewLogin(true)} style={{ backgroundColor : isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}>Login</button> 
          </div>


            <div className="oAuth-div">
            <div className="option-title">
                <div className="dash-line"></div>
                <div><p>or register with</p></div>
                <div className="dash-line"></div>
            </div>
    
            <div className="auth-options">
                <a href="google"> <button className="google"><img src="/google-logo-9808 1.png" alt="Google Icon" className="google-icon" />
                    Google</button> </a>    
            </div>
    
        </div>

        </div>
    )
}

AuthPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default AuthPage

