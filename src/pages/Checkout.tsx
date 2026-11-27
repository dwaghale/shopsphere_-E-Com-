
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [placingOrder, setPlacingOrder] = useState(false)

  const shipping = totalPrice >= 2999 ? 0 : 99
  const grandTotal = totalPrice + shipping

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!cartItems.length || placingOrder) return

    setPlacingOrder(true)

    const order = {
      orderId: `SS${Date.now().toString().slice(-8)}`,
      customer: form,
      items: cartItems,
      totalItems,
      subtotal: totalPrice,
      shipping,
      grandTotal,
      paymentMethod: 'Cash on Delivery',
      orderDate: new Date().toISOString(),
    }

    try {
      localStorage.setItem('shopsphere-last-order', JSON.stringify(order))
      clearCart()
      navigate('/order-success')
    } catch {
      alert('Unable to place your order. Please try again.')
      setPlacingOrder(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-empty">
        <h1>Your bag is empty.</h1>
        <p>Add something to your bag before checkout.</p>
        <Link to="/">CONTINUE SHOPPING</Link>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <p>SHOPSPHERE / CHECKOUT</p>
        <h1>Almost yours.</h1>
        <span>Complete your details to place your order.</span>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">

          <section className="checkout-section">
            <span className="checkout-step">01</span>
            <div>
              <h2>Contact information</h2>
              <p>Where can we reach you?</p>
            </div>

            <div className="checkout-fields">
              <label>
                Full name
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  minLength={2}
                  autoComplete="name"
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  required
                  autoComplete="tel"
                />
              </label>
            </div>
          </section>

          <section className="checkout-section">
            <span className="checkout-step">02</span>
            <div>
              <h2>Delivery address</h2>
              <p>Where should we deliver your order?</p>
            </div>

            <div className="checkout-fields">
              <label>
                Street address
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House number, street, area"
                  required
                  autoComplete="street-address"
                />
              </label>

              <div className="checkout-two-columns">
                <label>
                  City
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    autoComplete="address-level2"
                  />
                </label>

                <label>
                  State
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    autoComplete="address-level1"
                  />
                </label>
              </div>

              <label>
                PIN code
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit PIN code"
                  pattern="[0-9]{6}"
                  required
                  autoComplete="postal-code"
                />
              </label>
            </div>
          </section>

          <section className="checkout-section payment-section">
            <span className="checkout-step">03</span>
            <div>
              <h2>Payment method</h2>
              <p>Simple, secure and convenient.</p>
            </div>

            <div className="payment-option">
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when your order arrives.</p>
              </div>
              <span>✓</span>
            </div>
          </section>

          <button
            type="submit"
            className="place-order-button"
            disabled={placingOrder}
          >
            {placingOrder ? 'PLACING ORDER...' : `PLACE ORDER — ₹${grandTotal.toLocaleString('en-IN')}`}
          </button>

          <p className="checkout-terms">
            By placing your order, you agree to our shopping terms.
          </p>
        </div>

        <aside className="checkout-summary">
          <h2>Your order</h2>

          <p className="summary-count">{totalItems} items</p>

          {cartItems.map((item) => (
            <div
              className="checkout-product"
              key={`${item.id}-${item.selectedSize}`}
            >
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Size: {item.selectedSize} · Qty: {item.quantity}</p>
                <strong>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          ))}

          <div className="checkout-price-row">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="checkout-price-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>

          <div className="checkout-grand-total">
            <span>Total</span>
            <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
          </div>

          <p className="checkout-delivery-note">
            {shipping === 0
              ? 'Your order qualifies for free shipping.'
              : `Add ₹${(2999 - totalPrice).toLocaleString('en-IN')} more for free shipping.`}
          </p>
        </aside>
      </form>
    </main>
  )
}

export default Checkout
