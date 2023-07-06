import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import Router from 'next/router'
import { english, french, arabic } from '../../../components/Languages/Languages';
import Button from "../../../components/Button";
import InputText from "../../../components/utils/InputText";
import InputTextBox from "../../../components/utils/InputTextBox";
import DateInput from "../../../components/utils/DateInput";
import DropDown from "../../../components/utils/DropDown";
import colorFile from "../../../components/colors/Color";
import { Country, State, City } from "country-state-city";
import globalData from "../../../components/GlobalData";
import Title from '../../../components/title';

var language;
var currentProperty;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const logger = require("../../../services/logger");
let colorToggle;
var country;
var i = 0;

function AddBasicDetails() {
  const [mode, setMode] = useState();
  const [spinner, setSpinner] = useState(0);
  const [basicDetails, setBasicDetails] = useState([]);
  const [countries, setCountries] = useState(
    globalData?.CountryData?.map((i) => {
      return { value: `${i?.country_code}`, label: `${i?.country_name}` };
    })
  );
  const [allHotelDetails, setAllHotelDetails] = useState({
    property_name: '',
    property_category: '',
    property_brand: '',
    established_year: '',
    star_rating: '',
    description_title: '',
    description_body: '',
    description_date: '',
    status: true
  });
  const [address, setAddress] = useState({
    address_street_address: '',
    address_landmark: '',
    address_city: '',
    address_province: '',
    address_latitude: '',
    address_longitude: '',
    address_zipcode: '',
    address_precision: '',
    address_country: ''
  });
  const [basic, setBasic] = useState(0);
  const [error, setError] = useState({});
  const [descriptionLength, setDescriptionLength] = useState();
  const [color, setColor] = useState({});
  const [allPropertyTypes, setAllPropertyTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  useEffect(() => {
    var state_code;
    setStates(
      State.getStatesOfCountry(address?.address_country?.toString())
    );
    state_code = State.getStatesOfCountry(
      address?.address_country?.toString()
    ).filter((el) => {
      return address?.address_province === el.name;
    });
    setAddress({
      ...address,
      address_province_code: state_code?.[i]?.isoCode,
    });
  }, [address?.address_country, address?.address_province]);

  useEffect(() => {
    setCities(
      City.getCitiesOfState(
        address?.address_country,
        address?.address_province_code
      )
    );
  }, [
    address?.address_country,
    address?.address_province_code,
  ]);

  /** Fetching language from the local storage **/
  useEffect(() => {
    const firstfun = () => {
      if (typeof window !== 'undefined') {
        var locale = localStorage.getItem("Language");
        setColor(colorFile?.light)
        colorToggle = localStorage.getItem("colorToggle");

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
    }
    firstfun();

    Router.push("./addbasicdetails");
    setAllHotelDetails({ ...allHotelDetails, description_date: current })
    fetchAllPropertyTypes();
  }, [])

  //finding current date 
  var current = new Date();
  let month = current.getMonth() + 1;
  var descriptionDate = `${current.getDate()}/${month < +10 ? `0${month}` : `${month + 1}`}/${current.getFullYear()}`;

  const fetchAllPropertyTypes = () => {
    const url = '/api/all_property_types';
    axios.get(url).then((response) => setAllPropertyTypes(response.data))
  }

  const validateBasicDetails = (allHotelDetails, address) => {
    if (address.length === undefined) {
      //detect empty values in basic details
      for (let item in allHotelDetails) {
        if ((allHotelDetails[item] === '') && (item != "description_date") && (item != "property_brand")) {
          return `APP:insert value of ${item?.replace("_", " ")}`
        }
      }
      //check  date  established 
      if ((allHotelDetails?.established_year.slice(0, 4) > current.getFullYear())) {
        return 'APP: Established year is greater than current year'
      }
      //check star rating
      if ((parseInt(allHotelDetails.star_rating) < 0) || (parseInt(allHotelDetails.star_rating) > 7) || (allHotelDetails.star_rating === '')) {
        return 'APP: Enter star rating between 0 to 7'
      }
      return true;
    }

    return true

  }
  //validate Address
  const validateAddress = () => {
    console.log("checking address")
    //detect empty values in address
    for (let item in address) {
      if (address[item] === '') {
        console.log(item)
        return `APP:insert value of ${item?.replace("_", " ")}`
      }
    }

    //check latitudes 
    if ((address?.address_latitude < -90) || (address?.address_latitude > 90)) {
      return 'APP: The value of latitude should be between -90 to +90'
    }
    //check longitude 

    if ((address?.address_longitude < -180) || (address?.address_longitude > 180)) {
      return 'APP: The value of latitude should be between -180 to +180'
    }
    //check zip code
    if ((!address.address_zipcode.match('^[1-9][0-9]{5}$'))) {
      return 'APP: Please Enter Valid Indian Zip code'
    }
    //check precision
    if (address.address_precision < 0 || address.address_precision > 1000) {
      return 'APP: Precision should be between 0-1000'
    }
    return true;

  }

  //to send data to database
  const submitBasic = () => {
    setSpinner(1);
    const valid = validateAddress(allHotelDetails, address);
    if (valid === true) {
      const propertydata = { "address": [address] }
      const finalData = { ...allHotelDetails, ...propertydata }
      console.log(JSON.stringify(finalData), 'finaldata')
      axios.post('/api/basic', finalData).then((response) => {
        localStorage.setItem("property_id", JSON.stringify(response?.data?.property_id));
        setSpinner(0)
        toast.success("API: Property Added Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        Router.push('../adminlanding')
      }).catch((e) => {
        console.log(JSON.stringify(e));
        toast.error(`API: ${e.message}`, {
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
    else {
      setSpinner(0);
      toast.error(valid, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <><Title name={`Engage | Admin Landing Page`} />
    <div className="flex justify-center w-full h-full" id="user-modal">
      <div className="relative w-full max-w-5xl px-4 h-full md:h-auto">
        <button
          className="float-right my-8 sm:inline-flex  text-gray-800  
            font-semibold border  focus:ring-4 focus:ring-cyan-200 font-semibold bg-gray-200
            rounded-lg text-sm px-1 py-1 text-center 
            items-center mb-1 ml-16 mr-4 ease-linear transition-all duration-150"
          type="button"
          onClick={() => Router.push('../adminlanding')}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
          </path></svg>
        </button>

        <div className={basic === 0 ? "block " : "hidden"}>
          <div className=" bg-white shadow rounded-lg py-12  px-12 sm:p-6 xl:p-8  2xl:col-span-2 ">
            {/* widgetProgress start  */}
            <div className="relative before:hidden  before:lg:block before:absolute before:w-[45%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                <div className="lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto">{language?.basicdetails}</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                <div className="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"> {language?.address}</div>
              </div>
            </div>
            {/* widgetProgress end */}

            <h6 className="text-xl flex leading-none pl-6 pt-2 font-bold text-gray-900 mb-2">
              {language?.basicdetails}

              <svg className="ml-2 h-6 mb-2 w-6 font-semibold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd">
                </path>
              </svg>
            </h6>

            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* property name */}
                  <InputText
                    label={language?.propertyname}
                    visible={1}
                    defaultValue={basicDetails?.property_name}
                    onChangeAction={(e) => (
                      setAllHotelDetails({ ...allHotelDetails, property_name: e.target.value })
                    )
                    }
                    error={error?.property_name}
                    color={color}
                    req={true}
                    title={language?.propertyname}
                    tooltip={true}
                  />

                  {/*  Dropdown for Property Category */}
                  <DropDown
                    label={language?.propertycategory}
                    visible={1}
                    defaultValue={`Select Property Category`}
                    onChangeAction={
                      (e) => (
                        setAllHotelDetails({ ...allHotelDetails, property_category: e.target.value })
                      )
                    }
                    error={error?.propertycategory}
                    color={color}
                    req={true}
                    title={language?.propertycategory}
                    options={allPropertyTypes.map(i => ({ value: i?.property_type, label: i?.property_type }))}
                  />

                  {/* Property brand */}
                  <InputText
                    label={language?.propertybrand}
                    visible={1}
                    defaultValue={basicDetails?.property_brand}
                    onChangeAction={(e) =>
                      setAllHotelDetails(
                        { ...allHotelDetails, property_brand: e.target.value }
                      )
                    }
                    error={error?.property_brand}
                    color={color}
                    req={false}
                    tooltip={true}
                  />

                  {/* Established date */}
                  <DateInput
                    color={color}
                    label={language?.establisheddate}
                    req={true}
                    initialValue={basicDetails?.established_year}
                    onChangeAction={(e) => (
                      setAllHotelDetails({ ...allHotelDetails, established_year: e.target.value })
                    )
                    }
                    error={error?.established_year}
                    visible={1}
                    max={descriptionDate}
                    title={`Year in which property was established`}
                    tooltip={true}
                  />

                  {/*Star Rating*/}
                  <DropDown
                    label={language?.starrating}
                    visible={1}
                    defaultValue={basicDetails?.star_rating}
                    onChangeAction={(e) => {
                      if (e.target.value >= 0 && e.target.value <= 5)
                        setAllHotelDetails({ ...allHotelDetails, star_rating: e.target.value })
                      else
                        e.target.value = 0
                    }
                    }
                    error={error?.starrating}
                    color={color}
                    req={true}
                    tooltip={true}
                    options={[
                      { value: 0, label: 0 },
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                      { value: 3, label: 3 },
                      { value: 4, label: 4 },
                      { value: 5, label: 5 },
                    ]}
                  />

                  {/* Description_title */}
                  <InputText
                    label={language?.descriptiontitle}
                    visible={1}
                    defaultValue={basicDetails?.description_title}
                    onChangeAction={(e) => (
                      setAllHotelDetails({ ...allHotelDetails, description_title: e.target.value })
                    )
                    }
                    error={error?.description_title}
                    color={color}
                    req={true}
                    title={language?.descriptiontitle}
                    tooltip={true}
                  />


                  {/*Description */}
                  <InputTextBox
                    label={language?.description}
                    visible={1}
                    defaultValue={basicDetails?.description_body}
                    wordLimit={1000}
                    onChangeAction={(e) => {
                      if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                        setError({})
                        setDescriptionLength(e.target.value.length)
                        setAllHotelDetails(
                          {
                            ...allHotelDetails,
                            description_body: e.target.value,
                          }
                        )
                      }
                      else {
                        setError({ description_body: 'word limit reached' })
                      }

                    }
                    }
                    error={error?.description_body}
                    color={color}
                    req={true}
                    tooltip={true} />

                  <div className='flex justify-end mt-4  w-full hover:bg-grey-200'>
                    <Button  Primary={language?.Submit} onClick={() => { validateBasicDetails(allHotelDetails, address) === true ? setBasic(1) : alert((validateBasicDetails(allHotelDetails, address))) }} />
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>

        {/*Address Form*/}
        <div className={basic === 1 ? "block" : "hidden"}>
          <div className=" bg-white shadow rounded-lg  px-12 sm:p-6 xl:p-8  2xl:col-span-2 ">
            <div className="relative before:hidden  before:lg:block before:absolute before:w-[45%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                <div className="lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto">{language?.basicdetails}</div>
              </div>

              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">2</button>
                <div className="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"> {language?.address}</div>
              </div>
            </div>
            <h6 className="text-xl flex leading-none pl-6 pt-2 font-bold text-gray-900 mb-2">
              {language?.address}

              <svg className="ml-2 h-6 mb-2 w-6 font-semibold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
            </h6>
            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* //streetaddress */}
                  <InputText
                    data-testid="streetaddress"
                    label={language?.streetaddress}
                    visible={1}
                    defaultValue={address?.address_street_address}
                    onChangeAction={(e) =>
                      setAddress({
                        ...address,
                        address_street_address: e.target.value,
                      })
                    }
                    error={error?.address_street_address}
                    color={color}
                    req={true}
                    tooltip={true}
                  />

                  {/* Landmark */}

                  <InputText
                    data-testid="landmark"
                    label={language?.landmark}
                    visible={1}
                    defaultValue={address?.address_landmark}
                    onChangeAction={(e) =>
                      setAddress({
                        ...address,
                        address_landmark: e.target.value,
                      })
                    }
                    error={error?.address_landmark}
                    color={color}
                    req={true}
                    tooltip={true}
                  />

                  {/* country */}
                  <DropDown
                    data-testid="country"
                    label={language?.country}
                    visible={1}
                    defaultValue={country?.[i]?.country_name}
                    onChangeAction={(e) =>
                      setAddress(
                        {
                          ...address,
                          address_country: e.target.value,
                          address_province: "",
                          address_city: "",
                          address_zipcode: "",
                        },

                      )
                    }
                    error={error?.propertycategory}
                    color={color}
                    req={true}
                    options={countries}
                    tooltip={true}
                  />

                  {/* province */}
                  <DropDown
                    data-testid="province"
                    label={language?.province}
                    visible={1}
                    defaultValue={`Select province`}
                    onChangeAction={(e) => {
                      setAddress({
                        ...address,
                        address_province: JSON.parse(e.target.value).name,
                        address_province_code: JSON.parse(e.target.value)
                          .isoCode,
                        address_city: "",
                        address_zipcode: "",
                      },

                      );
                    }}
                    error={error?.propertycategory}
                    color={color}
                    req={true}
                    tooltip={true}
                    options={states?.map((i) => ({
                      value: `${JSON.stringify(i)}`,
                      label: `${i?.name}`,
                    }))}
                  />

                  {/*CITY*/}

                  <DropDown
                    data-testid="city"
                    label={language?.city}
                    visible={1}
                    defaultValue={`${language?.select}`}
                    onChangeAction={(e) => {
                      setAddress({
                        ...address,
                        address_city: e.target.value,
                        address_zipcode: "",
                      },

                      );
                    }}
                    error={error?.propertycategory}
                    color={color}
                    req={true}
                    tooltip={true}
                    options={cities?.map((i) => ({
                      value: `${i.name}`,
                      label: `${i?.name}`,
                    }))}
                  />
              
                  {/* POSTAL CODE */}
                  <InputText
                    data-testid="postalcode"
                    label={language?.postalcode}
                    visible={1}
                    defaultValue={""}
                    onChangeAction={(e) => {
                      
                        setAddress({
                          ...address,
                          address_zipcode: e.target.value,
                        })
                    }}
                    error={error?.address_zipcode}
                    color={color}
                    req={true}
                    tooltip={true}
                  />

                  {/* Latitude */}

                  <InputText
                    data-testid="latitude"
                    label={language?.latitude}
                    visible={1}
                    defaultValue={address?.address_latitude}
                    onChangeAction={(e) => 
                      {
                        setAddress({
                          ...address,
                          address_latitude: parseFloat(e.target.value),
                        })}
                      
                    }
                    error={error?.address_latitude}
                    color={color}
                    req={true}
                    tooltip={true}
                  />

                  {/* Longitude */}

                  <InputText
                    data-testid="longitude"
                    label={language?.longitude}
                    visible={1}
                    defaultValue={address?.address_longitude}
                    onChangeAction={(e) => {
                      setAddress({
                        ...address,
                        address_longitude: parseFloat(e.target.value),
                      })
                    }}
                    error={error?.address_longitude}
                    color={color}
                    req={true}
                    tooltip={true}
                  />

                  {/* PRECISION */}
                  <InputText
                    data-testid="precision"
                    label={`${language?.precision}(${language?.inmeters})`}
                    visible={1}
                    defaultValue={address?.address_precision}
                    onChangeAction={(e) => {
                      setAddress({
                          ...address,
                          address_precision: parseInt(e.target.value),
                        })
                    }}
                    error={error?.address_precision}
                    color={color}
                    req={true}
                    tooltip={true}
                  />
                  <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                    <Button Primary={
                      {
                        label: "Back",
                        color: "bg-cyan-600 hover:bg-cyan-700 text-white",
                      }} onClick={() => setBasic(0)} />

                    {spinner === 0 ?
                      <Button Primary={language?.Submit} onClick={submitBasic} /> :
                      <Button Primary={language?.SpinnerUpdate} />}


                  </div>
                </div>
              </div>
            </div>




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

      </div></div></>
  )
}

export default AddBasicDetails
AddBasicDetails.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}