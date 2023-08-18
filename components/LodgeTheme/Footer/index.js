import React,{useState,useEffect} from 'react'
import Modal from '../Modals/Modal';
import { BsFacebook, BsDot } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";



function Footer({ hotelData, hotelDetailLoader,terms,privacy }){

    const [showModalTC, setShowModalTC] = useState(0);
    const [showModalPrivacy, setShowModalPrivacy] = useState(0);

    let date = new Date();
    const [allHotelDetails,setAllHotelDetails]=useState({})
    useEffect(()=>{
        setAllHotelDetails(hotelData)
    },[hotelData])
    return (
        <footer className='bg-black'>
            <div className='py-12 px-5 lg:px-24 text-white'>
                <div>

                    <div className='pb-5'>
                        <div className='text-center'>
                            <div className='border border-white inline-block mx-auto'>
                                <p className='px-4 py-2 text-sm lg:text-base font-medium uppercase'>{allHotelDetails.property_name}</p>
                            </div>
                        </div>
                    </div>

                    <div className='py-6'>
                        <div className='md:flex md:justify-evenly'>

                            {/* policies and social media */}
                            <div className='md:w-4/12'>
                                <div className="hidden md:block md:flex md:justify-center">
                                    <div>
                                        <ul className='text-start'>
                                            <li className='py-2 text-sm  cursor-pointer hover:underline' onClick={() => setShowModalTC(1)}>Terms & Conditions</li>
                                            <li className='py-2 text-sm  cursor-pointer hover:underline' onClick={() => setShowModalPrivacy(1)}>Privacy Policy</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='md:pt-10 text-center flex justify-center'>
                                    <span className=''><BsFacebook size={17} /></span>
                                    <span className='ml-3'><AiOutlineTwitter size={20} /></span>
                                </div>

                            </div>

                            {/* hotel address */}
                            <div className='md:w-4/12'>
                                <div className='px-8 pt-2 md:pt-0'>
                                    <div className='text-center text-sm lg:text-base mb-5'>
                                        <p>{allHotelDetails?.property_name}</p>
                                        <p className='pt-1'>{allHotelDetails?.address?.[0]?.address_street_address}, {allHotelDetails?.address?.[0]?.address_city}</p>
                                        <p className='pt-1'>{allHotelDetails?.address?.[0]?.address_zipcode}, {allHotelDetails?.address?.[0]?.address_country}</p>
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

                            {/* hotel contacts */}
                            <div className='md:w-4/12 md:flex md:justify-center'>
                                <div>
                                    {allHotelDetails?.contacts?.map((contact, index) => {
                                        return (
                                            <div key={index} className=' pb-5 text-center text-sm md:text-start lg:text-base '>
                                                <ul>
                                                    <li>
                                                        <span className='text-slate-300'><em>{contact?.contact_type}:-</em></span>
                                                        <span> {contact?.contact_data}</span>

                                                    </li>

                                                </ul>
                                            </div>);
                                    })}
                                </div>
                            </div>

                            
                        </div>
                    </div>

                    <div className='mb-5'>
                        <div>
                            <ul className='flex justify-center text-sm lg:text-base'>
                                <li className='flex'><a href='#rooms' className='hover:underline'>Rooms</a><span className='my-auto mx-2'><BsDot size={25} /></span></li>
                                <li className='flex'><a href='#services' className='hover:underline'>Services</a><span className='my-auto mx-2'><BsDot size={25} /></span></li>
                                <li className='flex'><a href='#photos' className='hover:underline'>Photos</a><span className='my-auto mx-2'><BsDot size={25} /></span></li>
                                <li><a href='#about' className='hover:underline'>About</a></li>
                            </ul>
                        </div>

                    </div>

                    <div className='text-center md:text-center lg:text-center pt-10 border-t-2'>
                        <p className='text-xs'>Copyright &copy; {date.getFullYear()} All Rights Reserved</p>
                    </div>
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