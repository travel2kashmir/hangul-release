import React from 'react'
import Button from '../Button';
import { onChangePhoto, uploadImage, validationGallery } from "../logic/property/Gallery";
import ImageDemo from "../utils/ImageDemo";
import InputText from '../utils/InputText';

function AddNewImages({ language, color, error, setError, spin, setSpinner, flag,setFlag, spinner, actionImage, setActionImage, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage }) {
    return (
        <div className={`${color?.whitebackground} rounded-lg  relative`}>
            <form id="addgallery">
                <div className=" md:px-4 mx-auto w-full">
                    <div className="flex flex-wrap">

                        <div className="w-full lg:w-1/2">
                            <label
                                className={`text-sm ${color?.text} font-medium  block mb-2`}
                                htmlFor="grid-password"
                            >
                                {language?.imageupload}
                                <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <div className="flex">
                                <input
                                    type="file"
                                    name="myImage"
                                    accept="image/png, image/gif, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        onChangePhoto(e, "imageFile", image, setImage);
                                    }}
                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg  focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-2">
                                <p className="text-sm text-red-700 font-light">

                                </p>

                                {spin === 0 ? (
                                    <Button
                                        Primary={language?.Upload}
                                        onClick={() => uploadImage(setSpin, image, setImage)}
                                    />
                                ) : (
                                    <Button Primary={language?.SpinnerUpload} />
                                )}
                            </div>
                        </div>


                        <div className="w-full lg:w-1/2 mt-2">
                            {/* displays image once it is loaded else demoImage */}
                            {image?.image_link != undefined ?
                                <img
                                    className={` ${color?.text}`}
                                    src={image?.image_link}
                                    alt="Image Preview"
                                    style={{ height: "150px", width: "250px" }}
                                /> :
                                <ImageDemo width={'250'} height={'150'} bgColor={'bg-gray-400'} />}
                        </div>

                        {/* image title  */}
                        <InputText
                            label={`${language?.image} ${language?.titl}`}
                            visible={1}
                            onChangeAction={(e) =>
                                setActionImage(
                                    { ...actionImage, image_title: e.target.value },
                                    setFlag(1)
                                )}
                            error={error?.image_title}
                            color={color}
                            req={true}

                        />

                        {/* image description */}
                        <InputText
                            label={`${language?.image} ${language?.description}`}
                            visible={1}
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

                    </div>
                </div>
            </form>
            <div className="items-center p-6 border-t border-gray-200 rounded-b">
                {flag !== 1 && spinner === 0 && <Button Primary={language?.AddDisabled} />}
                {spinner === 0 && flag === 1 && <Button
                    Primary={language?.Add}
                    onClick={() => {
                        validationGallery(setError, flag, actionImage, setActionImage, setSpinner, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage);
                    }}
                />}
                {spinner === 1 && flag === 1 && <Button Primary={language?.SpinnerAdd} />}

            </div>
        </div>
    )
}

export default AddNewImages