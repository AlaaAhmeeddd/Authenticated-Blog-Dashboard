import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex flex-col gap-5 items-center'>
        <p className='text-4xl font-bold text-red-500'>Not Found !!!</p>
        <Link to={'/'}>
        <button className='text-white bg-[#5D5FEF] rounded-full w-full mt-8 px-3 py-2 cursor-pointer hover:bg-[#5556C3] duration-300'>
            Go Home
        </button>
        </Link>
    </div>
  )
}
