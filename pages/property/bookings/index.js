import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../../components/loaders/darktableloader';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import colorFile from "../../../components/colors/Color";
import axios from "axios";
import Link from "next/link";
import GenericTable from '../../../components/utils/Tables/GenericTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import LoaderTable from "../../../components/loadertable";
import Headloader from "../../../components/loaders/headloader";
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Router from "next/router";
import BreadCrumb from '../../../components/utils/BreadCrumb';
var language;
var currentProperty;
var currentLogged;
let colorToggle;

function Bookings() {
    const [visible, setVisible] = useState(0)
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [genericData, setGenericData] = useState([])
    const [spinner, setSpinner] = useState(0)

    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        colorToggle = resp?.colorToggle;

        if (JSON.stringify(currentLogged) === 'null') {
            Router.push(window.location.origin)
        }
        else {
            fetchBooking();
        }
    }, [])

    /**Function to save Current property to be viewed to Local Storage**/
    const viewCurrentBookingDetails = (id) => {
        localStorage.setItem("BookingId", id);
        Router.push("./bookings/viewBooking");
    };

    const fetchBooking = async () => {
        try {
            var genData = [];
            const url = `/api/all_bookings/${currentProperty.property_id}`
            const response = await axios.get(url, { headers: { 'accept': 'application/json' } });

            // let response = {
            //     "bookings": [
            //         {
            //             "guest_name": "Sahil",
            //             "booking_from": "2023-11-24",
            //             "booking_to": "2023-11-25",
            //             "is_cancelled": false,
            //             "transaction_refrence_no": "tsxred123",
            //             "booking_id": "bk0090"

            //         },
            //         {
            //             "guest_name": "Ahmed",
            //             "booking_from": "2023-11-24",
            //             "booking_to": "2023-11-29",
            //             "is_cancelled": true,
            //             "transaction_refrence_no": "tsxred124",
            //             "booking_id": "bk0091"
            //         }
            //     ]
            // }

            setVisible(1)

            // response?.bookings?.map((item) => {
            response?.data?.map((item) => {
                var temp = {
                    // "checkbox": { operation: undefined },
                    "Guest Name": item.guest_name,
                    "Booking Date": `${item.booking_from} to ${item.booking_to}`,
                    "Transaction No.": item.transaction_id,
                    "status": item.transaction_id && JSON.stringify(!item.is_cancelled),
                    "id": item.booking_id,
                    
                    Actions: [
                        {
                            type: "button",
                            label: "View",
                            operation: (item) => { viewCurrentBookingDetails(item) }
                        }
                        
                    ],
                }
                genData.push(temp)
            })

            setGenericData(genData);

        }
        catch (error) {
            console.log("error in fetching the booking details for this property" + error)
        }
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
                text: "Bookings",
                link: ""
            }
        ])
    }

    return (
        <>
            <Title name={`Engage | Bookings`} />

            <Header
                color={color}
                setColor={setColor}
                Primary={english?.Side}
                Type={currentLogged?.user_type}
                Sec={ColorToggler}
                mode={mode}
                setMode={setMode} />

            <Sidebar
                color={color}
                Primary={english?.Side}
                Type={currentLogged?.user_type}
            />

            <div id="main-content"
                className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>

                {/* bread crumb */}
                <BreadCrumb
                    color={color}
                    crumbList={navigationList(currentLogged, currentProperty)}
                />

                {/* Booking Table */}
                <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
                <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
                <div className={visible === 1 ? 'block' : 'hidden'}>
                    {/* call to generic table  */}
                    <GenericTable
                        color={color}
                        language={language}
                        addButton={false}
                        tableName={language?.bookings}
                        // cols={["checkbox", "Guest Name", "Booking From", "Booking To", "Transaction No.", "status", "Actions"]}
                        cols={["Guest Name", "Booking Date", "Transaction No.", "status", "Actions"]}
                        data={genericData}
                    // deleteAll={() => { alert("feature not functional"); }}
                    />


                </div>

                {/* Toast Container */}
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
            {/* Modal Delete */}
            {/* <div className={deleteMultiple === 1 ? 'block' : 'hidden'}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                        <div className={`rounded-lg shadow relative ${color?.whitebackground}`}>
                            <div className="flex justify-end p-2">
                                <button
                                    onClick={() => setDeleteMultiple(0)}
                                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div className="p-6 pt-0 text-center">
                                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className={`text-base font-normal ${color?.deltext} mt-5 mb-6`}>
                                    {language?.areyousureyouwanttodelete}
                                </h3>

                                {spinner === 0 ?
                                    <>
                                        <Button Primary={language?.Delete} onClick={() => { confirmedDelete(deleteRoomId) }} />
                                        <Button Primary={language?.Cancel} onClick={() => { setDeleteRoomId(undefined); setDeleteMultiple(0) }} />
                                    </>
                                    :
                                    <Button Primary={language?.SpinnerDelete} />}

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}
export default Bookings
Bookings.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

