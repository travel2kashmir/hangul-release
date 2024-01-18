import React, { useEffect, useState } from 'react';
import InputText from '../utils/InputText';
import Button from '../Button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// import roomPrice from './roomPrice.json';
import randomColor from 'randomcolor';
import RoomDiscounts from './rooms/roomDiscounts';
import RoomRateModification from './rooms/roomRateModification';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import DropDown from '../utils/DropDown';
import { toast } from 'react-toastify';
import Capsule from '../utils/Capsule';
let i = 0;
let lang;

const RoomPriceCalendar = ({ color, language, currentProperty }) => {
    const [events, setEvents] = useState([])
    const [allRoomRates, setAllRoomRates] = useState([])
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [editUI, setEditUI] = useState('none')
    const [roomColors, setRoomColors] = useState([])
    const [globalRoomData, setGlobalRoomData] = useState([])
    const [selectedColors, setSelectedColors] = useState([]);
    const [unfilteredRooms, setUnfilteredRooms] = useState([]);
    const [roomPrices, setRoomPrices] = useState([])
    const [selectedRates, setSelectedRates] = useState({})
    function initialData() {
        // creates an array of object and from that array duplicates are removed using set
        axios.get(`/api/room_prices/${currentProperty.property_id}`).then((response) => {
            // console.log(response.data.map((i) => ({ ...i, "title": i.base_rate })))
            // let roomPrice = response.data.map((i) => ({ ...i, "title": `${i.base_rate} - ${i.meal_name}` }))
            let roomPrice = response.data.filter(i => i.meal_name === 'Room Only - RO').map((i) => ({ ...i, "title": `${i.base_rate} - ${i.meal_name}` }))
            setUnfilteredRooms(response.data);

            let uniqueListOfRooms = Array.from(new Set(roomPrice?.map(item => ({ "room_id": item.room_id, "room_name": item.room_name })).map(JSON.stringify)), JSON.parse);
            setRooms(uniqueListOfRooms);
            setAllRoomRates(uniqueListOfRooms)
            let room_ids = roomPrice?.map((rate) => {
                return rate?.room_id
            });
            const uniqueRoomIdArray = [...new Set(room_ids)];
            //set is data type in js like array but has unique element
            //aasign unique color for unique rooms
            let colorList = [
                '#007d9a',
                '#0b96ba',
                '#00789e',
                '#128cb7',
                '#0082a9',
                '#0a85b5',
                '#006f8a',
                '#0c94b6',
                '#00758e',
                '#0d99c2',
            ];

            let keycolors = uniqueRoomIdArray.map((item) => {
                if (selectedColors.length === colorList.length) {
                    // All colorList have been used, reset selectedColorList
                    setSelectedColors([]);
                }


                let randomColor = '';
                do {
                    return (
                        {
                            [item]: colorList[Math.floor(Math.random() * colorList.length)]
                            //randomly giving colors to rooms 

                        }
                    )
                } while (selectedColors.includes(randomColor));
                setSelectedColors(prevColors => [...prevColors, randomColor]);
            })

            //    convert color array to object
            const mergedColors = Object.assign({}, ...keycolors);
            setRoomColors(mergedColors)
            //object with color information
            let final = roomPrice?.map((rate, id) => {
                let color = mergedColors[rate.room_id]
                return (
                    { ...rate, "color": color, "id": id }
                )
            })
            // console.log(JSON.stringify(final))
            setEvents(final)
            setGlobalRoomData(final)
            lang = localStorage.getItem('Language') != undefined ? localStorage.getItem('Language') : 'en'
        }).catch((error) => {
            toast.error(`API: ${error}`)
        })

    }
    useEffect(() => {
        currentProperty && initialData()
    }, [currentProperty])



    //to remove room
    function removeRoom(selectedList, removedItem) {
        let remainingRooms = events?.filter(item => item.room_id != removedItem.room_id)
        setEvents(remainingRooms)
        setAllRoomRates(selectedList)
    }
    //to add rooms
    function addRoom(selectedList, selectedItem) {
        let addingRooms = globalRoomData?.filter(item => item.room_id === selectedItem.room_id)
        setEvents([...events, ...addingRooms])
    }

    const handleDateClick = (event) => { // bind with an arrow function
        setSelectedRoom({ ...event?.extendedProps, "id": event.id })
        setSelectedDate({ "date": `${event.start.getFullYear()}-${event.start.getMonth() + 1}-${event.start.getDate()}`, "visibleDate": `${event.start.getDate()}-${event.start.getMonth() + 1}-${event.start.getFullYear()}` });
        setModalVisible(true);
        setTitle(event?.title);

        let dateObj = new Date(event.start)
        dateObj.setDate(event.start.getDate() + 1)
        const thisRoom = unfilteredRooms.filter(i => (i.room_id === event.extendedProps.room_id && i.date == dateObj.toISOString().substring(0, 10)))
        setRoomPrices(thisRoom)
        setSelectedRates(() => thisRoom.filter((room) => room.meal_name === 'Room Only - RO')[0])

        // console.log(JSON.stringify(event.start.toISOString().substring(0, 10)));
    }

    const updateRate = () => {
        setModalVisible(false);
    };

    return (
        <div className='h-full'>
            <div className='flex gap-2 justify-content items-center'>
                <Multiselect
                    className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full`}
                    // is object true means that the data is of object type
                    isObject={true}
                    // in options we give the options which we want to select
                    options={rooms}
                    // onRemove removes the selected list from the options, and there are two callback functions selectedList and removedItem.
                    onRemove={(selectedList, removedItem) => { removeRoom(selectedList, removedItem) }}
                    // onSelect adds the selected list from the options, and there are two callback functions selectedList and selectedItem.
                    onSelect={(selectedList, selectedItem) => { addRoom(selectedList, selectedItem) }}
                    // selected values are those values which we want to set default
                    selectedValues={allRoomRates}
                    // display values are the values to be displayed on the ui, here we are setting room_name to be displayed.
                    displayValue="room_name"
                    style={{
                        chips: {
                            background: '#0891b2',
                            'fontSize': '0.875 rem'
                        },
                        searchBox: {
                            border: 'none',
                            'borderBottom': 'none',
                            'borderRadius': '0px'
                        }
                    }}

                />

            </div>


            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height={530}
                weekends={true}
                events={events}
                // dateClick={(event) => handleDateClick(event)} click works on whole date
                eventColor='#0891B4'
                eventDisplay='block'
                locale={lang}
                // event click works for a particular event
                eventClick={(e) => {
                    handleDateClick(e.event)

                }}


            />



            {/* Tailwind CSS Modal to show option available for ediing */}
            {modalVisible === true ?
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                        <div className={`${color?.whitebackground} rounded-lg shadow relative`}>

                            <div className="flex items-start justify-between pl-5 pt-5 pr-5 pb-1 border-b rounded-t mb-2">
                                <h3 className={`${color?.text} text-xl font-semibold`}>
                                    Edit Rate of {selectedRoom?.room_name} for {selectedDate?.visibleDate}
                                </h3>
                                {/* cross button to close the modal */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        document.getElementById('rate').reset();
                                        setEditUI('');
                                        setModalVisible(false);
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
                                {/* cross button to close the modal */}
                            </div>

                            <form id='rate'>
                                <div className=" md:px-4 mx-auto w-full">
                                    <div className="flex flex-wrap">

                                        <InputText
                                            label={`${selectedRoom?.room_name} Rate`}
                                            disabled={true}
                                            visible={1}
                                            defaultValue={`${selectedRates.base_rate} (${selectedRates.meal_name})`}
                                            color={color}
                                            req={true}
                                            title={`enter new rate of room for ${JSON.stringify(selectedDate)}`}
                                            tooltip={true}
                                        />

                                        <DropDown label={'Change rate options'}
                                            visible={1}
                                            defaultValue={'Select Option'}
                                            onChangeAction={(e) => setEditUI(e.target.value)}
                                            color={color}
                                            req={true}
                                            options={[{ "value": "discount", "label": "I want to give discount" },
                                            { "value": "modification", "label": "I want to do rate modification" }]}
                                            tooltip={false} />
                                    </div>
                                </div>
                            </form>
                            
                            {/* capsules start */}
                           
                            <div className={`flex flex-wrap justify-center items-center ${editUI === 'none' ? "" : "border-b"} border-gray-200 `}>
                                {roomPrices.map((i, index) =>
                                    <Capsule key={index}
                                        title={i.meal_name}
                                        color={selectedRates.meal_name===i.meal_name?'bg-cyan-700':'bg-cyan-500'}
                                        textColor={'text-white'}
                                        onClick={() => setSelectedRates(i)} />
                                )}
                            </div>
                            {/* capsules end  */}

                            {/* discount ui */}
                            {editUI === 'discount' ?
                                <div>
                                    <RoomDiscounts room_id={selectedRates?.room_id}
                                        meal={{"meal_name":selectedRates?.meal_name,"room_rate_plan_id":selectedRates?.room_rate_plan_id}}
                                        dateSelected={selectedDate.date}
                                        setModalVisible={setModalVisible}
                                        initialData={initialData} />
                                </div>
                                : undefined}
                            {/* modification ui */}
                            {editUI === 'modification' ?
                                <div>
                                    <RoomRateModification room_id={selectedRoom?.room_id}
                                        dateSelected={selectedDate.date}
                                        base_rate={selectedRates.base_rate}
                                        meal={{"meal_name":selectedRates?.meal_name,"room_rate_plan_id":selectedRates?.room_rate_plan_id}}
                                        setModalVisible={setModalVisible}
                                        initialData={initialData} />
                                </div> : undefined}





                        </div>
                    </div>
                </div> : undefined
            }

        </div>
    );
};

export default RoomPriceCalendar;

