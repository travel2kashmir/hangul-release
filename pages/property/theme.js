import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import colorFile from "../../components/colors/Color";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import { english, arabic, french } from "../../components/Languages/Languages"
import Title from "../../components/title";
import Router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Classic from "../themes/classic";
import NewTheme from "../../components/NewTheme"
import Fusion from "../../components/ModernTheme"
import ModernThemeColors from "../../components/ModernTheme/Data/Colors"
import ClassicThemeColors from "../../components/ClassicTheme/Data/Colors"
import Cosmic from "../../components/LodgeTheme"
import CountrySide from "../../components/CountrysideTheme"
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import renderSnippet from "../../components/utils/Code/renderSnippet";
import Script from "next/script";
var language;
var currentUser;
var currentProperty;
var currentLogged;
let colorToggle;
let premiumThemes = ["Neo", "Fusion", "Fusion-red", "Fusion-green", "Fusion-white", "Cosmic", "Country-Side"];
// let premiumThemes = [];

function Theme() {
  /** State to store Current Property Details **/
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [mode, setMode] = useState()
  const [color, setColor] = useState({})
  const [allRooms, setAllRooms] = useState({});
  const [allPackages, setAllPackages] = useState({});
  const [themes, setThemes] = useState(false)
  const [phone, setPhone] = useState({});
  const [services, setServices] = useState([]);
  const [email, setEmail] = useState({});
  const [themeName, setThemeName] = useState("")
  const [uri, setUri] = useState("")
  const [loc, setLoc] = useState()
  const [lang, setLang] = useState('en')
  const [visible, setVisible] = useState(0)
  var locale;

  /** Router for Redirection **/
  const router = useRouter();

  useEffect(() => {
    onComponentLoadActions();
    // router.push("./theme");
  }, [])

  const onComponentLoadActions = () => {
    if (typeof window !== 'undefined') {
      locale = localStorage.getItem("Language");
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
      currentUser = JSON.parse(localStorage.getItem("Signin Details"));
      /** Current Property Details fetched from the local storage **/
      currentProperty = JSON.parse(localStorage.getItem("property"));
      currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
      setLoc(window.location.origin)
      setLang(locale)

    }
  }



  /* Function call to fetch Current Property Details when page loads */
  useEffect(() => {
    fetchHotelDetails();
    fetchRoomDetails();
    fetchPackageDetails();

  }, []);

  const fetchHotelDetails = async () => {
    const url = `/api/${currentProperty?.address_province.replace(
      /\s+/g,
      "-"
    )}/${currentProperty?.address_city}/${currentProperty?.property_category
      }s/${currentProperty?.property_id}`;
    axios.get(url)
      .then((response) => {
        var ser = [];
        setThemeName(response.data.theme)
        setAllHotelDetails(response.data);
        response.data.services.map(i => {
          if (i.service_value !== "no")
            if (i.service_value !== "Not available") {
              {
                ser.push(i);
              }
            }
          setServices(ser)
        }

        );
        response.data.contacts.map(i => { if (i.contact_type === 'Phone') { setPhone(i) } });
       response.data.contacts.map(i => { if (i.contact_type === 'Email') { setEmail(i) } });
      })
      .catch((error) => { console.error("url to fetch property details, failed") });
  }
  const fetchRoomDetails = async () => {

    const url = `/api/all_rooms_details/${currentProperty.property_id}`;
    axios.get(url)
      .then((response) => {
        setAllRooms(response.data);
      })
      .catch((error) => { console.error("url to fetch property details, failed") });
  }

  const fetchPackageDetails = async () => {
    const url = `/api/all_packages_details/${currentProperty.property_id}`;
    axios.get(url)
      .then((response) => {
        setAllPackages(response.data);
      })
      .catch((error) => { console.error("url to fetch package details, failed") });
  }

  const sendLink = () => {
    const data = {
      uuid: `${allHotelDetails?.property_name.replaceAll(' ', '-')}-${currentProperty?.address_city}`,
      property_id: currentProperty?.property_id,
      address_id: allHotelDetails.address[0].address_id,
      theme_id: theme,
      lang: localStorage?.getItem("Language")
    }

    axios.post('/api/property_page', data).then(
      (response) => {
        toast.success("Page Updated Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        initialtheme();
        Router.push("./theme");
      }).catch((error) => toast.error("Unique URL Update Error!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }
  const submitTheme = () => {
    const final_data = {
      "property_id": currentProperty?.property_id,
      "theme": themeName
    }
    const url = '/api/basic'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("Theme updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      .catch((error) => {

        toast.error("Theme Set Error!", {
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

  const changeTheme = (item) => {
    localStorage.setItem("ThemeName", item);
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
        text: "Themes",
        link: ""
      }
    ])
  }


  return (
    <><Script
    id="segment-script"
    dangerouslySetInnerHTML={{ __html: renderSnippet() }}
  />
      <Title name={`Engage |  Themes`} />

      <Header
        color={color}
        setColor={setColor}
        Primary={english?.Side}
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
      <div id="main-content" className={`${color?.greybackground}  pt-24 relative overflow-y-auto lg:ml-64`}>
        {/* bread crumb */}

        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Themes Selection*/}
        <div className="flex px-4" >
          <h6 className={`${color?.text} text-xl font-bold mt-2 mb-4`}>
            Themes
          </h6>
          {/* Header */}
          <div className="flex items-center justify-end space-x-1  sm:space-x-2 ml-auto">
            <div>
              <button onClick={() => { setThemes(!themes) }} className={`text-cyan-600 text-xs ${color?.whitebackground} hover:${color?.greybackground} 
                     border font-semibold rounded-lg  pr-2 py-2 
                         text-center inline-flex items-center`}
                type="button">
                <span className="flex items-center">
                  <span className="h-2.5 w-2.5 capitalize rounded-full mx-1 bg-green-400"></span>
                  <span className="mr-0.5">  {themeName}</span>
                  <svg className=" w-4 h-4 px-0.5" aria-hidden="true" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" stroke-Linejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span> </button>
              <div className={themes === true ? 'block' : 'hidden'}>
                <div className={`z-10 w-40 fixed rounded ${color?.greybackground} overflow-hidden divide-y divide-gray-100 shadow`}>
                  <ul className={`py-1 text-sm ${color?.text}`} aria-labelledby="dropdownDefault">
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Classic"); setThemes(!themes); changeTheme("Classic") }} >Classic</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Classic Accessible"); setThemes(!themes); changeTheme("Classic Accessible") }} >Classic Accessible</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Classic-Dark"); setThemes(!themes); changeTheme("Classic-Dark") }} >Classic-Dark</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Neo"); setThemes(!themes); changeTheme("Neo") }} >Neo</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Fusion"); setThemes(!themes); changeTheme("Fusion") }} >Fusion</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Fusion-red"); setThemes(!themes); changeTheme("Fusion-red") }} >Fusion-red</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Fusion-green"); setThemes(!themes); changeTheme("Fusion-green") }} >Fusion-green</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Fusion-white"); setThemes(!themes); changeTheme("Fusion-white") }} >Fusion-white</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Cosmic"); setThemes(!themes); changeTheme("Cosmic") }} >Cosmic</button>
                    </li>
                    <li className={`block py-2 px-4 ${color?.sidebar} `}>
                      <button onClick={() => { setThemeName("Country-Side"); setThemes(!themes); changeTheme("Country-Side") }} >Country-Side</button>
                    </li>
                  </ul>
                </div></div>
            </div>
            <div>
              {premiumThemes.includes(themeName) === true ?
                <> {allHotelDetails.isPremium === "true" ?
                  <button className="bg-cyan-600 text-sm text-center hover:bg-cyan-700 text-white  py-2 px-4 rounded" onClick={() => {
                    submitTheme();
                  }}>Save</button> :
                  <button className="bg-cyan-600 hover:bg-cyan-700 mx-2 text-white opacity-60 cursor-not-allowed  py-2 px-4 rounded"
                  >Save</button>} </> :
                <button className="bg-cyan-600 text-sm text-center hover:bg-cyan-700 text-white  py-2 px-4 rounded" onClick={() => {
                  submitTheme();
                }}
                >Save</button>}

            </div>

            <div className="flex hover:underline py-2 hover:decoration-cyan-600">
              <svg className="h-6 w-6 pt-1 flex-none stroke-sky-500" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10Z"></path><circle cx="10" cy="10" r="2.25"></circle></svg>
              <button className=" text-base text-center text-cyan-600 mr-2  rounded"
              >
                <Link href={
                  `${loc}/${lang}/${currentProperty?.address_province.replace(
                    /\s+/g,
                    "-"
                  )}/${currentProperty?.address_city}/${currentProperty?.property_category?.replaceAll(' ', '-')?.toLowerCase()
                  }s/${allHotelDetails?.property_name?.replaceAll(' ', '-')?.toLowerCase()}`
                }>
                  <a target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                </Link>
              </button>

            </div>

          </div>
        </div>
      </div>

      <div className="lg:ml-64">
        {/* Classic Theme */}
        {themeName === "Classic" ?
          <div className="sticky">
            <Classic language={language} allHotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ClassicThemeColors.white} /></div> : <div className="sticky"></div>}
        {/* classic theme Accessible */}
        {themeName === "Classic Accessible" ?
          <div className="sticky">
            <Classic language={language} allHotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ClassicThemeColors.accessibleColors} /></div> : <div className="sticky"></div>}

        {themeName === "Classic-Dark" ?
          <div className="sticky">
            <Classic language={language} allHotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ClassicThemeColors.black} /></div> : <div className="sticky"></div>}

        {/* Classic Dark */}
        {/* {themeName === "Classic-Dark" ?
          <div className="sticky">
            <ClassicDark language={language} allHotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} /></div> : <div className="sticky"></div>} */}

        {/* newTheme */}
        {themeName === "Neo" ?
          <div className="sticky">
            <NewTheme language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} /></div> : <div className="sticky"></div>}

        {/* Fusion */}
        {themeName === "Fusion" ?
          <div className="sticky">
            <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ModernThemeColors.black} /></div> : <div className="sticky"></div>}

        {/* Fusion */}
        {themeName === "Fusion-red" ?
          <div className="sticky">
            <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ModernThemeColors.red} /></div> : <div className="sticky"></div>}

        {/* Fusion */}
        {themeName === "Fusion-green" ?
          <div className="sticky">
            <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ModernThemeColors.green} /></div> : <div className="sticky"></div>}

        {/* Fusion */}
        {themeName === "Fusion-white" ?
          <div className="sticky">
            <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} initialColor={ModernThemeColors.white} /></div> : <div className="sticky"></div>}


        {/* Cosmic */}
        {themeName === "Cosmic" ?
          <div className="sticky">
            <Cosmic language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} /></div> : <div className="sticky"></div>}

        {/* Country-Side */}
        {themeName === "Country-Side" ?
          <div className="sticky">
            <CountrySide language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
              allRooms={allRooms} allPackages={allPackages} services={services}
              phone={phone} email={email} /></div> : <div className="sticky"></div>}
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
    </>

  );
}
export default Theme;
Theme.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}