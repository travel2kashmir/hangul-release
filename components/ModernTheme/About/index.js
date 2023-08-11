import React, { useState,useEffect } from 'react'
import Animation from '../Animation';


function About({ hotelData, initialThemeColor }) {
  const[allHotelDetails,setAllHotelDetails]=useState({})
  const[themeColor,setThemeColor]=useState({})
  useEffect(() => {
    setAllHotelDetails(hotelData)
    setThemeColor(initialThemeColor)
    if (hotelData.length != 0) {
      Animation("#about-title", "y")
      Animation("#description-title", "y")

    }
  }, [hotelData,initialThemeColor])

  useEffect(()=>(console.log(themeColor)),[themeColor])
  return (
    <section id='about'>
      <div className={`pt-32 pb-28 md:pb-20  ${themeColor.colorTransition}`}>
      
        <div className={`mx-8 ${themeColor.textColor} text-center md:flex md:gap-20`}>
          <div className='mx-4'>
            <div className='headingBlock md:w-52 '>
              <h3 id='about-title' className=' text-4xl lg:text-5xl font-bold tracking-widest' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
              
                {allHotelDetails.length != 0 ? `A LITTLE ABOUT US` : ``}</h3>
            </div>
            <div className='my-5'>
              <div className=' px-6 bg-white inline-block' style={{ height: '2px' }}></div>
            </div>
            <div className=''>
              <h3 id='description-title' className='text-xl font-bold tracking-widest mb-10' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>{allHotelDetails?.description_title}</h3>
            </div>
          </div>

          <div>
            <div id='description-body' className='text-sm mx-6 md:mx-4  md:pt-4 lg:pt-4' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>{allHotelDetails?.description_body}</div>
          </div>

        </div>
      </div>

      <style jsx>
        {`         
                @media (min-width: 1024px) {
                    .headingBlock {
                        width:400px;
                    }
                }
                @media (min-width: 1280px) {
                    .headingBlock {
                        width:500px;
                    }
                }              
       `}
      </style>
    </section>
  )
}

export default About