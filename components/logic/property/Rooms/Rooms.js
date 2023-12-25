import axios from "axios";
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**Function to save Current property to be viewed to Local Storage**/
const currentRoom = (id) => {
    localStorage.setItem("RoomId", id);
    Router.push("./rooms/editroom");
};

/* Delete Room Function*/
const deleteRooms = (props, setDeleteRoomId, setDeleteMultiple) => {
    setDeleteRoomId(props);
    setDeleteMultiple(1);
}


export async function fetchRooms(currentProperty, setAllRooms, setVisible, setGen, setDeleteRoomId, setDeleteMultiple) {
    try {
        var genData = [];
        const url = `/api/rooms/${currentProperty.property_id}`
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        setAllRooms(response.data)
        setVisible(1)

        response?.data?.map((item) => {
            var temp = {
                "checkbox": { operation: undefined },
                "Room Name": item.room_name,
                "Room Type": item.room_type_name.replaceAll("_", " "),
                "status": JSON.stringify(item.status),
                "id": item.room_id,
                isChecked: false,
                // isChecked:true,
                Actions: [
                    {
                        type: "button",
                        label: "View",
                        operation: (item) => { currentRoom(item) }
                    },
                    {
                        type: "button",
                        label: "Delete",
                        operation: (item) => { deleteRooms(item, setDeleteRoomId, setDeleteMultiple) }
                    }
                ],
            }
            genData.push(temp)
        }
        )
        setGen(genData);

    }
    catch (error) {

        if (error.response) {
        }
        else {
        }
    }
}


export function navigationList(currentLogged, currentProperty) {
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
            text: "Rooms",
            link: ""
        }
    ])
}

export function confirmedDelete(roomID, setSpinner, setDeleteMultiple, currentProperty, setAllRooms, setVisible, setGen, setDeleteRoomId) {
    setSpinner(1);
    const url = `/api/${roomID}`
    axios.delete(url).then((response) => {
        toast.success(("Room Deleted Successfully!"), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setSpinner(0);
        setDeleteMultiple(0);
        fetchRooms(currentProperty, setAllRooms, setVisible, setGen, setDeleteRoomId, setDeleteMultiple);
        Router.push("./rooms");
    })
        .catch((error) => {
            setSpinner(0);
            toast.error(("Room Delete Error!"), {
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

/* Add Room */
export const addRoom = () => {
    Router.push("./rooms/addroom")
}
