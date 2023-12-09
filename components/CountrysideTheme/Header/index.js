import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import StarRatings from 'react-star-ratings';
import ContactUsModal from '../Modals/ContactUsModal';
import Modal from '../Modals/Modal'
import Loader from '../Loaders/Loader';

function Header({ allHotelDetails, hotelDetailLoader, setMenu, setShowModalBooking }) {

    const [showModalContactUs, setShowModalContactUs] = useState(0);

    return (
        <section className=' relative border-b-2 border-gray-400 bg-transparent'>

            <div className='md:flex md:justify-center'>

                <div className='px-3 py-2 md:w-7/12 lg:w-8/12  flex justify-between md:flex-row-reverse'>

                    {/* property name div */}
                    <div className='lg:w-6/12 flex'>
                        {hotelDetailLoader === 0 ? <div className='mx-auto'><Loader size={`h-12 w-40`} /></div> :
                            <div className='inline-block mx-auto text-center'>
                                <p className='px-4 pt-2 text-2xl text-white font-medium uppercase font-family-marcellus '>
                                    {allHotelDetails.property_name}
                                </p>
                                <StarRatings
                                    rating={allHotelDetails?.star_rating}
                                    starRatedColor="#FDCC0D"
                                    starDimension='10px'
                                    numberOfStars={5}
                                    starSpacing='1px'
                                    name='rating'
                                />

                            </div>
                        }
                    </div>

                    {/* only for small and medium screen */}
                    <div className='my-auto lg:hidden'>
                        <i onClick={() => setMenu(1)}><IoIosMenu size={30} color='white' /></i>
                    </div>

                    {/* only for large screen  */}
                    <div className='hidden lg:block text-white my-auto lg:px-10 lg:w-6/12'>
                        <ul className='flex text-sm font-family-jost-regular'>
                            <li><a href='#home' className='pr-5 cursor-pointer hover:underline'>HOME</a></li>
                            <li><a href='#rooms' className='pr-5 cursor-pointer hover:underline'>ROOMS</a></li>
                            <li><a href='#photos' className='pr-5 cursor-pointer hover:underline'>GALLERY</a></li>
                            <li><a href='#services' className='pr-5 cursor-pointer hover:underline'>SERVICES</a></li>
                        </ul>
                    </div>

                </div>

                <div className='hidden font-family-jost-regular text-white md:flex md:justify-end md:my-auto md:w-5/12 lg:w-4/12'>

                    <div className='flex hover:cursor-pointer hover:underline margin-right'>
                        <span className='my-auto'><CiMail /></span>
                        <span className='ml-2 text-sm'
                            onClick={() => {
                                setShowModalContactUs(1)
                            }}> CONTACT US</span>
                    </div>

                    <div
                        className='book-now flex ml-5 md:mr-10'
                        onClick={() => {
                            setShowModalBooking(1)
                        }}
                    >
                        <span className='my-auto'><SlCalender /></span>
                        <span className='ml-2 text-sm'> BOOK NOW</span>
                    </div>

                </div>

            </div>



            {/* modal for contact us*/}
            <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <ContactUsModal
                    setShowModalContactUs={setShowModalContactUs}
                />
            </div>

            {/* ---------------booking form for small and medium screen--------------- */}
            {/* {showModalBooking === 1 ?
                <Modal
                    description={<BookingForm />}
                    setShowModal={(e) => setShowModalBooking(e)}
                />
                : <></>} */}



            <style jsx>
                {`
                @media (min-width: 1101px) {
                   .book-now {
                        display:none;
                   }
                   .margin-right{
                        margin-right:40px;
                   }
                }
                `}
            </style>
        </section>
    )
}

export default Header