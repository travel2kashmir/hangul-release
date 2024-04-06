import React from 'react'

function RemoveBedButton({ onClickAction, color }) {
    return (
        <div className="flex items-center justify-end space-x-2 sm:space-x-1 ml-auto">
            <button className={`${color?.cross} sm:inline-flex  ${color?.crossbg}
    font-semibold border  focus:ring-4 focus:ring-cyan-200 
    rounded-lg text-sm px-1 py-1 text-center 
    items-center mb-1 ml-16 ease-linear transition-all duration-150`}
                onClick={onClickAction} type="button" >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div >

    )
}

export default RemoveBedButton