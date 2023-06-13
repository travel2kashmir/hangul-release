import React, { useEffect, useState } from 'react';
import validateBedData from '../../../components/validation/room/roombedadd';
import validateRoom from '../../../components/validation/room/roomdescriptionadd';
import validateSingleBedEdit from '../../../components/validation/room/roomsinglebededit';
import colorFile from '../../../components/colors/Color';
import validateEditGallery from '../../../components/validation/room/roomgalleryedit';
import validateRoomRates from '../../../components/validation/room/roomratesadd';
import validateBedAdd from '../../../components/validation/room/roomsinglebedadd';
import LoaderTable from '../../../components/loadertable';
import objChecker from "lodash"
import Table from '../../../components/Table';
import Multiselect from 'multiselect-react-dropdown';
import lang from '../../../components/GlobalData'
import axios from "axios";
import Link from "next/link";
import Button from '../../../components/Button';
import Footer from "../../../components/Footer";
import Sidebar from '../../../components/Sidebar'
import Header from '../../../components/Header'
import { InitialActions, ColorToggler } from '../../../components/initalActions';
import Title from '../../../components/title';
import { english, french, arabic } from "../../../components/Languages/Languages"
import Headloader from '../../../components/loaders/headloader';
import Imageloader from '../../../components/loaders/imageloader';
import Lineloader from '../../../components/loaders/lineloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputText from '../../../components/utils/InputText';
import InputTextBox from '../../../components/utils/InputTextBox';
import DropDown from '../../../components/utils/DropDown';
import WidgetStatus from '../../../components/widgetStatus';
import roomDiscountValidation from '../../../components/validation/room/roomDiscountValidation';
import roomRateModificationValidation from '../../../components/validation/room/roomRateModificationValidation';
import searchFunction from '../../../components/searchFunction';
var language;
var currentProperty;
var currentroom;
var room;
var viewsData;
let check = [];
let checkDiscount = [];
let checkModification = [];
var resView = [];
var currency;
import Router from 'next/router'
const logger = require("../../../services/logger");
var currentLogged;
var i = 0;
let colorToggle;



