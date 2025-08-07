import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='bg-gradient-to-b from-red-300 to-white flex items-center justify-center'>
        <div className='px-15 sm:px-10 sm:w-full md:px-30 lg:px-50 flex items-center justify-center flex-col gap-10 pt-20'>
          <h1 className='text-2xl sm:text-2xl md:text-4xl font-bold text-center'> <span className='text-blue-800 '> SkillEdge</span> – Your Complete Platform for Smarter, Seamless, and Scalable Learning</h1>
          <p className='lg:text-s md:text-s text-xs text-center'>Discover an intuitive and flexible Learning Management System designed to streamline online education. Whether you're a student, teacher, or institution, SkillEdge offers powerful tools to manage courses, track progress, and enhance engagement—all in one place.</p>
          <SearchBar></SearchBar>
        </div>
    </div>
  )
}

export default Hero
