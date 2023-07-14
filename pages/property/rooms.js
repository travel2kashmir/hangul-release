import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../components/loaders/darktableloader';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import colorFile from "../../components/colors/Color";
import axios from "axios";
import Link from "next/link";
import Table from '../../components/Table';
import GenericTable from '../../components/utils/Tables/GenericTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../components/title';
import { english, french, arabic } from "../../components/Languages/Languages"
import LoaderTable from "../../components/loadertable";
import Headloader from "../../components/loaders/headloader";
import { InitialActions, ColorToggler } from '../../components/initalActions';
import Button from '../../components/Button';
var language;
var currentProperty;
var currentLogged;
let colorToggle;
import Router from "next/router";

function Rooms() {
  const [visible, setVisible] = useState(0)
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  const [gen, setGen] = useState([])
  const [allrooms, setAllRooms] = useState([])
  const [deleteMultiple, setDeleteMultiple] = useState(0);
  const [deleteRoomId, setDeleteRoomId] = useState()
  const [spinner, setSpinner] = useState(0)

  /** Use Effect to fetch details from the Local Storage **/
  useEffect(() => {
    firstfun();
  }, [])

  const firstfun = () => {
    if (typeof window !== 'undefined') {
      var locale = localStorage.getItem("Language");
      colorToggle = localStorage.getItem("colorToggle");
      if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
        window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light)
        setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
      }
      else if (colorToggle === "true" || colorToggle === "false") {
        setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
        setMode(colorToggle === "true" ? true : false)
      }
      {
        if (locale === "ar") {
          language = arabic;
        }
        if (locale === "en") {
          language = english;
        }
        if (locale === "fr") {
          language = french;
        }
      }

      /** Current Property Details fetched from the local storage **/
      currentProperty = JSON.parse(localStorage.getItem("property"));
      currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
    }
  }

  /**Function to save Current property to be viewed to Local Storage**/
  const currentRoom = (id) => {
    localStorage.setItem("RoomId", id);
    Router.push("./rooms/editroom");
  };

  const fetchRooms = async () => {
    try {
      var genData = [];
      const url = `/api/rooms/${currentProperty.property_id}`
      const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
      setAllRooms(response.data)
      setVisible(1)

      response?.data?.map((item) => {
        var temp = {
          "checkbox": { operation: undefined },
          "Room Name": item.room_name,
          "Room Type": item.room_type_name.replaceAll("_", " "),
          "status": JSON.stringify(item.status),
          "id": item.room_id,
          isChecked: false,
          // isChecked:true,
          Actions: [
            {
              type: "button",
              label: "View",
              operation: (item) => { currentRoom(item) }
            },
            {
              type: "button",
              label: "Delete",
              operation: (item) => { deleteRooms(item) }
            }
          ],
        }
        genData.push(temp)
      }
      )
      setGen(genData);

    }
    catch (error) {

      if (error.response) {
      }
      else {
      }
    }
  }

  useEffect(() => {
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchRooms();
    }
  }, [])


  /* Delete Room Function*/
  const deleteRooms = (props) => {
    setDeleteRoomId(props);
    setDeleteMultiple(1);
  }

  function confirmedDelete(props) {
    setSpinner(1);
    const url = `/api/${props}`
    axios.delete(url).then((response) => {
      toast.success(("Room Deleted Successfully!"), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpinner(0);
      setDeleteMultiple(0);
      fetchRooms();
      Router.push("./rooms");
    })
      .catch((error) => {
        setSpinner(0);
        toast.error(("Room Delete Error!"), {
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

  /* Add Room */
  const addRoom = () => {
    Router.push("./rooms/addroom")
  }
  return (
    <> <Title name={`Engage | Rooms`} />
      <Header
        color={color}
        setColor={setColor}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
        mode={mode}
        setMode={setMode} />
      <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type} />
      <div id="main-content"
        className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>

        {/* bread crumb */}
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/adminlanding" : "./landing"}
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                </Link></div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.text} text-base font-medium capitalize  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="./propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                    <a>{currentProperty?.property_name}</a>
                  </Link>
                  </div></div>

              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.rooms}</span>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        {/* Rooms Table */}
        <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
        <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
        <div className={visible === 1 ? 'block' : 'hidden'}>
          {/* call to generic table  */}
          <GenericTable
            color={color}
            language={language}
            addButton={true}
            addButtonAction={() => addRoom()}
            tableName={language?.rooms}
            cols={["checkbox", "Room Name", "Room Type", "status", "Actions"]}
            data={gen}
            deleteAll={() => { alert("feature not functional"); }}
          />


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
      {/* Modal Delete */}
      <div className={deleteMultiple === 1 ? 'block' : 'hidden'}>
        <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
          <div className="relative w-full max-w-md px-4 h-full md:h-auto">
            <div className={`rounded-lg shadow relative ${color?.whitebackground}`}>
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setDeleteMultiple(0)}
                  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <div className="p-6 pt-0 text-center">
                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className={`text-base font-normal ${color?.deltext} mt-5 mb-6`}>
                  {language?.areyousureyouwanttodelete}
                </h3>

                {spinner === 0 ?
                  <>
                    <Button Primary={language?.Delete} onClick={() => { confirmedDelete(deleteRoomId) }} />
                    <Button Primary={language?.Cancel} onClick={() => { setDeleteRoomId(undefined); setDeleteMultiple(0) }} />
                  </>
                  :
                  <Button Primary={language?.SpinnerDelete} />}

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default Rooms
Rooms.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
