import React, { useEffect, useState } from 'react'
import PhotoAlbum from "react-photo-album";
import ImagesSlider from '../../utils/ImagesSlider';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

function Photos({ allHotelDetails }) {

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
        <div>
            <PhotoAlbum layout="rows" spacing={5} photos={displayPhotos} onClick={({ index }) => activateImagesSlider(index, displayPhotos)} />
            <p className='text-center uppercase mt-5'>
                <a className='cursor-pointer hover:text-blue-500' onClick={() => { 
                    // on the bases of showText.tap value we will set the photos to be displayed.
                    showText.tap === true ? setDisplayPhotos(photos.slice(0,7)) : setDisplayPhotos(photos);
                    
                    setShowText((prevShowText)=>({
                        // initially tap is false so when onClick function will work it will display in label show less and same logic will work for icon 
                        'label': prevShowText.tap === true ? 'SHOW MORE' : 'SHOW LESS',
                        'icon': prevShowText.tap === true ? <AiOutlineArrowDown className='inline-block ml-1' /> : <AiOutlineArrowUp className='inline-block ml-1' />,
                        'tap' : !prevShowText.tap 
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
    )
}

export default Photos;
