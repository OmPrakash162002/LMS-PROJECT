import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/Context'
import { Link } from 'react-router-dom'


const CourseCard = ({course}) => {

  const{currency,calculateRating} = useContext(AppContext)
  return (
    <Link className='flex flex-col border border-gray-400 rounded-2xl p-3' to={"/course/" + course._id} onClick={()=>scrollTo(0,0)}>
      <img className='w-xs rounded-2xl sm:w-xs md:w-3xs' src={course.courseThumbnail} alt="" />
      <div className='flex flex-col '>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div>
          <p>{calculateRating(course)}</p>
          <div className='flex flex-row '>
            {[...Array(5)].map((_,i)=>(
              <img key={i} src={i<Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="" />
            ))}
          </div>
          <p>{course.courseRatings.length}</p>
        </div>
        <p>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard
