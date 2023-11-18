import React from 'react'

function BookingModal({ bookingComponent }) {
    return (
        <div className=" overflow-y-scroll overflow-x-hidden fixed top-0 left-0 right-0 backdrop-blur-3xl  bg-white h-screen z-50 ">
            <div className="relative w-full max-w-full px-0">
                <div className='bg-white rounded shadow relative'>
                    <p className='text-sm text-slate-500'>
                        {bookingComponent}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookingModal