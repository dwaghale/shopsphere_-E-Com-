
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()

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

    setAdded(true)
  }

  return (
    <main className="product-details">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link> / {product.category} / {product.name}
      </div>

      <div className="details-layout">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <p className="details-category">
            SHOPSPHERE ESSENTIALS
          </p>

          <h1>{product.name}</h1>

          <h2>
            ₹{product.price.toLocaleString('en-IN')}
          </h2>

          <p className="details-description">
            {product.description}
          </p>

          <div className="size-section">
            <h3>Select Size</h3>

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
            ADD TO BAG — ₹{(product.price * quantity).toLocaleString('en-IN')}
          </button>

          {added && (
            <p className="added-message">
              ✓ Added to bag — {quantity} item(s), size {selectedSize}.
            </p>
          )}

          <div className="details-extra">
            <p>✓ Premium quality essentials</p>
            <p>✓ Easy returns and exchanges</p>
            <p>✓ Secure checkout</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
