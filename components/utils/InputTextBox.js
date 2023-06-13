import React from 'react'
import info from '../../public/info.svg'
import Image from 'next/image' 
import Tooltip from "./Tooltip";
function InputTextBox({label,visible,defaultValue,onChangeAction,error,color,req,title,tooltip}) 

{
  return (
    
                <div data-testid ="main" className="w-full lg:w-6/12 px-4">
                  <div  data-testid ="child0" className="relative w-full mb-3">
                  <div className="flex">
                    <label
                      className={`text-sm font-medium ${color?.text} block mb-2`}
                      htmlFor="grid-password"
                    >
                      {label}
                      {req===true?<span style={{ color: "#ff0000" }}>*</span>:<></>}
                    </label>
                    <div className="ml-2 mt-1">
                    {tooltip===true?
        <Tooltip message={title?title:label} color={color}>
          <span className='flex justify-center item-center bg-white h-4 w-4 border border-none rounded-full'><Image src={info} alt="info" height={10} width={10}/>
          </span>
        </Tooltip>:
         <></>}
        </div>
       
        </div>
                    <div data-testid ="vis0" className={visible === 0 ? "block w-auto" : "hidden"}>
                      
                    </div>
                    <div  data-testid="vis1" className={visible === 1 ? "block" : "hidden"}>
                      <textarea data-testid="input"
                        rows="5"
                        columns="50"
                       
                        className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        onChange={
                            (e) => (
                              onChangeAction(e)
                            )
                          } 
                        defaultValue={defaultValue}
                        required
                      />
                        <p  data-testid='Error' title={error} className="text-sm text-sm text-red-700 font-light">
                        {error}</p>
                    </div>
                  </div>
                </div>
    
  )
}

export default InputTextBox
