import React, { useEffect, useState } from 'react';
import Title from '../title';
import { english } from '../Languages/Languages';
// import axios from 'axios';
import RoomCalenderView from './RoomCalenderView';
import RoomSummary from './RoomSummary';
import Reviewbooking from './reviewbooking';
import BookingSuccess from './BookingSuccess';
import ReceiptView from './ReceiptView';
// const color = Color?.dark;
let language = english;
let visible = 1;

function BookingEngine({ color, allHotelDetails, rooms, display, setDisplay, setShowModal, setSearched, checkinDate, checkoutDate, roomsLoader, setRoomsLoader }) {

    return (
        <>
            <Title name={`Engage-${allHotelDetails?.property_name} | Booking Engine`} />

            {display === 0 ? <RoomCalenderView allHotelDetails={allHotelDetails} color={color} roomsLoader={roomsLoader} setRoomsLoader={(e) => setRoomsLoader(e)} rooms={rooms} setDisplay={(e) => setDisplay(e)} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}
            {display === 1 ? <RoomSummary color={color} setDisplay={(e) => setDisplay(e)} setRoomsLoader={(e) => setRoomsLoader(e)} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}
            {display === 2 ? <Reviewbooking color={color} setDisplay={(e) => setDisplay(e)} setRoomsLoader={(e) => setRoomsLoader(e)} property_id={allHotelDetails?.property_id} rooms={rooms} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}
            {display === 3 ? <BookingSuccess setDisplay={(e) => setDisplay(e)} rooms={rooms} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}
            {display === 4 ? <ReceiptView setDisplay={(e) => setDisplay(e)} allHotelDetails={allHotelDetails} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} /> : undefined}

        </>
    )
}

export default BookingEngine