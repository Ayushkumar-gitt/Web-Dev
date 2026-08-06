import React, { useState } from 'react'
import { useAuth } from '../hook/useAuth'
import heroImg from '../../../assets/fashion-hero.png'
import './register.css'
import { useNavigate } from 'react-router'
import ContinueWithGoogle from '../components/ContinueWithGoogle.jsx'

/* ── Tiny SVG icons ─────────────────────────────────────────── */
const I = (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" {...p} />
)
const IcoUser = () => <I><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0 1 14 0" /></I>
const IcoMail = () => <I><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></I>
const IcoPhone = () => <I><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.6 1.27a2 2 0 0 1 1.94-1.27h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.36a2 2 0 0 1-.45 2.11L8.91 8.05a16 16 0 0 0 6.16 6.16l1.86-1.86a2 2 0 0 1 2.11-.45c.76.32 1.55.55 2.36.68a2 2 0 0 1 1.72 2z" /></I>
const IcoLock = () => <I><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></I>
const IcoEye = () => <I><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></I>
const IcoEyeOff = () => <I><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></I>
const IcoCheck = () => <I strokeWidth="3"><polyline points="20 6 9 17 4 12" /></I>

const Register = () => {
    const { registerHandler } = useAuth()
    const [form, setForm] = useState({ fullname: '', email: '', contact: '', password: '', isSeller: false })
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const set = (e) => {
        const { name, value, type, checked } = e.target
        setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
        if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
    }

    const validate = () => {
        const e = {}
        if (!form.fullname.trim()) e.fullname = 'Required'
        if (!form.email.trim()) e.email = 'Required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
        if (!form.contact.trim()) e.contact = 'Required'
        if (!form.password) e.password = 'Required'
        else if (form.password.length < 6) e.password = 'Min 6 chars'
        return e
    }

    const submit = async (ev) => {
        ev.preventDefault()
        setLoading(true)
        try {
            await registerHandler(form)
            navigate('/')
        }
        catch (err) {
            console.error(err)
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
                        <p className="reg__title">Create your account to start shopping</p>
                    </div>

                    <form className="reg__form" onSubmit={submit} noValidate>

                        <div className="reg__field">
                            <label className="reg__label" htmlFor="fullname">Full Name</label>
                            <div className="reg__inputWrap">
                                <span className="reg__ico"><IcoUser /></span>
                                <input id="fullname" className="reg__input" name="fullname" placeholder="John Doe" value={form.fullname} onChange={set} autoComplete="name" />
                            </div>
                            {errors.fullname && <span className="reg__err">{errors.fullname}</span>}
                        </div>

                        <div className="reg__field">
                            <label className="reg__label" htmlFor="email">Email</label>
                            <div className="reg__inputWrap">
                                <span className="reg__ico"><IcoMail /></span>
                                <input id="email" className="reg__input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={set} autoComplete="email" />
                            </div>
                            {errors.email && <span className="reg__err">{errors.email}</span>}
                        </div>

                        <div className="reg__field">
                            <label className="reg__label" htmlFor="contact">Contact Number</label>
                            <div className="reg__inputWrap">
                                <span className="reg__ico"><IcoPhone /></span>
                                <input id="contact" className="reg__input" type="tel" name="contact" placeholder="+91 98765 43210" value={form.contact} onChange={set} autoComplete="tel" />
                            </div>
                            {errors.contact && <span className="reg__err">{errors.contact}</span>}
                        </div>

                        <div className="reg__field">
                            <label className="reg__label" htmlFor="password">Password</label>
                            <div className="reg__inputWrap">
                                <span className="reg__ico"><IcoLock /></span>
                                <input id="password" className="reg__input" type={showPw ? 'text' : 'password'} name="password" placeholder="Min. 6 characters" value={form.password} onChange={set} autoComplete="new-password" />
                                <button type="button" className="reg__pwToggle" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide' : 'Show'}>
                                    {showPw ? <IcoEyeOff /> : <IcoEye />}
                                </button>
                            </div>
                            {errors.password && <span className="reg__err">{errors.password}</span>}
                        </div>

                        <div className="reg__sep"><span className="reg__sepTxt">options</span></div>

                        <label className="reg__seller" htmlFor="isSeller">
                            <input id="isSeller" className="reg__sellerCb" type="checkbox" name="isSeller" checked={form.isSeller} onChange={set} />
                            <span className="reg__check">
                                <span className="reg__checkIco"><IcoCheck /></span>
                            </span>
                            <span className="reg__sellerInfo">
                                <span className="reg__sellerMain">Register as a Seller</span>
                                <span className="reg__sellerSub">List &amp; sell your clothing on Snitch</span>
                            </span>
                        </label>

                        <ContinueWithGoogle />

                        <button id="register-submit-btn" className="reg__btn" type="submit" disabled={loading}>
                            {loading && <span className="reg__spinner" />}
                            {loading ? 'Creating…' : 'Create Account'}
                        </button>

                    </form>

                    <p className="reg__footer">
                        Already have an account? <a href="/login">Sign in</a>
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Register