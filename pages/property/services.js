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
import { InitialActions, ColorToggler } from "../../components/initalActions";
var language;
var currentProperty;
var propertyName;
var propertyId;
import Router from 'next/router';
var currentLogged;
import objChecker from "lodash";
import BreadCrumb from '../../components/utils/BreadCrumb';
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
      fetchHotelDetails();
    }
  }, [])

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
        text: "Services",
        link: ""
      }
    ])
  }

  return (
    <>
      <Header
        color={color}
        setColor={setColor}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
        mode={mode}
        setMode={setMode}
      />

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
