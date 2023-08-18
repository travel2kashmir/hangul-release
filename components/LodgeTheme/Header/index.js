import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import ContactUsModal from '../../ModernTheme/Modals/ContactUsModal';
import Loader from '../Loaders/Loader';

function Header({ allHotelDetails, hotelDetailLoader, menu, setMenu }) {

  const [showModalContactUs, setShowModalContactUs] = useState(0);

  return (
    <section className='border-b-2 bg-custom-brown'>

      <div className='md:flex md:justify-center'>

        <div className='px-3 py-2 md:w-7/12 lg:w-8/12  flex justify-between md:flex-row-reverse'>

          <div className='lg:w-6/12 flex'>
            {hotelDetailLoader === 0 ? <div className='mx-auto'><Loader size={`h-12 w-40`} /></div> :
              <div className='border border-black inline-block mx-auto'>
                <p className='px-4 py-2 text-xl font-medium uppercase'>
                  {allHotelDetails.property_name}
                </p>
              </div>
            }

          </div>

          {/* only for small and medium screen */}
          <div className='my-auto lg:hidden'>
            <i onClick={() => setMenu(1)}><IoIosMenu size={30} /></i>
          </div>

          {/* only for large screen  */}
          <div className='hidden lg:block my-auto lg:px-10 lg:w-6/12'>
            <ul className='flex text-lg'>
              <li><a href='#home' className='pr-5 cursor-pointer hover:underline'>Home</a></li>
              <li><a href='#rooms' className='pr-5 cursor-pointer hover:underline'>Rooms</a></li>
              <li><a href='#photos' className='pr-5 cursor-pointer hover:underline'>Gallery</a></li>
              <li><a href='#services' className='pr-5 cursor-pointer hover:underline'>Services</a></li>
            </ul>
          </div>

        </div>

        <div className='hidden md:block md:flex md:justify-end md:my-auto md:w-5/12 lg:w-4/12'>
          <div className='flex hover:cursor-pointer hover:underline'>
            <span className='my-auto'><CiMail /></span>
            <span className='ml-2' onClick={() => { setShowModalContactUs(1) }}> Contact</span>
          </div>

          <div className='flex ml-5 md:mr-10'>
            <span className='my-auto'><SlCalender /></span>
            <span className='ml-2'> BOOK NOW</span>
          </div>

        </div>

      </div>



      {/* modal for contact us*/}
      <div className={showModalContactUs === 1 ? "block" : "hidden"}>
        <ContactUsModal
          setShowModalContactUs={setShowModalContactUs}
          property_id={allHotelDetails?.property_id}
        />

        {/* <ContactUsModal
          setShowModalContactUs={setShowModalContactUs}
        /> */}
      </div>

    </section>
  )
}

export default Header