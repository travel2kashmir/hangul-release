import React from 'react'

function Modal({ title, description, setShowModal }) {

    return (
        <div className="overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 backdrop-blur-3xl h-screen bg-black/30 md:inset-0 z-50 flex justify-center items-center ">
            {/* <div className="overflow-y-scroll overflow-x-hidden fixed top-0 left-0 right-0 backdrop-blur-3xl  bg-white h-screen z-50 md:bg-black/30 md:inset-0 md:flex md:justify-center md:items-center "> */}
            <div className="relative w-full md:w-8/12 lg:w-5/12  h-auto pt-0 md:pt-0 md:h-auto">
                {/* <div className="relative w-6/12 max-w-full px-0 my-auto"> */}
                <div className='bg-white rounded-lg shadow relative'>
                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 className='text-black text-xl font-semibold'>{title}</h3>
                        <button
                            onClick={() => {
                                setShowModal(0)
                            }}
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

                    <div className='px-5 pt-2 pb-3'>
                        <p className='text-sm text-slate-500 '>
                            {description}
                        </p>
                    </div>

                    {/* <div className='flex'>
                        <div className="items-start p-5 border-t border-gray-200 rounded-b">
                            <button
                                className="text-white bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                onClick={() => {
                                    setShowModal(0);

                                }}

                            >Close</button>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>
    )
}

export default Modal