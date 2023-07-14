import React, { useState, useEffect } from 'react'
import Capsule from '../../Capsule'

function InlineTableBody({ cols = [], color = {}, handlecheckbox, ...args }) {
    const [data, setData] = useState([])
    const [orginalData, setOrginalData] = useState({});
    const [editedData,setEditedData]=useState({});
    const [update, setUpdate] = useState({
        "edit": 0,
        "id": ''
    });

    const [del, setDel] = useState({
        "delete": 0,
        "id": ''
    });


    useEffect(() => {
        setData(args.data);
    }, [args.data])
    const btnColor = {
        "save": "bg-cyan-600 hover:bg-cyan-700",
        "delete": "bg-red-600 hover:bg-red-700",
        "edit": "bg-cyan-600 hover:bg-cyan-700",
        "cancel": "bg-gray-400 hover:bg-gray-600",
        "update": "bg-green-600 hover:bg-green-700"
    }
    function doAction(label, idx, item) {
        if (label === "Edit") {
            setOrginalData(item);
            setUpdate({ edit: 1, id: idx });
        }
        else 
        { 
            setDel({ delete: 1, id: idx }); }

    }

    return (

        <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200 `} id="TableList" >
            {
                data.map((item, indx) => {
                    return (<tr key={indx}>
                        {cols.map((col, id) => (
                            <React.Fragment key={id}>
                                {((col) => {

                                    switch (col) {
                                        case "Actions":
                                            return (update?.edit === 1 && update?.id === indx ? <td>
                                                <td> <button key={indx} onClick={() => { alert("update clicked") }}
                                                    className={`mx-1 my-0.5 bg-gradient-to-r ${btnColor["update"]} text-white  sm:inline-flex  
                                            font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>
                                                    Update</button>
                                                </td>

                                                <td> <button key={indx} onClick={() => { setUpdate({ edit: 0, id: -1 }) }}
                                                    className={`mx-1 my-0.5 bg-gradient-to-r ${btnColor["cancel"]} text-white  sm:inline-flex  
                                                         font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>
                                                    Cancel</button>
                                                </td>
                                            </td> : <td>{(item[col]?.map((i, idx, item) => {
                                                return (
                                                    // show buttons 
                                                    <button key={idx} onClick={() => { doAction(i.label, indx, item) }} className={`mx-1 my-0.5 bg-gradient-to-r ${btnColor[i?.label?.toLowerCase()]} text-white  sm:inline-flex  
                                                         font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>
                                                        {i?.label}</button>

                                                )
                                            }))}
                                            </td>)
                                            break

                                        case "status":
                                            return (update?.edit === 1 && update?.id === indx ?
                                                <> <div className="flex mt-8">
                                                    <div className="form-check mx-2 form-check-inline">

                                                        <label htmlFor={`default-toggle${indx}`} className="inline-flex relative items-center cursor-pointer">
                                                            <input type="checkbox" value={item.status} checked={item.status === true}
                                                                onChange={(e) => (set)}
                                                                id={`default-toggle${indx}`} className="sr-only peer" />

                                                            <div
                                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                                 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">

                                                            </div>

                                                        </label>
                                                    </div></div>
                                                </> : <td className={`p-4 whitespace-nowrap lowercase text-base font-normal ${color?.text}`}>
                                                    <Capsule
                                                        color={item[col] === true ? `bg-green-300` : `bg-red-300`}
                                                        title={<span className='px-1'>{item.status === true ? 'active' : 'inactive'}</span>}
                                                    />
                                                </td>)
                                            break


                                        case "checkbox":
                                            return (<td className='p-4 w-4'>
                                                {/* showcheckbox  */}
                                                <span className="flex items-center">
                                                    <input id="checkbox-1" name={item?.id} checked={item?.isChecked}
                                                        onChange={(e) => {
                                                            handlecheckbox(e);
                                                        }}
                                                        aria-describedby="checkbox-1" type="checkbox"
                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                    <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                </span>
                                            </td>)
                                            break
                                        default:
                                            return (update?.edit === 1 && update?.id === indx ? <>
                                                <td className={`p-4  text-base font-normal break-words ${color?.text} `}>
                                                    {item[col]?.inputType === "text" ? <input type="text"
                                                        onChange={(e) => item[col].onChangeAction(e)}
                                                        className={`shadow-sm w-fit ${args?.color?.whitebackground} border border-gray-300
                                                        ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600
                                                        block  p-2.5`}
                                                        defaultValue={item[col]?.value}></input> : item[col]?.value}
                                                </td>

                                            </> : <td className={`p-4  text-base font-normal break-words ${color?.text} `}>
                                                {item[col]?.value}
                                            </td>)
                                    }
                                })(col)}
                            </React.Fragment >
                        )
                        )}
                    </tr>)
                }
                )
            }
        </tbody>

    )
}

export default InlineTableBody