import React, { useEffect, useState } from 'react';
import LoaderDarkTable from '../../../components/loaders/darktableloader';
import validateRoomRates from '../../../components/validation/room/roomratesadd';
import validateRoom from '../../../components/validation/room/roomdescriptionadd';
import validateRoomGallery from '../../../components/validation/room/roomgalleryadd';
import validateBedData from '../../../components/validation/room/roombedadd';
import Multiselect from 'multiselect-react-dropdown';
import lang from '../../../components/GlobalData'
import DarkModeLogic from "../../../components/darkmodelogic";
import axios from "axios";
import Headloader from '../../../components/loaders/headloader';
import Lineloader from '../../../components/loaders/lineloader';
import Button from '../../../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import colorFile from '../../../components/colors/Color';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import ImageDemo from "../../../components/utils/ImageDemo";
import InputTextBox from "../../../components/utils/InputTextBox";
import InputText from '../../../components/utils/InputText';
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Router from 'next/router'
import { addInventoryDetail } from '../../../components/redux/hangulSlice';
import BreadCrumb from '../../../components/utils/BreadCrumb';
import { fetchRoomtypes, fetchServices, validationRoomDescription, validationBedData, submitServices, navigationList } from '../../../components/logic/property/Rooms/AddRoom';
import GenericTable from '../../../components/utils/Tables/GenericTable';
import AddNewRatesofRoom from '../../../components/rooms/AddNewRatesofRoom';


const logger = require("../../../services/logger");
var currentLogged;
let colorToggle;
var language;
var currentProperty;
var addroom;


