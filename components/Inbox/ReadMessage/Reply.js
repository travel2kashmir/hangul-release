import axios from "axios";
let mulImages =[];
let i=0;
function Reply({submitReply,color,messageDetails,setImageData,imageData,setFlag,replyMessage,setReplyMessage,emojiState,setEmojiState}) {
   
   
    /* Function to upload logo to cloud*/
   const uploadImage = (imageDetails,index) => {
     const formData = new FormData();
     formData.append("file", imageDetails);
     formData.append("upload_preset", "Travel2Kashmir")
     const att_link = axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
       .then(response => {
         return response?.data?.secure_url
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
       });
       return att_link;
   }


    const onChangePhoto =async (e, index, i) => {
       const link= await  uploadImage(e.target.files[0],"na");
       setImageData(imageData?.map((item, id) => {
        const data={
                "image_title" : e.target.files[0].name, //verify this
                "image_link": link
            }
        mulImages.push(data)
            return data
        }))
      }

  return (
    <div id="replymessage">
                        <div className='px-6 my-5'>
                            <input type="text" data-testid="test_email" required className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue={messageDetails?.[i]?.sender_email} />
                        </div>

                        <div className='px-6 my-5'>
                            <textarea data-testid="test_message" rows="6" columns="50" defaultValue="" required
                                onChange={
                                    (e) => (
                                        setReplyMessage({ ...replyMessage, message: e.target.value }, setFlag(1))
                                    )
                                }
                                className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                placeholder="Write text here..." />
                        </div>
                     
                        {mulImages?.map((item, index) => (
                            <>
                            {imageData?.image_title != "" ?
                            
                        <div className="p-4 mx-6 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert" key={index}>
                         <span className="font-medium">{item?.image_title}</span>
                        </div>:<></>}
                        </>))}
                        <div className='flex space-x-3 items-center px-6 my-3'>
                            {/* submit reply button start  */}
                            <button onClick={submitReply}
                                className="sm:inline-flex  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                                <span className='mr-3'>
                                    Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white flex-shrink-0 transition duration-75" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" /></svg>
                            </button>
                            {/* submit reply button end  */}

                            {/* emoji adding option start */}
                            <span onClick={() => { setEmojiState(!emojiState) }} className={`${color?.textgray} hover:${color?.text}  mr-1 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6  flex-shrink-0  transition duration-75" fill="currentColor"
                                    enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none" /></g><g><g /><g><circle cx="15.5" cy="9.5" r="1.5" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M12,18c2.28,0,4.22-1.66,5-4H7C7.78,16.34,9.72,18,12,18z" /><path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M12,20 c-4.42,0-8-3.58-8-8c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z" /></g></g></svg>
                            </span>
                            {/* emoji adding option end*/}
                            {/* attachement file start  */}
                            <label>
                                <span className={`${color?.textgray} hover:${color?.text}  mr-1 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                    <input type="file" className='absolute w-4 hidden' onChange={e => { uploadImage(e.target.files[0]) }} />
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6  flex-shrink-0  transition duration-75" fill="currentColor"
                                        viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" /></svg>
                                </span></label>
                            {/* attachement file end  */}
                            {/* attachment image start  */}
                            <label> <span className={`${color?.textgray}  hover:${color?.text}  mr-1 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                <input type="file" className='absolute w-4 hidden' accept="image/png, image/gif, image/jpeg, image/jpg"
                                    onChange={e => { 
                                        onChangePhoto(e, imageData?.length-1, 'imageFile')
                                      }} />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6  flex-shrink-0   transition duration-75" fill="currentColor"
                                ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" /></svg>
                            </span></label>
                            {/* attachment image end */}

                            {/* print option icon only start */}
                            <span className={`${color?.textgray} hover:${color?.text}  mr-1 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  flex-shrink-0  transition duration-75" fill="currentColor"
                                    viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" /><circle cx="18" cy="11.5" r="1" /></svg>
                            </span>
                            {/* print option icon end */}

                        </div>
                    </div>
  )
}

export default Reply