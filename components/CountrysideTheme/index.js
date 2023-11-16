import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Home from './Home';
import About from './About';
import Photos from './Photos';
import Rooms from './Rooms';
import Services from './Services';
import CarousalComponent from './CarousalComponent';
import Footer from './Footer';
import BookingModal from './BookingModal';
import BookingEngine from '../BookingEngine';
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Hotel({ language, HotelDetails, allRooms, allPackages, services, phone, email }) {

    const [allHotelDetails, setHotelDetails] = useState([]);
    const [rooms, setRooms] = useState([]);
    // loaders
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [roomDetailLoader, setRoomDetailLoader] = useState(0);
    // state to manage the the display of rooms when clicked on them.
    const [showRoom, setShowRoom] = useState({
        'visible': 0,
        'index': undefined,
    });
    const [menu, setMenu] = useState(0)// menu state for sm and medium screen
    const [showBookingEngine, setShowBookingEngine] = useState(0);  // state to display the booking engine
    const [display, setDisplay] = useState(0);  // state to display the different views in the booking modal
    const [roomsLoader, setRoomsLoader] = useState(false);   // loader for booking engine rooms
    const [searched, setSearched] = useState(false) // this is set to true when the search is clicked on the booking form.

    // state to set the checkin and checkout state
    const [enquiry, setEnquiry] = useState({
        "checkin": "",
        "checkout": "",
        "number_of_rooms": 1,
        "number_of_guests": 1,
        "number_of_adults": 1,
        "child_below_six": 0,
        "child_above_six": 0
    })



    useEffect(() => {
        getHotelDetails();
        getRoomDetails();

    }, [HotelDetails, allRooms]);

    function getHotelDetails() {
        setHotelDetails(HotelDetails)
        console.log("hotel details loaded succesfully")
        setHotelDetailLoader(1)
    }

    function getRoomDetails() {
        setRooms(allRooms.rooms);
        console.log("room details loaded successfull")
        setRoomDetailLoader(1);
    }

    return (
        <main>

            <Home
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                setMenu={(e) => setMenu(e)}
                setShowBookingEngine={(e) => setShowBookingEngine(e)}
                enquiry={enquiry}
                setEnquiry={(e) => setEnquiry(e)}
                rooms={rooms}
                searched={searched}
                setSearched={(e) => setSearched(e)}
                setRoomsLoader={(e) => setRoomsLoader(e)}
            />

            <About
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}

            />

            <Photos
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
            />

            <Rooms
                allHotelDetails={allHotelDetails}
                rooms={rooms}
                roomDetailLoader={roomDetailLoader}
                showRoom={showRoom}
                setShowRoom={(e) => setShowRoom(e)}
            />

            <Services
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
            />

            {/* for review section */}
            <CarousalComponent
                id="reviews"
                type='review'
                data={allHotelDetails?.Reviews}
                title="What They Say About Us"
                subtitle="FEEDBACK FROM OUR DEAR CLIENTS"
                hotelDetailLoader={hotelDetailLoader}
            />

            <Footer
                allHotelDetails={allHotelDetails}
            />

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


            {/* menu for small screen */}
            <div className={`transition-transform duration-500 ease-in-out transform ${menu === 1 ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 z-50`}>
                {/* Dark background */}
                <div className={`absolute inset-0 bg-black opacity-70 transform transition-transform duration-500 ease-in-out ${menu === 1 ? 'translate-x-0' : '-translate-x-full'}`}></div>

                {/* Content */}
                <div className={`absolute inset-y-0 left-0 w-8/12 bg-custom-brown p-4 transform transition-transform duration-1000 ease-in-out ${menu === 1 ? 'translate-x-0 delay-300' : '-translate-x-full'}`}>
                    <div className='flex justify-between'>
                        <div className=' inline-block'>
                            <p className=' py-2 text-lg font-medium uppercase font-family-marcellus'>{allHotelDetails.property_name}</p>
                        </div>
                        <button onClick={() => setMenu(0)}><AiOutlineClose /></button>
                    </div>

                    <div>
                        <ul className='pt-5 font-family-jost-regular' onClick={() => setMenu(0)}>
                            <li className='pb-2'><a href='#about'>About</a></li>
                            <li className='pb-2'><a href='#rooms'>Rooms</a></li>
                            <li className='pb-2'><a href='#photos'>Gallery</a></li>
                            <li><a href='#services'>Services</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Hotel