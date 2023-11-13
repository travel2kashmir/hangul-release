import React, { useEffect, useState } from 'react';
import Title from '../title';
import Color from '../colors/Color';
import { english } from '../Languages/Languages';
import axios from 'axios';
import RoomCalenderView from './RoomCalenderView';
import RoomSummary from './RoomSummary';
import Reviewbooking from './reviewbooking';
import BookingSuccess from './BookingSuccess';

const color = Color?.dark;
let language = english;
let visible = 1;

function BookingEngine({ allHotelDetails, rooms, display, setDisplay, setShowModal, setSearched, checkinDate, checkoutDate, roomsLoader, setRoomsLoader }) {

    const [allRoomRateDetails, setAllRoomRateDetails] = useState([]);
    const [dataAsPerDate, setDataAsPerDate] = useState([]);


    // useEffect with empty dependency array runs as soon as the component loads.
    useEffect(() => {
        getRoomDetails()
    }, [])

    // useEffect with dependency array runs as soon as the value for the dependency array changes.
    useEffect(() => {
        getRatesForTheSelectedDate()
    }, [checkinDate, checkoutDate])

    function getRoomDetails() {
        // room rates for this property
        let url = `/api/rates/${allHotelDetails?.property_id}`;
        axios.get(url)
            .then((response) => {
                setAllRoomRateDetails(response.data)

            }).catch((err) => {
                console.log(JSON.stringify(err))
            })
    }

    function getRatesForTheSelectedDate() {
        // this function gives rates of the rooms for the selected dates
        let url2 = `/api/rates/${allHotelDetails?.property_id}/${checkinDate}/${checkoutDate}`
        axios.get(url2).then((response) => {
            setDataAsPerDate(response.data)
            setRoomsLoader(false)
        }).catch((err) => {
            console.log(JSON.stringify(err))
        })
    }

    return (
        <>
            <Title name={`Engage-${allHotelDetails?.property_name} | Booking Engine`} />

            {display === 0 ? <RoomCalenderView roomsLoader={roomsLoader} setRoomsLoader={(e) => setRoomsLoader(e)} color={color} allRoomRateDetails={allRoomRateDetails} dataOfRoomsAsPerDateSelected={dataAsPerDate} rooms={rooms} setDisplay={(e) => setDisplay(e)} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}
            {display === 1 ? <RoomSummary setDisplay={(e) => setDisplay(e)} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} x /> : undefined}
            {display === 2 ? <Reviewbooking setDisplay={(e) => setDisplay(e)} rooms={rooms} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}
            {display === 3 ? <BookingSuccess setDisplay={(e) => setDisplay(e)} rooms={rooms} setShowModal={(e) => setShowModal(e)} setSearched={(e) => setSearched(false)} checkinDate={checkinDate} checkoutDate={checkoutDate} /> : undefined}

        </>
    )
}

export default BookingEngine