import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearRoomsSelected, setAddMoreRoom, clearGuestDetails, clearReservationIdentity, clearInventoryDetail } from '../redux/hangulSlice'

function BookingModal({ title, bookingComponent, setShowModal, setDisplay, setSearched }) {

    const dispatch = useDispatch();
    const reservationIdentity = useSelector(state => state.reservationIdentity)

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
            // once the reservations are removed from DB then these functions will take place 
            setShowModal(0)
            setDisplay(0)
            setSearched(false)
            dispatch(setAddMoreRoom(false))
            dispatch(clearRoomsSelected())
            dispatch(clearGuestDetails())
            dispatch(clearReservationIdentity())
            dispatch(clearInventoryDetail())
            deleteRoomDetails()

        }).catch((err) => {
            console.log("API: Error in deleting reservation from DB", err)
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
        <div className=" overflow-y-scroll overflow-x-hidden fixed top-0 left-0 right-0 backdrop-blur-3xl  bg-white h-screen z-50 ">
            <div className="relative w-full max-w-full px-0">
                <div className='bg-white rounded shadow relative'>

                    <p className='text-sm text-slate-500'>
                        {bookingComponent}
                    </p>

                    {/* <div className=" p-5">
                        <button
                            className="text-white bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0"
                            onClick={closeButtonAction}
                        >
                            Close
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default BookingModal