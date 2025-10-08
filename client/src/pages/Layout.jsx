import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useUser, SignIn } from '@clerk/clerk-react';

export const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser();

  return user ? (
    <div className='flex flex-col h-screen'>
      <nav className='w-full px-8 h-16 flex items-center justify-between border-b border-gray-200'>
        <img
          src={assets.logo}
          alt="logo"
          className='cursor-pointer'
          onClick={() => navigate('/')}
        />

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}   
            className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'
          />
        )}
      </nav>

      <div className='flex flex-1'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <main className='flex-1 bg-white p-6 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}
