import React, { useEffect, useState } from 'react';
import Animation from '../Animation';

function Home({ hotelData }) {
    const [allHotelDetails, setAllHotelDetails] = useState()
    const [photo, setPhoto] = useState('https://max-themes.net/demos/hotelmaster/hotelmaster-dark/upload/slider-1.jpg')
    useEffect(() => {
        setAllHotelDetails(hotelData)
        if (allHotelDetails?.length != 0) {
            Animation("#welcome-to", "y")
            Animation("#hotel-name", "y")
        }
        if (hotelData?.images != undefined) {
            let coverPhoto = hotelData?.images?.filter(i => i.image_title === 'Cover')
            if (coverPhoto.length != 0)
                setPhoto(coverPhoto[0]?.image_link)
        }

    }, [hotelData])


    return (
        <section className='relative h-screen'>
            <img src={photo} className={`absolute w-screen h-screen  -z-20 `} />
            <div className='relative z-40 text-center text-white m-auto pt-48'>
                <h2 id='welcome-to' className='text-base md:text-3xl lg:text-4xl lg:tracking-widest font-light tracking-widest' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
                    {allHotelDetails?.length != 0 ? `WELCOME TO` : ``}</h2>
                <div className='pb-1 md:py-5'>
                    <div className='dash px-3 md:px-7 h-0.5 bg-white inline-block rounded-md' ></div>
                </div>
                <h2 id='hotel-name' className=' text-2xl md:text-5xl lg:text-7xl lg:tracking-widest font-bold' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
                    {(allHotelDetails?.property_name)?.toUpperCase()}</h2>

            </div>
           
            

            <style jsx>
                {`
            
                @media (min-width: 1024px) {
                    .bgImg {
                        height:70vh;
                    }
                }
                @media (min-width: 768px) {
                    .dash {
                        height:3px;
                    }
                }
                 
                `}
            </style>


        </section>
    )
}

export default Home;