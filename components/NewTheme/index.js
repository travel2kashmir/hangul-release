import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from './modal';
import Footer from './Footer';
import CarousalComponent from './CarousalComponent';
import Services from './Services';
import Rooms from './Rooms';
import About from './About';
import Home from './Home';
import { english, arabic, french } from '../Languages/NewTheme';
import BookingForm from './Booking';
import Color from '../colors/Color';


function Hotel({ language, HotelDetails,
    allRooms, allPackages, services,
    phone, email }) {

    const [allHotelDetails, setHotelDetails] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [showRoom, setShowRoom] = useState({
        'visible': 0,
        'index': undefined,
    });
    const [menu, setMenu] = useState(false);
    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    const [showModalBooking, setShowModalBooking] = useState(0);
    const [hotelDetailLoader, setHotelDetailLoader] = useState(0);
    const [roomDetailLoader, setRoomDetailLoader] = useState(0);
    const [lang, setLang] = useState(english);

    useEffect(() => {
        getLanguage();
        getHotelDetails();
        getRoomDetails();
    }, []);

    function getLanguage() {

        if (language === null) {
            setLang(english)
        } else if (language === 'english') {
            setLang(english)
        } else if (language === 'french') {
            setLang(french)
        } else {
            setLang(arabic)
        }
    }

    function getHotelDetails() {
        setHotelDetails(HotelDetails)
        setHotelDetailLoader(1)
    }

    function getRoomDetails() {
        setRooms(allRooms?.rooms);
        setRoomDetailLoader(1);
    }

    return (
        <main>

            <Home
                allHotelDetails={allHotelDetails}
                setMenu={setMenu}
                menu={menu}
                lang={lang}
                setLang={setLang}
                hotelDetailLoader={hotelDetailLoader}
            />

            {/* <button className='lg:hidden absolute fixed right-0 z-50 bg-white py-2 px-3 text-xs' style={{ top: '12%' }}
                onClick={() => { setShowModalBooking(1) }}>BOOK NOW</button>
            <div className={showModalBooking === 1 ? 'block' : 'hidden'}>
                <Modal
                    title='Booking Form'
                    description={<BookingForm />}
                    setShowModal={(e) => setShowModalBooking(e)}
                />
            </div> */}




            <About
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
            />
            <Rooms
                rooms={rooms}
                showRoom={showRoom}
                setShowRoom={setShowRoom}
                roomDetailLoader={roomDetailLoader}
                lang={lang}
            />


            <CarousalComponent
                id="photos"
                type='photos'
                data={allHotelDetails?.images}
                title={lang?.photos}
                hotelDetailLoader={hotelDetailLoader}
            />

            <Services
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
            />

            <CarousalComponent
                id="reviews"
                type='review'
                data={allHotelDetails?.Reviews}
                title={lang?.peopleSays}
                hotelDetailLoader={hotelDetailLoader}
            />


            <Footer
                setShowModalPrivacy={setShowModalPrivacy}
                setShowModalTC={setShowModalTC}
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
            />

            <div className='hidden lg:block lg:sticky lg:bottom-0'>
                <BookingForm color={Color?.light} />
            </div>



            {/* ------------------- modal view for footer-------------------------- */}

            <div className={showModalTC === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Terms & Conditions`}
                    description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                    setShowModal={(e) => setShowModalTC(e)}
                />
            </div>

            <div className={showModalPrivacy === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Privacy Policy`}
                    description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                    setShowModal={(e) => setShowModalPrivacy(e)}
                />
            </div>

            {/*-------------------- menu bar for small and medium screen----------- */}

            {menu === true ?
                <React.Fragment>
                    <div className='absolute inset-0 w-full h-72 md:h-80 bg-white opacity-75 rounded-bl-3xl rounded-br-3xl  md:rounded-br-full z-50'>
                        <i onClick={() => setMenu(false)} className='flex justify-end pt-5 pr-5 cursor-pointer hover:text-slate-500'><CloseIcon /></i>
                        <div className='text-center text-black pt-10 md:pt-12'>
                            <ul className='inline-block font-bold'>
                                {[{ "label": lang?.about, "id": "#about" },
                                { "label": lang?.rooms, "id": "#rooms" },
                                { "label": lang?.photos, "id": "#photos" },
                                { "label": lang?.services, "id": "#services" },
                                { "label": lang?.reviews, "id": "#reviews" },
                                { "label": lang?.contactUs, "id": "#footer" }
                                ].map((item, index) => {
                                    return (
                                        <a href={`${item?.id}`} key={index} onClick={() => setMenu(false)}><li className='pb-1 md:pb-2 hover:text-slate-500'>{item?.label}</li></a>
                                    )
                                })}
                                {/* 
                                                <a href="#about" onClick={() => setMenu(false)}><li className='pb-1  hover:text-slate-500'>About</li></a>
                                                <a href="#rooms" onClick={() => setMenu(false)}><li className='pb-1 hover:text-slate-500'>Rooms</li></a>
                                                <a href="#photos" onClick={() => setMenu(false)}><li className='pb-1 hover:text-slate-500'>Photos</li></a>
                                                <a href="#services" onClick={() => setMenu(false)}><li className='pb-1 hover:text-slate-500'>Services</li></a>
                                                <a href="#reviews" onClick={() => setMenu(false)}><li className='pb-1 hover:text-slate-500'>Reviews</li></a>
                                                <a href="#footer" onClick={() => setMenu(false)}><li className='pb-1 hover:text-slate-500'>Contact Us</li></a> 
                                                */}
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
                : <></>
            }

        </main>
    )
}

export default Hotel;