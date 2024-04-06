import React from "react";
import StarRatings from 'react-star-ratings';
import Sidebar from "../../components/Sidebar";
import Title from '../../components/title';
import lang from '../../components/GlobalData'
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import DarkModeLogic from "../../components/darkmodelogic";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar";
import colorFile from "../../components/colors/Color";
import Capsule from "../../components/utils/Capsule";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from 'better-react-carousel';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import Router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../../components/Footer';
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";

var language;
var country;
var currentProperty;
var currentLogged;
var i = 0;
let colorToggle;

function PropertySummary() {
  /** State to store Current Property Details **/
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  const [modeChanger, setModeChanger] = useState("")

  /** Router for Redirection **/
  const router = useRouter();

  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle

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
        filterCountry(response.data.address?.[i]);
        console.log("url  to fetch property details hitted successfully")
      })
      .catch((error) => { console.log("url to fetch property details, failed") });
  }

  const filterCountry = (props) => {
    country = lang?.CountryData.filter(el => {
      return props.address_country.toUpperCase() === el.country_code;
    });
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
        link: ""
      },

    ])
  }


  return (
    <>
      <Title name={`Engage |  ${language?.propertysummary}`} />
      <div>
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
          className={`${color?.greybackground} px-4 py-2 pt-24 relative overflow-y-auto lg:ml-64`}>
          {/* bread crumb */}
          <BreadCrumb
            color={color}
            crumbList={navigationList(currentLogged, currentProperty)}

          />

          <div>
          </div>

          <div className={`${color?.greybackground} w-full grid py-2  grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3`}>
            {/* Basic Details */}
            <div className={`${color?.whitebackground} shadow rounded-lg p-4 sm:p-6 xl:p-8`} >
              <div className="flex items-center justify-between ">
                <div className="flex-shrink-0">
                  <h3 className={`${color?.text} text-base font-bold  mb-4`}>
                    {allHotelDetails?.property_name}
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <span className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2">
                    <Link href="./basicdetails"><a>{language?.seemore}</a></Link>
                  </span>
                </div>
              </div>
              <div className="flex items-center flex-1 justify-start -mt-4 mb-2 px-2 text-yellow-400 text-sm font-bold">
                <StarRatings
                  rating={allHotelDetails?.star_rating}
                  starRatedColor="#FDCC0D"
                  starDimension='16px'
                  numberOfStars={5}
                  starSpacing='1px'
                  name='rating'
                />
              </div>

              <div className="flex items-center justify-between ">
                <span className={`${color?.text} text-sm leading-none font-semibold `}>
                  {allHotelDetails?.description_title}
                </span>
                <div className="flex-shrink-0">

                </div></div>
              <p className={`${color?.textgray} whitespace-pre-wrap text-sm my-2 line-clamp-10`}>
                {allHotelDetails?.description_body}
              </p>
            </div>

            {/* Address */}
            <div className={`${color?.whitebackground} shadow rounded-lg p-4  sm:p-6 xl:p-8`}>
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <h3 className={`${color?.text} text-base font-bold  mb-4`}>
                    {language?.address}
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <span
                    className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2"
                  >
                    <Link href="./address">
                      <a>{language?.seemore}</a>
                    </Link>
                  </span>
                </div>
              </div>
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden">
                  <table className="table-fixed min-w-full  ">
                    <tbody >
                      {allHotelDetails?.address?.map((item, idx) => {
                        return (
                          <>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                                  {language?.address}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                                {item.address_street_address}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                                  {language?.landmark}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                                {item.address_landmark}{" "}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold `}>
                                  {language?.postalcode}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                                {item.address_zipcode}{" "}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="flex   p-1 items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                                  {language?.province}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                                {item.address_city}{" "}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                                  {language?.countrycode}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                                {country?.[i]?.country_name}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                                  {language?.latitude}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                                {item.address_latitude}{" "}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold `}>
                                  {language?.longitude}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                                {item.address_longitude}{" "}
                              </td>
                            </tr>
                            <tr className={'border-b-2'} key={idx}>
                              <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                                <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold `}>
                                  {language?.precision}
                                </td>
                              </td>
                              <td className={`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                                {item.address_precision}{" "}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/*Contact */}
            <div className={`${color?.whitebackground} shadow rounded-lg  p-4 sm:p-6 xl:py-8 xl:px-4`}>
              <div className="flex items-center justify-between ">
                <div className="flex-shrink-0">
                  <h3 className={`${color?.text} text-base font-bold  mb-4`}>
                    {language?.contact}
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <span
                    className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2"
                  >
                    {" "}
                    <Link href="./contact"><a>{language?.seemore}</a></Link>
                  </span>
                </div>
              </div>
              <div className="align-middle inline-block  min-w-full">
                <div className="overflow-hidden">
                  <table className="table-fixed min-w-full  ">
                    <tbody>
                      {allHotelDetails?.contacts?.map((item, idx) => {
                        return (
                          <tr className='border-b-2' key={idx}>
                            <td className="flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                              <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                                {item?.contact_type}{" "}
                              </td>
                            </td>
                            <td className={`${color?.textgray} p-2 whitespace-wrap text-sm my-2`}>
                              {item?.contact_data}{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className={`${color?.greybackground} relative overflow-y-auto py-2 w-full grid  md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3`}>
            <div className={`${color?.whitebackground}  shadow rounded-lg p-4 sm:p-6 xl:p-8`}>
              <div className="flex items-center justify-between ">
                <div className="flex-shrink-0">
                  <h3 className={`${color?.text} text-base font-bold  mb-4`}>
                    {language?.gallery}
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <span
                    className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2"
                  >
                    <Link href="./gallery"><a>{language?.seemore}</a></Link>
                  </span>
                </div>
              </div>
              <Carousel cols={1} rows={1} gap={10} autoPlay={1000} loop={true}
                responsiveLayout={[
                  {
                    breakpoint: 480,
                    cols: 1,
                    rows: 1,
                    gap: 10,
                    loop: true,
                    autoplay: 1000
                  },
                  {
                    breakpoint: 810,
                    cols: 2,
                    rows: 1,
                    gap: 10,
                    loop: true,
                    autoplay: 1000
                  },
                  {
                    breakpoint: 1020,
                    cols: 2,
                    rows: 1,
                    gap: 10,
                    loop: true,
                    autoplay: 1000
                  },
                ]}
              >
                {allHotelDetails?.images?.map((resource, index) => {
                  return (
                    <Carousel.Item key={index} >
                      <img width="100%" style={{ height: "350px" }} className="rounded-lg" src={resource?.image_link} /></Carousel.Item>
                  )
                })}</Carousel>

            </div>
          </div>

          <div className={`${color?.greybackground}  grid  lg:grid-cols-3 md:grid-cols-1 py-2 sm:grid-cols-1 gap-3`}>
            {/* Services */}
            <div className={`${color?.whitebackground} shadow rounded-lg p-4  sm:p-6 xl:p-8`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                  <h3 className={`${color?.text} text-base font-bold mb-4`}>
                    {language?.services}
                  </h3>
                </div>
                <div className="flex items-center justify-end">
                  <span
                    className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2"
                  >
                    <Link href="./services"><a>{language?.seemore}</a></Link>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap capitalize">
                {allHotelDetails?.services?.map((service, idx) => (
                  <>{service?.service_value === 'yes' ?
                    <Capsule key={idx} title={service?.service_name.replaceAll('_', " ")} />
                    : <></>}</>
                )
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className={`${color?.whitebackground} col-span-2  shadow rounded-lg p-4  sm:p-6 xl:p-8`}>
              <div className="flex items-center justify-between ">
                <div className="flex-shrink-0">
                  <h3 className={`${color?.text} text-base font-bold  mb-4`}>
                    {language?.reviews}
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1">
                  <span
                    className="text-sm font-sans underline decoration-cyan-600
                             font-semibold text-cyan-600
                              rounded-lg p-2"
                  >
                    <Link href="./reviews"><a>{language?.seemore}</a></Link>
                  </span>
                </div>
              </div>
              {allHotelDetails?.Reviews?.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${color?.text} text-sm leading-none font-semibold`}>
                      {item?.review_author}
                    </span>

                    <div className="flex-shrink-0">
                      <div className="flex items-center flex-1 justify-end px-2 text-yellow-400 text-sm font-bold">
                        <StarRatings
                          rating={item?.review_rating}
                          starRatedColor="#FDCC0D"
                          starDimension='16px'
                          numberOfStars={5}
                          starSpacing='1px'
                          name='rating'
                        />
                      </div>
                    </div>
                  </div>
                  <p className={`${color?.textgray} text-sm my-2  line-clamp-2`}>
                    {" "}
                    {item?.review_content}{" "}
                  </p>
                </div>
              ))}
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
        <Footer color={color} Primary={english.Foot} />
      </div>
    </>
  );

}

export default PropertySummary;
