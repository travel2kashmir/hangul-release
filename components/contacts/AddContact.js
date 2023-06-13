import React from 'react'
import Button from '../Button';
function AddContact({contact, setContact,flag,setFlag, language,color,validationContact,setAddContact}) {
let error={};
let spinner=0;
return (
<div>
<div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
<div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
<div className={`${color?.whitebackground} rounded-lg shadow relative`}>
<div className="flex items-start justify-between p-5 border-b rounded-t">
<h3 className={`${color?.text} text-xl font-semibold`}>{language?.add} {language?.new} {language?.contact}</h3>
<button
type="button"
onClick={() => {
document.getElementById('addcontactform').reset();
                                    // setContact([]);
                                    // setError({});
setAddContact(0);
}}
className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
>
<svg
className="w-5 h-5"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path
fillRule="evenodd"
d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
clipRule="evenodd"
></path>
</svg>
</button>
</div>
<form id='addcontactform'>
<div className="p-6 space-y-6" >
<div className="grid grid-cols-6 gap-6">
<div className="col-span-6 sm:col-span-3">
<label
htmlFor="first-name"
className={`text-sm ${color?.text} font-medium  block mb-2`}
>
{language?.contact} {language?.type}
<span style={{ color: "#ff0000" }}>*</span>
                  </label>
                                        <select
                                            onChange={(e) =>
                                                setContact({
                                                    ...contact,
                                                    contact_type: e.target.value,
                                                }, setFlag(1))
                                            }
                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                        focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                        >
                                            <option selected disabled>{language?.select}</option>
                                            <option value="phone">Phone</option>
                                            <option value="email">Email</option>
                                            <option value="website">Website</option>
                                            <option value="toll free number">
                                                Toll Free number
                                            </option>
                                            <option value="tdd number">TDD number</option>
                                        </select>
                                        <p className="text-sm text-sm text-red-700 font-light">
                                            {error?.contact_type}</p>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name"
                                            className={`text-sm ${color?.text} font-medium  block mb-2`}>
                                            {language?.contact} {language?.value}
                                            <span style={{ color: "#ff0000" }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            onChange={(e) =>
                                                setContact({
                                                    ...contact,
                                                    contact_data: e.target.value,
                                                }, setFlag(1))
                                            }

                                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                        focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                            required
                                        />
                                        <p className="text-sm text-sm text-red-700 font-light">
                                            {error?.contact_data}</p>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                                <Button Primary={language?.AddDisabled} /></div>
                            <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                                <Button Primary={language?.Add} onClick={() => { validationContact(contact) }} />
                            </div>
                            <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                                <Button Primary={language?.SpinnerAdd} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContact