import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/Context'
import CourseCard from './CourseCard'

const CoursesSection = () => {
  const{allCourses} = useContext(AppContext)

   return (
    <div className='flex items-center justify-center flex-col gap-5 pt-20 md:px-20 sm:px-15 px-10'>
      <h2 className='font-semibold md:text-3xl sm:text-xl text-xl '>Learn from the best</h2>
      <p className='text-gray-600 md:text-s text-s text-center'>Discover our top-rated courses across various categories. From coding and design to <br /> business and wellness, our courses are crafted to deliver results.</p>
      <div className='flex md:flex-row flex-col flex-wrap justify-center items-center gap-3'>
        {allCourses.slice(0,4).map((course,i)=>(
           <CourseCard key={i} course={course}></CourseCard>
        ))}
      </div>
      <Link className='mt-5 hover:bg-gray-300 p-3 border border-gray-400 rounded-2xl' to="/course-list">Search all courses</Link>
    </div>
  )
}

export default CoursesSection
