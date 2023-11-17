import React, { useEffect, useState } from 'react'
import { InitialActions, ColorToggler } from '../../initalActions';
import Title from '../../title';
import Header from '../../Header';
import Footer from '../../Footer';
import Sidebar from '../../Sidebar';
import { english, french, arabic } from "../../Languages/Languages"
import Router from 'next/router';
import Link from "next/link";
import Headloader from '../../loaders/headloader';
import Imageloader from '../../loaders/imageloader';
import Lineloader from '../../loaders/lineloader';
import InputText from '../../utils/InputText';
import DateInput from "../../utils/DateInput";
import DropDown from '../../utils/DropDown';
import Button from '../../Button';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import roomDiscountValidation from '../../validation/room/roomDiscountValidation';
var language;
var currentProperty;
var currentroom;
const logger = require("../../../services/logger");
var currentLogged;
var i = 0;
let colorToggle;


function RoomDiscounts({ room_id }) {
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [property_name, setProperty_name] = useState('')
    const [visible, setVisible] = useState(0)
    const [error, setError] = useState([{}])
    let discountTemplate = {
        "room_id": "",
        "date_from": "",
        "date_to": "",
        "discount_type": "",
        "discount_on": "",
        "discount": ""
    }
    const [discount, setDiscount] = useState([discountTemplate]?.map((i, id) => { return { ...i, index: id } }))

    // runs at load time
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        currentroom = localStorage.getItem('RoomId');
        setProperty_name(resp?.currentProperty?.property_name);
        colorToggle = resp?.colorToggle
        setVisible(1);
    }, [])
    function addDiscountTemplate() {
        setDiscount([...discount, discountTemplate]?.map((i, id) => { return { ...i, index: id } }))
    }
    function removeDiscountTemplate(index) {
        const filteredDiscount = discount.filter((i, id) => i.index !== index)
        setDiscount(filteredDiscount)
    }


    const onDiscountChange = (e, index, i) => {
        setDiscount(discount?.map((item, id) => {
            if (item.index === index) {
                item[i] = e.target.value
            }
            return item
        }))
    }

    const addDiscount = () => {
        let result = roomDiscountValidation(discount)
        alert("result is" + JSON.stringify(result))
        if (result === true) {
            let url = '/api/room_discount';
            axios.post(url, discount, { header: { "content-type": "application/json" } })
                .then((response) => {
                    console.log("Discount Added")
                    toast.success("API: Discount Added Sucessfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    document.getElementById('discountForm').reset();

                }).catch((err) => {
                    toast.error("API: Failed to save discount", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
        else {
            setError(result)
        }

    }

    return (
        <>

            <div id="main-content">



                {/* page title */}
                {/* <div className='flex items-center justify-between'>
                    <h3 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2  font-bold`}>
                        {language?.room} Discount
                    </h3>

                    <Button
                        Primary={language?.Add}
                        onClick={() => addDiscountTemplate()}
                    />

                </div> */}

                <div className={`${color?.whitebackground} `}>
                    <h3 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                        Discount
                    </h3>
                    <form id='discountForm'>
                        {/* input forms start */}
                        {discount?.map((disc, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {index != 0 ? <div className='h-0.5 w-full bg-gray-200 border-none rounded-xl'></div> : <></>}

                                    <div className=" md:px-2 mx-auto w-full">

                                        {/* conditional rendering of cross button i.e if only 1 modification then no cross button */}
                                        {discount.length != 1 ?
                                            <div className="flex justify-end">
                                                {/* cross button */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        removeDiscountTemplate(index)
                                                    }}
                                                    className="flex text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto  items-center"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http:/www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                {/* cross button ends */}
                                            </div> : <></>}

                                        <div className="flex flex-wrap">
                                            {/* Date from */}
                                            <DateInput
                                                color={color}
                                                label={`From Date`}
                                                visible={1}
                                                onChangeAction={(e) => {
                                                    onDiscountChange(e, index, `date_from`);
                                                    let v = { "target": { "value": room_id } }
                                                    onDiscountChange(v, index, `room_id`)
                                                }
                                                }
                                                req={true}
                                                error={error[index]?.date_from}
                                            />

                                            {/* Date To */}
                                            <DateInput
                                                color={color}
                                                label={`Date To`}
                                                visible={1}
                                                onChangeAction={(e) => {
                                                    onDiscountChange(e, index, `date_to`)
                                                }
                                                }
                                                req={true}
                                                error={error[index]?.date_to}
                                            />

                                            {/* discount type */}
                                            <DropDown
                                                label={`Discount Type`}
                                                visible={1}
                                                defaultValue={``}
                                                onChangeAction={(e) =>
                                                    onDiscountChange(e, index, `discount_type`)
                                                }
                                                color={color}
                                                req={true}
                                                options={[
                                                    { value: "percentage", label: "percentage" },
                                                    { value: "flat", label: "flat" }
                                                ]}
                                                error={error[index]?.discount_type}
                                            />

                                            {/* discount on */}
                                            <DropDown
                                                label={`Discount On`}
                                                visible={1}
                                                defaultValue={``}
                                                onChangeAction={(e) =>
                                                    onDiscountChange(e, index, `discount_on`)
                                                }
                                                color={color}
                                                req={true}
                                                options={[
                                                    { value: "per stay", label: "per stay" },
                                                    { value: "per group", label: "per group" }
                                                ]}
                                                error={error[index]?.discount_on}
                                            />

                                            {/* Discount*/}
                                            <InputText
                                                label={`Discount`}
                                                visible={1}
                                                onChangeAction={(e) =>
                                                    onDiscountChange(e, index, `discount`)
                                                }
                                                color={color}
                                                req={true}
                                                error={error[index]?.discount}
                                            />

                                        </div>
                                    </div>
                                </React.Fragment>)
                        })}
                        {/* input form ends */}
                    </form>

                    {/* button starts */}
                    <div className='flex justify-end mr-2'>
                        <Button
                            Primary={language?.Submit}
                            onClick={() => { addDiscount() }}
                        />
                    </div>
                    {/* buttons end */}

                </div>

            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default RoomDiscounts