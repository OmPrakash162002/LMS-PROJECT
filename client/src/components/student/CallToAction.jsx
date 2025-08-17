import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='mt-15 w-full  '>
       <section className="   flex flex-col items-center justify-center text-center px-4 py-20 ">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-600 max-w-xl text-sm sm:text-base mb-8">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200">
          Get started
        </button>
        <button className="flex items-center text-blue-600 hover:underline font-medium">
          Learn more <img className='ml-2 h-4 w-4' src={assets.arrow_icon} alt="" />
        </button>
      </div>
    </section>
    </div>
  )
}

export default CallToAction
