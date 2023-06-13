import React from 'react'
import Loader from '../Loaders/Loader';

function Footer({ setShowModalPrivacy, setShowModalTC, allHotelDetails, hotelDetailLoader, lang }) {
    
    let date = new Date();

    return (
        <footer id="footer" className="bg-zinc-900 ">
            <div className='container px-5 py-10'>
                <div className="md:flex md:justify-evenly lg:justify-evenly">
                    <div className="pb-10">
                        <ul className='text-gray-400'>
                            <a href='#rooms'><li className='py-2 hover:text-white'>{lang?.theRoomsSuites}</li></a>
                            <a href='#about'><li className='py-2 hover:text-white'>{lang?.aboutUs}</li></a>

                        </ul>
                    </div>

                    <div className="pb-10">
                        <ul className='text-gray-400'>
                            <li className='py-2 hover:text-white cursor-pointer' onClick={() => setShowModalTC(1)}>{lang?.termsConditions}</li>
                            <li className='py-2 hover:text-white cursor-pointer' onClick={() => setShowModalPrivacy(1)}>{lang?.privacyPolicy}</li>
                        </ul>
                    </div>



                    <div className="pb-10">
                        <div>
                            <div className="text-gray-400 pb-5">
                                <h1 className='text-white'><em>{lang?.address}</em></h1>
                                {hotelDetailLoader === 0 ?
                                    <><Loader size={`w-5/12 h-8 md:w-36`} /> <br /> <Loader size={`w-5/12 h-8 md:w-36`} /></> :
                                    <><span className="">{allHotelDetails?.address?.[0]?.address_street_address},</span><br /></>

                                }
                                <span className=''>{allHotelDetails?.address?.[0]?.address_city},{allHotelDetails?.address?.[0]?.address_zipcode}</span><br />
                            </div>

                            {allHotelDetails?.contacts?.map((contact, index) => {
                                return (
                                    (contact.contact_type == "Phone" || contact.contact_type == "Email") ?
                                        <div key={index} className='text-gray-400 pb-5'>
                                        <h1 className='text-white'><em>{contact?.contact_type} </em></h1>
                                        <p>{contact?.contact_data}</p>                                            

                                        </div> : undefined
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='flex justify-between text-center text-gray-400 md:text-center lg:text-center'>
                    <p>{lang?.copyright} &copy; {date.getFullYear()} {lang?.poweredBy} Travel2Kashmir. {lang?.allRightsReserved}</p>
                    <p>
                        <span></span>
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer;