import React from 'react'
import Carousel from 'better-react-carousel';
import Loader from '../Loaders/Loader';


function CarousalComponent({ type = 'review', data = [], title, id, hotelDetailLoader, themeColor }) {
    return (
        <section id={id} className={`px-5 py-10 ${type === 'room' ? '' :  themeColor.colorTransition}`}>
                <div className='pt-10'>
                    {title ?
                        <div className='mx-4 mb-10 text-center'>
                            <h3 className={`${themeColor.textColor} text-2xl md:text-3xl lg:text-3xl font-normal tracking-widest border-b-2 border-white inline-block`}>{title}</h3>
                        </div>


                        : <></>
                    }
                    {hotelDetailLoader === 0 ?
                        <Loader size={`w-full h-56 md:h-64 rounded-lg`} /> :
                        <Carousel cols={1} rows={1} gap={10} autoPlay={1000} loop={true}
                            responsiveLayout={[
                                {
                                    breakpoint: 480,
                                    cols: title === 'review' ? 2 : 1,
                                    rows: 1,
                                    gap: 10,
                                    loop: true,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 810,
                                    cols: 2,
                                    rows: 1,
                                    gap: title === 'review' ? 20 : 10,
                                    loop: true,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 1020,
                                    cols: 2,
                                    rows: 1,
                                    gap: 10,
                                    loop: true,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 1024,
                                    cols: title === 'review' ? 2 : 1,
                                    rows: 1,
                                    gap: 10,
                                    loop: true,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 1280,
                                    cols: title === 'review' ? 2 : 1,
                                    rows: 1,
                                    gap: 10,
                                    loop: true,
                                    autoplay: 1000
                                },
                            ]}
                        >
                            {data?.map((resource, index) => {
                                return (
                                    <Carousel.Item key={index} >
                                        {
                                            type === 'review' ?
                                                <>
                                                    <p className={`text-center ${themeColor.textColor} tracking-wide`}>{resource?.review_content}</p>

                                                    <p className={`text-center ${themeColor.textColor} tracking-wide py-10`}>{resource?.review_author}</p>
                                                </> :
                                                <img width="100%" style={{ height: "350px" }} className="rounded-lg" src={resource?.image_link} />
                                        }

                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    }


                </div>


        </section>
    )
}

export default CarousalComponent