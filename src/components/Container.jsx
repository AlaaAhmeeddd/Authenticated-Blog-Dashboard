import React from 'react'

export default function Container({children}) {
  return (
    <div className='bg-[#F1F8FD] container mx-auto py-5 px-6 rounded-xl h-full'>
        {children}
    </div>
  )
}
