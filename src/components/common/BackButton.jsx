import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

function BackButton() {
  return (
    <Link to='/' className='flex items-center gap-1 absolute top-1 font-semibold left-1 p-1 m-1 text-sm'>
        <IoArrowBack/> Home
    </Link>
  )
}

export default BackButton