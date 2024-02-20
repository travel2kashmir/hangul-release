import React, { useState, useEffect } from 'react'
import InputText from '../utils/InputText';
import Button from '../Button';
import Cross from '../utils/Icons/Cross';
import {handleChangeInTaxes,removeTaxTemplate,addTaxTemplate} from './Utiles';

function TaxRateSettings({ color, language }) {
    const taxTemp = {
        "tax_slab_start": '',
        "tax_slab_end": '',
        "tax_percentage": ''
    }
    const [mutationFlag, setMutationFlag] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState({})
    const [taxIndex, setTaxIndex] = useState(0)
    const [taxes, setTaxes] = useState([{ ...taxTemp, index: taxIndex }])
    
    
   

    return (
        <>

            <div className={`${color?.greybackground} w-full  py-2`}>
                <div
                    className={`${color?.whitebackground} shadow rounded-lg `}
                >
                    <div className='flex flex-wrap justify-between py-4 px-6'>
                        <h6
                            className={`${color?.text} text-xl flex font-bold`}
                        >
                            Tax rate Settings
                        </h6>

                        <Button
                            testid="test_button"
                            Primary={language?.Add}
                            onClick={()=>addTaxTemplate(taxIndex,setTaxIndex,taxes,setTaxes)}
                        />
                    </div>

                    {/* form body start  */}
                    <div>
                        <div className=" md:px-4 mx-auto w-full">
                            {taxes.map((item, index) => {
                                return (<div key={item.index} className="border p-2 m-2 rounded-md">
                                    {index != 0 && <div className="flex justify-end" onClick={() => removeTaxTemplate(item.index,setTaxes)}><Cross /></div>}
                                    <div className="flex flex-wrap ">
                                        {/*tax slab start*/}
                                        <InputText
                                            label={"Tax Slab Start"}
                                            visible={1}
                                            defaultValue={item?.tax_slab_start}
                                            onChangeAction={(e) => {
                                                setMutationFlag(true);
                                                handleChangeInTaxes(e, item.index, 'tax_slab_start',setTaxes)
                                            }
                                            }
                                            error={error?.tax_slab_start}
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
                                                handleChangeInTaxes(e, item.index, 'tax_slab_end',setTaxes)
                                            }
                                            }
                                            error={error?.tax_slab_end}
                                            color={color}
                                            req={true}
                                            title={'The end slab of tax'}
                                            tooltip={true}
                                        />

                                        {/* tax rate  */}
                                        <InputText
                                            label={"Tax Percentage"}
                                            visible={1}
                                            defaultValue={item?.tax_percentage}
                                            onChangeAction={(e) => {
                                                setMutationFlag(true);
                                                handleChangeInTaxes(e, item.index, 'tax_percentage',setTaxes)
                                            }
                                            }
                                            error={error?.tax_percentage}
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
                            onClick={() => alert('m')}
                        />}

                        {spinner === true && mutationFlag === true && <Button
                            testid="test_button_spinner"
                            Primary={language?.SpinnerUpdate}
                        />}

                    </div>

                </div>
            </div>
        </>
    )
}

export default TaxRateSettings