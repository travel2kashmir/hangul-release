import React from 'react'
import axios from 'axios'
import Invoice from './Invoice'
import { PDFViewer } from '@react-pdf/renderer'
import invoice from './Invoice/data/invoice'
import { AiOutlineClose } from "react-icons/ai";
// useDispatch is used to store the data in the store of the redux, while useSelector is used to get the data from the store.
import { useDispatch, useSelector } from 'react-redux';
// reducer functions are being imported from the redux
import { clearRoomsSelected, setAddMoreRoom, clearReservationIdentity, clearInventoryDetail, clearGuestDetails } from '../redux/hangulSlice'



function InvoicePdfViewer({ setDisplay, setShowModal, setSearched }) {

    const reservationIdentity = useSelector(state => state.reservationIdentity)
    const dispatch = useDispatch() //creating object of dispatch 

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
        <div className='bg-black h-screen'>
            {/* back option */}
            <i className='cursor-pointer flex justify-end mr-10 pt-5'
                onClick={closeButtonAction}>
                <AiOutlineClose color='red' size={20} />
            </i>

            <PDFViewer width="900" height={"650"} className="mx-auto" >
                <Invoice
                    invoice={invoice}
                    setDisplay={(e) => setDisplay(e)}
                />
            </PDFViewer>
        </div>
    )
}

export default InvoicePdfViewer