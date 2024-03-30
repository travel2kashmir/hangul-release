import React from 'react'
import Button from '../Button'
import { validateEditGallery } from '../validation/room';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditRoomImage({color,language,actionImage,setActionImage,flag,setFlag,spinner,setSpinner,fetchImages,error,setError,addImage,setEditImage,fetchDetails,setAllRoomDetails}) {
  // Validate Image
  function validationImage(){
    var result = validateEditGallery(actionImage)
    if (result === true) {
        updateImageDetails();
      
    }
    else {
      setError(result)
    }
  }

  
  /* Function for Edit Room Images*/
  function updateImageDetails() {
    const final_data = {
      "image_id": actionImage?.image_id,
      "image_title": actionImage.image_title,
      "image_description": actionImage.image_description,
      "image_type": "room"
    }
    setSpinner(1)
    const url = '/api/images'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        setEditImage(0);
        setSpinner(0)
        toast.success("App: Room image details update success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchDetails();
        setActionImage([]);
        setError({});
        setAllRoomDetails([]);
        setFlag([])
      })
      .catch((error) => {
        setSpinner(0);
        setError({});
        toast.error("App: Room gallery update error.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })

  }


    return (
    <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className={`${color?.whitebackground} rounded-lg shadow-sm relative`}>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <img src={actionImage?.image_link} alt='Room Image' style={{ height: "200px", width: "400px" }} className={`py-2 ${color?.text} `} />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block py-1 mb-2`}
                        htmlFor="grid-password">
                        {language?.image} {language?.description}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <textarea rows="6" columns="60"
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`}
                        onChange={
                          (e) => (
                            setActionImage({
                              ...actionImage,
                              image_description: e.target.value
                            }, setFlag(1))
                          )
                        } defaultValue={actionImage?.image_description} />
                      <p className="text-sm  text-red-700 font-light">
                        {error?.image_description}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block py-1 mb-2`}
                        htmlFor="grid-password">
                        {language?.image} {language?.titl}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={actionImage?.image_title}
                        onChange={
                          (e) => (
                            setActionImage({
                              ...actionImage,
                              image_title: e.target.value
                            }, setFlag(1))
                          )
                        }
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`}
                      />
                      <p className="text-sm text-red-700 font-light">
                        {error?.image_title}</p>
                    </div>
                  </div>
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <div className={(spinner === 0 && flag !== 1) ? 'block py-1' : 'hidden'}>
                    <Button Primary={language?.UpdateDisabled} />
                  </div>
                  <div className={(spinner === 0 && flag === 1) ? 'block py-1' : 'hidden'}>
                    <Button Primary={language?.Update} onClick={validationImage} />
                  </div>


                  <div className={spinner === 1 ? 'block py-1' : 'hidden'}>
                    <Button Primary={language?.SpinnerUpdate} />
                  </div>
                </div>
              </div>
            </div>
  )
}

export default EditRoomImage