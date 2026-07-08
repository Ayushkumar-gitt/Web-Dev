import React, { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const navigate = useNavigate()
    const { handleLogin } = useAuth()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!email.trim() || !password) {
            setFormError('Email and password are required')
            return
        }
        await handleLogin({ email: email, password })
        navigate('/')

    }
    if (!loading && user) {
        return navigate('/')
    }
    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-copy">
                    <p className="auth-eyebrow">Welcome back</p>
                    <h1>Log in to Perplexity</h1>
                    <p className="auth-subtitle">
                        Access your account with your email and password.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="auth-form">
                    <label className="auth-field" htmlFor="login-email">
                        <span>Email</span>
                        <input onInput={(e) => setemail(e.target.value)}
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </label>

                    <label className="auth-field" htmlFor="login-password">
                        <span>Password</span>
                        <input onInput={(e) => setpassword(e.target.value)}
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </label>

                    <button className="auth-button" type="submit">
                        Log In
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Login
