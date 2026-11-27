
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/">Return to homepage</Link>
      </div>
    )
  }

  const sizes = ['S', 'M', 'L', 'XL']

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.')
      return
    }

    addToCart(product, selectedSize, quantity)
    setAdded(true)
  }

  return (
    <main className="product-details">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="details-layout">

        <div className="details-image">
          <img src={product.image} alt={product.name} />
          <span className="image-label">SHOPSPHERE COLLECTION</span>
        </div>

        <div className="details-info">
          <p className="details-category">
            THE EVERYDAY COLLECTION
          </p>

          <h1>{product.name}</h1>

          <h2>
            ₹{product.price.toLocaleString('en-IN')}
          </h2>

          <div className="details-divider" />

          <p className="details-description">
            {product.description}
          </p>

          <div className="size-section">
            <div className="section-heading">
              <h3>Select Size</h3>
              <span>{selectedSize ? `Selected: ${selectedSize}` : 'Choose your size'}</span>
            </div>

            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={
                    selectedSize === size
                      ? 'size-option selected'
                      : 'size-option'
                  }
                  onClick={() => {
                    setSelectedSize(size)
                    setAdded(false)
                  }}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <h3>Quantity</h3>

            <div className="quantity-control">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="details-add-button"
            onClick={handleAddToCart}
          >
            {added
              ? 'ADDED TO BAG ✓'
              : `ADD TO BAG — ₹${(product.price * quantity).toLocaleString('en-IN')}`}
          </button>

          {added && (
            <p className="added-message">
              ✓ Successfully added {quantity} item(s), size {selectedSize}.
              <Link to="/cart"> View Bag</Link>
            </p>
          )}

          <div className="details-extra">
            <p>✓ Premium quality essentials</p>
            <p>✓ Easy returns and exchanges</p>
            <p>✓ Secure shopping experience</p>
          </div>

          <p className="details-footer-note">
            LESS, BUT BETTER. MADE FOR EVERYDAY.
          </p>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
