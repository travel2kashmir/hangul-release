import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../../components/loaders/darktableloader';
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import GenericTable from '../../../components/utils/Tables/GenericTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import LoaderTable from "../../../components/loadertable";
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Router from "next/router";
import BreadCrumb from '../../../components/utils/BreadCrumb';
import { navigationList,viewCurrentBookingDetails,fetchBooking } from '../../../components/Bookings';
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
        colorToggle = resp?.colorToggle
        if (JSON.stringify(currentLogged) === 'null') {
            Router.push(window.location.origin)
        }
        else {
            fetchBooking({currentProperty,setVisible,setGenericData,viewCurrentBookingDetails});
        }
    }, [])

   
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
                {visible === 0 && color.name==='light' && <LoaderTable />}
                {visible === 0 && color.name==='dark' && <LoaderDarkTable />}
                {visible === 1 && <GenericTable
                        color={color}
                        language={language}
                        addButton={false}
                        tableName={language?.bookings}
                        cols={["Guest Name", "Booking Date", "Transaction No.", "status", "Actions"]}
                        data={genericData}
                
                    />}
                
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

