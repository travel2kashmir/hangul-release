import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../../components/loaders/darktableloader';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import axios from "axios";
import GenericTable from '../../../components/utils/Tables/GenericTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import LoaderTable from "../../../components/loadertable";
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Router from "next/router";
import BreadCrumb from '../../../components/utils/BreadCrumb';
var language;
var currentProperty;
var currentLogged;
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

