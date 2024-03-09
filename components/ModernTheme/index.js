import React, { useState, useEffect } from 'react'
import Header from './Header';
import Home from './Home';
import About from './About'
import Rooms from './Rooms';
import Footer from './Footer';
import CarousalComponent from './CarousalComponent';
import MenuSM from './MenuSM';
import color from './Data/Colors';
import Services from './Services';
import Photos from './Photos';
import BookingEngine from '../BookingEngine';
import BookingModal from './Modals/BookingModal';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import readCookie from '../Analytics/readCookie';

function Hotel({ language, HotelDetails,
    allRooms, allPackages, services,
    phone, email, initialColor }) {
    const [allHotelDetails, setHotelDetails] = useState([]);
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [roomDetailLoader, setRoomDetailLoader] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [menu, setMenu] = useState(false);
    const [themeColor, setThemeColor] = useState(color.black);



    const [showBookingEngine, setShowBookingEngine] = useState(0);  // state to display the booking engine
    const [display, setDisplay] = useState(0);  // state to display the different views in the booking modal
    const [roomsLoader, setRoomsLoader] = useState(false);   // loader for booking engine rooms
    const [searched, setSearched] = useState(false) // this is set to true when the search is clicked on the booking form.
    const [cookie,setCookie]= useState()
    // state to set the checkin and checkout state
    const [enquiry, setEnquiry] = useState({
        "checkin": "",
        "checkout": "",
        // "number_of_rooms": 1,
        "number_of_guests": 1,
        "number_of_adults": 1,
        "guests_below_six": 0,
        "guests_below_twelve": 0
    });

    useEffect(() => {
        getThemeColor();
        getHotelDetails();
        getRoomDetails();
        setCookie(readCookie('user'));
    }, [HotelDetails, allRooms, initialColor]);

    function getThemeColor() {
        setThemeColor(initialColor)
    }
    function getHotelDetails() {
        setHotelDetails(HotelDetails)
        setHotelDetailLoader(1)
    }

    function getRoomDetails() {
        setRooms(allRooms.rooms);
        setRoomDetailLoader(1);
    }

    return (
        <>
            <Header
                allHotelDetails={allHotelDetails}
                menu={menu}
                setMenu={setMenu}
                themeColor={themeColor}
                setRoomsLoader={(e) => setRoomsLoader(e)}
                setShowBookingEngine={(e) => setShowBookingEngine(e)}
                setEnquiry={(e) => setEnquiry(e)}
                enquiry={enquiry}
                setSearched={(e) => setSearched(e)}
                searched={searched}
                cookie={cookie}
            />

            <Home
                hotelData={allHotelDetails}
                cookie={cookie}
            />


            <About
                hotelData={allHotelDetails}
                initialThemeColor={themeColor}
                cookie={cookie}
            />

            <Rooms
                allHotelDetails={allHotelDetails}
                rooms={rooms}
                roomDetailLoader={roomDetailLoader}
                hotelDetailLoader={hotelDetailLoader}
                currency={allHotelDetails?.business_settings!=undefined? allHotelDetails?.business_settings[0]?.currency_code : 'USD'}
                cookie={cookie}
            />

            {/* hotel gallery */}
            <div id='photos' className='py-10'>
                <div className='mx-4 mb-10 md:mb-16 text-center'>
                    <h3 className='text-2xl md:text-3xl lg:text-3xl font-normal tracking-widest border-b-2 border-black inline-block'>GALLERY</h3>
                </div>
                <Photos 
                allHotelDetails={allHotelDetails}
                cookie={cookie} />
            </div>

            {/* hotel Services */}
            <Services
                services={services}
                hotelDetailLoader={hotelDetailLoader}
                cookie={cookie}
            />

            <CarousalComponent
                id="reviews"
                type='review'
                data={allHotelDetails?.Reviews}
                title='TESTIMONIALS'
                themeColor={themeColor}
                cookie={cookie}
            />

            <Footer
                hotelData={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                terms={allHotelDetails?.privacy_conditions === undefined ? '' : allHotelDetails?.privacy_conditions[0]?.terms_condition}
                privacy={allHotelDetails?.privacy_conditions === undefined ? '' : allHotelDetails?.privacy_conditions[0]?.privacy_policy}

            />

            {/* this div will only show up when the showBookingEngine is equal to 1 else there will be no such div, and the functions inside this div will only work when showBookingEngine is equal to 1 */}
            {showBookingEngine === 1 ?
                <div className="block z-50">
                    {allHotelDetails && <BookingModal
                        bookingComponent={
                            <BookingEngine
                                color={color}
                                roomsLoader={roomsLoader}
                                setRoomsLoader={(e) => setRoomsLoader(e)}
                                display={display}
                                setDisplay={(e) => setDisplay(e)}
                                rooms={rooms}
                                allHotelDetails={allHotelDetails}
                                setShowModal={(e) => setShowBookingEngine(e)}
                                setSearched={(e) => setSearched(false)}
                                checkinDate={enquiry.checkin}
                                checkoutDate={enquiry.checkout}
                                cookie={cookie}
                            />}
                    />}
                </div> : undefined}

            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/*-------------------- menu bar for small and medium screen----------- */}
            {menu === true ?
                <MenuSM />
                : <></>}


        </>
    )
}

export default Hotel;