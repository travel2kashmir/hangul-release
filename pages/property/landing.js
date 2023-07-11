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
import colorFile from '../../components/colors/Color';
import GenericTable from "../../components/utils/Tables/GenericTable";
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
  const [mode, setMode] = useState()


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
            "checkbox": { operation: undefined },
            "Property Name": item.property_name,
            "Property Type": item.property_category,
            "status": JSON.stringify(item.status),
            Actions: [
              {
                type: "button",
                label: "View",
                operation: () => { LocalProperty({ item }) }
              }
            ],
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
    localStorage.setItem("property", JSON.stringify(props.item));
    router.push('./propertysummary');
  };

  return (
    <>
      <Title name={`Engage |  ${language?.landing}`} />
      <UserProfileHeader color={color} Primary={color?.name} Sec={colorToggler} mode={mode} setMode={setMode} />
      <UserProfileSidebar color={color} Primary={color?.name} Sec={colorToggler} colorToggle={colorToggle} />

      <div
        id="main-content"
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
          {/* call to generic table  */}
          <GenericTable
            color={color}
            language={language}
            addButton={false}
            tableName={language?.listofproperties}
            cols={["Property Name", "Property Type", "status", "Actions"]}
            data={gen}
          />

        </div>

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
