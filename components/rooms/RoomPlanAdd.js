import React, { useEffect, useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import DropDown from '../utils/DropDown';
import InputTextBox from '../utils/InputTextBox';

function RoomPlanAdd({ roomData, color, language, fetchDetails, setRoomRateEditModal,currentroom }) {
    const [mealPlans, setMealPlans] = useState({})
    const [dropDownOptions, setDropDownOptions] = useState([])
    const [loader, setLoader] = useState(0)

    const [error, setError] = useState({})
    const [mutationFlag, setMutationFlag] = useState(false)
    const [showEditSpinner, setShowEditSpinner] = useState(false)
    useEffect(() => {
        let url = `/api/all_meals`
        axios.get(url).then((response) => {
            console.log(response.data)
            setDropDownOptions(response.data.map(i => { return ({ value: JSON.stringify(i), label: i.name }) }))
            setLoader(1);
        }).catch((error) => {
            toast.error("API:Meal plan fetch failed!")
        })
    }, [])
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

    const sendNewRate = () => {
        setShowEditSpinner(true)
        let result = validateEditedRate(mealPlans);
        if (result === true) {
            let url = '/api/room_rate_plan';
            let data = {
                "room_rate_plan": [
                    {
                        "room_id":currentroom,
                        "meal_plan_id":mealPlans.meal_plan_id,
                        "price":mealPlans.price
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
        }
    }

    const onDropDownChange = (data) => {
        setMealPlans(JSON.parse(data));
    }
    return (<>
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
                defaultValue={roomData?.price}
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