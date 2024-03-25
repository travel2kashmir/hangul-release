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
import Headloader from "../../../components/loaders/headloader";
import LoaderTable from "../../../components/loadertable";
import { InitialActions, ColorToggler } from "../../../components/initalActions";
import BreadCrumb from "../../../components/utils/BreadCrumb";
import Multiselect from 'multiselect-react-dropdown';
import validateUnavailability from "../../../components/validation/room/roomUnavailability";
import Capsule from "../../../components/utils/Capsule";

var currentLogged;
let colorToggle;
var language;
var currentProperty;
var propertyName;

function Unavailability() {
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
    const [roomRef, setRoomRef] = useState([]);

    const [roomReferences, setRoomRefrences] = useState([])
    const [roomSubTypes, setRoomSubTypes] = useState([])
    const [roomCodes, setRoomCodes] = useState([{ "refrence_id": undefined }])
    const [modifiedOutOfService, setModifiedOutOfService] = useState([])

    // runs at load time
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        colorToggle = resp?.colorToggle

        if (JSON.stringify(currentLogged) === 'null') {
            Router.push(window.location.origin)
        }
        else {
            fetchHotelDetails();
        }
    }, [])


    // Fetch Hotel Details
    const fetchHotelDetails = async () => {
        const url = `/api/unavailability/${currentProperty.property_id}`;
        axios.get(url)
            .then((response) => {
                setVisible(1);
                if (response.data.room_unavailability.length > 0) {
                    setInventories(response.data.room_unavailability)

                } else {
                    setInventories([])
                }

            })
            .catch((error) => {
                console.log("url to fetch property details, failed")
            });

        const urlRef = `/api/out_of_service_rooms_refs/${currentProperty.property_id}`;
        axios.get(urlRef)
            .then((response) => {
                // setVisible(1);

                const result = {};

                response.data.forEach(item => {
                    const { room_id, unavailability_id, refrence_id } = item;

                    const key = `${room_id}-${unavailability_id}`;

                    if (result[key]) {
                        result[key].push(refrence_id);
                    } else {
                        result[key] = [refrence_id];
                    }
                });

                // Convert result to an array of objects
                const finalResult = Object.keys(result).map(key => {
                    const [room_id, unavailability_id] = key.split("-");
                    return { room_id, unavailability_id, refrence_ids: result[key] };
                });
                setRoomRef(finalResult)
            })
            .catch((error) => {
                console.log("url to fetch property details, failed")
            });

        // to fetch all room_refrecnes
        axios.get(`/api/all_room_refrences/${currentProperty?.property_id}`)
            .then((response) => {
                setRoomRefrences(response.data);
                setVisible(1);
            })
            .catch((error) => {
                console.log("url to fetch property details, failed")
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

    function updateUnavailability(data) {
        let url = `/api/unavailability`
        axios.put(url, data,
            {
                header: { "content-type": "application/json" }
            }
        ).then((response) => {
            fetchHotelDetails();
            setSaveLoader(false)
            // Reset the editInventory state after the update
            setEditInventory({});
            setEdit({
                value: 0,
                idx: undefined
            })
            toast.success('API:Unavailability updated successfully')

        }).catch((err) => {
            setSaveLoader(false)
            // Reset the editInventory state after the update
            setEditInventory({});
            setEdit({
                value: 0,
                idx: undefined
            })
            toast.error('API: Not Able to update the inventory at the moment.')

        })
    }

    function deleteUnavailabilityFromDB(unavailablity_id) {
        let url = `/api/unavailability/${unavailablity_id}`
        axios.delete(url).then((response) => {
            fetchHotelDetails()
            setDeleteLoader(false)
            toast.success('API: Unavailablity has been deleted')
            setDeleteInventory({
                'value': 0,
                'idx': undefined
            })

        }).catch((err) => {
            toast.error(err)
            setDeleteLoader(false)
        })
    }

    function navigationList(currentLogged, currentProperty) {
        return ([
            {
                icon: "homeIcon",
                text: "Home",
                link: currentLogged?.id.match(/admin.[0-9]*/)
                    ? "../admin/adminlanding"
                    : "./landing"
            },
            {
                icon: "rightArrowIcon",
                text: [currentProperty?.property_name],
                link: "./propertysummary"
            },
            {
                icon: "rightArrowIcon",
                text: language?.outofservice,
                link: ""
            }
        ])
    }

    // to be invoked whenever edit button is clicked
    function findAllRefs(inv) {
        let data = roomReferences.filter(i => i.room_id === inv.room_id)
        setRoomSubTypes(data)
    }
    //   edit out of servie 

    function modifyOutOfService(selectedList, removedItem) {
        let modifyList = selectedList.map((i) => ({ "room_references": i.room_references }))
        setModifiedOutOfService(modifyList)
    }
    function updateRoomSubTypeLink(unavailability_id) {
        let data = modifiedOutOfService.map((i) => ({ ...i, "unavailability_id": unavailability_id }))
        let url = "/api/room_sub_type_link";
        axios.put(url, {
            "unavailablity": data
        }, { header: { 'content-type': 'application/json' } }).then((response) => {
            toast.success("API: Room Sub Type Edited Sucessfully!");
            fetchHotelDetails();
        }).catch((error) => {
            toast.error("API: Update Failed !")
        })
    }

    // console.log(JSON.stringify(displayData))

    function updateEditedInv(inv) {
        if (modifiedOutOfService.length != 0) {
            let result = validateUnavailability({ ...inv, ...editInventory, "room_id": inv.room_id, "unavailability_id": inv.unavailability_id }, modifiedOutOfService);
            if (result === true) {
                updateUnavailability({ "unavailablity": [{ ...editInventory, "room_id": inv.room_id, "unavailability_id": inv.unavailability_id }] })
                updateRoomSubTypeLink(inv.unavailability_id)
                setSaveLoader(true)
            }
            else {
                Object.entries(result).forEach(([key, message]) => {
                    toast.error(`APP: ${key.replace("_", " ")}: ${message}`);
                });

                setSaveLoader(false);
            }
        }
        else {
            let result = validateUnavailability({ ...inv, ...editInventory, "room_id": inv.room_id, "unavailability_id": inv.unavailability_id }, roomRef.filter(i => i.unavailability_id === inv.unavailability_id).map(i => i.refrence_ids).flat());
            if (result === true) {
                updateUnavailability({ "unavailablity": [{ ...editInventory, "room_id": inv.room_id, "unavailability_id": inv.unavailability_id }] })
                setSaveLoader(true)
            }
            else {
                Object.entries(result).forEach(([key, message]) => {
                    toast.error(`APP: ${key.replace("_", " ")}: ${message}`);
                });
                setSaveLoader(false);
            }
        }
    }
    return (
        <>
            <Title name={`Engage |  ${language?.outofservice}`} />

            <Header
                color={color}
                setColor={setColor}
                Primary={english?.SideInventory}
                Type={currentLogged?.user_type}
                Sec={ColorToggler}
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
                <BreadCrumb
                    color={color}
                    crumbList={navigationList(currentLogged, currentProperty)}
                />

                {/* Header */}
                <div className={(visible === 0 && mode == false ? 'block' : 'hidden')}><LoaderTable /></div>
                <div className={(visible === 0 && mode == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
                <div className={visible === 1 ? 'block' : 'hidden'}>
                    <div className="mx-4">
                        <h1 className={`text-xl sm:text-2xl font-semibold ${color?.text}`}>{language?.outofservice}</h1>
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

                    <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full ">
                        <div className="overflow-x-auto">
                            <div className="align-middle inline-block min-w-full">
                                <div className="shadow overflow-hidden">
                                    <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                                        <thead className={` ${color?.tableheader} `}>
                                            <tr>
                                                <th scope="col"
                                                    className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Room Name"}</th>
                                                <th scope="col"
                                                    className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Out Of Service Rooms"}</th>
                                                <th scope="col"
                                                    className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Start Date"}</th>
                                                <th scope="col"
                                                    className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"End Date"}</th>
                                                <th scope="col"
                                                    className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Inventory Out Of Service"}</th>
                                                <th scope="col"
                                                    className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Out Of Service Reason"}</th>

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

                                                                    <td className={`p-4 whitespace-nowrap text-base font-normal ${color?.text}`}>
                                                                        <Multiselect
                                                                            className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full`}
                                                                            isObject={true}
                                                                            options={roomSubTypes}
                                                                            // onRemove={(selectedList, removedItem) => { alert(selectedList, removedItem) }}
                                                                            // onSelect={(selectedList, selectedItem) => { alert(selectedList, selectedItem) }}
                                                                            onRemove={(selectedList, removedItem) => { modifyOutOfService(selectedList, removedItem) }}
                                                                            onSelect={(selectedList, selectedItem) => { modifyOutOfService(selectedList, selectedItem) }}
                                                                            selectedValues={roomRef.filter(i => i.unavailability_id === inv.unavailability_id)[0].refrence_ids.map((element, id) => ({ "room_references": element }))}
                                                                            displayValue={"room_references"}
                                                                            style={{
                                                                                chips: {
                                                                                    background: '#0891b2',
                                                                                    'font-size': '0.875 rem'
                                                                                },
                                                                                searchBox: {
                                                                                    border: 'none',
                                                                                    'border-bottom': 'none',
                                                                                    'border-radius': '0px'
                                                                                }
                                                                            }}
                                                                        />
                                                                    </td>

                                                                    <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>
                                                                        <ReactDatePicker
                                                                            selected={new Date(editInventory.date_from || inv.date_from)}
                                                                            minDate={new Date()}
                                                                            onChange={(date) => {
                                                                                const formattedDate = date.toISOString().substring(0, 10);
                                                                                setEditInventory({
                                                                                    ...editInventory,
                                                                                    'date_from': formattedDate
                                                                                })
                                                                            }}
                                                                            className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                        />
                                                                    </td>

                                                                    <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>

                                                                        <ReactDatePicker
                                                                            selected={new Date(editInventory.date_to || inv.date_to)}
                                                                            onChange={(date) => {
                                                                                const formattedDate = date.toISOString().substring(0, 10);
                                                                                setEditInventory({
                                                                                    ...editInventory,
                                                                                    'date_to': formattedDate
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
                                                                                    'unavailability_count': e.target.value
                                                                                })
                                                                            }} className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                            defaultValue={inv.unavailability_count}>
                                                                        </input>
                                                                    </td>

                                                                    <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}>
                                                                        <input type="text"
                                                                            onChange={(e) => {
                                                                                setEditInventory({
                                                                                    ...editInventory,
                                                                                    'reason': e.target.value
                                                                                })
                                                                            }} className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-32 p-2.5`}
                                                                            defaultValue={inv.reason}>
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
                                                                                    disabled={Object.keys(editInventory).length === 0 && Object.keys(modifiedOutOfService).length === 0}
                                                                                    className="bg-gradient-to-r bg-green-600 hover:bg-green-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                    onClick={() => { updateEditedInv(inv); }}
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

                                                                    <td className={`p-4 whitespace-nowrap  text-base font-normal ${color?.text}`}>
                                                                        {roomRef.filter(i => i.unavailability_id === inv.unavailability_id)[0].refrence_ids.map((element, id) => <span key={id} className="text-white bg-cyan-600 border-none rounded-full py-1 px-2 mx-1 ">{element}</span>)}
                                                                    </td>
                                                                    <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                        {inv.date_from}
                                                                    </td>
                                                                    <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                        {inv.date_to}
                                                                    </td>
                                                                    <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                        {inv.unavailability_count}
                                                                    </td>
                                                                    <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                                                                        {inv.reason}
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
                                                                                        deleteUnavailabilityFromDB(inv.unavailability_id)

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
                                                                                    findAllRefs(inv);
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
            </div>

            {/* Modal Add */}
            {view === 1 ?
                <>
                    {/* <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full"> */}
                    <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center  sm:h-full">
                        {/* <div className="relative w-full max-w-2xl px-4 h-full md:h-auto"> */}
                        <div className="relative w-full px-4 md:w-3/5 h-full md:h-auto ">
                            <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                                <div className="flex items-start justify-between p-5 border-b rounded-t">
                                    <h3 className={`${color?.text} text-xl font-semibold capitalize`}>{`${language?.add} ${language?.new} ${language?.outofservice}`}</h3>
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
                                    fetchHotelDetails={fetchHotelDetails}
                                />

                            </div>

                        </div>
                    </div>
                </>
                : <></>}




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


    );
}

export default Unavailability
Unavailability.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

