import React from "react";
import Link from "next/link";
import LoaderTable from "../../components/loadertable";
import Table from "../../components/Table";
import UserProfileSidebar from "../../components/userprofilesidebar";
import UserProfileHeader from "../../components/userprofileheader";
import { useEffect, useState } from "react";
import Title from '../../components/title';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import LoaderDarkTable from "../../components/loaders/darktableloader";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
const logger = require("../../services/logger");
import colorFile from '../../components/colors/Color'
var language;
var currentUser;
let currentLogged;
let colorToggle;

const Landing = () => {
  var locale;

  /** Router for Redirection **/
  const router = useRouter();

  /** State Intialisation for storing all Properties of Current User **/
  const [ownerdata, setOwnerdata] = useState([]);
  const [gen, setGen] = useState([])
  const [visible, setVisible] = useState(0);
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")
  const[mode,setMode] = useState()
  

  useEffect(() => {
    firstfun();
    if (JSON.stringify(currentUser) === 'null') {
      router.push(window.location.origin)
    }
    else {
      fetchProperty();
    }
  }, [])

  

  const firstfun = async () => {
    if (typeof window !== 'undefined') {
       locale = localStorage.getItem("Language");
       colorToggle = localStorage.getItem("colorToggle");

      if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
        setColor(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? colorFile?.dark
         : colorFile?.light);
         setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true
         : false);

      }
      else if (colorToggle === "true" || colorToggle === "false") {
        setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light)
        setMode(colorToggle === "true" ? true : false)
      }

      {
        if (locale === "ar") {
          language = arabic;
        } else if (locale === "en") {
          language = english;
        } else if (locale === "fr") {
          language = french;
        }
      }
      currentUser = JSON.parse(localStorage.getItem("Signin Details"));
      currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
    }
  }
  

  /** Use Effect to fetch all the properties of Current user **/
  const fetchProperty = async () => {
    try {
      var genData = [];
      const l = localStorage.getItem("Language");
      console.log("language " + l)
      const url = `/api/${l}/properties/${currentUser?.id}`;

      logger.info("url" + url)
      const response = await axios.get(url, {
        headers: { accept: "application/json" },
      });
      setOwnerdata(response.data);
      setVisible(1)
      {
        response.data?.map((item) => {
          var temp = {
            name: item.property_name,
            type: item.property_category,
            status: item.status,
            id: item.property_id,
            property_id: item.property_id,
            user_id: item.user_id,
            property_name: item.property_name,
            address_province: item.address_province,
            address_city: item.address_city,
            property_category: item.property_category,
            language: item.language
          }
          genData.push(temp)
        })
        setGen(genData);
      }



    } catch (error) {
      if (error.response) {
        logger.error("Current User Properties Error");
      } else {
        logger.error("Current User Properties Error");
      }
    }
  };
  
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
   router.push('./landing')
  }



  /**Function to save Current property to be viewed to Local Storage**/
  const LocalProperty = (props) => {
    localStorage.setItem("property", JSON.stringify(props));
    router.push('./propertysummary');
  };

  return (
    <>
      <Title name={`Engage |  ${language?.landing}`} />
      <UserProfileHeader color={color} Primary={color?.name} Sec={colorToggler} mode={mode} setMode={setMode}/>
      <UserProfileSidebar color={color} Primary={color?.name} Sec={colorToggler} colorToggle={colorToggle} />

      <div
        id="main-content"
        className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>
        {/* Navbar */}
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/AdminLanding" : "./landing"}
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                </Link></div>
            </li>

            <li>
              <div className="flex items-center">
                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>

                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.LandingCols?.name}</span>
                </div>
              </div>
            </li>
          </ol>
        </nav>


        <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
        <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
        <div className={visible === 1 ? 'block' : 'hidden'}>
          <Table gen={gen} setGen={setGen} esp="landing"
            color={color}
            view={language?.view} edit={LocalProperty}
            common={language?.common} cols={language?.LandingCols}
            name="Inventory" />
        </div>



        {/* <div className={`${color?.whitebackground} shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0`} >
            <div className="p-4 sm:py-8 sm:px-2 lg:p-space-y-2">
              <div className="text-center mt-16">
                <div className={visible === 0 ? ' block w-32 h-8 my-2 flex justify-center' : 'hidden'}><></></div>
                <div className={visible === 1 ? ' block' : 'hidden'}>
                  <p className="capitalize font-semibold text-3xl font-sans sm:mt-4 mx-10 mt-2 mb-6 text-cyan-500">
                    {language?.welcome} {currentUser?.name}
                  </p></div>
              </div>
              <div className={visible === 0 ? ' block w-36 h-8 my-2 flex justify-center' : 'hidden'}><Buttonloader /></div>
              <div className={visible === 1 ? ' block' : 'hidden'}>
                <p className={`${color.text} font-semibold mb-2 text-lg `}>{language?.List} {language?.ofproperties}</p>
              </div>
              <form className=" space-y-1" action="#">
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden">
                        <div className={visible === 0 ? 'block' : 'hidden'}><Landingloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <table className="table-fixed min-w-full divide-y divide-gray-200">
                            <thead className={`${color.greybackground}`}>
                              <tr>
                                <th
                                  scope="col"
                                  className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                                  }> {language?.property} {language?.name}</th>
                                <th
                                  scope="col"
                                  className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                                  }
                                >
                                  {language?.property} {language?.category}
                                </th>
                                <th
                                  scope="col"
                                  className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                                  }
                                >
                                  {language?.Status}
                                </th>
                                <th
                                  scope="col"
                                  className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                                  }
                                >
                                  {language?.action}
                                </th>
                              </tr>
                            </thead>
                            <tbody className={`${color.text} divide-y divide-gray-200`
                            }>
                              {Object.keys(ownerdata).length != 0 ? ownerdata?.map((item, idx) => {
                                return (
                                  <tr className={`${color?.hover}`} key={idx}>
                                    <td
                                      className={`${color.text} p-1 whitespace-nowrap text-base font-medium  capitalize`}
                                    >
                                      {item?.property_name}
                                    </td>
                                    <td className={`${color.text} p-1 whitespace-nowrap text-base font-medium  capitalize`}>
                                      {item?.property_category}
                                    </td>
                                    <td className={`${color.text} p-1 whitespace-nowrap text-base font-medium  capitalize`}>
                                      <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                        {language?.active}
                                      </div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap space-x-1">
                                      <Button Primary={language?.View} onClick={() => { LocalProperty({ item }); }} />
                                    </td>
                                  </tr>
                                );
                              }) : <></>}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        */}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>
  );
}
export default Landing;
Landing.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
