import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRoomsSelected, setReserveRoom, setReservationIdentity, addInventoryDetail } from '../redux/hangulSlice';
import axios from 'axios';
import formatDateToCustomFormat from '../generalUtility/timeStampMaker'
import ButtonLoader from './ButtonLoader';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomCard({ color, filteredRoomData, roomImage, setDisplay, checkinDate, checkoutDate, property_id, rates }) {

  const dispatch = useDispatch();

  const inventoryDetail = useSelector(state => state.inventoryDetail)

  const [invData, setInvData] = useState([]);


  const [roomRates, setRoomRates] = useState(rates[0])
  const [searchInventory, setSearchInventory] = useState(false)
  const [searchBookingInventory, setSearchBookingInventory] = useState(false)

  // loader
  const [inventoryCheckDone, setInventoryCheckDone] = useState(false)

  const startDate = new Date(checkinDate); // Booking start date
  const endDate = new Date(checkoutDate); // Booking end date

  // Calculate the number of days for the booking
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const numberOfDays = Math.round((endDate - startDate) / oneDay) + 1; // Add 1 to include the start date

  function redirectToRoom(room_data, room_rates) {
    localStorage.setItem('room_data', JSON.stringify(room_data))
    localStorage.setItem('temp_room_rate', JSON.stringify(room_rates))
    setDisplay(1)
  }

  function redirectToReviewPage(room_data, room_rates) {

    localStorage.setItem('room_data', JSON.stringify(room_data))

    // Get the existing 'room_rate' from local storage
    let existingData = localStorage.getItem('room_rates');

    // Check if there is existing data in local storage
    if (existingData) {
      // Parse the existing data from JSON
      existingData = JSON.parse(existingData);

      // Append the new data to the existing data (assuming 'room_id' is unique)
      existingData[room_rates.room_id] = room_rates;

    } else {
      // If there is no existing data, create a new object with the new data
      existingData = {
        [room_rates.room_id]: room_rates
      };
    }

    // console.log("this is existing data", existingData)

    // Store the updated data back in local storage
    localStorage.setItem('room_rates', JSON.stringify(existingData));
    dispatch(setRoomsSelected([{ "room_id": room_rates?.room_id, "meal_name": room_rates?.meal_name || 'Room Only - RO' }]));
  //  if meal name is null it puts room only by default 
    setDisplay(2)

  }

  // get inventory details for the rooms between the checkin and checkout date
  // function getInventoryDetail(actionFrom) {
  //   let roomID = roomRates?.room_id;
  //   let url = `/api/inv_data/${roomID}/${checkinDate}/${checkoutDate}`;
  //   axios.get(url).then((response) => {
  //     // setting value to inventory detail using redux reducer function
  //     dispatch(addInventoryDetail(response.data))

  //     setSearchInventory(false)
  //     setSearchBookingInventory(false)

  //     console.log("inventory data loaded successfully")

  //     if (actionFrom === "bookNow") {
  //       // redirections to review page
  //       toCheckInventoryAvailable()
  //     } else {    //if action is learn more redirection to room details
  //       redirectToRoom(filteredRoomData, roomRates)
  //     }

  //   }).catch((err) => {
  //     console.log("error in loading inventory data", err)
  //     setSearchInventory(false)
  //     setSearchBookingInventory(false)

  //     toast.error(`API: Inventory for the ${filteredRoomData?.room_name} is not registered`);
  //   })
  // }


  function toCheckInventoryAvailable() {
    let roomAvailable = true;

    for (const room of inventoryDetail) {
      if (room.available_inventory === 0) {
        roomAvailable = false;
        break;
      }
    }
    if (roomAvailable) {
      let reservationIdentity = {
        room_id: roomRates?.room_id,
        reservation_time: formatDateToCustomFormat(new Date())
      }
      redirectToReviewPage(filteredRoomData, roomRates)
      dispatch(setReserveRoom(true))
      dispatch(setReservationIdentity([reservationIdentity]))

    } else {
      toast.error(`APP: Inventory for ${filteredRoomData?.room_name} not available for the selected days`);
    }
  }


  // ----------------------------------------------------------

  useEffect(() => {
    getInventoryDetails()
  }, [])

  function getInventoryDetails() {
    let url = `/api/inv_data/${property_id}/${checkinDate}/${checkoutDate}`
    axios.get(url).then((response) => {
      setInvData(response.data)
      setInventoryCheckDone(true)
    }).catch((err) => {
      console.log(JSON.stringify(err))
    })
  }
  // Initialize sets for non-zero and zero inventory
  invData.map((i) => console.log(i))
  const { nonZeroInventory, zeroInventory } = invData.reduce(
    (acc, item) => {
      // Check if available_inventory is not equal to 0
      // Use ternary operator to conditionally select the set
      (item.available_inventory !== 0 ? acc.nonZeroInventory : acc.zeroInventory).add(item.room_id);
      return acc;
    },
    { nonZeroInventory: new Set(), zeroInventory: new Set() }
  );

  // Iterate through invData to remove room_ids with available_inventory equal to 0 from nonZeroInventory
  invData.forEach(item => item.available_inventory === 0 && nonZeroInventory.delete(item.room_id));



  return (
    <div className={`w-100 h-1/4 text-black ${color?.cardColor} rounded-xl p-4 mx-2 my-4 lg:m-4 flex flex-wrap justify-center items-center md:flex-row flex-col transition-transform transform hover:scale-105 shadow-lg`}>

      {/* room image */}
      <div className='md:w-1/6'>
        <img
          className='md:h-36 md:w-36 lg:h-44 lg:w-44 w-fit'
          src={roomImage}
          alt="room-image"
        />
      </div>

      {/* room name and description */}
      <div className='md:w-4/6 md:text-start w-fit md:px-5 lg:px-3'>
        <h3 className={`${color?.text?.title} font-bold text-2xl my-5 md:my-1`}>
          {filteredRoomData?.room_name}
        </h3>
        <p className='text-base text-slate-500 font-normal'>
          {filteredRoomData?.room_description}
        </p>
        <hr className="my-4 w-full border-t border-gray-300" />
        {rates.length > 1 &&
          <><h3 className={`${color?.text?.title} font-bold text-xl my-5 md:my-1`}>
            Available Options
          </h3>
            <p className='flex  items-center flex-wrap text-base text-slate-500 font-normal'>
              {rates.map((i) => <button key={i.meal_name}
                className={` ${roomRates.meal_name === i.meal_name ? 'bg-cyan-700' : 'bg-gray-400'} text-white text-sm my-1 mx-0.5 border-none p-1  rounded-md`}
                onClick={() => setRoomRates(i)}>
                {i.meal_name}
              </button>)}
            </p></>}
      </div>

      {/* additional information */}
      <div className='flex flex-col items-center justify-center w-fit lg:w-1/6 md:w-1/6'>

        {inventoryCheckDone === false ? (
          <div className='h-28 w-36 bg-gray-400 animate-pulse opacity-10 rounded inline-block'></div>
        ) : (
          <div className='py-4 md:py-2'>
            {![...nonZeroInventory].includes(roomRates.room_id) ? (
              <div className='bg-red-700 px-4 py-2 rounded-lg text-white'>
                <h3 className='text-lg font-semibold'>
                  Not available!
                </h3>
                <p className='text-xs py-1'>Will be available soon!</p>
              </div>
            ) : (
              <div>
                <h3 className={` ${color?.text?.title} text-3xl font-bold text-center`}>
                  ₹ {roomRates.total_final_rate || roomRates}
                </h3>
                <p className={`${color?.text?.title} text-xs py-1 text-center`}>
                  + tax For {numberOfDays} Day{numberOfDays === 1 ? '' : 's'}
                </p>
              </div>
            )}
          </div>
        )}


        {[...nonZeroInventory].includes(roomRates.room_id) && (
          <><button
            className='px-5 py-3 mb-2 text-base md:text-sm md:mb-0 md:px-3 md:py-2 rounded-md bg-green-700 hover:bg-green-900 text-white font-bold'
            onClick={() => {
              dispatch(addInventoryDetail(invData.filter(i => i.room_id === filteredRoomData.room_id)))
              // setSearchBookingInventory(true);
              // getInventoryDetail("bookNow");
              // toCheckInventoryAvailable()
              let reservationIdentity = {
                room_id: roomRates?.room_id,
                reservation_time: formatDateToCustomFormat(new Date())
              }
              redirectToReviewPage(filteredRoomData, roomRates)
              // dispatch(setReserveRoom(true))
              // dispatch(setReservationIdentity([reservationIdentity]))

            }}
          >
            Book Now
          </button>
            <button
              style={{ fontSize: "11px" }}
              className='mt-2 px-3 py-2 md:px-2 md:py-1 rounded-md bg-cyan-700 hover:bg-cyan-900 text-white'
              onClick={() => {
                setSearchInventory(true);
                dispatch(addInventoryDetail(invData.filter(i => i.room_id === filteredRoomData.room_id)))
                redirectToRoom(filteredRoomData, roomRates)

              }}
            >
              Learn More
            </button>

          </>
        )}
      </div>

      {/* Separator */}
      {/* <hr className="my-4 w-full border-t border-gray-300" /> */}
    </div>



  )
}

export default RoomCard