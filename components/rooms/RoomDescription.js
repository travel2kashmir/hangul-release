import React, { useState, useEffect } from 'react'
import axios from 'axios';
import WidgetStatus from '../widgetStatus';
import DropDown from '../utils/DropDown';
import InputText from '../utils/InputText';
import InputTextBox from '../utils/InputTextBox';
import Multiselect from 'multiselect-react-dropdown';
import Button from '../Button';
import Lineloader from '../loaders/lineloader';
import { validateRoom } from '../validation/room';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RoomDescription({ color,spinner, setSpinner, lang, language,roomDetails, allRoomDetails, setAllRoomDetails, setFlag, visible, error, setError, initalIdentifiers, setRoomIdentifiers, roomIdentifiers,flag,finalView, setFinalView,currentroom,fetchDetails,setDisp }) {
    const [roomtypes, setRoomtypes] = useState([])
    const [roomView, setRoomView] = useState([]);
    const [isInventoryEdited, setIsInventoryEdited] = useState(false);
    useEffect(() => {
        fetchRoomtypes();
    }, [])

    // manage identifiers
  function manageIdentifiers(room_id, room_type) {
    let id = roomIdentifiers?.split(",")
    let final = [];
    let temp;
    id.map((i) => {
      temp = {
        "room_id": room_id,
        "room_type_id": roomtypes.filter(i => i.room_type_name === room_type)[0].room_type_id,
        "room_identifier": i
      }
      final.push(temp);

    })
    axios.post('/api/room_refrence', { "room_refrences": final },
      { headers: { 'content-type': 'application/json' } })
      .then(response => {
        setSpinner(0);
        toast.success("API: Room Refrences Added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(() => {
        toast.error("API: Room Refrences Added Failed", {
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

    const fetchRoomtypes = async () => {
        const url = `/api/room-types`
        axios.get(url)
            .then((response) => {
                setRoomtypes(response.data);
                console.log("url  to fetch room types hitted successfully")
            })
            .catch((error) => { console.log("url to fetch roomtypes, failed") });
    }
    // Views
    const views = (viewData) => {
        setFinalView([]);
        var final_view_data = []
        viewData.map(item => {
            var temp = {
                view: item?.view
            }
            final_view_data.push(temp)
        });
        setFinalView(final_view_data);
        setRoomView(1)
    }

    /* Function for Update Room Description*/
    const submitRoomDescriptionEdit = () => {
        if (allRoomDetails.length !== 0) {
            const final_data = {
                "room_id": currentroom,
                "room_name": allRoomDetails.room_name,
                "room_type_id": allRoomDetails.room_type_id,
                "room_description": allRoomDetails.room_description,
                "is_room": allRoomDetails.is_room,
                "is_room_sharing": allRoomDetails.is_room_sharing,
                "room_style": allRoomDetails.room_style,
                "room_capacity": allRoomDetails.room_capacity,
                "maximum_number_of_occupants": allRoomDetails.maximum_number_of_occupants,
                "minimum_number_of_occupants": allRoomDetails.minimum_number_of_occupants,
                "minimum_age_of_occupants": allRoomDetails.minimum_age_of_occupants,
                "room_length": allRoomDetails.room_length,
                "room_width": allRoomDetails.room_width,
                "room_height": allRoomDetails.room_height
            }
            setSpinner(1);
            if (roomIdentifiers != undefined) {
                manageIdentifiers(currentroom, allRoomDetails.room_type);
            }

            const url = '/api/room'
            axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
                ((response) => {
                    setSpinner(0);
                    toast.success("Room details update success.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    fetchDetails();
                    setError({});
                    setFlag([]);
                    setAllRoomDetails([])
                })
                .catch((error) => {
                    setSpinner(0);
                    setError({});
                    toast.error("Room details update error. ", {
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
    }

    // View Submit
    const submitView = () => {
        const data = finalView?.map((i => {
            return {
                "room_id": currentroom,
                "view": i?.view
            }
        }))
        setSpinner(1);
        const final_data = { "room_views": data }
        const url = '/api/room_views'
        axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                setSpinner(0);
                toast.success("View add success.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setFlag([])
                setRoomView([]);
                setError({});
            })
            .catch((error) => {
                setSpinner(0);
                toast.error("View add error.", {
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

    //  update inventory 
    function updateInventory() {
        let url = `/api/inventory`
        let inventorydata = {
            "inventory": [{

                "room_id": allRoomDetails.room_id,
                "inventory_count": allRoomDetails.inventory_count
            }]
        }
        axios.put(url, inventorydata,
            {
                header: { "content-type": "application/json" }
            }
        ).then((response) => {
            console.log(response.data);
            toast.success('Inventory updated successfully')
        }).catch((err) => {
            console.log(err)
            toast.error('Not Able to update the inventory at the moment.')
        })
    }


    // Validate Room Description
    const validationRoomDescription = () => {
        var result = validateRoom(allRoomDetails, finalView, roomIdentifiers?.split(","))
        if (result === true) {
            if (flag === 1) {
                submitRoomDescriptionEdit();
            }
            if (roomView === 1) {
                submitView();
            }
            if (isInventoryEdited) {
                updateInventory();
            }
        }
        else {
            setError(result)
        }
    }


    return (
        <div id='0' className='block py-1'>
            <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
                {/* progress bar starts */}
                <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={1} color={color} />
                {/* Progress bar ends */}
                <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                    {language?.room} {language?.description}
                </h6>
                <div className="pt-6">
                    <div className=" md:px-2 mx-auto w-full">
                        <div className="flex flex-wrap">
                            {/* room type */}
                            <DropDown
                                label={`${language?.room} ${language?.type}`}
                                visible={visible}
                                defaultValue={roomDetails?.room_type}
                                onChangeAction={(e) =>
                                    setAllRoomDetails(
                                        { ...allRoomDetails, room_type_id: e.target.value },
                                        setFlag(1)
                                    )
                                }
                                error={error?.propertycategory}
                                color={color}
                                req={true}
                                options={roomtypes?.map(i => {
                                    return (

                                        { value: i.room_type_id, label: i?.room_type_name.replaceAll("_", " ") }

                                    )
                                })
                                }
                            />

                            {/* room name */}
                            <InputText
                                label={`${language?.room} ${language?.name}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_name}
                                onChangeAction={(e) => {
                                    setAllRoomDetails({
                                        ...allRoomDetails, room_name: e.target.value,
                                    });
                                    setFlag(1);
                                }
                                }
                                error={error?.room_name}
                                color={color}
                                req={true}
                                tooltip={true}
                            />

                            {/*Room Description */}
                            <InputTextBox
                                label={`${language?.room} ${language?.description}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_description}
                                wordLimit={1000}
                                onChangeAction={(e) => {
                                    if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                                        setError({})
                                        setAllRoomDetails({ ...allRoomDetails, room_description: e.target.value }, setFlag(1))
                                    }
                                    else {
                                        setError({ room_description: 'word limit reached' })
                                    }

                                }

                                }
                                error={error?.room_description}
                                color={color}
                                req={true}
                                tooltip={true}
                            />

                            {/* room capacity */}
                            <InputText
                                label={`${language?.room} ${language?.capacity}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_capacity}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, room_capacity: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.room_capacity}
                                color={color}
                                req={true}
                            />

                            {/* max number of occupants */}
                            <InputText
                                label={`${language?.maximum} ${language?.number} ${language?.of} ${language?.occupants}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.maximum_number_of_occupants}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, maximum_number_of_occupants: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.maximum_number_of_occupants}
                                color={color}
                                req={true}
                            />

                            {/* minimum number of occupants */}
                            <InputText
                                label={`${language?.minimum} ${language?.number} ${language?.of} ${language?.occupants}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.minimum_number_of_occupants}
                                onChangeAction={
                                    (e) => {
                                        setAllRoomDetails({ ...allRoomDetails, minimum_number_of_occupants: e.target.value }, setFlag(1))
                                    }
                                }
                                error={error?.minimum_number_of_occupants}
                                color={color}
                                req={true}
                            />

                            {/* Maximum age of occupants */}
                            <InputText
                                label={`${language?.maximum} ${language?.age} ${language?.of} ${language?.occupants}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.minimum_age_of_occupants}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, minimum_age_of_occupants: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.maximum_number_of_occupants}
                                color={color}
                                req={true}
                            />

                            {/* views room */}
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className={`text-sm font-medium ${color?.text} block py-1 mb-2`}
                                        htmlFor="grid-password">
                                        {language?.viewsfromroom}
                                        <span style={{ color: "#ff0000" }}>*</span>
                                    </label>
                                    <div className={visible === 0 ? 'block py-1' : 'hidden'}><Lineloader /></div>
                                    <div className={visible === 1 ? 'block py-1' : 'hidden'}>
                                     
                                        <Multiselect
                                            className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full`}
                                            isObject={true}
                                            options={lang?.Views}
                                            onRemove={(event) => { views(event) }}
                                            onSelect={(event) => { views(event) }}
                                            selectedValues={finalView}
                                            displayValue="view"
                                            closeIcon='circle'
                                            style={{
                                                chips: {
                                                    background: '#0891b2',
                                                    'font-size': '0.875 rem'
                                                }

                                            }}

                                        />
                                        <p className="text-sm text-red-700 font-light">
                                            {error?.view}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Room length */}
                            <InputText
                                label={`${language?.room} ${language?.length} (${language?.infeet})`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_length}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, room_length: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.room_length}
                                color={color}
                                req={true}
                            />

                            {/* Room Breadth */}

                            <InputText
                                label={`${language?.room} ${language?.breadth} (${language?.infeet})`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_width}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, room_width: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.room_width}
                                color={color}
                                req={true}
                            />

                            {/* Room Height */}
                            <InputText
                                label={`${language?.room} ${language?.height} (${language?.infeet})`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_height}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, room_height: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.room_height}
                                color={color}
                                req={true}
                            />

                            {/* Room Area Read only */}
                            <InputText
                                label={`${language?.room} ${language?.area}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.carpet_area}
                                onChangeAction={undefined}
                                color={color}
                                disabled={true}
                            />

                            {/* Room Volume Read only */}
                            <InputText
                                label={`${language?.room} ${language?.volume}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_volume}
                                onChangeAction={undefined}
                                color={color}
                                disabled={true}
                            />

                            {/* Room Style*/}
                            <DropDown
                                label={language?.roomstyle}
                                visible={visible}
                                defaultValue={allRoomDetails?.room_style?.replaceAll("_", " ")}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, room_style: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.room_style}
                                color={color}
                                req={true}
                                options={[
                                    { value: "western", label: "Western" },
                                    { value: "japanese", label: "Japanese" },
                                    { value: "japanese_western", label: "Japanese Western" },
                                ]}
                            />

                            {/* Is Room Shared */}
                            <DropDown
                                label={language?.isroomshared}
                                visible={visible}
                                defaultValue={allRoomDetails?.is_room_sharing === "shared" ? "Yes" : "No"}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, is_room_sharing: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.is_room_sharing}
                                color={color}
                                req={true}
                                options={[
                                    { value: "yes", label: "Yes" },
                                    { value: "no", label: "No" },

                                ]}
                            />

                            {/* Is Room Outdoor Or Indoor */}
                            <DropDown
                                label={language?.isroom}
                                visible={visible}
                                defaultValue={allRoomDetails?.is_room}
                                onChangeAction={
                                    (e) => (
                                        setAllRoomDetails({ ...allRoomDetails, is_room: e.target.value }, setFlag(1))
                                    )
                                }
                                error={error?.is_room_sharing}
                                color={color}
                                req={true}
                                options={[
                                    { value: "indoor", label: "Indoor" },
                                    { value: "outdoor", label: "Outdoor" },

                                ]}
                            />

                            {/* room inventory start */}
                            <InputText
                                label={`${language?.room} ${language?.inventory}`}
                                visible={visible}
                                defaultValue={allRoomDetails?.inventory_count}
                                onChangeAction={(e) => {
                                    setAllRoomDetails({ ...allRoomDetails, inventory_count: e.target.value }, setFlag(1))
                                    setIsInventoryEdited(true)
                                }}
                                color={color}
                                disabled={false}
                                req={true}
                                title={"Total number of rooms available"}
                                tooltip={true}
                                error={error?.inventory_count}
                            />
                            {/* room inventory end */}


                            {/* Room identifier field start */}
                                
                            <InputText
                                label={`${language?.room} ${language?.identifiers}`}
                                visible={visible}
                                defaultValue={initalIdentifiers}
                                onChangeAction={(e) => {
                                    setRoomIdentifiers(e.target.value);
                                    setFlag(1);
                                }}
                                color={color}
                                disabled={false}
                                req={true}
                                title={"Enter comma seperated room no\'s of similar type of rooms"}
                                tooltip={true}
                                error={error?.room_identifier}
                            />

                        </div>
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                            <div className={(spinner === 0 && (flag !== 1 && roomView != 1)) ? 'block py-1' : 'hidden'}>
                                <Button Primary={language?.UpdateDisabled} />
                            </div>
                            <div className={(spinner === 0 && (flag === 1 || roomView === 1)) ? 'block py-1' : 'hidden'}>
                                <Button Primary={language?.Update} onClick={() => { validationRoomDescription() }} />
                            </div>
                            <div className={spinner === 1 ? 'block py-1' : 'hidden'}>
                                <Button Primary={language?.SpinnerUpdate} />
                            </div>
                            <Button Primary={language?.Next} onClick={() => {
                                {
                                    (roomDetails?.room_type === 'Studio_Room' || roomDetails?.room_type === 'Semi_Double' || roomDetails?.room_type === 'King'
                                        || roomDetails?.room_type === 'Queen' || roomDetails?.room_type === 'Double') ?
                                        setDisp(4)
                                        : roomDetails?.room_type === 'Single' ?
                                            setDisp(5) :
                                            setDisp(1)
                                }
                            }} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default RoomDescription