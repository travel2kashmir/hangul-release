import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RoomCard from '../BookingEngine/RoomCard';
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
// useDispatch is used to store the data in the store of the redux, while useSelector is used to get the data from the store.
import { useDispatch, useSelector } from 'react-redux';
// reducer functions are being imported from the redux
import { clearRoomsSelected, setAddMoreRoom, clearReservationIdentity, clearInventoryDetail, clearGuestDetails } from '../redux/hangulSlice'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomLoader from './RoomLoader';


function RoomCalenderView({ roomsLoader, rooms, allRoomRateDetails, dataOfRoomsAsPerDateSelected, setDisplay, setShowModal, setSearched, color, checkinDate, checkoutDate }) {

    const reservationIdentity = useSelector(state => state.reservationIdentity)
    const dispatch = useDispatch() //creating object of dispatch 

    const addMoreRooms = useSelector(state => state.addMoreRoom) //reads addMoreRoom from state into const
    const roomsSelected = useSelector(state => state.roomsSelected)

    // Create an object to group room rates by room_id and calculate the total final rate for each room
    const roomData = {};

    // taking out the data from the dataOfRoomsAsPerDateSelected and storing them in roomData object.
    dataOfRoomsAsPerDateSelected.forEach((rate) => {
        const { room_id, property_id, final_rate, tax_amount, otherfees_amount } = rate;
        if (!roomData[room_id]) {
            roomData[room_id] = {
                room_id,
                property_id,
                total_final_rate: final_rate,
                total_tax_amount: tax_amount,
                total_otherfees_amount: otherfees_amount
            };
        } else {
            roomData[room_id].total_final_rate += final_rate;
            roomData[room_id].total_tax_amount += tax_amount;
            roomData[room_id].total_otherfees_amount += otherfees_amount;
        }
    });

    // Convert the grouped data into an array of rooms
    const roomsArray = Object.values(roomData);
    // console.log("this is rooms array ", roomsArray)

    // Sort the roomsArray in ascending order based on total_final_rate
    const sortedFinalRate = roomsArray.slice().sort((room1, room2) => room1.total_final_rate - room2.total_final_rate);
    // console.log("this is the sorted final rate", sortedData)


    // only those rooms whose room_id is not in roomsSelected state
    const roomsToDisplay = sortedFinalRate.filter((room) => {
        // Check if the room_id is not in the roomsSelected array
        return !roomsSelected.includes(room.room_id);
    });

    useEffect(() => {
        groupingByDate()
    }, [allRoomRateDetails])

    // Create an object to store room details grouped by rate_date
    const groupedByDate = {};

    function groupingByDate() {
        // Loop through the roomDetails array
        allRoomRateDetails.forEach((room) => {
            const rate_date = room.rate_date;

            // If the rate_date is not in groupedByDate, create an empty array for it
            if (!groupedByDate[rate_date]) {
                groupedByDate[rate_date] = [];
            }
            // Push the room details into the corresponding rate_date array
            groupedByDate[rate_date].push(room);
        });

        // Now, groupedByDate will contain separate arrays for each rate_date
        // console.log("grouped by date:- ", groupedByDate);
        return groupedByDate;
    }
    // console.log("returning group", groupingByDate())

    // if incase we need this function in future, this function is used to take out the lowest rate on the particular date
    // function findingLowestRate() {
    //     // Loop through the grouped data
    //     for (const rate_date in groupedByDate) {
    //         const roomsForDate = groupedByDate[rate_date];

    //         // Find the room with the lowest final_rate for the current date
    //         const lowestRoom = roomsForDate.reduce((lowest, room) => {
    //             return room.final_rate < lowest.final_rate ? room : lowest;
    //         });
    //         // Store the lowest rate for the current date
    //         lowestRatesByDate[rate_date] = lowestRoom.final_rate;
    //     }

    //     // Now, lowestRatesByDate will contain the lowest rate for each date
    //     // console.log("lowest rate by date:- ", lowestRatesByDate);
    //     const lowestRatesArray = Object.entries(lowestRatesByDate);
    //     return lowestRatesArray;
    // }

    // Function to delete room_rates and room_data from local storage
    function deleteRoomDetails() {
        // Remove the room_rates key from local storage
        localStorage.removeItem('room_rates');
        localStorage.removeItem('temp_room_rate');

        // Remove the room_data key from local storage
        localStorage.removeItem('room_data');

        // Remove the room reservation_ids key from local storage
        localStorage.removeItem('reservation_ids');

    }

    function removeReservationFromDB(room_id, reservation_time) {
        let url = `/api/reserve_rooms/${room_id}/${reservation_time}`;
        axios.delete(url).then((response) => {
            setDisplay(0)
            setShowModal(0)
            setSearched(false)
            dispatch(setAddMoreRoom(false))
            dispatch(clearRoomsSelected())
            dispatch(clearReservationIdentity())
            dispatch(clearInventoryDetail())
            deleteRoomDetails()
        }).catch((err) => {
            toast.error("API:Error in deleting reservation from DB")
        })

    }

    function closeButtonAction() {
        // if there is any reservation in DB then remove them first else perform the other funtions
        if (reservationIdentity.length > 0) {
            reservationIdentity?.map((room) => {
                removeReservationFromDB(room?.room_id, room?.reservation_time);
            });
        }
        else {
            setShowModal(0)
            setDisplay(0)
            setSearched(false)
            dispatch(setAddMoreRoom(false))
            dispatch(clearRoomsSelected())
            dispatch(clearGuestDetails())
            dispatch(clearReservationIdentity())
            dispatch(clearInventoryDetail())
            deleteRoomDetails()
        }
    }


    return (
        <div id="main-content" className={`${color?.light} px-4 `}>
            <div className={`${color?.light} shadow rounded-lg lg:px-12 lg:py-3 `}>

                {/* app bar */}
                <div className='flex justify-between py-6'>
                    <h6 className={`text-xl my-auto flex leading-none font-bold`}>
                        Rooms For Booking
                    </h6>
                    <div className='my-auto'>
                        <div className='flex gap-10'>
                            {/* cart option */}
                            <i className='cursor-pointer'
                                onClick={() => {
                                    if (roomsSelected.length === 0) {
                                        toast.error("APP: Cart is Empty.");
                                    } else {
                                        setDisplay(2)
                                    }
                                }}
                            > <AiOutlineShoppingCart color='black' size={20} />
                            </i>

                            {/* back option */}
                            <i className='cursor-pointer'
                                onClick={closeButtonAction}>
                                <AiOutlineClose color='red' size={20} />
                            </i>
                        </div>
                    </div>
                </div>

                {addMoreRooms === true ?
                    <> {
                        roomsToDisplay.map((room, index) => {
                            return (
                                <RoomCard
                                    key={index}
                                    roomImage={`https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
                                    filteredRoomData={rooms?.find((item) => item.room_id === room.room_id)}
                                    roomRates={room}
                                    setDisplay={(e) => setDisplay(e)}
                                    checkinDate={checkinDate}
                                    checkoutDate={checkoutDate}
                                />
                            );
                        })
                    }
                    </> :
                    <>{
                        roomsLoader === true ? <><RoomLoader size={`w-full h-44  rounded-2xl p-4 mt-10 m-2 `} /> <RoomLoader size={`w-full h-44  rounded-2xl p-4 m-2 `} /> <RoomLoader size={`w-full h-44  rounded-2xl p-4 m-2 `} /></> : <>
                            {sortedFinalRate.map((room, index) => {
                                return <RoomCard
                                    key={index}
                                    roomImage={`https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
                                    filteredRoomData={rooms?.filter((item) => item.room_id == room.room_id)[0]}
                                    roomRates={room}
                                    setDisplay={(e) => setDisplay(e)}
                                    checkinDate={checkinDate}
                                    checkoutDate={checkoutDate}
                                />
                            })}</>
                    }</>}
            </div>
        </div>
    )
}

export default RoomCalenderView