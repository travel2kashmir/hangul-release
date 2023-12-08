import React, { useEffect, useState, useRef, useMemo } from "react";
import Router from 'next/router';
import axios from "axios";
import Title from "../../components/title";
import colorFile from "../../components/colors/Color";
import LoaderDarkTable from "../../components/loaders/darktableloader";
import validateContact from "../../components/validation/contact/contactadd";
import validateContactEdit from "../../components/validation/contact/contactedit";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import objChecker from "lodash";
import { english, french, arabic } from "../../components/Languages/Languages";
import Headloader from "../../components/loaders/headloader";
import LoaderTable from "../../components/loadertable";
import GenericTable from "../../components/utils/Tables/GenericTable";
const logger = require("../../services/logger");
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { fetchHotelDetails, submitContactAdd, navigationList, validationContact } from "../../components/logic/property/Contact";

var currentLogged;
var i = 0;
let colorToggle;
var language;
var currentProperty;
var propertyName;

function Contact() {
  const [gen, setGen] = useState([])
  const [error, setError] = useState({})
  const [color, setColor] = useState({})
  const [spinner, setSpinner] = useState(0)
  const [spin, setSpin] = useState(0)
  const [visible, setVisible] = useState(0)
  const [deleteContact, setDeleteContact] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [mode, setMode] = useState()
  const [countryCode, setCountryCode] = useState({});
  const [view, setView] = useState(0);
  const [flag, setFlag] = useState([]);
  const [contact, setContact] = useState([]);
  const [deleteMultiple, setDeleteMultiple] = useState(0);

  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle

    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchHotelDetails(currentProperty, setContacts, setCountryCode, propertyName, setGen, setVisible);
    }
  }, [])

  /* Function Add Contact*/
  function contactDeleteMultiple(checked, setDeleteMultiple) {
    const data = checked?.map((item) => { return ({ contact_id: item, property_id: currentProperty?.property_id }) })
    setSpinner(1);
    const contactdata = data;
    const finalContact = { contacts: contactdata };

    axios.post(`/api/deleteall/contacts`, finalContact, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        setSpinner(0)
        toast.success("API: Contact delete success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchHotelDetails(currentProperty, setContacts, setCountryCode, propertyName, setGen, setVisible);
        Router.push("./contact");
        setDeleteMultiple(0);
      })
      .catch((error) => {
        setSpinner(0)
        toast.error("API: Contact add error.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDeleteMultiple(0);

      });


  }

  /* Function Edit Contact*/
  const submitContactEdit = (props, noChange) => {
    if (objChecker.isEqual(props, noChange)) {
      toast.warn('No change in contacts detected. ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      setError({})
      var result = validateContactEdit(props, countryCode)
      if (result === true) {
        submitContactAdd(flag, setSpinner, contact, currentProperty, setView, setContacts, setCountryCode, propertyName, setGen, setVisible, Router, setContact, setSpin, setError, setFlag);

        const final_data = {
          contact_id: props.id,
          contact_data: props.type,
          status: props.status
        };
        const url = "/api/contact";
        axios
          .put(url, final_data, { header: { "content-type": "application/json" } })
          .then((response) => {
            toast.success("API: Contact update success.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            fetchHotelDetails(currentProperty, setContacts, setCountryCode, propertyName, setGen, setVisible);
            Router.push("./contact");
          })
          .catch((error) => {
            setSpinner(0)
            toast.error("API:Contact update error.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
      else {
        toast.warn(result?.type, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setError(result)
      }
    }
  };

  // Add Validation Contact Delete
  const submitContactDelete = (props) => {
    const url = `/api/${props}`;
    axios
      .delete(url)
      .then((response) => {
        setSpin(0);
        toast.success("API:Contact delete success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchHotelDetails(currentProperty, setContacts, setCountryCode, propertyName, setGen, setVisible);
        setDeleteContact(0)
        Router.push("./contact");
      })
      .catch((error) => {
        toast.error("API: Contact delete error.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDeleteContact(0)
      });
  };


  return (
    <>
      <Title name={`Engage |  ${language?.contact}`} />

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
        Type={currentLogged?.user_type} />

      <div
        id="main-content"
        className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>
        {/* bread crumb */}

        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Header */}
        <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
        <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
        <div className={visible === 1 ? 'block' : 'hidden'}>

          {/* <GenericTable
            inlineTable={true}
            color={color}
            language={language}
            addButton={true}
            addButtonAction={() => setView(1)}
            tableName={language?.contact}
            cols={["checkbox", "Contact Details", "Contact Type", "status", "Actions"]}
            data={gen}
            deleteAll={() => { alert("feature not functional"); }}
          /> */}


          <Table
            gen={gen}
            setGen={setGen}
            add={() => setView(1)}
            edit={submitContactEdit} //isko bolte hai passing function refrence
            delSpin={language?.SpinnerDelete}
            saveSpinner={language?.SpinnerSave}
            spinner={spinner}
            setSpinner={setSpinner}
            color={color}
            language={language}
            deleteAll={contactDeleteMultiple}
            spin={spin}
            property_id={currentProperty?.property_id}
            delete={submitContactDelete}
            common={language?.common}
            cols={language?.ContactCols}
            name="Contact"
          />

        </div>

        {/* Modal Add */}
        <div className={view === 1 ? "block" : "hidden"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>{language?.add} {language?.new} {language?.contact}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('addcontactform').reset();
                      setContact([]);
                      setError({});
                      setView(0);
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form id='addcontactform'>
                  <div className="p-6 space-y-6" >
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className={`text-sm ${color?.text} font-medium  block mb-2`}
                        >
                          {language?.contact} {language?.type}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <select
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              contact_type: e.target.value,
                            }, setFlag(1))
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                        focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        >
                          <option selected disabled>{language?.select}</option>
                          <option value="phone">Phone</option>
                          <option value="phone-manager">Phone-Manager</option>
                          <option value="phone-reception">Phone-Reception</option>
                          <option value="email">Email</option>
                          <option value="website">Website</option>
                          <option value="toll free number">
                            Toll Free number
                          </option>
                          <option value="tdd number">TDD number</option>
                        </select>
                        <p className="text-sm text-red-700 font-light">
                          {error?.contact_type}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name"
                          className={`text-sm ${color?.text} font-medium  block mb-2`}>
                          {language?.contact} {language?.value}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              contact_data: e.target.value,
                            }, setFlag(1))
                          }

                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                        focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          required
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.contact_data}</p>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                    <Button Primary={language?.AddDisabled} /></div>
                  <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.Add} onClick={() => { validationContact(setError, contact, countryCode, flag, setSpinner, currentProperty, setView, setContacts, setCountryCode, propertyName, setGen, setVisible, Router, setContact, setSpin, setFlag) }} />
                  </div>
                  <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.SpinnerAdd} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </div>

    </>


  );
}

export default Contact
Contact.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}

