import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='flex flex-col gap-3 items-center justify-center pt-16'>
      <p>Trusted by learners from</p>
      <div className='flex flex-row md:gap-10 sm:gap-5 gap-5 flex-wrap items-center justify-center  '>
        <img className='w-20 md:w-26' src={assets.microsoft_logo} alt="microsoft logo" />
        <img className='w-20 md:w-26' src={assets.walmart_logo} alt="walmart" />
        <img className='w-20 md:w-26' src={assets.adobe_logo} alt="adobe logo" />
        <img className='w-20 md:w-26' src={assets.accenture_logo} alt="accenture logo" />
        <img className='w-20 md:w-26' src={assets.paypal_logo} alt="paypal logo" />
      </div>
    </div>
  )
}

export default Companies
