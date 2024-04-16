import { useState } from "react";
import Button from "../../Button";
import WidgetStatus from "../../widgetStatus";
import RemoveBedButton from "./RemoveBedButton";
import InputText from "../../utils/InputText";
import { validationBedData } from "../../logic/property/Rooms/AddRoom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RoomBeds({ color, language, visible,submitBed, allRoomDes, currentProperty, setRoomId, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp }) {
    /** For Bed**/
    const BedTemplate = {
        "length": "",
        "width": ""
    }

    /* Mapping Index of each Bed*/
    const [BedData, setBedData] = useState([BedTemplate]?.map((i, id) => { return { ...i, index: id } }))
    const [spinner, setSpinner] = useState(0);
    const [flag, setFlag] = useState(0);
    const [error, setError] = useState({});
    /** Function to add Bed **/
    const addBed = () => {
        setBedData([...BedData, BedTemplate]?.map((i, id) => { return { ...i, index: id } }))
    }

    /** Function to on change for Bed **/
    const onChange = (e, index, i) => {
        setBedData(BedData?.map((item, id) => {
            if (item.index === index) {
                item[i] = e.target.value
            }
            return item
        }))
    }

    /** Function to cancel package mile **/
    const removeBed = (index) => {
        const filteredBed = BedData.filter((i, id) => i.index !== index)
        setBedData(filteredBed)
    }

    
    const validRoomTypeIds = ['rt001', 'rt002', 'rt003', 'rt004', 'rt005'];

    return (
        <div className={`${color?.whitebackground} shadow rounded-lg mt-2 mx-1 px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>

            <WidgetStatus name={[`${language?.room} ${language?.description}`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]}
                selected={1}
                color={color} />
            <h6 className={`${color?.text} text-xl flex leading-none pl-6 pt-2 font-bold  mb-4`}>
                {language?.room}  {language?.description}
            </h6>

            {validRoomTypeIds.includes(allRoomDes?.room_type_id) &&
                <>
                    {allRoomDes?.room_type_id !== 'rt001' &&
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                            <Button Primary={language?.AddLOS} onClick={addBed} />
                        </div>}

                    <div className="pt-2">
                        <div className=" md:px-4 mx-auto w-full">
                            {BedData?.map((BedData, index) => (
                                <>
                                    <div className={BedData?.index === 0 ? "hidden" : "block"}>

                                        <RemoveBedButton onClickAction={() => removeBed(BedData?.index)} color={color} />

                                    </div>
                                    <div className="flex flex-wrap" key={index}>

                                        <InputText
                                            label={`${language?.bed} ${language?.Length}(${language?.incm})`}
                                            visible={1}
                                            onChangeAction={e => { onChange(e, BedData?.index, 'length'); setFlag(1) }}
                                            req={true}
                                            error={error?.[index]?.length} />

                                        <InputText
                                            label={`${language?.bed} ${language?.width}(${language?.incm})`}
                                            visible={1}
                                            onChangeAction={e => { onChange(e, BedData?.index, 'width'); setFlag(1) }}
                                            req={true}
                                            error={error?.[index]?.width} />
                                    </div>
                                </>))}
                            <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
                                <div className={spinner === 0 ? 'block' : 'hidden'}>
                                    {flag === 1 ?
                                        <Button Primary={language?.Submit} onClick={() => {
                                            validationBedData(BedData, setError, allRoomDes, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp)
                                        }} /> :
                                        <Button Primary={language?.SubmitDisabled} />}
                                </div>
                                <div className={spinner === 1 ? 'block' : 'hidden'}>
                                    <Button Primary={language?.Spinnersubmit} />
                                </div>


                            </div>

                        </div>
                    </div>
                </> 
            }
        </div>
    )
}

export default RoomBeds