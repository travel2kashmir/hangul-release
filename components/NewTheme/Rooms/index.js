import React, { useEffect, useState } from 'react';
import Loader from '../Loaders/Loader';
import RoomViewMobile from './RoomViewMobile';
import RoomViewMdAndLg from './RoomViewMd&Lg';


function Rooms({ rooms, showRoom, setShowRoom, roomDetailLoader, lang,currency,cookie }) {

    const [selectedRoom, setSelectedRoom] = useState([]);

    return (
        <section id='rooms' className="px-5 py-10">

            <div className='text-center'>
                <h2 className="font-semibold text-2xl md:text-4xl pb-10">{lang?.roomsSuites} </h2>
            </div>
                
            {roomDetailLoader === 0 ? <Loader size={`w-11/12 h-24 py-3 mb-5 `} /> :
                <>
                    {/* for medium and large screen */}
                    <RoomViewMdAndLg
                        rooms={rooms}
                        showRoom={showRoom}
                        setShowRoom={setShowRoom}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                        currency={currency}
                        lang={lang}
                        cookie={cookie}
                    />

                    {/* for mobile view only */}
                    <RoomViewMobile 
                        rooms={rooms}
                        showRoom={showRoom}
                        setShowRoom={setShowRoom}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                        currency={currency}
                        lang={lang}
                        cookie={cookie}
                    />
                </>
            }

          
        </section>
    );
}

export default Rooms