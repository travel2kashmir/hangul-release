import React from 'react';
import Button from '../Button';
import WidgetStatus from '../widgetStatus';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomService({ color, language, services, setServices, spinner,setSpinner, setDisp, roomDetails,currentroom }) {
  /*Function to add room service*/
  const submitServices = () => {
    services.map(
      (i) => (i.room_id = currentroom, i.status = i.service_value)
    )
    services.map(
      (i) => {
        if (JSON.stringify(i.service_value) !== "true") {
          return (
            i.service_value = false,
            i.status = false
          )
        }
      }
    )
    var total = { "room_services": services }
    const url = '/api/room_facilities'
    axios.post(url, total, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("Room services added success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("Room services add error.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

  }

  /*Function to edit room service*/
  const editServices = () => {
    services.map((i) => (i.room_id = currentroom, i.status = i.service_value))
    services.map((i) => {if (JSON.stringify(i.service_value) !== "true") {return (i.service_value = false,i.status = false)}
      })
    setSpinner(1)
    var total = { "room_services": services }
    const url = '/api/room_facilities'
    axios.put(url, total, { header: { "content-type": "application/json" } }).then
      ((response) => {
        setSpinner(0)
        toast.success("Room services update successfully.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      .catch((error) => {
        setSpinner(0)
        toast.error("Room Services update error. ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

  }
  return (
    <div id='1' className='block py-1'>
      <div className={`${color?.whitebackground} shadow rounded-lg mt-2 mx-1 px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
        <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={2} color={color} />
        <h6 className={`${color?.text} text-xl flex leading-none pl-6 pt-2 font-bold  mb-8`}>
          {language?.room} {language?.services}
        </h6>
        <div className="flex flex-col my-4">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block py-1 min-w-full">
              <div className="shadow-sm overflow-hidden">
                <table className="table-fixed min-w-full divide-y mx-8 divide-gray-200">
                  <thead className={`${color.greybackground}`}>
                    <tr>
                      <th
                        scope="col"
                        className={`${color.text} py-4 px-2 text-left text-xs font-semibold uppercase`}
                      >
                        {language?.service} {language?.name}
                      </th>
                      <th
                        scope="col"
                        className={`${color.text} py-4 px-6 text-left text-xs font-semibold uppercase`}
                      >
                        {language?.service} {language?.edit}
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${color.text} divide-y divide-gray-200`}>
                    {services?.map((item, idx) => (
                      <tr className={`${color?.hover}`} key={idx}>
                        <td className="py-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                          <span className={`${color.text} py-4 px-2 whitespace-nowrap text-base font-medium capitalize `}>
                            {"  " +
                              item?.service_name?.replace(/_+/g, " ")}
                          </span>
                        </td>

                        <td className={`${color.text} px-4 py-4 whitespace-nowrap text-base font-normal `}>
                          <div className="flex">
                            <div className="form-check ml-4 form-check-inline">

                              <label htmlFor={"default-toggle" + idx} className="inline-flex relative items-center cursor-pointer">

                                <input type="checkbox" value={item?.service_value} checked={item?.service_value == true}
                                  onChange={() => {
                                    setServices(services?.map((i) => {

                                      if (i?.service_id === item?.service_id) {
                                        i.service_value = !i.service_value

                                      }
                                      return i
                                    }))
                                  }}
                                  id={"default-toggle" + idx} className="sr-only peer" />
                                <div
                                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                                 peer-checked:after:translate-x-full 
                                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                  after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 justify-end space-x-2 sm:space-x-3 ml-auto">
          <Button Primary={language?.Previous} onClick={() => { setDisp(0) }} />
          <div className={spinner === 0 ? 'block py-1' : 'hidden'}>
            <Button Primary={roomDetails?.room_facilities !== undefined ? language?.Update : language?.Submit}
              onClick={() => { roomDetails?.room_facilities !== undefined ? editServices() : submitServices() }} />
          </div>
          <div className={spinner === 1 ? 'block py-1' : 'hidden'}>
            <Button Primary={roomDetails?.room_facilities !== undefined ? language?.SpinnerUpdate : language?.SpinnerSubmit}
            />
          </div>
          <Button Primary={language?.Next} onClick={() => { setDisp(2) }} />
        </div>
      </div>
    </div>
  )
}

export default RoomService