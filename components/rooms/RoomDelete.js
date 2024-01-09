import React, { useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function RoomDelete({ roomData, color, language, fetchDetails, setShowModal }) {
   
    const deleteRatePlan = () => {
        let url = `/api/room_rate_plan/${roomData.room_rate_plan_id}`;
            
            axios.delete(url, { "header": { "content-type": "application/json" } })
                .then((resp) => {
                    toast.success("API: Rate Delete Sucess");
                    fetchDetails();
                    setShowModal(0)
                })
                .catch((err) => { toast.error('API: Delete Error') })
        }
        
    
    return (<>
        <div className={`flex flex-wrap ${color.whiteBackground} ${color?.text} text-md font-semibold items-center`}>
            <div>Are you sure you want to delete {roomData?.meal_name} for Price of {roomData?.price}</div>
            <div className='flex flex-wrap w-full my-2 justify-end'>
                <Button Primary={language?.Delete} onClick={() => deleteRatePlan()} />
                <Button Primary={language?.Cancel} onClick={() => setShowModal(0)} />
            </div>
        </div>

        <ToastContainer position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />

    </>
    )
}

export default RoomDelete