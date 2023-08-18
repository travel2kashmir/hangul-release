import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import PhotoAlbum from "react-photo-album";
import ImagesSlider from '../../utils/ImagesSlider';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import Loader from '../Loaders/Loader';

function Photos({ allHotelDetails, hotelDetailLoader }) {

    const [photos, setPhotos] = useState([]);
    const [displayPhotos, setDisplayPhotos] = useState();
    const [imageSlideShow, setImageSlideShow] = useState(0);
    const [visibleImage, setVisibleImage] = useState();
    const [allImagesLink, setAllImagesLink] = useState([]);
    const [showText, setShowText] = useState({
        'label': 'SHOW MORE',
        'icon': <AiOutlineArrowDown className='inline-block ml-1' />,
        'tap': false
    });

    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1,    // Trigger animation when 10% of the element is in view
    });


    useEffect(() => {
        images();
    }, [allHotelDetails])

    let temp = [];

    function images() {
        // Function to generate a random integer between min (inclusive) and max (inclusive)
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        allHotelDetails?.images?.map((img, index) => {
            // Generate random width and height values
            const randomWidth = getRandomInt(500, 1000); // Random width between 500 and 1000
            const randomHeight = getRandomInt(400, 800); // Random height between 400 and 800

            return (
                temp.push(
                    {
                        src: img?.image_link,
                        width: randomWidth,
                        height: randomHeight,
                        index: index,
                    }
                )
            );
        });
        setDisplayPhotos(temp.slice(0, 7));
        setPhotos(temp)
        // console.log(temp)
    }


    function activateImagesSlider(image_index, allImages) {
        setVisibleImage(image_index)
        setAllImagesLink(allImages.map(i => i.src))
        setImageSlideShow(1)
    }

    return (
        <section id='photos' className='py-10 bg-custom-brown '>
            <div ref={ref} className={`mx-2 md:mx-12 ${inView ? 'animate-slide-in' : 'opacity-0'}`} >
                <div className='mx-4 mb-10 md:mb-16 text-center'>
                    <h3 className='text-4xl lg:text-6xl font-normal text-slate-700'>GALLERY</h3>
                </div>

                {hotelDetailLoader === 0 ? <Loader size={`h-72 w-full`} /> :
                    <PhotoAlbum layout="rows" spacing={5} photos={displayPhotos} onClick={({ index }) => activateImagesSlider(index, displayPhotos)} />
                }

                <p className='text-center uppercase mt-5 hover:underline'>
                    <a className='cursor-pointer hover:text-blue-500' onClick={() => {
                        // on the bases of showText.tap value we will set the photos to be displayed.
                        showText.tap === true ? setDisplayPhotos(photos.slice(0, 7)) : setDisplayPhotos(photos);

                        setShowText((prevShowText) => ({
                            // initially tap is false so when onClick function will work it will display in label show less and same logic will work for icon 
                            'label': prevShowText.tap === true ? 'SHOW MORE' : 'SHOW LESS',
                            'icon': prevShowText.tap === true ? <AiOutlineArrowDown className='inline-block ml-1' /> : <AiOutlineArrowUp className='inline-block ml-1' />,
                            'tap': !prevShowText.tap
                        }))
                    }}>
                        {showText.label}
                        {showText.icon}

                    </a>
                </p>

                <div className={imageSlideShow === 1 ? "block" : "hidden"}>
                    <ImagesSlider
                        visibleImage={visibleImage}
                        images={allImagesLink}
                        setShowModal={(e) => setImageSlideShow(e)} />

                </div>
            </div>
        </section>
    )
}

export default Photos;
