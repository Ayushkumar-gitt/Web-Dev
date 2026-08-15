import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import './Home.css'

const Home = () => {
    const { handleGetAllProducts } = useProduct()

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    const allProducts = useSelector(state => state.product.products)
    const products = Array.isArray(allProducts) ? allProducts : []

    const formatPrice = (price) => {
        const amount = Number(price?.amount ?? 0)
        const currency = price?.currency || 'INR'

        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency,
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="home">
            <header className="home__topbar">
                <div className="home__brandWrap">
                    <h1 className="home__brand">Snitch</h1>
                    <p className="home__tagline">Wear the attitude</p>
                </div>
            </header>

            <section className="home__hero">
                <p className="home__eyebrow">Curated Collection</p>
                <h2 className="home__title">Premium fits for every mood</h2>
                <p className="home__subtitle">Fresh arrivals from independent sellers, built for standout style.</p>
            </section>

            <section className="home__section">
                <div className="home__sectionHead">
                    <h3>All Products</h3>
                    <span>{products.length} items</span>
                </div>

                {products.length === 0 ? (
                    <div className="home__empty">
                        <p>No products yet.</p>
                    </div>
                ) : (
                    <div className="home__grid">
                        {products.map((product) => {
                            const firstImage = product?.images?.[0]?.url

                            return (
                                <article className="home__card" key={product._id}>
                                    <div className="home__media">
                                        {firstImage ? (
                                            <img src={firstImage} alt={product.title} loading="lazy" />
                                        ) : (
                                            <div className="home__placeholder">No Image</div>
                                        )}
                                    </div>

                                    <div className="home__cardBody">
                                        <div className="home__cardTop">
                                            <h4>{product.title}</h4>
                                            <p>{formatPrice(product.price)}</p>
                                        </div>
                                        <p className="home__desc">{product.description || 'No description available.'}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home
