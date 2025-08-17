import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className='  flex flex-col items-center justify-center md:pt-20 sm:pt-15 pt-10 gap-3 px-5 sm:px-10 '>
      <h1 className='font-bold text-3xl'>Testimonials</h1>
      <p className='text-center text-gray-500 '>Hear from our learners as they share their journeys of transformation, success, and <br /> how our platform has made a difference in their lives.</p>  
       <div className=' flex md:flex-row flex-col gap-4 flex-wrap md:px-10 sm:px-2'>
        {dummyTestimonial.map((testimonial,index)=>{
         return <div className='shadow-2xl p-4 border border-gray-400 rounded-2xl w-3xs flex flex-wrap gap-3'  key={index}>
            <div className='w-full rounded-2xl p-2 bg-gray-200 flex flex-row gap-3 items-center justify-center'>
              <img className='h-10' src={testimonial.image} alt="" />
               <div>
                <p className='font-semibold'>{testimonial.name}</p>
                <p className='text-xs text-gray-500'>{testimonial.role}</p>
               </div>
            </div>
            <div className='flex flex-row gap-1'>
              {[...Array(5)].map((_,i)=>(
                <img className='h-3' key={i} src={i<Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="star" />
              ))}
            </div>
            <p className='text-sm'>{testimonial.feedback}</p>
            <a className='text-blue-500 underline text-xs' href="#">Read more</a>
          </div> 
          
        })}
       </div>
    </div>
  )
}

export default TestimonialsSection
