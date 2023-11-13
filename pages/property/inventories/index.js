import React, { useEffect, useState, useMemo } from "react";
import Router from 'next/router';
import axios from "axios";
import ButtonLoader from '../../../components/inventory/ButtonLoader'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InventoryModal from "../../../components/inventory/InventoryModal";
import Title from "../../../components/title";
import colorFile from "../../../components/colors/Color";
import LoaderDarkTable from "../../../components/loaders/darktableloader";
import Sidebar from "../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../../components/Header";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { english, french, arabic } from "../../../components/Languages/Languages";
var language;
var currentProperty;
var propertyName;
import Headloader from "../../../components/loaders/headloader";
import LoaderTable from "../../../components/loadertable";
const logger = require("../../../services/logger");
var currentLogged;
let colorToggle;

function Inventory() {
    const [gen, setGen] = useState([])
    const [error, setError] = useState({})
    const [color, setColor] = useState({})
    const [visible, setVisible] = useState(0)
    const [mode, setMode] = useState()
    const [view, setView] = useState(0);
    const [inventories, setInventories] = useState([]);
    const [editInventory, setEditInventory] = useState({})
    const [edit, setEdit] = useState({
        'value': 0,
        'idx': undefined
    })
    const [deleteInventory, setDeleteInventory] = useState({
        'value': 0,
        'idx': undefined
    })
    // loaders
    const [saveLoader, setSaveLoader] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    // state for pagination
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect(() => {
        firstfun();
    }, [])

    useEffect(() => {
        if (JSON.stringify(currentLogged) === 'null') {
            Router.push(window.location.origin)
        }
        else {
            fetchHotelDetails();
        }
    }, []);

    const firstfun = () => {
        if (typeof window !== 'undefined') {
            var locale = localStorage.getItem("Language");
            colorToggle = localStorage.getItem("colorToggle");
            if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
                window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light);
                setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
            }
            else if (colorToggle === "true" || colorToggle === "false") {
                setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
                setMode(colorToggle === "true" ? true : false)
            }
            if (locale === "ar") {
                language = arabic;
            }
            if (locale === "en") {
                language = english;
            }
            if (locale === "fr") {
                language = french;
            }
            /** Current Property Details fetched from the local storage **/
            currentProperty = JSON.parse(localStorage.getItem("property"));
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        }
    }

    const colorToggler = (newColor) => {
        if (newColor === 'system') {
            window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
                : setColor(colorFile?.light)
            localStorage.setItem("colorToggle", newColor)
        }
        else if (newColor === 'light') {
            setColor(colorFile?.light)
            localStorage.setItem("colorToggle", false)
        }
        else if (newColor === 'dark') {
            setColor(colorFile?.dark)
            localStorage.setItem("colorToggle", true)
        }
        firstfun();
        Router.push(window.location.href)
    }

    // Fetch Hotel Details
    const fetchHotelDetails = async () => {
        const url = `/api/inventory/${currentProperty.property_id}`;
        axios.get(url)
            .then((response) => {
                if (response.data.length > 0) {
                    setInventories(response.data)
                } else {
                    setInventories([])
                }
                setVisible(1);
            })
            .catch((error) => {
                logger.error("url to fetch property details, failed")
            });


    }

    function searchFunction() {
        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
            td = tr[i];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return inventories.slice(start, start + itemsPerPage);
    }, [page, inventories, itemsPerPage]);


    function ItemShow(event) {
        setItemsPerPage(event.target.value);
    }

    function updateInventory(inventorydata) {
        let url = `/api/inventory`
        axios.put(url, inventorydata,
            {
                header: { "content-type": "application/json" }
            }
        ).then((response) => {
            console.log(response.data);
            fetchHotelDetails();
            setSaveLoader(false)
            // Reset the editInventory state after the update
            setEditInventory({});
            setEdit({
                value: 0,
                idx: undefined
            })
            toast.success('Inventory updated successfully')

        }).catch((err) => {
            console.log(err)
            setSaveLoader(false)
            // Reset the editInventory state after the update
            setEditInventory({});
            setEdit({
                value: 0,
                idx: undefined
            })
            toast.error('Not Able to update the inventory at the moment.')

        })
    }

    function deleteInventoryFromDB(room_id) {
        let url = `/api/inventory/${room_id}`
        axios.delete(url, room_id).then((response) => {
            fetchHotelDetails()
            setDeleteLoader(false)
            toast.success('Inventory has been deleted')
            setDeleteInventory({
                'value': 0,
                'idx': undefined
            })

        }).catch((err) => {
            console.log(err)
            setDeleteLoader(false)
        })
    }

    return (
        <>
            <Title name={`Engage |  ${language?.inventory}`} />

            <Header
                color={color}
                Primary={english?.SideInventory}
                Type={currentLogged?.user_type}
                Sec={colorToggler}
                mode={mode}
                setMode={setMode}

            />

            <Sidebar
                color={color}
                Primary={english?.SideInventory}
                Type={currentLogged?.user_type}

            />

            <div
                id="main-content"
                className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>
                {/* bread crumb */}
                <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/adminlanding" : "./landing"}
                                    className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                                </Link></div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.text} text-base font-medium capitalize  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                                    <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="./propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                                        <a>{currentProperty?.property_name}</a>
                                    </Link>
                                    </div></div>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.inventory}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Header */}
                <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
                <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
                <div className={visible === 1 ? 'block' : 'hidden'}>
                    <div className="mx-4">
                        <h1 className={`text-xl sm:text-2xl font-semibold ${color?.text}`}>{"Inventory"}</h1>
                        <div className="sm:flex">
                            <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                                {/* search form */}
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">{'search'} Search</label>
                                    <div className="mt-1 relative lg:w-64 xl:w-96">
                                        <input type="text" name="email" id="myInput" onKeyUp={searchFunction}
                                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder={'Search'}>
                                        </input>
                                    </div>
                                </form>
                                {/* search form end */}
                                {/* icons start */}
                                {/* <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                    </span>

                                    <button onClick={() => alert('allDelete')} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </button>



                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </span>
                                    <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                    </span>
                                </div> */}
                                {/* icons end*/}
                            </div>

                            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                                <button
                                    className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                    onClick={() => {
                                        setView(1)
                                    }}
                                >
                                    {'Add'}</button>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="flex  flex-col mt-8 lg:-mr-20 sm:mr-0 w-full ">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden">
                                <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                                    <thead className={` ${color?.tableheader} `}>
                                        <tr>
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Room Name"}</th>
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Start Date"}</th>
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"End Date"}</th>
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"inventory Available"}</th>
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Action"}
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody className={` ${color?.whitebackground} divide-y divide-gray-200 `} id="TableList" >
                                        {displayData.map((inv, index) => (
                                            <>
                                                {
                                                    edit.value === 1 && edit.idx === index ?
                                                        //After Edit Clicked
                                                        <>
                                                            <tr className={`${color?.hover}`}>
                                                                {/* first col when editing starts */}
                                                                <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>
                                                                    {inv.room_name}
                                                                </td>

                                                                <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>
                                                                    {/* <input type="text"
                                                                        onChange={(e) => {
                                                                            setEditInventory({
                                                                                ...editInventory,
                                                                                'start_date': e.target.value
                                                                            })
                                                                        }}
                                                                        className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                        defaultValue={inv.start_date}>
                                                                    </input> */}

                                                                    <ReactDatePicker
                                                                        selected={new Date(editInventory.start_date || inv.start_date)}
                                                                        minDate={new Date()}

                                                                        onChange={(date) => {
                                                                            const formattedDate = date.toISOString().substring(0, 10);

                                                                            setEditInventory({
                                                                                ...editInventory,
                                                                                'start_date': formattedDate
                                                                            })
                                                                        }}
                                                                        className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                    />


                                                                </td>

                                                                <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>
                                                                    {/* <input type="text"
                                                                        onChange={(e) => {
                                                                            setEditInventory({
                                                                                ...editInventory,
                                                                                'end_date': e.target.value
                                                                            })
                                                                        }}
                                                                        className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                        defaultValue={inv.end_date}>
                                                                    </input> */}
                                                                    <ReactDatePicker
                                                                        selected={new Date(editInventory.end_date || inv.end_date)}
                                                                        onChange={(date) => {
                                                                            const formattedDate = date.toISOString().substring(0, 10);
                                                                            setEditInventory({
                                                                                ...editInventory,
                                                                                'end_date': formattedDate
                                                                            });
                                                                        }}
                                                                        minDate={new Date(editInventory.start_date || inv.start_date)}
                                                                        className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                    />
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>
                                                                    <input type="text"
                                                                        onChange={(e) => {
                                                                            setEditInventory({
                                                                                ...editInventory,
                                                                                'inventory_count': e.target.value
                                                                            })
                                                                        }} className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                        defaultValue={inv.inventory_count}>
                                                                    </input>
                                                                </td>
                                                                <td className="py-4 whitespace-nowrap capitalize">
                                                                    {saveLoader === true ?
                                                                        <ButtonLoader
                                                                            classes="bg-gradient-to-r bg-green-600 hover:bg-green-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                            text="Save"
                                                                        /> :
                                                                        <>
                                                                            <button
                                                                                disabled={Object.keys(editInventory).length === 0}
                                                                                className="bg-gradient-to-r bg-green-600 hover:bg-green-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                onClick={() => {
                                                                                    setSaveLoader(true)

                                                                                    updateInventory({ "inventory": [{ ...editInventory, "room_id": inv.room_id }] })
                                                                                }}
                                                                            >{'Save'}
                                                                            </button>
                                                                        </>
                                                                    }

                                                                    <button
                                                                        className="ml-5 bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                        onClick={() => {
                                                                            setEdit({
                                                                                'value': 0,
                                                                                'idx': undefined
                                                                            })
                                                                        }}
                                                                    >{'Cancel'} </button>
                                                                </td>
                                                            </tr>
                                                        </>

                                                        : <>
                                                            {/* before editiing */}
                                                            <tr key={index} >
                                                                <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                    {inv.room_name}
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                    {inv.start_date}
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                    {inv.end_date}
                                                                </td>
                                                                <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                    {inv.inventory_count}
                                                                </td>

                                                                {deleteInventory.value === 1 && deleteInventory.idx === index ?
                                                                    <td className="py-4 whitespace-nowrap capitalize">
                                                                        <button
                                                                            className="bg-gradient-to-r bg-green-600 hover:bg-green-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                            onClick={() => {
                                                                                setDeleteInventory({
                                                                                    'value': 0,
                                                                                    'idx': undefined
                                                                                })
                                                                            }}
                                                                        >{'Cancel'} </button>
                                                                        {deleteLoader === true ?
                                                                            <ButtonLoader
                                                                                classes="ml-5 bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                text="Yes, I Confirm"
                                                                            />
                                                                            : <button
                                                                                className="ml-5 bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                onClick={() => {
                                                                                    setDeleteLoader(true)
                                                                                    deleteInventoryFromDB(inv.room_id)

                                                                                }}
                                                                            >{'Yes, I Confirm'} </button>
                                                                        }

                                                                    </td>
                                                                    : <td className="py-4 whitespace-nowrap capitalize">
                                                                        <button
                                                                            className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                            onClick={() => {
                                                                                setEdit({
                                                                                    'value': 1,
                                                                                    'idx': index
                                                                                })
                                                                            }}
                                                                        >{'Edit'} </button>
                                                                        <button
                                                                            className="ml-5 bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                            onClick={() => {
                                                                                setDeleteInventory({
                                                                                    'value': 1,
                                                                                    'idx': index
                                                                                })
                                                                            }}
                                                                        >{'Delete'} </button>
                                                                    </td>}

                                                            </tr>
                                                        </>
                                                }
                                            </>
                                        )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className={`${color?.whitebackground} sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4`}>
                    <div className="flex items-center w-64 mb-4 sm:mb-0">
                        {/* previous page arrow button*/}
                        <button onClick={() => {
                            if (page > 1) {
                                setPage(page - 1);
                            }
                        }} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </button>

                        {/* next page arrow button */}
                        <button onClick={() => {
                            if (page < Math.ceil(inventories?.length / itemsPerPage)) {
                                setPage(page + 1);
                            }
                        }} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center mr-2`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </button>

                        <span className={`text-sm font-normal ${color?.textgray}`}>{language?.common?.Showing}

                            <span className={`${color?.text} font-semibold ml-1`}>{page}</span> {language?.common?.Of} <span className={`${color?.text} font-semibold`}>
                                {Math.ceil(inventories?.length / itemsPerPage)}
                            </span>
                        </span>

                    </div>

                    <div className="flex items-center w-42 space-x-3">
                        <span className={`text-sm font-normal ${color?.textgray}`}>Entries per page</span>
                        <select onChange={(e) => ItemShow(e)} className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block mr-2 w-12 px-3  py-1`}>
                            <option selected disabled>{itemsPerPage}</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>

                    </div>
                </div>

                {/* Modal Add */}
                <div className={view === 1 ? "block" : "hidden"}>
                    {/* <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full"> */}
                    <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center  sm:h-full">
                        {/* <div className="relative w-full max-w-2xl px-4 h-full md:h-auto"> */}
                        <div className="relative w-full px-4 md:w-3/5 h-full md:h-auto ">
                            <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                                <div className="flex items-start justify-between p-5 border-b rounded-t">
                                    {/* <h3 className={`${color?.text} text-xl font-semibold`}>{language?.add} {language?.new} {language?.contact}</h3> */}
                                    <h3 className={`${color?.text} text-xl font-semibold`}>{'Add New Inventory'}</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            fetchHotelDetails()
                                            setError({})
                                            setView(0);
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
                                </div>


                                <InventoryModal
                                    view={view}
                                    setView={(e) => setView(e)}
                                    error={error}
                                    setError={(e) => setError(e)}
                                    color={color}
                                    language={language}
                                    setInventories={(e) => { setInventories(e) }}
                                />

                            </div>

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

            </div>

        </>


    );
}

export default Inventory
Inventory.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

