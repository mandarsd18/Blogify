import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import BannerSlider from '../components/BannerSlider'
import CardsSection from '../components/CardsSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
   <>
    <Banner />
    <BannerSlider/>
    <CardsSection/>
    <Footer/>
   </>
  )
}

export default Home
