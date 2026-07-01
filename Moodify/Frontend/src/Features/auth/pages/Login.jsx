import React from 'react'
import '../style/login.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }

  return (
    <main className="loginPage">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          <FormGroup value={email} onchange={(e) => { setEmail(e.target.value) }} label="email" placeholder="Enter your email" />
          <FormGroup value={password} onchange={(e) => { setPassword(e.target.value) }} label="password" placeholder="Enter your password" />

          <button type="submit">Login</button>

        </form>

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  )
}

export default Login
