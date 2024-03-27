import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../components/loaders/darktableloader';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import GenericTable from '../../components/utils/Tables/GenericTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../components/title';
import { english, french, arabic } from "../../components/Languages/Languages"
import LoaderTable from "../../components/loadertable";
import { InitialActions, ColorToggler } from '../../components/initalActions';
import Button from '../../components/Button';
import Router from "next/router";
import BreadCrumb from '../../components/utils/BreadCrumb';
import { fetchRooms, navigationList, addRoom, confirmedDelete } from '../../components/logic/property/Rooms/Rooms';
import Modal from "../../components/NewTheme/modal";
var language;
var currentProperty;
var currentLogged;


function Rooms() {
  const [visible, setVisible] = useState(0)
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  const [gen, setGen] = useState([])
  const [allrooms, setAllRooms] = useState([])
  const [deleteMultiple, setDeleteMultiple] = useState(0);
  const [deleteRoomId, setDeleteRoomId] = useState()
  const [spinner, setSpinner] = useState(0)


  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchRooms(currentProperty, setAllRooms, setVisible, setGen, setDeleteRoomId, setDeleteMultiple);
    }
  }, [])



  return (
    <>
      <Title name={`Engage | Rooms`} />

      <Header
        color={color}
        setColor={setColor}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
        mode={mode}
        setMode={setMode} />

      <Sidebar
        color={color}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
      />

      <div id="main-content"
        className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>

        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Rooms Table */}
        <div className={(visible === 0 && mode == false ? 'block' : 'hidden')}><LoaderTable /></div>
        <div className={(visible === 0 && mode == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
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
        <Modal
        description={<div className="p-6 pt-0 text-center">
        <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className={`text-base font-normal ${color?.deltext} mt-5 mb-6`}>
          {language?.areyousureyouwanttodelete}
        </h3>

        {spinner === 0 ?
          <>
            <Button Primary={language?.Delete} onClick={() => { confirmedDelete(deleteRoomId, setSpinner, setDeleteMultiple, currentProperty, setAllRooms, setVisible, setGen, setDeleteRoomId) }} />
            <Button Primary={language?.Cancel} onClick={() => { setDeleteRoomId(undefined); setDeleteMultiple(0) }} />
          </>
          :
          <Button Primary={language?.SpinnerDelete} />}

      </div>}
        setShowModal={() => setDeleteMultiple(0)}
        />
       
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
