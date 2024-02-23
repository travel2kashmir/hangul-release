import React, { useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function RoomEdit({ roomData, color, language, fetchDetails, setRoomRateEditModal }) {
    const [editedRoomPrice, setEditedRoomPrice] = useState({})
    const [error, setError] = useState({})
    const [mutationFlag, setMutationFlag] = useState(false)
    const [showEditSpinner, setShowEditSpinner] = useState(false)
    const validateEditedRate = (newEditedRoomPrice) => {
        const { price,tax,other_charges } = newEditedRoomPrice;
        let flag = false;
        let errorFound = {}
        if (isNaN(price)) {
            flag = true;
            errorFound.price = "Rate should be number";
        }
        if (price <= 0) {
            flag = true
            errorFound.price = "Rate should be greater than zero";
        }
        if(isNaN(tax) || tax<0){
            flag = true
            errorFound.tax = "Tax amount should be valid positive integer";
        }
        if(isNaN(other_charges) || other_charges<0){
            flag = true
            errorFound.other_charges = "Other charges amount should be valid positive integer";
        }
        return flag === true ? errorFound : true
    }

    const sendRateUpdate = () => {
        setShowEditSpinner(true)
        let result = validateEditedRate({...roomData,...editedRoomPrice});
        if (result === true) {
            let url = '/api/room_rate_plan';
            let data = {
                "room_rate_plan": [
                    {
                        "room_rate_plan_id": roomData?.room_rate_plan_id,
                        "price": editedRoomPrice.price,
                        "extra_adult_price":editedRoomPrice.extra_adult_price,
                        "extra_child_price":editedRoomPrice.extra_child_price,
                        "tax":editedRoomPrice.tax,
                        "other_charges":editedRoomPrice.other_charges
                    }
                ]
            }
            axios.put(url, data, { "header": { "content-type": "application/json" } })
                .then((resp) => {
                    toast.success("API: Rate edit sucess");
                    setShowEditSpinner(false)
                    fetchDetails();
                    setError({})
                    setRoomRateEditModal(0)
                })
                .catch((err) =>{setShowEditSpinner(false); toast.error('Update Error')} )
        }
        else {
            setError(result)
            setShowEditSpinner(false)
        }
    }
    return (<>
        <div className='flex flex-wrap'>

            {/* meal name  */}
            <InputText
                label={"Meal Name"}
                visible={1}
                defaultValue={roomData.meal_name}
                onChangeAction={undefined}
                error={error?.meal_name}
                color={color}
                req={true}
                disabled={true}
            />
            {/* meal price  */}
            <InputText
                label={"Price"}
                visible={1}
                defaultValue={roomData.price}
                onChangeAction={(e) => {
                    setEditedRoomPrice({ ...editedRoomPrice, "price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.price}
                color={color}
                req={true}
                tooltip={true}
                title={'New price for the meal plan'}
            />

             {/* tax price  */}
             <InputText
                label={"Tax"}
                visible={1}
                defaultValue={roomData.tax}
                onChangeAction={(e) => {
                    setEditedRoomPrice({ ...editedRoomPrice, "tax": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.tax}
                color={color}
                req={true}
                tooltip={true}
                title={'Edit tax rates'}
            />

            {/* other charges  */}
            <InputText
                label={"Other Charges"}
                visible={1}
                defaultValue={roomData.other_charges}
                onChangeAction={(e) => {
                    setEditedRoomPrice({ ...editedRoomPrice, "other_charges": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.other_charges}
                color={color}
                req={true}
                tooltip={true}
                title={'Other charges rates'}
            />


            {/* extra adult price  */}
            <InputText
                label={"Extra Adult Price"}
                visible={1}
                defaultValue={roomData.extra_adult_price}
                onChangeAction={(e) => {
                    setEditedRoomPrice({ ...editedRoomPrice, "extra_adult_price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.extra_adult_price}
                color={color}
                req={true}
                tooltip={true}
                title={'New extra adult price for the meal plan'}
            />
            {/* extra child price  */}
            <InputText
                label={"Extra Child Price"}
                visible={1}
                defaultValue={roomData.extra_child_price}
                onChangeAction={(e) => {
                    setEditedRoomPrice({ ...editedRoomPrice, "extra_child_price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.extra_child_price}
                color={color}
                req={true}
                tooltip={true}
                title={'New extra child price for the meal plan'}
            />
        </div>
        <div className='flex justify-end'>
            {mutationFlag === false ?
                <Button
                    testid="test_button_disabled"
                    Primary={language?.UpdateDisabled}
                /> : undefined}
            {showEditSpinner === false && mutationFlag === true ?
                <Button
                    testid="edit_button"
                    Primary={language?.Update}
                    onClick={sendRateUpdate}
                /> : undefined}
            {showEditSpinner === true && mutationFlag === true ?
                <Button
                    testid="test_button_spinner"
                    Primary={language?.SpinnerUpdate}
                />
                : undefined}
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

export default RoomEdit