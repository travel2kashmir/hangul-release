import React, { useState, useEffect } from 'react'
import lang from '../../../components/GlobalData'
import { ToastContainer, toast } from 'react-toastify';
import Lineloader from '../../../components/loaders/lineloader';
import Multiselect from 'multiselect-react-dropdown';
import DarkModeLogic from '../../../components/darkmodelogic';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Router from "next/router";
import english from "../../../components/Languages/en"
import french from "../../../components/Languages/fr"
import arabic from "../../../components/Languages/ar";
import Loader from '../../../components/loaders/loader';
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import Headloader from '../../../components/loaders/headloader';
import Textboxloader from '../../../components/loaders/textboxloader';
import Link from "next/link";
import validateInventory from '../../../components/validation/validateInventory';
import ButtonLoader from './ButtonLoader';
var language;
var currentProperty;
var currentRoom;
var currentLogged;
var days_of_week = 'mtwtfsu';
const logger = require("../../../services/logger");

function InventoryModal({ error, setError, setView, setInventories, view, color, language }) {
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [inventory, setInventory] = useState([])
  // const [gen, setGen] = useState([])
  const [visible, setVisible] = useState(0);
  // const [error, setError] = useState({})
  // const [color, setColor] = useState({})
  const [allRooms, setAllRooms] = useState([])

  const [addLoader, setAddLoader] = useState(false)

  //fetch rooms with inventory
  const fetchInventoryRooms = async () => {
    // const url = `/api/ari/inventory/${currentProperty?.property_id}`;
    const url = `/api/inventory/${currentProperty?.property_id}`;
    axios.get(url)
      .then((response) => {
        fetchRooms(response.data.length > 0 ? response.data : []);
      })
      .catch((error) => { logger.error("url to fetch property details, failed") });
  }

  //fetch all rooms and filter rooms without inv  
  const fetchRooms = async (args) => {
    const url = `/api/rooms/${currentProperty?.property_id}`;
    axios.get(url)
      .then((response) => {

        var result = response?.data.filter(el => {
          return !args?.find(element => {
            return el.room_id === element.room_id;
          });
        });

        setAllRooms(result);
        if (result.length === 0) {
          toast.warn("Inventory for all rooms is registered ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        logger.error("url to fetch property details, failed")
      });
  }

  useEffect(() => {
    const firstfun = () => {
      if (typeof window !== 'undefined') {
        // var locale = localStorage.getItem("Language");
        // const colorToggle = JSON.parse(localStorage.getItem("ColorToggle"));
        // const color = JSON.parse(localStorage.getItem("Color"));
        // setColor(color);
        // setDarkModeSwitcher(colorToggle);
        // if (locale === "ar") {
        //   language = arabic;
        // }
        // if (locale === "en") {
        //   language = english;
        // }
        // if (locale === "fr") {
        //   language = french;
        // }
        /** Current Property Basic Details fetched from the local storage **/
        currentProperty = JSON.parse(localStorage.getItem('property'))
        currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        currentRoom = localStorage.getItem('RoomId');
        fetchInventoryRooms()
        setVisible(1);
      }
    }
    firstfun();
  }, [view])

  // Fetch Hotel Details
  const fetchHotelDetails = async () => {
    const url = `/api/inventory/${currentProperty.property_id}`;
    axios.get(url)
      .then((response) => {
        if (response.data.length > 0) {
          setInventories(response.data)
          setView(0)
          fetchInventoryRooms()

        } else {
          setInventories([])
          fetchInventoryRooms()

        }
      })
      .catch((error) => {
        logger.error("url to fetch property details, failed")
      });


  }
  // Inventory
  const submitInventory = () => {
    const current = new Date();
    const currentDateTime = current.toISOString();
    const final_data = {
      "inventory": [{
        "property_id": currentProperty?.property_id,
        "start_date": inventory?.start_date,
        "end_date": inventory?.end_date,
        "days_of_week": 'mtwtfss',
        "room_id": inventory?.room_id,
        "inventory_count": inventory?.inventory_count,
        "inventory_type": 2
      }]
    }
    // const url = '/api/ari/inventory'
    const url = '/api/inventory'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("Inventory Added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setInventory([])
        document.getElementById("inventoryAddForm").reset();
        setError({})
        setAddLoader(false)
        fetchHotelDetails()
      })
      .catch((error) => {
        setAddLoader(false)
        toast.error("There was some Error in adding the Inventory ", {
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
  // Days
  // const days = (days) => {
  //   var days_present = ['-', '-', '-', '-', '-', '-', '-'];
  //   days.map(day => {
  //     if (day.day === 'mon') {
  //       days_present[0] = 'm'
  //     }
  //     else if (day.day === 'tue') {
  //       days_present[1] = 't'
  //     }
  //     else if (day.day === 'weds') {
  //       days_present[2] = 'w'
  //     }
  //     else if (day.day === 'thur') {
  //       days_present[3] = 't'
  //     }
  //     else if (day.day === 'fri') {
  //       days_present[4] = 'f'
  //     }
  //     else if (day.day === 'sat') {
  //       days_present[5] = 's'
  //     }
  //     else if (day.day === 'sun') {
  //       days_present[6] = 's'
  //     }
  //   })
  //   days_of_week = days_present.toString().replaceAll(',', '');
  // }
  // Validate Inventory

  const validationInventory = () => {
    var result = validateInventory(inventory, 'mtwtfss')
    console.log("Result" + JSON.stringify(result))
    if (result === true) {
      submitInventory();
    }
    else {
      setError(result)
      setAddLoader(false)
    }
  }
  return (
    <>
      {/* <Header color={color} Primary={english?.Side} /> */}
      {/* <Sidebar color={color} Primary={english?.Side} /> */}

      <div id="main-content"
        // className={`${color?.greybackground} px-4 pt-24 relative overflow-y-auto lg:ml-64`}>
        className={`${color?.greybackground} px-4 py-10 relative overflow-y-auto `}>
        {/* Navbar */}

        <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
          <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
            {language?.inventory}
          </h6>
          <div className="pt-6">
            <div className=" md:px-4 mx-auto w-full">
              <form id='inventoryAddForm'>
                <div className="flex flex-wrap">


                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.startdate} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="date"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, start_date: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm  text-red-700 font-light">
                          {error?.start_date}</p></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.enddate} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="date"
                          className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, end_date: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.end_date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.rooms}  {language?.count} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="number" min={1}
                          className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, inventory_count: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm  text-red-700 font-light">
                          {error?.inventory_count}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`w-full  lg:w-6/12 px-4`}>
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.rooms}  <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>

                      <div className={visible === 1 ? `block ` : 'hidden'}>
                        <select
                          onClick={(e) => (
                            setInventory({ ...inventory, room_id: e.target.value })
                          )
                          }
                          className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        // className={`shadow-sm ${color.greybackground} ${color?.text} border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        >
                          <option selected>Select rooms</option>
                          {allRooms?.map((i) => {
                            return (
                              <option key={i} value={i.room_id}>
                                {i.room_name}
                              </option>
                            );
                          })}
                        </select>
                        <p className="text-sm  text-red-700 font-light">
                          {error?.room}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
      </div>

      <div className='p-5 flex justify-end'>
        {addLoader === true ?
          <ButtonLoader
            classes="bg-gradient-to-r  bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
            text="Add"
          />
          : <button
            onClick={() => {
              setAddLoader(true)
              validationInventory()
            }}
            className={`bg-gradient-to-r  bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
          >
            Add
          </button>}

      </div>




      {/* <Footer color={color} Primary={english?.Side} /> */}
    </>
  )
}

export default InventoryModal
InventoryModal.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}