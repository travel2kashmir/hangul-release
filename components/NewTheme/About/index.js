import React from 'react'
import Loader from '../Loaders/Loader'

function About({allHotelDetails , hotelDetailLoader ,lang}) {
    return (
        <section id='about' className="bg-slate-200 px-5 md:px-20 py-10 lg:py-24 2xl:px-40 z=0">
            <div className="md:px-0 lg:flex lg:flex-row-reverse  lg:gap-20 xl:gap-10">
                <div className="pb-20 relative">
                    {/* <img className='rounded-md' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" ></img> */}
                    <img className='rounded-md' src="/aboutimg1.jpg" alt="image" ></img>
                    {/* <img className='rounded-full h-40 md:h-60 md:-right-5 absolute right-0 bottom-0 border-8 lg:h-60 lg:-right-5 lg:bottom-16 xl:bottom-0' src="https://themewagon.github.io/sogo/images/food-1.jpg" alt="image" ></img> */}
                    <img className='rounded-full h-40 md:h-60 md:-right-5 absolute right-0 bottom-0 border-8 lg:h-60 lg:-right-9 lg:bottom-5 xl:bottom-0' src="/aboutimg2.jpg" alt="image" ></img>
                </div>
                <div className=" lg:w-8/12" >
                    <h2 className="text-4xl font-semibold lg:text-5xl lg:mt-0 xl:mt-5">{lang?.welcome}</h2>
                    {hotelDetailLoader === 0 ?<Loader size={`h-48 w-11/12 md:h-32 lg:h-3/6 xl:h-3/6 my-5 `}/>:<p className="text-slate-500 py-5 text-base tracking-wide lg:w-5/6 2xl:text-lg">{allHotelDetails?.description_body}</p> }
                </div>
            </div>
        </section>
    )
}

export default About