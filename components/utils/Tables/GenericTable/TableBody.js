import React from 'react'
import Capsule from '../../Capsule'
import TableHead from './TableHead'

function TableBody({ cols = [], data = [], color = {}, ...args }) {
    const btnColor = { "save": "bg-cyan-600 hover:bg-cyan-700", "delete": "bg-red-600 hover:bg-red-700", "view": "bg-cyan-600 hover:bg-cyan-700" }
    return (
        <>

            <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200 `} id="TableList" >
                {
                    data.map((item, key) => {
                        return (<tr key={key}>

                            {cols.map((col, id) => (
                                <React.Fragment key={id}>
                                    {((col) => {

                                        switch (col) {
                                            case "Actions":
                                                return (<td>{(item[col]?.map((i, idx) => {
                                                    return (
                                                        // show buttons 
                                                        <button key={idx} onClick={() => { i?.operation() }} className={`mx-1 bg-gradient-to-r ${btnColor[i?.label?.toLowerCase()]} text-white  sm:inline-flex  
                                                         font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>
                                                            {i?.label}</button>
                                                    )
                                                }))}
                                                </td>)
                                                break

                                            case "status":
                                                return (<td className={`p-4 whitespace-nowrap lowercase text-base font-normal ${color?.text}`}>
                                                    <Capsule 
                                                    color={item[col] === "true"?`bg-green-300`:`bg-red-300`} 
                                                    title={item[col] === "true" ? 'active' : 'inactive'}
                                                     />

                                                </td>)
                                                break

                                            case "Property Type":
                                                return (<td className={`p-4 whitespace-nowrap lowercase text-base font-normal ${color?.text}`}>
                                                    <Capsule title={item[col]} />
                                                </td>)
                                                break
                                            case "checkbox":
                                                return (<td className='p-4 w-4'>
                                                    {/* showcheckbox  */}
                                                    <span className="flex items-center">
                                                        <input id="checkbox-1" name={item?.id} checked={item.isChecked || false}
                                                            onChange={(e) => { handlecheckbox(e); setViewDel(1); }}
                                                            aria-describedby="checkbox-1" type="checkbox"
                                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                        <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                    </span>
                                                </td>)
                                                break
                                            default:
                                                return (<td className={`p-4  capitalize  text-base font-normal ${color?.text} `}>
                                                    {item[col]}
                                                </td>)
                                        }
                                    })(col)}
                                </React.Fragment>
                            )
                            )}
                        </tr>)
                    }
                    )
                }
            </tbody>
        </>
    )
}

export default TableBody