import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Context'
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
 const{enrolledCourses,calculateChapterTime} = useContext(AppContext);
 const{courseId} = useParams();
 const[courseData, setCourseData] = useState(null);
 const[openSection, setOpenSections] = useState({});
 const[playerData,setPlayerData] = useState(null);



 const getCourseData = ()=>{
  enrolledCourses.map((course)=>{
    if(course._id === courseId){
        setCourseData(course)
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
    getCourseData();
 },[enrolledCourses])


  return (
    <>
    <div className='flex md:flex-row flex-col items-center justify-around'>
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
                                      <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play icon" />
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
                      <Rating initialRating={0}></Rating>
                    </div>
                  </div>
        </div>

        {/* second column */}
        <div>
          {playerData ? (
            <div>
             <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="  w-sm aspect-video"/>
             <div className='flex flex-row justify-between pt-2'>
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button>{false ? 'completed' : 'Mark Complete'}</button>
             </div>
            </div>
          ): 
          <img className='w-sm' src={courseData ? courseData.courseThumbnail : ''} alt="" />
          }
        </div>
    </div>

    <Footer></Footer>
   </> 
  )
}

export default Player
