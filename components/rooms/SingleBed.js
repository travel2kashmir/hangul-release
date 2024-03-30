import React from 'react'
import Button from '../Button';
import WidgetStatus from '../widgetStatus';
import Lineloader from '../loaders/lineloader';
import { validateBedAdd } from '../validation/room';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputText from '../utils/InputText';
let i = 0;
function SingleBed({ color, language, bedDetails, setBedDetails, error, setError, visible, flag, setFlag, spinner, setSpinner, disp, setDisp, fetchDetails, setModified }) {

  // Validate Beds Data
  const validationBedData = () => {
    var result = validateBedAdd(bedDetails)
    if (result === true) {
      submitBedUpdate();
    }
    else {
      setError(result)
    }
  }

  /* Function to edit single bed */
  function submitBedUpdate() {
    const current = new Date();
    const currentDateTime = current.toISOString();
    const final_data = {
      "beds": [{
        "bed_id": bedDetails?.bed_id,
        "length": bedDetails?.bed_length,
        "width": bedDetails?.bed_width,
        "unit": "cm"
      }]
    }
    setSpinner(1);
    const url = '/api/bed_details'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("App: Bed update success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        fetchDetails();
        setError({});
        setModified([]);
        setSpinner(0);
        setFlag([])
      })
      .catch((error) => {
        toast.error("App: Bed update error!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSpinner(0);
        setFlag([])
      })

  }


  return (
    <div id='5' className='block py-1'>
      <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
        <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={1} color={color} />
        <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
          {language?.room} {language?.description}
        </h6>
        <div className="mt-1 flex flex-wrap">
          <InputText
            label={`${language?.bed} ${language?.Length}(${language?.incm})`}
            visible={visible}
            defaultValue={bedDetails?.bed_length}
            onChangeAction={
              (e) => (
                setBedDetails({ ...bedDetails, bed_length: e.target.value }, setFlag(1))
              )
            }
            error={error?.bed_length}
            color={color}
            req={true}
          />
         
          <InputText
            label={`${language?.bed} ${language?.width}(${language?.incm})`}
            visible={visible}
            defaultValue={bedDetails?.bed_width}
            onChangeAction={
              (e) => (
                setBedDetails({ ...bedDetails, bed_width: e.target.value }, setFlag(1))
              )
            }
            error={error?.bed_width}
            color={color}
            req={true}
          />
         

        </div>
        <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
          <Button Primary={language?.Previous} onClick={() => {
            setDisp(0)
          }} />

          <div className={(spinner === 0 && flag !== 1) ? 'block py-1' : 'hidden'}>
            <Button Primary={language?.UpdateDisabled} /></div>
          <div className={(spinner === 0 && flag === 1) ? 'block py-1' : 'hidden'}>
            <Button Primary={language?.Update} onClick={() => {
              validationBedData();
            }} />
          </div>
          <div className={(spinner === 1 && flag === 1) ? 'block py-1' : 'hidden'}>
            <Button Primary={language?.SpinnerUpdate} />
          </div>
          <Button Primary={language?.Next} onClick={() => {
            setDisp(1)
          }} />
        </div>
      </div>
    </div>
  )
}

export default SingleBed