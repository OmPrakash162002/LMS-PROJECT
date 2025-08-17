import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/Context'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'



const CourseCard = ({course}) => {

  const{currency,calculateRating} = useContext(AppContext)
  return (
    <Link className='transition-all duration-300 hover:scale-105 shadow-2xl bg-gradient-to-bl from-orange-200 to-white flex flex-col border border-gray-400 rounded-2xl p-3' to={"/course/" + course._id} onClick={()=>scrollTo(0,0)}>
      <img className='w-xs rounded-2xl sm:w-xs md:w-3xs' src={course.courseThumbnail} alt="" />
      <div className='pt-3 flex flex-col '>
        <h3 className='font-semibold'>{(course.courseTitle).toUpperCase()}</h3>
        <p className='text-gray-800 text-sm'>{course.educator.name}</p>
        <div className='flex flex-row items-center gap-3 text-sm'>
          <p>{calculateRating(course)}</p>
          <div className='flex flex-row '>
            {[...Array(5)].map((_,i)=>(
              <img key={i} src={i<Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="" />
            ))}
          </div>
          <p className='text-gray-600'>({course.courseRatings.length})</p>
        </div>
        <p className='text-xl text-black/70 font-semibold'>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard
