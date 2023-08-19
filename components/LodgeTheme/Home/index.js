import React, { useEffect, useState } from 'react'
import BookingForm from '../../utils/BookingForm'
import Modal from '../Modals/Modal';

function Home({ allHotelDetails }) {

    const [showModalBooking, setShowModalBooking] = useState(0);
    const [finalSrc, setFinalSrc] = useState();
    
    useEffect(() => {
        let bigScreen = allHotelDetails?.images?.filter((i) => i.image_title === 'Cover')[0]?.image_link
        let largeScreenBg = bigScreen != undefined ? bigScreen : "/home6.jpg"
        let smallScreen = allHotelDetails?.images?.filter((i) => i.image_title === 'Cover-small')[0]?.image_link
        let smallScreenBg = smallScreen != undefined ? smallScreen : "/home1.jpg"
        setFinalSrc(window.innerWidth < 810 ? smallScreenBg : largeScreenBg)
    }, [window.innerWidth, allHotelDetails])

    return (
        <section
            id='home'
            className={`homeBg  z-20 md:h-screen lg:min-h-screen lg:h-fit bg-cover bg-no-repeat md:flex lg:flex-none`}
        >
            <img src={finalSrc} alt="" className='absolute -z-30 h-screen w-screen' />

            <div className='py-10 px-7 md:px-10 md:my-auto'>
                <div className='mb-5 md:pb-36'>
                    <div className='md:w-11/12'>
                        <h1 className='animate-slide-in uppercase text-white text-5xl md:text-8xl lg:text-8xl font-light'>
                            a world of luxury awaits introducing the {allHotelDetails?.property_name}
                        </h1>
                    </div>
                </div>

                <div className='md:flex'>
                    <div className='md:w-6/12'>
                        <p className='animate-slide-in  md:text-lg font-medium text-slate-100'>Immerse yourself in the breathtaking beauty of our coastal paradise, where the rhythmic sounds of the ocean waves provide a soothing backdrop to your stay.</p>
                    </div>

                    <div className='md:w-6/12'>
                        <div className='mt-5'>
                            <div className='flex justify-end'>
                                <div className='border rounded-full py-3 hover:bg-custom-hover-brown hover:cursor-pointer text-white hover:text-black'>
                                    <a onClick={() => setShowModalBooking(1)}> <span className=' px-10 uppercase  font-bold'>book now</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ---------------booking form for small and medium screen--------------- */}
            {showModalBooking === 1 ?
                <Modal
                    description={<BookingForm />}
                    setShowModal={(e) => setShowModalBooking(e)}
                />
                : <></>}


            <style jsx>
                {`
                @media (max-width: 700px) {
                    .homeBg {
                        height:75vh;
                    }
                }
                 
                `}
            </style>

        </section>
    )
}

export default Home