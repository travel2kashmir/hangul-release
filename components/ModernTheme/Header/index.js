import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Router from 'next/router';
import ContactUsModal from '../Modals/ContactUsModal';
import Contactus from '../../utils/Contactus';
import Color from '../../colors/Color';
import { english } from '../../Languages/Languages';
import BookingForm from '../CustomizedUtils/BookingForm'
import Modal from '../Modals/Modal';

function Header({ allHotelDetails, menu, setMenu, themeColor, setRoomsLoader, setShowBookingEngine, enquiry, setEnquiry, searched, setSearched, cookie }) {

    const [showModalContactUs, setShowModalContactUs] = useState(0);
    const [showModalBookingForm, setShowModalBookingForm] = useState(0);

    function reportAnalytics(message){
        if (cookie) {
            const user = JSON.parse(cookie);
            global.analytics.track(`User checking ${message}`, {
               action: `User checking ${message}`,
               user: user.user,
               time: Date()
            });
         }
       }

    function clickHandler(id, action) {
        action === 'modal' ? id() : Router.push(`${window?.location?.origin}${window?.location?.pathname}/${id}`)
    }

    return (
        <header className={`h-auto ${themeColor.bgColor}`}>

            <div className='mx-8'>
                <div className='py-8 pr-1 flex justify-between md:py-10 lg:py-16'>
                    <div className='mx-4 text-center md:mx-auto'>
                        <StarRatings
                            rating={allHotelDetails?.star_rating}
                            starRatedColor="#FDCC0D"
                            starDimension='16px'
                            numberOfStars={5}
                            starSpacing='1px'
                            name='rating'
                        />
                    <h1 className={`${themeColor.textColor} text-xl pt-2 md:text-4xl md:font-light tracking-widest uppercase`}>{(allHotelDetails?.property_name)}</h1>
                    </div>


                    {/* for small screens  */}
                    <div className='my-auto md:hidden lg:hidden'>
                        <i className='text-white cursor-pointer ' onClick={() => setMenu(!menu)}>{menu === true ? <CloseIcon sx={{ fontSize: 30, color: themeColor.menuColor }} /> : <MenuIcon sx={{ fontSize: 30, color: themeColor.menuColor }} />}</i>
                    </div>


                </div>

                {/* for medium and large screens */}
                <nav className='text-center pb-8 hidden md:block lg:block'>
                    <ul className='flex justify-center gap-10 font-bold'>
                        {[{ "label": "About", "id": "#about", "action": "href" },
                        { "label": "Rooms", "id": "#rooms", "action": "href" },
                        { "label": "Photos", "id": "#photos", "action": "href" },
                        { "label": "Services", "id": "#services", "action": "href" },
                        { "label": "Reviews", "id": "#reviews", "action": "href" },
                        // { "label": "Contact Us", "id": () => { setShowModalContactUs(1) }, "action": "modal" },
                        { "label": "Book Now", "id": () => { setShowModalBookingForm(1) }, "action": "modal" }
                        ].map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() =>{
                                        reportAnalytics(item?.label)
                                        clickHandler(item?.id, item?.action)
                                    } }
                                    className='text-gray-400 cursor-pointer hover:text-white hover:underline'
                                >{item?.label}</li>
                            )
                        })}
                    </ul>

                </nav>
            </div>

            {/* modal for contact us*/}
            {showModalContactUs === 1 ?
                <div >
                    <ContactUsModal
                        setShowModalContactUs={setShowModalContactUs}
                        property_id={allHotelDetails?.property_id}
                    />
                </div> : <></>}

            {/* ---------------booking form --------------- */}
            {showModalBookingForm === 1 ?
                <Modal
                    title={'BOOK YOUR STAY'}
                    description={
                        <BookingForm
                            setRoomsLoader={(e) => setRoomsLoader(e)}
                            setShowBookingEngine={(e) => setShowBookingEngine(e)}
                            setEnquiry={(e) => setEnquiry(e)}
                            enquiry={enquiry}
                            setSearched={(e) => setSearched(e)}
                            searched={searched}
                            setShowModalBookingForm={(e) => setShowModalBookingForm(e)}
                            cookie={cookie}
                        />
                    }
                    setShowModalBookingForm={(e) => setShowModalBookingForm(e)}
                    closeButton={false}
                />
                : <></>
            }

        </header>
    )
}

export default Header