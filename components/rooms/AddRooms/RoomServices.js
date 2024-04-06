import React,{useState} from 'react'
import WidgetStatus from '../../widgetStatus'
import Button from '../../Button'
import { submitServices } from '../../logic/property/Rooms/AddRoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomServices({color,language,services,setServices,roomId, setDisp}) {
    const [spinner,setSpinner]=useState(0);
    const [flag,setFlag]=useState(0);
  return (
    <div className={`${color?.whitebackground} shadow rounded-lg mt-2 mx-1 px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
    <WidgetStatus name={[`${language?.room} ${language?.description}`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]}
                selected={2}
                color={color} />
    <h6 className={`${color?.text} text-xl flex leading-none pl-6 pt-2 font-bold  mb-8`}>
      {language?.room} {language?.services}
    </h6>
    <div className="flex flex-col my-4 ">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <table className="table-fixed min-w-full divide-y mx-8 divide-gray-200 ">
              <thead className={`${color.greybackground}`}>
                <tr >
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

                    <td className={`${color.text} px-2 py-4 whitespace-nowrap text-base font-normal `}>
                      <div className="flex">
                        <div className="form-check ml-4 form-check-inline">
                          <label htmlFor={"default-toggle" + idx} className="inline-flex relative items-center cursor-pointer">
                            {item?.service_value}
                            <input type="checkbox" value={item?.service_value}
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
      <Button Primary={language?.Skip} onClick={() => { setDisp(3) }} />
      {spinner === 0 && <Button Primary={language?.Submit} onClick={() => { submitServices(setSpinner, services, roomId, setDisp) }} />}
      {spinner === 1 && <Button Primary={language?.Spinnersubmit} />}
    </div>
  </div>

  )
}

export default RoomServices