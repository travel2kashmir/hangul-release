import Button from "../Button";
import InputText from "../utils/InputText";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { validateBedAdd } from "../validation/room";

function AddNewBed({ color, language, modified, setModified, error, setError, flag, setFlag, spinner, currentroom, fetchDetails, setView, setDisp }) {
    /* Function to add bed */
    function addBed() {
        var result = validateBedAdd(modified);
        if (result === true) {
            const current = new Date();
            const currentDateTime = current.toISOString();
            const final_data = {
                "beds": [{
                    "timestamp": currentDateTime,
                    "room_id": currentroom,
                    "length": modified.bed_length,
                    "width": modified.bed_width,
                    "unit": "cm"
                }]
            }
            let url = '/api/bed_details'
            axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
                ((response) => {
                    document.getElementById('asform').reset();
                    toast.success("Bed add success.");
                    fetchDetails();
                    setFlag([])
                    setModified([])
                    setView(0);
                    setError({});
                    setDisp(4)
                })
                .catch((error) => {
                    toast.error("Bed Add Error! ");
                    setFlag([]);
                    setError({});

                })


        }
        else {
            setError(result)
        }

    }

    return (
        <form id='asform'>
            <div className={`${color?.whitebackground} rounded-lg relative`}>

                <div className="p-6 space-y-6">
                    <div className="flex flex-wrap">

                        {/* bed length  */}
                        <InputText
                            label={`${language?.bed} ${language?.length}(${language?.incm})`}
                            visible={1}
                            onChangeAction={(e) => { setModified({ ...modified, bed_length: e.target.value }, setFlag(1)) }
                            }
                            error={error?.bed_length}
                            color={color}
                            req={true}
                        />
                        {/* bed width  */}
                        <InputText
                            label={`${language?.bed} ${language?.width}(${language?.incm})`}
                            visible={1}
                            onChangeAction={(e) => { setModified({ ...modified, bed_width: e.target.value }, setFlag(1)) }
                            }
                            error={error?.bed_width}
                            color={color}
                            req={true}
                        />


                    </div>
                </div>

                <div className="items-center p-6 border-t border-gray-200 rounded-b">

                    {spinner === 0 && flag !== 1 && <Button Primary={language?.AddDisabled} />}
                    {spinner === 0 && flag === 1 && <Button Primary={language?.Add} onClick={addBed} buttonType={'button'} />}
                    {spinner === 1 && <Button Primary={language?.SpinnerAdd} />}

                </div>
            </div>
        </form>
    )
}

export default AddNewBed