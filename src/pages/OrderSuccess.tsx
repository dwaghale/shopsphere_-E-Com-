
import { Link, Navigate } from 'react-router-dom'
import './OrderSuccess.css'

type SavedOrder = {
  orderId: string
  customer: {
    fullName: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  totalItems: number
  grandTotal: number
  paymentMethod: string
  orderDate: string
}

function OrderSuccess() {
  let order: SavedOrder | null = null

  try {
    const savedOrder = localStorage.getItem('shopsphere-last-order')
    order = savedOrder ? JSON.parse(savedOrder) as SavedOrder : null
  } catch {
    order = null
  }

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="order-success">
      <div className="success-card">
        <div className="success-check">✓</div>

        <p className="success-eyebrow">SHOPSPHERE · ORDER CONFIRMED</p>

        <h1>Thank you,<br />{order.customer.fullName}.</h1>

        <p className="success-description">
          Your order has been placed successfully.
          We appreciate you choosing ShopSphere.
        </p>

        <div className="success-order-id">
          <span>ORDER NUMBER</span>
          <strong>{order.orderId}</strong>
        </div>

        <div className="success-details">
          <div>
            <span>Items</span>
            <strong>{order.totalItems}</strong>
          </div>

          <div>
            <span>Payment</span>
            <strong>{order.paymentMethod}</strong>
          </div>

          <div>
            <span>Total paid on delivery</span>
            <strong>₹{order.grandTotal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div className="success-address">
          <span>DELIVERY ADDRESS</span>
          <p>
            {order.customer.address}<br />
            {order.customer.city}, {order.customer.state} - {order.customer.pincode}
          </p>
        </div>

        <p className="success-email">
          Order details are associated with {order.customer.email}.
        </p>

        <Link to="/" className="success-home-button">
          CONTINUE EXPLORING
        </Link>
      </div>
    </main>
  )
}

export default OrderSuccess
