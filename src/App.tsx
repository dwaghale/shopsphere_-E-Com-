
import { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext'
import { products } from './data/products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import './App.css'

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        )

  return (
    <div className="app">
      <div className="announcement">
        FREE SHIPPING ON ORDERS ABOVE ₹2,999
      </div>

      <header className="navbar">
        <Link to="/" className="brand">
          SHOP<span>SPHERE</span>
          <small>THE ART OF EVERYDAY</small>
        </Link>

        <nav className="nav-links">
          <a href="#collection">NEW ARRIVALS</a>
          <a href="#collection">MEN</a>
          <a href="#collection">WOMEN</a>
          <a href="#about">OUR STORY</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => navigate('/')}
          >
            SEARCH
          </button>

          <button
            className="bag-button"
            onClick={() => navigate('/cart')}
          >
            BAG ({totalItems})
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800"
            alt="Fashion collection"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <p className="eyebrow">THE NEW SEASON · 2026</p>

            <h1>
              Less, but
              <br />
              better.
            </h1>

            <p className="hero-description">
              Thoughtful essentials. Timeless silhouettes.
              <br />
              Made for the way you live.
            </p>

            <a href="#collection" className="hero-cta">
              EXPLORE COLLECTION <span>↗</span>
            </a>
          </div>

          <div className="hero-bottom">
            <span>01 — THE EVERYDAY EDIT</span>
            <span>DESIGNED TO LAST.</span>
          </div>
        </section>

        <section className="collection" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>Featured pieces.</h2>
            </div>

            <div className="filters">
              {['All', 'Men', 'Women'].map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? 'filter active'
                      : 'filter'
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="product-image-wrap"
                >
                  <img src={product.image} alt={product.name} />

                  {product.tag && (
                    <span className="product-tag">
                      {product.tag}
                    </span>
                  )}

                  <span className="add-button">
                    VIEW PRODUCT ↗
                  </span>
                </Link>

                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.category} · ShopSphere Essentials
                    </p>
                  </div>

                  <span>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story" id="about">
          <p className="eyebrow">OUR PHILOSOPHY</p>

          <h2>
            Style isn't about more.
            <br />
            It's about meaning.
          </h2>

          <p>
            We believe in fewer, better things. Pieces designed
            with intention, made to be worn and loved every day.
          </p>
        </section>
      </main>

      <footer className="footer">
        <Link to="/" className="brand">
          SHOP<span>SPHERE</span>
          <small>THE ART OF EVERYDAY</small>
        </Link>

        <p>© 2026 ShopSphere. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
  )
}

export default App
