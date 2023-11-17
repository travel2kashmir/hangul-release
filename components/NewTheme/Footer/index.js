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

                <div className='flex flex-col-reverse items-center md:flex  md:flex-row md:justify-between text-center text-gray-400 md:text-center lg:text-center'>
                    <p>{lang?.copyright} &copy; {date.getFullYear()} {lang?.poweredBy} <a href="http://travel2kashmir.com">Travel2Kashmir</a>. {lang?.allRightsReserved}</p>
                    <div className="flex mt-4 space-x-6 mb-10 md:mb-0 sm:justify-center sm:mt-0">
                        <div onClick={() => { getIPData("Anchor tag Facebook", "/facebok") }} className="text-white hover:text-gray-400 dark:hover:text-white mr-4">
                            <a href="https://www.facebook.com/travel2kashmir" >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <span className="sr-only">Facebook page</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;