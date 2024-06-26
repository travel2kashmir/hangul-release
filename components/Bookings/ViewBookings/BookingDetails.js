function BookingDetails({color,language,bookingDetailLoader,bookingDetail}) {
    return (
        <div>
            <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8`}>
                <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
                    {language?.bookingDetails}
                </h6>
                <div className="pt-10">
                    <div className=" md:px-6 mx-auto w-full">
                        <h2 className={`text-sm font-medium ${color?.text} block mb-2`}>Booking Date:
                            {bookingDetailLoader === true ?
                                <div className='bg-gray-400 h-5 w-40 ml-2 animate-pulse opacity-10 border border-none rounded inline-block '></div>
                                : <span className='font-normal pl-2'>{bookingDetail[0]?.booking_date_from} to {bookingDetail[0]?.booking_date_to}</span>
                            }

                        </h2>
                    </div>
                    <div className=" md:px-6 mx-auto py-5 w-full flex flex-wrap lg:flex-nowrap justify-between">

                        {/* rooms and guest list */}
                        <div>
                            {/* room list */}
                            <div className='border-b pb-5 mb-5 md:mb-0 md:borderr md:border-b-0 md:pr-5'>
                                <h2 className={`text-lg font-medium ${color?.text} block mb-2`}>Rooms</h2>

                                {bookingDetailLoader === true ? <div className='bg-gray-400 h-28 w-96 animate-pulse opacity-10 border border-none rounded inline-block '></div>
                                    : <table cellPadding={10}>
                                        <thead>
                                            <tr>
                                                <th className={`text-sm text-start ${color.text}`}>Room Name</th>
                                                <th className={`text-sm text-start ${color.text}`}>Room Type</th>
                                                <th className={`text-sm text-start ${color.text}`}>Room Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingDetail[0]?.booking_room_link?.map((room, index) => {
                                                return <tr key={index}>
                                                    <td className={`text-sm ${color.text}`}>{room?.room_name}</td>
                                                    <td className={`text-sm ${color.text}`}>{room?.room_type}</td>
                                                    <td className={`text-sm ${color.text}`}>{room?.room_count}</td>
                                                </tr>
                                            })}
                                        </tbody>

                                    </table>}

                            </div>

                            {/* guest list */}
                            <div className='t-10 border-b pb-5 mb-5 md:mb-5 md:pb-0 md:border-0'>
                                <h2 className={`text-lg font-medium ${color?.text} block mb-2`}>Guests</h2>

                                {bookingDetailLoader === true ? <div className='bg-gray-400 h-28 w-full ml-2 animate-pulse opacity-10 border border-none rounded inline-block '></div>

                                    : <table className='w-full' cellPadding={10}>
                                        <thead>
                                            <tr>
                                                <th className={`text-sm text-start ${color.text}`}>Guest Name</th>
                                                <th className={`text-sm text-start ${color.text}`}>Email</th>
                                                <th className={`text-sm text-start ${color.text}`}>Phone</th>
                                                <th className={`text-sm text-start ${color.text}`}>Age</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingDetail[0]?.booking_guest_link?.map((guest, index) => {
                                                return <tr key={index}>
                                                    <td className={`text-sm ${color.text}`}>{guest?.guest_name}</td>
                                                    <td className={`text-sm ${color.text}`}>{guest?.guest_email}</td>
                                                    <td className={`text-sm ${color.text}`}>{guest?.guest_phn_number}</td>
                                                    <td className={`text-sm ${color.text}`}>{guest?.guest_age}</td>
                                                </tr>
                                            })}
                                        </tbody>

                                    </table>
                                }

                            </div>
                        </div>


                        {/* more details include invoice */}
                        <div className='border rounded-lg pt-2 pb-5 px-3 lg:-mt-10  w-full  md:w-4/12  '>
                            <h2 className={`text-lg font-medium text-center ${color?.text} block mb-2`}>More Details</h2>
                            {bookingDetailLoader === true ?
                                <div className='bg-gray-400 h-52 w-full animate-pulse opacity-10 border border-none rounded inline-block '></div>
                                :
                                <div>
                                    {bookingDetail[0]?.booking_invoice?.map((invoice, index) => {
                                        return <div key={index} className={`${color.text}`}>
                                            <div className='flex justify-between mb-3 border-b'>
                                                <span className='text-sm font-medium'>Transaction Refrence No.: </span>
                                                <span className='font-normal text-sm text-right'>{invoice?.transaction_refrence_no}</span>
                                            </div>
                                            <div className='flex justify-between mb-3 border-b'>
                                                <span className='text-sm font-medium'>Invoice Time: </span>
                                                <span className='font-normal text-sm text-right'>{invoice?.invoice_time}</span>
                                            </div>
                                            <div className='flex justify-between mb-3 border-b'>
                                                <span className='text-sm font-medium'>Base Price: </span>
                                                <span className='font-normal text-sm'>₹{invoice?.base_price}</span>
                                            </div>
                                            <div className='flex justify-between mb-3 border-b'>
                                                <span className='text-sm font-medium'>Taxes: </span>
                                                <span className='font-normal text-sm'>₹{invoice?.taxes}</span>
                                            </div>
                                            <div className='flex justify-between mb-3 border-b'>
                                                <span className='text-sm font-medium'>Other Fees: </span>
                                                <span className='font-normal text-sm'>₹{invoice?.other_fees}</span>
                                            </div>
                                            <div className='flex justify-between mb-3 border-b'>
                                                <span className='text-sm font-medium'>Coupon Discount: </span>
                                                <span className='font-normal text-sm'>₹{invoice?.coupon_discount}</span>
                                            </div>
                                            <div className='flex justify-between mb-3 '>
                                                <span className='text-lg font-medium'>Total Price </span>
                                                <span className='font-bold text-lg'>₹{invoice?.total_price}</span>
                                            </div>

                                        </div>
                                    })}
                                </div>}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookingDetails