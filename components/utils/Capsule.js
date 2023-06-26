import React from 'react'

function Capsule({title,action,selected}) {
  return (
    <div 
    onClick={(e)=>action(title)}
    className={`text-sm   text-gray-700  bg-gray-200 rounded-md p-1 mx-1  mb-2  w-fit flex items-end justify-center`}>
        {title}
        </div>
  )
}

export default Capsule