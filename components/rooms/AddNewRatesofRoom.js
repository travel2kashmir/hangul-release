import React, { useEffect, useState } from 'react'
import WidgetStatus from '../widgetStatus'
import Button from '../Button'
import DropDown from '../utils/DropDown'
import InputTextBox from '../utils/InputTextBox'
import InputText from '../utils/InputText'
import axios from 'axios'
import Cross from '../utils/Icons/Cross'
import validateRatePlans from '../validation/room/validateRatePlans'
import { ToastContainer, toast } from 'react-toastify'
import Router from 'next/router'

function AddNewRatesofRoom({ color, language, roomId }) {
    let rateTemplate = {
        "room_id": roomId,
        "meal_plan_id": "",
        "price": "",
        "tax":"",
        "other_charges":"",
        "extra_adult_price":"",
        "extra_child_price":"",
        "index": ""
    }
    const [idx, setIdx] = useState(1);
    const [rates, setRates] = useState([{ ...rateTemplate, "index": 0 }])
    const [error, setError] = useState({})
    const [dropDownOptions, setDropDownOptions] = useState([])
    const [loader, setLoader] = useState(0)
    const [mutationFlag, setMutationFlag] = useState(false)
    const [spinner, setSpinner] = useState(0)


    useEffect(() => {
        let url = `/api/all_meals`
        axios.get(url).then((response) => {
            setDropDownOptions(response.data.map(i => { return ({ value: JSON.stringify(i), label: i.name }) }))
            setLoader(1);
        }).catch((error) => {
            toast.error("API:Meal plan fetch failed!")
        })
    }, [])

    // function to remove template in UI
    function removeRate(index) {
        let notRemoved = rates.filter(i => i.index != index);
        setRates(notRemoved)
    }

    // function to add template in UI 
    function addTemplate() {
        setRates([...rates, { ...rateTemplate, index: idx }])
        setIdx(idx + 1);
    }

    // generic function to put data into rate states 
    function onChangeData(data, index, field) {
        setRates((prevRates) => {
            return prevRates.map((item) => {
                if (item.index === index) {
                    // Create a new object with the updated field
                    return { ...item, [field]: data };
                } else {
                    return item;
                }
            });
        });
    }

    function validationRates() {
        setSpinner(1)
        let result = validateRatePlans(rates)
        if (result === true) {
            let data = { "room_rate_plans": rates };
            console.log(data)
            let url = '/api/room_rate_plan'
            axios.post(url, data, { "headers": { "content-type": "application/json" } })
                .then((resp) => {
                    console.log(resp.data)
                    toast.success("API: Rates saved sucessfully");
                    Router.push(`${window.location.protocol}//${window.location.host}/property/rooms`)
                    setSpinner(0);
                })
                .catch((err) => {
                    console.log(err.message)
                    toast.error("API:Error in adding rates")
                    setSpinner(0)
                })
        }
        else {
            setSpinner(0);
            console.log(result)
            setError(result);
        }
    }
    return (
        <div className={`${color?.whitebackground} mt-4 shadow rounded-lg p-4 sm:p-6 xl:p-8`}>
            {/* widget start  */}
            <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={4} color={color} />
            {/* widget end  */}

            <h6 className={`${color?.text} text-base  flex leading-none  pt-2 font-semibold`}>
                <div className='flex justify-end items-center w-full'> <Button Primary={language?.Add} onClick={() => addTemplate()} /></div>
            </h6>
            <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                    {rates.map((i, index) =>
                        <React.Fragment key={i.index}>
                            {index != 0 ? <div className={`${color.crossbg} flex justify-end items-center w-full`} onClick={() => removeRate(i.index)}>
                                <Cross />
                            </div> : undefined}

                            <div key={i.index} className="flex flex-wrap my-4 border border-gray-200 rounded-lg p-4 shadow-sm">
                                {/*  meal name  */}
                                <DropDown
                                    label={'Meal Name'}
                                    visible={loader}
                                    defaultValue={'Select plan'}
                                    onChangeAction={(e) => {
                                        setMutationFlag(true)
                                        onChangeData(JSON.parse(e.target.value)?.meal_plan_id, i.index, "meal_plan_id")
                                        onChangeData(JSON.parse(e.target.value)?.description, i.index, "meal_description")
                                    }}
                                    color={color}
                                    req={true}
                                    options={dropDownOptions}
                                    error={error[index]?.meal_plan_id}
                                    title={"select rate plan to be implemented"}
                                    tooltip={true}
                                />

                                <InputTextBox
                                    label={"Meal Description"}
                                    visible={loader}
                                    defaultValue={i?.meal_description}
                                    onChangeAction={undefined}
                                    error={error[index]?.meal_description}
                                    color={color}
                                    req={true}
                                    disabled={true}
                                    wordLimit={100}
                                />
                                {/* meal price  */}
                                <InputText
                                    label={"Price"}
                                    visible={loader}
                                    defaultValue={''}
                                    onChangeAction={(e) => {
                                        setMutationFlag(true)
                                        onChangeData(e.target.value, i.index, "price")
                                    }}
                                    error={error[index]?.price}
                                    color={color}
                                    req={true}
                                    tooltip={true}
                                    title={'New price for the meal plan'}
                                />
                                {/* tax price  */}
                                <InputText
                                    label={"Tax"}
                                    visible={loader}
                                    defaultValue={''}
                                    onChangeAction={(e) => {
                                        setMutationFlag(true)
                                        onChangeData(e.target.value, i.index, "tax")
                                    }}
                                    error={error[index]?.tax}
                                    color={color}
                                    req={true}
                                    tooltip={true}
                                    title={'Enter calculated tax'}
                                />
                                {/* other price  */}
                                <InputText
                                    label={"Other Charges"}
                                    visible={loader}
                                    defaultValue={''}
                                    onChangeAction={(e) => {
                                        setMutationFlag(true)
                                        onChangeData(e.target.value, i.index, "other_charges")
                                    }}
                                    error={error[index]?.other_charges}
                                    color={color}
                                    req={true}
                                    tooltip={true}
                                    title={'Enter calculated tax'}
                                />
                                {/* extra adult price  */}
                                <InputText
                                    label={"Extra Adult Price"}
                                    visible={loader}
                                    defaultValue={''}
                                    onChangeAction={(e) => {
                                        setMutationFlag(true)
                                        onChangeData(e.target.value, i.index, "extra_adult_price")
                                    }}
                                    error={error[index]?.extra_adult_price}
                                    color={color}
                                    req={true}
                                    tooltip={true}
                                    title={'Extra adult price for the meal plan'}
                                />
                                {/* extra_child_price  */}
                                <InputText
                                    label={"Extra Child Price"}
                                    visible={loader}
                                    defaultValue={''}
                                    onChangeAction={(e) => {
                                        setMutationFlag(true)
                                        onChangeData(e.target.value, i.index, "extra_child_price")
                                    }}
                                    error={error[index]?.extra_child_price}
                                    color={color}
                                    req={true}
                                    tooltip={true}
                                    title={'extra child price for the meal plan'}
                                />


                            </div>
                        </React.Fragment>
                    )}

                    <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                        {mutationFlag === false && <Button Primary={language?.SubmitDisabled} />}
                        {(spinner === 0 && mutationFlag === true) ? <Button Primary={language?.Submit} onClick={validationRates} /> : undefined}
                        {spinner === 1 && <Button Primary={language?.Spinnersubmit} />}

                    </div>
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
        </div>
    )
}

export default AddNewRatesofRoom