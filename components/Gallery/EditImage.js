import React from 'react'
import Button from '../Button';
import {  validationGalleryEdit } from "../logic/property/Gallery";
import InputText from '../utils/InputText';

function EditImage({ language, color, error, setError, setSpinner, flag, setFlag, spinner, actionImage, setActionImage, currentProperty, setGallery, setImages, setEnlargedImage, setVisible, Router,updateImage,setAllHotelDetails,setEditImage,setEnlargeImage }) {
    return (
        
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                <div
                    className={`${color?.whitebackground} rounded-lg relative`}
                >


                    <div className="p-6 space-y-6">
                        <form id="editImage">
                            <div className=" md:px-4 mx-auto w-full">
                                <div className="flex flex-wrap">

                                    <div className="col-span-6 sm:col-span-3 mb-4 ml-4">
                                        <img
                                            src={actionImage?.image_link}
                                            alt="Property Image"
                                            height={"200"}
                                            width={"400"}
                                        />
                                    </div>


                                    {/* image description */}
                                    <InputText
                                        label={`${language?.image} ${language?.description}`}
                                        visible={1}
                                        defaultValue={actionImage?.image_description}
                                        onChangeAction={(e) =>
                                            setActionImage(
                                                {
                                                    ...actionImage,
                                                    image_description: e.target.value,
                                                },
                                                setFlag(1)
                                            )}
                                        error={error?.image_description}
                                        color={color}
                                        req={true}

                                    />
                                 
                                    {/* image title  */}
                                    <InputText
                                        label={`${language?.image} ${language?.titl}`}
                                        visible={1}
                                        defaultValue={actionImage?.image_title}
                                        onChangeAction={(e) =>
                                            setActionImage(
                                                {
                                                    ...actionImage,
                                                    image_title: e.target.value,
                                                },
                                                setFlag(1)
                                            )}
                                        error={error?.image_title}
                                        color={color}
                                        req={true}

                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="items-center p-6 border-t border-gray-200 rounded-b">
                        {flag !== 1 && spinner === 0 && <Button Primary={language?.UpdateDisabled} />}
                        {spinner === 0 && flag === 1 && <Button
                            Primary={language?.Update}
                            onClick={() => 
                                validationGalleryEdit(flag, actionImage, updateImage, setAllHotelDetails, setSpinner, setEditImage, currentProperty, setGallery, setImages, setEnlargedImage, setVisible, setEnlargeImage, setActionImage, setError, Router)}
                        />}

                        {spinner === 1 && flag === 1 && <Button Primary={language?.SpinnerUpdate} />}

                    </div>
                </div>
            </div>
        
    )
}

export default EditImage