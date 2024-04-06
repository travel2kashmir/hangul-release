import React from 'react'

function Messages({readMessage,displayData,handlecheckbox,starMessage,color,messagesFiltered,setMessagesFiltered}) {
  return (
    <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden">
                                <table data-testid="test_inbox_table" className="table-fixed min-w-full divide-y divide-gray-200">
                                    <tbody className="divide-y divide-gray-200 ">
                                        {displayData?.map((item, idx) => (

                                            <>
                                                <tr className={`hover:${color?.tableheader}`}>
                                                    <td className="px-4 py-3 w-4">
                                                        <div className="flex items-center">
                                                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                                                name={item?.message_id} checked={item.isChecked || false}
                                                                onChange={(e) => { handlecheckbox(e,messagesFiltered,setMessagesFiltered); }}
                                                                className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                            {item?.is_starred == false ?
                                                                <svg onClick={() => starMessage(item)} xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        `w-6 h-6 mx-1 cursor-pointer hover:text-yellow-400 ${color?.textgray} flex-shrink-0  ${color?.iconhover} transition duration-75 `}
                                                                    fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                                :
                                                                <svg onClick={() => starMessage(item)} xmlns="http://www.w3.org/2000/svg"
                                                                    className={
                                                                        `w-6 h-6 mx-1 cursor-pointer text-yellow-400  flex-shrink-0  ${color?.iconhover} transition duration-75 `}
                                                                    fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                            }
                                                        </div>
                                                    </td>
                                                    {item?.is_read == false ?
                                                        <>
                                                            <td onClick={() => readMessage(item)} className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                                    <img className="h-6 w-6 rounded" src="/man.png" alt="avatar" />
                                                                </div>

                                                                <div onClick={() => readMessage(item)} className={` 
                                                        text-md pr-6 font-semibold cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                                    {item?.sender_name}
                                                                </div>

                                                            </td>
                                                            <td onClick={() => readMessage(item)} className={`${color?.tabletext} px-4 py-3 font-semibold space-x-2 cursor-pointer whitespace-nowrap`}> {item?.message_subject}...</td>
                                                            <td className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}>
                                                                {item?.created_on}
                                                            </td></>
                                                        :
                                                        <>
                                                            <td className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                                    <img className="h-6 w-6 rounded" src="/man.png" alt="Neil image" />
                                                                </div>

                                                                <div onClick={() => readMessage(item)} className={` 
                                                     text-md pr-6 font-normal cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                                    {item?.sender_name}
                                                                </div>

                                                            </td>
                                                            <td onClick={() => readMessage(item)} className={`${color?.tabletext} px-4 py-3 font-normal space-x-2 cursor-pointer whitespace-nowrap`}> {item?.message_subject}...</td>
                                                            <td onClick={() => readMessage(item)} className={`${color?.tabletext} px-4 py-3 font-normal whitespace-nowrap space-x-2 cursor-pointer`}>
                                                                {item?.created_on}
                                                            </td></>}
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Messages