function Room() {
  const [allCheck, setAllCheck] = useState(0)
  const [visible, setVisible] = useState(0)
  const [spinner, setSpinner] = useState(0)
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [color, setColor] = useState({})
  const [allRoomDetails, setAllRoomDetails] = useState([])
  const [modified, setModified] = useState([])
  const [flag, setFlag] = useState([])
  const [disp, setDisp] = useState(0);
  const [error, setError] = useState({});
  const [finalView, setFinalView] = useState([])
  const [roomDetails, setRoomDetails] = useState([])
  const [bedDetails, setBedDetails] = useState([])
  const [allRoomRates, setAllRoomRates] = useState([])
  const [roomRates, setRoomRates] = useState([])
  const [roomimages, setRoomimages] = useState([])
  const [images, setImages] = useState([]);
  const [addImage, setAddImage] = useState(0)
  const [roomtypes, setRoomtypes] = useState([])
  const [actionImage, setActionImage] = useState({})
  const [deleteImage, setdeleteImage] = useState(0)
  const [editImage, setEditImage] = useState(0);
  const [view, setView] = useState(0);
  const [roomView, setRoomView] = useState([]);
  const [image, setImage] = useState({})
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
  const [discount, setDiscount] = useState([])
  const [rateModification, setRateModification] = useState([])
  const [editRow, setEditRow] = useState({
    edit: 0,
    id: undefined
  })
  // function to search image
  const [searchedImages, setSearchedImages] = useState([{}]);
  const [showSearchedImages, setShowSearchedImages] = useState(0);
  const [del, setDel] = useState(0);
  const [id, setId] = useState(-1);
  const [editedDiscount, setEditedDiscount] = useState({})
  const [editedModifications, setEditedModifications] = useState({})
  const [selectAllDiscounts, setSelectAllDiscounts] = useState(0)
  const [selectAllModifications, setSelectAllModifications] = useState(0)
  /* Function Multiple Delete*/
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
        fetchHotelDetails();
        Router.push("./gallery");
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

  // Edit Validation Gallery
  const validationGalleryEdit = () => {
    setError({});
    var result = validateEditGallery(actionImage);
    console.log("Result" + JSON.stringify(result));
    if (result === true) {
      updateImageDetails();
    } else {
      setError(result);
    }
  };
  //handle check box images
  const handlecheckbox = (e) => {
    console.log(images.length);
    const { name, checked } = e.target;

    let tempCon = images.map((item) =>
      item.image_id === name ? { ...item, isChecked: checked } : item
    );
    setImages(tempCon);
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

  /** Use Effect to fetch details from the Local Storage **/
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    currentroom = localStorage.getItem('RoomId');
    setProperty_name(resp?.currentProperty?.property_name);
    colorToggle = resp?.colorToggle

  }, [])

  /* Function to load Room Details when page loads */
  useEffect(() => {
    if (JSON.stringify(currentLogged) === 'null') {
      Router.push(window.location.origin)
    }
    else {
      fetchRoomtypes();
      fetchImages();
      fetchDetails();
    }
  }, [])
  // Fetch Room Details
  const fetchDetails = async () => {
    const url = `/api/${currentProperty.address_province.replace(/\s+/g, '-')}/${currentProperty.address_city}/${currentProperty.property_category}s/${currentProperty.property_id}/${currentroom}`
    axios.get(url)
      .then((response) => {
        setAllRoomDetails(response.data);
        setRoomDetails(response.data);
        setFinalView(response?.data?.views);
        setDiscount(response?.data?.discounts.map(i => ({ ...i, "isChecked": false }))) //added checked as undefined 
        setRateModification(response?.data?.room_rate_modifications.map(i => ({ ...i, "isChecked": false })))  //added checked as undefined 
        if (response.data?.room_type == 'Single') {
          setBedDetails(response.data.beds?.[i])
        }
        filterCurrency(response.data?.unconditional_rates?.[i]);
        if (response.data.room_facilities !== undefined) {
          setServices(response.data.room_facilities);
        }

        setRoomDetails(response.data);
        if (response.data.room_facilities == undefined) {
          fetchServices();
        }

        if (response.data?.room_type == 'Semi_Double' || 'King' || 'Queen' || 'Studio_Room' || 'Double') {
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
            setGen(genData);;
          }
        }
        logger.info("url  to fetch room hitted successfully");
        setVisible(1)
      })
      .catch((error) => { logger.error("url to fetch room, failed"); });
  }

  const filterCurrency = (props) => {
    if (props != undefined) {
      currency = lang?.CurrencyData.filter(el => {
        return props.baserate_currency.toUpperCase() === el.currency_code;
      });
      const rate = {
        "currency": currency?.[i]?.currency_name,
        "baserate_amount": props.baserate_amount,
        "tax_amount": props.tax_amount,
        "otherfees_amount": props.otherfees_amount,
        "room_id": props.room_id,
        "un_rate_id": props.un_rate_id
      }
      //setAllRoomRates({ props., currency: currency?.[i]?.currency_name })
      setAllRoomRates(rate)

    }
  }

  // Room Services
  const fetchServices = async () => {
    const url = `/api/all_room_services`
    axios.get(url)
      .then((response) => {
        setServices(response.data);
        logger.info("url  to fetch roomtypes hitted successfully")
      })
      .catch((error) => { logger.error("url to fetch roomtypes, failed") });
  }


  // Room Images
  const fetchImages = async () => {
    const url = `/api/images/${currentProperty?.property_id}`
    console.log("url " + url)
    axios.get(url)
      .then((response) => {
        const imgs = response.data.map((img, idx) => {
          return ({ ...img, idx })
        })

        setRoomimages(imgs);
        logger.info("url  to fetch room images hitted successfully")
      })

      .catch((error) => { logger.error("url to fetch room images, failed") });
  }

  // Room Types
  const fetchRoomtypes = async () => {
    const url = `/api/room-types`
    console.log("url " + url)
    axios.get(url)
      .then((response) => {
        setRoomtypes(response.data);
        logger.info("url  to fetch room types hitted successfully")
      })
      .catch((error) => { logger.error("url to fetch roomtypes, failed") });
  }


  const onChangePhoto = (e, i) => {
    setImage({ ...image, imageFile: e.target.files[0] })
  }

  /* Function to upload image */
  const uploadImage = () => {
    const imageDetails = image.imageFile
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir")

    axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
      .then(response => {
        setActionImage({ ...actionImage, image_link: response?.data?.secure_url })
      })
      .catch(error => {
        toast.error("App: Image upload error.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('There was an error.', error);

      });

  }

  // Views
  const views = (viewData) => {
    setFinalView([]);
    var final_view_data = []
    viewData.map(item => {
      var temp = {
        view: item?.view
      }
      final_view_data.push(temp)
    });
    setFinalView(final_view_data);
    setRoomView(1)
  }

  /* Function for Edit Room Images*/
  const updateImageDetails = () => {
    console.log("Room Details:" + JSON.stringify(allRoomDetails));
    const final_data = {
      "image_id": actionImage?.image_id,
      "image_title": actionImage.image_title,
      "image_description": actionImage.image_description,
      "image_type": "room"
    }
    console.log("Final Data" + JSON.stringify(final_data))
    setSpinner(1)
    const url = '/api/images'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        setEditImage(0);
        setSpinner(0)
        toast.success("App: Room image details update success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchDetails();
        setActionImage([]);
        setError({});
        setAllRoomDetails([]);
        setFlag([])
      })
      .catch((error) => {
        setSpinner(0);
        setError({});
        toast.error("App: Room gallery update error.", {
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

  /* Function for Delete Room Images*/
  const submitDelete = () => {
    setSpinner(1)
    const url = `/api/${actionImage.image_id}`
    axios.delete(url).then
      ((response) => {
        setSpinner(0)
        setdeleteImage(0)
        toast.success("App: Image deleted success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchImages();
        fetchDetails();
        Router.push("./editroom");
      })
      .catch((error) => {
        setSpinner(0)
        toast.error("App: Image delete error.", {
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

  /*function for keyboard keys */
  function left(key) {
    if (document.getElementById("enlarge").className == "block") {
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
    if (document.getElementById("enlarge").className == "block") {
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

/* Function to add images*/
  const submitAddImage = () => {
    if (actionImage.length !== 0) {
      const imagedata = [{
        property_id: currentProperty?.property_id,
        image_link: actionImage?.image_link,
        image_title: actionImage?.image_title,
        image_description: actionImage?.image_description,
        image_category: "room",
        room_id: currentroom
      }]
      const finalImage = { "images": imagedata }
      setSpinner(1);
      axios.post(`/api/gallery`, finalImage)
        .then(response => {
          setSpinner(0)
          toast.success("App: Image added success.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setActionImage([])
          setError({});
          setFlag([])
          // submitImageLink(response?.data?.image_id);
        })
        .catch(error => {
          setSpinner(0);
          setError({})
          toast.error("App: Gallery error.", {
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
  }
  /* Function for Update Room Description*/
  const submitRoomDescriptionEdit = () => {
    if (allRoomDetails.length !== 0) {
      const final_data = {
        "room_id": currentroom,
        "room_name": allRoomDetails.room_name,
        "room_type_id": allRoomDetails.room_type_id,
        "room_description": allRoomDetails.room_description,
        "is_room": allRoomDetails.is_room,
        "is_room_sharing": allRoomDetails.is_room_sharing,
        "room_style": allRoomDetails.room_style,
        "room_capacity": allRoomDetails.room_capacity,
        "maximum_number_of_occupants": allRoomDetails.maximum_number_of_occupants,
        "minimum_number_of_occupants": allRoomDetails.minimum_number_of_occupants,
        "minimum_age_of_occupants": allRoomDetails.minimum_age_of_occupants,
        "room_length": allRoomDetails.room_length,
        "room_width": allRoomDetails.room_width,
        "room_height": allRoomDetails.room_height
      }
      setSpinner(1);
      const url = '/api/room'
      axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {
          setSpinner(0);
          toast.success("Room details update success.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchDetails();
          setError({});
          setFlag([]);
          setAllRoomDetails([])
        })
        .catch((error) => {
          setSpinner(0);
          setError({});
          toast.error("Room details update error. ", {
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

  /*Function to add room service*/
  const submitServices = () => {
    services.map(
      (i) => (i.room_id = currentroom, i.status = i.service_value)
    )
    services.map(
      (i) => {
        if (JSON.stringify(i.service_value) !== "true") {
          return (

            i.service_value = false,
            i.status = false
          )
        }
      }
    )
    var total = { "room_services": services }
    const url = '/api/room_facilities'
    axios.post(url, total, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("Room services added success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDisp(2);
      })
      .catch((error) => {
        toast.error("Room services add error.", {
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

  /*Function to edit room service*/
  const editServices = () => {
    services.map(
      (i) => (i.room_id = currentroom, i.status = i.service_value)
    )
    services.map(
      (i) => {
        if (JSON.stringify(i.service_value) !== "true") {
          return (

            i.service_value = false,
            i.status = false
          )
        }
      }
    )
    setSpinner(1)
    var total = { "room_services": services }
    const url = '/api/room_facilities'
    axios.put(url, total, { header: { "content-type": "application/json" } }).then
      ((response) => {
        setSpinner(0)
        toast.success("Room services update successfully.", {
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
        setSpinner(0)
        toast.error("Room Services update error. ", {
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
  const submitView = () => {
    const data = finalView?.map((i => {
      return {
        "room_id": currentroom,
        "view": i?.view
      }
    }))
    setSpinner(1);
    const final_data = { "room_views": data }
    const url = '/api/room_views'
    axios.post(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        setSpinner(0);
        toast.success("View add success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFlag([])
        setRoomView([]);
        setError({});
      })
      .catch((error) => {
        setSpinner(0);
        toast.error("View add error.", {
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
    // alert(checked?.length)
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
        fetchHotelDetails();
        Router.push("./gallery");
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


  /* Function to edit single bed */
  const submitBedUpdate = () => {
    const current = new Date();
    const currentDateTime = current.toISOString();
    const final_data = {
      "beds": [{
        "bed_id": roomDetails?.beds?.[i]?.bed_id,
        "length": roomDetails?.bed_length,
        "width": roomDetails?.bed_width,
        "unit": "cm"
      }]
    }
    setSpinner(1);
    const url = '/api/bed_details'
    axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
      ((response) => {
        toast.success("App: Bed update success.", {
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
        setError({});
        setModified([]);
        setSpinner(0);
        setFlag([])
      })
      .catch((error) => {
        toast.error("App: Bed update error!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSpinner(0);
        setFlag([])
      })

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

  // Validation Functions

  // Validate Room Description
  const validationRoomDescription = () => {
    var result = validateRoom(allRoomDetails, finalView)
    if (result === true) {
      if (flag === 1) {
        submitRoomDescriptionEdit();
      }
      if (roomView === 1) {
        submitView();
      }
    }
    else {
      setError(result)
    }
  }


  // Validate Beds Data
  const validationBedData = () => {
    var result = validateBedAdd(bedDetails)
    console.log("Result" + JSON.stringify(result))
    if (result === true) {
      submitBedUpdate();
    }
    else {
      setError(result)
    }
  }


  // Validate Image
  const validationImage = () => {
    var result = validateEditGallery(actionImage)
    if (result === true) {
      if (addImage === 1) {
        submitAddImage();
      }
      if (addImage === 0) {
        updateImageDetails();
      }
    }
    else {
      setError(result)
    }
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
  // update discount function 
  const updateDiscount = () => {
    let val = roomDiscountValidation([editedDiscount])
    if (val === true) {
      // url to be hit
      const url = `/api/room_discount`;
      // data formated as per api requirement 
      let data = { "room_discounts": [editedDiscount] }
      // network call to edit data
      axios.put(url, data, {
        header: { "content-type": "application/json" },
      }).then((response) => {
        // this block will execute on sucessfull completiion of network call 
        setSpinner(0);
        toast.success("API: Room Discount Updated Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // to check if the discounts are more than one 
        if (discount.length > 1) {
          // filter out unedited discounts 
          let uneditedDiscount = discount.filter(item => item.discount_id != editedDiscount.discount_id);
          // save all discounts to state 
          setDiscount([...uneditedDiscount, editedDiscount])
        }
        else {
          setDiscount([editedDiscount])
        }
        // set edit back to initial values 
        setEditRow({ edit: 0, id: undefined })
      }).catch((error) => {
        setSpinner(0);
        toast.error("API: Room Discount Update Error!", {
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
      //find errors for the value being edited
      let errors = Object.values(val[0]);
      // for every error we print toast 
      errors.map((res) => {
        return (
          toast.error(`${res}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )
      })
    }
  }

  // update discount function 
  const updateModification = () => {
    let result = roomRateModificationValidation([editedModifications])
    if (result === true) {
      // url to be hit
      const url = `/api/room_rate_modification`;
      // data formated as per api requirement 
     
      let data = { "room_rate_modification": [editedModifications] }
      // network call to edit data
      axios.put(url, data, {
        header: { "content-type": "application/json" },
      }).then((response) => {
        // this block will execute on sucessfull completiion of network call 
        setSpinner(0);
        toast.success("API: Room Rate Modification Updated Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // to check if the discounts are more than one 
        if (rateModification.length > 1) {
          // filter out unedited discounts 
          let uneditedModifications = rateModification.filter(item => item.modification_id != editedModifications.modification_id);
          // save all discounts to state 
          setRateModification([...uneditedModifications, editedModifications])
        }
        else {
          setRateModification([editedModifications])
        }
        // set edit back to initial values 
        setEditRow({ edit: 0, id: undefined })
      }).catch((error) => {
        setSpinner(0);
        toast.error("API: Room Discount Update Error!", {
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
      //find errors for the value being edited
      let errors = Object.values(result[0]);
      // for every error we print toast 
      errors.map((res) => {
        return (
          toast.error(`${res}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )
      })
    }
  }

  // delete modifications
  function deleteModification(mod) {
    const url = `/api/room_modification/${mod?.modification_id}`;
    axios.delete(url).then((response) => {
      toast.success("API:Modification delete success.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let undeleted = rateModification.filter((m) => m.modification_id != mod?.modification_id);
      setRateModification(undeleted)
    }).catch((error) => {
      toast.error("API: Modification delete error.", {
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
  // delete discount
  function deleteDiscount(dis) {
    const url = `/api/room_discount/${dis.discount_id}`;
    axios.delete(url).then((response) => {
      toast.success("API:Discount delete success.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let undeleted = discount.filter((m) => m.discount_id != dis.discount_id);
      setDiscount(undeleted)
    }).catch((error) => {
      toast.error("API: Discount delete error.", {
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
  // function to handle check box of discount 
  function handleCheckboxDiscount(e, item) {
    const { name, checked } = e.target;
    let tempattr;
    if (item.isChecked === false) {
      tempattr = discount.map((item) =>
        item.discount_id === name ? { ...item, isChecked: 'checked' } : item
      );
    }

    else {
      tempattr = discount.map((item) =>
        item.discount_id === name ? { ...item, isChecked: false } : item
      );
    }
    setDiscount(tempattr);

    checkDiscount = tempattr
      .filter((i) => i.isChecked === 'checked')
      .map((j) => {
        return j.discount_id;
      });

  }
  // function to handle check box of modification 
  function handleCheckboxModification(e, item) {
    const { name, checked } = e.target;
    let tempattr;
    if (item.isChecked === false) {
      tempattr = rateModification.map((item) =>
        item.modification_id === name ? { ...item, isChecked: 'checked' } : item
      );
    }

    else {
      tempattr = rateModification.map((item) =>
        item.modification_id === name ? { ...item, isChecked: false } : item
      );
    }
    setRateModification(tempattr);

    checkModification = tempattr
      .filter((i) => i.isChecked === 'checked')
      .map((j) => {
        return j.modification_id;
      });

  }

  //delete selected discounts
  function deleteMultipleDiscount() {
    if (checkDiscount.length > 0) {
      const tempData = checkDiscount.map((item) => ({ "discount_id": item }))
      const data = { "room_discount": tempData };
      const url = `/api/deleteall/room_discount`
      axios.post(url, data, {
        headers: {
          "content-type": "application/json"
        }
      }).then((resp) => {
        toast.success("Selected Discounts Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let undeleted = discount.filter((dis) => dis?.isChecked != 'checked');
        setDiscount(undeleted);
      }).catch((err) => {
        toast.error("Selected Discounts Deleting Failed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    } else {
      toast.warn("No Discounts Selected", {
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
  //delete selected modification
  function deleteMultipleModifications() {
    if (checkModification.length > 0) {
      const tempData = checkModification.map((item) => ({ "modification_id": item }))
      alert(JSON.stringify(tempData))
      const data = { "room_rate_modifications": tempData };
      const url = `/api/deleteall/room_rate_modifications`
      axios.post(url, data, {
        headers: {
          "content-type": "application/json"
        }
      }).then((resp) => {
        toast.success("Selected Modificstions Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let undeleted = rateModification.filter((mod) => mod?.isChecked != 'checked');
        setRateModification(undeleted);
      }).catch((err) => {
        toast.error("Selected Modification Deleting Failed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    } else {
      toast.warn("No Modifications Selected", {
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

  //set all discounts
  function setAllDiscount() {
    if (selectAllDiscounts === 0) {
      let checkedDiscounts = discount.map(dis => ({ ...dis, isChecked: 'checked' }));
      setDiscount(checkedDiscounts);
      checkedDiscounts.map((dis) => checkDiscount.push(dis?.discount_id))
    }
    else {
      let checkedDiscounts = discount.map(dis => ({ ...dis, isChecked: false }));
      setDiscount(checkedDiscounts);
      checkDiscount = [];
    }
    setSelectAllDiscounts(selectAllDiscounts === 0 ? 1 : 0)

  }
  //set all modification
  function setAllModification() {
    if (selectAllModifications === 0) {
      let checkedModifications = rateModification.map(mod => ({ ...mod, isChecked: 'checked' }));
      setRateModification(checkedModifications);
      checkModification.map((mod) => checkedModifications.push(mod?.modification_id));
    }
    else {
      let checkedModifications = rateModification.map(mod => ({ ...mod, isChecked: false }));
     setRateModification(checkedModifications);
      checkDiscount = [];
    }
    setSelectAllModifications(selectAllModifications === 0 ? 1 : 0)
  }
  //to set table header check box of modifications
  useEffect(()=>{
    function settingAll(){
      if(rateModification.length!=0)
      setSelectAllModifications(checkModification.length===rateModification.length?1:0)
    }
    settingAll();
  },[checkModification])

  //to set table header check box of discount
  useEffect(()=>{
    function settingAll(){
      if(discount.length!=0)
      setSelectAllDiscounts(checkDiscount.length===discount.length?1:0)
    }
    settingAll();
  },[checkDiscount])
  return (
    <>
      <Title name={`Engage | Edit Room`} />
      <Header color={color} setColor={setColor} Primary={english?.Side1} Type={currentLogged?.user_type} Sec={ColorToggler} mode={mode} setMode={setMode} />
      <Sidebar Primary={english?.Side1} Type={currentLogged?.user_type} color={color} />

      <div id="main-content"
        className={`${color?.greybackground} px-4 pt-24 relative overflow-y-auto lg:ml-64`}>

        {/* Header */}
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../../admin/AdminLanding" : "../landing"}
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}

                  </a>
                </Link></div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.text} text-base capitalize font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../propertysummary" className={`text-gray-700 text-sm ml-1 md:ml-2  font-medium hover:${color?.text} `}>
                    <a>{property_name}</a>
                  </Link>
                  </div></div>

              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="../rooms" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                    <a>{language?.rooms}</a>
                  </Link>
                  </div></div>

              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.edit} {language?.room}</span>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        {/* Room Forms Edit */}
        <div className=" pt-2">
          {/* Title */}
          <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6 pb-2  font-bold`}>
            {language?.edit} {language?.room}
          </h6>

          {/* Room Description */}
          <div id='0' className={disp === 0 ? 'block' : 'hidden'}>

            <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
              {/* progress bar starts */}
              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={1} color={color} />
              {/* Progress bar ends */}
              <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                {language?.room} {language?.description}
              </h6>
              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                  <div className="flex flex-wrap">
                    {/* room name */}
                    <InputText
                      label={`${language?.room} ${language?.name}`}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_name}
                      onChangeAction={(e) => {
                        setAllRoomDetails({
                          ...allRoomDetails, room_name: e.target.value,
                        });
                        setFlag(1);
                      }
                      }
                      error={error?.room_name}
                      color={color}
                      req={true}
                      tooltip={true}
                    />

                    {/* room type */}
                    <DropDown
                      label={`${language?.room} ${language?.type}`}
                      visible={visible}
                      defaultValue={roomDetails?.room_type}
                      onChangeAction={(e) =>
                        setAllRoomDetails(
                          { ...allRoomDetails, room_type_id: e.target.value },
                          setFlag(1)
                        )
                      }
                      error={error?.propertycategory}
                      color={color}
                      req={true}
                      options={[
                        { value: "king", label: "King" },
                        { value: "queen", label: "Queen" },
                        { value: "single", label: "Single" },
                        { value: "double", label: "Double" },
                        { value: "semi_double", label: "Semi Double" },
                        { value: "studio_room", label: "Studio Room" },
                      ]}
                    />

                    {/* room description */}
                    <InputText
                      label={`${language?.room} ${language?.description}`}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_description}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, room_description: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.room_description}
                      color={color}
                      req={true}
                    />

                    {/* room capacity */}
                    <InputText
                      label={`${language?.room} ${language?.capacity}`}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_capacity}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, room_capacity: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.room_capacity}
                      color={color}
                      req={true}
                    />

                    {/* max number of occupants */}
                    <InputText
                      label={`${language?.maximum} ${language?.number} ${language?.of} ${language?.occupants}`}
                      visible={visible}
                      defaultValue={allRoomDetails?.maximum_number_of_occupants}
                      onChange={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, maximum_number_of_occupants: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.maximum_number_of_occupants}
                      color={color}
                      req={true}
                    />

                    {/* minimum number of occupants */}
                    <InputText
                      label={`${language?.minimum} ${language?.number} ${language?.of} ${language?.occupants}`}
                      visible={visible}
                      defaultValue={allRoomDetails?.maximum_number_of_occupants}
                      onChange={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, maximum_number_of_occupants: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.maximum_number_of_occupants}
                      color={color}
                      req={true}
                    />

                    {/* Maximum age of occupants */}
                    <InputText
                      label={`${language?.maximum} ${language?.age} ${language?.of} ${language?.occupants}`}
                      visible={visible}
                      defaultValue={allRoomDetails?.minimum_age_of_occupants}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, minimum_age_of_occupants: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.maximum_number_of_occupants}
                      color={color}
                      req={true}
                    />

                    {/* views room */}
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
                            className={` shadow-sm ${color?.greybackground} ${color?.text} mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full
                       `}
                            isObject={true}
                            options={lang?.Views}
                            onRemove={(event) => { views(event) }}
                            onSelect={(event) => { views(event) }}
                            selectedValues={finalView}
                            displayValue="view"

                          />
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.view}</p>
                        </div>
                      </div>
                    </div>
                    {/* Room height */}
                    <InputText
                      label={`${language?.room} ${language?.length} (${language?.infeet})`}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_length}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, room_length: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.room_length}
                      color={color}
                      req={true}
                    />

                    {/* Room Breadth */}

                    <InputText
                      label={`${language?.room} ${language?.breadth} (${language?.infeet})`}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_width}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, room_width: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.room_width}
                      color={color}
                      req={true}
                    />

                    {/* Room Height */}
                    <InputText
                      label={`${language?.room} ${language?.height} (${language?.infeet})`}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_height}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, room_height: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.room_height}
                      color={color}
                      req={true}
                    />

                    {/* Room Area Read only */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.area}

                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input
                            type="text"
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue={allRoomDetails?.carpet_area} readOnly="readonly"
                          /></div>
                      </div>
                    </div>
                    {/* Room Volume Read only */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.room} {language?.volume}
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input
                            type="text"
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue={allRoomDetails?.room_volume} readOnly="readonly" />
                        </div></div>
                    </div>
                    {/* Room Style*/}
                    <DropDown
                      label={language?.roomstyle}
                      visible={visible}
                      defaultValue={allRoomDetails?.room_style?.replaceAll("_", " ")}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, room_style: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.room_style}
                      color={color}
                      req={true}
                      options={[
                        { value: "western", label: "Western" },
                        { value: "japanese", label: "Japanese" },
                        { value: "japanese_western", label: "Japanese Western" },
                      ]}
                    />

                    {/* Is Room Shared */}
                    <DropDown
                      label={language?.isroomshared}
                      visible={visible}
                      defaultValue={allRoomDetails?.is_room_sharing === "shared" ? "Yes" : "No"}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, is_room_sharing: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.is_room_sharing}
                      color={color}
                      req={true}
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },

                      ]}
                    />

                    {/* Is Room Outdoor Or Indoor */}
                    <DropDown
                      label={language?.isroom}
                      visible={visible}
                      defaultValue={allRoomDetails?.is_room}
                      onChangeAction={
                        (e) => (
                          setAllRoomDetails({ ...allRoomDetails, is_room: e.target.value }, setFlag(1))
                        )
                      }
                      error={error?.is_room_sharing}
                      color={color}
                      req={true}
                      options={[
                        { value: "indoor", label: "Indoor" },
                        { value: "outdoor", label: "Outdoor" },

                      ]}
                    />
                    {/* <div className="w-full lg:w-6/12 px-4">
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
                                setAllRoomDetails({ ...allRoomDetails, is_room: e.target.value }, setFlag(1))
                              )
                            }
                          >
                            <option selected disabled >{allRoomDetails?.is_room}</option>
                            <option value="outdoor" >Indoor</option>
                            <option value="indoor">Outdoor</option>
                          </select>
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.is_room}</p>
                        </div>
                      </div>
                    </div> */}
                    <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                      <div className={(spinner === 0 && (flag !== 1 && roomView != 1)) ? 'block' : 'hidden'}>
                        <Button Primary={language?.UpdateDisabled} />
                      </div>
                      <div className={(spinner === 0 && (flag === 1 || roomView === 1)) ? 'block' : 'hidden'}>
                        <Button Primary={language?.Update} onClick={() => { validationRoomDescription() }} />
                      </div>
                      <div className={spinner === 1 ? 'block' : 'hidden'}>
                        <Button Primary={language?.SpinnerUpdate} />
                      </div>
                      <Button Primary={language?.Next} onClick={() => {
                        {
                          (roomDetails?.room_type === 'Studio_Room' || roomDetails?.room_type === 'Semi_Double' || roomDetails?.room_type === 'King'
                            || roomDetails?.room_type === 'Queen' || roomDetails?.room_type === 'Double') ?
                            setDisp(4)
                            : roomDetails?.room_type === 'Single' ?
                              setDisp(5) :
                              setDisp(1)
                        }
                      }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* Multiple Bed */}
          <div id='4' className={disp === 4 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]}
                selected={1}
                color={color} />
              <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                {language?.room} {language?.description}
              </h6>

              <div className={visible === 0 ? 'block' : 'hidden'}><LoaderTable /></div>
              <div className={visible === 1 ? 'block' : 'hidden'}>
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
          </div>

          {/* Single Bed */}
          <div id='5' className={disp === 5 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>
              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={1} color={color} />
              <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  pb-2 font-bold`}>
                {language?.room} {language?.description}
              </h6>
              <div className="flex flex-wrap">

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`text-sm  font-medium ${color?.text} block mb-2`}
                      htmlFor="grid-password">
                      {language?.bed} {language?.Length}({language?.incm})
                      <span style={{ color: "#ff0000" }}>*</span>
                    </label>
                    <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                    <div className={visible === 1 ? 'block' : 'hidden'}>
                      <input
                        type="text" defaultValue={bedDetails?.bed_length}
                        className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        onChange={
                          (e) => (
                            setBedDetails({ ...bedDetails, bed_length: e.target.value }, setFlag(1))
                          )
                        }
                      />
                      <p className="text-sm text-sm text-red-700 font-light">
                        {error?.bed_length}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className={`text-sm font-medium ${color?.text} block mb-2`}
                      htmlFor="grid-password">
                      {language?.bed}  {language?.width}({language?.incm})
                      <span style={{ color: "#ff0000" }}>*</span>
                    </label>
                    <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                    <div className={visible === 1 ? 'block' : 'hidden'}>
                      <input
                        type="text"
                        className={`shadow-sm ${color?.greybackground} ${color?.text}  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        defaultValue={bedDetails?.bed_width}
                        onChange={
                          (e) => (
                            setBedDetails({ ...bedDetails, bed_width: e.target.value }, setFlag(1))
                          )
                        }
                      />
                      <p className="text-sm text-sm text-red-700 font-light">
                        {error?.bed_width}</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="flex items-center mt-2 justify-end space-x-2 sm:space-x-3 ml-auto">
                <Button Primary={language?.Previous} onClick={() => {
                  setDisp(0)
                }} />

                <div className={(spinner === 0 && flag !== 1) ? 'block' : 'hidden'}>
                  <Button Primary={language?.UpdateDisabled} /></div>
                <div className={(spinner === 0 && flag === 1) ? 'block' : 'hidden'}>
                  <Button Primary={language?.Update} onClick={() => {
                    validationBedData();
                  }} />
                </div>
                <div className={(spinner === 1 && flag === 1) ? 'block' : 'hidden'}>
                  <Button Primary={language?.SpinnerUpdate} />
                </div>
                <Button Primary={language?.Next} onClick={() => {
                  setDisp(1)
                }} />
              </div>
            </div>
          </div>

          {/* Room Services */}
          <div id='1' className={disp === 1 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow rounded-lg mt-2 mx-1 px-12 sm:p-6 xl:p-8  2xl:col-span-2`}>

              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={2} color={color} />

              <h6 className={`${color?.text} text-xl flex leading-none pl-6 pt-2 font-bold  mb-8`}>
                {language?.room} {language?.services}
              </h6>
              <div className="flex flex-col my-4">
                <div className="overflow-x-auto">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                      <table className="table-fixed min-w-full divide-y mx-8 divide-gray-200">
                        <thead className={`${color.greybackground}`}>
                          <tr>
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

                              <td className={`${color.text} px-4 py-4 whitespace-nowrap text-base font-normal `}>
                                <div className="flex">
                                  <div className="form-check ml-4 form-check-inline">

                                    <label htmlFor={"default-toggle" + idx} className="inline-flex relative items-center cursor-pointer">

                                      <input type="checkbox" value={item?.service_value} checked={item?.service_value == true}
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
                <Button Primary={language?.Previous} onClick={() => { setDisp(0) }} />
                <div className={spinner === 0 ? 'block' : 'hidden'}>
                  <Button Primary={roomDetails?.room_facilities !== undefined ? language?.Update : language?.Submit}
                    onClick={() => { roomDetails?.room_facilities !== undefined ? editServices() : submitServices() }} />
                </div>
                <div className={spinner === 1 ? 'block' : 'hidden'}>
                  <Button Primary={roomDetails?.room_facilities !== undefined ? language?.SpinnerUpdate : language?.SpinnerSubmit}
                  />
                </div>
                <Button Primary={language?.Next} onClick={() => { setDisp(2) }} />
              </div>
            </div>
          </div>

          {/* Room Gallery */}
          <div id='2' className={disp === 2 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow-xl rounded-lg sm:p-6 xl:p-8  2xl:col-span-2 my-3`}>

              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={3} color={color} />
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
                        className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
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
                      onClick={allDelete}
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
                  <a href="#" className={`w-1/2 ${color?.text} ${color?.whitebackground} border border-gray-300  ${color?.hover}  focus:ring-4 focus:ring-cyan-200 font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto`}>
                    <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                    Import
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap" >
                <div className={visible === 0 ? 'block w-auto h-auto m-6 w-32 flex' : 'hidden'}><Imageloader /> <Imageloader /><Imageloader /></div>
                <div className={visible === 1 ? 'block flex flex-wrap' : 'hidden'}>
                  <div className="flex-wrap container grid sm:grid-cols-2 lg:grid-cols-3 gap-4">



                    {roomimages.map((item, idx) => {
                      return (

                        <>
                          <div
                            className="block text-blueGray-600  text-xs font-bold "
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
                                  title="Click here to delete image."
                                  name={item?.image_id}
                                  checked={item.isChecked || false}
                                  onChange={(e) => {
                                    handlecheckbox(e);
                                  }}
                                  className="bottom-0 right-0 cursor-pointer absolute bg-gray-30 opacity-30 m-1 border-gray-300 text-cyan-600  checked:opacity-100 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded-full"
                                  onClick={() => {
                                    setSelectedImage(!selectedImage);
                                  }}
                                />
                                {check?.length === 0 || undefined ? (
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
              <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                <Button Primary={language?.Previous} onClick={() => { setDisp(1) }} />
                <Button Primary={language?.Next} onClick={() => { setDisp(3) }} />
              </div>
            </div>
          </div>


          {/* Room Rates */}
          <div id='3' className={disp === 3 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow-xl rounded-lg  sm:p-6 xl:p-8  2xl:col-span-2`}>
              {/* widget progress starts */}
              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={4} color={color} />{/* widget progress ends */}

              {/* page label starts */}
              <h6 className={`${color?.text} text-base  flex leading-none  pt-2 font-semibold`}>
                {language?.room} {language?.rates}
              </h6>
              {/* page label ends */}
              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">

                  {/* room rate form starts */}
                  <div className="flex flex-wrap">
                    {/* currency drop down */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.currency}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <select className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            onChange={
                              (e) => (
                                setAllRoomRates({ ...allRoomRates, currency: e.target.value }, setFlag(1))
                              )
                            }>
                            <option selected disabled>{allRoomRates?.currency}</option>
                            {lang?.CurrencyData?.map(i => {
                              return (

                                <option key={i.currency_code} value={i.currency_code}>{i?.currency_name}</option>)
                            }
                            )}
                          </select>
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.currency}</p>
                        </div>
                      </div>
                    </div>
                    {/* base rate amount  */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.baserate} {language?.amount}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input
                            type="text"
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue={roomDetails?.unconditional_rates?.[0]?.baserate_amount}
                            onChange={
                              (e) => (
                                setAllRoomRates({ ...allRoomRates, baserate_amount: e.target.value }, setFlag(1))
                              )
                            }
                          />
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.baserate_amount}</p>
                        </div>
                      </div>
                    </div>
                    {/* tax amount */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.taxrate} {language?.amount}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input
                            type="text"
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue={roomDetails?.unconditional_rates?.[0]?.tax_amount}
                            onChange={
                              (e) => (
                                setAllRoomRates({ ...allRoomRates, tax_amount: e.target.value, un_rate_id: allRoomDetails?.unconditional_rates?.[0]?.un_rate_id }, setFlag(1))
                              )
                            } />
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.tax_amount}</p></div>
                      </div>
                    </div>
                    {/* other charges amount */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className={`text-sm font-medium ${color?.text} block mb-2`}
                          htmlFor="grid-password">
                          {language?.other} {language?.charges} {language?.amount}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                          <input
                            type="text"
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue={roomDetails?.unconditional_rates?.[0]?.otherfees_amount}
                            onChange={
                              (e) => (
                                setAllRoomRates({ ...allRoomRates, otherfees_amount: e.target.value }, setFlag(1))
                              )
                            } />
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.otherfees_amount}</p></div>
                      </div>
                    </div>
                    {/* blank */}
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                      </div>
                    </div>
                    {/* buttons start */}
                    <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                      <Button Primary={language?.Previous} onClick={() => { setDisp(2) }} />
                      <div className={(spinner === 0 && flag !== 1) ? 'block' : 'hidden'}>
                        <Button Primary={language?.UpdateDisabled} />
                      </div>
                      <div className={(spinner === 0 && flag === 1) ? 'block' : 'hidden'}>
                        <Button Primary={language?.Update} onClick={() => {
                          validationRates();
                        }} />
                      </div>


                      <div className={spinner === 1 ? 'block' : 'hidden'}>
                        <Button Primary={language?.SpinnerUpdate} />
                      </div>

                      <Button Primary={language?.Next} onClick={() => { setDisp(6) }} />

                    </div>
                    {/* buttons end */}
                  </div>
                  {/* room rate form ends */}




                </div>
              </div>
            </div>
          </div>

          {/* Room Rates Discount */}
          <div id='6' className={disp === 6 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow-xl rounded-lg  sm:p-6 xl:p-8  2xl:col-span-2`}>
              {/* widget progress starts */}
              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={5} color={color} />
              {/* widget progress ends */}

              {/* page label starts */}
              <h6 className={`${color?.text} text-base  flex leading-none  pt-2 font-semibold`}>
                {language?.room} {language?.rates} {language?.discount}
              </h6>
              {/* page label ends */}
              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                  <div className="sm:flex">
                    <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                      {/* search form */}
                      <form className="lg:pr-3" action="#" method="GET">
                        <label htmlFor="users-search" className="sr-only">Search</label>
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                          <input type="text" name="email" id="roomDiscount" onKeyUp={() => searchFunction('roomDiscount', 'discountTable')}
                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder='Search'>
                          </input>
                        </div>
                      </form>
                      {/* search form end */}
                      {/* icons start */}
                      <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                        </span>

                        <button onClick={() => { deleteMultipleDiscount() }} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>

                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </span>

                      </div>
                      {/* icons end*/}
                      {/* add discount and modification buttons start */}

                      <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 lg:ml-72 xl:ml-80 md:ml-64"
                        onClick={() => { localStorage.setItem("RoomId", currentroom); Router.push('./roomdiscount'); }}>
                        Add Discount</button>


                      {/* add discount and modification buttons ends */}

                    </div>
                  </div>

                  {/* table */}
                  <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
                    <div className="overflow-x-auto">
                      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                          <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="discountTable">
                            <thead  >
                              <tr>
                                {/* checkbox */}
                                <th scope="col" className="p-4">
                                  <div className="flex items-center">
                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                      checked={selectAllDiscounts === 1 || false}
                                      name="allSelect"
                                      onChange={(e) => {
                                        setAllDiscount()

                                      }}
                                      className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                  </div>
                                </th>

                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Date From</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Date To</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Discount Type</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Discount On</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Discount </th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Actions</th>
                              </tr>
                            </thead>

                            <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`}>
                              {discount?.map((dis, index) => {
                                return (<>
                                  {(editRow?.edit === 1 && editRow?.id === index) ?
                                    <tr key={index}>
                                      <td className="p-4 w-4">
                                        <span className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id={dis?.discount_id}
                                            tooltip
                                            disabled
                                            title="Click here to delete discount."
                                            name={dis?.discount_id}
                                            checked={dis?.isChecked || false}
                                            aria-describedby="checkbox-1"
                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                                          />
                                          <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                        </span>
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="date"
                                          className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={dis?.date_from}
                                          onChange={(e) => setEditedDiscount({ ...editedDiscount, date_from: e.target.value })}
                                        />
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="date" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={dis?.date_to}
                                          onChange={(e) => setEditedDiscount({ ...editedDiscount, date_to: e.target.value })}
                                        />

                                      </td>
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <select className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          onChange={(e) => setEditedDiscount({ ...editedDiscount, discount_type: e.target.value })}
                                        >
                                          <option value="Flat">Flat</option>
                                          <option value="percentage">Percentage</option>
                                        </select>
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <select className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          onChange={(e) => setEditedDiscount({ ...editedDiscount, discount_on: e.target.value })}
                                        >
                                          <option value="Per Person">Per Person</option>
                                          <option value="Per Group">Per Group</option>
                                        </select>
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={dis?.discount}
                                          onChange={(e) => setEditedDiscount({ ...editedDiscount, discount: e.target.value })}
                                        />

                                      </td>

                                      <td>
                                        <button
                                          onClick={() => {
                                            updateDiscount();
                                          }}
                                          className={`bg-gradient-to-r mt-1 bg-green-600 hover:bg-green-700 mr-2 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>

                                          Save</button>
                                        <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                          onClick={() => {
                                            setEditedDiscount({});
                                            setEditRow({ edit: 0, id: undefined })
                                          }}
                                        >

                                          Cancel</button>
                                      </td>
                                    </tr> :
                                    <tr key={index}>
                                      <td className="p-4 w-4">
                                        <span className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id={dis?.discount_id}
                                            tooltip
                                            title="Click here to delete discount."
                                            name={dis?.discount_id}
                                            checked={dis?.isChecked || false}
                                            onChange={(e) => {
                                              handleCheckboxDiscount(e, dis);
                                            }}
                                            aria-describedby="checkbox-1"
                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                          <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                        </span>
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {dis?.date_from}
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {dis?.date_to}
                                      </td>
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {dis?.discount_type}
                                      </td>
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {dis?.discount_on}
                                      </td>
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>

                                        {dis?.discount}
                                      </td>

                                      {(del == 1 && id === index) ?
                                        <td>
                                          <button
                                            className="lg:mr-2 bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                            onClick={() => { deleteDiscount(dis) }}
                                          >Yes,Delete</button>
                                          <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                            onClick={(e) => {
                                              setDel(0)
                                              setId(undefined)
                                            }}
                                          >

                                            Cancel</button>
                                        </td> : <td>
                                          <button className="bg-gradient-to-r mt-1 mr-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                            onClick={() => {
                                              setEditedDiscount(dis);
                                              setEditRow({ edit: 1, id: index })
                                            }}
                                          >

                                            Edit</button>
                                          <button className="bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                            onClick={(e) => {
                                              setDel(1);
                                              setId(index);
                                            }}
                                          >

                                            Delete</button>
                                        </td>}
                                    </tr>}
                                </>
                                )
                              })}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* table end */}

                  {/* buttons start */}
                  <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                    <Button Primary={language?.Previous} onClick={() => { setDisp(3) }} />
                    <Button Primary={language?.Next} onClick={() => { setDisp(7) }} />

                  </div>
                  {/* buttons end */}

                </div>
              </div>
            </div>
          </div>

          {/* Room Rates Modifications */}
          <div id='7' className={disp === 7 ? 'block' : 'hidden'}>
            <div className={`${color?.whitebackground} shadow-xl rounded-lg  sm:p-6 xl:p-8  2xl:col-span-2`}>
              {/* widget progress starts */}
              <WidgetStatus name={[`Room Description`, `${language?.room} ${language?.services}`, `${language?.room} ${language?.gallery}`, `${language?.room} ${language?.rates}`, `Rate Discounts`, `Rate Modifications`]} selected={6} color={color} />
              {/* widget progress ends */}

              {/* page label starts */}
              <h6 className={`${color?.text} text-base  flex leading-none  pt-2 font-semibold`}>
                {language?.room} {language?.ratemodifications}
              </h6>
              {/* page label ends */}
              <div className="pt-6">
                <div className=" md:px-2 mx-auto w-full">
                  <div className="sm:flex">
                    <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                      {/* search form */}
                      <form className="lg:pr-3" action="#" method="GET">
                        <label htmlFor="users-search" className="sr-only">Search</label>
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                          <input type="text" name="email" id="roomModification" onKeyUp={() => searchFunction('roomModification', 'modificationTable')}
                            className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder='Search'>
                          </input>
                        </div>
                      </form>
                      {/* search form end */}
                      {/* icons start */}
                      <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                        </span>

                        <button onClick={() => { deleteMultipleModifications() }} data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>

                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </span>

                      </div>
                      {/* icons end*/}
                      {/* add discount and modification buttons start */}

                      <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150 lg:ml-72 xl:ml-80 md:ml-64"
                        onClick={() => { localStorage.setItem("RoomId", currentroom); Router.push('./roomratemodifcation'); }}>
                        Add Rate Modification</button>


                      {/* add discount and modification buttons ends */}

                    </div>
                  </div>

                  {/* table */}
                  <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0 w-full  relative">
                    <div className="overflow-x-auto">
                      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                          <table className="table data table-fixed lg:min-w-full divide-y divide-gray-200 min-w-screen" id="modificationTable">
                            <thead className={` ${color?.tableheader} `}>
                              <tr>
                                {/* checkbox */}
                                <th scope="col" className="p-4">
                                  <div className="flex items-center">
                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                      checked={selectAllModifications === 1 || false}
                                      name="allSelect"
                                      onChange={(e) => {
                                        setAllModification()
                                      }}
                                      className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                  </div>
                                </th>

                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Date From</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Date To</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Orginal Rate</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Modified Rate</th>
                                <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>
                                  Actions</th>
                              </tr>
                            </thead>

                            <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`}>
                              {rateModification?.map((mod, index) => {
                                return (<>
                                  {(editRow?.edit === 1 && editRow?.id === index) ?
                                    <tr key={index}>
                                      {/* check box disabled while editing */}
                                      <td className="p-4 w-4">
                                        <span className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id={mod?.modification_id}
                                            tooltip
                                            disabled
                                            title="Click here to delete image."
                                            name={mod?.modification_id}
                                            checked={mod?.isChecked || false}
                                            aria-describedby="checkbox-1"
                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                          <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                        </span>
                                      </td>
                                      {/* date from */}
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="date"
                                          className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={mod?.date_from}
                                          onChange={(e) => setEditedModifications({ ...editedModifications, date_from: e.target.value })}
                                        />
                                      </td>

                                      {/* date to */}
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="date" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={mod?.date_to}
                                          onChange={(e) => setEditedModifications({ ...editedModifications, date_to: e.target.value })}
                                        />

                                      </td>


                                      {/* orginal rate */}
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={mod?.orginal_rate}
                                          onChange={(e) => setEditedModifications({ ...editedModifications, orginal_rate: e.target.value })}
                                        />

                                      </td>


                                      {/* modified rate */}
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        <input type="text" className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5`}
                                          defaultValue={mod?.modified_rate}
                                          onChange={(e) => setEditedModifications({ ...editedModifications, modified_rate: e.target.value })}
                                        />

                                      </td>

                                      {/* buttons */}
                                      <td>
                                        <button
                                          onClick={() => {
                                            updateModification();
                                          }}
                                          className={`bg-gradient-to-r mt-1 bg-green-600 hover:bg-green-700 mr-2 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}>

                                          Save</button>
                                        <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                          onClick={() => {
                                            setEditedModifications({});
                                            setEditRow({ edit: 0, id: undefined })
                                          }}
                                        >

                                          Cancel</button>
                                      </td>
                                    </tr> :
                                    <tr key={index}>
                                      <td className="p-4 w-4">
                                        <span className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id={mod?.modification_id}
                                            tooltip
                                            title="Click here to delete image."
                                            name={mod?.modification_id}
                                            checked={mod?.isChecked || false}
                                            onChange={(e) => {
                                              handleCheckboxModification(e, mod);
                                            }}
                                            aria-describedby="checkbox-1"
                                            className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                          <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                        </span>
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {mod?.date_from}
                                      </td>

                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {mod?.date_to}
                                      </td>
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {mod?.orginal_rate}
                                      </td>
                                      <td className={`p-4 whitespace-nowrap text-base font-normal capitalize ${color?.text}`}>
                                        {mod?.modified_rate}
                                      </td>


                                      {(del == 1 && id === index) ?
                                        <td>
                                          <button
                                            className="lg:mr-2 bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                            onClick={() => { deleteModification(mod) }}
                                          >Yes,Delete</button>
                                          <button className={`bg-gradient-to-r my-1 bg-gray-400 hover:${color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150`}
                                            onClick={(e) => {
                                              setDel(0);
                                              setId(undefined);
                                            }}
                                          >

                                            Cancel</button>
                                        </td>
                                        : <td>
                                          <button className="bg-gradient-to-r mt-1 mr-2 bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                            onClick={() => {
                                              setEditedModifications(mod);
                                              setEditRow({ edit: 1, id: index })
                                            }}
                                          >

                                            Edit</button>
                                          <button className="bg-gradient-to-r my-1 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                            onClick={(e) => {
                                              setDel(1);
                                              setId(index);
                                            }}
                                          >

                                            Delete</button>
                                        </td>}

                                    </tr>}
                                </>
                                )
                              })}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* table end */}

                  {/* buttons start */}
                  <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                    <Button Primary={language?.Previous} onClick={() => { setDisp(6) }} />
                    {/* <Button Primary={language?.Next} onClick={() => { setDisp(7) }} /> */}

                  </div>
                  {/* buttons end */}

                </div>
              </div>
            </div>
          </div>
        </div>



        {/* New image enlarge */}
        <div id="enlarge" className={enlargeImage === 1 ? "block" : "hidden"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl   sm:inset-0 bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="flex justify-start ml-2 mr-auto">
              {/* //Left arrow symbol*/}

              <svg
                className={indexImage <= 0 ? "hidden" : "block cursor-pointer"}
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
                className={` ${color.tableheader} rounded-lg shadow relative`}
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
                  indexImage <= 0 ? "hidden" : "block cursor-pointer"}

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
        </div>

        {/* Modal Add Image */}
        <div className={addImage === 1 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    {language?.add} {language?.new} {language?.image}
                  </h3>
                  <button type="button"
                    onClick={() => { setAddImage(0); setActionImage({}); setError({}) }}
                    className="text-gray-400 bg-transparent
                                 hover:bg-gray-200 
                                 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.image} {language?.upload}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="file" name="myImage" accept="image/png, image/gif, image/jpeg, image/jpg"
                          onChange={e => {
                            onChangePhoto(e, 'imageFile');
                          }}
                          className={`${color?.greybackground} ${color?.text} shadow-sm  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2 px-2.5`}
                        />
                      </div>
                      <div className="col-span-6 mt-2 sm:col-span-3">
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.image_link}</p>
                        <Button Primary={language?.Upload} onClick={uploadImage} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-2">
                      <img className={`py-2 ${color?.text} `} src={actionImage?.image_link} alt='Image Preview' style={{ height: "150px", width: "250px" }} />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.image} {language?.titl}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => (setActionImage({ ...actionImage, image_title: e.target.value }, setFlag(1)))}
                        className={`${color?.greybackground} ${color?.text} shadow-sm py-2  border border-gray-300  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-2.5`}
                      />
                      <p className="text-sm text-sm text-red-700 font-light">
                        {error?.image_title}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.image} {language?.description}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <textarea rows="2" columns="60"
                        onChange={(e) => (setActionImage({ ...actionImage, image_description: e.target.value }, setFlag(1)))}
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        defaultValue="" />
                      <p className="text-sm text-sm text-red-700 font-light">
                        {error?.image_description}</p>
                    </div>

                  </div>
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">

                  <div className={(spinner === 0 && flag !== 1) ? 'block' : 'hidden'}>
                    <Button Primary={language?.AddDisabled} />
                  </div>
                  <div className={(spinner === 0 && flag === 1) ? 'block' : 'hidden'}>
                    <Button Primary={language?.Add} onClick={() => { validationImage(); }} />
                  </div>

                  <div className={spinner === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.SpinnerAdd} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal edit Image */}
        <div className={editImage === 1 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    {language?.edit} {language?.image}
                  </h3>
                  <button type="button"
                    onClick={() => { setEditImage(0); setError({}); }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="user-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <img src={actionImage?.image_link} alt='Room Image' style={{ height: "200px", width: "400px" }} className={`py-2 ${color?.text} `} />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.image} {language?.description}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <textarea rows="6" columns="60"
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        onChange={
                          (e) => (
                            setActionImage({
                              ...actionImage,
                              image_description: e.target.value
                            }, setFlag(1))
                          )
                        } defaultValue={actionImage?.image_description} />
                      <p className="text-sm text-sm text-red-700 font-light">
                        {error?.image_description}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.image} {language?.titl}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={actionImage?.image_title}
                        onChange={
                          (e) => (
                            setActionImage({
                              ...actionImage,
                              image_title: e.target.value
                            }, setFlag(1))
                          )
                        }
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                      />
                      <p className="text-sm text-sm text-red-700 font-light">
                        {error?.image_title}</p>
                    </div>
                  </div>
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <div className={(spinner === 0 && flag !== 1) ? 'block' : 'hidden'}>
                    <Button Primary={language?.UpdateDisabled} />
                  </div>
                  <div className={(spinner === 0 && flag === 1) ? 'block' : 'hidden'}>
                    <Button Primary={language?.Update} onClick={validationImage} />
                  </div>


                  <div className={spinner === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.SpinnerUpdate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Delete */}
        <div className={deleteImage === 1 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-md px-4 h-full md:h-auto">
              <div className={`${color?.whitebackground}  rounded-lg shadow relative`}>
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => setdeleteImage(0)}
                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                </div>

                <div className="p-6 pt-0 text-center">
                  <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className={`text-xl font-normal ${color.deltext} mt-5 mb-6`}>
                    {language?.areyousureyouwanttodelete}
                  </h3>

                  {spinner === 0 ?
                    <>
                      <Button Primary={language?.Delete} onClick={() => submitDelete()} />
                      <Button Primary={language?.Cancel} onClick={() => setdeleteImage(0)} />
                    </>
                    :
                    <Button Primary={language?.SpinnerDelete} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Add Bed */}
        <div className={view === 1 ? 'block' : 'hidden'}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <form id='asform'>
                <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
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
                        <label htmlFor="first-name" className={`text-sm ${color?.text} font-medium  block mb-2`}>{language?.bed} {language?.length}({language?.incm})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input type="text" name="first-name"
                          onChange={(e) => { setModified({ ...modified, bed_length: e.target.value }, setFlag(1)) }}
                          id="first-name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                              focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} required />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.bed_length}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className={`text-sm ${color?.text} font-medium  block mb-2`}>{language?.bed} {language?.width}({language?.incm})
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input type="text" name="first-name"
                          onChange={(e) => { setModified({ ...modified, bed_width: e.target.value }, setFlag(1)) }}
                          id="first-name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} required />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.bed_width}</p>
                      </div>
                    </div>
                  </div>

                  <div className="items-center p-6 border-t border-gray-200 rounded-b">

                    <div className={(spinner === 0 && flag !== 1) ? 'block' : 'hidden'}>
                      <Button Primary={language?.AddDisabled} />
                    </div>
                    <div className={(spinner === 0 && flag === 1) ? 'block' : 'hidden'}>
                      <Button Primary={language?.Add} onClick={() => { addBed() }} />
                    </div>
                    <div className={spinner === 1 ? 'block' : 'hidden'}>
                      <Button Primary={language?.SpinnerAdd} />
                    </div>



                  </div>
                </div>
              </form>
            </div>
          </div>
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

