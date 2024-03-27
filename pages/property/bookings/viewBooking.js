import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import BreadCrumb from '../../../components/utils/BreadCrumb';
import { navigationList,getBookingDetails, BookingDetails } from '../../../components/Bookings/ViewBookings';
var language;
var currentProperty;
var currentLogged;
function ViewBooking() {
    const [spinner, setSpinner] = useState(0)
    const [spin, setSpin] = useState(0)
    const [darkModeSwitcher, setDarkModeSwitcher] = useState()
    const [color, setColor] = useState({})
    const [visible, setVisible] = useState(0)
    const [mode, setMode] = useState()

    const [bookingDetail, setBookingDetail] = useState([])
    const [bookingDetailLoader, setBookingDetailLoader] = useState(true)


    /** Use Effect to fetch details from the Local Storage **/
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        let bookingId = localStorage.getItem('BookingId');
        getBookingDetails({bookingId,currentProperty,setBookingDetail,setBookingDetailLoader});
        setVisible(1)
    }, [])

   

    return (
        <>
            <Title name={`Engage | View Booking`} />

            <Header
                Primary={english?.Side1}
                color={color}
                setColor={setColor}
                Type={currentLogged?.user_type}
                Sec={ColorToggler}
                mode={mode}
                setMode={setMode}
            />

            <Sidebar
                Primary={english?.Side1}
                color={color}
                Type={currentLogged?.user_type}

            />

            <div id="main-content"
                className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

                {/* bread crumb */}
                <BreadCrumb
                    color={color}
                    crumbList={navigationList(currentLogged, currentProperty)}
                />

                {/* Title */}
                <div className=" pt-2 ">
                    <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2 font-bold`}>
                        {language?.viewBooking}
                    </h6>

                    {/* booking details */}
                    <BookingDetails color={color}
                    language={language} 
                    bookingDetailLoader={bookingDetailLoader}
                    bookingDetail={bookingDetail} />
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

