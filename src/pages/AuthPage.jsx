import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthPage.css'


function AuthPage() {
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


    const handleSubmit = (e) => {
        e.preventDefault()
        // authentication logic goes here
        // ****** add localstorage to save user details and clear details on logout
         if (!isLogin && password !== confirmPassword) {
            setError('Make sure passwords match!')
            return
            }

        console.log(isLogin ? 'Logging in....' : 'Signing Up.....', {email, password})

        // temporary access to search page
        navigate('/homepage')
    }

    return (
        <div className='main-container'>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form action="" onSubmit={handleSubmit} className=''>

                {!isLogin && (
                  <div className='authentication-form'>{!isLogin}
                    <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                     />
                </div>  
                )}


                <div className='authentication-form'>
                    <input type="name"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

            {/* <p className='authentication-options'>
                {isLogin ? "Don't have and account? " : "Already have an account? "}
                <button className='options' onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p> */}

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

export default AuthPage