function Addroom() {
  const [allRoomDetails, setAllRoomDetails] = useState([])
  const [spinner, setSpinner] = useState(0)
  const [spin, setSpin] = useState(0)
  const [color, setColor] = useState({})
  const [visible, setVisible] = useState(0)
  const [roomtypes, setRoomtypes] = useState({});
  const [actionImage, setActionImage] = useState({})
  const [services, setServices] = useState([])
  const [roomId, setRoomId] = useState([])
  const [finalView, setFinalView] = useState([])
  // const [disp, setDisp] = useState(4);
  const [disp, setDisp] = useState(0);
  const [modified, setModified] = useState({})
  const [error, setError] = useState({})
  const [flag, setFlag] = useState(0)
  const [allRoomRates, setAllRoomRates] = useState([])
  const [mode, setMode] = useState()
  const [roomIdentifiers, setRoomIdentifiers] = useState()

  /** Use Effect to fetch details from the Local Storage **/

  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle

    /** To fetch room types and room services **/
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchRoomtypes(setRoomtypes, setVisible);
      fetchServices(setServices);
    }
  }, [])

  function manageIdentifiers(room_id, room_type_id) {
    let id = roomIdentifiers?.split(",")
    let final = [];
    let temp;
    id.map((i) => {
      temp = {
        "room_id": room_id,
        "room_type_id": room_type_id,
        "room_identifier": i
      }
      final.push(temp);

    })
    axios.post('/api/room_refrence', { "room_refrences": final },
      { headers: { 'content-type': 'application/json' } })
      .then(response => {
        setSpinner(0);
        toast.success("API: Room Refrences Added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(() => {
        toast.error("API: Room Refrences Added Failed", {
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


  // Image Template
  const imageTemplate = {
    property_id: currentProperty?.property_id,
    image_link: '',
    image_title: '',
    image_description: '',
    image_category: '',
    imageFile: ''
  }
  // Images Mapping
  const [imageData, setImageData] = useState([imageTemplate]?.map((i, id) => { return { ...i, index: id } }))

  const addPhotos = () => {
    setImageData([...imageData, imageTemplate]?.map((i, id) => { return { ...i, index: id } }))
  }

  const removeImage = (index) => {
    const filteredImages = imageData.filter((i, id) => i.index !== index)
    setImageData(filteredImages)
  }

  const onChangePhoto = (e, index, i) => {
    setImageData(imageData?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.files[0]
      }
      return item
    }))
  }

  const onChangeImage = (e, index, i) => {
    setImageData(imageData?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.value
      }
      return item
    }))
  }

  const uploadImage = (index) => {
    setSpin(1);
    const imageDetails = imageData?.find(i => i.index === index)?.imageFile
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir")
    axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
      .then(response => {
        const newData = imageData?.map((i) => {
          if (i.index === index) {
            i.image_link = response?.data?.secure_url
          }
          return i
        })
        setImageData(newData)
        setSpin(0);
      })
      .catch(error => {
        toast.error("Error uploading photo.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSpin(0);
      });

  }

  /*For Room Description*/
  const [allRoomDes, setAllRoomDes] = useState([]);

  //add new inventory 
  const submitInventory = (room_id) => {
    const current = new Date();
    const currentDateTime = current.toISOString();
    const final_data = {
      "inventory": [{
        "property_id": currentProperty?.property_id,
        "start_date": new Date().toISOString().split('T')[0],
        "end_date": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "days_of_week": 'mtwtfss',
        "room_id": room_id,
        "inventory_count": allRoomDes?.inventory_count,
        "inventory_type": 2
      }]
    }
    // const url = '/api/ari/inventory'
    const url = '/api/inventory'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("API:Inventory Added successfully", {
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
        toast.error("API:There was some Error in adding the Inventory ", {
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


  /** For Bed**/
  const BedTemplate = {
    "length": "",
    "width": ""
  }

  /* Mapping Index of each Bed*/
  const [BedData, setBedData] = useState([BedTemplate]?.map((i, id) => { return { ...i, index: id } }))

  /** Function to add Bed **/
  const addBed = () => {
    setBedData([...BedData, BedTemplate]?.map((i, id) => { return { ...i, index: id } }))
  }

  /** Function to on change for Bed **/
  const onChange = (e, index, i) => {
    setBedData(BedData?.map((item, id) => {
      if (item.index === index) {
        item[i] = e.target.value
      }
      return item
    }))
  }

  /** Function to cancel package mile **/
  const removeBed = (index) => {
    const filteredBed = BedData.filter((i, id) => i.index !== index)
    setBedData(filteredBed)
  }

  // Bed Data Submit
  const submitBed = (props) => {
    const current = new Date();
    const currentDateTime = current.toISOString();
    setSpinner(1);
    const data = BedData?.map((i => {
      return {
        "room_id": props,
        "length": i?.length,
        "width": i?.width,
        "unit": "cm",
        "timestamp": currentDateTime
      }
    }))
    const final_data = { "beds": data }
    const url = '/api/bed_details'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        setSpinner(0);
        toast.success("API: Bed add success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setError({});
        setFlag([]);
        setBedData([BedTemplate]?.map((i, id) => { return { ...i, index: id } }));
      })
      .catch((error) => {
        setSpinner(0);
        toast.error("API: Bed add error", {
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

  // View Submit
  const submitView = (props) => {
    const data = finalView?.map((i => {
      return {
        "room_id": props,
        "view": i?.view
      }
    }))
    const final_data = { "room_views": data }
    const url = '/api/room_views'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("API: View add success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setError({});
      })
      .catch((error) => {
        toast.error("API: View add error.", {
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

  /** Function to submit room images **/
  const submitRoomImages = () => {
    const imagedata = imageData?.map((i => {
      return {
        property_id: currentProperty?.property_id,
        image_link: i.image_link,
        image_title: i.image_title,
        image_description: i.image_description,
        image_category: "room",
        room_id: roomId
      }
    }))
    var result = validateRoomGallery(imagedata);
    if (result === true) {
      setSpinner(1);
      const finalImage = { "images": imagedata }
      axios.post(`/api/gallery`, finalImage)
        .then(response => {
          setSpinner(0);
          toast.success(JSON.stringify(response.data.message), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setActionImage([]);
          setError({});
          setDisp(4);
        })
        .catch(error => {
          setSpinner(0)
          toast.error("API: Gallery error.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }

    else {
      setError(result)
    }
  }


  /* Function for Room Rates*/
  const submitRoomRates = () => {
    if (allRoomRates.length !== 0) {
      const final_data = {
        "room_id": roomId,
        "baserate_currency": allRoomRates?.currency,
        "baserate_amount": allRoomRates?.baserate_amount,
        "tax_currency": allRoomRates?.currency,
        "tax_amount": allRoomRates?.tax_amount,
        "otherfees_amount": allRoomRates?.otherfees_amount,
        "otherfees_currency": allRoomRates?.currency,
      }
      setSpinner(1);
      const url = '/api/room_unconditional_rates'
      axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {
          setSpinner(0);
          toast.success("API: Room rates added successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setAllRoomRates([]);
          setError({});
          Router.push("../rooms")
        })
        .catch((error) => {
          setSpinner(0);
          toast.error("API: Room rates  error! ", {
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
    else {
      toast.error("App: Please fill the room rates details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  //Views
  const views = (viewData) => {
    setFinalView([]);
    var final_view_data = []
    viewData.map(item => {
      var temp = {
        view: item?.view.replaceAll(" ", "")
      }
      final_view_data.push(temp)
    });
    setFinalView(final_view_data);
  }

  
  // Validate Rates
const validationRates = () => {
    var result = validateRoomRates(allRoomRates)
    if (result === true) {
      submitRoomRates();
    }
    else {
      setError(result)
    }
  }




  return (
    <>
      <Title name={`Engage | Add Room`} />

      <Header
        Primary={english?.Side1}
        color={color}
        setColor={setColor}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
        mode={mode}
        setMode={setMode}
      />

      <Sidebar
        Primary={english?.Side1}
        color={color}
        Type={currentLogged?.user_type}
      />

      <div id="main-content"
        className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>

        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Title */}
        <div className=" pt-2 ">

          <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2 font-bold`}>
            {language?.add} {language?.room}
          </h6>

          {/* Room Forms */}
          {/* Room Description */}
          {disp===0 && <div id='0' className='block'>
            <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
              <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                  <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.description}</div>
                </div>

                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.services}</div>
                </div>
                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.gallery}</div>
                </div>
                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.rates}</div>
                </div>
              </div>
              <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
                {language?.room} {language?.description}
              </h6>
              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                  <div className="flex flex-wrap">

                    {/* room name  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.name}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, room_name: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.room_name}</p>
                      </div>
                    </div>

                    {/* room type  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          {language?.room} {language?.type}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <select
                            onClick={(e) => setAllRoomDes({ ...allRoomDes, room_type_id: e.target.value, room_type: e.target.value })}
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} >
                            {roomtypes.length === undefined ? <option value="loading">Loading values</option> :
                              <>
                                <option selected disabled>{language?.select}</option>
                                {roomtypes?.map(i => {
                                  return (

                                    <option key={i.room_type_id} value={i.room_type_id}>{i?.room_type_name.replaceAll("_", " ")}</option>)
                                }
                                )}</>}
                          </select>
                          <p className="text-sm text-red-700 font-light">
                            {error?.room_type}</p></div>
                      </div>
                    </div>

                    {/*Room Description */}
                    <InputTextBox
                      label={` ${language?.room} ${language?.description}`}
                      visible={visible}
                      defaultValue={allRoomDes?.room_description}
                      wordLimit={1000}
                      onChangeAction={(e) => {
                        if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                          setError({})
                          setAllRoomDes({ ...allRoomDes, room_description: e.target.value });
                        }
                        else {
                          setError({ room_description: 'word limit reached' })
                        }

                      }

                      }
                      error={error?.room_description}
                      color={color}
                      req={true}
                      tooltip={true}
                    />

                    {/* room capacity */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.capacity}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text" className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, room_capacity: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.room_capacity}</p>
                      </div>
                    </div>
                    {/* maximum number of guest  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.maximum} {language?.number} {language?.of} {language?.occupants}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, maximum_number_of_occupants: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.maximum_number_of_occupants}</p>
                      </div>
                    </div>
                    {/* minimum number of occupants  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.minimum} {language?.number} {language?.of} {language?.occupants}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, minimum_number_of_occupants: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.minimum_number_of_occupants}</p>
                      </div>
                    </div>
                    {/* minimum age of occupant  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.minimum} {language?.age} {language?.of} {language?.occupants}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, minimum_age_of_occupants: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.minimum_age_of_occupants}</p>
                      </div>
                    </div>
                    {/* view from room  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          {language?.viewsfromroom}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <Multiselect
                            className={`shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full`}
                            isObject={true}
                            options={lang?.Views}
                            onRemove={(event) => { views(event) }}
                            onSelect={(event) => { views(event) }}
                            displayValue="view"
                          />
                          <p className="text-sm text-red-700 font-light">
                            {error?.view}</p>
                        </div>
                      </div>
                    </div>
                    {/* room length  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.length}({language?.infeet})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, room_length: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.room_length}</p></div>
                    </div>
                    {/* room breadth  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.breadth}({language?.infeet})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, room_width: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.room_width}</p>
                      </div>
                    </div>
                    {/* room height  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.height}({language?.infeet})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={e => setAllRoomDes({ ...allRoomDes, room_height: e.target.value })}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.room_height}</p>
                      </div>
                    </div>

                    {/* room style  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          {language?.roomstyle}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <select className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            onChange={
                              (e) => (
                                setAllRoomDes({ ...allRoomDes, room_style: e.target.value })
                              )
                            }
                          >
                            <option selected disabled >{language?.select}</option>
                            <option value="western">Western</option>
                            <option value="japanese">Japanese</option>
                            <option value="japanese_western">Japanese Western</option>
                          </select>
                          <p className="text-sm text-red-700 font-light">
                            {error?.room_style}</p>
                        </div>
                      </div>




                    </div>
                    {/* is room shared  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          {language?.isroomshared}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <select className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            onChange={
                              (e) => (
                                setAllRoomDes({ ...allRoomDes, is_room_sharing: e.target.value })
                              )
                            }
                          >
                            <option selected disabled >{language?.select}</option>
                            <option value="shared" >Yes</option>
                            <option value="private">No</option>
                          </select>
                          <p className="text-sm text-red-700 font-light">
                            {error?.is_room_sharing}</p>
                        </div>
                      </div>
                    </div>

                    {/* is room indoor or outdoor  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          {language?.isroom}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <select className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}

                            onChange={
                              (e) => (
                                setAllRoomDes({ ...allRoomDes, is_room: e.target.value })
                              )
                            }
                          >
                            <option selected disabled >{language?.select}</option>
                            <option value="outdoor" >Indoor</option>
                            <option value="indoor">Outdoor</option>
                          </select>
                          <p className="text-sm  text-red-700 font-light">
                            {error?.is_room}</p>
                        </div>
                      </div>
                    </div>

                    {/* room inventory start */}
                    <InputText
                      label={`${language?.room} ${language?.inventory}`}
                      visible={visible}
                      defaultValue={''}
                      onChangeAction={
                        (e) => {
                          setAllRoomDes({ ...allRoomDes, inventory_count: e.target.value })
                        }
                      }
                      color={color}
                      disabled={false}
                      req={true}
                      title={"Total number of rooms available"}
                      tooltip={true}
                      error={error?.inventory_count}
                    />
                    {/* room inventory end */}


                    {/* Room identifier field start */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          Room identifiers
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input type="text" className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            placeholder='comma seperated values'
                            onChange={
                              (e) => (
                                setRoomIdentifiers(e.target.value)
                              )
                            }
                          />

                          <p className="text-sm text-red-700 font-light">
                            {error?.room_identifier}</p>
                        </div>
                      </div>
                    </div>
                    {/*  Room identifier field end */}
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
                {allRoomDes?.room_type_id === 'rt001' || allRoomDes?.room_type_id === 'rt002' || allRoomDes?.room_type_id === 'rt003' || allRoomDes?.room_type_id === 'rt004'
                  || allRoomDes?.room_type_id === 'rt005' ?

                  <Button Primary={language?.Next} onClick={(e) => {
                    validationRoomDescription(allRoomDes, finalView, roomIdentifiers, setDisp, setError, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes)
                  }} /> :
                  <>

                    <div className={spinner === 0 ? 'block' : 'hidden'}>
                      {allRoomDes?.length !== 0 ?
                        <Button Primary={language?.Submit} onClick={(e) => {
                          validationRoomDescription(allRoomDes, finalView, roomIdentifiers, setDisp, setError, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes)
                        }} /> :
                        <Button Primary={language?.SubmitDisabled} />}
                    </div>
                    <div className={spinner === 1 ? 'block' : 'hidden'}>
                      <Button Primary={language?.Spinnersubmit} /></div>
                  </>
                }
              </div>
            </div>
          </div>}

          {/* Room Beds */}
          {disp===1 && <div id='1' className='block'>
            <div className={`${color?.whitebackground} shadow rounded-lg mt-2 mx-1 px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
              <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary">1</button>
                  <div className={`${color.crossbg} lg:w-32 font-medium  text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.description}</div>
                </div>

                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">2</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.services}</div>
                </div>
                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.gallery}</div>
                </div>
                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>{language?.room} {language?.rates}</div>
                </div>
              </div>
              <h6 className={`${color?.text} text-xl flex leading-none pl-6 pt-2 font-bold  mb-4`}>
                {language?.room}  {language?.description}
              </h6>
              {allRoomDes?.room_type_id === 'rt001' || allRoomDes?.room_type_id === 'rt002' || allRoomDes?.room_type_id === 'rt003' || allRoomDes?.room_type_id === 'rt004'
                || allRoomDes?.room_type_id === 'rt005' ?
                <>
                  {allRoomDes?.room_type_id !== 'rt001' ?
                    <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                      <Button Primary={language?.AddLOS} onClick={addBed} />
                    </div> : <></>}

                  <div className="pt-2">
                    <div className=" md:px-4 mx-auto w-full">
                      {BedData?.map((BedData, index) => (
                        <>
                          <div className={BedData?.index === 0 ? "hidden" : "block"}>
                            <div className="flex items-center justify-end space-x-2 sm:space-x-1 ml-auto">
                              <button className={`${color?.cross} sm:inline-flex  ${color?.crossbg}
                     font-semibold border  focus:ring-4 focus:ring-cyan-200 font-semibold 
                     rounded-lg text-sm px-1 py-1 text-center 
                     items-center mb-1 ml-16 ease-linear transition-all duration-150`}
                                onClick={() => removeBed(BedData?.index)} type="button" >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap" key={index}>

                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className={`text-sm  font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password"
                                >
                                  {language?.bed} {language?.Length}({language?.incm})
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input
                                    type="text"
                                    className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    onChange={e => { onChange(e, BedData?.index, 'length'); setFlag(1) }}
                                  />
                                  <p className="text-sm text-red-700 font-light">
                                    {error?.[index]?.length}</p>
                                </div>
                              </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label className={`text-sm font-medium ${color?.text} block mb-2`}
                                  htmlFor="grid-password">
                                  {language?.bed} {language?.width}({language?.incm})
                                  <span style={{ color: "#ff0000" }}>*</span>
                                </label>
                                <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                                <div className={visible === 1 ? 'block' : 'hidden'}>
                                  <input
                                    type="text"
                                    className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                    onChange={e => { onChange(e, BedData?.index, 'width'); setFlag(1) }}
                                  />
                                  <p className="text-sm text-red-700 font-light">
                                    {error?.[index]?.width}</p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </>))}
                      <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
                        <div className={spinner === 0 ? 'block' : 'hidden'}>
                          {flag === 1 ?
                            <Button Primary={language?.Submit} onClick={() => {
                              validationBedData(BedData, setError, allRoomDes, setSpinner, currentProperty, setRoomId, submitBed, submitView, submitInventory, manageIdentifiers, setAllRoomDes, setDisp)
                            }} /> :
                            <Button Primary={language?.SubmitDisabled} />}
                        </div>
                        <div className={spinner === 1 ? 'block' : 'hidden'}>
                          <Button Primary={language?.Spinnersubmit} />
                        </div>


                      </div>

                    </div>
                  </div>
                </> : <>
                </>
              }
            </div>
          </div>}

          {/* Room Services */}
          {disp===2 && <div id='2' className='block'>
            <div className={`${color?.whitebackground} shadow rounded-lg mt-2 mx-1 px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
              <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                  <div className={`lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto ${color.widget}`}> {language?.room} {language?.description}</div>
                </div>

                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary"
                  >2</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>
                    {language?.room} {language?.services}</div>
                </div>

                <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">3</button>
                  <div className={`lg:w-32 font-medium ${color.crossbg} text-base lg:mt-3 ml-3 lg:mx-auto`}> {language?.room} {language?.gallery}</div>
                </div>
                <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                  <div className={`lg:w-32 font-medium ${color.crossbg} text-base lg:mt-3 ml-3 lg:mx-auto`}> {language?.room} {language?.rates}</div>
                </div>

              </div>
              <h6 className={`${color?.text} text-xl flex leading-none pl-6 pt-2 font-bold  mb-8`}>
                {language?.room} {language?.services}
              </h6>
              <div className="flex flex-col my-4 ">
                <div className="overflow-x-auto">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                      <table className="table-fixed min-w-full divide-y mx-8 divide-gray-200 ">
                        <thead className={`${color.greybackground}`}>
                          <tr >
                            <th
                              scope="col"
                              className={`${color.text} py-4 px-2 text-left text-xs font-semibold uppercase`}
                            >
                              {language?.service} {language?.name}
                            </th>
                            <th
                              scope="col"
                              className={`${color.text} py-4 px-6 text-left text-xs font-semibold uppercase`}
                            >
                              {language?.service} {language?.edit}
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`${color.text} divide-y divide-gray-200`}>
                          {services?.map((item, idx) => (
                            <tr className={`${color?.hover}`} key={idx}>
                              <td className="py-4 py-2 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                <span className={`${color.text} py-4 px-2 whitespace-nowrap text-base font-medium capitalize `}>
                                  {"  " +
                                    item?.service_name?.replace(/_+/g, " ")}
                                </span>
                              </td>

                              <td className={`${color.text} px-2 py-4 whitespace-nowrap text-base font-normal `}>
                                <div className="flex">
                                  <div className="form-check ml-4 form-check-inline">
                                    <label htmlFor={"default-toggle" + idx} className="inline-flex relative items-center cursor-pointer">
                                      {item?.service_value}
                                      <input type="checkbox" value={item?.service_value}
                                        onChange={() => {
                                          setServices(services?.map((i) => {

                                            if (i?.service_id === item?.service_id) {
                                              i.service_value = !i.service_value

                                            }
                                            return i
                                          }))
                                        }}
                                        id={"default-toggle" + idx} className="sr-only peer" />
                                      <div
                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                                 peer-checked:after:translate-x-full 
                                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                  after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-4 justify-end space-x-2 sm:space-x-3 ml-auto">
                <Button Primary={language?.Skip} onClick={() => { setDisp(3) }} />
                <div className={spinner === 0 ? 'block' : 'hidden'}>
                  <Button Primary={language?.Submit} onClick={() => { submitServices(setSpinner, services, roomId, setDisp) }} />
                </div>
                <div className={spinner === 1 ? 'block' : 'hidden'}>
                  <Button Primary={language?.Spinnersubmit} />
                </div>


              </div>
            </div>

          </div>}

          {/* Room Gallery */}
          {disp===3 && <div id='3' className='block'>
            <div className={`${color?.whitebackground} shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4`}>
              <div className="relative before:hidden  before:lg:block before:absolute before:w-[64%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 my-10 sm:px-20">
                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500  bg-slate-100  dark:bg-darkmode-400 dark:border-darkmode-400">1</button>
                  <div className={`lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto ${color.widget}`}> {language?.room} {language?.description}</div>
                </div>

                <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"
                  >2</button>
                  <div className={`${color.widget} lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto`}>
                    {language?.room} {language?.services}</div>
                </div>

                <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-white bg-cyan-600 btn-primary"
                  >3</button>
                  <div className={`lg:w-32 font-medium ${color.crossbg} text-base lg:mt-3 ml-3 lg:mx-auto`}> {language?.room} {language?.gallery}</div>
                </div>
                <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                  <button className="w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">4</button>
                  <div className={`lg:w-32 font-medium ${color.crossbg} text-base lg:mt-3 ml-3 lg:mx-auto`}> {language?.room} {language?.rates}</div>
                </div>

              </div>
              <div className="mx-4">
                <div className="sm:flex">
                  <h6 className={`${color?.text} text-base  flex leading-none  pt-2 font-semibold `}>
                    {language?.room}  {language?.gallery}
                  </h6>
                  <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <Button Primary={language?.Add} onClick={addPhotos} />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                  <div>
                    {imageData?.map((imageData, index) => (
                      <>
                        <button
                          className="float-right my-8 sm:inline-flex  text-gray-800 border focus:ring-4 focus:ring-cyan-200 font-semibold bg-gray-200
                                  rounded-lg text-sm px-1 py-1 text-center items-center mb-1 ml-16 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => removeImage(imageData?.index)}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                          </path></svg>
                        </button>
                        <div className="p-6 space-y-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                className={`text-sm  font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password"
                              >
                                {language?.imageupload}
                              </label>
                              <div className="flex">
                                <input
                                  type="file" name="myImage" accept="image/png, image/gif, image/jpeg, image/jpg"
                                  onChange={e => {
                                    onChangePhoto(e, imageData?.index, 'imageFile'); setFlag(1)
                                  }}
                                  className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                  defaultValue="" />

                              </div>
                              <div className="col-span-6 mt-2 sm:col-span-3">
                                <p className="text-sm text-red-700 font-light">
                                  {error?.[index]?.image_link}</p>
                                {spin === 0 ? (
                                  <Button
                                    Primary={language?.Upload}
                                    onClick={() => uploadImage(imageData?.index)}
                                  />
                                ) : (
                                  <Button Primary={language?.SpinnerUpload} />
                                )}
                              </div>
                            </div>
                            <div className="col-span-6 sm:col-span-3">

                              {/* displays image once it is loaded else demoImage */}
                              {imageData.image_link !== "" ?
                                <img className={`py-2 ${color?.text} `} src={imageData?.image_link} alt='Image Preview' style={{ height: "150px", width: "250px" }} /> :
                                <ImageDemo width={'250'} height={'150'} bgColor={'bg-gray-400'} />}

                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                className={`text-sm  font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password"
                              >
                                {language?.image} {language?.titl}
                              </label>
                              <input
                                type="text"
                                onChange={e => { onChangeImage(e, imageData?.index, 'image_title'); setFlag(1) }}
                                className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                              />
                              <p className="text-sm text-red-700 font-light">
                                {error?.[index]?.image_title}</p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                className={`text-sm  font-medium ${color?.text} block mb-2`}
                                htmlFor="grid-password"
                              >
                                {language?.image} {language?.description}
                              </label>
                              <textarea rows="2" columns="60"
                                onChange={e => { onChangeImage(e, imageData?.index, 'image_description'); setFlag(1) }}
                                className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                                defaultValue="" />
                              <p className="text-sm text-red-700 font-light">
                                {error?.[index]?.image_description}</p>

                            </div>
                          </div>
                        </div></>
                    ))}
                    <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                      <Button Primary={language?.Skip} onClick={() => { setDisp(4) }} />
                      <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                        <Button Primary={language?.Submit} onClick={submitRoomImages} />
                      </div>
                      <div className={spinner === 0 && flag === 0 ? 'block' : 'hidden'}>
                        <Button Primary={language?.SubmitDisabled} />
                      </div>
                      <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                        <Button Primary={language?.Spinnersubmit} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}

          {/* Room Rates */}
         {disp===4 &&<div id='4' className='block'>
            <AddNewRatesofRoom color={color} language={language} roomId={roomId}/>
          </div>} 
        

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

      <Footer color={color} Primary={english.Foot1} />

    </>
  )
}

export default Addroom
Addroom.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )


}

