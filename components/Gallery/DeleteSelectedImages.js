import Button from "../Button"

function DeleteSelectedImages({color,language,spinner,deleteMultiple,setdeleteImage,check, currentProperty, setSpinner, setGallery, setImages, setEnlargedImage, setVisible, Router}) {
  return (
    <div
    className={`rounded-lg  relative ${color?.whitebackground}`}
  >
    <div className="p-6 pt-0 text-center">
      <svg
        className="w-20 h-20 text-red-600 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3
        className={`text-base font-normal ${color?.deltext} mt-5 mb-6`}
      >
        {language?.areyousureyouwanttodelete}
      </h3>
        
      {spinner === 0 ? (
        <>
          <Button
            Primary={language?.Delete}
            onClick={() => deleteMultiple(check, currentProperty, setSpinner, setGallery, setImages, setEnlargedImage, setVisible, Router, setdeleteImage)}
          />
          <Button
            Primary={language?.Cancel}
            onClick={() => setdeleteImage(0)}
          />
        </>
      ) : (
        <Button Primary={language?.SpinnerDelete} />
      )}
    </div>
  </div>
  )
}

export default DeleteSelectedImages