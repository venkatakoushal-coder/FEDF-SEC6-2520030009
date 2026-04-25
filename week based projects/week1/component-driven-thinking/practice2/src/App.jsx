import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import ProductCard from './components/ProductCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>My Shop</h1>

      <ProductCard name = "Phone" price = {15000} image = "phone pic.jpg" />
      <ProductCard name = "Laptop" price = {55000} image = "laptop pic.jpg" />
      <ProductCard name = "Headphones" price = {3000} image = "headphones pic.jpg" />
    </div>
  )
}

export default App
