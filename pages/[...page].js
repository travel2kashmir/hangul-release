
import React from "react";
import Title from "../components/title";
import { useState, useEffect } from "react";
import en from "../components/Languages/en"
import fr from "../components/Languages/fr"
import ar from "../components/Languages/ar"
import { useRouter } from "next/router";
import Classic from "./themes/classic";
import NewTheme from "../components/NewTheme"
import Fusion from "../components/ModernTheme";
import ModernThemeColors from "../components/ModernTheme/Data/Colors"
import ClassicThemeColors from "../components/ClassicTheme/Data/Colors"
import Cosmic from "../components/LodgeTheme";
import CountrySide from "../components/CountrysideTheme"
import getUserIdentity from "../components/Analytics/userIdentity";
import renderSnippet from "../components/utils/Code/renderSnippet";
import Script from 'next/script'
import Router from 'next/router';


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
      fetchPackageDetails(package_data);

      data?.contacts?.map(i => { if (i.contact_type === 'Phone') { setPhone(i) } });
      data?.contacts?.map(i => { if (i.contact_type === 'Email') { setEmail(i) } });
      setDisp(1);
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

  

  // send analytics to segment 
  useEffect(() => {
    const handleRouteChange = async (url) => {
      console.log(url)
      if (url) {
        global.analytics.page('Loaded Another Website Page', {
          page: url,
        });

      };

    }
    const identifyUser = async () => {
      // getUserIdentity() is user defined function to get user identity
      const id = await getUserIdentity();
      if (id) {
      global.analytics.identify(id.user, {...id,"property_id":data.property_id});
      }
    }

    identifyUser();

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (

    <> <Script
      id="segment-script"
      dangerouslySetInnerHTML={{ __html: renderSnippet() }}
    />
      <Title name={`${data?.property_name}`} />
    

      {/* Classic Theme */}
      {theme === "Classic" ?
        <div className="sticky">
          <Classic language={language} allHotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ClassicThemeColors.white} /></div> : <div className="sticky"></div>}

      {/* Classic Theme */}
      {theme === "Classic Accessible" ?
        <div className="sticky">
          <Classic language={language} allHotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ClassicThemeColors.accessibleColors} /></div> : <div className="sticky"></div>}

      {/* Classic Dark */}
      {theme === "Classic-Dark" ?
        <div className="sticky">
          <Classic language={language} allHotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ClassicThemeColors.black} /></div> : <div className="sticky"></div>}

      {theme === "Neo" ?
        <div className="sticky">
          <NewTheme language={language.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} /></div> : <div className="sticky"></div>}

      {/* Fusion */}
      {theme === "Fusion" ?
        <div className="sticky">
          <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ModernThemeColors.black} /></div> : <div className="sticky"></div>}

      {/* Fusion */}
      {theme === "Fusion-red" ?
        <div className="sticky">
          <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ModernThemeColors.red} /></div> : <div className="sticky"></div>}

      {/* Fusion */}
      {theme === "Fusion-green" ?
        <div className="sticky">
          <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ModernThemeColors.green} /></div> : <div className="sticky"></div>}

      {/* Fusion */}
      {theme === "Fusion-white" ?
        <div className="sticky">
          <Fusion language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} initialColor={ModernThemeColors.white} /></div> : <div className="sticky"></div>}

      {/* Cosmic */}
      {theme === "Cosmic" ?
        <div className="sticky">
          <Cosmic language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
            allRooms={allRooms} allPackages={allPackages} services={services}
            phone={phone} email={email} /></div> : <div className="sticky"></div>}

      {/* Country-Side */}
      {theme === "Country-Side" ?
        <div className="sticky">
          <CountrySide language={language?.activeThemeLanguage} HotelDetails={allHotelDetails}
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
    const full_data = await fetch(`${process.env.serverURL}:${process.env.port}/all_data${items}`)
      .then((response) => response.json());
    //return data fetched to function generation html  

    let data = JSON.parse(full_data?.property_data);
    let room_data = JSON.parse(full_data?.room_data);
    return { props: { data, room_data } }
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
