import React, { useState } from 'react'
import Button from '../../Button';
import WidgetStatus from '../../widgetStatus';
import ImageDemo from '../../utils/ImageDemo';
import validateRoomGallery from '../../validation/room/roomgalleryadd';
import axios from 'axios';
import RemoveBedButton from './RemoveBedButton';
import InputText from '../../utils/InputText';
import InputTextBox from '../../utils/InputTextBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RoomGallery({ color, language, currentProperty, roomId,setDisp }) {
    // Image Template
    const imageTemplate = {
        property_id: currentProperty?.property_id,
        image_link: '',
        image_title: '',
        image_description: '',
        image_category: '',
        imageFile: ''
    }
    const [error, setError] = useState({})
    const [spin, setSpin] = useState(0)
    const [spinner, setSpinner] = useState(0)
    const [flag, setFlag] = useState(0)

    // Images Mapping
    const [imageData, setImageData] = useState([imageTemplate]?.map((i, id) => { return { ...i, index: id } }))

    const addPhotos = () => {
        setImageData([...imageData, imageTemplate]?.map((i, id) => { return { ...i, index: id } }))
    }

    const removeImage = (index) => {
        const filteredImages = imageData.filter((i, id) => i.index !== index)
        setImageData(filteredImages)
    }

    const onChangePhoto = (e, index, i) => {
        setImageData(imageData?.map((item, id) => {
            if (item.index === index) {
                item[i] = e.target.files[0]
            }
            return item
        }))
    }

    const onChangeImage = (e, index, i) => {
        setImageData(imageData?.map((item, id) => {
            if (item.index === index) {
                item[i] = e.target.value
            }
            return item
        }))
    }

    const uploadImage = (index) => {
        setSpin(1);
        const imageDetails = imageData?.find(i => i.index === index)?.imageFile
        const formData = new FormData();
        formData.append("file", imageDetails);
        formData.append("upload_preset", "Travel2Kashmir")
        axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
            .then(response => {
                const newData = imageData?.map((i) => {
                    if (i.index === index) {
                        i.image_link = response?.data?.secure_url
                    }
                    return i
                })
                setImageData(newData)
                setSpin(0);
            })
            .catch(error => {
                toast.error("Error uploading photo.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSpin(0);
            });

    }

    /** Function to submit room images **/
    const submitRoomImages = () => {
        const imagedata = imageData?.map((i => {
            return {
                property_id: currentProperty?.property_id,
                image_link: i.image_link,
                image_title: i.image_title,
                image_description: i.image_description,
                image_category: "room",
                room_id: roomId
            }
        }))
        var result = validateRoomGallery(imagedata);
        if (result === true) {
            setSpinner(1);
            const finalImage = { "images": imagedata }
            axios.post(`/api/gallery`, finalImage)
                .then(response => {
                    setSpinner(0);
                    toast.success(`API: ${JSON.stringify(response.data.message)}`);
                    setError({});
                    setDisp(4);
                })
                .catch(error => {
                    setSpinner(0)
                    toast.error("API: Gallery error.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }

        else {
            setError(result)
        }
    }


    return (
        <div className={`${color?.whitebackground} shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4`}>
            <WidgetStatus name={[`${language?.room} ${language?.description}`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]}
                selected={3}
                color={color} />
            <div className="mx-4">
                <div className="sm:flex">
                    <h6 className={`${color?.text} text-base  flex leading-none  pt-2 font-semibold `}>
                        {language?.room}  {language?.gallery}
                    </h6>
                    <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        <Button Primary={language?.Add} onClick={addPhotos} />
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                    <div>
                        {imageData?.map((imageData, index) => (
                            <>

                                {index != 0 && <RemoveBedButton color={color} onClickAction={() => removeImage(imageData?.index)} />}
                                <div className="p-6 space-y-6">
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-1/2 px-2">
                                            <label
                                                className={`text-sm  font-medium ${color?.text} block mb-2`}
                                                htmlFor="grid-password"
                                            >
                                                {language?.imageupload}
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type="file" name="myImage" accept="image/png, image/gif, image/jpeg, image/jpg"
                                                    onChange={e => {
                                                        onChangePhoto(e, imageData?.index, 'imageFile'); setFlag(1)
                                                    }}
                                                    className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                                    defaultValue="" />

                                            </div>
                                            <div className="col-span-6 mt-2 sm:col-span-3">
                                                <p className="text-sm text-red-700 font-light">
                                                    {error?.[index]?.image_link}</p>
                                                {spin === 0 ? (
                                                    <Button
                                                        Primary={language?.Upload}
                                                        onClick={() => uploadImage(imageData?.index)}
                                                    />
                                                ) : (
                                                    <Button Primary={language?.SpinnerUpload} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 px-2 my-2">

                                            {/* displays image once it is loaded else demoImage */}
                                            {imageData.image_link !== "" ?
                                                <img className={`py-2 ${color?.text} `} src={imageData?.image_link} alt='Image Preview' style={{ height: "150px", width: "250px" }} /> :
                                                <ImageDemo width={'250'} height={'150'} bgColor={'bg-gray-400'} />}

                                        </div>

                                        {/* image title */}
                                        <InputText
                                            label={`${language?.image} ${language?.titl}`}
                                            visible={1}
                                            defaultValue={''}
                                            onChangeAction={e => { onChangeImage(e, imageData?.index, 'image_title'); setFlag(1) }}
                                            error={error?.[index]?.image_title}
                                            color={color}
                                            req={true}
                                        />
                                       

                                        <InputTextBox
                                            label={`${language?.image} ${language?.description}`}
                                            visible={1}
                                            onChangeAction={e => { onChangeImage(e, imageData?.index, 'image_description'); setFlag(1) }}
                                            error={error?.[index]?.image_description}
                                            color={color}
                                            req={true}
                                            wordLimit={100}
                                        />
                                      
                                    </div>
                                </div></>
                        ))}
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                            <Button Primary={language?.Skip} onClick={() => { setDisp(4) }} />
                            {spinner === 0 && flag === 1 && <Button Primary={language?.Submit} onClick={submitRoomImages} />}
                            {spinner === 0 && flag === 0 && <Button Primary={language?.SubmitDisabled} />}
                            {spinner === 1 && flag === 1 && <Button Primary={language?.Spinnersubmit} />}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomGallery