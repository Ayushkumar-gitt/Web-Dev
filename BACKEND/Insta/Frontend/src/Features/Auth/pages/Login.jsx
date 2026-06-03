import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
const Login = () => {
  return (
    <main>
      <h1>Login</h1>
      <div className="form-container">
        <form onSubmit={function (e) { e.preventDefault() }}>
          <input type="text" name="username" placeholder='Enter username' />
          <input type="password" name="password" placeholder='Enter password' />

          <button type="submit">Submit</button>
        </form>
      </div>
      <p>Already have an Account ? <Link className='toggleAuthForm' to={'/register'}>Register</Link></p>
    </main>
  )
}

export default Login
