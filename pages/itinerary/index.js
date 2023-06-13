import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../components/loaders/darktableloader';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import colorFile from "../../components/colors/Color";
import axios from "axios";
import Link from "next/link";
import Table from '../../components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar";
import LoaderTable from "../../components/loadertable";
import { useRouter } from "next/router"
import Headloader from "../../components/loaders/headloader";
import LineLoader from '../../components/loaders/lineloader';
import Footer from '../../components/Footer';
import Multiselect from 'multiselect-react-dropdown';
var language;
var currentProperty;
var currentLogged;
let colorToggle;
import Router from "next/router";
import Button from '../../components/Button';
import WidgetStatus from '../../components/widgetStatus';
import PackageItenarary from '../../components/devlopmentjson/PackageItenarary.json';
import AddonData from '../../components/devlopmentjson/AddonData.json';
import AttractionData from '../../components/devlopmentjson/AttractionData.json';
function Index() {
  const router = useRouter();
  const [visible, setVisible] = useState(1);
  const [spinner, setSpinner] = useState(0)
  const [basicDetails, setBasicDetails] = useState([]);
  const [flag, setFlag] = useState([]);
  const [color, setColor] = useState({})
  const [error, setError] = useState({})
  const [mode, setMode] = useState()
  const [disp, setDisp] = useState(0)
  const [imageLogo, setImageLogo] = useState()
  const [uploadImageSpin, setUploadImageSpin] = useState(false)

  const [activePlace, setActivePlace] = useState({})
  const [visibleDay, setVisibleDay] = useState({})
  const [attraction, setAttraction] = useState([])
  const [activeMilestone, setActiveMilestone] = useState({})
  const [attractionInfo, setAttractionInfo] = useState([])
  const [unSelectedAttraction, setUnSelectedAttraction] = useState([])
  const [actionDay, setActionDay] = useState(0)

  const [itenary, setItenary] = useState(PackageItenarary[0])
  const [addNewAttraction,setAddNewAttraction] = useState({})

  function editMilestone() {
    let temp = attractionInfo?.milestones.filter(i => i.attraction_id != activeMilestone.attraction_id)
    const data = [...temp, activeMilestone];
    console.log(temp);
    setAttractionInfo({ ...attractionInfo, milestones: data })
    document.getElementById('editmilestones').reset();
    setDisp(5);
  }

  /** Fetching language from the local storage **/
  useEffect(() => {
    firstfun();
  }, [])



  const firstfun = () => {
    if (typeof window !== 'undefined') {
      var locale = localStorage.getItem("Language");
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
      /** Current Property Details fetched from the local storage **/
      currentProperty = JSON.parse(localStorage.getItem("property"));
      currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

    }
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
    router.push('../itinerary')
  }
  function addMilestone() {
    const temp = [...attractionInfo?.milestones, activeMilestone];
    console.log(temp);
    setAttractionInfo({ ...attractionInfo, milestones: temp })
    setDisp(5);
  }
  function Addonschange(event) {
    console.log(event);
    setActiveMilestone({ ...activeMilestone, addons: event })
  }
  function addAddon() {
    setDisp(6);
  }
  function addAttraction() {
    alert(JSON.stringify([...attraction,addNewAttraction]))
    setAttraction([...attraction,addNewAttraction])
    setDisp(3);
  }

  function generateAttractionData(){
    let all_place_attraction=AttractionData.filter((i)=>i.place===activePlace).[0].attractions
    let presentAttraction=attraction.map(i=>i.attraction_id);
    let unselectedAttraction=all_place_attraction?.filter(i=>!presentAttraction.includes(i.attraction_id))
    setUnSelectedAttraction(unselectedAttraction)
  }

  const name = ['Itinerary', 'Details', 'Places', 'Attractions', 'Activities', 'Milestones', 'Details']
  return (
    <div>
      <Header color={color} Primary={english.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode} />
      <Sidebar color={color} Primary={english.Side} Type={currentLogged?.user_type} />
      <div className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

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
                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="./propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                    <a>{basicDetails?.property_name}</a>
                  </Link>
                  </div></div>

              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.basicdetails}</span>
                </div>
              </div>
            </li>
          </ol>
        </nav>

          {/* itinerary detail */}
        <div id='0' className={disp === 0 ? 'block' : 'hidden'}>
          {/* progress bar */}

          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>

            <div>
              <WidgetStatus name={name} selected={1} color={color} />
            </div>
            <div className="pt-6 ">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">

                  {/* tour name filed */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Name
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.tour_name} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* tour type */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Type
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <select data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          required
                        // onChange={(e) => ()} 
                        >
                          <option value="">{itenary.tour_type}</option>
                          <option value="">Independent Tours</option>
                          <option value="">Freedom Tours</option>
                          <option value="">Hosted Tours</option>
                          <option value="">Escorted Tours</option>
                          <option value="">Incentives Travel/Tours</option>
                        </select>
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* tour description */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Description
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <textarea data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.tour_summary} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* duration day and night */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Duration-Days and Nights
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block flex ' : 'hidden'}>
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Duration Days
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} w-12 mx-4 border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.duration_days} required
                        // onChange={(e) => ()} 
                        />
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Duration Night
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border w-12 mx-4 border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={itenary.duration_nights} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                </div>
                <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
                  <Button Primary={language?.Update} onClick={() => { alert('update clicked') }} />
                  <Button Primary={language?.Next} onClick={() => { setDisp(1) }} />
                </div>
              </div>
            </div>


          </div>
        </div>


        {/* Days Details */}
        <div id='1' className={disp === 1 ? 'block' : 'hidden'}>
          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            {/* progress bar */}
            <div>
              <WidgetStatus name={name} selected={2} color={color} />
            </div>
            {/* progress bar end */}
            <div className='flex justify-end'>
              <Button Primary={language?.Add} onClick={() => { alert("add days clicked") }} />
            </div>
            <div className="flex flex-col mt-8 lg:mr-0 sm:mr-0 ">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden">
                    <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                      <thead className=" bg-gray-100">
                        <tr>
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                              <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                            </div>
                          </th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Itenaray Day</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                        {itenary?.plan?.map((days, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="p-4 w-4">
                                <span className="flex items-center">
                                  <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                  <label htmlFor="checkbox-1" className="sr-only" />
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">Day {days.day}</td>

                              <td className="py-4 whitespace-nowrap capitalize">
                                <div>
                                  <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                    onClick={() => { setVisibleDay(days); setDisp(2); }}>Edit </button>

                                </div>
                              </td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
              <Button Primary={language?.Previous} onClick={() => { setDisp(0) }} />
            </div>
          </div>
        </div>


        {/* places for day */}
        <div id='2' className={disp === 2 ? `${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2 block` : 'hidden'}>
          {/* progress bar */}
          <div>
            <WidgetStatus name={name} selected={3} color={color} /> <widgetBar name={['Itinerary Description', 'Details', 'Places', 'Attractions']} selected={1} color={color} />
          </div>
          {/* progress bar end */}

          {/*content of div*/}
          <div className='flex '>
            <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>
            <div className="ml-auto">
              <button className="bg-gradient-to-r bg-cyan-600 mr-2 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                onClick={() => { alert('add aditional info') }}>Add Additional Info </button>
              <button className="bg-gradient-to-r bg-cyan-600 mt-1 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                onClick={() => { alert('add place') }}>Add Place</button>
            </div>


          </div>
          {/* table of activities for day */}
          <div className="flex flex-col mt-8 lg:mr-0 sm:mr-0 ">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden">
                  <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                    <thead className=" bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Places</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      {visibleDay?.places?.map((place, id) => {
                        return (
                          <tr key={id}>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{place.place_name}</td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setAttraction(place.attractions); setActivePlace(place.place_name); setDisp(3) }}>Edit </button>

                              </div>
                            </td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </table>

                  <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>
                    <Button Primary={language?.Previous} onClick={() => { setDisp(1) }} />
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Attractions of places */}
        <div id='3' className={disp === 3 ? `${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2 block` : 'hidden'}>
          {/* progress bar */}
          <div>
            <WidgetStatus name={name} selected={4} color={color} />
          </div>
          {/* progress bar end */}

          {/*content of div*/}
          <div className='flex '>
            <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>
            <button className="ml-auto bg-gradient-to-r bg-cyan-600  hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
              onClick={() => { generateAttractionData(); setDisp(9); }}>Add Attraction</button>
          </div>
          {/* table of activities for day */}
          <div className="flex flex-col mt-8 lg:mr-0 sm:mr-0 ">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden">
                  <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                    <thead className=" bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Attractions</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase"></th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                      {attraction?.map((attraction, id) => {
                        return (
                          <tr key={id}>
                            <td className="p-4 w-4">
                              <span className="flex items-center">
                                <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                  className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                <label htmlFor="checkbox-1" className="sr-only" />
                              </span>
                            </td>
                            <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{attraction?.activity_name}</td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setAttractionInfo(attraction); setDisp(4) }}>Edit </button>

                              </div>
                            </td>

                            <td className="py-4 whitespace-nowrap capitalize">
                              <div>
                                <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                  onClick={() => { setAttractionInfo(attraction); setDisp(5) }}>Milestones </button>

                              </div>
                            </td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </table>

                  <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>

                    <Button Primary={language?.Previous} onClick={() => { setDisp(2) }} />
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>

        {/*place activity widget */}

        <div id='4' className={disp === 4 ? 'block' : 'hidden'}>

          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            {/* progress bar */}
            <div>
              <WidgetStatus name={name} selected={5} color={color} />
            </div>
            {/* progress bar end */}
            {/* activities of selected day display */}
            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* activity name field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Activity Name
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.activity_name} required
                          onChange={(e) => (setAttractionInfo({ ...attractionInfo, activity_name: e.target.value }))}
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                  {/* borading point field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Boarding Point
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.boarding_point} required
                          onChange={(e) => (setAttractionInfo({ ...attractionInfo, boarding_point: e.target.value }))}
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/*Tour capacity */}
                  <div className="w-full lg:w-6/12  px-4 ">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm capitalize font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Tour Capacity
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block flex flex-wrap' : 'hidden'}>
                        <label
                          className={`text-sm  font-medium ${color?.text} block mb-2 px-2 mt-2`}
                          htmlFor="grid-password">
                          Adults
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} w-12 mx-4 border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mt-2`}
                          defaultValue={attractionInfo?.capacity?.adult} required
                          onChange={(e) => (setAttractionInfo({ ...attractionInfo.capacity, adult: e.target.value }))}
                        />
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2 mt-2`}
                          htmlFor="grid-password">
                          Children
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border w-12 mx-4 border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mt-2`}
                          defaultValue={attractionInfo?.capacity?.children} required
                          onChange={(e) => (setAttractionInfo({ ...attractionInfo.capacity, children: e.target.value }))}
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* guided tour field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Guided Tour
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.Guided_tour} required
                          onChange={(e) => (setAttractionInfo({ ...attractionInfo, Guided_tour: e.target.value }))}
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>

                  {/* time of ride field */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Time Of Ride
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.time_of_ride} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                  {/* distance */}
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        Distance
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={attractionInfo?.distance} required
                        // onChange={(e) => ()} 
                        />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {/* for error messages{error?.property_name}*/}</p>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
              <Button Primary={language?.Update} onClick={() => { alert('update clicked') }} />
              <Button Primary={language?.Previous} onClick={() => { setDisp(3) }} />
            </div>


          </div>
        </div>

        {/* milestone widget-list of milestones */}

        <div id='5' className={disp === 5 ? 'block' : 'hidden'}>
          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            <div>
              <WidgetStatus name={name} selected={6} color={color} />
            </div>
            {/*content of div*/}
            <div className='flex '>
              <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>Day : {visibleDay.day}</span>
              <button className="ml-auto bg-gradient-to-r bg-cyan-600  hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                onClick={() => { setDisp(7) }}>Add Additional Info</button>
            </div>
            {/* table of activities for day */}
            <div className="flex flex-col mt-8 lg:mr-0 sm:mr-0 ">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden">
                    <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                      <thead className=" bg-gray-100">
                        <tr>
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                              <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                            </div>
                          </th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Milestone</th>
                          <th scope="col" className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>

                        </tr>
                      </thead>
                      <tbody className=" bg-white divide-y  divide-gray-200" id="TableList">
                        {attractionInfo?.milestones?.map((milestone, id) => {
                          return (
                            <tr key={id}>
                              <td className="p-4 w-4">
                                <span className="flex items-center">
                                  <input id="checkbox-1" name="r0091" aria-describedby="checkbox-1" type="checkbox"
                                    className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                  <label htmlFor="checkbox-1" className="sr-only" />
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap capitalize text-base font-normal text-gray-700">{milestone?.milestone_name}</td>

                              <td className="py-4 whitespace-nowrap capitalize">
                                <div>
                                  <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                    onClick={() => { setActiveMilestone(milestone); setDisp(6) }}>Edit </button>

                                </div>
                              </td>


                            </tr>
                          )
                        })}

                      </tbody>
                    </table>

                    <div className='flex items-center justify-end space-x-2  sm:space-x-3 ml-auto'>

                      <Button Primary={language?.Previous} onClick={() => { setDisp(3) }} />
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* edit milestone widget */}
        <div className={disp === 6 ? 'block' : 'hidden'}>
          <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
            <div>
              <WidgetStatus name={name} selected={7} color={color} />
            </div>
            <div className='flex flex-row'>
              <span className={`p-2 text-left text-lg font-bold text-gray-900 uppercase`}>{activeMilestone.milestone_name}</span>
              <button className="ml-auto bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                onClick={() => { setDisp(8) }}>Add Addons</button>
            </div>
            <form id="editmilestones">
              <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>

                <div className="pt-6">
                  <div className=" md:px-4 mx-auto w-full">
                    <div className="flex flex-wrap">
                      {/* milestone name */}
                      <div className="w-full lg:w-6/12  px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className={`text-sm font-medium ${color?.text} block mb-2`}
                            htmlFor="grid-password">
                            Milestone Name
                            <span style={{ color: "#ff0000" }}>*</span>
                          </label>
                          <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                          <div className={visible === 1 ? 'block' : 'hidden'}>
                            <input
                              type="text" data-testid="test_property_name"
                              className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                              defaultValue={activeMilestone?.milestone_name} required
                              onChange={(e) => (setActiveMilestone({ ...activeMilestone, milestone_name: e.target.value }))}
                            />
                            <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                              {/* for error messages{error?.property_name}*/}</p>
                          </div>
                        </div>
                      </div>


                      {/* Information Detail */}
                      <div className="w-full lg:w-6/12  px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className={`text-sm font-medium ${color?.text} block mb-2`}
                            htmlFor="grid-password">
                            Milestone Description
                            <span style={{ color: "#ff0000" }}>*</span>
                          </label>
                          <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                          <div className={visible === 1 ? 'block' : 'hidden'}>
                            <input
                              type="text" data-testid="test_property_name"
                              className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                              defaultValue={activeMilestone?.description} required
                              onChange={(e) => (setActiveMilestone({ ...activeMilestone, description: e.target.value }))}
                            />
                            <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                              {/* for error messages{error?.property_name}*/}</p>
                          </div>
                        </div>
                      </div>

                      {/*addon multiselect*/}
                      <div className="w-full lg:w-6/12  px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className={`text-sm font-medium ${color?.text} block mb-2`}
                            htmlFor="grid-password">
                            Addons
                            <span style={{ color: "#ff0000" }}>*</span>
                          </label>
                          <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                          <div className={visible === 1 ? 'block' : 'hidden'}>
                            <Multiselect
                              isObject={true}
                              options={AddonData}
                              onRemove={(event) => { Addonschange(event) }}
                              onSelect={(event) => { Addonschange(event) }}
                              selectedValues={activeMilestone?.addons}
                              displayValue="addon_name"
                              placeholder="Search"
                              closeIcon='circle'
                              style={{
                                chips: {
                                  background: '#0891b2',
                                  'font-size': '0.875 rem'
                                },
                                searchBox: {
                                  border: 'none',
                                  'border-bottom': 'none',
                                  'border-radius': '0px'
                                }
                              }}

                            />
                            <p className="text-sm text-sm text-red-700 font-light">
                              {error?.view}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
                  <Button Primary={language?.Update} onClick={() => { editMilestone() }} />
                  <Button Primary={language?.Previous} onClick={() => { document.getElementById('editmilestones').reset(); setDisp(5) }} />
                </div>
              </div>
            </form>
          </div>
        </div >
        

        {/* add Additional Info*/}

        <div className={disp === 7 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={`${color?.whitebackground} rounded-lg shadow relative`}
              >
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    Add New Additional Info
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("newAdditionalInfo").reset();
                      setDisp(5);
                      setActiveMilestone({});
                      // setError({});
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="pt-6">
                  <div className=" md:px-4 mx-auto w-full">
                    <form id="newAdditionalInfo">
                      <div className="flex flex-wrap">
                        {/* milestone name */}
                        <div className="w-full lg:w-6/12  px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className={`text-sm font-medium ${color?.text} block mb-2`}
                              htmlFor="grid-password">
                              Information Title
                              <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                            <div className={visible === 1 ? 'block' : 'hidden'}>
                              <input
                                type="text" data-testid="test_property_name"
                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                required
                                onChange={(e) => setActiveMilestone({ ...activeMilestone, milestone_name: e.target.value })}
                              />
                              <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                {/* for error messages{error?.property_name}*/}</p>
                            </div>
                          </div>
                        </div>


                        {/* milestone description */}
                        <div className="w-full lg:w-6/12  px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className={`text-sm font-medium ${color?.text} block mb-2`}
                              htmlFor="grid-password">
                              Information Detail
                              <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                            <div className={visible === 1 ? 'block' : 'hidden'}>
                              <input
                                type="text" data-testid="test_property_name"
                                className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                required
                                onChange={(e) => setActiveMilestone({ ...activeMilestone, description: e.target.value })}
                              />
                              <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                                {/* for error messages{error?.property_name}*/}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
                  <Button Primary={language?.Update} onClick={() => { addMilestone() }} />
                  <Button Primary={language?.Previous} onClick={() => { setDisp(5) }} />
                </div>
              </div>
            </div>
          </div>
        </div >



        {/* add addon */}
        <div className={disp === 8 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={`${color?.whitebackground} rounded-lg shadow relative`}
              >
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    Add New Addons
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("newaddons").reset();
                      setDisp(6);
                      setActiveMilestone({});
                      // setError({});
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="pt-6">
                  <div className=" md:px-4 mx-auto w-full">
                    <form id="newaddons">
                      <div className="flex flex-wrap">



                        {/*addon multiselect*/}
                        <div className="w-full lg:w-6/12  px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className={`text-sm font-medium ${color?.text} block mb-2`}
                              htmlFor="grid-password">
                              Addons
                              <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                            <div className={visible === 1 ? 'block' : 'hidden'}>
                              <Multiselect
                                isObject={true}
                                options={AddonData}
                                onRemove={(event) => { Addonschange(event) }}
                                onSelect={(event) => { Addonschange(event) }}
                                selectedValues={activeMilestone?.addons}
                                displayValue="addon_name"
                                placeholder="Search"
                                closeIcon='circle'
                                style={{
                                  chips: {
                                    background: '#0891b2',
                                    'font-size': '0.875 rem'
                                  },
                                  searchBox: {
                                    border: 'none',
                                    'border-bottom': 'none',
                                    'border-radius': '0px'
                                  }
                                }}

                              />
                              <p className="text-sm text-sm text-red-700 font-light">
                                {error?.view}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
                  <Button Primary={language?.Update} onClick={() => { addAddon() }} />
                  <Button Primary={language?.Previous} onClick={() => { setDisp(6) }} />
                </div>
              </div>
            </div>
          </div>
        </div >

        {/* add attraction */}
        <div className={disp === 9 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={`${color?.whitebackground} rounded-lg shadow relative`}
              >
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    Add New Attraction
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("newattractions").reset();
                      setDisp(3);
                      // setError({});
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="pt-6">
                  <div className=" md:px-4 mx-auto w-full">
                    <form id="newattractions">
                      <div className="flex flex-wrap">

                        {/*Select Attraction*/}
                        <div className="w-full lg:w-6/12  px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className={`text-sm font-medium ${color?.text} block mb-2`}
                              htmlFor="grid-password">
                              Attractions
                              <span style={{ color: "#ff0000" }}>*</span>
                            </label>
                            <div className={visible === 0 ? 'block' : 'hidden'}><LineLoader /></div>
                            <div className={visible === 1 ? 'block' : 'hidden'}>
                            <select data-testid="test_attractions" className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        onChange={
                          (e) => {
                            setAddNewAttraction(JSON.parse(e.target.value));
                          }
                        } required
                      >
                        <option value=''>Select Activity</option>
                        {unSelectedAttraction?.map((i,index)=>{return(<option value={JSON.stringify(i)} key={index}>{i.activity_name}</option>)})}
                      </select>
                     
                              <p className="text-sm text-sm text-red-700 font-light">
                                {error?.view}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className='flex items-center justify-end space-x-2 sm:space-x-3 ml-auto'>
                  <Button Primary={language?.Update} onClick={() => { addAttraction() }} />
                  <Button Primary={language?.Previous} onClick={() => { setDisp(3) }} />
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
      <Footer color={color} Primary={english.Foot} />
    </div>
  )
}

export default Index