import React from 'react'
import RoomDetails from './RoomDetails';
import RoomServices from './RoomServices';
import CarousalComponent from '../CarousalComponent';


function RoomViewMobile({ rooms, selectedRoom, setSelectedRoom, showRoom, setShowRoom, lang }) {
    return (
        <div className=' md:hidden lg:hidden'>
            {rooms?.map((room, index) => {
                return (
                    <React.Fragment key={index}>
                        <div className='md:w-1/3'>
                            <div className={`text-center pb-5 md:py-5 lg:py-10 md:rounded-md ${selectedRoom?.room_id === room?.room_id ? `${`md:shadow-xl md:bg-slate-200 lg:shadow-xl lg:bg-slate-100`}` : ``}`}
                                onClick={() => {
                                    (showRoom.index != index) ? setShowRoom({ "visible": 1, "index": index }) : setShowRoom({ "visible": 0, "index": undefined });
                                    setSelectedRoom(room);
                                }}
                            >
                                {Object.keys(room).includes('room_images') ? <img className='rounded-md md:w-10/12 md:m-auto lg:w-10/12' src={room?.room_images[0].image_link}></img> : <img className='rounded-md md:w-10/12 md:m-auto lg:w-10/12' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" />}

                                <p className="mt-5 text-xl font-semibold">{room?.room_name}</p>

                                {room?.unconditional_rates?.map((resource, index) => {
                                    return <p key={index} className="text-lg text-gray-500 font-medium">{resource?.baserate_currency + " " + resource?.baserate_amount}</p>
                                })}

                            </div>

                            {
                                showRoom.visible === 1 && showRoom.index === index ?
                                    <div className=" md:-mx-auto pt-5 mb-10 rounded shadow-lg bg-slate-100 md:hidden lg:hidden">
                                        <div className="flex justify-between px-5">
                                            <p className=' text-slate-500 font-semibold tracking-wide text-center text-xl'>{room?.room_name} <br /> ({room?.room_type.replaceAll("_", " ")})</p>
                                            {room?.unconditional_rates?.map((resource, index) => {
                                                return <p key={index} className="text-sm mt-2 text-gray-500 font-medium">{resource?.baserate_currency + " " + resource?.baserate_amount}</p>
                                            })}
                                        </div>

                                        <p className='py-5 px-3 text-slate-500 tracking-wide text-center'>{room.room_description}</p>
                                        {Object.keys(room).includes('room_images') ?
                                            <CarousalComponent
                                                id="roomPhotos"
                                                type='room'
                                                data={room?.room_images}
                                            />
                                            : <img className='rounded-md md:m-auto md:w-6/12' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" />
                                        }

                                        <RoomDetails
                                            room={room}
                                            lang={lang}
                                        />

                                        {Object.keys(room).includes("room_facilities") ?
                                            <RoomServices
                                                room={room}
                                                lang={lang}
                                            />
                                            : <></>}
                                    </div>
                                    : <></>
                            }

                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    )
}

export default RoomViewMobile