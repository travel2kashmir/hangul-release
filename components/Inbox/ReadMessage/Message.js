import React from 'react'

function Message({item,color}) {
  return (
    <>
    <div className='p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0'>

        <img className="h-10 w-10 rounded-full" src="/man.png" alt="Neil Sims avatar" />

        <div className="text-sm font-normal text-gray-500">
            <div className={`text-base  ${color?.tabletext} font-semibold`}>{item?.sender_name}</div>
            <div className="text-sm font-normal text-gray-500">{item?.sender_email}</div>
        </div>

    </div>

    <p className="text-md sm:text-md font-normal text-gray-400 pb-6">
        {item?.message}

    </p>

</>
  )
}

export default Message