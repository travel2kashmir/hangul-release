
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import en from "../components/Languages/en"
import fr from "../components/Languages/fr"
import ar from "../components/Languages/ar"
import { useRouter } from "next/router";
import Classic from "./themes/classic";
import ClassicDark from './themes/classic-dark'
import NewTheme from "../components/NewTheme"
const logger = require("../services/logger");
var language;
function Page({ data, room_data, package_data }) {
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [allRooms, setAllRooms] = useState({});
  const [allPackages, setAllPackages] = useState({});
  const [phone, setPhone] = useState({});
  const [email, setEmail] = useState({});
  const [services, setServices] = useState([]);
  const [disp, setDisp] = useState(0);
  const [theme, setTheme] = useState("Classic")
  /** Router for Redirection **/
  const router = useRouter();
  const fetchLanguage = (lang) => {
    console.log("fetched language is " + lang)
    if (lang === "ar") {
      language = ar;
    }
    else if (lang === "en") {
      language = en;
    }
    else if (lang === "fr") {
      language = fr;
    }
    else {
      language = en;
    }

  }
  const fetchProperty = async () => {

    if (data?.http_code != '404') {
      var language = router.locale || 'en';
      console.log("language is " + language)
      fetchLanguage(language)
      setAllHotelDetails(data);
      setTheme(data?.theme != "" ? data?.theme : 'Classic');
      fetchRoomDetails(room_data);
      fetchPackageDetails(package_data);

      data?.contacts?.map(i => { if (i.contact_type === 'Phone') { setPhone(i) } });
      data?.contacts?.map(i => { if (i.contact_type === 'Email') { setEmail(i) } });
      var ser = [];
      data?.services?.map(i => {
        if (i.service_value !== "no")
          if (i.service_value !== "Not available") {
            {
              ser.push(i)
            }
          }
        setServices(ser)
      }

      );
      setDisp(1);
      logger.info("url  to fetch property details hitted successfully")
    }
    else {
      router.push('/404');
    }

  }

  const fetchRoomDetails = async (room_data) => {
    setAllRooms(room_data);
  }

  const fetchPackageDetails = async (package_data) => {
    setAllPackages(package_data);
  }

  /* Function call to fetch Current Property Details when page loads */
  useEffect(() => {
    if (data === '404') {
      router.push('/404')
    }
    else {
      fetchProperty();
    }

  }, [data]);


  return (
    
    <>
      {/* Classic Theme */}
      {theme === "Classic" ?
        <div className="sticky">
          <Classic language={language} allHotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} /></div> : <div className="sticky"></div>}
      {/* Classic Dark */}
      {theme === "Classic-Dark" ?
        <div className="sticky">
          <ClassicDark language={language} allHotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} /></div> : <div className="sticky"></div>}
      {/* newTheme */}
      {theme === "New-Theme" ?
        <div className="sticky">
          <NewTheme language={language.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} /></div> : <div className="sticky"></div>}
    </>
  

  );
}
// This gets called on every request
export async function getServerSideProps(context) {
  const items = context.resolvedUrl;
  //to check if url is valid string
  if (items.split('/').length === 5) {
    //fetch hotel data
    const data = await fetch(`${process.env.serverURL}:${process.env.port}/api${items}`)
      .then((response) => response.json());
    let property_id = data?.property_id;
    //fetch room data
    const room_data = await fetch(`${process.env.serverURL}:${process.env.port}/api/all_rooms_details/${property_id}`)
      .then((response) => response.json());
    //fetch package data
    const package_data = await fetch(`${process.env.serverURL}:${process.env.port}/api/all_packages_details/${property_id}`)
      .then((response) => response.json())
    //return data fetched to function generation html  
    return { props: { data, room_data, package_data } }
  }
  else {
    let data = '404';
    //if length of string is not desired then return error flag 404
    return { props: { data } }
  }
}
export default Page;
Page.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
