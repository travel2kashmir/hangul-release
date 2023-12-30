import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dashboardImage from "../../public/dash-graph.PNG"
import Title from '../../components/title';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import english from "../../components/Languages/en";
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
import Button from "../../components/Button";
import Footer from '../../components/Footer';
import colorFile from '../../components/colors/Color';
import Headloader from '../../components/loaders/headloader';
import Textboxloader from '../../components/loaders/textboxloader';
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from 'react-countup';


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
            {/* <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">$45,385</span>
                    <h3 className="text-base font-normal text-gray-500">Sales this week</h3>
                  </div>
                  <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    12.5%
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <Image src={dashboardImage} width="400px" height="450px" alt="DashboardGraph" />
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Transactions</h3>
                    <span className="text-base font-normal text-gray-500">This is a list of latest transactions</span>
                  </div>
                  <div className="flex-shrink-0">
                    <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
                  </div>
                </div>

                <div className="flex flex-col mt-8">
                  <div className="overflow-x-auto rounded-lg">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment from <span className="font-semibold">Bonnie Green</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 23 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $2300
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                Payment refund to <span className="font-semibold">#00910</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 23 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                -$670
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment failed from <span className="font-semibold">#087651</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 18 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $234
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                Payment from <span className="font-semibold">Lana Byrd</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 15 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $5000
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment from <span className="font-semibold">Jese Leos</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 15 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $2300
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                Payment from <span className="font-semibold">THEMESBERG LLC</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 11 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $560
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment from <span className="font-semibold">Lana Lysle</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 6 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $1437
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}






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


              {/* <div className="bg-white text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">2,340</span>
                    <h3 className="text-base font-normal text-gray-500">New products this week</h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    14.6%
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>

              </div>
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5,355</span>
                    <h3 className="text-base font-normal text-gray-500">Visitors this week</h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    32.9%
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">385</span>
                    <h3 className="text-base font-normal text-gray-500">User signups this week</h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                    -2.7%
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>

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



            {/* <div className="grid grid-cols-1 xl:grid-cols-1 xl:gap-4 my-4">

              <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold leading-none text-gray-900">Latest Customers</h3>
                  <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                    View all
                  </a>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src="/man.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Neil Sims
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            <a className="__cf_email__" data-cfemail="aacfc7cbc3c6eaddc3c4ced9decfd884c9c5c7">email@engage.com</a>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          $320
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/bonnie-green.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Bonnie Green
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            <a className="__cf_email__" data-cfemail="aacfc7cbc3c6eaddc3c4ced9decfd884c9c5c7">email@engage.com</a>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          $3467
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/michael-gough.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Michael Gough
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            <a className="__cf_email__" data-cfemail="aacfc7cbc3c6eaddc3c4ced9decfd884c9c5c7">email@engage.com</a>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          $67
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/thomas-lean.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Thomes Lean
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            <a className="__cf_email__" data-cfemail="aacfc7cbc3c6eaddc3c4ced9decfd884c9c5c7">email@engage.com</a>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          $2367
                        </div>
                      </div>
                    </li>
                    <li className="pt-3 sm:pt-4 pb-0">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Lana Byrd
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            <a className="__cf_email__" data-cfemail="aacfc7cbc3c6eaddc3c4ced9decfd884c9c5c7">email@engage.com</a>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          $367
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">

                <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Acquisition Overview</h3>
                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">Top Channels</th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">Users</th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="text-gray-500">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Organic Search</th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">5,649</td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">30%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div className="bg-cyan-600 h-2 rounded-sm" style={{ width: "30%" }}></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Referral</th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">4,025</td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">24%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div className="bg-orange-300 h-2 rounded-sm" style={{ width: "24%" }}></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Direct</th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">3,105</td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">18%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div className="bg-teal-400 h-2 rounded-sm" style={{ width: "18%" }}></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Social</th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">1251</td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">12%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div className="bg-pink-600 h-2 rounded-sm" style={{ width: "12%" }}></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Other</th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">734</td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">9%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div className="bg-indigo-600 h-2 rounded-sm" style={{ width: "9%" }}></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">Email</th>
                        <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">456</td>
                        <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">7%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div className="bg-purple-500 h-2 rounded-sm" style={{ width: "7%" }}></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}


          </div>
        </main>

      </div>


      <Footer color={color} Primary={english.Foot} />



    </>
  )
}

export default Dashboard