import React from 'react'
import './Auth.css'

const Register = () => {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <p className="auth-eyebrow">Create account</p>
          <h1>Join Perplexity</h1>
          <p className="auth-subtitle">
            Sign up with your username, email, and password.
          </p>
        </div>

        <form className="auth-form">
          <label className="auth-field" htmlFor="register-username">
            <span>Username</span>
            <input
              id="register-username"
              name="username"
              type="text"
              placeholder="Choose a username"
            />
          </label>

          <label className="auth-field" htmlFor="register-email">
            <span>Email</span>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </label>

          <label className="auth-field" htmlFor="register-password">
            <span>Password</span>
            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
          </label>

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>
      </section>
    </main>
  )
}

export default Register
