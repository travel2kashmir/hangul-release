import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './Header'
import Home from './Home'
import About from './About'
import Rooms from './Rooms';
import Review from './Review';
import Footer from './Footer';
import Services from './Services';
import Photos from './Photos';
import BookingModal from './Modals/BookingModal';
import BookingEngine from '../BookingEngine';
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import readCookie from '../Analytics/readCookie';
function Hotel({ language, HotelDetails,
  allRooms, allPackages, services,
  phone, email, initialColor }) {

  const [allHotelDetails, setHotelDetails] = useState([]);
  const [rooms, setRooms] = useState([]);

  // loaders
  const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
  const [roomDetailLoader, setRoomDetailLoader] = useState(0);

  const [menu, setMenu] = useState(0)

  const [showBookingEngine, setShowBookingEngine] = useState(0);  // state to display the booking engine
  const [display, setDisplay] = useState(0);  // state to display the different views in the booking modal
  const [roomsLoader, setRoomsLoader] = useState(false);   // loader for booking engine rooms
  const [searched, setSearched] = useState(false) // this is set to true when the search is clicked on the booking form.
  const [cookie, setCookie] = useState()
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

  const color = {
    "bgColor": "bg-custom-brown",
    "boxColor": "bg-custom-lightbrown",
    "cardColor": "bg-white",

  }


  useEffect(() => {
    getHotelDetails();
    getRoomDetails();
    setCookie(readCookie('user'));
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

      <Header
        allHotelDetails={allHotelDetails}
        setMenu={setMenu}
        hotelDetailLoader={hotelDetailLoader}
        cookie={cookie}
      />

      <Home
        allHotelDetails={allHotelDetails}
        setShowBookingEngine={(e) => setShowBookingEngine(e)}
        enquiry={enquiry}
        setEnquiry={(e) => setEnquiry(e)}
        searched={searched}
        setSearched={(e) => setSearched(e)}
        setRoomsLoader={(e) => setRoomsLoader(e)}
        cookie={cookie}
      />

      <About
        allHotelDetails={allHotelDetails}
        hotelDetailLoader={hotelDetailLoader}
      />

      <Photos
        allHotelDetails={allHotelDetails}
        hotelDetailLoader={hotelDetailLoader}
        cookie={cookie}
      />

      <Services
        services={services}
        hotelDetailLoader={hotelDetailLoader}
        cookie={cookie}
      />

      <Rooms
        allRooms={rooms}
        roomDetailLoader={roomDetailLoader}
        currency={allHotelDetails?.business_settings != undefined ? allHotelDetails?.business_settings[0]?.currency_code : 'USD'}
        cookie={cookie}
      />

      <Review
        data={allHotelDetails?.Reviews}
        hotelDetailLoader={hotelDetailLoader}
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



      {/* menu for small screen */}
      <div className={`transition-transform duration-500 ease-in-out transform ${menu === 1 ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 z-50`}>
        {/* Dark background */}
        <div className={`absolute inset-0 bg-black opacity-70 transform transition-transform duration-500 ease-in-out ${menu === 1 ? 'translate-x-0' : '-translate-x-full'}`}></div>

        {/* Content */}
        <div className={`absolute inset-y-0 left-0 w-8/12 bg-custom-brown p-4 transform transition-transform duration-1000 ease-in-out ${menu === 1 ? 'translate-x-0 delay-300' : '-translate-x-full'}`}>
          <div className='flex justify-between'>
            <div className='border border-black inline-block'>
              <p className='px-2 py-2 text-base font-medium uppercase'>{allHotelDetails.property_name}</p>
            </div>
            <button onClick={() => setMenu(0)}><AiOutlineClose /></button>
          </div>

          <div>
            <ul className='pt-10 text-lg' onClick={() => setMenu(0)}>
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