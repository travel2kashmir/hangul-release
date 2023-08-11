import React, { useState } from 'react';
import Validation from '../Validation/ContactUsValidation';

function ContactUsModal({ setShowModalContactUs }) {

    const [contact, setContact] = useState({})
    const [error, setError] = useState({})
    function SubmitContact() {
        let result = Validation(contact);
        if (result === true) {
            // network call
        }
        else {
            setError(result)
        }
    }


    return (
        <div className="overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 backdrop-blur-3xl h-screen bg-black/30 md:inset-0 z-50 flex justify-center items-center sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-auto md:h-auto ">
                <div className='bg-white rounded-lg shadow relative'>
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className='text-black text-xl font-semibold'>Contact Us</h3>
                        <button
                            type="button"
                            onClick={(e) => setShowModalContactUs(e)
                            }
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                        </button>
                    </div>

                    <form action="#" className="space-y-1 mx-10 my-2 lg:space-y-0">
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your email</label>
                            <input
                                onChange={(e) => {
                                    setContact({
                                        ...contact,
                                        contact_email: e.target.value,
                                    })
                                }}

                                type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black" placeholder="name@mail.com" required />
                            <p className="text-sm text-red-700 font-light">{error?.contact_email}</p>
                        </div>

                        <div className='pt-2'>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your Name</label>
                            <input
                                onChange={(e) => {
                                    setContact({
                                        ...contact,
                                        contact_name: e.target.value,
                                    })
                                }}
                                type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black" placeholder="John Snow" required />
                            <p className="text-sm  text-red-700 font-light">{error?.contact_name}</p>
                        </div>

                        <div className='pt-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your Phone Number</label>
                            <input
                                onChange={(e) => {
                                    setContact({
                                        ...contact,
                                        contact_phoneNumber: e.target.value,
                                    })
                                }}
                                type="number" id="number" className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black" placeholder="123-233-3232" required />
                            <p className="text-sm  text-red-700 font-light">{error?.contact_phoneNumber}</p>
                        </div>

                        <div className='pt-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Subject</label>
                            <input
                                onChange={(e) => {
                                    setContact({
                                        ...contact,
                                        contact_subject: e.target.value,
                                    })
                                }}
                                type="text" id="subject" className="shadow-sm block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-black" placeholder="Let us know how we can help you" required />
                            <p className="text-sm  text-red-700 font-light">{error?.contact_subject}</p>
                        </div>

                        <div className="sm:col-span-2 pt-2">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your message</label>
                            <textarea
                                onChange={(e) => {
                                    setContact({
                                        ...contact,
                                        contact_message: e.target.value,
                                    })
                                }}
                                id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300  dark:text-black dark:placeholder-gray-400 dark:text-black " placeholder="Leave a comment..."></textarea>
                            <p className="text-sm  text-red-700 font-light">{error?.contact_message}</p>
                        </div>

                        <div className='flex justify-center p-5'>
                            <button
                                onClick={() => SubmitContact()}
                                className="mx-auto py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-800 sm:w-fit hover:bg-blue-950 focus:ring-4 focus:outline-none">Send Message</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default ContactUsModal