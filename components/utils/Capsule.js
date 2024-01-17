import React from 'react'

function Capsule({title,color='bg-gray-200',textColor='text-gray-700',onClick=undefined}) {
  return (
    <div 
    onClick={onClick}
    className={`text-sm   ${textColor}  ${color} rounded-md p-1 mx-1  mb-2  w-fit flex items-end justify-center`}>
        {title}
    </div>
  )
}

export default Capsule