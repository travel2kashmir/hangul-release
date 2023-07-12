import React from 'react'

function Pagination({color={},page,setPage,data=[],itemsPerPage,ItemShow}) {
    return (
        <div className={`${color?.whitebackground} sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4`}>
            <div className="flex items-center w-64 mb-4 sm:mb-0">
                <button onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);
                    }

                }} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </button>

                <button onClick={() => {
                    if (page < Math.ceil(data?.length / itemsPerPage)) {
                        setPage(page + 1);

                    }
                }} className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center mr-2`}>
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </ button>

                <span className={`text-sm font-normal ${color?.textgray}`}>Showing

                    <span className={`${color?.text} font-semibold ml-1`}>{page}</span> of <span className={`${color?.text} font-semibold`}>
                        {Math.ceil(data?.length / itemsPerPage)}</span></span>

            </div>

            <div className="flex items-center w-42 space-x-3">
                <span className={`text-sm font-normal ${color?.textgray}`}>Entries per page</span>
                <select onChange={(e) => ItemShow(e)} className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block mr-2 w-12 px-3  py-1`}>
                    <option selected disabled>{itemsPerPage}</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>

            </div>
        </div>
    )
}

export default Pagination