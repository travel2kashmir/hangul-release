import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from './modal';
import Footer from './Footer';
import CarousalComponent from './CarousalComponent';
import Services from './Services';
import Rooms from './Rooms';
import About from './About';
import Home from './Home';
import { english, arabic, french } from '../Languages/NewTheme';
import BookingForm from './Booking';
import Color from '../colors/Color';
import Contactus from '../utils/Contactus';
import BookingEngine from '../BookingEngine';
import BookingModal from './BookingModal';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuSM from './MenuSM';


function Hotel({ language, HotelDetails, allRooms, allPackages, services, phone, email }) {

    const [allHotelDetails, setHotelDetails] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [showRoom, setShowRoom] = useState({
        'visible': 0,
        'index': undefined,
    });
    const [menu, setMenu] = useState(false);
    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    const [showModalBooking, setShowModalBooking] = useState(0);
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [roomDetailLoader, setRoomDetailLoader] = useState(0);
    const [lang, setLang] = useState(english);
    const [showContactUs, setShowContactUs] = useState(0);
    const [privacyPolicy, setPrivacyPolicy] = useState()
    const [termsConditions, setTermsConditions] = useState()



    const [showBookingEngine, setShowBookingEngine] = useState(0);
    const [roomsLoader, setRoomsLoader] = useState(false);
    const [display, setDisplay] = useState(0);
    const [enquiry, setEnquiry] = useState({
        "checkin": "",
        "checkout": "",
        "number_of_rooms": 1,
        "number_of_guests": 1,
        "number_of_adults": 1,
        "child_below_six": 0,
        "child_above_six": 0
    })

    const [searched, setSearched] = useState(false)

    useEffect(() => {
        getLanguage();
        getHotelDetails();
        getRoomDetails();

    }, []);
    // console.log("this is the hotel details: ", allHotelDetails)
    // console.log("this is the rooms details: ", rooms)

    function getLanguage() {

        if (language === null) {
            setLang(english)
        } else if (language === 'english') {
            setLang(english)
        } else if (language === 'french') {
            setLang(french)
        } else {
            setLang(arabic)
        }
    }

    function getHotelDetails() {
        setHotelDetails(HotelDetails)
        setPrivacyPolicy(HotelDetails?.privacy_conditions?.[0]?.privacy_policy)
        setTermsConditions(HotelDetails?.privacy_conditions?.[0]?.terms_condition)
        setHotelDetailLoader(1)
    }

    function getRoomDetails() {
        setRooms(allRooms?.rooms);
        setRoomDetailLoader(1);
    }

    return (
        <main>

            <div className={searched === true ? 'z-0' : 'z-50'}>
                <Home
                    allHotelDetails={allHotelDetails}
                    setMenu={setMenu}
                    menu={menu}
                    lang={lang}
                    setLang={setLang}
                    hotelDetailLoader={hotelDetailLoader}
                    setShowContactUs={(e) => setShowContactUs(e)}
                    setShowModalBooking={(e) => setShowModalBooking(e)}
                />
            </div>

            <About
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
            />

            <Rooms
                rooms={rooms}
                showRoom={showRoom}
                setShowRoom={setShowRoom}
                roomDetailLoader={roomDetailLoader}
                lang={lang}
            />


            <CarousalComponent
                id="photos"
                type='photos'
                data={allHotelDetails?.images}
                title={lang?.photos}
                hotelDetailLoader={hotelDetailLoader}
            />

            <Services
                services={services}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
            />

            <CarousalComponent
                id="reviews"
                type='review'
                data={allHotelDetails?.Reviews}
                title={lang?.peopleSays}
                hotelDetailLoader={hotelDetailLoader}
            />

            {/* booking form for lg screen */}
            <div id="booking_engine" className={`hidden lg:flex lg:sticky lg:bottom-0 ${searched === false ? 'z-0' : 'z-50'}`}>
                <BookingForm
                    setShowModalBooking={(e) => setShowModalBooking(e)}
                    setShowBookingEngine={(e) => setShowBookingEngine(e)}
                    color={Color?.light}
                    searched={searched}
                    setSearched={(e) => setSearched(e)}
                    enquiry={enquiry}
                    setEnquiry={(e) => setEnquiry(e)}
                    setRoomsLoader={(e) => setRoomsLoader(e)}
                />
            </div>

            <Footer
                setShowModalPrivacy={setShowModalPrivacy}
                setShowModalTC={setShowModalTC}
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
            />


            {/* booking form for sm and md screen */}
            {showModalBooking === 1 ?
                <div className={`block h-2 lg:hidden`}>
                    <Modal
                        title='Booking Form'
                        description={
                            <div className={`${searched === false ? 'z-0' : 'z-50 '}`}>
                                <BookingForm
                                    setShowModalBooking={(e) => setShowModalBooking(e)}
                                    setShowBookingEngine={(e) => setShowBookingEngine(e)}
                                    color={Color?.light}
                                    searched={searched}
                                    setSearched={(e) => setSearched(e)}
                                    enquiry={enquiry}
                                    setEnquiry={(e) => setEnquiry(e)}
                                    setRoomsLoader={(e) => setRoomsLoader(e)}
                                />
                            </div>
                        }
                        setShowModal={(e) => setShowModalBooking(e)}
                    />
                </div> : undefined}


            {/* this div will only show up when the showBookingEngine is equal to 1 else there will be no such div, and the functions inside this div will only work when showBookingEngine is equal to 1 */}
            {showBookingEngine === 1 ?
                <div className="block z-50">
                    {allHotelDetails && <BookingModal
                        title="Booking Engine"
                        bookingComponent={
                            <BookingEngine
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
                                color={{
                                    "theme": "light",
                                    "bgColor": "bg-slate-200",
                                    "boxColor": "bg-slate-50",
                                    "cardColor": "bg-slate-50",
                                    "border": "border-slate-400",
                                    "text": {
                                        "title": "text-black",
                                        "description": "text-gray-700",
                                    }
                                }}
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


            {/* ------------------- modal view for footer-------------------------- */}

            {showModalTC === 1 ?
                <Modal
                    title={`Terms & Conditions`}
                    description={termsConditions}
                    setShowModal={(e) => setShowModalTC(e)}
                />
                : <></>}


            {showModalPrivacy === 1 ?
                <Modal
                    title={`Privacy Policy`}
                    description={privacyPolicy}
                    setShowModal={(e) => setShowModalPrivacy(e)}
                />
                : <></>}

            {showContactUs === 1 ?
                <Modal
                    description={<Contactus color={Color?.light} language={lang} property_id={HotelDetails?.property_id} />}
                    setShowModal={(e) => setShowContactUs(e)}
                />
                : <></>}

            {/*-------------------- menu bar for small and medium screen----------- */}
            {menu === true ?
                <MenuSM
                    lang={lang}
                    setMenu={setMenu}
                    setShowContactUs={(e) => setShowContactUs(e)}
                />
                : <></>
            }
        </main>
    )
}

export default Hotel;