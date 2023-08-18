import React from 'react'
import { useInView } from 'react-intersection-observer';
import Carousel from 'better-react-carousel';
import StarRatings from 'react-star-ratings';
import Loader from '../Loaders/Loader';

function Review({ data, hotelDetailLoader }) {

    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1,    // Trigger animation when 10% of the element is in view
    });

    return (
        <section className='bg-[url("/review7.jpg")]   bg-cover bg-no-repeat '>
            <div ref={ref} className={`py-10 px-5 lg:py-24 lg:px-24 text-white ${inView ? 'animate-slide-in' : 'opacity-0'}`}>
                <div>
                    <div className='mb-5'>
                        <div className='text-center'>
                            <h6 className='lg:text-lg '>TESTIMONIALS</h6>
                        </div>
                    </div>
                    {hotelDetailLoader === 0 ? <Loader size={`h-44 w-full`} /> :
                        <div className='lg:pt-10'>
                            <Carousel cols={1} rows={1} gap={10} autoPlay={5000} loop={false}
                                responsiveLayout={[
                                    {
                                        breakpoint: 480,
                                        cols: 1,
                                        rows: 1,
                                        gap: 10,
                                        loop: false,
                                        autoplay: 1000
                                    },
                                    {
                                        breakpoint: 810,
                                        cols: 1,
                                        rows: 1,
                                        gap: 20,
                                        loop: false,
                                        autoplay: 1000
                                    },
                                    {
                                        breakpoint: 1020,
                                        cols: 1,
                                        rows: 1,
                                        gap: 10,
                                        loop: false,
                                        autoplay: 1000
                                    },
                                    {
                                        breakpoint: 1024,
                                        cols: 1,
                                        rows: 1,
                                        gap: 10,
                                        loop: false,
                                        autoplay: 1000
                                    },
                                    {
                                        breakpoint: 1280,
                                        cols: 1,
                                        rows: 1,
                                        gap: 10,
                                        loop: false,
                                        autoplay: 1000
                                    },
                                ]}
                            >
                                {data?.map((resource, index) => {
                                    return (
                                        <Carousel.Item key={index} >

                                            <div className='text-center mb-5 lg:mb-14'>
                                                <StarRatings
                                                    rating={resource.review_rating}
                                                    starRatedColor="#FDCC0D"
                                                    starDimension='20px'
                                                    numberOfStars={5}
                                                    starSpacing='1px'
                                                    name='rating'
                                                />
                                            </div>


                                            <p className={`text-center text-xl  tracking-wide md:px-24 md:text-2xl lg:text-3xl font-light`}>{resource?.review_content}</p>

                                            <p className={`text-center  tracking-wide pt-10`}>{resource?.review_author}</p>


                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>

                        </div>
                    }

                </div>

            </div>
        </section>
    )
}

export default Review