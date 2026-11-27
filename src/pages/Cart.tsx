
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart()

  return (
    <main className="cart-page">
      <div className="cart-header">
        <p className="eyebrow">YOUR SELECTION</p>
        <h1>Your shopping bag.</h1>
        <p>{totalItems} item(s) in your bag</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your bag is empty.</h2>
          <p>Discover pieces made for everyday living.</p>
          <Link to="/" className="continue-shopping">
            EXPLORE COLLECTION
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={`${item.id}-${item.selectedSize}`}
              >
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>{item.category} · ShopSphere Essentials</p>
                  <p>Size: {item.selectedSize}</p>

                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.quantity - 1
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.quantity + 1
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeFromCart(item.id, item.selectedSize)
                    }
                  >
                    REMOVE
                  </button>
                </div>

                <strong>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </strong>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order summary</h2>

            <div>
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <div>
              <span>Shipping</span>
              <span>
                {totalPrice >= 2999 ? 'FREE' : 'Calculated at checkout'}
              </span>
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() => alert('Checkout will be available soon.')}
            >
              PROCEED TO CHECKOUT
            </button>

            <Link to="/" className="continue-link">
              CONTINUE SHOPPING
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart
