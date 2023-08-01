import React, { useState } from 'react'
import { ValidateContactUs } from '../validation/themeContactus';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Contactus({ color, language, property_id }) {
    const [error, setError] = useState({})
    const [contact, setContact] = useState({})
    function sendQuery(e) {
        e.preventDefault();
        let result = ValidateContactUs(contact);
        if (result === true) {
            let data = {
                ...contact, property_id,
                "created_on": new Date(),
                "is_read": false,
                "is_starred": false,
                "is_deleted": false,
            }
            const url = `/api/inbox`;
            axios.post(url, data).then((response) => {
                toast.success("API: Message Sent Successfully!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                document.getElementById('contact-form').reset();
            }).catch((err) => { toast.error("API: Message Sent Failed!", {
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
        else {
            setError(result)
        }

    }
    return (
        <div className={`${color?.whitebackground} rounded-lg shadow relative border mb-4`}>
            <div className="flex items-start justify-between p-5  rounded-t">
                <h3 className={`${color?.text} text-4xl font-bold mx-auto`}>Contact Us</h3>
            </div>
                
            <form id='contact-form' className="space-y-1 mx-10 my-2 lg:space-y-0">
                <div>
                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${color?.textgray}`}>{language?.email}</label>
                    <input
                        onChange={(e) => {
                            setContact({
                                ...contact,
                                sender_email: e.target.value,
                            })
                        }}

                        type="email" id="email" className={`shadow-sm ${color?.greybackground} border border-gray-300  text-sm rounded-lg  block w-full p-2.5  ${color?.text}`} placeholder="name@mail.com" required />
                    <p className="text-sm text-red-700 font-light">{error?.sender_email}</p>
                </div>

                <div className='pt-2'>
                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${color?.textgray} `}>{language?.name}</label>
                    <input
                        onChange={(e) => {
                            setContact({
                                ...contact,
                                sender_name: e.target.value,
                            })
                        }}
                        type="text" id="name" className={`shadow-sm ${color?.greybackground} border border-gray-300  text-sm rounded-lg  block w-full p-2.5 ${color?.text}`} placeholder="John Snow" required />
                    <p className="text-sm  text-red-700 font-light">{error?.sender_name}</p>
                </div>

              

                <div className='pt-2'>
                    <label htmlFor="subject" className={`block mb-2 text-sm font-medium ${color?.textgray}`}>{language?.subject}</label>
                    <input
                        onChange={(e) => {
                            setContact({
                                ...contact,
                                message_subject: e.target.value,
                            })
                        }}
                        type="text" id="subject" className={`shadow-sm block p-3 w-full text-sm ${color?.greybackground} rounded-lg border border-gray-300 ${color?.text}`} placeholder="Let us know how we can help you" required />
                    <p className="text-sm  text-red-700 font-light">{error?.message_subject}</p>
                </div>

                <div className="sm:col-span-2 pt-2">
                    <label htmlFor="message" className={`block mb-2 text-sm font-medium ${color?.textgray}`}>{language?.message}</label>
                    <textarea
                        onChange={(e) => {
                            setContact({
                                ...contact,
                                message: e.target.value,
                            })
                        }}
                        id="message" rows="4"
                        className={`whitespace-pre-wrap block p-2.5 w-full text-sm ${color?.textgray} ${color?.greybackground} rounded-lg shadow-sm `} placeholder="Leave a comment..."></textarea>
                    <p className="text-sm  text-red-700 font-light">{error?.message}</p>
                </div>

                <div className='flex justify-center p-5'>
                    <button
                        onClick={(e) => sendQuery(e)}
                        className="mx-auto py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-cyan-700 sm:w-fit hover:bg-cyan-950 focus:ring-4 focus:outline-none">
                        {language?.send} {language?.message}
                    </button>
                </div>

            </form>
            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Contactus