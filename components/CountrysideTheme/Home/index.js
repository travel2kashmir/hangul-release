import React, { useState } from 'react'
import Header from '../Header';
import BookingForm from '../CustomizedUtils/BookingForm';
import Modal from '../Modals/Modal'


function Home({ allHotelDetails, hotelDetailLoader, setMenu, setShowBookingEngine, setRoomsLoader, enquiry, setEnquiry, setSearched, searched }) {

    const [showModalBooking, setShowModalBooking] = useState(0);

    return (
        // <section id='home' className='homeBg bg-[url("/home1.jpg")] lg:bg-[url("/home1.jpg")]  md:h-screen lg:min-h-screen lg:h-fit bg-cover bg-no-repeat md:flex lg:flex-none'>
        <section id='home' className='home-bg relative md:h-screen lg:min-h-screen lg:h-fit'>
            {/* this div is used to set the bg-image and set the opacity for it */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/CountrySide-home1.jpg')] bg-no-repeat bg-cover bg-center "></div>
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>

            <Header
                allHotelDetails={allHotelDetails}
                hotelDetailLoader={hotelDetailLoader}
                setMenu={(e) => setMenu(e)}
                setShowModalBooking={(e) => setShowModalBooking(e)}
            />


            <div className='relative flex mx-7 md:mx-20 home-bg items-center'>
                {/* content */}
                {/* <div className=' lg:w-8/12'> */}
                <div className='content-div'>
                    <div className='lg:mt-24'>
                        <div className='py-20 lg:pr-16'>
                            <div>
                                <p className='text-white text-sm font-bold tracking-wider font-family-jost-regular'>BEST PLACE FOR RELAX</p>
                                <h1 className='mt-5 animate-slide-in text-white text-4xl  md:text-5xl lg:text-7xl md:leading-relaxed font-light font-family-marcellus'>Perfect Countryside Vacation at {allHotelDetails?.property_name}</h1>
                                {/* <div className='pt-5'>
                                    <p className='content-div-discription animate-slide-in text-base leading-relaxed md:text-lg font-medium text-slate-100 tracking-wider font-family-jost-regular'>Nestled in Napa Valley, CozyStay Lodge is a luxury boutique hotel in the heart of wine country, conveniently located in the historic Napa Mill neighbourhood, just steps from some of the best wineries and restaurants.</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* book now btn for small screen */}
                <div className='pl-4 md:hidden'>
                    <button
                        className='bg-custom-yellow text-xs font-semibold text-white rounded-lg w-24 h-14 '
                        onClick={() => {
                            setShowModalBooking(1)
                        }}
                    >
                        BOOK NOW
                    </button>
                </div>



                {/* booking engine for lg screen*/}
                <div className='hidden booking-engine'>
                    <div className='mt-20'>
                        <div className='bg-custom-dark-green backdrop-opacity-20'>
                            <div className='p-2'>
                                <div className='px-8 pt-8 border-2 border-custom-yellow'>
                                    <div>
                                        <div className='text-center'>
                                            <div>
                                                <p className='text-xs text-white font-bold font-family-jost-regular'>CHOOSE DATE TO SEARCH</p>
                                                <h2 className='mt-2 text-white text-3xl font-medium tracking-wider font-family-marcellus'>BOOK YOUR STAY</h2>
                                            </div>
                                            <div className='text-white'>
                                                <BookingForm
                                                    setRoomsLoader={(e) => setRoomsLoader(e)}
                                                    setShowBookingEngine={(e) => setShowBookingEngine(e)}
                                                    setEnquiry={(e) => setEnquiry(e)}
                                                    enquiry={enquiry}
                                                    setSearched={(e) => setSearched(e)}
                                                    searched={searched}

                                                />
                                            </div>

                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>



            {/* ---------------booking form for small and medium screen--------------- */}
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

                        />
                    }
                    setShowModal={(e) => setShowModalBooking(e)}
                />
                : <></>
            }


            <style jsx>
                {`
               
                @media (max-width: 1000px) {
                    .home-bg {
                        height:89vh;
                    }
                }
                @media (max-width: 1100px) {
                    .booking-engine {
                        display:hidden;   
                    }
                    .content-div{
                        width:100%;
                    }

                }
                @media (min-width: 1101px) {
                    .booking-engine {
                        display:block;
                        width:33.33%;
                    }
                    .content-div {
                        width:66.66%;
                    }
                }
                @media (min-width: 1015px) and (max-width: 1200px) {
                    .content-div-discription{
                        font-size:15px;
                    }
                }
                 
                `}
            </style>

        </section>
    )
}

export default Home