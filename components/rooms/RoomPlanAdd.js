import React, { useEffect, useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import DropDown from '../utils/DropDown';

function RoomPlanAdd({ roomData, color, language, fetchDetails, setRoomRateEditModal }) {
    const [editedRoomPrice, setEditedRoomPrice] = useState({})
    const [mealPlans, setMealPlans] = useState({})
    const [loader, setLoader] = useState(1)

    const [error, setError] = useState({})
    const [mutationFlag, setMutationFlag] = useState(false)
    const [showEditSpinner, setShowEditSpinner] = useState(false)
    useEffect(()=>{
        let url=`/api/all_meals`
        axios.get(url).then((response)=>{
            setMealPlans(response.data);
            setLoader(0);
        }).catch((error)=>{
            toast.error("API:Meal plan fetch failed!")
        })
    },[])
    const validateEditedRate = (editedRoomPrice) => {
        const { price } = editedRoomPrice;
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
        return flag === true ? errorFound : true
    }

    const sendRateUpdate = () => {
        setShowEditSpinner(true)
        let result = validateEditedRate(editedRoomPrice);
        if (result === true) {
            let url = '/api/room_rate_plan';
            let data = {
                "room_rate_plan": [
                    {
                        "room_rate_plan_id": roomData?.room_rate_plan_id,
                        "price": editedRoomPrice.price
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
        }
    }
    return (<>
        <div className='flex flex-wrap'>
            {/* meal name  */}
             <DropDown
             label={'Meal Name'}
             visible={loader}
             defaultValue={'Select plan'}
             onChangeAction={(e)=>alert(JSON.stringify(e))}
             color={color}
             req={true}
             options = {[]}
             error={error}
             title={"select rate plan to be implemented"}
             tooltip={true}
            /> 
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
                    setEditedRoomPrice({ ...roomData, "price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.price}
                color={color}
                req={true}
                tooltip={true}
                title={'New price for the meal plan'}
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

export default RoomPlanAdd