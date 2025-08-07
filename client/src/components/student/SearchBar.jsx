import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate();
  const [input,setInput] = useState(data ? data : "");
  const onSearchHandlear = (e)=>{
       e.preventDefault();
       navigate("/course-list/" + input)
  }

  return (
   <form onSubmit={onSearchHandlear} className='flex flex-row p-3 gap-2 border border-gray-300 rounded-3xl md:w-xl  bg-white'>
    <img src={assets.search_icon} alt="" />
    <input onChange={e=> setInput(e.target.value)} value={input} className='w-full outline-none h-12' type="text" placeholder='search for courses' />
    <button className='bg-red-500 p-3 rounded-2xl cursor-pointer' type='submit'>Search</button>
   </form>
  )
}

export default SearchBar
