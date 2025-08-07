import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import {useClerk,UserButton,useUser,} from "@clerk/clerk-react"
import { AppContext } from '../../context/Context'
const Navbar = () => {
    const{navigate,isEducator,setIsEducator} = useContext(AppContext);
    const isCouresListPage = location.pathname.includes("/course-list");

    const {openSignIn} = useClerk()
    const {user} = useUser()


  return (
    <div className={` px-4 sm:px-10 md:px-14 lg:px-30 flex items-center justify-between border-b border-gray-500 ${isCouresListPage ?'bg-white':'bg-red-300'}`}>
      <img onClick={()=>navigate('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="logo" />
      <div className='hidden md:flex items-center gap-5 text-gray-800'>
           <div>
           {user &&
           <>
            <button onClick={()=>navigate("/educator")}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button> | <Link to="/my-enrollments">My Enrollments</Link>
          </>}
           </div>
           {/* if user is already signed in for this condition */}
           {user ? <UserButton></UserButton> : <button onClick={()=>openSignIn()} className='p-2 bg-purple-800 rounded-full text-white'>Create Account</button>} 
      </div>
      {/* for phone screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
         <div className='text-xs flex flex-row gap-2 '>
             {user &&
           <>
            <button onClick={()=>navigate("/educator")} >{isEducator ? "Educator Dashboard" : "Become Educator"}</button>| <Link to="/my-enrollments">My Enrollments</Link>
          </>}
           </div>
          {user ? <UserButton></UserButton> :<button onClick={()=>openSignIn()}> <img src={assets.user_icon} alt="" /></button>}
      </div>
    </div>
  )
}

export default Navbar
