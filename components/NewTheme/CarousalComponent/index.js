import React,{useState} from 'react'
import Carousel from 'better-react-carousel';
import Loader from '../Loaders/Loader';
import ImagesSlider from '../../utils/ImagesSlider';


function CarousalComponent({ type = 'review', data = [], title, id, hotelDetailLoader }) {
    const [imageSlideShow, setImageSlideShow] = useState(0);
    const [visibleImage, setVisibleImage] = useState();
    const [allImagesLink, setAllImagesLink] = useState([]);
 
    function activateImagesSlider(image_index, allImages) {
       setVisibleImage(image_index)
       setAllImagesLink(allImages.map(i => i.image_link))
       setImageSlideShow(1)
 
    }
    return (<>
        <section id={id} className={`px-5 py-10 ${type === 'room' ? '' : 'bg-slate-200'}`}>

            <div>
                {title ?
                    <div className='text-center pb-10'>
                        <h2 className="font-semibold text-2xl md:text-4xl">{title}</h2>
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
                                                <p className="text-center text-slate-500 tracking-wide">{resource?.review_content}</p>

                                                <p className='text-center text-slate-500 tracking-wide py-10'>{resource?.review_author}</p>
                                            </> :
                                            <img width="100%" 
                                            style={{ height: "350px" }} 
                                            className="rounded-lg" 
                                            src={resource?.image_link} 
                                            onClick={() => activateImagesSlider(index, data)}
                                            />
                                    }

                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                }


            </div>

        </section>
          <div className={imageSlideShow === 1 ? "block" : "hidden"}>
          <ImagesSlider
             visibleImage={visibleImage}
             images={allImagesLink}
             setShowModal={(e) => setImageSlideShow(e)} />

       </div>
       </>
    )
}

export default CarousalComponent