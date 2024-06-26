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

var currentLogged;
var i = 0;
let colorToggle;


function RoomDiscounts({ room_id,meal,dateSelected,setModalVisible,initialData }) {
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [property_name, setProperty_name] = useState('')
    const [visible, setVisible] = useState(0)
    const [error, setError] = useState([{}])
    let discountTemplate = {
        "room_id": room_id,
        "date_from": dateSelected,
        "date_to": dateSelected,
        "discount_type": "",
        "discount_on": "",
        "discount": "",
        "room_rate_plan_id":meal?.room_rate_plan_id
    }
    // const [discount, setDiscount] = useState([discountTemplate]?.map((i, id) => { return { ...i, index: id } }))
    const [discount, setDiscount] = useState([ { ...discountTemplate, index: 0 } ])
    // whenever meal is changed this useEffect will kick in to change value of room_rate_plan_id in template
    
    useEffect(()=>{
        setDiscount(prev=>prev.map((i)=>({...i,"room_rate_plan_id":meal?.room_rate_plan_id})))
    },[meal])
    
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
                    initialData();
                    setTimeout(()=>setModalVisible(false),1000) 
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
                    <div className={`${color?.whitebackground} border-b rounded-lg`}>
                    <h3 className={`${color?.text} text-xl flex leading-none pl-6  pb-2 pt-6  font-bold`}>
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
                                         
                                             {/* Meal Name*/}
                                             <InputText
                                                label={`Meal Name`}
                                                defaultValue={meal?.meal_name}
                                                visible={1}
                                                color={color}
                                                disabled={true}
                                                req={false}
                                                error={error[index]?.discount}
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
                    <div className='flex justify-end mr-6 py-2'>
                        <button
                            className='bg-gradient-to-r text-white bg-cyan-700 sm:inline-flex focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2 text-center items-center mb-1 ease-linear transition-all duration-150'
                            onClick={() => { addDiscount() }}
                        >
                            Submit
                        </button>
                        {/* <Button
                            Primary={language?.Submit}
                            onClick={() => { addDiscount() }}
                        /> */}
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