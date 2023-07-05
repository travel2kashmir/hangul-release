import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import globalData from "../../components/GlobalData";
import axios from "axios";
import colorFile from "../../components/colors/Color";
import objChecker, { filter } from "lodash";
import Title from "../../components/title";
import Sidebar from "../../components/Sidebar";
import Headloader from "../../components/loaders/headloader";
import validateAddress from "../../components/validation/address";
import Lineloader from "../../components/loaders/lineloader";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";
import Router from "next/router";
var language;
var currentProperty;
const logger = require("../../services/logger");
import Link from "next/link";
import Footer from "../../components/Footer";
import {english,arabic,french} from "../../components/Languages/Languages"
import InputText from "../../components/utils/InputText";
import DropDown from "../../components/utils/DropDown";
var i = 0;
var country;
var currentLogged;
let colorToggle;

function Address() {
  const [visible, setVisible] = useState(0);
  const [mode, setMode] = useState();
  const [countryInitial, setCountryInitial] = useState([]);
  const [provinceInitial, setProvinceInitial] = useState([]);
  const [cityInitial, setCityInitial] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [flag, setFlag] = useState([]);
  const [color, setColor] = useState({});
  const [error, setError] = useState({});
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [address, setAddress] = useState([]);
  const [countries, setCountries] = useState(
    globalData?.CountryData?.map((i) => {
      return { value: `${i?.country_code}`, label: `${i?.country_name}` };
    })
  );
  useEffect(() => {
    firstfun();
  }, []);

  const firstfun = () => {
    if (typeof window !== "undefined") {
      var locale = localStorage.getItem("Language");
      colorToggle = localStorage.getItem("colorToggle");
      if (
        colorToggle === "" ||
        colorToggle === undefined ||
        colorToggle === null ||
        colorToggle === "system"
      ) {
        window.matchMedia("(prefers-color-scheme:dark)").matches === true
          ? setColor(colorFile?.dark)
          : setColor(colorFile?.light);
        setMode(
          window.matchMedia("(prefers-color-scheme:dark)").matches === true
            ? true
            : false
        );
      } else if (colorToggle === "true" || colorToggle === "false") {
        setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
        setMode(colorToggle === "true" ? true : false);
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
  };

  useEffect(() => {
    if (JSON.stringify(currentLogged) === "null") {
      Router.push(window.location.origin);
    } else {
      fetchHotelDetails();
    }
  }, []);

  const colorToggler = (newColor) => {
    if (newColor === "system") {
      window.matchMedia("(prefers-color-scheme:dark)").matches === true
        ? setColor(colorFile?.dark)
        : setColor(colorFile?.light);
      localStorage.setItem("colorToggle", newColor);
    } else if (newColor === "light") {
      setColor(colorFile?.light);
      localStorage.setItem("colorToggle", false);
    } else if (newColor === "dark") {
      setColor(colorFile?.dark);
      localStorage.setItem("colorToggle", true);
    }
    firstfun();
    Router.push("./address");
  };

  /* Function call to fetch Current Property Details when page loads */
  const fetchHotelDetails = async () => {
    const url = `/api/${currentProperty.address_province.replace(
      /\s+/g,
      "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category}s/${
      currentProperty.property_id
    }`;
    axios
      .get(url)
      .then((response) => {
        setAddress(response.data.address?.[i]);
        filterCountry(response.data.address?.[i]);
        setAllHotelDetails(response.data.address?.[i]);
        setCountryInitial(response.data.address?.[i]?.address_country);
        setProvinceInitial(response.data.address?.[i]?.address_province);
        setCityInitial(response.data.address?.[i]?.address_city);
        logger.info("url  to fetch property details hitted successfully");
        setVisible(1);
      })
      .catch((error) => {
        logger.error("url to fetch property details, failed");
      });
  };

  /* Edit Address Function */
  const submitAddressEdit = () => {
    if (flag === 1) {
      if (objChecker.isEqual(allHotelDetails, address)) {
        toast.warn("No change in Address detected. ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFlag([]);
      } else {
        var result = validateAddress(allHotelDetails);

        if (result === true) {
          setSpinner(1);
          const final_data = {
            property_id: currentProperty?.property_id,
            address_id: address?.address_id,
            address_street_address: allHotelDetails.address_street_address,
            address_longitude: allHotelDetails.address_longitude,
            address_latitude: allHotelDetails.address_latitude,
            address_landmark: allHotelDetails.address_landmark,
            address_city: allHotelDetails.address_city?.toLowerCase(),
            address_precision: allHotelDetails.address_precision,
            address_zipcode: allHotelDetails.address_zipcode,
            address_province: allHotelDetails.address_province?.toLowerCase(),
            address_country: allHotelDetails.address_country,
          };

          const url = "/api/address";
          axios
            .put(url, final_data, {
              header: { "content-type": "application/json" },
            })
            .then((response) => {
              setSpinner(0);
              setFlag([]);
              setVisible(1);
              toast.success("Address Updated Successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setError({});
              fetchHotelDetails();
              localStorage.setItem(
                "property",
                JSON.stringify({
                  property_id: currentProperty?.property_id,
                  user_id: currentProperty?.user_id,
                  property_name: currentProperty?.property_name,
                  address_province:
                    allHotelDetails.address_province?.toLowerCase(),
                  address_city: allHotelDetails.address_city?.toLowerCase(),
                  property_category: currentProperty?.property_category,
                  status: currentProperty?.status,
                  language: currentProperty?.language,
                })
              );
              Router.push("./address");

              setAllHotelDetails([]);
            })
            .catch((error) => {
              setSpinner(0);
              setFlag([]);
              toast.error("Address Update Error!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        } else {
          setError(result);
        }
      }
    }
  };

  // Filter Country
  const filterCountry = (props) => {
    country = globalData?.CountryData.filter((el) => {
      return props.address_country.toUpperCase() === el.country_code;
    });
  };

  useEffect(() => {
    var state_code;
    setStates(
      State.getStatesOfCountry(allHotelDetails?.address_country?.toString())
    );
    state_code = State.getStatesOfCountry(
      allHotelDetails?.address_country?.toString()
    ).filter((el) => {
      return allHotelDetails?.address_province === el.name;
    });
    setAllHotelDetails({
      ...allHotelDetails,
      address_province_code: state_code?.[i]?.isoCode,
    });
  }, [allHotelDetails?.address_country, allHotelDetails?.address_province]);

  useEffect(() => {
    setCities(
      City.getCitiesOfState(
        allHotelDetails?.address_country,
        allHotelDetails?.address_province_code
      )
    );
  }, [
    allHotelDetails?.address_country,
    allHotelDetails?.address_province_code,
  ]);
  return (
    <>
      <Title name={`Engage |  ${language?.address}`} />
      <Header
        color={color}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
        Sec={colorToggler}
        mode={mode}
        setMode={setMode}
      />
      <Sidebar
        color={color}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
      />

      <div
        data-testid="main-content"
        className={`${color?.greybackground} px-4 py-2 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}
      >
        {/* bread crumb */}
        <nav
          data-testid="nav"
          className="flex mb-5 ml-4"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div
                className={`${color?.text} text-base font-medium  inline-flex items-center`}
              >
                <svg
                  className="w-5 h-5 mr-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <Link
                  href={
                    currentLogged?.id.match(/admin.[0-9]*/)
                      ? "../admin/adminlanding"
                      : "./landing"
                  }
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}
                >
                  <a>{language?.home}</a>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div
                  className={`${color?.text} capitalize text-base font-medium  inline-flex items-center`}
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className={visible === 0 ? "block w-16" : "hidden"}>
                    <Headloader />
                  </div>
                  <div className={visible === 1 ? "block" : "hidden"}>
                    {" "}
                    <Link
                      href="./propertysummary"
                      className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2"
                    >
                      <a>{currentProperty?.property_name}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div
                  className={`${color?.textgray} text-base font-medium  inline-flex items-center`}
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span
                    className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  "
                    aria-current="page"
                  >
                    {language?.address}
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        {/* Update Address Form */}
        <div
          data-testid="main address"
          className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}
        >
          <h6
            className={`${color?.text} text-xl  flex leading-none pl-6 pt-2 font-bold`}
          >
            {language?.address}
          </h6>

          <div className="pt-6">
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                
                {/* //streetaddress */}
                <InputText
                data-testid="streetaddress"
                  label={language?.streetaddress}
                  visible={visible}
                  defaultValue={address?.address_street_address}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_street_address: e.target.value,
                      },
                      setFlag(1)
                    )
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
                  visible={visible}
                  defaultValue={address?.address_landmark}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      { ...allHotelDetails, address_landmark: e.target.value },
                      setFlag(1)
                    )
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
                  visible={visible}
                  defaultValue={country?.[i]?.country_name}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_country: e.target.value,
                        address_province: "",
                        address_city: "",
                        address_zipcode: "",
                      },
                      setFlag(1)
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
                  visible={visible}
                  defaultValue={
                    countryInitial === allHotelDetails?.address_country ? (
                      <> {allHotelDetails?.address_province}</>
                    ) : (
                      <>{`Select province`}</>
                    )
                  }
                  onChangeAction={(e) => {
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_province: JSON.parse(e.target.value).name,
                        address_province_code: JSON.parse(e.target.value)
                          .isoCode,
                        address_city: "",
                        address_zipcode: "",
                      },
                      setFlag(1)
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
                  visible={visible}
                  defaultValue={
                    countryInitial === allHotelDetails?.address_country &&
                    provinceInitial === allHotelDetails?.address_province ? (
                      <>{`${address?.address_city}`}</>
                    ) : (
                      <>{`${language?.select}`}</>
                    )
                  }
                  onChangeAction={(e) => {
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_city: e.target.value,
                        address_zipcode: "",
                      },
                      setFlag(1)
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
                  visible={visible}
                  defaultValue={
                    allHotelDetails.address_zipcode != ""
                      ? allHotelDetails.address_zipcode
                      : ""
                  }
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_zipcode: e.target.value,
                    });
                    setFlag(1);
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
                  visible={visible}
                  defaultValue={address?.address_latitude}
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_latitude: parseFloat(e.target.value),
                    });
                    setFlag(1);
                  }}
                  error={error?.address_latitude}
                  color={color}
                  req={true}
                  tooltip={true}
                />
               
                {/* Longitude */}

                <InputText
                data-testid="longitude"
                  label={language?.longitude}
                  visible={visible}
                  defaultValue={address?.address_longitude}
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_longitude: parseFloat(e.target.value),
                    });
                    setFlag(1);
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
                  visible={visible}
                  defaultValue={address?.address_precision}
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_precision: parseInt(e.target.value),
                    });
                    setFlag(1);
                  }}
                  error={error?.address_precision}
                  color={color}
                  req={true}
                  tooltip={true} 
                />
             
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3"></div>
                </div>

                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                  <div
                    className={flag !== 1 && spinner === 0 ? "block" : "hidden"}
                  >
                    <Button
                      data-testid="update"
                      Primary={language?.UpdateDisabled}
                    />
                  </div>
                  <div
                    className={spinner === 0 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      Primary={language?.Update}
                      onClick={() => {
                        submitAddressEdit();
                      }}
                    />
                  </div>
                  <div
                    className={spinner === 1 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.SpinnerUpdate} />
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

      <Footer data-testid="footer" color={color} Primary={english.Foot} />
    </>
  );
}
export default Address;
