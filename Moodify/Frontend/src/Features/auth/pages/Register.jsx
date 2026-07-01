import React from 'react'
import Formgroup from '../components/FormGroup'
import '../style/login.scss'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import FormGroup from '../components/FormGroup'

const Register = () => {

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({ email, password, username })
        navigate('/')
    }
    if (loading) {
        return <h1>Loading</h1>
        
    }

    return (
        <main className="registerPage">
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>

                    <FormGroup label='username' value={username}
                        onchange={(e) => { setUsername(e.target.value) }}
                        placeholder="Enter your name" />

                    <FormGroup value={email}
                        onchange={(e) => { setEmail(e.target.value) }}
                        label="email" placeholder="Enter your email" />

                    <FormGroup value={password}
                        onchange={(e) => { setPassword(e.target.value) }}
                        label="password" placeholder="Enter your password" />

                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </main>
    )
}

export default Register
