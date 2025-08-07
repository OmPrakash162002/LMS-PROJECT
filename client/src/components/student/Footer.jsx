import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full md:px-10 py-12 mt-20 ">
      <div className=" flex flex-col gap-5 justify-around  md:flex-row px-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
           <img className='h-20' src={assets.logo} alt="" />
          </div>
          <p className="text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.<br></br> Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Contact us</a></li>
            <li><a href="#" className="hover:text-white">Privacy policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div >
          <h4 className="text-white font-semibold mb-4">Stay up to date</h4>
          <p className="text-sm mb-4">
            Get the latest articles and resources in your inbox.
          </p>
          <form className="flex items-center gap-2 ">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white text-sm focus:outline-none
              "
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 Om Prakash. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
