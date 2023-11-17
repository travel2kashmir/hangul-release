import React, { useEffect, useState } from 'react';


const ImagesSlider = ({ images, visibleImage, setShowModal }) => {
  const [currentIndex, setCurrentIndex] = useState(visibleImage);
  useEffect(() => {
    setCurrentIndex(visibleImage)
  }, [visibleImage])

  const handlePrev = () => {
   setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 backdrop-blur-3xl h-screen bg-black/30 md:inset-0 z-50 flex justify-center items-center ">
      <div className="relative w-full max-w-2xl px-4 h-auto pt-20 md:pt-0 md:h-auto">
        <div className='bg-transparent rounded-lg shadow relative'>
          <div className="relative overflow-hidden">
          <button
              type="button"
              onClick={() => {
                setShowModal(0)
              }}
              className="absolute top-5 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="object-contain w-full h-full"
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4"
            >
              <svg
                className={"block cursor-pointer"}
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 0 24 24"
                width="28px"
               fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4"
            >
              {/* right arrow */}
               <svg
                xmlns="http://www.w3.org/2000/svg"
                className={"block cursor-pointer"}
                enableBackground="new 0 0 24 24"
                height="32px"
                viewBox="0 0 24 24"
                width="28px"
                fill="#ffffff"
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesSlider;
