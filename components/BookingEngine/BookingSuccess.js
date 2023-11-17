import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearRoomsSelected, clearReservationIdentity, setAddMoreRoom, clearGuestDetails, clearInventoryDetail } from '../redux/hangulSlice';

function BookingSuccess({ setDisplay, setShowModal, setSearched, rooms, checkinDate, checkoutDate }) {

    let dispatch = useDispatch();

    const guestdetails = useSelector(state => state.guestDetails)
    // console.log("guest details stored in redux state", guestdetails)

    const roomsSelected = useSelector(state => new Set(state.roomsSelected))
    // console.log("this is roomSelected set using redux", roomsSelected)

    // Create an array of rooms that match the room_ids in roomsSelected
    const selectedRoomsArray = rooms.filter((room) => roomsSelected.has(room.room_id));
    // console.log("Selected rooms:", selectedRoomsArray);


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

    return (
        <section className=''>
            {/* app bar */}
            {/* <div className='pt-3'>
                <div className='flex justify-end'>
                    <i className='cursor-pointer my-auto mr-5'
                        onClick={() => {
                            setDisplay(0)
                            setShowModal(0)
                            setSearched(false)
                            dispatch(setAddMoreRoom(false))
                            dispatch(clearRoomsSelected())
                            deleteRoomDetails()
                        }}>
                        <AiOutlineClose color='red' size={20} /> </i>
                </div>
            </div> */}

            <div className='h-screen flex'>
                <div className='my-auto text-left w-7/12 lg:w-6/12'>
                    <div className='pl-8 md:pl-20  lg:pl-32 lg:pr-10 '>
                        <div>
                            <h2 className=' text-3xl md:text-5xl lg:text-5xl text-cyan-700'> BOOKING SUCCESSFULL</h2>
                            <p className='pt-8 md:text-lg lg:text-lg'>The hotel booking has been successfully completed for :</p>
                            <div className='pt-5 capitalize font-medium text-lg'>
                                {guestdetails.length > 1 ? <p>{guestdetails[0]?.guest_name + " +" + (guestdetails.length - 1)}</p> : <p>{guestdetails[0]?.guest_name}</p>}
                            </div>
                            <div className='pt-2'>
                                <p>{selectedRoomsArray?.map((room, index) => {
                                    return <p key={index} className=' font-medium text-slate-400'>{room?.room_name}</p>
                                })}</p>
                            </div>
                            <div className='flex pt-5'>
                                <div className='pr-10 md:pr-20'>
                                    <p className='text-xs md:text-base'> Check-In date</p>
                                    <p className='font-medium  md:text-lg'>{checkinDate}</p>
                                </div>
                                <div>
                                    <p className='text-xs md:text-base'> Check-Out date</p>
                                    <p className='font-medium md:text-lg'>{checkoutDate}</p>
                                </div>

                            </div>

                            <div className='pt-10'>
                                <button
                                    onClick={() => {
                                        setDisplay(0)
                                        setShowModal(0)
                                        setSearched(false)
                                        dispatch(setAddMoreRoom(false))
                                        dispatch(clearRoomsSelected())
                                        dispatch(clearReservationIdentity())
                                        dispatch(clearInventoryDetail())
                                        dispatch(clearGuestDetails())
                                        deleteRoomDetails()
                                    }}
                                    className='bg-blue-600 py-3 px-2 text-white rounded-lg'> Go to Home</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-auto w-5/12 lg:w-6/12'>
                    <img src='/payment_done.png' className='h-36 md:h-72 lg:h-96 mx-auto'></img>
                </div>
            </div>
        </section>
    )
}

export default BookingSuccess