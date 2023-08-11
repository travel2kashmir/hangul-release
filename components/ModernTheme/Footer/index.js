import React, { useState,useEffect } from 'react'
import Loader from '../Loaders/Loader';
import Modal from '../Modals/Modal';

function Footer({ hotelData, hotelDetailLoader,terms,privacy }) {

    let date = new Date();
        const [allHotelDetails,setAllHotelDetails]=useState({})
    useEffect(()=>{
        setAllHotelDetails(hotelData)
    },[hotelData])

    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    // const [showModalContactUs, setShowModalContactUs] = useState(0);


    return (
        <footer id="footer" className="bg-black ">
            <div className='container px-5 py-10'>
                <div className="md:flex md:justify-evenly lg:justify-evenly">
                    <div className="pb-10">
                        <ul className='text-gray-400'>
                            {/* <a href='#rooms'><li className='py-2 hover:text-white'>{lang?.theRoomsSuites}</li></a> */}
                            {/* <a href='#about'><li className='py-2 hover:text-white'>{lang?.aboutUs}</li></a> */}

                            <a href='#rooms'><li className='py-2 text-sm hover:text-white'>Rooms</li></a>
                            <a href='#photos'><li className='py-2 text-sm hover:text-white'>Photos</li></a>
                            <a href='#about'><li className='py-2 text-sm hover:text-white'>About Us</li></a>

                        </ul>
                    </div>

                    <div className="pb-10">
                        <ul className='text-gray-400'>
                            <li className='py-2 text-sm hover:text-white cursor-pointer' onClick={() => setShowModalTC(1)}>Terms & Conditions</li>
                            <li className='py-2 text-sm hover:text-white cursor-pointer' onClick={() => setShowModalPrivacy(1)}>Privacy Policy</li>
                        </ul>
                    </div>



                    <div className="pb-10">
                        <div>
                            <div className="text-gray-400 pb-5">
                                <h1 className='text-white text-sm'><em>Address</em></h1>
                                {hotelDetailLoader === 0 ?
                                    <><Loader size={`w-5/12 h-8 md:w-36`} /> <br /> <Loader size={`w-5/12 h-8 md:w-36`} /></> :
                                    <><span className="text-sm">{allHotelDetails?.address?.[0]?.address_street_address},</span><br /></>

                                }
                                <span className='text-sm'>{allHotelDetails?.address?.[0]?.address_city},{allHotelDetails?.address?.[0]?.address_zipcode}</span><br />
                            </div>
                        </div>
                    </div>

                    <div className='pb-10'>
                        {allHotelDetails?.contacts?.map((contact, index) => {
                            return (
                                <div key={index} className='text-gray-400 pb-5'>
                                    <h1 className='text-white text-sm'><em>{contact?.contact_type} </em></h1>
                                    <p className='text-sm'>{contact?.contact_data}</p>
                                </div>);
                        })}
                    </div>
                </div>

                

                <div className='text-center text-gray-400 md:text-center lg:text-center pt-10 border-t-2'>
                    <p className='text-xs'>Copyright &copy; {date.getFullYear()} All Rights Reserved</p>
                </div>

            </div>


            {/* ------------------- modal view for footer-------------------------- */}

            <div className={showModalTC === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Terms & Conditions`}
                    description={terms}
                    setShowModal={(e) => setShowModalTC(e)}
                />
            </div>

            <div className={showModalPrivacy === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Privacy Policy`}
                    description={privacy}
                    setShowModal={(e) => setShowModalPrivacy(e)}
                />
            </div>
        </footer>
    )
}

export default Footer