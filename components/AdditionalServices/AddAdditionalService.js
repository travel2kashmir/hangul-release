import Button from "../Button";
import InputText from "../utils/InputText";

function AddAdditionalService({ color, setModified, modified, error, language, spinner, flag, setFlag,validationAdditionalServices,setSpinner,setAdditionalServices,setError,setView,currentProperty, setGene, setVisible, Router }) {
    return (
        <form id='asform'>
            <div className={`${color?.whitebackground} rounded-lg relative`}>
                <div className=" md:px-4 mx-auto w-full">
                    <div className="flex flex-wrap">
                        {/* service name */}
                        <InputText
                            label={`${language?.service} ${language?.name}`}
                            visible={1}
                            onChangeAction={(e) => { setModified({ ...modified, add_service_name: e.target.value }, setFlag(1)) }
                            }
                            error={error?.add_service_name}
                            color={color}
                            req={true}
                        />
                        {/* service description */}
                        <InputText
                            label={`${language?.service} ${language?.description}`}
                            visible={1}
                            onChangeAction={(e) => { setModified({ ...modified, add_service_comment: e.target.value }, setFlag(1)) }
                            }
                            error={error?.add_service_comment}
                            color={color}
                            req={true}
                        />

                        <div className="items-center p-6 border-t border-gray-200 rounded-b">
                            {flag !== 1 && spinner === 0 && <Button Primary={language?.AddDisabled} />}
                            {spinner === 0 && flag === 1 && <Button Primary={language?.Add} onClick={() => { validationAdditionalServices(setError, setSpinner, modified, setModified, setFlag, setView, currentProperty, setAdditionalServices, setGene, setVisible, Router) }} />}
                            {spinner === 1 && flag === 1 && <Button Primary={language?.SpinnerAdd} />}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddAdditionalService