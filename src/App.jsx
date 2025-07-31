import React from 'react'
import Header from './componentns/Header'
import PromotionalBanner from './componentns/PromotionalBanner'
import ProductCards from './componentns/ProductCards'
import Footer from './componentns/Footer'
import FAQ from './componentns/Faq'
import Blog from './componentns/Blog'
// import SunglassesLanding from './componentns/SunglassesLanding'
const App = () => {
  return (
   <>
    <Header/>
    <main>
      <PromotionalBanner/>
    <ProductCards/>
    <FAQ/>
    {/* <SunglassesLanding/> */}
    <Blog/>
    </main>
    <Footer/>
   </>
  )
}

export default App