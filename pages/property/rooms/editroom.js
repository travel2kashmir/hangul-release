import React, { useEffect, useState } from 'react';
import LoaderTable from '../../../components/loadertable';
import objChecker from "lodash"
import Table from '../../../components/Table';
import Multiselect from 'multiselect-react-dropdown';
import lang from '../../../components/GlobalData'
import axios from "axios";
import Button from '../../../components/Button';
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar'
import Header from '../../../components/Header'
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import Imageloader from '../../../components/loaders/imageloader';
import Lineloader from '../../../components/loaders/lineloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputText from '../../../components/utils/InputText';
import InputTextBox from '../../../components/utils/InputTextBox';
import DropDown from '../../../components/utils/DropDown';
import WidgetStatus from '../../../components/widgetStatus';
import Modal from '../../../components/ClassicTheme/Modals/Modal';
import ImageDemo from "../../../components/utils/ImageDemo"
import Router from 'next/router'
import BreadCrumb from '../../../components/utils/BreadCrumb';
import GenericTable from '../../../components/utils/Tables/GenericTable';
import { RoomPlanAdd, RoomEdit, RoomDelete, RoomDescription, SingleBed, RoomService, AddImage } from '../../../components/rooms';
import { validateBedAdd, validateRoomRates, validateEditGallery, validateSingleBedEdit, validateRoom } from '../../../components/validation/room';
import EditRoomImage from '../../../components/rooms/EditRoomImage';
let language;
let currentProperty;
let currentroom;
let room;
let check = [];
let resView = [];
let currency;
let currentLogged;
let i = 0;

