import React from 'react'

function DayCard({day,rooms_price}) {
  return (
    <div className='h-full  w-auto bg-gray-200 boder border-black border-2'>
    Day:{`${day}`}<br/>
    <table>
        <thead>
            <tr>
                <th>Room</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {rooms_price.map((room_price,i)=>
            <tr key={i}>
            <td>{room_price?.room_name}</td>
            <td>{room_price?.price}</td>
        </tr>)}
        </tbody>
    </table>
    </div>
  )
}

export default DayCard