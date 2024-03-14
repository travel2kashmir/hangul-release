import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dashboardImage from "../../public/dash-graph.PNG"
import Title from '../../components/title';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { english, arabic, french } from "../../components/Languages/Languages";
import Button from "../../components/Button";
import Footer from '../../components/Footer';
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from 'react-countup';
import Piechart from '../../components/Dashboard/Piechart';
import Barchart from '../../components/Dashboard/Barchart';


var language;
var currentProperty;
var currentLogged;
let colorToggle;

function Dashboard() {
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()

  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle
  }, [])

  function navigationList(currentLogged, currentProperty) {
    return ([
      {
        icon: "homeIcon",
        text: "Home",
        link: currentLogged?.id.match(/admin.[0-9]*/)
          ? "../admin/adminlanding"
          : "./landing"
      },
      {
        icon: "rightArrowIcon",
        text: [currentProperty?.property_name],
        link: "./propertysummary"
      },
      {
        icon: "rightArrowIcon",
        text: "Basic Details",
        link: ""
      }
    ])
  }


  let displayData = [
    {
      "unavailability_id": "unavl0015",
      "room_id": "r003",
      // "date_from": "2023-12-23",
      // "date_to": "2023-12-24",
      "date": "2023-12-28",
      "unavailability_count": 1,
      "reason": "bed change",
      "property_id": "t2k004",
      "room_name": "Couple Room"
    },
    {
      "unavailability_id": "unavl0017",
      "room_id": "r003",
      // "date_from": "2023-12-20",
      // "date_to": "2023-12-21",
      "date": "2023-12-28",
      "unavailability_count": 2,
      "reason": "winterisation",
      "property_id": "t2k004",
      "room_name": "Couple Room"
    },
    {
      "unavailability_id": "unavl0016",
      "room_id": "r005",
      // "date_from": "2023-12-21",
      // "date_to": "2023-12-22",
      "date": "2023-12-28",
      "unavailability_count": 4,
      "reason": "furniture change",
      "property_id": "t2k004",
      "room_name": "Prince Room"
    }
  ];



  return (
    <>
      <Title name={`Engage |  ${language?.dashboard}`} />

      <Header color={color} setColor={setColor} Primary={english.Side} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />

      <Sidebar color={color} Primary={english.Side} Type={currentLogged?.user_type} />

      <div id="main-content" className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        <main>
          <div className="pt-6 md:px-4">
            {/* traffic charts starts */}


            {/* other details */}
            <div className='my-4'>
              <div className='bg-sky-600 text-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold'><CountUp end={569} duration={1.5} /></h2>
                    <p className='md:pt-2 '>Total Customers</p>
                    {/* <p className='md:pt-2 text-gray-600'>Total Customers</p> */}
                  </div>
                  <div className='text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold'><CountUp end={2000} duration={1.5} /></h2>
                    <p className='md:pt-2 '>Total Rooms</p>
                    {/* <p className='md:pt-2 text-gray-600'>Total Rooms</p> */}
                  </div>
                  <div className='text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold'>₹ <CountUp end={750000} duration={1.5} decimal='4' /></h2>
                    <p className='md:pt-2 '>Total Transaction</p>
                    {/* <p className='md:pt-2 text-gray-600'>Total Transaction</p> */}
                  </div>

                </div>
              </div>
            </div>


            <div className='flex'>
              <Piechart />
              <Barchart />
            </div>


            {/* traffic charts ends */}

            {/* room details */}
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
              <div className="bg-yellow-500 text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex justify-between my-auto">
                  <div className='my-auto'>
                    <h2 className='font-semibold'>Available Rooms Today</h2>
                  </div>
                  <div >
                    <span className='text-3xl md:text-4xl leading-none font-bold text-white'><CountUp end={20} duration={1.5} /></span>
                  </div>
                </div>
              </div>
              <div className="bg-green-700 text-white shadow-xl rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex justify-between my-auto">
                  <div className='my-auto'>
                    <h2 className='font-semibold'>Sold Out Rooms Today</h2>
                  </div>
                  <div >
                    <span className='text-3xl md:text-4xl leading-none font-bold text-white'><CountUp end={10} duration={1.5} /></span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex justify-between my-auto">
                  <div className='my-auto'>
                    <h2 className='font-semibold'>Out Of Service Rooms Today</h2>
                  </div>
                  <div >
                    <span className='text-3xl md:text-4xl leading-none font-bold text-white'><CountUp end={5} duration={1.5} /></span>
                  </div>
                </div>
              </div>
            </div>




            {/* out of service rooms info */}
            <div className={`${color?.whitebackground}  shadow rounded-lg mb-4 p-4 sm:p-6 h-full`}>
              <h3 className={`text-xl font-bold leading-none  ${color?.text}`}>Out of Service Rooms Today</h3>

              <div className='pt-10'>
                <div className='overflow-x-auto'>
                  <table className=" table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                    <thead className={` ${color?.tableheader} `}>
                      <tr>
                        <th scope="col"
                          className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Room Name"}</th>
                        <th scope="col"
                          className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Out Of Service Rooms"}</th>

                        {/* <th scope="col"
                        className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Start Date"}</th>
                      <th scope="col"
                        className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"End Date"}</th> */}
                        <th scope="col"
                          className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Date"}</th>
                        <th scope="col"
                          className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Inventory Out Of Service"}</th>
                        <th scope="col"
                          className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Out Of Service Reason"}</th>

                        {/* <th scope="col"
                      className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>{"Action"}
                    </th> */}
                      </tr>
                    </thead>

                    <tbody className={` ${color?.whitebackground} divide-y divide-gray-200 `} id="TableList" >

                      {displayData?.map((inv, index) => {

                        return <tr key={index} >
                          <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                            {inv.room_name}
                          </td>

                          <td className={`p-4 whitespace-nowrap  text-base font-normal ${color?.text}`}>
                            <span className="text-white bg-cyan-600 border-none rounded-full py-1 px-2 mx-1 ">r01</span>
                          </td>
                          <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                            {inv.date}
                          </td>
                          {/* <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                          {inv.date_from}
                        </td>
                        <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                          {inv.date_to}
                        </td> */}
                          <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                            {inv.unavailability_count}
                          </td>
                          <td className={`p-4 whitespace-nowrap capitalize  text-base font-normal ${color?.text}`}>
                            {inv.reason}
                          </td>
                          {/* <td className="py-4 whitespace-nowrap capitalize">
                        <button
                          className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                          onClick={() => {
                            // setEdit({
                            //   'value': 1,
                            //   'idx': index
                            // })
                            // findAllRefs(inv);
                          }}
                        >{'Edit'} </button>
                        <button
                          className="ml-5 bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                          onClick={() => {
                            // setDeleteInventory({
                            //   'value': 1,
                            //   'idx': index
                            // })
                          }}
                        >{'Delete'} </button>
                      </td> */}
                        </tr>

                      })}



                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>

      </div>


      <Footer color={color} Primary={english.Foot} />



    </>
  )
}

export default Dashboard