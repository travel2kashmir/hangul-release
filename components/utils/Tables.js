import React from 'react';
import Button from '../Button';
import searchFunction from '../searchFunction';
function Tables({ color, language, addEntity, deleteMultiple, cols = [], data = [{}] }) {

        return (
                <>   <div className="pt-6">
                        <div className=" md:px-2 mx-auto w-full">
                                <div className="sm:flex">
                                        <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                                                {/* search form */}
                                                <form className="lg:pr-3" action="#" method="GET">
                                                        <label htmlFor="users-search" className="sr-only">Search</label>
                                                        <div className="mt-1 relative lg:w-64 xl:w-96">
                                                                <input type="text" name="search" id="searchInput" onKeyUp={() => searchFunction('searchInput', 'table')}
                                                                        className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder='Search'>
                                                                </input>
                                                        </div>
                                                </form>
                                                {/* search form end */}
                                                {/* icons start */}
                                                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                                        </span>

                                                        <button onClick={() => { deleteMultiple() }} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                        </button>

                                                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                        </span>
                                                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                                        </span>

                                                </div>
                                                {/* icons end*/}
                                                {/* add start */}

                                                {addEntity ? <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 lg:ml-72 xl:ml-80 md:ml-64"
                                                        onClick={() => { addEntity?.action() }}>
                                                        {addEntity?.label}</button> : undefined}
                                                {/* add ends */}

                                        </div>
                                </div>
                                <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
                                        <div className="overflow-x-auto">
                                                <div className="align-middle inline-block min-w-full">
                                                        <div className="shadow overflow-hidden">

                                                                <table id='table'
                                                                        className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen">
                                                                        <thead className={` ${color?.tableheader} `}>
                                                                                <tr>
                                                                                        {cols.map((col, index) => {
                                                                                                return <th key={index} scope="col" className="p-4" >
                                                                                                        {col === "checkbox" ?
                                                                                                                <input type="checkbox" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                                                                : col}</th>
                                                                                        })}
                                                                                </tr>
                                                                        </thead>
                                                                        <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`}>
                                                                                {
                                                                                        data.map((item, key) => {
                                                                                                return (<tr key={key}>
                                                                                                        {cols.map((col, ID) => (
                                                                                                                <td key={ID} className={col === 'checkbox' ? "p-4 w-4" : `p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                                                                                                        {col === "Actions" ? <>{(item[col]?.map((i, idx) => {
                                                                                                                                return (
                                                                                                                                        <button key={idx} onClick={() => { i?.operation() }} className={`mx-1 bg-gradient-to-r ${i?.label == 'save' ? `bg-cyan-600 hover:bg-cyan-700` : `bg-red-600 hover:bg-red-700`} text-white  sm:inline-flex  
                                                                                                                                font-semibold
                                                                                                                                       rounded-lg text-sm px-5 py-2 text-center 
                                                                                                                                 items-center ease-linear transition-all duration-150`}>
                                                                                                                                                {i?.label}</button>
                                                                                                                                )
                                                                                                                        }))}
                                                                                                                        </> : col === 'checkbox' ? <><input type="checkbox" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" /></> : item[col]}
                                                                                                                </td>
                                                                                                        )
                                                                                                        )}
                                                                                                </tr>)
                                                                                        }
                                                                                        )
                                                                                }
                                                                        </tbody>
                                                                </table>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                </>)
}
export default Tables 
