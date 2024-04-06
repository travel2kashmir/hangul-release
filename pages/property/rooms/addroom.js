import React, { useEffect, useState } from 'react';
import lang from '../../../components/GlobalData'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Router from 'next/router'
import BreadCrumb from '../../../components/utils/BreadCrumb';
import { fetchRoomtypes, fetchServices, navigationList } from '../../../components/logic/property/Rooms/AddRoom';
import AddNewRatesofRoom from '../../../components/rooms/AddNewRatesofRoom';
import { RoomBeds, RoomDescripiton, RoomGallery, RoomServices } from '../../../components/rooms/AddRooms';

var currentLogged;
let colorToggle;
var language;
var currentProperty;
var addroom;


function Addroom() {
  const [spinner, setSpinner] = useState(0)
  const [color, setColor] = useState({})
  const [visible, setVisible] = useState(0)
  const [roomtypes, setRoomtypes] = useState([]);
  const [services, setServices] = useState([])
  const [roomId, setRoomId] = useState([])
  const [finalView, setFinalView] = useState([])
  // const [disp, setDisp] = useState(3);
  const [disp, setDisp] = useState(0);
  const [error, setError] = useState({})
  const [flag, setFlag] = useState(0)
  const [allRoomRates, setAllRoomRates] = useState([])
  const [mode, setMode] = useState()
  const [roomIdentifiers, setRoomIdentifiers] = useState()
  const [allRoomDes, setAllRoomDes] = useState([]);/*For Room Description*/

  /** Use Effect to fetch details from the Local Storage **/

  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle

    /** To fetch room types and room services **/
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchRoomtypes(setRoomtypes, setVisible);
      fetchServices(setServices);
    }
  }, [])

  function manageIdentifiers(room_id, room_type_id) {
    let id = roomIdentifiers?.split(",")
    let final = [];
    let temp;
    id.map((i) => {
      temp = {
        "room_id": room_id,
        "room_type_id": room_type_id,
        "room_identifier": i
      }
      final.push(temp);

    })
    axios.post('/api/room_refrence', { "room_refrences": final },
      { headers: { 'content-type': 'application/json' } })
      .then(response => {
        setSpinner(0);
        toast.success("API: Room Refrences Added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(() => {
        toast.error("API: Room Refrences Added Failed", {
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

 //add new inventory 
  const submitInventory = (room_id) => {
    const current = new Date();
    const currentDateTime = current.toISOString();
    const final_data = {
      "inventory": [{
        "property_id": currentProperty?.property_id,
        "start_date": new Date().toISOString().split('T')[0],
        "end_date": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "days_of_week": 'mtwtfss',
        "room_id": room_id,
        "inventory_count": allRoomDes?.inventory_count,
        "inventory_type": 2
      }]
    }
    // const url = '/api/ari/inventory'
    const url = '/api/inventory'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("API:Inventory Added successfully", {
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
        toast.error("API:There was some Error in adding the Inventory ", {
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


  // View Submit
  const submitView = (props) => {
    const data = finalView?.map((i => {
      return {
        "room_id": props,
        "view": i?.view
      }
    }))
    const final_data = { "room_views": data }
    const url = '/api/room_views'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("API: View add success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setError({});
      })
      .catch((error) => {
        toast.error("API: View add error.", {
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

// Bed Data Submit
const submitBed = (props) => {
  const current = new Date();
  const currentDateTime = current.toISOString();
  setSpinner(1);
  const data = BedData?.map((i => {
      return {
          "room_id": props,
          "length": i?.length,
          "width": i?.width,
          "unit": "cm",
          "timestamp": currentDateTime
      }
  }))
  const final_data = { "beds": data }
  const url = '/api/bed_details'
  axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
          setSpinner(0);
          toast.success("API: Bed add success", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          setError({});
          setFlag([]);
          setBedData([BedTemplate]?.map((i, id) => { return { ...i, index: id } }));
      })
      .catch((error) => {
          setSpinner(0);
          toast.error("API: Bed add error", {
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
    <>
      <Title name={`Engage | Add Room`} />

      <Header
        Primary={english?.Side1}
        color={color}
        setColor={setColor}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
        mode={mode}
        setMode={setMode}
      />

      <Sidebar
        Primary={english?.Side1}
        color={color}
        Type={currentLogged?.user_type}
      />

      <div id="main-content"
        className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Title */}
        <div className=" pt-2 ">

          <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2 font-bold`}>
            {language?.add} {language?.room}
          </h6>

          {/* Room Forms */}
          {/* Room Description */}
          {disp===0 && 
            <RoomDescripiton color={color} language={language} visible={visible} error={error} setError={setError} allRoomDes={allRoomDes} setAllRoomDes={setAllRoomDes} finalView={finalView} setFinalView={setFinalView} roomIdentifiers={roomIdentifiers} setRoomIdentifiers={setRoomIdentifiers} setDisp={setDisp} spinner={spinner} setSpinner={setSpinner} currentProperty={currentProperty} setRoomId={setRoomId} submitBed={submitBed} submitView={submitView} submitInventory={submitInventory} manageIdentifiers={manageIdentifiers} roomtypes={roomtypes} lang={lang} />
          }

          {/* Room Beds */}
          {disp===1 && 
           <RoomBeds color={color} language={language} visible={visible} allRoomDes={allRoomDes} currentProperty={currentProperty} setRoomId={setRoomId} submitView={submitView} submitInventory={submitInventory} manageIdentifiers={manageIdentifiers} setAllRoomDes={setAllRoomDes} setDisp={setDisp}/>
          }

          {/* Room Services */}
          {disp===2 &&
            <RoomServices color={color} language={language} services={services} setServices={setServices} roomId={roomId} setDisp={setDisp}/>
           }

          {/* Room Gallery */}
          {disp===3 && 
          <RoomGallery color={color} language={language} currentProperty={currentProperty} roomId={roomId} setDisp={setDisp}/>
          }

          {/* Room Rates */}
         {disp===4 &&
            <AddNewRatesofRoom color={color} language={language} roomId={roomId}/>
          } 
        

        </div>

        {/* Toast Container */}
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

      <Footer color={color} Primary={english.Foot1} />

    </>
  )
}

export default Addroom
Addroom.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )


}

