import React from 'react'
import Loader from '../Loaders/Loader';
import { useInView } from 'react-intersection-observer';


function About({ allHotelDetails, hotelDetailLoader }) {

    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1,    // Trigger animation when 10% of the element is in view
    });

    return (
        <section id='about' className='text-center bg-custom-brown'>
            <div className='py-10 px-5 md:px-32 lg:px-60'>
                <div>
                    <div className='mb-5'>
                        <div>
                            <h6 className='uppercase text-slate-600 '>welcome</h6>
                        </div>
                    </div>
                    {hotelDetailLoader === 0 ? <Loader size={`h-72 w-full`} /> :
                        <div className='mb-5 lg:mb-10'>
                            <p ref={ref} className={`text-slate-600 font-light text-xl md:text-2xl lg:text-3xl ${inView ? 'animate-slide-in' : 'opacity-0'}`}>
                                {allHotelDetails?.description_body}
                                {/* Whether you choose a spacious oceanfront suite or a cozy garden view room, our attentive staff is dedicated to ensuring your utmost comfort and satisfaction. */}
                            </p>
                        </div>
                    }



                    {/* send message commented for now and saved for future use */}
                    {/* <div>
                        <div className='flex justify-center'>
                            <div className='border border-black rounded-full py-2'>
                                <span className='uppercase px-8 font-medium'>send message</span>
                            </div>
                        </div>

                    </div> */}

                </div>
            </div>

        </section>
    )
}

export default About