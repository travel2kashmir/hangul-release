import React from 'react'

function RoomImage({check,handlecheckbox,item,setIndexImage,setActionEnlargeImage,setEnlargeImage}) {
    return (
        <React.Fragment>
            <div
                className="block py-1 text-blueGray-600  text-xs font-bold "
            >
                <div
                    className="relative cursor-pointer"
                    tooltip
                    title="Click here to view or edit."
                >
                    <a href="#" className="relative flex">
                        <input
                            type="checkbox"
                            id={item?.image_id}
                            tooltip
                            title={`Click here to delete image ${item.image_title}.`}
                            name={item?.image_id}
                            checked={item?.isChecked || false}
                            onClick={(e) => {
                                handlecheckbox(e);
                            }}
                            className="bottom-0 right-0 cursor-pointer absolute bg-gray-30 opacity-30 m-1 border-gray-300 text-cyan-600  checked:opacity-100 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded-full"

                        />

                        {check?.length === 0 || check?.length === undefined ? (
                            <img
                                htmlFor={item?.image_id}
                                className={`rounded-lg`}
                                src={item.image_link}
                                alt="Room Image"
                                style={{ height: "170px", width: "450px" }}
                                onClick={() => {
                                    setEnlargeImage(1);
                                    setActionEnlargeImage(item);
                                    setIndexImage(item?.idx);
                                }}
                            />
                        ) : (
                            <img
                                htmlFor={item?.image_id}
                                className={`rounded-lg`}
                                src={item.image_link}
                                alt="Room Image"
                                style={{ height: "170px", width: "450px" }}
                            />
                        )}
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RoomImage