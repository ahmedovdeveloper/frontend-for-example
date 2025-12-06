import React from 'react'
import Header from './componentns/Header'
import PromotionalBanner from './componentns/PromotionalBanner'
import ProductCards from './componentns/ProductCards'
import Footer from './componentns/Footer'
import FAQ from './componentns/Faq'
import Blog from './componentns/Blog'
import Video from './componentns/Video'
// import SunglassesLanding from './componentns/SunglassesLanding'
const App = () => {
 
    localStorage.setItem("cartItems", JSON.stringify([]));

  return (
   <>
    <Header/>
    <main>
      <PromotionalBanner/>
    <ProductCards/>
    <Video/>

    <FAQ/>
    {/* <SunglassesLanding/> */}
    <Blog/>
    </main>
    <Footer/>
   </>
  )
}

export default App
