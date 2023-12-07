import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
// imports to download the page into pdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useSelector } from 'react-redux'

function ReceiptView({ allHotelDetails, setShowModal, setDisplay }) {

    let bookingInfo = useSelector(state => state.bookingInfo)
    let bookingId = bookingInfo.booking_id
    let propertyId = bookingInfo.property_id

    const [bookingDetails, setBookingDetail] = useState([])

    const pdfRef = useRef();

    useEffect(() => {
        getBookingDetails(bookingId)
    }, [])

    const generatePDF = () => {
        const input = pdfRef.current;

        // Use html2canvas to capture the content of the specified HTML element
        html2canvas(input).then((canvas) => {
            // Convert the canvas to a data URL representing a PNG image
            const imgData = canvas.toDataURL('image/png');

            // Create a new jsPDF instance with A4 page dimensions and set it to be in portrait mode
            const pdf = new jsPDF('p', 'mm', 'a4', true);

            // Get the width and height of the PDF page
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Get the width and height of the captured image
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Calculate a scaling ratio to fit the image within the PDF page dimensions
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            // Calculate the x-coordinate to center the image on the PDF page
            const imgX = (pdfWidth - imgWidth * ratio) / 2;

            // Calculate the y-coordinate to place the image at the top of the PDF page (change if needed)
            const imgY = 0;
            // const imgY = 30;

            // Add the captured image to the PDF, scaling it according to the calculated ratio
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

            // Save the PDF with the specified filename
            // pdf.save('receipt.pdf');
            pdf.save(bookingDetails?.[0]?.booking_guest_link[0]?.guest_name + " - " + bookingDetails?.[0]?.booking_room_link[0]?.room_name);
        });
    };

    function getBookingDetails(bookingId) {
        const url = `/api/all_bookings/${propertyId}/${bookingId}`
        axios.get(url, { headers: { 'accept': 'application/json' } }).then((response) => {
            setBookingDetail(response?.data?.booking.map((i) => i));
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <section >
            <div ref={pdfRef} className='px-3 md:px-10'>
                <div className=' py-5 flex justify-between border-b'>
                    <div className='flex'>
                        <h2 className='text-2xl md:text-5xl my-auto'>Receipt</h2>
                    </div>
                    <div>
                        <h2 className='text-lg md:text-2xl text-right'>{allHotelDetails?.property_name}</h2>
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

                <div className='py-5 border-b flex justify-between'>
                    <div>
                        <h4 className=' md:text-lg'>Bill To</h4>
                        {/* it will check if gst for company is registered then it will display company's name else will display guests name */}
                        <h3 className='md:text-lg font-semibold '>
                            {bookingDetails?.[0]?.booking_invoice?.[0]?.booking_gst_link?.length > 0 ? bookingDetails?.[0]?.booking_invoice?.[0]?.booking_gst_link?.[0]?.gst_company_name : bookingDetails?.[0]?.booking_guest_link?.[0]?.guest_name}
                        </h3>
                        {/* it will first check if gst for company is registered then it will display guest name else nothing */}
                        {bookingDetails?.[0]?.booking_invoice?.[0]?.booking_gst_link?.length > 0 ?
                            <h3 className='md:text-lg font-semibold '>
                                {bookingDetails?.[0]?.booking_guest_link[0].guest_name}
                            </h3> : <></>}

                        <h3 className='md:text-lg font-semibold'>
                            {bookingDetails?.[0]?.booking_invoice?.[0]?.booking_gst_link?.length > 0 ? bookingDetails?.[0]?.booking_invoice?.[0].booking_gst_link?.[0].gst_company_address : bookingDetails?.[0]?.booking_guest_link?.[0].guest_email}
                        </h3>
                        <h3 className='md:text-lg font-semibold'>
                            {bookingDetails?.[0]?.booking_guest_link?.[0].guest_phn_number}
                        </h3>

                    </div>
                    <div className='text-right'>
                        <h2 className='md:text-lg font-semibold'>Receipt ID </h2>
                        <p > {bookingDetails?.[0]?.booking_invoice?.[0].invoice_id}</p>
                        <h2 className='md:text-lg font-semibold pt-2'>Date </h2>
                        <p>{bookingDetails?.[0]?.booking_invoice?.[0].invoice_time}</p>

                    </div>
                </div>

                <div className='py-5 md:flex md:justify-between'>
                    <div className='md:w-7/12'>
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
                                {bookingDetails?.[0]?.booking_room_link?.map((room, index) => {
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
                                    <td className='py-2 border-b-2 border-slate-300 md:text-lg font-bold'> ₹{bookingDetails?.[0]?.booking_invoice?.[0]?.total_price}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <div className='py-10 md:py-0 md:w-3/12'>
                        <div className='flex justify-between items-end border-b'>
                            <p className=' font-semibold pt-2 '>Transaction Refrence No:</p>
                            <p className='px-2 text-right'>{bookingDetails?.[0]?.booking_invoice?.[0]?.transaction_refrence_no}</p>
                        </div>
                        <div className='flex justify-between items-end border-b'>
                            <h2 className='font-semibold pt-2'>Booking Date </h2>
                            <p className='px-2'>{bookingDetails[0]?.booking_date_from} to {bookingDetails[0]?.booking_date_to}</p>
                        </div>       

                        <div className='flex justify-between items-end border-b'>
                            <h2 className='font-semibold pt-2 '>Base Price:</h2>
                            <p className='px-2'>₹{bookingDetails?.[0]?.booking_invoice?.[0]?.base_price}</p>
                        </div>
                        <div className='flex justify-between items-end border-b'>
                            <h2 className='font-semibold pt-2 '>Taxes:</h2>
                            <p className='px-2'>₹{bookingDetails?.[0]?.booking_invoice?.[0]?.taxes}</p>
                        </div>
                        <div className='flex justify-between items-end border-b'>
                            <h2 className='font-semibold pt-2'>Other Fees:</h2>
                            <p className='px-2'>₹{bookingDetails?.[0]?.booking_invoice?.[0]?.other_fees}</p>
                        </div>
                        {bookingDetails?.[0]?.booking_invoice?.[0]?.coupon_discount === undefined || null || "" ? <></> :
                            <div className='flex justify-between items-end border-b'>
                                <h2 className='font-semibold pt-2'>Coupon Discount:</h2>
                                <p className='px-2'>₹{bookingDetails?.[0]?.booking_invoice?.[0]?.coupon_discount}</p>
                            </div>}
                        

                    </div>
                </div>
            </div>


            <div className='flex justify-center py-10'>
                <button onClick={generatePDF} className='px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:rounded-md'>Download PDF</button>
                <button onClick={() => { setDisplay(0); setShowModal(0) }} className='px-3 py-2 mx-1 bg-red-600 hover:bg-red-700 text-white rounded-lg hover:rounded-md'>Back To Home</button>
            </div>
        </section>
    )
}

export default ReceiptView