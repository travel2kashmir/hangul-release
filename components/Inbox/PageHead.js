import React from 'react'

function PageHead({color,ItemShow,setPage,page,itemsPerPage,messagesFiltered,allDelete,handlecheckbox,setMessagesFiltered}) {
  return (
    <div className={`${color?.whitebackground}  sticky pt-2 sm:flex items-center w-full sm:justify-between bottom-0 right-0 `}>

                    <div className="flex items-center justify-start space-x-1 pl-0 sm:pl-4  sm:mt-0">
                        <div>
                            <input id="checkbox-all" checked={messagesFiltered?.filter(item => item?.isChecked !== true).length < 1}
                                onChange={(e) => { handlecheckbox(e,messagesFiltered,setMessagesFiltered); }}
                                aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                        <button data-tooltip="Delete" aria-label="Delete" onClick={allDelete} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text}  mr-2 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </span>
                    </div>

                    <div className="flex items-center mr-2 mb-4 sm:mb-0">
                        <span className={`text-sm font-normal ${color?.textgray}`}>Entries per page</span>
                        <select onChange={(e) => ItemShow(e)} className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block mr-2 ml-2 w-12 px-1.5  py-2`}>
                            <option selected disabled>{itemsPerPage}</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>

                        <a href="#" onClick={() => {
                            if (page > 1) {
                                setPage(page - 1);
                            }

                        }}
                            className={` ${color?.deltext}  hover:${color?.tabletext} cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <a onClick={() => {
                            if (page < Math.ceil(messagesFiltered?.length / itemsPerPage)) {
                                setPage(page + 1);

                            }
                        }} className={` ${color?.deltext}  hover:${color?.tabletext} cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <span className={` ${color?.deltext} text-sm font-normal text-gray-500`}>Showing <span className={` ${color?.deltext}text-gray-900 font-semibold">1-20</span> of <span className="text-gray-900 font-semibold`}>
                            {page} of {Math.ceil(messagesFiltered.length / itemsPerPage)} pages</span>
                        </span>
                    </div>

                </div>
  )
}

export default PageHead