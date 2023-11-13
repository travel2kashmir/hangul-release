import React, { useState, useEffect } from 'react'
import { TiTick } from "react-icons/ti";
import { useInView } from 'react-intersection-observer';
import Loader from '../Loaders/Loader';
import LandscapeIcon from '@mui/icons-material/Landscape';
import BedIcon from '@mui/icons-material/Bed';
import { BsFillHousesFill } from "react-icons/bs";
import Marquee from 'react-easy-marquee';
import ImagesSlider from '../../utils/ImagesSlider';


function Rooms({ allRooms = [], roomDetailLoader }) {
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1,    // Trigger animation when 10% of the element is in view
    });
    const [rooms, setRooms] = useState([])
    const [imageSlideShow, setImageSlideShow] = useState(0);
    const [visibleImage, setVisibleImage] = useState();
    const [allImagesLink, setAllImagesLink] = useState([]);
    
    useEffect(() => {
        setRooms(allRooms)
    }, [allRooms])

    function activateImagesSlider(image_index, allImages) {
        setVisibleImage(image_index)
        console.log(allImages)
        setAllImagesLink(allImages.map(i => i.image_link))
        setImageSlideShow(1)
    }
 return (
        <section id='rooms' className='bg-custom-brown'>
            <div ref={ref} className={`py-10 md:pt-20 lg:pt-36 px-5 lg:px-28 lg:mx-24 ${inView ? 'animate-slide-in' : 'opacity-0'}`}>
                <div>
                    {/* room heading */}
                    <div className='mb-5 md:mb-10 text-center'>
                        <div>
                            <h2 className='text-4xl lg:text-6xl text-slate-700'> OUR ROOMS</h2>
                        </div>
                    </div>

                    {roomDetailLoader === 0 ? <><Loader size={`h-40 w-full`} /><Loader size={`h-40 w-full`} /><Loader size={`h-40 w-full`} /> </> :
                        <>
                            {/* room details */}
                            {rooms.map((room, index) => {
                                return (
                                    <div key={index} className='mb-5 border-b-2 border-slate-300 '>
                                        <div className='md:my-5 lg:mt-12 md:flex text-center md:text-start'>
                                            {/* room image */}
                                            <div className='md:w-3/12'>

                                                {Object.keys(room).includes('room_images') ? <img className='rounded-md '
                                                onClick={()=>activateImagesSlider(0, room?.room_images)} src={room?.room_images[0].image_link}></img> : <img className='rounded-md ' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" />}

                                            </div>

                                            {/* room description */}
                                            <div className='md:w-6/12'>
                                                <div className='p-5 md:px-16 md:py-0 lg:px-10'>
                                                    {/* room name */}
                                                    <div className='mb-5 '>
                                                        <div>
                                                            <h5 className='text-xl lg:text-2xl text-slate-700 font-normal'>{room?.room_name}</h5>
                                                        </div>
                                                        {/* room price */}
                                                        <span className='mb-5 md:my-auto md:w-3/12'>
                                                            <p>
                                                                {room?.unconditional_rates?.map((resource, index) => {
                                                                    return <h6 key={index} className="text-sm text-slate-700 ">FROM {resource?.baserate_currency.toUpperCase() + " " + resource?.baserate_amount}</h6>
                                                                })}
                                                            </p>
                                                        </span>

                                                    </div>

                                                    {/* room description */}
                                                    <div className='mb-5'>
                                                        <div>
                                                            <p className='text-sm lg:text-base text-slate-600'>{room?.room_description}</p>
                                                        </div>
                                                    </div>

                                                    {/* Additional details */}
                                                    <div >
                                                        <ul>
                                                            <li className='flex justify-center md:justify-start text-slate-700'>
                                                                <span className='my-auto'><TiTick /></span>
                                                                <span className='pl-2'>{room?.minimum_number_of_occupants} - {room?.maximum_number_of_occupants} Persons</span>

                                                            </li>
                                                            {Object.keys(room).includes("beds") ?
                                                                <p ><BedIcon />  &nbsp; {room.beds.length} {room.beds.length > 1 ? "Beds" : "Bed"} <span> ({room?.beds?.map((item, index) => {
                                                                    return (
                                                                        <span key={index}>{index === 0 ? '' : ' , '} {item?.bed_width} * {item?.bed_length}</span>

                                                                    );
                                                                })}) cm</span>
                                                                </p> : <></>}
                                                            <li className='flex justify-center md:justify-start text-slate-700'>
                                                                <span className='my-auto'><BsFillHousesFill /></span>
                                                                <span className='pl-2'>{room?.room_length * room?.room_length} Sq.Ft</span>

                                                            </li>
                                                            <li className='flex justify-center md:justify-start text-slate-700'>{room?.views?.map((item, index) => {
                                                                return (
                                                                    <span key={index} >{index === 0 ? <LandscapeIcon /> : ','} &nbsp; {item?.view}  </span>
                                                                );
                                                            })}</li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                            

                                        </div>
                                        <Marquee
                                                duration={40000} >{room?.room_facilities?.map((item, index) => {
                                                    return (
                                                        <span className='text-gray-700 mx-4' key={index}>
                                                            {/* &#10004 is code for tick mark  */}
                                                            <span>&#10004;
                                                                {item?.service_name.replaceAll("_", " ")}
                                                            </span>
                                                        </span>
                                                    );
                                                })}
                                            </Marquee>
                                    </div>

                                );
                            })}
                        </>
                    }


                </div>

            </div>
            <div className={imageSlideShow === 1 ? "block" : "hidden"}>
                <ImagesSlider
                    visibleImage={visibleImage}
                    images={allImagesLink}
                    setShowModal={(e) => setImageSlideShow(e)} />

            </div>
        </section>
    )
}

export default Rooms