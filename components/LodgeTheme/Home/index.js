import React, { useEffect, useState } from 'react'
import BookingForm from '../CustomizedUtils/BookingForm'
import Modal from '../Modals/Modal';


function Home({ allHotelDetails, setShowBookingEngine, setRoomsLoader, enquiry, setEnquiry, setSearched, searched,cookie}) {

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
            className={`homeBg z-20 md:h-screen lg:min-h-screen lg:h-fit bg-cover bg-no-repeat md:flex lg:flex-none`}
        >
            <img src={finalSrc} alt="" className='absolute -z-30 h-screen w-screen' />

            <div className='py-10 px-7 md:px-10 md:my-auto'>
                <div className='mb-5 md:pb-10'>
                    <div className='md:w-11/12'>
                        <h1 className='animate-slide-in uppercase text-white text-5xl md:text-8xl lg:text-8xl font-light'>
                            a world of luxury awaits introducing the {allHotelDetails?.property_name}
                        </h1>
                    </div>
                </div>

                <div className='md:flex'>
                    <div className='md:w-6/12'>
                        <p className='animate-slide-in text-white md:text-lg font-medium '>Immerse yourself in the breathtaking beauty of our coastal paradise, where the rhythmic sounds of the ocean waves provide a soothing backdrop to your stay.</p>
                    </div>

                    <div className='md:w-6/12'>
                        <div className='mt-5'>
                            <div className='flex justify-end'>
                                <div className='border rounded-full py-3 hover:bg-custom-hover-brown hover:cursor-pointer text-white hover:text-black'>
                                    <a onClick={() =>{
                                        if (cookie) {
                                            const user = JSON.parse(cookie);
                                            global.analytics.track(`User opened booking form`, {
                                               action: `User opened booking form`,
                                               user: user.user,
                                               time: Date()
                                            });
                                          }
                                          
                                        setShowModalBooking(1);} }> <span className=' px-10 uppercase  font-bold'>book now</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ---------------booking form --------------- */}
            {showModalBooking === 1 ?
                <Modal
                    title={'BOOK YOUR STAY'}
                    description={
                        <BookingForm
                            setRoomsLoader={(e) => setRoomsLoader(e)}
                            setShowBookingEngine={(e) => setShowBookingEngine(e)}
                            setEnquiry={(e) => setEnquiry(e)}
                            enquiry={enquiry}
                            setSearched={(e) => setSearched(e)}
                            searched={searched}
                            setShowModalBooking={(e) => setShowModalBooking(e)}
                            cookie={cookie}
                        />
                    }
                    setShowModal={(e) => setShowModalBooking(e)}
                    closeButton={false}
                />
                : <></>
            }


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