function Room() {
  const [allCheck, setAllCheck] = useState(0)
  const [visible, setVisible] = useState(0)
  const [spinner, setSpinner] = useState(0)
  const [finalView, setFinalView] = useState([])
  const [color, setColor] = useState({})
  const [allRoomDetails, setAllRoomDetails] = useState([])
  const [modified, setModified] = useState([])
  const [flag, setFlag] = useState([])
  const [disp, setDisp] = useState(0);
  const [error, setError] = useState({});
  const [roomDetails, setRoomDetails] = useState([])
  const [bedDetails, setBedDetails] = useState([])
  const [allRoomRates, setAllRoomRates] = useState([])
  const [roomRates, setRoomRates] = useState([])
  const [roomimages, setRoomimages] = useState([])
  const [images, setImages] = useState([]);
  const [addImage, setAddImage] = useState(0)
  const [actionImage, setActionImage] = useState({})
  const [deleteImage, setdeleteImage] = useState(0)
  const [editImage, setEditImage] = useState(0);
  const [view, setView] = useState(0);
  const [image, setImage] = useState({})
  const [imageUploaded, setImageUploaded] = useState(false)
  const [services, setServices] = useState([])
  const [add, setAdd] = useState(0)
  const [gen, setGen] = useState([])
  const [selectedImage, setSelectedImage] = useState(false);
  const [indexImage, setIndexImage] = useState();

  const [enlargeImage, setEnlargeImage] = useState(0)
  const [enlargedImage, setEnlargedImage] = useState();
  const [mode, setMode] = useState()
  const [updateImage, setUpdateImage] = useState({});
  const [actionEnlargeImage, setActionEnlargeImage] = useState({})
  const [property_name, setProperty_name] = useState("")
  const [editRow, setEditRow] = useState({
    edit: 0,
    id: undefined
  })
  // function to search image
  const [searchedImages, setSearchedImages] = useState([{}]);
  const [showSearchedImages, setShowSearchedImages] = useState(0);
  const [del, setDel] = useState(0);
  const [id, setId] = useState(-1);
  const [initalIdentifiers, setInitalIdentifiers] = useState()
  const [roomIdentifiers, setRoomIdentifiers] = useState()
  const [roomRateEditModal, setRoomRateEditModal] = useState(0)
  const [editRate, setEditRate] = useState({})
  const [roomRateDeleteModal, setRoomRateDeleteModal] = useState(0)
  const [deleteRate, setDeleteRate] = useState({})
  const [addConditionalRate, setAddConditionalRate] = useState(0)
  const [presentPlans, setPresentPlans] = useState([])
  /** Use Effect to fetch details from the Local Storage **/
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    currentroom = localStorage.getItem('RoomId');
    setProperty_name(resp?.currentProperty?.property_name);
  }, [])

  /* Function to load Room Details when page loads */
  useEffect(() => {
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchImages();
      fetchDetails();
    }
  }, [])


  // Edit Validation Gallery
  const validationGalleryEdit = () => {
    setError({});
    var result = validateEditGallery(actionImage);
    if (result === true) {
      updateImageDetails();
    } else {
      setError(result);
    }
  };
  //handle check box images
  const handlecheckbox = (e) => {

    const { name, checked } = e.target;
    let tempCon = roomimages.map((item) =>
      item.image_id === name ? { ...item, isChecked: checked } : item
    );
    setRoomimages(tempCon);
    check = tempCon
      .filter((i) => i.isChecked === true)
      .map((j) => {
        return j.image_id;
      });

  };


  const clearSearchField = () => {
    document.getElementById("imageSearchBox").reset();
  };

  const searchImage = (data) => {
    let match = images.filter(
      (i) => i.image_title.match(data) || i.image_description.match(data)
    );

    setSearchedImages(match);

    setShowSearchedImages(1);
  };

  //generate json to be injected in room rate table component
  const filterRatesData = (data) => {
    let genData = [];
    data?.map((item) => {
      let temp = {
        // "checkbox": { operation: undefined },
        "Meal Name": item.meal_name,
        "Price": item.price,
        "Extra Adult Price": item?.extra_adult_price || 0,
        "Extra Child Price": item?.extra_child_price || 0,
        "id": item.room_rate_plan_id,
        "Tax": item.tax,
        "Other Charges": item.other_charges,

        Actions: [
          {
            type: "button",
            label: "Edit",
            operation: (e) => { setEditRate(item); setRoomRateEditModal(1) }
          },
          {
            type: "button",
            label: "Delete",
            operation: () => { setDeleteRate(item); setRoomRateDeleteModal(1); }
          }

        ],
      }
      genData.push(temp)
    })
    setRoomRates(genData)
  }

  const addRateButtonAction = () => {
    setAddConditionalRate(1)
  }
  // Fetch Room Details
  const fetchDetails = async () => {
    const url = `/api/${currentProperty.address_province.replace(/\s+/g, '-')}/${currentProperty.address_city}/${currentProperty.property_category}s/${currentProperty.property_id}/${currentroom}`
    axios.get(url)
      .then((response) => {
        setAllRoomDetails(response.data);
        setRoomDetails(response.data);
        if (response.data.room_refrences !== undefined) {
          let item = response.data.room_refrences.map(item => item.room_identifier)
          setInitalIdentifiers(item.toString())
        }

        if (response.data?.room_type == 'Single') {
          setBedDetails(response.data.beds?.[i])
        }
        if (response.data.room_facilities !== undefined) {
          setServices(response.data.room_facilities);
        }
        setVisible(1);
        setFinalView(response?.data?.views);
        filterRatesData(response?.data?.unconditional_rates);
        setRoomDetails(response.data);
        if (response.data.room_facilities == undefined) {
          fetchServices();
        }
        //list of room categories to be checked
        let room_categories = ['Semi_Double', 'King', 'Queen', 'Studio_Room', 'Double']
        if (room_categories.includes(response.data?.room_type)) {
          var genData = [];
          {
            response.data?.beds?.map((item) => {
              var temp = {
                name: item.bed_length,
                type: item.bed_width,
                id: item.bed_id
              }
              genData.push(temp)
            })
            setGen(genData);
          }
        }
        console.log("url  to fetch room hitted successfully");
        setPresentPlans(response.data?.unconditional_rates?.map((i) => i.meal_plan_id))
      })
      .catch((error) => { console.log("url to fetch room, failed"); });
  }

  // Room Services
  const fetchServices = async () => {
    const url = `/api/all_room_services`
    axios.get(url)
      .then((response) => {
        setServices(response.data);
        console.log("url  to fetch room services hitted successfully")
      })
      .catch((error) => { console.log("url to fetch room services, failed") });
  }

  // Room Images
  const fetchImages = async () => {
    const url = `/api/images/${currentProperty?.property_id}`
    axios.get(url)
      .then((response) => {
        const imgs = response.data.map((img, idx) => {
          return ({ ...img, idx })
        })

        setRoomimages(imgs);
        console.log("url  to fetch room images hitted successfully")
      })

      .catch((error) => { console.log("url to fetch room images, failed") });
  }

  // Room Types






  /*function for keyboard keys */
  function left(key) {
    if (document.getElementById("enlarge").className == "block py-1") {
      setActionEnlargeImage(roomimages?.filter((i, idx) => i.idx === indexImage - 1)
        .map((j) => {
          return {
            image_id: j?.image_id,
            image_title: j?.image_title,
            idx: indexImage - 1,
            image_description: j?.image_description,
            image_link: j?.image_link,
          };
        })?.[0]);
      setIndexImage(indexImage - 1);

      //functionality
    }
  }

  function right(key) {
    if (document.getElementById("enlarge").className == "block py-1") {
      console.log('right');
      setActionEnlargeImage(roomimages?.filter((i, idx) => i.idx === indexImage + 1)
        .map((j) => {
          return {
            image_id: j?.image_id,
            image_title: j?.image_title,
            idx: indexImage + 1,
            image_description: j?.image_description,
            image_link: j?.image_link,
          };
        })?.[0]);
      setIndexImage(indexImage + 1);

    }
  }

  //useEffect to catch key press
  useEffect(() => {
    document.onkeydown = checkKey;
    function checkKey(e) {
      e = e || window.event;
      console.log(e.key);
      if (e.keyCode == "37") {
        // left(e.key); // left arrow
      } else if (e.keyCode == "39") {
        // right(e.key); // right arrow
      }
    }
  }, []);




  /* Function for Update Room Rates*/
  const submitRoomRatesEdit = () => {
    if (allRoomRates.length !== 0) {
      const final_data = {
        "room_id": currentroom,
        "baserate_currency": allRoomRates?.currency,
        "baserate_amount": allRoomRates?.baserate_amount,
        "tax_currency": allRoomRates?.currency,
        "tax_amount": allRoomRates?.tax_amount,
        "otherfees_currency": allRoomRates?.currency,
        "otherfees_amount": allRoomRates?.otherfees_amount,
        "un_rate_id": roomDetails?.unconditional_rates?.[0]?.un_rate_id
      }
      setSpinner(1);

      //const method=final_data?.un_rate_id? `put`:`post`
      if (final_data.un_rate_id != undefined) {
        const url = '/api/unconditional_rates'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            setSpinner(0)
            toast.success("Room rates update Success.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setFlag([])
            fetchDetails();
            setError({});
            setAllRoomRates([]);
            Router.push("./editroom");


          })
          .catch((error) => {
            setSpinner(0);
            setError({});
            toast.error("Room rates update error.", {
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
        const url = '/api/room_unconditional_rates'
        axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            setSpinner(0)
            toast.success("Room rates update Success.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setFlag([])
            fetchDetails();
            setError({});
            setAllRoomRates([]);
            Router.push("./editroom");


          })
          .catch((error) => {
            setSpinner(0);
            setError({});
            toast.error("Room rates update error.", {
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

    }
  }



  /* Function to add bed */
  const addBed = () => {
    var result = validateBedAdd(modified);
    if (result === true) {
      const current = new Date();
      const currentDateTime = current.toISOString();
      const final_data = {
        "beds": [{
          "timestamp": currentDateTime,
          "room_id": currentroom,
          "length": modified.bed_length,
          "width": modified.bed_width,
          "unit": "cm"
        }]
      }
      const url = '/api/bed_details'
      axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {
          document.getElementById('asform').reset();
          toast.success("Bed add success.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          fetchDetails();
          Router.push("./editroom");
          setFlag([])
          setModified([])
          setView(0);
          setError({});
          setDisp(4)
        })
        .catch((error) => {
          toast.error("Bed Add Error! ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFlag([]);
          setError({});

        })
    }
    else {
      setError(result)
    }

  }

  /* Function to edit multiple beds */
  const editBed = (props, noChange) => {
    if (objChecker.isEqual(props, noChange)) {
      toast.warn('No change in  Bed detected. ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      var result = validateSingleBedEdit(props);
      if (result === true) {
        const current = new Date();
        const currentDateTime = current.toISOString();
        const final_data = {
          "beds": [{
            "bed_id": props.id,
            "length": props.name,
            "width": props?.type,
            "unit": "cm"
          }]
        }
        const url = '/api/bed_details'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            toast.success("Bed update success.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            fetchDetails();
            Router.push("./editroom");
            setModified([])
          })
          .catch((error) => {
            toast.error("Bed update error.", {
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
      }
      else {
        toast.warn(result?.name, {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.warn(result?.type, {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    }
  }
  /* function for multiple delete */
  const allDelete = async () => {
    // checked = images.filter(i => i.isChecked === true).map(j => { return (j.image_id) })
    console.log(JSON.stringify(check))
    setdeleteImage(1);
  };

  //delete multiple imges
  function deleteMultiple() {
    const data = check?.map((item) => {
      return { image_id: item, property_id: currentProperty?.property_id };
    });
    setSpinner(1);
    const imagedata = data;
    const finalImages = { images: imagedata };
    axios
      .post(`/api/deleteall/images`, finalImages, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        setSpinner(0);
        toast.success("API: Images delete success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchDetails();
        setdeleteImage(0);
      })
      .catch((error) => {
        setSpinner(0);
        toast.error("API:Images add error.", {
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


  // Delete Bed
  const deleteBed = (props) => {
    const url = `/api/bed_details/${props}`
    axios.delete(url).then((response) => {
      toast.success(("Bed deleted Successfully!"), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchDetails();
      Router.push('./editroom')
      setDisp(4)
    })
      .catch((error) => {
        toast.error(("Bed delete Error!"), {
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


  // Validate Rates
  const validationRates = () => {
    var result = validateRoomRates(allRoomRates)
    if (result === true) {
      submitRoomRatesEdit()
    }
    else {
      setError(result)
    }
  }

  function navigationList(currentLogged, currentProperty) {
    return ([
      {
        icon: "homeIcon",
        text: "Home",
        link: currentLogged?.id.match(/admin.[0-9]*/)
          ? "../../admin/adminlanding"
          : "../landing"
      },
      {
        icon: "rightArrowIcon",
        text: [currentProperty?.property_name],
        link: "../propertysummary"
      },
      {
        icon: "rightArrowIcon",
        text: "Rooms",
        link: "../rooms"
      },
      {
        icon: "rightArrowIcon",
        text: "Edit Room",
        link: ""
      }
    ])
  }

  return (
    <>
      <Title name={`Engage | Edit Room`} />
      <Header color={color} setColor={setColor} Primary={english?.Side1} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
      <Sidebar Primary={english?.Side1} Type={currentLogged?.user_type} color={color} />

      <div id="main-content"
        className={`${color?.greybackground} px-4 pt-24 relative overflow-y-auto lg:ml-64`}>

        {/* breadcrumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Room Forms Edit */}
        <div className=" pt-2">
          {/* Title */}
          <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2  font-bold`}>
            {language?.edit} {language?.room}
          </h6>

          {/* Room Description */}
          {disp === 0 &&
            <>
              <RoomDescription color={color} spinner={spinner} setSpinner={setSpinner} lang={lang} language={language} roomDetails={roomDetails} allRoomDetails={allRoomDetails} setAllRoomDetails={setAllRoomDetails} setFlag={setFlag} visible={visible} error={error} setError={setError} initalIdentifiers={initalIdentifiers} setRoomIdentifiers={setRoomIdentifiers} roomIdentifiers={roomIdentifiers} flag={flag} finalView={finalView} setFinalView={setFinalView} currentroom={currentroom} fetchDetails={fetchDetails} setDisp={setDisp} /></>
          }


          {/* Multiple Bed */}
          {disp === 4 &&
            <div id='4' className='block py-1'>
              <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
                <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]}
                  selected={1}
                  color={color} />
                <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                  {language?.room} {language?.description}
                </h6>
                <div className={visible === 0 ? 'block py-1' : 'hidden'}><LoaderTable /></div>
                <div className={visible === 1 ? 'block py-1' : 'hidden'}>
                  <Table gen={gen} setGen={setGen} add={() => setView(1)} name="Additional Services"
                    color={color}
                    mark="beds"
                    edit={editBed} delete={deleteBed}
                    common={language?.common} cols={language?.BedsCols} /> </div>

                <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
                  <Button Primary={language?.Previous} onClick={() => {
                    setDisp(0)
                  }} />
                  <Button Primary={language?.Next} onClick={() => {
                    setDisp(1)
                  }} />
                </div>
              </div>
            </div>}

          {/* Single Bed */}
          {disp === 5 &&
            <SingleBed color={color} language={language} bedDetails={bedDetails} setBedDetails={setBedDetails} error={error} setError={setError} visible={visible} flag={flag} setFlag={setFlag} spinner={spinner} disp={disp} setDisp={setDisp} setSpinner={setSpinner} fetchDetails={fetchDetails} setModified={setModified} />
          }

          {/* Room Services */}
          {disp === 1 && <RoomService color={color} language={language} services={services} setServices={setServices} spinner={spinner} setSpinner={setSpinner} setDisp={setDisp}
            roomDetails={roomDetails} currentroom={currentroom} />}

          {/* Room Gallery */}
          {disp === 2 ?
            <div id='2' className='block py-1'>
              <div className={`${color?.whitebackground} shadow rounded-lg sm:p-6 xl:p-8  2xl:col-span-2 my-3`}>

                <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={3} color={color} />
                <h6 className={`${color?.text} text-base  flex leading-none mb-2 mx-2 pt-2 font-semibold`}>
                  {language?.room}  {language?.gallery}
                </h6>
                <div className="sm:flex py-2 ">
                  <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 ml-5 sm:mb-0">
                    <form className="lg:pr-3" id="imageSearchBox">
                      <label htmlFor="users-search" className="sr-only">
                        {language?.search}
                      </label>
                      <div className="mt-1 relative lg:w-64 xl:w-96">
                        <input
                          type="text"
                          name="imageSearch"
                          onChange={(e) => searchImage(e.target.value)}
                          className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`}
                          placeholder={language?.searchforimages}
                        ></input>
                      </div>
                    </form>
                    {/*  icons to delete , clear , setting */}

                    <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                      {showSearchedImages === 1 ? (
                        <a
                          href="#"
                          onClick={() => {
                            setShowSearchedImages(0);
                            clearSearchField();
                          }}
                          className={`${color?.textgray}  hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            title="clear search"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-eraser-fill"
                            viewBox="0 0 16 16"
                          >
                            {" "}
                            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />{" "}
                          </svg>
                        </a>
                      ) : (
                        <></>
                      )}
                      <a
                        href="#"
                        className={`${color?.textgray}  hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                      <a
                        onClick={()=>check.length!=0?allDelete():toast.error('APP: No photo selected')}
                        className={
                          check?.length === 0 || undefined
                            ? `${color?.textgray} cursor-pointer p-1 ${color?.hover} rounded inline-flex
                                justify-center`
                            : `${color?.textgray} bg-red-600 cursor-pointer p-1 ${color?.hover} rounded inline-flex
                                justify-center`
                        }
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">

                    <Button Primary={language?.Add} onClick={() => setAddImage(1)} />

                  </div>
                </div>

                <div className="flex flex-wrap" >
                  <div className={visible === 0 ? 'block py-1 w-auto h-auto m-6 w-32 flex' : 'hidden'}><Imageloader /> <Imageloader /><Imageloader /></div>
                  <div className={visible === 1 ? 'block py-1 flex flex-wrap' : 'hidden'}>
                    <div className="flex-wrap container grid sm:grid-cols-2 lg:grid-cols-3 gap-4">



                      {roomimages.map((item, idx) => {
                        return (

                          <>
                            <div
                              className="block py-1 text-blueGray-600  text-xs font-bold "
                              key={idx}
                            >
                              <div
                                className="relative cursor-pointer"
                                tooltip
                                title="Click here to view or edit."
                              >
                                <a href="#" className="relative flex">
                                  <input
                                    type="checkbox"
                                    id={item?.image_id}
                                    tooltip
                                    title={`${JSON.stringify(item)}Click here to delete image ${item.image_title}.`}
                                    name={item?.image_id}
                                    checked={item?.isChecked || false}
                                    onClick={(e) => {
                                      handlecheckbox(e);
                                    }}
                                    className="bottom-0 right-0 cursor-pointer absolute bg-gray-30 opacity-30 m-1 border-gray-300 text-cyan-600  checked:opacity-100 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded-full"

                                  />

                                  {check?.length === 0 || check?.length === undefined ? (
                                    <img
                                      htmlFor={item?.image_id}
                                      className={`rounded-lg`}
                                      src={item.image_link}
                                      alt="Room Image"
                                      style={{ height: "170px", width: "450px" }}
                                      onClick={() => {
                                        setEnlargeImage(1);
                                        setActionEnlargeImage(item);
                                        setIndexImage(item?.idx);
                                      }}
                                    />
                                  ) : (
                                    <img
                                      htmlFor={item?.image_id}
                                      className={`rounded-lg`}
                                      src={item.image_link}
                                      alt="Room Image"
                                      style={{ height: "170px", width: "450px" }}
                                    />
                                  )}
                                </a>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto mt-8">
                  <Button Primary={language?.Previous} onClick={() => { setDisp(1) }} />
                  <Button Primary={language?.Next} onClick={() => { setDisp(3) }} />
                </div>
              </div>
            </div> : undefined}

          {/* Room Rates */}
          {disp === 3 &&
            <div id='3' className='block py-1'>
              <div className={`${color?.whitebackground} shadow rounded-lg  sm:p-6 xl:p-8  2xl:col-span-2`}>
                {/* widget progress starts */}
                <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`]} selected={4} color={color} />{/* widget progress ends */}

                <GenericTable
                  color={color}
                  language={language}
                  addButton={true}
                  addButtonAction={addRateButtonAction}
                  showOptions={false}
                  tableName={`Room Rates`}
                  cols={["Meal Name", "Price", "Tax", "Other Charges", "Extra Adult Price", "Extra Child Price", "Actions"]}
                  data={roomRates}
                />
              </div>
            </div>}


        </div>

        {/* New image enlarge */}
        {enlargeImage === 1 && <div id="enlarge" className={"block py-1"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl   sm:inset-0 bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="flex justify-start ml-2 mr-auto">
              {/* //Left arrow symbol*/}

              <svg
                className={indexImage <= 0 ? "hidden" : "block py-1 cursor-pointer"}
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 0 24 24"
                width="28px"
                onClick={() => {

                  setActionEnlargeImage(roomimages?.filter((i, idx) => idx === indexImage - 1)
                    .map((j) => {
                      return {
                        image_id: j?.image_id,
                        image_title: j?.image_title,
                        idx: indexImage - 1,
                        image_description: j?.image_description,
                        image_link: j?.image_link,
                      };
                    })?.[0]);
                  setIndexImage(indexImage - 1);

                }}
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
              </svg>


            </div>

            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={` ${color.tableheader} rounded-lg shadow-sm relative`}
              >
                <div className="flex justify-between p-5 border-b rounded-t">
                  <h3 className={`text-xl ${color?.text} font-semibold`}>
                    {actionEnlargeImage?.image_title}
                  </h3>
                  <button
                    onClick={() => {
                      setEditImage(1);
                      setActionImage(actionEnlargeImage);
                      setUpdateImage(actionEnlargeImage);
                    }}
                    className={` px-1 mr-1  hover:${color?.sidebar} ${color?.text}
                                         cursor-pointer ${color?.hover} rounded`}
                  >

                    <svg
                      className=" h-5  w-5 font-semibold "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"

                    >

                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      setEnlargeImage(0);
                    }}
                    className={`text-gray-400 bg-transparent  ${color.sidebar} hover:${color?.text} rounded-lg text-sm
                                     p-1.5 ml-auto inline-flex items-center`}
                    data-modal-toggle="user-modal"
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
                  </button>{" "}
                </div>
                <div>
                  <img
                    src={actionEnlargeImage?.image_link}
                    alt="pic_room"
                    style={{ height: "350px", width: "650px" }}
                  />
                </div>
              </div>
            </div>


            {/*Right  button to change next image in carousal*/}
            <div className="flex justify-end mr-2 ml-auto">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  indexImage <= 0 ? "hidden" : "block py-1 cursor-pointer"}

                onClick={() => {

                  setActionEnlargeImage(roomimages?.filter((i, idx) => idx === indexImage + 1)
                    .map((j) => {
                      return {
                        image_id: j?.image_id,
                        image_title: j?.image_title,
                        idx: indexImage + 1,
                        image_description: j?.image_description,
                        image_link: j?.image_link,
                      };
                    })?.[0]);
                  setIndexImage(indexImage + 1);

                }}
                enableBackground="new 0 0 24 24"
                height="32px"
                viewBox="0 0 24 24"
                width="28px"
                fill="#ffffff"
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                </g>
              </svg>
            </div>
          </div>
        </div>}

        {/* Modal Add Image */}
        {addImage === 1 &&
          <Modal
            color={color}
            title={`${language?.add} ${language?.new} ${language?.image}`}
            description={
              <AddImage color={color} language={language} error={error} setError={setError} image={image} setImage={setImage} actionImage={actionImage} setActionImage={setActionImage} spinner={spinner} setSpinner={setSpinner} flag={flag} setFlag={setFlag} imageUploaded={imageUploaded} setImageUploaded={setImageUploaded} setAddImage={setAddImage} currentProperty={currentProperty} currentroom={currentroom} fetchImages={fetchImages} />
            }
            setShowModal={() => { setAddImage(0); setActionImage({}); setError({}) }}
            showCloseButton={false} />
        }


        {/* Modal edit Image */}
        {editImage === 1 && <Modal
          color={color}
          title={`${language?.edit} ${language?.image}`}
          description={
            <EditRoomImage color={color} language={language} actionImage={actionImage} setActionImage={setActionImage} fetchImages={fetchImages} flag={flag} setFlag={setFlag} spinner={spinner} setSpinner={setSpinner} error={error} setError={setError} addImage={addImage} setEditImage={setEditImage} fetchDetails={fetchDetails} setAllRoomDetails={setAllRoomDetails} />
          }
          setShowModal={() => { setEditImage(0); setError({}); }}
          showCloseButton={false} />}


        {/* Modal Delete */}
        {deleteImage === 1 &&
          <Modal
            color={color}
            description={
              <div className={`${color?.whitebackground}  rounded-lg  relative`}>

                <div className="p-6 pt-0 text-center">
                  <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className={`text-xl font-normal ${color.deltext} mt-5 mb-6`}>
                    {language?.areyousureyouwanttodelete}
                  </h3>

                  {spinner === 0 ?
                    <>
                      <Button Primary={language?.Delete} onClick={() => deleteMultiple()} />
                      <Button Primary={language?.Cancel} onClick={() => setdeleteImage(0)} />
                    </>
                    :
                    <Button Primary={language?.SpinnerDelete} />}
                </div>
              </div>

            }
            setShowModal={() => setdeleteImage(0)}
            showCloseButton={false} />
        }

        {/* Modal Add Bed */}
        <div className={view === 1 ? 'block py-1' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <form id='asform'>
                <div className={`${color?.whitebackground} rounded-lg shadow-sm relative`}>
                  <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className={`${color?.text} text-xl font-semibold`}>
                      {language?.add} {language?.new} {language?.bed}
                    </h3>
                    <button type="button" onClick={() => {
                      document.getElementById('asform').reset();
                      setView(0);
                      setError({});
                      setModified([])
                    }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-user-modal">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className={`text-sm ${color?.text} font-medium  block py-1 mb-2`}>{language?.bed} {language?.length}({language?.incm})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input type="text" name="first-name"
                          onChange={(e) => { setModified({ ...modified, bed_length: e.target.value }, setFlag(1)) }}
                          id="first-name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                              focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`} required />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.bed_length}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className={`text-sm ${color?.text} font-medium  block py-1 mb-2`}>{language?.bed} {language?.width}({language?.incm})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input type="text" name="first-name"
                          onChange={(e) => { setModified({ ...modified, bed_width: e.target.value }, setFlag(1)) }}
                          id="first-name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                focus:ring-cyan-600 focus:border-cyan-600 block py-1 w-full p-2.5`} required />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.bed_width}</p>
                      </div>
                    </div>
                  </div>

                  <div className="items-center p-6 border-t border-gray-200 rounded-b">

                    <div className={(spinner === 0 && flag !== 1) ? 'block py-1' : 'hidden'}>
                      <Button Primary={language?.AddDisabled} />
                    </div>
                    <div className={(spinner === 0 && flag === 1) ? 'block py-1' : 'hidden'}>
                      <Button Primary={language?.Add} onClick={() => { addBed() }} />
                    </div>
                    <div className={spinner === 1 ? 'block py-1' : 'hidden'}>
                      <Button Primary={language?.SpinnerAdd} />
                    </div>



                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal add rate plans */}
        {addConditionalRate === 1 &&
          <Modal
            color={color}
            title={'Add Meal Rate Plan'}
            description={
              <RoomPlanAdd color={color} language={language}
                fetchDetails={fetchDetails}
                setRoomRateEditModal={setAddConditionalRate}
                currentroom={currentroom}
                presentPlans={presentPlans} />
            }
            setShowModal={setAddConditionalRate}
            showCloseButton={false} />
        }

        {/* Modal edit rate plans */}
        {roomRateEditModal === 1 &&
          <Modal
            color={color}
            title={'Edit Rate'}
            description={
              <RoomEdit color={color} language={language} roomData={editRate} fetchDetails={fetchDetails} setRoomRateEditModal={setRoomRateEditModal} />
            }
            setShowModal={setRoomRateEditModal}
            showCloseButton={false} />
        }

        {/* Modal delete rate plans */}
        {roomRateDeleteModal === 1 &&
          <Modal
            title={'Delete Rate'}
            color={color}
            description={
              <RoomDelete color={color} language={language} roomData={deleteRate} fetchDetails={fetchDetails} setShowModal={setRoomRateDeleteModal} />
            }
            setShowModal={setRoomRateDeleteModal}
            showCloseButton={false} />
        }

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
      <Footer Primary={english?.Side1} color={color} />
    </>
  )
}

export default Room
Room.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}