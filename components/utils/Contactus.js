import React,{useState} from 'react'

function Contactus({color,language}) {
    const [error,setError]=useState({})
  return (
   <div className={`${color?.whitebackground} rounded-lg shadow relative border`}>
            <div className="flex items-start justify-between p-5  rounded-t">
                <h3 className={`${color?.text} text-4xl font-bold mx-auto`}>Contact Us</h3>
            </div>
                
            <form action="#" className="space-y-1 mx-10 my-2 lg:space-y-0">
                <div>
                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${color?.textgray}`}>{language?.email}</label>
                    <input
                        onChange={(e) => {
                            // setContact({
                            //     ...contact,
                            //     contact_email: e.target.value,
                            // })
                        }}

                        type="email" id="email" className={`shadow-sm ${color?.greybackground} border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black`} placeholder="name@mail.com" required />
                    <p className="text-sm text-red-700 font-light">{error?.contact_email}</p>
                </div>

                <div className='pt-2'>
                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${color?.textgray} `}>{language?.name}</label>
                    <input
                        onChange={(e) => {
                            // setContact({
                            //     ...contact,
                            //     contact_name: e.target.value,
                            // })
                        }}
                        type="text" id="name" className={`shadow-sm ${color?.greybackground} border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black`} placeholder="John Snow" required />
                    <p className="text-sm  text-red-700 font-light">{error?.contact_name}</p>
                </div>

                <div className='pt-2'>
                    <label htmlFor="number" className={`block mb-2 text-sm font-medium ${color?.textgray} `}>{language?.contact}</label>
                    <input
                        onChange={(e) => {
                            // setContact({
                            //     ...contact,
                            //     contact_phoneNumber: e.target.value,
                            // })
                        }}
                        type="number" id="number" className={`shadow-sm ${color?.greybackground} border border-gray-300  text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-400 dark:text-black`} placeholder="123-233-3232" required />
                    <p className="text-sm  text-red-700 font-light">{error?.contact_phoneNumber}</p>
                </div>

                <div className='pt-2'>
                    <label htmlFor="subject" className={`block mb-2 text-sm font-medium ${color?.textgray}`}>{language?.subject}</label>
                    <input
                        onChange={(e) => {
                            // setContact({
                            //     ...contact,
                            //     contact_subject: e.target.value,
                            // })
                        }}
                        type="text" id="subject" className={`shadow-sm block p-3 w-full text-sm ${color?.greybackground} rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-black`} placeholder="Let us know how we can help you" required />
                    <p className="text-sm  text-red-700 font-light">{error?.contact_subject}</p>
                </div>

                <div className="sm:col-span-2 pt-2">
                    <label htmlFor="message" className={`block mb-2 text-sm font-medium ${color?.textgray}`}>{language?.message}</label>
                    <textarea
                        onChange={(e) => {
                            // setContact({
                            //     ...contact,
                            //     contact_message: e.target.value,
                            // })
                        }}
                        id="message" rows="4" className={`block p-2.5 w-full text-sm ${color?.textgray} ${color?.greybackground} rounded-lg shadow-sm `} placeholder="Leave a comment..."></textarea>
                    <p className="text-sm  text-red-700 font-light">{error?.contact_message}</p>
                </div>

                <div className='flex justify-center p-5'>
                    <button
                        onClick={() => alert("SubmitContact()")}
                        className="mx-auto py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-cyan-700 sm:w-fit hover:bg-cyan-950 focus:ring-4 focus:outline-none">
                          {language?.send} {language?.message}
                            </button>
                </div>

            </form>

        </div>
  )
}

export default Contactus