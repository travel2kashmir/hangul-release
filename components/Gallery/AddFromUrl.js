import Button from "../Button";
import InputText from "../utils/InputText";

function AddFromUrl({language,color,error,setError,flag,setFlag,
    validationGallery, actionImage, setActionImage,spinner, setSpinner, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage}) {
  return (
    <>
         <form id="addurlgallery">
                  <div className=" md:px-4 mx-auto w-full">
                    <div className="flex flex-wrap">
                        {/* image link  */}
                        <InputText
                        label={language?.imagelink}
                        visible={1}
                        onChangeAction={(e) =>
                         setImage(
                              { ...image, image_link: e.target.value },
                              setFlag(1)
                            )}
                        error={error?.image_link}
                        color={color}
                        req={true}

                        />
                       
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
                 {flag !== 1 && spinner === 0 &&  <Button Primary={language?.AddDisabled} />} 
                 
                 {spinner === 0 && flag === 1 &&  <Button Primary={language?.Add}
                      onClick={() => {
                        validationGallery(setError, flag, actionImage, setActionImage, setSpinner, currentProperty, image, setImage, setGallery, setImages, setEnlargedImage, setVisible, Router, addImage, addURLImage, setAddImage, setAddURLImage);
                      }}
                    />}
                  
                  {spinner === 1 && flag === 1 && <Button Primary={language?.SpinnerAdd} />}
                  
                </div>
        </>
  )
}

export default AddFromUrl