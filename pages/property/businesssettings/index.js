import React from "react";
import Sidebar from "../../../components/Sidebar";
import Title from '../../../components/title';
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import { english, french, arabic } from "../../../components/Languages/Languages"
import colorFile from "../../../components/colors/Color";
// Import Swiper React components
import Router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../../../components/Footer';
import { InitialActions, ColorToggler } from "../../../components/initalActions";
import BreadCrumb from "../../../components/utils/BreadCrumb";
import InputText from "../../../components/utils/InputText";
import GlobalData from "../../../components/GlobalData";
import DropDown from "../../../components/utils/DropDown";
import Button from "../../../components/Button";
import validateUniversal from "../../../components/Businesssettings/validateUniversal";


var language;
var country;
var currentProperty;
var currentLogged;
var i = 0;
let colorToggle;

function Index() {
  /** State to store Current Property Details **/
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  const [spinner, setSpinner] = useState(false)
  const [currencies, setCurrencies] = useState([])
  const [mutationFlag, setMutationFlag] = useState(false)
  const [error, setError] = useState({})
  const [universalData, setUniversalData] = useState({})


  /** Router for Redirection **/
  const router = useRouter();

  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle
    setCurrencies(GlobalData?.CurrencyData?.map(i => { return ({ value: i.currency_code, label: i.currency_name }) }))
    if (JSON.stringify(currentLogged) === 'null') {
      router.push(window.location.origin)
    }
    else {
      fetchHotelDetails();
    }
  }, [])

  /* Function call to fetch Current Property Details when page loads */
  const fetchHotelDetails = async () => {
    const url = `/api/${currentProperty.address_province.replace(
      /\s+/g,
      "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category
      }s/${currentProperty.property_id}`;
    axios.get(url)
      .then((response) => {
        setAllHotelDetails(response.data);
        setUniversalData(response.data?.business_settings[0] || {})
        console.log("url  to fetch property details hitted successfully")
      })
      .catch((error) => { console.log("url to fetch property details, failed") });
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
        text: "Business Settings",
        link: ""
      }

    ])
  }

  // validate universal data 
  const submissionUniversal = () => {
    setSpinner(true);
    let result = validateUniversal(universalData)
    if (result === true) {
      saveUniversal();
    }
    else {
      setSpinner(false);
      setMutationFlag(false)
      setError(result)
    }
  }

  // save universal data 
  function saveUniversal() {
    let data = { "universal_data": [{ ...universalData, "property_id": currentProperty.property_id }] }
    let url = "/api/universal_data";
    axios.post(url, data, { "headers": { "content-type": "application/json" } })
      .then((res) => {
        setSpinner(false);
        setMutationFlag(false)
        toast.success("API:Business settings saved sucessful")
      })
      .catch((err) => {
        setSpinner(false);
        setMutationFlag(false)
        toast.error("API: Saving business settings failed!")
      })
  }
  return (
    <>
      <Title name={`Engage |  Business Settings`} />

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

      {/* Body */}
      <div id="main-content"
        className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64 h-screen`}>
        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />
        {/* body content  */}
        <div className={`${color?.greybackground} w-full  py-2`}>
          <div
            className={`${color?.whitebackground} shadow rounded-lg `}
          >
            <h6
              className={`${color?.text} text-xl flex leading-none pl-6 py-6  font-bold`}
            >
              Business Settings
            </h6>
            {/* form body start  */}
            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* select currency start  */}
                  <DropDown
                    label={'Currency'}
                    visible={1}
                    defaultValue={universalData?.currency || 'Select Currency'}
                    onChangeAction={(e) => {
                      setMutationFlag(true)
                      setUniversalData({ ...universalData, currency_code: e.target.value, currency: e.target.selectedOptions[0].getAttribute('name') })
                    }}
                    color={color}
                    req={true}
                    options={currencies || []}
                    error={error?.currency}
                    title={"This currency will be used globally"}
                    tooltip={true}
                  />
                  {/* select currency ends  */}
                </div>
              </div>
            </div>
            {/* form body end */}
            {/* buttons start  */}
            <div className="flex mr-2 items-center justify-end space-x-2 sm:space-x-3 ml-auto">
              {mutationFlag === false && spinner === false && <Button
                testid="test_button_disabled"
                Primary={language?.UpdateDisabled}
              />}
              {mutationFlag === true && spinner === false && <Button
                testid="test_button"
                Primary={language?.Update}
                onClick={submissionUniversal}
              />}

              {spinner === true && mutationFlag === true && <Button
                testid="test_button_spinner"
                Primary={language?.SpinnerUpdate}
              />}

            </div>


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

      </div>

      <Footer color={color} Primary={english.Foot} />
    </>
  );

}

export default Index;
