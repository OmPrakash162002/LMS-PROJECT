import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
import {motion,useScroll} from 'motion/react'

const Home = () => {

  const {scrollYProgress} = useScroll();

  return (
    <div className=' flex flex-col items-center justify-center  '>
      <motion.div
      style={{
        scaleX : scrollYProgress
      }}
       className='z-50 bg-gradient-to-r from-blue-600 to-red-600  origin-left w-full h-2 fixed top-0 left-0'></motion.div>
     <Hero></Hero>
     <Companies></Companies>
     <CoursesSection></CoursesSection>
     <TestimonialsSection></TestimonialsSection>
     <CallToAction></CallToAction>
     <Footer></Footer>
    </div>
  )
}

export default Home
