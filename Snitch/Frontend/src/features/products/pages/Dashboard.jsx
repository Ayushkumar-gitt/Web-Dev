import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { useProduct } from '../hooks/useProduct'
import './Dashboard.css'

const Dashboard = () => {
    const { handleGetProduct } = useProduct()
    const sellerProducts = useSelector(state => state.product?.sellerProducts)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await handleGetProduct()
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: price?.currency || 'INR',
            maximumFractionDigits: 0,
        }).format(price?.amount || 0)
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Seller Dashboard</h1>
                <Link to="/seller/create" className="create-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Product
                </Link>
            </header>

            {isLoading ? (
                <div className="loading-container">
                    <span className="loader"></span>
                </div>
            ) : (
                <main className="products-grid">
                    {sellerProducts && sellerProducts.length > 0 ? (
                        sellerProducts.map((product) => (
                            <div key={product._id} className="product-card">
                                <div className="product-image-container">
                                    <img 
                                        src={product.images && product.images.length > 0 ? product.images[0].url : 'https://placehold.co/400x500/1f222b/white?text=No+Image'} 
                                        alt={product.title} 
                                        className="product-image"
                                    />
                                    <div className="product-image-overlay"></div>
                                </div>
                                <div className="product-content">
                                    <div className="product-price-badge">
                                        {formatPrice(product.price)}
                                    </div>
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-description">{product.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <h3>No Products Yet</h3>
                            <p>You haven't listed any products. Start building your catalog today!</p>
                            <Link to="/seller/create" className="create-btn">
                                Create Your First Product
                            </Link>
                        </div>
                    )}
                </main>
            )}
        </div>
    )
}

export default Dashboard
