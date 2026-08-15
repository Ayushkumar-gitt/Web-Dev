import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useProduct } from '../hooks/useProduct.js'
import './createProduct.css'

/* ─── SVG icon helper ──────────────────────────────────────── */
const I = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        {...props} />
)
const IcoArrowLeft = () => <I><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></I>
const IcoPlus      = () => <I><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></I>
const IcoX         = () => <I><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></I>

/* ─── Constants ─────────────────────────────────────────────── */
const MAX_IMAGES = 7
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP']

/* ─── Component ─────────────────────────────────────────────── */
const CreateProduct = () => {
    const { handleCreateProduct } = useProduct()
    const navigate = useNavigate()

    /* Fix: register.css sets overflow:hidden on html/body globally.
       We override it here so this page can scroll vertically.     */
    useEffect(() => {
        const prevHO = document.documentElement.style.overflow
        const prevBO = document.body.style.overflow
        const prevBH = document.body.style.height
        const prevHH = document.documentElement.style.height

        document.documentElement.style.overflow = 'auto'
        document.documentElement.style.height   = 'auto'
        document.body.style.overflow             = 'auto'
        document.body.style.height               = 'auto'

        return () => {
            document.documentElement.style.overflow = prevHO
            document.documentElement.style.height   = prevHH
            document.body.style.overflow             = prevBO
            document.body.style.height               = prevBH
        }
    }, [])

    // ── State ──────────────────────────────────────────────────
    const [form, setForm] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    })
    const [images, setImages] = useState([])   // { file, previewUrl }[]
    const [errors, setErrors]   = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleImageSelect = (e) => {
        const files  = Array.from(e.target.files)
        const toAdd  = files.slice(0, MAX_IMAGES - images.length)
        setImages((prev) => [
            ...prev,
            ...toAdd.map((file) => ({ file, previewUrl: URL.createObjectURL(file) })),
        ])
        if (errors.images) setErrors((prev) => ({ ...prev, images: '' }))
        e.target.value = ''
    }

    const removeImage = (i) => {
        setImages((prev) => {
            URL.revokeObjectURL(prev[i].previewUrl)
            return prev.filter((_, idx) => idx !== i)
        })
    }

    const validate = () => {
        const e = {}
        if (!form.title.trim())       e.title       = 'Title is required'
        if (!form.description.trim()) e.description = 'Description is required'
        if (!form.priceAmount || isNaN(form.priceAmount) || Number(form.priceAmount) <= 0)
            e.priceAmount = 'Enter a valid price'
        if (images.length === 0)      e.images      = 'Add at least one image'
        return e
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }

        setLoading(true)
        try {
            const fd = new FormData()
            fd.append('title', form.title)
            fd.append('description', form.description)
            fd.append('priceAmount', form.priceAmount)
            fd.append('priceCurrency', form.priceCurrency)
            images.forEach(({ file }) => fd.append('images', file))
            await handleCreateProduct(fd)
            navigate('/')
        } catch (err) {
            console.error(err)
            setErrors({ general: 'Something went wrong. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="cp">

            {/* ── Brand tag ──────────────────────────── */}
            <div className="cp__topbar">
                <span className="cp__brandName">Snitch</span>
            </div>

            {/* ── Page heading ───────────────────────── */}
            <div className="cp__pageHeader">
                <button className="cp__backBtn" onClick={() => navigate(-1)} aria-label="Go back">
                    <IcoArrowLeft />
                </button>
                <h1 className="cp__pageTitle">New Listing</h1>
            </div>

            {/* Hairline rule */}
            <div className="cp__divider" />

            {/* ── API error ──────────────────────────── */}
            {errors.general && (
                <div className="cp__errBanner">{errors.general}</div>
            )}

            {/* ── Form ───────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate>

                {/* Two-column grid */}
                <div className="cp__content">

                    {/* LEFT — text fields */}
                    <div className="cp__formCol">

                        {/* Title */}
                        <div className="cp__field">
                            <label className="cp__label" htmlFor="title">Product Title</label>
                            <input
                                id="title"
                                className="cp__input"
                                type="text"
                                name="title"
                                placeholder="e.g. Oversized Cotton Tee"
                                value={form.title}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.title && <span className="cp__err">{errors.title}</span>}
                        </div>

                        {/* Description */}
                        <div className="cp__field">
                            <label className="cp__label" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="cp__textarea"
                                name="description"
                                rows={5}
                                placeholder="Describe the product — material, fit, style..."
                                value={form.description}
                                onChange={handleChange}
                            />
                            {errors.description && <span className="cp__err">{errors.description}</span>}
                        </div>

                        {/* Price */}
                        <div className="cp__field">
                            <label className="cp__label">Price</label>
                            <div className="cp__priceRow">

                                <div className="cp__subField">
                                    <span className="cp__subLabel">Amount</span>
                                    <input
                                        id="priceAmount"
                                        className="cp__input"
                                        type="number"
                                        name="priceAmount"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        value={form.priceAmount}
                                        onChange={handleChange}
                                    />
                                    {errors.priceAmount && (
                                        <span className="cp__err">{errors.priceAmount}</span>
                                    )}
                                </div>

                                <div className="cp__subField">
                                    <span className="cp__subLabel">Currency</span>
                                    <select
                                        id="priceCurrency"
                                        className="cp__select"
                                        name="priceCurrency"
                                        value={form.priceCurrency}
                                        onChange={handleChange}
                                    >
                                        {CURRENCIES.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* RIGHT — images */}
                    <div className="cp__imagesCol">

                        <div className="cp__imagesHeader">
                            <span className="cp__imagesLabel">Images</span>
                            <span className="cp__imagesCount">{images.length} / {MAX_IMAGES}</span>
                        </div>

                        <div className="cp__imageGrid">

                            {/* Filled thumbnails */}
                            {images.map((img, i) => (
                                <div key={img.previewUrl} className="cp__thumb">
                                    <img src={img.previewUrl} alt={`Image ${i + 1}`} className="cp__thumbImg" />
                                    <button
                                        type="button"
                                        className="cp__thumbRemove"
                                        onClick={() => removeImage(i)}
                                        aria-label={`Remove image ${i + 1}`}
                                    >
                                        <IcoX />
                                    </button>
                                </div>
                            ))}

                            {/* Empty upload slot */}
                            {images.length < MAX_IMAGES && (
                                <div className="cp__uploadSlot">
                                    <input
                                        className="cp__uploadSlotInput"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageSelect}
                                        aria-label="Upload images"
                                    />
                                    <IcoPlus />
                                    <span className="cp__uploadSlotHint">Add photo</span>
                                </div>
                            )}

                        </div>

                        {errors.images && (
                            <span className="cp__err" style={{ marginTop: '0.5rem', display: 'block' }}>
                                {errors.images}
                            </span>
                        )}

                    </div>

                </div>

                {/* ── Full-width Publish button ───────── */}
                <div className="cp__footer">
                    <button
                        id="create-product-submit-btn"
                        className="cp__btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading && <span className="cp__spinner" />}
                        {loading ? 'Publishing…' : 'Publish Listing'}
                    </button>

                    <p className="cp__footerNote">
                        Changed your mind?{' '}
                        <span onClick={() => navigate(-1)}>Go back</span>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default CreateProduct
