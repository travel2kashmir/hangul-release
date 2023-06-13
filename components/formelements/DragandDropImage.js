import { useState } from "react";
function DragandDropImage({onChangePhoto,color}) {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
        onChangePhoto(e);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  return (
    <>
      <div className={`h-auto w-auto flex justify-center items-center  px-2`}>
        <div className="p-3 md:w-1/2 w-[360px] rounded-md">
          <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
            {message}
          </span>
          
          {files.length === 0 ?
          <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full opacity-0 z-10 absolute"
            multiple="multiple"
            name="files[]"
            disabled={files.length!=0?true:false}
          />
          <div className={`h-full w-full ${color?.greybackground} absolute z-1 flex justify-center items-center top-0`}>
            <div className={`flex flex-col ${color?.text}`}>
             <span className="text-[12px]">{`Drag and Drop a file`}</span>
            </div>
          </div>
        </div>:<></>}
          


          {/* to show selected image */}
          <div className="flex flex-wrap mt-2">
            {files.map((file, key) => {
              return (
                <div
                  key={key}
                  className="w-full h-16 flex items-start  rounded bg-white mb-16"
                >
                  <div className="flex flex-row items-center ">
                    <div className="h-32 w-48 ">
                      <img
                        className="w-full h-full rounded"
                        src={URL.createObjectURL(file)}
                        alt="uploaded image"
                      />
                    </div>
                    {/* <span className="truncate w-44">{file.name}</span> */}
                  </div>
                  <div
                    onClick={() => {
                      removeImage(file.name);
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-1 inline-flex items-center -mt-2"
                  >
                     <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DragandDropImage;
