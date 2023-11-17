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
import { AiOutlineClose } from "react-icons/ai";


function Hotel({ language, HotelDetails,
  allRooms, allPackages, services,
  phone, email, initialColor }) {

  const [allHotelDetails, setHotelDetails] = useState([]);
  const [rooms, setRooms] = useState([]);

  // loaders
  const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
  const [roomDetailLoader, setRoomDetailLoader] = useState(0);

  const [menu, setMenu] = useState(0)


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

      <Header
        allHotelDetails={allHotelDetails}
        menu={menu}
        setMenu={setMenu}
        hotelDetailLoader={hotelDetailLoader}

      />

      <Home
        allHotelDetails={allHotelDetails}
      />

      <About
        allHotelDetails={allHotelDetails}
        hotelDetailLoader={hotelDetailLoader}

      />

      <Photos
        allHotelDetails={allHotelDetails}
        hotelDetailLoader={hotelDetailLoader}

      />

      <Services
        services={services}
        hotelDetailLoader={hotelDetailLoader}

      />

      <Rooms
        allRooms={rooms}
        roomDetailLoader={roomDetailLoader}
      />

      <Review
        data={allHotelDetails?.Reviews}
        hotelDetailLoader={hotelDetailLoader}

      />

      <Footer
        hotelData={allHotelDetails}
        hotelDetailLoader={hotelDetailLoader}
        terms={allHotelDetails?.privacy_conditions === undefined ? '' : allHotelDetails?.privacy_conditions[0]?.terms_condition}
        privacy={allHotelDetails?.privacy_conditions === undefined ? '' : allHotelDetails?.privacy_conditions[0]?.privacy_policy}

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