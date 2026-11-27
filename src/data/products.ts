
export type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  tag?: string
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Essential Cotton Shirt',
    category: 'Men',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=700',
    tag: 'BESTSELLER',
    description: 'A timeless cotton shirt designed for effortless everyday styling.',
  },
  {
    id: 2,
    name: 'Minimal Everyday Dress',
    category: 'Women',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700',
    tag: 'NEW ARRIVAL',
    description: 'A versatile dress with a minimal silhouette for modern wardrobes.',
  },
  {
    id: 3,
    name: 'Classic Streetwear Jacket',
    category: 'Men',
    price: 4599,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700',
    description: 'A contemporary jacket combining comfort and understated style.',
  },
  {
    id: 4,
    name: 'Modern Summer Outfit',
    category: 'Women',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700',
    description: 'A fresh seasonal look for everyday occasions.',
  },
]
