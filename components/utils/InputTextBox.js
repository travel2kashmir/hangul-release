import React, { useEffect, useState } from 'react'
import info from '../../public/info.svg'
import Image from 'next/image'
import Tooltip from "./Tooltip";
function InputTextBox({ label, visible, defaultValue, onChangeAction, error, color, req, title, tooltip, wordLimit = 500,disabled=false }) {

  const [defVal, setDefVal] = useState(defaultValue?.length)

  useEffect(() => { setDefVal(defaultValue?.length) }, [defaultValue])

  function changeDefault(e) {
    setDefVal(e.target.value.length)
  }

  return (

    <div data-testid="main" className="w-full lg:w-6/12 px-4">
      <div data-testid="child0" className="relative w-full mb-3">
        <div className="flex">
          <label
            className={`text-sm font-medium ${color?.text} block mb-2 w-full`}
            htmlFor="grid-password"
          >
            {label}
            {req === true ? <span style={{ color: "#ff0000" }}>*</span> : <></>}
          </label>
          <div className="pb-2 flex items-center justify-between w-full">
            {tooltip === true ?
              <Tooltip message={title ? title : label} color={color}>
                <span className='flex justify-center item-center bg-white h-4 w-4 border border-none rounded-full'><Image src={info} alt="info" height={10} width={10} />
                </span>
              </Tooltip> :
              <></>}
            {<p className={`text-sm ${defVal < wordLimit ? `${color?.text}` : `text-red-400`} p-1`}> {defVal}/{wordLimit}</p>}
          </div>

        </div>
        <div data-testid="vis0" className={visible === 0 ? "block w-auto" : "hidden"}>

        </div>
        <div data-testid="vis1" className={visible === 1 ? "block" : "hidden"}>

        {disabled===false && <textarea data-testid="input"
            rows="3"
            columns="50"
            id='text'
            className={`whitespace-pre-wrap shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
            onChange={
              (e) => {
                changeDefault(e);
                onChangeAction(e);
              }
            }
            defaultValue={defaultValue}
            required
          />}
          {disabled===true && <div 
          className={`whitespace-pre-wrap shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
          >
            {defaultValue}
            </div>}
          <p data-testid='Error' title={error} className="text-sm  text-red-700 font-light">
            {error}</p>
        </div>
      </div>
    </div>

  )
}

export default InputTextBox