import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Shop } from './components/Shop'
import { About } from './components/About'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Hero />
      <Shop />
      <About />
      <Footer />
    </div>
  )
}

export default App
