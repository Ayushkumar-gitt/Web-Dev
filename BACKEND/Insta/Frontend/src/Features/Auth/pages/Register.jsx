import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  return (
    <main>
      <h1>Register</h1>
      <div className="form-container">
        <form onSubmit={function (e) { e.preventDefault() }}>
          <input type="text" name="username" placeholder='Enter username' />
          <input type="password" name="password" placeholder='Enter password' />
          <input type="email" name="email" placeholder='Enter email' />
          <button type="submit">Submit</button>
        </form>
      </div>
      <p>Don't have an Account ? <Link className='toggleAuthForm' to={'/login'}>Login</Link></p>
    </main>
  )
}

export default Register
