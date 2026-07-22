import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LogoScroller from '../components/LogoScroller'
import KategoriSection from '../components/KategoriSection'
import AestheticSection from '../components/AestheticSection'
import ProductCatalog from '../components/ProductCatalog'
import Workflow from '../components/Workflow'
import ValueProps from '../components/ValueProps'
import Statistics from '../components/Statistics'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false)
  const openCart = () => setCartOpen(true)

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={openCart} />
      <Hero />
      <Statistics />
      <LogoScroller />
      <KategoriSection />
      <ProductCatalog />
      <Workflow />
      <ValueProps />
      <AestheticSection />
      <Testimonials />
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
