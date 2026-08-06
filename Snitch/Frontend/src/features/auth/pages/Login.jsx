import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import heroImg from '../../../assets/fashion-hero.png'
import './register.css' // Reusing register styles
import { useNavigate } from 'react-router'
import ContinueWithGoogle from '../components/ContinueWithGoogle.jsx'

/* ── Tiny SVG icons ─────────────────────────────────────────── */
const I = (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" {...p} />
)
const IcoMail = () => <I><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></I>
const IcoLock = () => <I><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></I>
const IcoEye = () => <I><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></I>
const IcoEyeOff = () => <I><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></I>

const Login = () => {
    const { loginHandler } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const set = (e) => {
        const { name, value } = e.target
        setForm((p) => ({ ...p, [name]: value }))
        if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
    }

    const validate = () => {
        const e = {}
        if (!form.email.trim()) e.email = 'Required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
        if (!form.password) e.password = 'Required'
        return e
    }

    const submit = async (ev) => {
        ev.preventDefault()
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }
        setLoading(true)
        try {
            await loginHandler(form)
            navigate('/')
        }
        catch (err) {
            console.error(err)
            setErrors({ general: 'Invalid email or password' })
        }
        finally { setLoading(false) }
    }

    return (
        <div className="reg">

            {/* ── Left: Fashion Visual ────────────────────────────── */}
            <div className="reg__visual">
                <img className="reg__img" src={heroImg} alt="Snitch fashion" />
                <div className="reg__watermark">
                    <span>Snitch</span>
                    <span className="reg__tagline">Wear the attitude</span>
                </div>
            </div>

            {/* ── Right: Form ─────────────────────────────────────── */}
            <div className="reg__formSide">
                <div className="reg__card">

                    <div className="reg__head">
                        <h1 className="reg__brand">Snitch</h1>
                        <p className="reg__title">Sign in to your account</p>
                    </div>

                    <form className="reg__form" onSubmit={submit} noValidate>
                        {errors.general && <span className="reg__err">{errors.general}</span>}
                        <div className="reg__field">
                            <label className="reg__label" htmlFor="email">Email</label>
                            <div className="reg__inputWrap">
                                <span className="reg__ico"><IcoMail /></span>
                                <input id="email" className="reg__input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={set} autoComplete="email" />
                            </div>
                            {errors.email && <span className="reg__err">{errors.email}</span>}
                        </div>

                        <div className="reg__field">
                            <label className="reg__label" htmlFor="password">Password</label>
                            <div className="reg__inputWrap">
                                <span className="reg__ico"><IcoLock /></span>
                                <input id="password" className="reg__input" type={showPw ? 'text' : 'password'} name="password" placeholder="Your password" value={form.password} onChange={set} autoComplete="current-password" />
                                <button type="button" className="reg__pwToggle" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide' : 'Show'}>
                                    {showPw ? <IcoEyeOff /> : <IcoEye />}
                                </button>
                            </div>
                            {errors.password && <span className="reg__err">{errors.password}</span>}
                        </div>
                        <ContinueWithGoogle />
                        
                        <button id="login-submit-btn" className="reg__btn" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
                            {loading && <span className="reg__spinner" />}
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>

                    </form>

                    <p className="reg__footer">
                        Don't have an account? <a href="/register">Create one</a>
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Login
