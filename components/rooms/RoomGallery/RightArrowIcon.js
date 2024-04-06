function RightArrowIcon({setActionEnlargeImage,roomimages,indexImage,setIndexImage}) {
  return (
    <div className="flex justify-end mr-2 ml-auto">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    indexImage <= 0 ? "hidden" : "block py-1 cursor-pointer"}

                  onClick={() => {

                    setActionEnlargeImage(roomimages?.filter((i, idx) => idx === indexImage + 1)
                      .map((j) => {
                        return {
                          image_id: j?.image_id,
                          image_title: j?.image_title,
                          idx: indexImage + 1,
                          image_description: j?.image_description,
                          image_link: j?.image_link,
                        };
                      })?.[0]);
                    setIndexImage(indexImage + 1);

                  }}
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
              </div>
  )
}

export default RightArrowIcon