import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
    <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />

    <button className='flex items-center gap-2 bg-primary text-white px-10 py-2.5 rounded-full text-sm cursor-pointer'>Get Started <ArrowRight className='w-4 h-4'/></button>
    </div>
  )
}
