import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setusername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {handleRegister,loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }


  async function submitHandler(e) {
    e.preventDefault()
    handleRegister(username,email,password).then((response)=>{
      console.log(response);
      navigate('/')
    })

  }
  return (
    <main>
      <h1>Register</h1>
      <div className="form-container">

        <form onSubmit={submitHandler}>
          <input type="text"
            onInput={(e) => { setusername(e.target.value) }}
            name="username" placeholder='Enter username' />

          <input type="password"
            onInput={(e) => { setPassword(e.target.value) }}
            name="password" placeholder='Enter password' />

          <input type="email"
            onInput={(e) => { setEmail(e.target.value) }}
            name="email" placeholder='Enter email' />

          <button type="submit">Submit</button>
        </form>
      </div>
      <p>Don't have an Account ? <Link className='toggleAuthForm' to={'/login'}>Login</Link></p>
    </main>
  )
}

export default Register
