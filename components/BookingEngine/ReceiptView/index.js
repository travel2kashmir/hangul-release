import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function ReceiptView({ allHotelDetails }) {
    let bookingId = useSelector(state => state.bookingId)

    const [filteredBooking, setFilteredBooking] = useState(null);

    useEffect(() => {
        // Filter out the object based on bookingId
        const foundBooking = invoiceDummy?.booking?.find(booking => booking?.booking_id === bookingId);

        setFilteredBooking(foundBooking);

    }, [bookingId])

    let invoiceDummy = {
        "booking": [
            {
                "booking_id": "bk0091",
                "booking_date_from": "2023-11-24",
                "booking_date_to": "2023-11-25",
                "total_rooms_booked": 1,
                "is_cancelled": false,
                "booking_time": "2023-11-22 13:03:44.222",
                "property_id": "t2k004",
                "booking_room_link": [
                    {
                        "room_name": "Capsule",
                        "room_type": "single",
                        "room_count": 1,
                        "room_id": "r0011",
                        "booking_id": "bk0091"

                    }
                ],
                "booking_guest_link": [
                    {
                        "guest_id": "gt0067",
                        "guest_name": "Roshan Ali dar",
                        "guest_email": "roshanali@mail.in",
                        "guest_age": 20,
                        "guest_phone_number": 7006177645,
                        "booking_id": "bk0091"

                    }
                ],
                "booking_invoice": [
                    {
                        "invoice_id": "invoice0048",
                        "base_price": 2200,
                        "taxes": 220,
                        "other_fees": 200,
                        "coupon_discount": 120,
                        "total_price": 2400,
                        "transaction_refrence_no": "rx12345",
                        "invoice_time": "2023-11-22 13:03:44.222",
                        "booking_id": "bk0091",
                        "booking_gst_link": [
                            {
                                "gst_id": "gst001",
                                "gst_registration_no": "RX12aa4",
                                "gst_company_name": "ABC Co",
                                "gst_company_address": "12 Rashan Ghat",
                                "invoice_id": "invoice0048",
                                "booking_id": "bk0091"

                            }
                        ]
                    }
                ]
            },

        ]
    }
    return (
        <section className='px-10'>

            <div className=' py-5 flex justify-between border-b'>
                <div className='flex'>
                    <h2 className='text-5xl my-auto'>Receipt</h2>
                </div>
                <div>
                    <h2 className='text-2xl text-right'>{allHotelDetails?.property_name}</h2>
                    {allHotelDetails?.address?.map((detail, index) => {
                        return (
                            <div key={index} className='text-right'>
                                <h2 className=''>{detail?.address_street_address}</h2>
                                <h2 className=''>{detail?.address_city}</h2>
                                <h2 className=''>{detail?.address_province},{detail?.address_country}</h2>
                                <h2 className=''>{detail?.address_zipcode}</h2>
                            </div>

                        )

                    })}
                </div>
            </div>

            <div className=' py-5 border-b flex justify-between'>
                <div>
                    <h4 className='text-lg'>Bill To</h4>
                    {/* it will check if gst for company is registered then it will display company's name else will display guests name */}
                    <h3 className='text-lg font-semibold '>
                        {filteredBooking?.booking_invoice?.[0]?.booking_gst_link?.length > 0 ? filteredBooking.booking_invoice[0].booking_gst_link[0].gst_company_name : filteredBooking?.booking_guest_link[0].guest_name}
                    </h3>
                    {/* it will first check if gst for company is registered then it will display guest name else nothing */}
                    {filteredBooking?.booking_invoice?.[0]?.booking_gst_link?.length > 0 ?
                        <h3 className='text-lg font-semibold '>
                            {filteredBooking?.booking_guest_link[0].guest_name}
                        </h3> : <></>}

                    <h3 className='text-lg font-semibold'>
                        {filteredBooking?.booking_invoice?.[0]?.booking_gst_link?.length > 0 ? filteredBooking.booking_invoice[0].booking_gst_link[0].gst_company_address : filteredBooking?.booking_guest_link[0].guest_email}
                    </h3>
                    <h3 className='text-lg font-semibold'>
                        {filteredBooking?.booking_guest_link[0].guest_phone_number}
                    </h3>

                </div>
                <div className='text-right'>
                    <h2 className='text-lg font-semibold'>Receipt ID </h2>
                    <p > {filteredBooking?.booking_invoice[0]?.invoice_id}</p>
                    <h2 className='text-lg font-semibold pt-2'>Date </h2>
                    <p>{filteredBooking?.booking_invoice[0].invoice_time}</p>
                </div>
            </div>

            <div className='py-5 flex justify-between'>
                <div className='w-7/12'>
                    <table className='w-full'>
                        <thead className='text-left'>
                            <tr>
                                <th className='border-b-2 border-slate-300'>S.No</th>
                                <th className='border-b-2 border-slate-300'>Room Name</th>
                                <th className='border-b-2 border-slate-300'>Room Count</th>
                                <th className='border-b-2 border-slate-300'>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooking?.booking_room_link?.map((room, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='border-b-2 border-slate-300 py-2'>{index + 1}</td>
                                        <td className='border-b-2 border-slate-300'>{room?.room_name} - {room?.room_type}</td>
                                        <td className='border-b-2 border-slate-300'>{room?.room_count}</td>
                                        <td className='border-b-2 border-slate-300'></td>
                                    </tr>
                                )
                            })}
                            {/* Total row */}
                            <tr>
                                <td colSpan={3} className='border-b-2 text-center border-slate-300'></td>
                                <td className='py-2 border-b-2 border-slate-300 text-lg font-bold'> ₹{filteredBooking?.booking_invoice[0]?.total_price}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>



                <div className='w-3/12'>
                    <div className='flex justify-between items-end border-b'>
                        <p className=' font-semibold pt-2 '>Transaction Refrence No:</p>
                        <p className='px-2'>{filteredBooking?.booking_invoice[0]?.transaction_refrence_no}</p>
                    </div>
                    <div className='flex justify-between items-end border-b'>
                        <h2 className='font-semibold pt-2 '>Base Price:</h2>
                        <p className='px-2'>₹{filteredBooking?.booking_invoice[0]?.base_price}</p>
                    </div>
                    <div className='flex justify-between items-end border-b'>
                        <h2 className='font-semibold pt-2 '>Taxes:</h2>
                        <p className='px-2'>₹{filteredBooking?.booking_invoice[0]?.taxes}</p>
                    </div>
                    <div className='flex justify-between items-end border-b'>
                        <h2 className='font-semibold pt-2'>Other Fees:</h2>
                        <p className='px-2'>₹{filteredBooking?.booking_invoice[0]?.other_fees}</p>
                    </div>
                    {filteredBooking?.booking_invoice[0]?.coupon_discount === undefined || null || "" ? <></> :
                        <div className='flex justify-between items-end border-b'>
                            <h2 className='font-semibold pt-2'>Coupon Discount:</h2>
                            <p className='px-2'>₹{filteredBooking?.booking_invoice[0]?.coupon_discount}</p>
                        </div>
                    }

                </div>

            </div>

        </section>
    )
}

export default ReceiptView