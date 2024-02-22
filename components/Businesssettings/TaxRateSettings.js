import React, { useState, useEffect } from 'react'
import InputText from '../utils/InputText';
import Button from '../Button';
import Cross from '../utils/Icons/Cross';
import { handleChangeInTaxes, addTaxTemplate, removeTaxTemplate, taxSlabValidation, saveTaxes, deleteTaxPlan, actionOnCross } from './Utiles';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Modal from '../NewTheme/modal';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgRemove } from "react-icons/cg";

function TaxRateSettings({ color, language, taxPlans, property_id }) {
    const taxTemp = {
        "tax_slab_start": '',
        "tax_slab_end": '',
        "tax_rate": ''
    }
    const [mutationFlag, setMutationFlag] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState({})
    const [deletePlan, setDeletePlan] = useState({ "status": false, "tax_plan_id": undefined })
    const [taxIndex, setTaxIndex] = useState(0)
    const [taxes, setTaxes] = useState(taxPlans || [{ ...taxTemp, index: taxIndex }])
    const [showTaxes,setShowTaxes]=useState(false)
    useEffect(() => {
        if (taxPlans != undefined) {
            setTaxes(taxPlans.sort((a, b) => a.tax_slab_start - b.tax_slab_start).map((i, idx) => ({ ...i, property_id, index: idx })));
            setTaxIndex(taxPlans.length);
        }
        else {
            setTaxes([{ ...taxTemp, property_id, index: taxIndex }])
        }
    }, [taxPlans])

    function validateTaxes(taxes) {
        const result = taxSlabValidation(taxes)
        console.log(JSON.stringify(result))
        if (result === true) {
            setError({})
            saveTaxes(taxes, setSpinner)
        }
        else {
            setError(result)
            setSpinner(false);
        }
    }

    return (
        <>
           {!showTaxes && <div className={`${color?.whitebackground} shadow rounded-lg w-full my-2 py-2 h-20 overflow-y-hidden`}>
            
                <div className='flex flex-wrap justify-between py-4 px-6'>
                    <h6
                        className={`${color?.text} text-xl flex font-bold`}
                    >
                        Tax rate Settings
                    </h6>
                 <button onClick={()=>setShowTaxes(true)} className='px-4 py-2 rounded-md bg-cyan-600 text-white'>
                 <IoIosAddCircleOutline />
                 </button>
                </div>
            </div>} 
            {showTaxes && <div className={`${color?.greybackground} w-full  py-2 `}>
                <div
                    className={`${color?.whitebackground} shadow rounded-lg `}
                >  
               

                    <div className='flex flex-wrap justify-between py-4 px-6'>
                        <h6
                            className={`${color?.text} text-xl flex font-bold`}
                        >
                            Tax rate Settings
                        </h6>
                        <button onClick={()=>setShowTaxes(false)} className=' m-2 px-4 py-2 rounded-md bg-cyan-600 text-white'><CgRemove /></button>
                        
                    </div>
                    <div className='flex justify-end mr-6'>
                    <Button
                            testid="test_button"
                            Primary={language?.Add}
                            onClick={() => addTaxTemplate(taxIndex, setTaxIndex, taxes, setTaxes, property_id)}
                        />

                    </div>
                    {/* form body start  */}
                    <div>
                        <div className=" md:px-4 mx-auto w-full">
                            {taxes.map((item, index) => {
                                return (<div key={item.index} className="border p-2 m-2 rounded-md">
                                    <div className="flex justify-end" onClick={() => actionOnCross(item, setTaxes, setDeletePlan)}><Cross /></div>
                                    <div className="flex flex-wrap ">
                                        {/*tax slab start*/}
                                        <InputText
                                            label={"Tax Slab Start"}
                                            visible={1}
                                            defaultValue={item?.tax_slab_start}
                                            onChangeAction={(e) => {
                                                setMutationFlag(true);
                                                handleChangeInTaxes(e, item.index, 'tax_slab_start', setTaxes)
                                            }
                                            }
                                            error={error[index]?.tax_slab_start}
                                            color={color}
                                            req={true}
                                            title={'The start of tax slab'}
                                            tooltip={true}
                                        />
                                        {/* tax slab ends  */}

                                        <InputText
                                            label={"Tax Slab End"}
                                            visible={1}
                                            defaultValue={item?.tax_slab_end}
                                            onChangeAction={(e) => {
                                                setMutationFlag(true);
                                                handleChangeInTaxes(e, item.index, 'tax_slab_end', setTaxes)
                                            }
                                            }
                                            error={error[index]?.tax_slab_end}
                                            color={color}
                                            req={true}
                                            title={'The end slab of tax'}
                                            tooltip={true}
                                        />

                                        {/* tax rate  */}
                                        <InputText
                                            label={"Tax Rate"}
                                            visible={1}
                                            defaultValue={item?.tax_rate}
                                            onChangeAction={(e) => {
                                                setMutationFlag(true);
                                                handleChangeInTaxes(e, item.index, 'tax_rate', setTaxes)
                                            }
                                            }
                                            error={error[index]?.tax_rate}
                                            color={color}
                                            req={true}
                                            title={'The tax applied on purchase in percentage'}
                                            tooltip={true}
                                        />

                                    </div>
                                </div>)

                            })}

                        </div>
                    </div>
                    {/* form body end */}
                    <div className="flex mr-2 items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                        {mutationFlag === false && spinner === false && <Button
                            testid="test_button_disabled"
                            Primary={language?.UpdateDisabled}
                        />}
                        {mutationFlag === true && spinner === false && <Button
                            testid="test_button"
                            Primary={language?.Update}
                            onClick={() => { setSpinner(true); validateTaxes(taxes) }}
                        />}

                        {spinner === true && mutationFlag === true && <Button
                            testid="test_button_spinner"
                            Primary={language?.SpinnerUpdate}
                        />}

                    </div>

                </div>
            </div>}
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

            {/* modal for delete  */}
            {deletePlan.status === true &&
                <Modal
                    title={'Delete Tax'}
                    color={color}
                    description={
                        <div className={`flex flex-wrap ${color.whiteBackground} ${color?.text} text-md font-semibold items-center`}>
                            <div>Are you sure you want to delete tax plan?</div>
                            <div className='flex flex-wrap w-full my-2 justify-end'>
                                <Button Primary={language?.Delete} onClick={() => deleteTaxPlan(deletePlan.tax_plan_id, deletePlan.index, setDeletePlan, removeTaxTemplate, setTaxes)} />
                                <Button Primary={language?.Cancel} onClick={() => setDeletePlan({ "status": false, "tax_plan_id": undefined })} />
                            </div>
                        </div>

                    }
                    setShowModal={() => setDeletePlan({ "status": false, "tax_plan_id": undefined })}
                    showCloseButton={false} />}
        </>
    )
}

export default TaxRateSettings