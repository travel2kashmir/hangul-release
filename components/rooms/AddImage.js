import React from 'react'
import Button from '../Button';
import axios from 'axios';
import ImageDemo from '../utils/ImageDemo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEditGallery } from '../validation/room';

function AddImage({ color, language, error, setError, image, setImage, actionImage, setActionImage, spinner, setSpinner, flag, setFlag, imageUploaded, setImageUploaded,setAddImage,currentProperty,currentroom,fetchImages }) {
    const onChangePhoto = (e, i) => {
        setImage({ ...image, imageFile: e.target.files[0] })
    }
    function validationImage() {
        var result = validateEditGallery(actionImage)
        if (result === true) {
                submitAddImage();
        }
        else {
            setError(result)
        }
    }

    /* Function to add images*/
  function submitAddImage() {
    if (actionImage.length !== 0) {
      const imagedata = [{
        property_id: currentProperty?.property_id,
        image_link: actionImage?.image_link,
        image_title: actionImage?.image_title,
        image_description: actionImage?.image_description,
        image_category: "room",
        room_id: currentroom
      }]
      const finalImage = { "images": imagedata }
      setSpinner(1);
      axios.post(`/api/gallery`, finalImage)
        .then(response => {
          setSpinner(0)
          toast.success("App: Image added success.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchImages();
          setActionImage([])
          setError({});
          setFlag([]);
          setAddImage(0);
          
        })
        .catch(error => {
          setSpinner(0);
          setError({})
          toast.error("App: Gallery error.", {
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
  }


    /* Function to upload image */
    function uploadImage() {
        const imageDetails = image.imageFile
        const formData = new FormData();
        formData.append("file", imageDetails);
        formData.append("upload_preset", "Travel2Kashmir")

        axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
            .then(response => {
                setActionImage({ ...actionImage, image_link: response?.data?.secure_url })
                setImageUploaded(true)
            })
            .catch(error => {
                toast.error("App: Image upload error.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error('There was an error.', error);

            });

    }


    return (
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
            <div className={`${color?.whitebackground} relative`}>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className={`text-sm font-medium ${color?.text} block py-1 mb-2`}
                                htmlFor="grid-password"
                            >
                                {language?.image} {language?.upload}
                                <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <div className="flex">
                                <input
                                    type="file" name="myImage" accept="image/png, image/gif, image/jpeg, image/jpg"
                                    onChange={e => {
                                        onChangePhoto(e, 'imageFile');
                                    }}
                                    className={`${color?.greybackground} ${color?.text} shadow-sm  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full py-2 px-2.5`}
                                />
                            </div>
                            <div className="col-span-6 mt-2 sm:col-span-3">
                                <p className="text-sm  text-red-700 font-light">
                                    {error?.image_link}</p>
                                <Button Primary={language?.Upload} onClick={uploadImage} />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-2">
                            {/* displays image once it is loaded else demoImage */}
                            {actionImage?.image_link != undefined ?
                                <img className={`py-2 ${color?.text} `} src={actionImage?.image_link} alt='Image Preview' style={{ height: "150px", width: "250px" }} /> :
                                <ImageDemo width={'250'} height={'150'} bgColor={'bg-gray-400'} />}


                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className={`text-sm font-medium ${color?.text} block py-1 mb-2`}
                                htmlFor="grid-password"
                            >
                                {language?.image} {language?.titl}
                                <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <input
                                type="text"
                                onChange={(e) => (setActionImage({ ...actionImage, image_title: e.target.value }, setFlag(1)))}
                                className={`${color?.greybackground} ${color?.text} shadow-sm py-2  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block  w-full px-2.5`}
                            />
                            <p className="text-sm text-red-700 font-light">
                                {error?.image_title}</p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className={`text-sm font-medium ${color?.text} block py-1 mb-2`}
                                htmlFor="grid-password"
                            >
                                {language?.image} {language?.description}
                                <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <textarea rows="2" columns="60"
                                onChange={(e) => (setActionImage({ ...actionImage, image_description: e.target.value }, setFlag(1)))}
                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`}
                                defaultValue="" />
                            <p className="text-sm text-red-700 font-light">
                                {error?.image_description}</p>
                        </div>

                    </div>
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                    {spinner === 0 ? <><div className={(flag !== 1 || imageUploaded === false) ? 'block py-1' : 'hidden'}>
                        <Button Primary={language?.AddDisabled} />
                    </div>
                        <div className={(flag === 1 && imageUploaded === true) ? 'block py-1' : 'hidden'}>
                            <Button Primary={language?.Add} onClick={() => { validationImage(); }} />
                        </div>
                    </> : <div className={'block py-1'}>
                        <Button Primary={language?.SpinnerAdd} />
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default AddImage