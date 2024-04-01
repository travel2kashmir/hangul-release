import React, { useEffect, useState } from 'react';
import objChecker from "lodash"
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WidgetStatus from '../../../components/widgetStatus';
import Modal from '../../../components/ClassicTheme/Modals/Modal';
import Router from 'next/router'
import BreadCrumb from '../../../components/utils/BreadCrumb';
import GenericTable from '../../../components/utils/Tables/GenericTable';
import { RoomPlanAdd, RoomEdit, RoomDelete, RoomDescription, SingleBed, RoomService, AddImage, MultipleBeds, AddNewBed, RoomGalleryHead, RoomImage,navigationList } from '../../../components/rooms';
import {  validateRoomRates, validateEditGallery, validateSingleBedEdit} from '../../../components/validation/room';
import EditRoomImage from '../../../components/rooms/EditRoomImage';
import { CloseImageModal, EditImageButton, LeftArrowIcon, RightArrowIcon } from '../../../components/rooms/RoomGallery';
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



  const searchImage = (data) => {
    let match = roomimages.filter(
      (i) => i.image_title.includes(data) || i.image_description.includes(data)
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
            <RoomDescription color={color} spinner={spinner} setSpinner={setSpinner} lang={lang} language={language} roomDetails={roomDetails} allRoomDetails={allRoomDetails} setAllRoomDetails={setAllRoomDetails} setFlag={setFlag} visible={visible} error={error} setError={setError} initalIdentifiers={initalIdentifiers} setRoomIdentifiers={setRoomIdentifiers} roomIdentifiers={roomIdentifiers} flag={flag} finalView={finalView} setFinalView={setFinalView} currentroom={currentroom} fetchDetails={fetchDetails} setDisp={setDisp} />
          }


          {/* Multiple Bed */}
          {disp === 4 &&
            <MultipleBeds color={color} language={language} visible={visible} deleteBed={deleteBed} editBed={editBed} setView={setView} setGen={setGen} gen={gen} setDisp={setDisp} />}

          {/* Single Bed */}
          {disp === 5 &&
            <SingleBed color={color} language={language} bedDetails={bedDetails} setBedDetails={setBedDetails} error={error} setError={setError} visible={visible} flag={flag} setFlag={setFlag} spinner={spinner} disp={disp} setDisp={setDisp} setSpinner={setSpinner} fetchDetails={fetchDetails} setModified={setModified} />
          }

          {/* Room Services */}
          {disp === 1 && <RoomService color={color} language={language} services={services} setServices={setServices} spinner={spinner} setSpinner={setSpinner} setDisp={setDisp}
            roomDetails={roomDetails} currentroom={currentroom} />}

          {/* Room Gallery */}
          {disp === 2 &&
            <div id='2' className='block py-1'>
              <div className={`${color?.whitebackground} shadow rounded-lg sm:p-6 xl:p-8  2xl:col-span-2 my-3`}>
                <RoomGalleryHead color={color} language={language} searchImage={searchImage} showSearchedImages={showSearchedImages} setShowSearchedImages={setShowSearchedImages} allDelete={allDelete} setAddImage={setAddImage} check={check} />

                <div className="flex flex-wrap" >
                  {visible === 0 && <div className='py-1 w-auto h-auto m-6 flex'><Imageloader /> <Imageloader /><Imageloader /></div>}
                  {visible === 1 && <div className='py-1 flex flex-wrap'>
                    <div className="flex-wrap container grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {showSearchedImages !== 1 ? roomimages.map((item, idx) => {
                        return (
                          <RoomImage key={idx} check={check} handlecheckbox={handlecheckbox} item={item} setIndexImage={setIndexImage} setActionEnlargeImage={setActionEnlargeImage} setEnlargeImage={setEnlargeImage} />
                        )
                      }) : searchedImages.map((item, idx) => {
                        return (
                          <RoomImage key={idx} check={check} handlecheckbox={handlecheckbox} item={item} setIndexImage={setIndexImage} setActionEnlargeImage={setActionEnlargeImage} setEnlargeImage={setEnlargeImage} />
                        )
                      })}
                    </div>
                  </div>}

                </div>
                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto mt-8">
                  <Button Primary={language?.Previous} onClick={() => { setDisp(1) }} />
                  <Button Primary={language?.Next} onClick={() => { setDisp(3) }} />
                </div>
              </div>
            </div>}

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
            <LeftArrowIcon indexImage={indexImage} setIndexImage={setIndexImage} setActionEnlargeImage={setActionEnlargeImage} roomimages={roomimages} />
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className={` ${color.tableheader} rounded-lg shadow-sm relative`}>
                <div className="flex justify-between p-5 border-b rounded-t">
                  <h3 className={`text-xl ${color?.text} font-semibold`}>
                    {actionEnlargeImage?.image_title}
                  </h3>
                  <EditImageButton color={color} setEditImage={setEditImage} setActionImage={setActionImage} setUpdateImage={setUpdateImage} actionEnlargeImage={actionEnlargeImage} />
                  <CloseImageModal color={color} setEnlargeImage={setEnlargeImage} />
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
            <RightArrowIcon setActionEnlargeImage={setActionEnlargeImage} roomimages={roomimages} indexImage={indexImage} setIndexImage={setIndexImage} />
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

        {view === 1 && <Modal
          color={color}
          title={`${language?.add} ${language?.new} ${language?.bed}`}
          setShowModal={() => {
            document.getElementById('asform').reset();
            setView(0);
            setError({});
            setModified([])
          }}
          description={
            <AddNewBed color={color} language={language} modified={modified} setModified={setModified} error={error} setError={setError} flag={flag} spinner={spinner} setFlag={setFlag} currentroom={currentroom} fetchDetails={fetchDetails} setView={setView} setDisp={setDisp} />
          }
          showCloseButton={false} />
        }

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