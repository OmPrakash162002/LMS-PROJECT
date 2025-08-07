import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/student/SearchBar'
import { AppContext } from '../../context/Context'
import CourseCard from '../../components/student/CourseCard';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const CoursesList = () => {

  const{navigate,allCourses} = useContext(AppContext);
  const{input} = useParams();
  const[filteredCourse,setFilteredCourse] = useState([])

 useEffect(()=>{
  if(allCourses && allCourses.length >0){
    const tempCourses = allCourses.slice()
    
    input ? 
      setFilteredCourse(tempCourses.filter(
        item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
      ))
    : setFilteredCourse(tempCourses)
  }

 },[allCourses,input])

  return (
    <>
   <div >
    <div className='flex flex-col md:flex-row justify-between p-10'>
   <div>
      <h1 className='text-3xl font-bold'>Course List</h1>
      <div>
        <p><span onClick={()=>navigate("/")} className='text-blue-500 cursor-pointer'>Home</span> / <span>Course List</span></p>
      </div>
   </div>
   <SearchBar data={input}></SearchBar>
   </div>
   
    {input && <div className='flex flex-row items-center p-4 border border-gray-400 gap-4 w-[100px] ml-10 rounded-2xl mb-10'>
      <p>{input}</p>
      <img onClick={()=>navigate("/course-list")} src={assets.cross_icon} alt="" />
    </div> }
   
   {/* for course list */}
    <div className='flex flex-row flex-wrap gap-4 items-center justify-center'>
       {filteredCourse.map((course,i)=>(
        <CourseCard key={i} course={course}></CourseCard>
       ))}
    </div>
   </div>
   <Footer></Footer>
   </>
  )
}

export default CoursesList
