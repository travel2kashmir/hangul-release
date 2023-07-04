import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import LoaderDarkTable from "../../components/loaders/darktableloader";
import colorFile from "../../components/colors/Color";
import Header from "../../components/Header";
import Link from "next/link";
import Table from '../../components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { english, french, arabic } from "../../components/Languages/Languages"
import LoaderTable from "../../components/loadertable";
import Headloader from "../../components/loaders/headloader";
import Addservices from '../../components/admin/AddServices';
const logger = require("../../services/logger");
var language;
var currentProperty;
var propertyName;
var propertyId;
import Router from 'next/router';
var currentLogged;
import objChecker from "lodash";
let colorToggle;

function Services() {
  const [visible, setVisible] = useState(0)
  const [services, setServices] = useState([])
  const [edit, setEdit] = useState(0)
  const [color, setColor] = useState({})
  const [view, setView] = useState(0);
  const [mode, setMode] = useState()
  const [modified, setModified] = useState([])
  const [addEdit, setAddEdit] = useState(0)
  const [addDel, setAddDel] = useState(0)
  const [add, setAdd] = useState(0)
  const [gen, setGen] = useState([])
  const [gene, setGene] = useState([])
  const [finalServices, setFinalServices] = useState([])

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

  /* Function call to fetch Current Property Details when page loads */
  const fetchHotelDetails = async () => {
    var genData = [];
    const url = `/api/${currentProperty.address_province.replace(
      /\s+/g,
      "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category
      }s/${currentProperty?.property_id}`;
    axios.get(url)
      .then((response) => {
        setServices(response.data);
        logger.info("url  to fetch property details hitted successfully")
        setVisible(1)
        {
          response.data?.services?.map((item) => {
            var temp = {
              name: item.local_service_name,
              description: item.service_comment,
              type: item.service_value,
              status: item.status,
              id: item.service_id
            }
            genData.push(temp)
          })
          setGen(genData);
        }


      })

      .catch((error) => { logger.error("url to fetch property details, failed") });
  }

  useEffect(() => {
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchHotelDetails();
    }
  }, [])

  const colorToggler = (newColor) => {
    if (newColor === 'system') {
      window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
        : setColor(colorFile?.light)
      localStorage.setItem("colorToggle", newColor)
    }
    else if (newColor === 'light') {
      setColor(colorFile?.light)
      localStorage.setItem("colorToggle", false)
    }
    else if (newColor === 'dark') {
      setColor(colorFile?.dark)
      localStorage.setItem("colorToggle", true)
    }
    firstfun();
    Router.push('./services')
  }


  /* Function to edit services*/
  const updateServices = (props, noChange) => {
    if (objChecker.isEqual(props, noChange)) {
      toast.warn('No change in Services detected. ', {
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
      const final_data = {
        "service_id": props.id,
        "property_id": currentProperty?.property_id,
        "service_value": props.type,
        "status": props.status
      }
      const url = '/api/services'
      axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {
          toast.success("Services Updated Successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchHotelDetails();
          Router.push("./services");

        })
        .catch((error) => {
          toast.error("Service Update Error!", {
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
  }

  
  return (
    <>
      <Header color={color} Primary={english?.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode} />
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
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.services}</span>
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
        <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
        <div className={visible === 1 ? 'block' : 'hidden'}>
          {/* table is invoked if property has services else add services is invoked */}
          {JSON.stringify(Object.keys(services).includes('services')) === "true" ?
            <Table gen={gen} setGen={setGen} color={color}
              edit={updateServices} common={language?.common} cols={language?.ServicesCols}
              name="Services" /> : <Addservices />}
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
    </>
  )
}

export default Services
Services.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
