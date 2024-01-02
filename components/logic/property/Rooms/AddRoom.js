import axios from "axios";
import validateRoom from '../../../validation/room/roomdescriptionadd';
import validateBedData from '../../../validation/room/roombedadd';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Room Types
export const fetchRoomtypes = async (setRoomtypes, setVisible) => {
    const url = `/api/room-types`
    axios.get(url)
        .then((response) => {
            setRoomtypes(response.data);
            console.log("url  to fetch roomtypes hitted successfully")
            setVisible(1)
        })
        .catch((error) => { console.log("url to fetch roomtypes, failed") });
}

// Room Services
export const fetchServices = async (setServices) => {
    const url = `/api/all_room_services`
    axios.get(url)
        .then((response) => {
            setServices(response.data);
            console.log("url  to fetch roomtypes hitted successfully")
        })
        .catch((error) => { console.log("url to fetch roomtypes, failed") });
}

/**  Submit Function for Room Description **/
export function submitRoomDescription(setError, allRoomDes, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp) {
    setError({});
    if (allRoomDes.length !== 0) {
        setSpinner(1)
        const finalData = { ...allRoomDes, status: true, property_id: currentProperty?.property_id }
        axios.post('/api/room', JSON.stringify(finalData), { headers: { 'content-type': 'application/json' } })
            .then(response => {
                setSpinner(0);
                toast.success("API: Room created successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setRoomId(response.data.room_id)
                if (allRoomDes?.room_type_id === 'rt001' || allRoomDes?.room_type_id === 'rt002' || allRoomDes?.room_type_id === 'rt003'
                    || allRoomDes?.room_type_id === 'rt004' || allRoomDes?.room_type_id === 'rt005') {
                    submitBed(response.data.room_id)
                }
                submitView(response.data.room_id)
                submitInventory(response.data.room_id)
                manageIdentifiers(response.data.room_id, allRoomDes?.room_type_id)
                setAllRoomDes([]);
                setDisp(2);
                setError({});
            })
            .catch(error => {
                setSpinner(0);
                toast.error("API: Room Description Error! ", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            )
    }
    else {
        toast.error("App: Please fill the room details ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

// Validate Room Description
export const validationRoomDescription = (allRoomDes, finalView, roomIdentifiers, setDisp, setError, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes) => {
    var result = validateRoom(allRoomDes, finalView, roomIdentifiers?.split(","))
    if (result === true) {
        if (allRoomDes?.room_type_id === 'rt001' || allRoomDes?.room_type_id === 'rt002' || allRoomDes?.room_type_id === 'rt003' || allRoomDes?.room_type_id === 'rt004'
            || allRoomDes?.room_type_id === 'rt005') {
            setDisp(1);
            setError({});
        }
        else {
            submitRoomDescription(setError, allRoomDes, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp);
        }
    }
    else {
        setError(result)
    }
}

// Validate Beds Data
export const validationBedData = (BedData, setError, allRoomDes, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp) => {
    var result = validateBedData(BedData)
    if (result === true) {
        submitRoomDescription(setError, allRoomDes, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp);
    }
    else {
        setError(result)
    }
}

/*Function to add room service*/
export const submitServices = (setSpinner, services, roomId, setDisp) => {
    setSpinner(1);
    services.map(
        (i) => (i.room_id = roomId, i.status = i.service_value)
    )
    services.map(
        (i) => {
            if (JSON.stringify(i.service_value) !== "true") {
                return (

                    i.service_value = false,
                    i.status = false
                )
            }
        }
    )
    var total = { "room_services": services }
    const url = '/api/room_facilities'
    axios.post(url, total, { header: { "content-type": "application/json" } }).then
        ((response) => {
            setSpinner(0);
            toast.success("API: Room services add success.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setDisp(3);
        })
        .catch((error) => {
            setSpinner(0);
            toast.error("API: Room Services add error. ", {
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

export function navigationList(currentLogged, currentProperty) {
    return ([
        {
            icon: "homeIcon",
            text: "Home",
            link: currentLogged?.id.match(/admin.[0-9]*/)
                ? "../../admin/adminlanding"
                : "../landing"
        },
        {
            icon: "rightArrowIcon",
            text: [currentProperty?.property_name],
            link: "../propertysummary"
        },
        {
            icon: "rightArrowIcon",
            text: "Rooms",
            link: "../rooms"
        },
        {
            icon: "rightArrowIcon",
            text: "Add Room",
            link: ""
        }
    ])
}