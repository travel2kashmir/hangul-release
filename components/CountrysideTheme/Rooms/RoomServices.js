import React from 'react'

function RoomServices(selectedRoom) {

    console.log(selectedRoom)

    return (
        <div>
            <div className='pb-10 px-5'>
                <div className='mt-10 mb-2'>
                    <h4 className=' text-xl md:text-3xl text-black font-light font-family-marcellus'>Room Amenities</h4>
                </div>

                <div className="grid grid-flow-row-dense px-5 pt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
                    {selectedRoom?.selectedRoom?.room_facilities?.map((item, index) => {
                        return (
                            <span className='dark-green font-family-jost-regular' key={index}>
                                {/* &#10004 is code for tick mark  */}
                                <span>&#10004;
                                    {item?.service_name.replaceAll("_", " ")}
                                </span>
                            </span>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default RoomServices