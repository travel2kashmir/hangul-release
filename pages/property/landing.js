import React from "react";
import Link from "next/link";
import LoaderTable from "../../components/loadertable";
import UserProfileSidebar from "../../components/userprofilesidebar";
import UserProfileHeader from "../../components/userprofileheader";
import { useEffect, useState } from "react";
import Title from '../../components/title';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import LoaderDarkTable from "../../components/loaders/darktableloader";
import {english,arabic,french} from "../../components/Languages/Languages"
import GenericTable from "../../components/utils/Tables/GenericTable";
import { LocalProperty,NavigationList } from "../../components/Landing";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
var language;
let currentLogged;
let colorToggle;

const Landing = () => {
   /** Router for Redirection **/
  const router = useRouter();
 /** State Intialisation for storing all Properties of Current User **/
  const [ownerdata, setOwnerdata] = useState([]);
  const [gen, setGen] = useState([])
  const [visible, setVisible] = useState(0);
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()


  useEffect(() => {
    onComponentLoadActions();
    if (JSON.stringify(currentLogged) === 'null') {
      router.push(window.location.origin)
    }
    else {
      fetchProperty();
    }
  }, [])

  const onComponentLoadActions = () => {
    if (typeof window !== 'undefined') {
      const resp = InitialActions({ setColor, setMode })
      language = resp?.language;
      currentLogged = resp?.currentLogged;
      if (JSON.stringify(currentLogged) != "null") {
        let currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        
      }

    }
  }



  /** Use Effect to fetch all the properties of Current user **/
  const fetchProperty = async () => {
    try {
      var genData = [];
      const l = localStorage.getItem("Language");
      const url = `/api/${l}/properties/${currentLogged?.id}`;
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
        console.error("Current User Properties Error");
      } else {
        console.error("Current User Properties Error");
      }
    }
  };

  return (
    <>
      <Title name={`Engage |  ${language?.landing}`} />
      <UserProfileHeader color={color} setColor={setColor} Primary={color?.name} Sec={ColorToggler} mode={mode} setMode={setMode} />
      <UserProfileSidebar color={color} setColor={setColor} Primary={color?.name} Sec={ColorToggler} colorToggle={colorToggle} />

      <div
        id="main-content"
        className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>
        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={NavigationList(currentLogged, language?.LandingCols?.name)}
        />

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
            showOptions={false}
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
