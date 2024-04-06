import React from 'react'

function LeftArrowIcon({indexImage,setIndexImage,setActionEnlargeImage,roomimages}) {
  return (
    <div className="flex justify-start ml-2 mr-auto">
              {/* //Left arrow symbol*/}

              <svg
                className={indexImage <= 0 ? "hidden" : "block py-1 cursor-pointer"}
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 0 24 24"
                width="28px"
                onClick={() => {

                  setActionEnlargeImage(roomimages?.filter((i, idx) => idx === indexImage - 1)
                    .map((j) => {
                      return {
                        image_id: j?.image_id,
                        image_title: j?.image_title,
                        idx: indexImage - 1,
                        image_description: j?.image_description,
                        image_link: j?.image_link,
                      };
                    })?.[0]);
                  setIndexImage(indexImage - 1);

                }}
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
              </svg>


            </div>
  )
}

export default LeftArrowIcon