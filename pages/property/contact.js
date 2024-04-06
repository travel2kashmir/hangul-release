import React, { useEffect, useState } from "react";
import Router from 'next/router';
import axios from "axios";
import Title from "../../components/title";
import LoaderDarkTable from "../../components/loaders/darktableloader";
import validateContactEdit from "../../components/validation/contact/contactedit";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";
import objChecker from "lodash";
import { english, french, arabic } from "../../components/Languages/Languages";
import LoaderTable from "../../components/loadertable";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { fetchHotelDetails, submitContactAdd, navigationList } from "../../components/logic/property/Contact";
import AddModal from "../../components/contacts/AddModal";

var currentLogged;
var i = 0;
var language;
var currentProperty;
var propertyName;
let colorToggle;

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
        {visible === 0 && colorToggle === 'false' && <LoaderTable />}
        {visible === 0 && colorToggle === 'true' && <LoaderDarkTable />}
        {visible === 1 && <Table
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
}
        
        {/* Modal Add */}
        <AddModal
          view={view}
          setView={setView}
          color={color}
          language={language}
          error={error}
          setError={setError}
          flag={flag}
          setFlag={setFlag}
          spinner={spinner}
          setSpinner={setSpinner}
          setSpin={setSpin}
          contact={contact}
          setContact={setContact}
          setContacts={setContacts}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          currentProperty={currentProperty}
          propertyName={propertyName}
          setGen={setGen}
          setVisible={setVisible}
          Router={Router}
        />

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

