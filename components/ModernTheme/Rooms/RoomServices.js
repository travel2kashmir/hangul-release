import React from 'react'

function RoomServices({room}) {
    return (
        <div className="py-10">
            <h2 className=' text-slate-500 font-semibold tracking-wide text-center text-2xl'>Services</h2>
            <div className="grid grid-flow-row-dense px-5 pt-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
                {room?.room_facilities?.map((item, index) => {
                    return (
                        <span className='text-gray-700' key={index}>
                            {/* &#10004 is code for tick mark  */}
                            <span>&#10004;
                                {item?.service_name.replaceAll("_", " ")}
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    )
}

export default RoomServices