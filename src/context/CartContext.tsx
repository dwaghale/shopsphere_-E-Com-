
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { Product } from '../data/products'

export type CartItem = Product & {
  selectedSize: string
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (
    product: Product,
    size: string,
    quantity: number
  ) => void
  removeFromCart: (id: number, size: string) => void
  updateQuantity: (
    id: number,
    size: string,
    quantity: number
  ) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('shopsphere-cart')
      return savedCart ? JSON.parse(savedCart) as CartItem[] : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'shopsphere-cart',
      JSON.stringify(cartItems)
    )
  }, [cartItems])

  const addToCart = (
    product: Product,
    size: string,
    quantity: number
  ) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...currentItems,
        {
          ...product,
          selectedSize: size,
          quantity,
        },
      ]
    })
  }

  const removeFromCart = (id: number, size: string) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.id === id && item.selectedSize === size)
      )
    )
  }

  const updateQuantity = (
    id: number,
    size: string,
    quantity: number
  ) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    )
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
