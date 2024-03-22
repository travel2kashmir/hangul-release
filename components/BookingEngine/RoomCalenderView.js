import React, { useState, useEffect } from 'react'
import axios from 'axios';
import RoomCard from '../BookingEngine/RoomCard';
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
// useDispatch is used to store the data in the store of the redux, while useSelector is used to get the data from the store.
import { useDispatch, useSelector } from 'react-redux';
// reducer functions are being imported from the redux
import { clearRoomsSelected, setAddMoreRoom, clearReservationIdentity, clearInventoryDetail, clearGuestDetails, updateBookingInfo } from '../redux/hangulSlice'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomLoader from './RoomLoader';


function RoomCalenderView({ allHotelDetails, color, roomsLoader, setRoomsLoader, rooms, setDisplay, setShowModal, setSearched, checkinDate, checkoutDate, cookie,closeButtonAction }) {

    const reservationIdentity = useSelector(state => state.reservationIdentity)
    const dispatch = useDispatch() //creating object of dispatch 

    // const addMoreRooms = useSelector(state => state.addMoreRoom) //reads addMoreRoom from state into const
    const roomsSelectedInitial = useSelector(state => state.roomsSelected)
    const roomsSelected = roomsSelectedInitial.map(i => i.room_id)
    const [dataAsPerDate, setDataAsPerDate] = useState([]);

    useEffect(() => {
        getRatesForTheSelectedDate()
    }, [])

    // this function gives rates of the rooms for the selected dates
    function getRatesForTheSelectedDate() {
        let url = `/api/rates/${allHotelDetails?.property_id}/${checkinDate}/${checkoutDate}`
        axios.get(url).then((response) => {
            setDataAsPerDate(response.data)
            setRoomsLoader(false)
        }).catch((err) => {
            // console.log(JSON.stringify(err))
        })
    }
    const calculateTotalFinalRate = () => {
        // Create an object to group room rates by room_id and rate plan
        const roomData = {};

        // Taking out the data from the filteredData and storing them in roomData object.
        dataAsPerDate.forEach((rate) => {
            const { room_id, property_id, final_rate, tax_amount, otherfees_amount, room_rate_plan_id, meal_name } = rate;

            // Create a key combining room_id and room_rate_plan_id to distinguish rates for different plans
            const key = `${room_id}_${room_rate_plan_id}`;

            if (!roomData[key]) {
                roomData[key] = {
                    room_id,
                    property_id,
                    room_rate_plan_id,
                    meal_name,
                    total_final_rate: final_rate,
                    total_tax_amount: tax_amount,
                    total_otherfees_amount: otherfees_amount
                };
            } else {
                roomData[key].total_final_rate += final_rate;
                roomData[key].total_tax_amount += tax_amount;
                roomData[key].total_otherfees_amount += otherfees_amount;
            }
        });

        // Convert the object values to an array of separate rate types
        const separateRatesArray = Object.values(roomData);
        return separateRatesArray;
    };


    const roomsArray = calculateTotalFinalRate();

    // Sort the roomsArray in ascending order based on total_final_rate
    const sortedFinalRate = roomsArray.slice().sort((room1, room2) => room1.total_final_rate - room2.total_final_rate);
    const uniqueRooms = [];
    const roomSet = new Set();

    sortedFinalRate.forEach(entry => {
        const { room_id, property_id } = entry;
        const key = `${room_id}_${property_id}`;

        if (!roomSet.has(key)) {
            roomSet.add(key);
            uniqueRooms.push({ room_id, property_id });
        }
    });

    // rates ka json with room_id as key 
    const transformData = (initialData) => {
        const result = Object.values(initialData.reduce((accumulator, currentItem) => {
            const roomId = currentItem.room_id;
            if (!accumulator[roomId]) {
                accumulator[roomId] = { [roomId]: [] };
            }
            accumulator[roomId][roomId].push({
                room_rate_plan_id: currentItem.room_rate_plan_id,
                room_id: roomId,
                meal_name: currentItem.meal_name,
                total_final_rate: currentItem.total_final_rate,
                total_tax_amount: currentItem.total_tax_amount,
                total_otherfees_amount: currentItem.total_otherfees_amount,
            });
            return accumulator;
        }, {}));
        console.log(result)
        return result;
    };

    // usage:
    const transformedData = transformData(sortedFinalRate);//rates only

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
        setDisplay(0)
        setShowModal(0)
        setSearched(false)
        dispatch(setAddMoreRoom(false))
        dispatch(clearRoomsSelected())
        dispatch(clearReservationIdentity())
        dispatch(clearInventoryDetail())
        deleteRoomDetails()
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
            dispatch(updateBookingInfo({ booking_id: null, property_id: null }))
            deleteRoomDetails()
        }
    }

    return (
        <div id="main-content" className={`${color?.bgColor} min-h-screen`}>
            {/* app bar */}
            <div className={`flex justify-between px-4 md:px-10 py-5 border-b  ${color?.border}`}>
                <h6 className={`${color?.text?.title}  text-xl my-auto flex leading-none font-bold`}>
                    Rooms For Booking
                </h6>
                <div className='my-auto'>
                    <div className='flex gap-10'>
                        {/* cart option */}
                        <i className='cursor-pointer'
                            data-testid='cart-icon'
                            onClick={() => {
                                if (cookie) {
                                    const user = JSON.parse(cookie);
                                    global.analytics.track("User clicked on cart", {
                                        action: "User clicked on cart",
                                        user: user.user,
                                        time: Date()
                                    });
                                }
                                if (roomsSelected.length === 0) {
                                    toast.error("APP: Cart is Empty.");
                                } else {
                                    setDisplay(2)
                                }
                            }}
                        > <AiOutlineShoppingCart color='#707f7e' size={20} />
                        </i>

                        {/* back option */}
                        <i className='cursor-pointer'
                            data-testid='back-icon'
                            onClick={() => {
                                if (cookie) {
                                    const user = JSON.parse(cookie);
                                    global.analytics.track("User went back to main website", {
                                        action: "User went back to main website",
                                        user: user.user,
                                        time: Date()
                                    });
                                }
                                closeButtonAction()
                            }
                            }>
                            <AiOutlineClose color='red' size={20} />
                        </i>
                    </div>
                </div>
            </div>

            {/* room cards */}
            <div className='px-4 md:px-10 pb-5'>
                {/* //add more rooms means already one room is selected */}
                <>{roomsLoader === true ? <><RoomLoader size={`w-full h-44  rounded-2xl p-4 mt-10 m-2 `} /> <RoomLoader size={`w-full h-44  rounded-2xl p-4 m-2 `} /> <RoomLoader size={`w-full h-44  rounded-2xl p-4 m-2 `} /></>
                    : <>
                        {uniqueRooms.map((room, index) => {
                            return <RoomCard
                                key={index}
                                color={color}
                                roomImage={`https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
                                filteredRoomData={rooms?.filter((item) => item.room_id == room.room_id)[0]} //only room data like physical aspects
                                roomRates={room}
                                setDisplay={(e) => setDisplay(e)}
                                checkinDate={checkinDate}
                                checkoutDate={checkoutDate}
                                property_id={allHotelDetails?.property_id}
                                rates={transformedData?.filter(item => Object.keys(item)[0] === room?.room_id)[0][room?.room_id]}
                                cookie={cookie}
                            />
                        })}
                    </>
                }</>
            </div>
        </div>
    )
}

export default RoomCalenderView