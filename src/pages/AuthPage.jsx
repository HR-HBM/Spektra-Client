import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthPage.css'


function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // authentication logic goes here
        console.log(isLogin ? 'Logging in....' : 'Signing Up.....', {email, password})

        // temporary access to search page
        navigate('/search')
    }

    return (
        <div className='main-container'>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form action="" onSubmit={handleSubmit} className=''>
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

                <button type='submit' className='user-authenticator'>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>            
            </form>

            <p className='authentication-options'>
                {isLogin ? "Don't have and account? " : "Already have an account? "}
                <button className='options' onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </div>
    )
}

export default AuthPage

