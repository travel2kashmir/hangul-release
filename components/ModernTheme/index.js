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


function Hotel({ language, HotelDetails,
    allRooms, allPackages, services,
    phone, email, initialColor }) {
    const [allHotelDetails, setHotelDetails] = useState([]);
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [roomDetailLoader, setRoomDetailLoader] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [menu, setMenu] = useState(false);
    const [themeColor, setThemeColor] = useState(color.black);

    useEffect(() => {
        getThemeColor();
        getHotelDetails();
        getRoomDetails();
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
            />

            <Home
                hotelData={allHotelDetails}
            />


            <About
                hotelData={allHotelDetails}
                initialThemeColor={themeColor}
            />

            <Rooms
                allHotelDetails={allHotelDetails}
                rooms={rooms}
                roomDetailLoader={roomDetailLoader}
                hotelDetailLoader={hotelDetailLoader}
            />

            {/* hotel gallery */}
            <div id='photos' className='py-10'>
                <div className='mx-4 mb-10 md:mb-16 text-center'>
                    <h3 className='text-2xl md:text-3xl lg:text-3xl font-normal tracking-widest border-b-2 border-black inline-block'>GALLERY</h3>
                </div>
                <Photos allHotelDetails={allHotelDetails} />
            </div>

            {/* hotel Services */}
            <Services
                services={services}
                hotelDetailLoader={hotelDetailLoader}
            />

            <CarousalComponent
                id="reviews"
                type='review'
                data={allHotelDetails?.Reviews}
                title='TESTIMONIALS'
                themeColor={themeColor}
            />

            <Footer
                hotelData={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                terms={allHotelDetails?.privacy_conditions === undefined ? '' : allHotelDetails?.privacy_conditions[0]?.terms_condition}
                privacy={allHotelDetails?.privacy_conditions === undefined ? '' : allHotelDetails?.privacy_conditions[0]?.privacy_policy}

            />



            {/*-------------------- menu bar for small and medium screen----------- */}

            {menu === true ? <MenuSM /> : <></>}


        </>
    )
}

export default Hotel;