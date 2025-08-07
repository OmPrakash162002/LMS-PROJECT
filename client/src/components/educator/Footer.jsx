import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white w-full border-t border-gray-200 text-center py-4 px-4 flex flex-col sm:flex-row items-center justify-between">

  <div className="text-lg font-semibold mb-2 sm:mb-0">
    <img className='h-20' src={assets.logo} alt="" />
  </div>


  <div className="flex space-x-4 mb-2 sm:mb-0">
    <img src={assets.twitter_icon} alt="Logo 1" className="h-6 w-auto" />
    <img src={assets.facebook_icon} alt="Logo 2" className="h-6 w-auto" />
    <img src={assets.instagram_icon} alt="Logo 3" className="h-6 w-auto" />
  </div>


  <div className="text-sm text-gray-500">
    &copy; 2025 Omprakash. All rights reserved.
  </div>
</footer>

  )
}

export default Footer
