import React, { useState } from 'react'
import Modal from '../Modals/Modal';
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import ContactUsModal from '../Modals/ContactUsModal';



function Footer({ allHotelDetails }) {

    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);
    const [showModalContactUs, setShowModalContactUs] = useState(0);

    let date = new Date();

    return (
        <footer className='bg-custom-dark-green'>
            <div className='py-12 px-5 lg:px-24 text-white'>
                <div>

                    <div className='pb-5'>
                        <div className='text-center'>
                            <div className=' inline-block mx-auto'>
                                <p className='px-4 py-2  lg:text-2xl font-medium uppercase font-family-marcellus'>{allHotelDetails.property_name}</p>
                            </div>
                        </div>
                    </div>

                    <div className='py-2'>
                        <div className='md:flex md:justify-evenly'>

                            {/* policies and social media */}
                            <div className='md:w-4/12'>
                                <div className="hidden  md:flex md:justify-center">
                                    <div>
                                        <ul className='text-start'>
                                            <li className='py-2 text-sm  cursor-pointer hover:underline font-family-jost-regular' onClick={() => setShowModalTC(1)}>Terms & Conditions</li>
                                            <li className='py-2 text-sm  cursor-pointer hover:underline font-family-jost-regular' onClick={() => setShowModalPrivacy(1)}>Privacy Policy</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='md:pt-10 text-center flex justify-center'>
                                    <span className=''><BsFacebook size={17} /></span>
                                    <span className='ml-3'><AiOutlineTwitter size={20} /></span>
                                </div>

                            </div>

                            {/* hotel contact and address */}
                            <div className='md:w-5/12'>
                                <div className='px-8 pt-8 md:pt-0'>
                                    <div className=' text-sm lg:text-base mb-5'>
                                        <h2 className='font-family-marcellus text-center md:text-left text-4xl pb-5'>Reach out</h2>

                                        <div>
                                            {allHotelDetails?.contacts?.map((contact, index) => {
                                                return (
                                                    <div key={index} className=' pb-5 text-center text-sm md:text-start lg:text-base '>
                                                        <ul>
                                                            <li className='font-family-jost-regular'>
                                                                <span className='text-slate-300'><em>{contact?.contact_type}:-</em></span>
                                                                <span> {contact?.contact_data}</span>

                                                            </li>

                                                        </ul>
                                                    </div>);
                                            })}
                                        </div>
                                        <p className='pt-1 font-family-jost-regular'><span className='text-slate-300'>Address:-</span><span>{allHotelDetails?.address?.[0]?.address_street_address}, {allHotelDetails?.address?.[0]?.address_city}, {allHotelDetails?.address?.[0]?.address_zipcode}, {allHotelDetails?.address?.[0]?.address_country}</span></p>
                                        {/* <p className='pt-1'>{allHotelDetails?.address?.[0]?.address_zipcode}, {allHotelDetails?.address?.[0]?.address_country}</p> */}
                                    </div>
                                </div>
                            </div>

                            {/* policies for sm devices */}
                            <div className="md:hidden flex justify-center pb-5">
                                <div>
                                    <ul className='text-center'>
                                        <li className='py-2 text-sm  cursor-pointer' onClick={() => setShowModalTC(1)}>Terms & Conditions</li>
                                        <li className='py-2 text-sm  cursor-pointer' onClick={() => setShowModalPrivacy(1)}>Privacy Policy</li>
                                    </ul>
                                </div>
                            </div>

                            {/* hotel navigates */}
                            <div className='md:w-3/12 text-center md:text-left'>
                                <h2 className='font-family-marcellus text-4xl pb-5'>Navigate</h2>
                                <div className='font-family-jost-regular'>
                                    <p onClick={() => { setShowModalContactUs(1) }} className='pb-5 cursor-pointer hover:underline'>Contact Us</p>
                                    <p><a href='#services' className='cursor-pointer hover:underline'>Services</a></p>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className='text-center md:text-center lg:text-center pt-10 border-t-2'>
                        <p className='text-xs font-family-jost-regular'>Copyright &copy; {date.getFullYear()} All Rights Reserved</p>
                    </div>
                </div>

            </div>

            {/* ------------------- modal view for footer-------------------------- */}

            <div className={showModalTC === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Terms & Conditions`}
                    description={allHotelDetails?.privacy_conditions?.[0].terms_condition}
                    setShowModal={(e) => setShowModalTC(e)}
                />
            </div>

            <div className={showModalPrivacy === 1 ? "block" : "hidden"}>
                <Modal
                    title={`Privacy Policy`}
                    description={allHotelDetails?.privacy_conditions?.[0].privacy_policy}
                    setShowModal={(e) => setShowModalPrivacy(e)}
                />
            </div>

            {/* modal for contact us*/}
            <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <ContactUsModal
                    setShowModalContactUs={setShowModalContactUs}
                />
            </div>

        </footer>
    )
}

export default Footer