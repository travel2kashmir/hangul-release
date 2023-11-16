import React from 'react'
import Carousel from 'better-react-carousel';
import Loader from '../Loaders/Loader';
import StarRatings from 'react-star-ratings';
import { useInView } from 'react-intersection-observer';



function CarousalComponent({ type = 'review', data = [], title, subtitle, id, hotelDetailLoader }) {

    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1,    // Trigger animation when 10% of the element is in view
    });

    return (
        <section id={id} className={`px-5 py-10 ${type === 'room' ? '' : 'bg-custom-brown'}`}>

            <div ref={ref} className={`${type === 'review' ? inView ? 'animate-slide-in' : 'opacity-0' : ''}`}>

                {subtitle ?
                    <div className='text-center mb-5 px-5'>
                        <h2 className="font-medium text-sm dark-green font-family-jost-regular">{subtitle}</h2>
                    </div>
                    : <></>}
                {title ?
                    <div className='text-center pb-10 px-5'>
                        <h2 className=" text-4xl md:text-5xl font-medium font-family-marcellus">{title}</h2>
                    </div>
                    : <></>
                }
                {hotelDetailLoader === 0 ?
                    <Loader size={`w-full h-56 md:h-64 rounded-lg`} /> :
                    <div className='md:px-5 lg:px-10'>
                        <Carousel cols={type === 'review' ? 3 : 1} rows={1} gap={10} autoPlay={false} loop={true}
                            responsiveLayout={[
                                {
                                    breakpoint: 480,
                                    cols: type === 'review' ? 2 : 1,
                                    rows: 1,
                                    gap: 10,
                                    loop: true,
                                    autoplay: false
                                },
                                {
                                    breakpoint: 810,
                                    cols: 1,
                                    rows: 1,
                                    gap: type === 'review' ? 20 : 10,
                                    loop: true,
                                    autoplay: false
                                },
                                {
                                    breakpoint: 1024,
                                    cols: type === 'review' ? 3 : 1,
                                    rows: 1,
                                    gap: 10,
                                    loop: true,
                                    autoplay: false
                                },

                            ]}
                        >
                            {data?.map((resource, index) => {
                                return (
                                    <Carousel.Item key={index} >
                                        {
                                            type === 'review' ?
                                                <div className='px-5'>
                                                    <div className='text-center mb-5'>
                                                        <StarRatings
                                                            rating={resource.review_rating}
                                                            starRatedColor="#FDCC0D"
                                                            starDimension='20px'
                                                            numberOfStars={5}
                                                            starSpacing='1px'
                                                            name='rating'
                                                        />
                                                    </div>
                                                    <p className="text-center text-slate-500 tracking-wide font-family-marcellus">{resource?.review_content}</p>
                                                    <p className='text-center text-slate-500 tracking-wide py-10 font-family-marcellus'>{resource?.review_author}</p>
                                                </div> :
                                                <img width="100%" className="rounded-lg carousel-img" src={resource?.image_link} />
                                        }
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>

                }


            </div>

            <style jsx>
                {`
                @media (max-width: 600px) {
                    .carousel-img{
                        height:20rem;
                    }
                }
                @media (min-width: 700px) {
                    .carousel-img{
                        height:30rem;
                    }
                }
                `}
            </style>
        </section>
    )
}

export default CarousalComponent