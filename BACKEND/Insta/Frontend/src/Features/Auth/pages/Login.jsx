import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin,loading } = useAuth()
  const navigate = useNavigate()
  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  async function submitHandler(e) {
    e.preventDefault()
    handleLogin(username, password).then((response) => {
      console.log(response);
      navigate('/')
    })
  }
  return (
    <main>
      <h1>Login</h1>
      <div className="form-container">
        <form onSubmit={submitHandler}>

          <input type="text"
            onInput={(e) => { setUsername(e.target.value) }}
            name="username" placeholder='Enter username' />

          <input type="password"
            onInput={(e) => { setPassword(e.target.value) }}
            name="password" placeholder='Enter password' />

          <button type="submit">Submit</button>

        </form>
      </div>
      <p>Already have an Account ? <Link className='toggleAuthForm' to={'/register'}>Register</Link></p>
    </main>
  )
}

export default Login
