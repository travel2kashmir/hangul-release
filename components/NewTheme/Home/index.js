import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import Header from './Header';
import Loader from '../Loaders/Loader'
import Modal from '../modal';
import BookingForm from '../Booking';



function Home({ allHotelDetails, menu, setMenu, hotelDetailLoader, lang, setLang }) {

    const [showModalBooking, setShowModalBooking] = useState(0);

    return (
        <section className="relative h-screen md:h-screen z-50">
            <div className="absolute inset-0">
                {/* <div className="absolute inset-0 bg-[url('https://themewagon.github.io/sogo/images/slider-7.jpg')] bg-no-repeat bg-cover bg-center"></div> */}
                <div className="absolute inset-0 bg-[url('/imghome.webp')] bg-no-repeat bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <Header
                allHotelDetails={allHotelDetails}
                setMenu={setMenu}
                menu={menu}
                hotelDetailLoader={hotelDetailLoader}
                lang={lang}
                setLang={setLang}
            />

            <div className="contentBox relative text-center pt-32 pb-0 md:top-0 lg:top-5 xl:top-10">
                {hotelDetailLoader === 0 ? <Loader size={`h-8 w-32`} /> :
                    <>  <h1 className="text-white font-extralight tracking-widest text-sm md:text-xl lg:text-lg lg:font-normal 2xl:font-medium">{lang?.welcomeTo} {allHotelDetails?.star_rating} <i><StarIcon className="text-2xl" sx={{ color: 'orange' }} /> </i> {lang?.hotel}</h1></>}
                <h1 className="text-3xl px-6 font-bold mt-3 text-white font-bold md:text-6xl lg:text-7xl"> {hotelDetailLoader === 0 ? <Loader size='h-8 w-44 md:h-9 md:w-5/12 lg:h-16 lg:w-6/12' /> : allHotelDetails?.description_title} </h1>

                <div className=' lg:hidden mt-40'>
                    <button className='bookNow bg-white py-2 px-3 text-xs rounded-lg'
                        onClick={() => { setShowModalBooking(1) }}>
                        BOOK NOW
                    </button>
                </div>

                <div className={showModalBooking === 1 ? 'block h-2' : 'hidden'}>
                    <Modal
                        title='Booking Form'
                        description={<BookingForm />}
                        setShowModal={(e) => setShowModalBooking(e)}
                    />
                </div>
            </div>


            <style jsx>
                {`
                @media (min-width: 340px) and (max-width:390px) {
                    .contentBox {
                        position:relative;
                        top: 3rem;
                    }
                }
                @media (min-width: 390px) and (max-width:450px) {
                    .contentBox {
                        position:relative;
                        top: 10rem;
                    }
                }
                @media (min-height: 730px) and (max-height:760px) {
                    .contentBox {
                        position:relative;
                        top: 4rem;
                    }
                }
                @media (min-width: 765px) and (max-width:770px) {
                    .contentBox {
                        position:relative;
                        top: 11rem;
                    }
                }
                @media (min-width: 800px) and (max-width:920px) {
                    .contentBox {
                        position:relative;
                        top: 18rem;
                    }
                }    
                `}
            </style>

        </section>
    )
}

export default Home;