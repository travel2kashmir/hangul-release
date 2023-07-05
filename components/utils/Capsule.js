import React from 'react'

function Capsule({title,color='bg-gray-200'}) {
  return (
    <div 
    className={`text-sm   text-gray-700  ${color} rounded-md p-1 mx-1  mb-2  w-fit flex items-end justify-center`}>
        {title}
        </div>
  )
}

export default Capsule