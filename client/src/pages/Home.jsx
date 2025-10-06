import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import { Plan } from '../components/Plan'
import Footer from '../components/Footer'

export const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AiTools/>
      <Testimonial/>
      <Plan/>
      <Footer/>
    </>
  )
}
