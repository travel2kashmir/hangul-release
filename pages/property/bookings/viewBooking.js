import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Headloader from '../../../components/loaders/headloader';
import { ToastContainer, toast } from 'react-toastify';
import colorFile from '../../../components/colors/Color';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import Router from 'next/router'

const logger = require("../../../services/logger");
var language;
var currentProperty;
var currentLogged;
let colorToggle;

function ViewBooking() {
    const [spinner, setSpinner] = useState(0)
    const [spin, setSpin] = useState(0)
    const [darkModeSwitcher, setDarkModeSwitcher] = useState()
    const [color, setColor] = useState({})
    const [visible, setVisible] = useState(0)
    const [mode, setMode] = useState()

    const [bookingDetail, setBookingDetail] = useState([])
    const [bookingDetailLoader, setBookingDetailLoader] = useState(true)

    function getBookingDetails(bookingId) {
        const url = `/api/all_bookings/${currentProperty.property_id}/${bookingId}`
        axios.get(url, { headers: { 'accept': 'application/json' } }).then((response) => {
            setBookingDetail(response?.data?.booking.map((i) => i));
            setBookingDetailLoader(false);
        }).catch((err) => {
            console.log(err)
        });
    }


    // let DummyBookingData = {
    //     "booking": [
    //         {
    //             "booking_id": "bk0090",
    //             "booking_date_from": "2023-11-24",
    //             "booking_date_to": "2023-11-25",
    //             "total_rooms_booked": 1,
    //             "is_cancelled": false,
    //             "booking_time": "2023-11-22 13:03:44.222",
    //             "booking_room_link": [
    //                 {
    //                     "room_name": "Capsule",
    //                     "room_type": "single",
    //                     "room_count": 1,
    //                     "room_id": "r0011"
    //                 }
    //             ],
    //             "booking_guest_link": [
    //                 {
    //                     "guest_name": "Roshan ALi dar",
    //                     "guest_email": "roshanali@mail.in",
    //                     "guest_age": 20,
    //                     "guest_phone_number": 7006177645
    //                 }
    //             ],
    //             "booking_invoice": [
    //                 {
    //                     "base_price": 2200,
    //                     "taxes": 220,
    //                     "other_fees": 200,
    //                     "coupon_discount": 120,
    //                     "total_price": 2400,
    //                     "transaction_refrence_no": "rx12345",
    //                     "invoice_time": "2023-11-22 13:03:44.222",
    //                     "booking_gst_link": [
    //                         {
    //                             "gst_registration_no": "RX12aa4",
    //                             "gst_company_name": "ABC Co",
    //                             "gst_company_address": "12 Rashan Ghat",
    //                             "invoice_id": "inv001"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // }

    /** Use Effect to fetch details from the Local Storage **/
    useEffect(() => {
        firstfun();
        let currentBookingId = localStorage.getItem('BookingId');
        getBookingDetails(currentBookingId);
        // setBookingDetail(DummyBookingData?.booking.map((i) => i))
    }, [])

    const firstfun = () => {
        if (typeof window !== 'undefined') {
            var locale = localStorage.getItem("Language");
            colorToggle = localStorage.getItem("colorToggle");
            if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
                window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light)
                setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
            }
            else if (colorToggle === "true" || colorToggle === "false") {
                setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
                setMode(colorToggle === "true" ? true : false)
            }
            {
                if (locale === "ar") {
                    language = arabic;
                }
                if (locale === "en") {
                    language = english;
                }
                if (locale === "fr") {
                    language = french;
                }
            }
            /** Current Property Details fetched from the local storage **/
            currentProperty = JSON.parse(localStorage.getItem("property"));
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
            setVisible(1)
        }
    }
    const colorToggler = (newColor) => {
        if (newColor === 'system') {
            window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
                : setColor(colorFile?.light)
            localStorage.setItem("colorToggle", newColor)
        }
        else if (newColor === 'light') {
            setColor(colorFile?.light)
            localStorage.setItem("colorToggle", false)
        }
        else if (newColor === 'dark') {
            setColor(colorFile?.dark)
            localStorage.setItem("colorToggle", true)
        }
        firstfun();
        Router.push('./viewBooking')
    }

    return (
        <>
            <Title name={`Engage | View Booking`} />

            <Header
                Primary={english?.Side1}
                color={color}
                Type={currentLogged?.user_type}
                Sec={colorToggler}
                mode={mode}
                setMode={setMode}
            />

            <Sidebar
                Primary={english?.Side1}
                color={color} T
                ype={currentLogged?.user_type}

            />

            <div id="main-content"
                className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

                {/* bread crumb */}
                <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../../admin/adminlanding" : "../landing"}
                                    className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                                </Link></div>
                        </li>
                        <li>
                            <div className="flex items-center">

                                <div className={`${color?.text} text-base capitalize font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                                    <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../propertysummary" className={`text-gray-700 text-sm ml-1 md:ml-2  font-medium hover:${color?.text} `}>
                                        <a>{currentProperty?.property_name}</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                                    <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../bookings" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                                        <a>{language?.bookings}</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.viewBooking}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Title */}
                <div className=" pt-2 ">
                    <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2 font-bold`}>
                        {language?.viewBooking}
                    </h6>

                    {/* booking details */}
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
                                                            <span className='font-normal text-sm'>{invoice?.transaction_refrence_no}</span>
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
                </div>

                {/* Toast Container */}
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />

            </div>

            <Footer color={color} Primary={english.Foot1} />

        </>
    )
}

export default ViewBooking
ViewBooking.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )


}

