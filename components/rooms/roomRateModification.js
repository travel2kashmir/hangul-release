import React, { useEffect, useState } from 'react'
import { InitialActions, ColorToggler } from '../initalActions';
import Title from '../title';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { english, french, arabic } from "../Languages/Languages"
import Router from 'next/router';
import Link from "next/link";
import Headloader from '../loaders/headloader';
import Imageloader from '../loaders/imageloader';
import Lineloader from '../loaders/lineloader';
import InputText from '../utils/InputText';
import DateInput from "../utils/DateInput";
import DropDown from '../utils/DropDown';
import Button from '../Button';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import roomRateModificationValidation from '../validation/room/roomRateModificationValidation';

var language;
var currentProperty;
var currentroom;
const logger = require("../../services/logger");
var currentLogged;
var i = 0;
let colorToggle;


function RoomRateModification({ room_id }) {
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [property_name, setProperty_name] = useState('')
    const [visible, setVisible] = useState(0)
    const [error, setError] = useState([{}])
    // runs first in the code
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

    let modificationTemplate = {
        "room_id": '',
        "date_from": "",
        "date_to": "",
        "orginal_rate": "",
        "modified_rate": ""
    }
    const [modification, setModification] = useState([modificationTemplate]?.map((i, id) => { return { ...i, index: id } }))

    function addDiscountTemplate() {
        setModification([...modification, modificationTemplate]?.map((i, id) => { return { ...i, index: id } }))
    }
    function removeDiscountTemplate(index) {
        const filteredDiscount = modification.filter((i, id) => i.index !== index)
        setModification(filteredDiscount)
    }


    const onModificationChange = (e, index, i) => {
        setModification(modification?.map((item, id) => {
            if (item.index === index) {
                item[i] = e.target.value
            }
            return item
        }))
    }

    function addModification() {
        let result = roomRateModificationValidation(modification);
        if (result === true) {
            let url = '/api/room_rate_modification';
            axios.post(url, modification, { header: { "content-type": "application/json" } })
                .then((response) => {
                    console.log("Rate Modification Added")
                    toast.success("API: Modification Added Sucessfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    //   Router.push("./basicdetails");
                    document.getElementById('modificationForm').reset();

                }).catch((err) => {
                    toast.error("API: Failed to save modification", {
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

            <div id="main-content"
                className={`${color?.greybackground}`}>

                <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
                    <h3 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                        Rate Modification
                    </h3>
                    <form id='modificationForm'></form>
                    {modification?.map((disc, index) => {
                        return (<React.Fragment key={index}>
                            {index != 0 ? <div className='h-0.5 w-full bg-gray-200 border-none rounded-xl'></div> : <></>}
                            <div className=" md:px-2 mx-auto w-full">
                                {/* conditional rendering of cross button i.e if only 1 modification then no cross button */}
                                {modification.length != 1 ?
                                    <div className="flex justify-end">
                                        {/* cross button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeDiscountTemplate(index)
                                            }}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div> : <></>}


                                <div className="flex flex-wrap">
                                    {/* Date from */}
                                    <DateInput
                                        color={color}
                                        label={`From Date`}
                                        visible={1}
                                        onChangeAction={(e) => {
                                            onModificationChange(e, index, "date_from");
                                            let v = { "target": { "value": room_id } };
                                            onModificationChange(v, index, "room_id");

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
                                            onModificationChange(e, index, "date_to");
                                        }
                                        }
                                        req={true}
                                        error={error[index]?.date_to}
                                    />

                                    {/*Orginal Rate*/}
                                    <InputText
                                        label={`Orginal Rate`}
                                        visible={1}
                                        onChangeAction={(e) =>
                                            onModificationChange(e, index, "orginal_rate")
                                        }
                                        color={color}
                                        req={true}
                                        error={error[index]?.orginal_rate}
                                    />
                                    {/*Modified Rate*/}
                                    <InputText
                                        label={`Modified Rate`}
                                        visible={1}
                                        onChangeAction={(e) =>
                                            onModificationChange(e, index, "modified_rate")
                                        }
                                        color={color}
                                        req={true}
                                        error={error[index]?.modified_rate}
                                    />


                                </div>
                            </div>
                        </React.Fragment>)
                    })

                    }
                    <div className=' flex justify-end'>
                        <Button
                            Primary={language?.Submit}
                            onClick={() => addModification()}
                        />
                    </div>
                </div>

            </div>
            {/* Toast Container */}
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

export default RoomRateModification