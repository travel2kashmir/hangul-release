import React from "react";
import LineLoader from "../loaders/lineloader";
import Tooltip from "../utils/Tooltip";
import info from '../../public/info.svg'
import Image from 'next/image'
function InputEmail({
  label,
  visible=1,
  defaultValue,
  onChangeAction,
  error,
  color,
  req,
  title,
  tooltip,
  disabled = false
}) {
  return (
    <div data-testid="main" className="w-full ">
      <div data-testid="child0" className="relative w-full mb-3">
        <div className="flex">
          <label
            data-testid="checkingcolor"
            className={`text-sm font-medium ${color?.text} block mb-2`}
            htmlFor="grid-password"
          >
            {label}
            {req === true ? <span style={{ color: "#ff0000" }}>*</span> : <></>}
          </label>

          <div className="ml-2 mt-1">
            {tooltip === true ?
              <Tooltip message={title ? title : label} color={color}>
                <span className='flex justify-center item-center bg-white h-4 w-4 border border-none rounded-full'>
                  <Image src={info} alt="info" height={10} width={10} /></span>
              </Tooltip>
              : <></>}
          </div>
        </div>
        <div data-testid="vis0" className={visible === 0 ? "block" : "hidden"}>
          <LineLoader />
        </div>
        <div data-testid="vis1" className={visible === 1 ? "block" : "hidden"}>
        <input
             type="email"
             name="email"
             id="email"
             data-testid="email-field"
            className={`${color?.whitebackground} border border-gray-300 
            ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
             focus:border-cyan-600 block w-full p-2.5`}
            defaultValue={defaultValue}
            required
            onChange={(e) => onChangeAction(e)}
            disabled={disabled}
          />
          {/* if the disabled is true then we mimic filed such that the values can be displayed easily  */}
          {disabled===true && <div className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}>
            {defaultValue}
            </div>}
          <p
            data-testid="Error"
            title={error}
            className="text-sm text-red-700 font-light"
          >
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
export default InputEmail;