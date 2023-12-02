import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Lineloader from '../loaders/lineloader';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import validateUnavailability from '../validation/room/roomUnavailability';
import ButtonLoader from './ButtonLoader';
var currentProperty;
var currentRoom;
var currentLogged;
const logger = require("../../services/logger");

function InventoryModal({ error, setError, setView, setInventories, view, color, language }) {
  const [inventory, setInventory] = useState([])
  const [visible, setVisible] = useState(0);
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

  //fetch all rooms 
  const fetchRooms = async (args) => {
    const url = `/api/rooms/${currentProperty?.property_id}`;
    axios.get(url)
      .then((response) => {

        // var result = response?.data.filter(el => {
        //   return !args?.find(element => {
        //     return el.room_id === element.room_id;
        //   });
        // });

        // setAllRooms(result);
        setAllRooms(response?.data);

      })
      .catch((error) => {
        logger.error("url to fetch property details, failed")
      });
  }

  useEffect(() => {
    const firstfun = () => {
      if (typeof window !== 'undefined') {

        /** Current Property Basic Details fetched from the local storage **/
        currentProperty = JSON.parse(localStorage.getItem('property'))
        currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        currentRoom = localStorage.getItem('RoomId');
        fetchRooms();
        setVisible(1);
      }
    }
    firstfun();
  }, [view])

  // Fetch Hotel Details
  // const fetchHotelDetails = async () => {
  //   const url = `/api/inventory/${currentProperty.property_id}`;
  //   axios.get(url)
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         setInventories(response.data)
  //         setView(0)
  //         fetchInventoryRooms()

  //       } else {
  //         setInventories([])
  //         fetchInventoryRooms()

  //       }
  //     })
  //     .catch((error) => {
  //       logger.error("url to fetch property details, failed")
  //     });


  // }
  // Inventory
  const submitUnavailability = () => {
    const current = new Date();
    const currentDateTime = current.toISOString();
    const final_data = {
      "unavailablity": [{
        "property_id": currentProperty?.property_id,
        "date_from": inventory?.date_from,
        "date_to": inventory?.date_to,
        "room_id": inventory?.room_id,
        "unavailablity_count": inventory?.unavailability_count,
        "reason": inventory?.reason
      }]
    }

    const url = '/api/unavailability'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("Unavailability Added successfully", {
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
      })
      .catch((error) => {
        setAddLoader(false)
        toast.error("There was some Error in adding the Unavailability ", {
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

  // Validate Inventory
  const validation = () => {
    var result = validateUnavailability(inventory);
    if (result === true) {
      submitUnavailability();
    }
    else {
      setError(result);
      setAddLoader(false);
    }
  }

  return (
    <>

      <div id="main-content"
        // className={`${color?.greybackground} px-4 pt-24 relative overflow-y-auto lg:ml-64`}>
        className={`${color?.greybackground} px-4 py-10 relative overflow-y-auto `}>
        {/* Navbar */}

        <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
          <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
            {language?.unavailability}
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
                        {language?.datefrom} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="date"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, date_from: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm  text-red-700 font-light">
                          {error?.date_from}</p></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.dateto} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="date"
                          className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, date_to: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.date_to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.rooms} {language?.unavailability} {language?.count} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="number" min={1}
                          className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, unavailability_count: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm  text-red-700 font-light">
                          {error?.unavailability_count}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.rooms} {language?.unavailability} {`Reason`} <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setInventory({ ...inventory, reason: e.target.value })
                            )
                          }
                        />
                        <p className="text-sm  text-red-700 font-light">
                          {error?.reason}</p>
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
              validation()
            }}
            className={`bg-gradient-to-r  bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
          >
            Add
          </button>}

      </div>


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