import React, { useState } from 'react'
import './lockscreen.scss'

const PASSWORD = 'ayush'

const LockScreen = ({ isShutdown, setIsLocked, setIsShutdown }) => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isUnlocking, setIsUnlocking] = useState(false)

    const unlock = (event) => {
        event.preventDefault()

        if (password.toLowerCase() !== PASSWORD) {
            setError('Password is incorrect')
            setPassword('')
            return
        }

        setError('')
        setIsUnlocking(true)
        setTimeout(() => {
            setIsLocked(false)
        }, 520)
    }

    const powerOn = () => {
        setIsShutdown(false)
        setIsLocked(true)
    }

    if (isShutdown) {
        return (
            <section className="shutdown-screen">
                <button onClick={powerOn}>Power On</button>
            </section>
        )
    }

    return (
        <section className={`lock-screen ${isUnlocking ? 'unlocking' : ''}`}>
            <form className="login-card" onSubmit={unlock}>
                <div className="avatar">
                    <span></span>
                </div>
                <h1>Ayush</h1>
                <div className="password-row">
                    <input
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                            setError('')
                        }}
                        type="password"
                        placeholder="Password"
                        autoFocus
                    />
                    <button type="submit">Open</button>
                </div>
                {error && <p className="password-error">{error}</p>}
            </form>
        </section>
    )
}

export default LockScreen
