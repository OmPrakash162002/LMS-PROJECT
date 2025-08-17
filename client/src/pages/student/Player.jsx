import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Context'
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const Player = () => {
 const{enrolledCourses,calculateChapterTime,backendUrl, getToken, userData, fetchUserEnrolledCourses} = useContext(AppContext);
 const{courseId} = useParams();
 const[courseData, setCourseData] = useState(null);
 const[openSection, setOpenSections] = useState({});
 const[playerData,setPlayerData] = useState(null);
 const[progressData, setProgressData] = useState(null);
 const[initialRating, setInitialRating] = useState(0);


 const getCourseData = ()=>{
  enrolledCourses.map((course)=>{
    if(course._id === courseId){
        setCourseData(course)
        course.courseRatings.map((item)=>{
          if(item.userId === userData._id){
            setInitialRating(item.rating)
          }
        })
    }
  })
 }

 const toggleSection = (index)=>{
       setOpenSections((prev)=>{
       return {...prev,
          [index]: !prev[index],
        }
       })
  }

 useEffect(()=>{
  if(enrolledCourses.length > 0){
     getCourseData();
  } 
 },[enrolledCourses])

 const markLectureAsCompleted = async (lectureId) =>{
  try {
    const token = await getToken()
    const {data} = await axios.post(backendUrl + '/api/user/update-course-progress', {courseId, lectureId}, {headers : {Authorization : `Bearer ${token}`}})

    if(data.success){
      toast.success(data.message);
      getCourseProgress()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
     toast.error(error.message)
  }
 }



 const getCourseProgress = async () =>{
  try {
    const token = await getToken()
    const {data} = await axios.post(backendUrl + '/api/user/get-course-progress' , {courseId}, {headers : {Authorization : `Bearer ${token}`}})

    if(data.success){
      setProgressData(data.progressData)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
 }

 const handleRate = async (rating)=>{
  try {
    const token = await getToken()
    const {data} = await axios.post(backendUrl + '/api/user/add-rating',{courseId,rating},{headers : {Authorization : `Bearer ${token}`}})
    if(data.success){
      toast.success(data.message)
      fetchUserEnrolledCourses()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
     toast.error(error.message)
  }
 }


 useEffect(()=>{
  getCourseProgress()
 },[])

  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col items-center justify-around bg-gradient-to-b from-red-300 to-white'>
        {/* first column */}
        <div className='p-10'>
           <div className="mt-15">
                    <h2 className="font-semibold text-2xl pb-5 text-black">Course Structure</h2>
                    <div className="flex flex-col gap-2">
                      { courseData && courseData.courseContent.map((chapter,index)=>(
                        <div className="border border-gray-400 p-5 rounded-xl bg-white" key={index}>
                              <div className="flex flex-row justify-between items-center gap-2 cursor-pointer" onClick={()=> toggleSection(index)}>
                                <div className="flex flex-row gap-2">
                                  <img className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`}
                                   src={assets.down_arrow_icon} alt="arrow icon" />
                                  <p>{chapter.chapterTitle}</p>
                                </div>
                                <p>{chapter.chapterContent.length} lecture - {calculateChapterTime(chapter)}</p>
                              </div>
          
                              <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96':'max-h-0'}`}>
                                <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                                  {chapter.chapterContent.map((lecture,i)=>(
                                    <li className="flex items-start gap-2 py-1" key={i}>
                                      <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="play icon" />
                                      <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                        <p>{lecture.lectureTitle}</p>
                                        <div className="flex gap-2">
                                          {lecture.lectureUrl && <p className="text-blue-500 cursor-pointer" onClick={()=> setPlayerData({
                                            ...lecture, chapter:index + 1, lecture:i+1
                                          })}>Watch</p>}
                                          <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000,{units:["h","m"]})}</p>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex items-center gap-2 py-3 mt-10'>
                      <h1 className='text-xl font-bold'>Rate this course</h1>
                      <Rating initialRating={initialRating} onRate={handleRate}></Rating>
                    </div>
                  </div>
        </div>

        {/* second column */}
        <div className='shadow-2xl'>
          {playerData ? (
            <div>
             <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="  w-sm aspect-video"/>
             <div className='flex flex-row justify-between pt-2'>
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button onClick={()=> markLectureAsCompleted(playerData.lectureId)}>{progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'completed' : 'Mark Complete'}</button>
             </div>
            </div>
          ): 
          <img className='w-sm' src={courseData ? courseData.courseThumbnail : ''} alt="" />
          }
        </div>
    </div>

    <Footer></Footer>
   </> 
  ) : (<Loading></Loading>)
}

export default Player
