import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
import axios from 'axios';
import CountupBoxRow from '../../components/Dashboard/CountupBoxRow';
import CountupBox from '../../components/Dashboard/CountupBox';

var language;
var currentProperty;
var currentLogged;
let colorToggle;

function Dashboard() {
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  const [roomCount, setRoomCount] = useState()
  const [totalServices, setTotalServices] = useState([])
  const [avgReviewRating, setAvgReviewRating] = useState([])
  const [userBrowsers, setUserBrowsers] = useState([])
  const [userPlatforms, setUserPlatforms] = useState([])
  const [userTimeZone, setUserTimeZone] = useState([])
  const [userLanguages, setUserLanguages] = useState([])
  const [outOfServiceRoomsToday, setOutOfServiceRoomsToday] = useState([])
  const [soldOutRooms, setSoldOutRooms] = useState([])
  const [roomsAvailableToday, setRoomsAvailableToday] = useState([])
  const [uniqueUsers, setUniqueUsers] = useState([])
  const [totalBookings, setTotalBookings] = useState([])
  const [totalRoomsBooked, setTotalRoomsBooked] = useState([])
  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle
    fetchDashboardData()
  }, [])

  function fetchDashboardData() {
    let url = `/api/dashboard/${currentProperty?.property_id}`
    axios.get(url).then(
      (resp) => {
        setRoomCount(resp?.data?.room_count[0].total_rooms)
        setTotalServices(resp?.data?.total_services[0].total_services)
        setAvgReviewRating(resp?.data?.avg_review_ratings[0].aggregate_review)
        setUserBrowsers(resp?.data?.user_browsers)
        setUserPlatforms(resp?.data?.user_platform)
        setUserTimeZone(resp?.data?.user_time_zone)
        setUserLanguages(resp?.data?.user_languages)
        setOutOfServiceRoomsToday(resp?.data?.rooms_out_of_service_today[0]?.rooms_unavailable_today)
        setSoldOutRooms(resp?.data?.sold_out_rooms_today[0]?.rooms_booked_today)
        setRoomsAvailableToday(resp?.data?.rooms_available_today[0]?.available_rooms)
        setUniqueUsers(resp?.data?.unique_users[0]?.unique_users)
        setTotalRoomsBooked(resp?.data?.total_rooms_booked[0]?.total_rooms_booked)
        setTotalBookings(resp?.data?.total_bookings[0]?.total_bookings)

      }
    ).catch((err) => {
      toast.error("Failed to get dashboard data");
    })
  }

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

              {/* row-1  */}
              <div className='bg-sky-600 text-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <CountupBox title={'Total Rooms'} countUpValue={roomCount} />
                  <CountupBox title={'Total Bookings'} countUpValue={totalBookings} />
                  <CountupBox title={'Total Rooms Booked'} countUpValue={totalRoomsBooked} />
                </div>
              </div>
              {/* row-2  */}
              <div className='bg-sky-600 text-white shadow rounded-lg mb-1 p-4 sm:p-6 h-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <CountupBox title={'Total Hotel Services'} countUpValue={totalServices} />
                  <CountupBox title={'Average Review Rating'} countUpValue={avgReviewRating} decimals={2} />
                  <CountupBox title={'Unique Users'} countUpValue={uniqueUsers} />
                </div>
              </div>
            </div>


            <div className='flex flex-wrap gap-x-8 justify-center'>

              <Piechart
                color={color}
                data={{ "Referal Traffic": 40, "Direct Traffice": 100, "Organic Traffic": 34 }}
                title={`Traffic Distribution`}
                id={'userTraffic'}
              />
              {/* traffic Distribution end*/}

              {/* user Languages start  */}
              <Piechart
                color={color}
                data={userLanguages.map(i => ({ [i.language]: i.language_count })).reduce((acc, obj) => ({ ...acc, ...obj }), {})}
                title={`User Lanaguages`}
                id={'userLanguages'}

              />
              {/* user Languages end*/}

              {/* user timezone start  */}
              <Piechart
                color={color}
                data={userTimeZone.map(i => ({ [i.time_zone]: i.time_zone_count })).reduce((acc, obj) => ({ ...acc, ...obj }), {})}
                title={`User Time Zones`}
                id={'userTimezones'}
              />
              {/* user timezone end*/}

              {/* traffic source start  */}
              <Barchart
                color={color}
                chartLabel={`user per platform`}
                data={userPlatforms.map(i => ({ [i.platform]: i.platform_count })).reduce((acc, obj) => ({ ...acc, ...obj }), {})}
                title={`Traffic Source`}
                id={'userPlatforms'}
              />
              {/* traffic source end*/}

              {/* user browser start  */}
              <Barchart
                color={color}
                chartLabel={`user per browser`}
                data={userBrowsers.map(i => ({ [i.browser_name]: i.browser_name_count })).reduce((acc, obj) => ({ ...acc, ...obj }), {})}
                title={`Browsers`}
                id={'userBrowsers'}
              />
              {/* user browser end*/}

            </div>




            {/* room details */}
            <div className="my-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
              <CountupBoxRow title={'Available Rooms Today'}
                countUpValue={roomsAvailableToday}
                style={'bg-yellow-500 text-white'} />

              <CountupBoxRow title={'Sold Out Rooms Today'}
                countUpValue={soldOutRooms}
                style={'bg-green-700 text-white'} />

              <CountupBoxRow title={'Out Of Service Rooms Today'}
                countUpValue={outOfServiceRoomsToday}
                style={'bg-gray-700 text-white'} />
            </div>

            {/* out of service rooms info table*/}
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