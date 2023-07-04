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
const logger = require("../../services/logger");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../../components/Footer';
var language;
var currentUser;
var country;
var currentProperty;
var currentLogged;
var i = 0;
let colorToggle;

function PropertySummary() {
  /** State to store Current Property Details **/
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [color, setColor] = useState({})
  const[mode,setMode] = useState()
  const [modeChanger, setModeChanger] = useState("")
   
 /** Router for Redirection **/
  const router = useRouter();
  useEffect(() => {
    firstfun();
    if(JSON.stringify(currentUser)==='null'){
      router.push(window.location.origin)
    } 
    else
    {fetchHotelDetails();}
  }, [])

  const firstfun = () => {
  if (typeof window !== 'undefined') {
    var locale = localStorage.getItem("Language");
    const colorToggle =localStorage.getItem("colorToggle");
    if(colorToggle === "" ||colorToggle === undefined ||  colorToggle ===null ||colorToggle === "system"){
       window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) :setColor(colorFile?.light) ;
       setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true
       : false);
    }
    else if(colorToggle === "true" || colorToggle === "false") {
      setColor(colorToggle=== "true" ? colorFile?.dark: colorFile?.light);
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
    currentUser = JSON.parse(localStorage.getItem("Signin Details"));
       
    /** Current Property Details fetched from the local storage **/
    currentProperty = JSON.parse(localStorage.getItem("property"));
    currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

  }
   }

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
          logger.info("url  to fetch property details hitted successfully")
        })
        .catch((error) => { logger.error("url to fetch property details, failed") });
    }

    const filterCountry = (props)=>{
      country =  lang?.CountryData.filter(el => {
           return props.address_country.toUpperCase() === el.country_code;
        });
      }

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
       router.push('./propertysummary')
      }

  return (
    <>
     <Title name={`Engage |  ${language?.propertysummary}`}/>
     <div>
      <Header color={color} Primary={english?.Side} Type={currentLogged?.user_type}  Sec={colorToggler} mode={mode} setMode={setMode}/>
      <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type}/>
      {/* Body */}
      <div id="main-content"
         className={`${color?.greybackground} px-4 py-2 pt-24 relative overflow-y-auto lg:ml-64` }>
        {/* bread crumb */}
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg
                  className="w-5 h-5 mr-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/)?"../admin/adminlanding":"./landing"} className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
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
                <span className={`${color?.textgray} text-sm   font-medium hover:text-gray-900 ml-1 md:ml-2`}>
                  {allHotelDetails?.property_name} 
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div>
        </div>

        <div className={`${color?.greybackground} w-full grid py-2  grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3`}>
          {/* Basic Details */}
          <div className={`${color?.whitebackground} shadow rounded-lg p-4 sm:p-6 xl:p-8`} >
          <div className="flex items-center justify-between ">
              <div className="flex-shrink-0">
                <h3 className={ `${color?.text} text-base font-bold  mb-4`}>
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
                          <td className= {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                            {item.address_street_address}
                          </td>
                        </tr> 
                        <tr className={'border-b-2'} key={idx}>
                          <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                            {language?.landmark}
                            </td>
                          </td>
                          <td className= {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                          {item.address_landmark}{" "}
                          </td>
                        </tr>
                        <tr className={'border-b-2'} key={idx}>
                          <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold `}>
                            {language?.postalcode}
                            </td>
                          </td>
                          <td className=  {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                          {item.address_zipcode}{" "}
                          </td>
                        </tr>
                        <tr className={'border-b-2'} key={idx}>
                          <td className="flex   p-1 items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                            {language?.province}
                            </td>
                          </td>
                          <td className=  {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                          {item.address_city}{" "}
                          </td>
                        </tr>
                        <tr className={'border-b-2'} key={idx}>
                          <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                            {language?.countrycode}
                            </td>
                          </td>
                          <td className=  {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                          {country?.[i]?.country_name}
                          </td>
                        </tr>
                        <tr className={'border-b-2'} key={idx}>
                          <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold`}>
                            {language?.latitude}
                            </td>
                          </td>
                          <td className=  {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`} >
                          {item.address_latitude}{" "}
                          </td>
                        </tr>
                        <tr className={'border-b-2'} key={idx}>
                          <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold `}>
                            {language?.longitude}
                            </td>
                          </td>
                          <td className=  {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
                          {item.address_longitude}{" "}
                          </td>
                        </tr>
                        <tr className={'border-b-2'} key={idx}>
                          <td className="p-1  flex items-center whitespace-nowrap space-x-6 mr-6 lg:mr-0">
                            <td className={`${color?.text} p-2 whitespace-wrap text-sm leading-none font-semibold `}>
                            {language?.precision}
                            </td>
                          </td>
                          <td className= {`${color?.textgray} p-1 whitespace-wrap text-sm my-2`}>
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
          <div className= {`${color?.whitebackground}  shadow rounded-lg p-4 sm:p-6 xl:p-8`}>
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
                             responsiveLayout={ [
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
             {allHotelDetails?.services?.map((service,idx)=> (
              <>{service?.service_value === 'yes'?
              <Capsule key={idx} title={service?.service_name.replaceAll('_'," ")}/>
              :<></>}</>
              )
             )}
            </div>
          </div>
            
          {/* Reviews */}
          <div className={ `${color?.whitebackground} col-span-2  shadow rounded-lg p-4  sm:p-6 xl:p-8`}>
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
                <p className= {`${color?.textgray} text-sm my-2  line-clamp-2`}>
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
      <Footer color={color} Primary={english.Foot}/>
    </div>
    </>
  ); 

}

export default PropertySummary;
