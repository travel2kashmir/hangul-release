import React, { useEffect, useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import DropDown from '../utils/DropDown';
import InputTextBox from '../utils/InputTextBox';
import CountdownTimer from '../BookingEngine/CountDownTimer';

function RoomPlanAdd({ color, language, fetchDetails, setRoomRateEditModal, currentroom, presentPlans }) {
    const [mealPlans, setMealPlans] = useState({})
    const [dropDownOptions, setDropDownOptions] = useState([{}])
    const [loader, setLoader] = useState(0)
    const [error, setError] = useState({})
    const [mutationFlag, setMutationFlag] = useState(false)
    const [showEditSpinner, setShowEditSpinner] = useState(false)
    useEffect(() => {
        let url = `/api/all_meals`
        axios.get(url).then((response) => {
            console.log(response.data)
            setDropDownOptions(response.data.filter(plan => !presentPlans.includes(plan.meal_plan_id)).map(i => { return ({ value: JSON.stringify(i), label: i.name }) }))
            setLoader(1);
        }).catch((error) => {
            toast.error("API:Meal plan fetch failed!")
        })
    }, [])
    const validateEditedRate = (editedRoomPrice) => {
        const { price,tax,other_charges,extra_adult_price,extra_child_price } = editedRoomPrice;
        let flag = false;
        let errorFound = {}
        if (isNaN(price)) {
            flag = true;
            errorFound.price = "APP: Rate should be number";
        }
        if (price <= 0) {
            flag = true
            errorFound.price = "APP: Rate should be greater than zero";
        }
        if(isNaN(tax) || tax<=0){
            flag = true
            errorFound.tax = "APP: Tax should be valid positive number";
        }
        if(isNaN(other_charges) || other_charges<0){
            flag = true
            errorFound.other_charges = "APP: Other Charges should be valid positive number";
        }
        if(!isNaN(extra_adult_price) && parseFloat(extra_adult_price)<0){
            flag = true
            errorFound.extra_adult_price = "APP: Extra adult price should be valid positive number";
        }
        alert(typeof extra_child_price)
        if(!isNaN(extra_child_price) && parseFloat(extra_child_price)<0){
            flag = true
            errorFound.extra_child_price = "APP: Extra child charges should be valid positive number";
        }
        return flag === true ? errorFound : true
    }

    const sendNewRate = () => {
        setShowEditSpinner(true)
        let result = validateEditedRate(mealPlans);
        alert(JSON.stringify(result))
        if (result === true) {
            let url = '/api/room_rate_plan';
            let data = {
                "room_rate_plan": [
                    {
                        "room_id": currentroom,
                        "meal_plan_id": mealPlans.meal_plan_id,
                        "price": mealPlans.price,
                        "extra_adult_price": mealPlans.extra_adult_price,
                        "extra_child_price": mealPlans.extra_child_price,
                        "other_charges":mealPlans.other_charges,
                        "tax":mealPlans.tax
                    }
                ]
            }
            axios.post(url, data, { "header": { "content-type": "application/json" } })
                .then((resp) => {
                    toast.success("API: Rate add sucess");
                    setShowEditSpinner(false)
                    fetchDetails();
                    setError({})
                    setRoomRateEditModal(0)
                })
                .catch((err) => { setShowEditSpinner(false); toast.error('Update Error') })
        }
        else {
            setError(result)
            setShowEditSpinner(false)
        }
    }

    const onDropDownChange = (data) => {
        setMealPlans(JSON.parse(data));
    }
    return (<>{dropDownOptions.length != 0 ? <>
        <div className='flex flex-wrap'>
            {/*  meal name  */}
            <DropDown
                label={'Meal Name'}
                visible={loader}
                defaultValue={'Select plan'}
                onChangeAction={(e) => onDropDownChange(e.target.value)}
                color={color}
                req={true}
                options={dropDownOptions}
                error={error?.meal_name}
                title={"select rate plan to be implemented"}
                tooltip={true}
            />
                {/* meal description auto filled  */}
            <InputTextBox
                label={"Meal Description"}
                visible={loader}
                defaultValue={mealPlans.description}
                onChangeAction={undefined}
                error={error?.meal_name}
                color={color}
                req={true}
                disabled={true}
                wordLimit={100}
            />
            {/* meal price  */}
            <InputText
                label={"Price"}
                visible={loader}
                onChangeAction={(e) => {
                    setMealPlans({ ...mealPlans, "price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.price}
                color={color}
                req={true}
                tooltip={true}
                title={'New price for the meal plan'}
            />
            {/* meal tax */}
            <InputText
                label={"Tax Amount"}
                visible={loader}
                onChangeAction={(e) => {
                    setMealPlans({ ...mealPlans, "tax": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.tax}
                color={color}
                req={true}
                tooltip={true}
                title={'Tax amount to be charged'}
            />
            {/* othercharges */}
            <InputText
                label={"Other Charges"}
                visible={loader}
                onChangeAction={(e) => {
                    setMealPlans({ ...mealPlans, "other_charges": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.other_charges}
                color={color}
                req={true}
                tooltip={true}
                title={'Other Charges'}
            />
            {/* extra adult price  */}
            <InputText
                label={"Extra Adult Price"}
                visible={1}
                onChangeAction={(e) => {
                    setMealPlans({ ...mealPlans, "extra_adult_price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.extra_adult_price}
                color={color}
                req={false}
                tooltip={true}
                title={'New extra adult price for the meal plan'}
            />
            {/* extra child price  */}
            <InputText
                label={"Extra Child Price"}
                visible={1}
                onChangeAction={(e) => {
                    setMealPlans({ ...mealPlans, "extra_child_price": e.target.value });
                    setMutationFlag(true)
                }}
                error={error?.extra_child_price}
                color={color}
                req={false}
                tooltip={true}
                title={'New extra child price for the meal plan'}
            />
        </div>
        <div className='flex justify-end'>
            {mutationFlag === false ?
                <Button
                    testid="test_button_disabled"
                    Primary={language?.AddDisabled}
                /> : undefined}
            {showEditSpinner === false && mutationFlag === true ?
                <Button
                    testid="edit_button"
                    Primary={language?.Add}
                    onClick={sendNewRate}
                /> : undefined}
            {showEditSpinner === true && mutationFlag === true ?
                <Button
                    testid="test_button_spinner"
                    Primary={language?.SpinnerAdd}
                />
                : undefined}
        </div></> : <div className='text-lg p-2 font-bold'>
        All Plans Already Selected
        <div className='flex flex-wrap justify-center items-center w-full'>
            <CountdownTimer time={5} onTimerComplete={(e) => setRoomRateEditModal(0)} Text={'Redirecting in'} unit={'second'} />
        </div>

    </div>
    }


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