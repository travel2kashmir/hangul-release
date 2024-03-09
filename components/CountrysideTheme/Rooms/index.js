import React, { useState, useEffect } from 'react'
import Carousel from 'better-react-carousel';
import { BiSolidBed } from "react-icons/bi";
import { MdSquareFoot, MdLandscape } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { useInView } from 'react-intersection-observer';

import RoomServices from './RoomServices';
import Loader from '../Loaders/Loader';
import CarousalComponent from '../CarousalComponent';

function Rooms({ allHotelDetails, rooms, roomDetailLoader, showRoom, setShowRoom, cookie,currency }) {

    const [selectedRoom, setSelectedRoom] = useState([]);

    //just for printing the value of state selectedRoom
    useEffect(() => (
        console.log(selectedRoom)
    ), [selectedRoom]) //it will be called when ever there is any change in the state selectedRoom



    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1,    // Trigger animation when 10% of the element is in view
    });

    return (
        <section id='rooms' className='bg-custom-dark-green'>
            <div ref={ref} className={`pt-28 ${inView ? 'animate-slide-in' : 'opacity-0'}`}>
                <div className='px-2 md:px-5 lg:px-20'>
                    <div className='pb-10'>
                        <div className='lg:mx-0'>
                            <div className='text-center'>
                                <span className='text-white tracking-wider font-family-jost-regular text-4xl'>Welcome To {allHotelDetails?.property_name}</span>
                            </div>
                            <h3 className='mt-5 font-family-marcellus text-center text-white text-4xl lg:text-3xl'>Select Your Cozy Room</h3>

                            {roomDetailLoader === 0 ? <Loader size={`w-full mt-5 h-72 py-3 mb-5 `} /> :

                                <div className='mt-10'>
                                    <Carousel cols={1} rows={1} gap={10} loop={false}
                                        responsiveLayout={[
                                            {
                                                breakpoint: 640,
                                                cols: 1,
                                                rows: 1,
                                                gap: 10,
                                                loop: false,
                                                autoplay: false
                                            },
                                            {
                                                breakpoint: 768,
                                                cols: 1,
                                                rows: 1,
                                                gap: 10,
                                                loop: false,
                                                autoplay: false
                                            },
                                            {
                                                breakpoint: 1020,
                                                cols: 1,
                                                rows: 1,
                                                gap: 10,
                                                loop: false,
                                                autoplay: false
                                            },
                                            {
                                                breakpoint: 1280,
                                                cols: 1,
                                                rows: 1,
                                                gap: 10,
                                                loop: false,
                                                autoplay: false
                                            },
                                        ]}
                                    >
                                        {rooms?.map((room, index) => {
                                            return (
                                                <Carousel.Item key={index} >
                                                    <div
                                                        // className="relative w-full overflow-hidden cursor-pointer carousel-img" style={{ height: '35rem' }}
                                                        className="relative w-full overflow-hidden cursor-pointer carousel-img"
                                                        onClick={() => {
                                                            if (cookie) {
                                                                const user = JSON.parse(cookie);
                                                                global.analytics.track(`User checking room`, {
                                                                   action: `User checking room`,
                                                                   room_name:room.room_name,
                                                                   user: user.user,
                                                                   time: Date()
                                                                });
                                                              }

                                                            (showRoom.index != index) ? setShowRoom({ "visible": 1, "index": index }) : setShowRoom({ "visible": 0, "index": undefined });
                                                            setSelectedRoom(room)
                                                        }}
                                                    >
                                                        <img src={Object.keys(room).includes('room_images') ? room?.room_images[0].image_link : "https://themewagon.github.io/sogo/images/slider-3.jpg"} className="w-full h-full object-cover" />
                                                        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                                        <div className="absolute bottom-0 left-0 right-0 text-center p-4">
                                                            <p className="text-white text-3xl pt-10 font-family-marcellus">{room?.room_name}</p>
                                                            <div className="px-5 py-2 text-white  md:flex md:justify-center md:py-5">
                                                                <p className='my-auto pb-2'><i className='inline-block'><MdSquareFoot /> </i> &nbsp; <span className='font-family-jost-regular md:pr-10'>{room.carpet_area} SQ.FT</span></p>
                                                                <p className='my-auto pb-2'><i className='inline-block'><HiUserGroup /></i>  &nbsp; <span className='font-family-jost-regular md:pr-10'> {room.room_capacity} Adults</span></p>
                                                                {room?.views?.map((item, index) => {
                                                                    return (
                                                                        <p className='hidden md:block my-auto pb-2' key={index} ><i className='inline-block'>{index === 0 ? <MdLandscape /> : ','}</i> &nbsp; <span className='font-family-jost-regular'>{item?.view} </span> </p>
                                                                    );
                                                                })}
                                                                {Object.keys(room).includes("beds") ?
                                                                    <p className='my-auto pb-2'><i className='inline-block pl-10'><BiSolidBed /></i> &nbsp; <span className='font-family-jost-regular'> {room.beds.length} {room.beds.length > 1 ? "Beds" : "Bed"}</span>

                                                                    </p> : <></>}
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-0 left-0 p-4">
                                                            {room?.unconditional_rates?.filter(i => i.meal_name == 'Room Only').map((resource, index) => {
                                                                return <p key={index} className="text-white text-xl font-family-marcellus">{resource?.price} {currency}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>

                                    {selectedRoom.length != 0 ?
                                        <div className=" md:mx-auto mt-8 pt-5 mb-10 rounded shadow-lg bg-custom-brown">

                                            <div className="flex justify-between px-5 pb-10">
                                                <p className=' font-semibold tracking-wide text-center md:text-2xl font-family-marcellus dark-green'>{selectedRoom?.room_name} - ({selectedRoom?.room_type?.replaceAll("_", " ")})</p>
                                                {selectedRoom?.unconditional_rates?.filter(i => i.meal_name == 'Room Only').map((resource, index) => {
                                                                    return <p key={index} className="text-lg text-gray-500 font-medium">{resource?.price} {currency}</p>
                                                                })}
                                            </div>


                                            {/* room images */}
                                            {Object.keys(selectedRoom).includes('room_images') ?
                                                <CarousalComponent
                                                    id="Room Photos"
                                                    type='room'
                                                    data={selectedRoom?.room_images}
                                                    cookie={cookie}
                                                />
                                                : <img className='px-5 md:px-0 rounded-md md:m-auto md:w-5/12' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" />
                                            }

                                            <p className='py-5 px-3 dark-green font-family-jost-regular tracking-wide text-center'>{selectedRoom.room_description}</p>

                                            {/* room services */}
                                            {Object.keys(selectedRoom).includes("room_facilities") ?
                                                <RoomServices
                                                    selectedRoom={selectedRoom}
                                                />
                                                : <></>}
                                        </div> : <></>
                                    }


                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>
                {`
                @media (max-width: 600px) {
                    .carousel-img{
                        height:20rem;
                    }
                }
                @media (min-width: 700px) {
                    .carousel-img{
                        height:35rem;
                    }
                }
                `}
            </style>
        </section>
    )
}

export default Rooms