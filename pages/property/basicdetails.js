import React, { useState, useEffect } from "react";
import Title from "../../components/title";
import objChecker from "lodash";
import Lineloader from "../../components/loaders/lineloader";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import english from "../../components/Languages/en";
import french from "../../components/Languages/fr";
import arabic from "../../components/Languages/ar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import colorFile from "../../components/colors/Color";
import Headloader from "../../components/loaders/headloader";
import Textboxloader from "../../components/loaders/textboxloader";
import validatebasicDetails from "../../components/validation/basicdetails";
var language;
var currentProperty;
var currentLogged;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resizer from "react-image-file-resizer";
const logger = require("../../services/logger");
let colorToggle;
import InputText from "../../components/utils/InputText";
import InputTextBox from "../../components/utils/InputTextBox";
import DateInput from "../../components/utils/DateInput";
import DropDown from "../../components/utils/DropDown";

export default function BasicDetails() {
  const router = useRouter();
  const [visible, setVisible] = useState(0);
  const [spinner, setSpinner] = useState(0);
  const [basicDetails, setBasicDetails] = useState([]);
  const [allPropertyTypes, setAllPropertyTypes] = useState([]);
  const [flag, setFlag] = useState([]);
  const [color, setColor] = useState({});
  const [error, setError] = useState({});
  const [mode, setMode] = useState();
  const [imageLogo, setImageLogo] = useState();
  const [uploadImageSpin, setUploadImageSpin] = useState(false);
  
  /** Fetching language from the local storage **/
  useEffect(() => {
    firstfun();
  }, []);



  const firstfun = () => {
    if (typeof window !== "undefined") {
      var locale = localStorage.getItem("Language");
      colorToggle = localStorage.getItem("colorToggle");
      if (
        colorToggle === "" ||
        colorToggle === undefined ||
        colorToggle === null ||
        colorToggle === "system"
      ) {
        window.matchMedia("(prefers-color-scheme:dark)").matches === true
          ? setColor(colorFile?.dark)
          : setColor(colorFile?.light);
        setMode(
          window.matchMedia("(prefers-color-scheme:dark)").matches === true
            ? true
            : false
        );
      } else if (colorToggle === "true" || colorToggle === "false") {
        setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
        setMode(colorToggle === "true" ? true : false);
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
  };

  const fetchAllPropertyTypes = () => {
    const url = '/api/all_property_types';
    axios.get(url).then((response) => setAllPropertyTypes(response.data))
  }
  const fetchBasicDetails = async () => {
    try {
      const { address_province, address_city, property_category, property_id } =
        currentProperty;
      const url = `/api/${address_province.replace(
        /\s+/g,
        "-"
      )}/${address_city}/${property_category}s/${property_id}`;
      
      const response = await axios.get(url);
      setBasicDetails(response.data);
      setAllHotelDetails(response.data);
      setImageLogo(response.data.logo);
      logger.info("url to fetch property details hit successfully");
      setVisible(1);
    } catch (error) {
      logger.error("url to fetch property details failed");
    }
  };

  /* Function call to fetch Current Property Details when page loads */
  useEffect(() => {
    if (JSON.stringify(currentLogged) === "null") {
      router?.push(window.location.origin);
    } else {
      fetchAllPropertyTypes();
      fetchBasicDetails();
    }
  }, []);

  const colorToggler = (newColor) => {
    if (newColor === "system") {
      window.matchMedia("(prefers-color-scheme:dark)").matches === true
        ? setColor(colorFile?.dark)
        : setColor(colorFile?.light);
      localStorage.setItem("colorToggle", newColor);
    } else if (newColor === "light") {
      setColor(colorFile?.light);
      localStorage.setItem("colorToggle", false);
    } else if (newColor === "dark") {
      setColor(colorFile?.dark);
      localStorage.setItem("colorToggle", true);
    }
    firstfun();
    router.push("./basicdetails");
  };

  const current = new Date();
  let month = current.getMonth() + 1;
  const descriptionDate = `${current.getDate()}/${month < +10 ? `0${month}` : `${month + 1}`
    }/${current.getFullYear()}`;
  const [allHotelDetails, setAllHotelDetails] = useState([]);

  /* Edit Basic Details Function */
  const submitBasicEdit = () => {
    if (flag === 1) {
      if (objChecker.isEqual(allHotelDetails, basicDetails)) {
        toast.warn("APP: No change in Basic Details detected. ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFlag([]);
      } else {
        setSpinner(1);

        const final_data = {
          property_id: currentProperty?.property_id,
          property_name: allHotelDetails.property_name?.toLowerCase(),
          property_category: allHotelDetails.property_category?.toLowerCase(),
          property_brand: allHotelDetails.property_brand,
          established_year: allHotelDetails.established_year,
          star_rating: allHotelDetails.star_rating,
          description_title: allHotelDetails.description_title,
          description_body: allHotelDetails.description_body.replace(/\n/g, "\\n"),
          description_date: allHotelDetails.description_date,
        };

        const url = "/api/basic";
        axios
          .put(url, final_data, {
            header: { "content-type": "application/json" },
          })
          .then((response) => {
            setSpinner(0);
            toast.success("API: Basic Details Updated Successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            fetchBasicDetails();
            router.push("./basicdetails");
            setAllHotelDetails([]);
            setFlag([]);
          })
          .catch((error) => {
            setSpinner(0);
            toast.error("API: Basic Details Update Error!", {
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
    } else {
      toast.warn("APP: No change in Basic Details detected. ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Add Validation Basic Details
  const validationBasicDetails = () => {
    setError({});
    var result = validatebasicDetails(allHotelDetails);
    if (result === true) {
      submitBasicEdit();
    } else {
      setError(result);
    }
  };

  const onChange = async (event) => {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    console.log(image);
  };

  /* Function to upload logo to cloud*/
  const uploadImage = async (image) => {
    setUploadImageSpin(true);
    image = await resizeFile(image);
    const imageDetails = image;
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir");
    formData.append("enctype", "multipart/form-data");
    axios
      .post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
      .then((response) => {
        setImageLogo(response?.data?.secure_url);
      })
      .catch((error) => {
        toast.error("Image upload error. ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  // Logo Upload
  const submitPhotoEdit = () => {
    const final_data = {
      property_id: currentProperty?.property_id,
      logo_link: imageLogo,
    };
    const url = "/api/basic";
    axios
      .put(url, final_data, { header: { "content-type": "application/json" } })
      .then((response) => {
        toast.success("API: Logo update success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchBasicDetails();
        router.push("./basicdetails");
        setUploadImageSpin(false);
      })
      .catch((error) => {
        toast.error("API:Logo Update error.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        164,
        40,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  return (
    <>
      <Title name={`Engage |  ${language?.basicdetails}`} />
      <Header
        color={color}
        Primary={english.Side}
        Type={currentLogged?.user_type}
        Sec={colorToggler}
        mode={mode}
        setMode={setMode}
      />
      <Sidebar
        color={color}
        Primary={english.Side}
        Type={currentLogged?.user_type}
      />

      <div
        id="main-content"
        className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}
      >
        {/* bread crumb */}
        <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <div
                className={`${color?.text} text-base font-medium  inline-flex items-center`}
              >
                <svg
                  className="w-5 h-5 mr-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <Link
                  href={
                    currentLogged?.id.match(/admin.[0-9]*/)
                      ? "../admin/adminlanding"
                      : "./landing"
                  }
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}
                >
                  <a>{language?.home}</a>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div
                  className={`${color?.text} text-base font-medium  inline-flex items-center`}
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className={visible === 0 ? "block w-16" : "hidden"}>
                    <Headloader />
                  </div>
                  <div className={visible === 1 ? "block" : "hidden"}>
                    {" "}
                    <Link
                      href="./propertysummary"
                      className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2"
                    >
                      <a>{basicDetails?.property_name}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div
                  className={`${color?.textgray} text-base font-medium  inline-flex items-center`}
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span
                    className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  "
                    aria-current="page"
                  >
                    {language?.basicdetails}
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        {/* Basic Details Form */}
        <div
          className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}
        >
          <h6
            className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}
          >
            {language?.basicdetails}
          </h6>
          <div className="pt-6">
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">
                {/* property name */}
                <InputText
                  label={language?.propertyname}
                  visible={visible}
                  defaultValue={basicDetails?.property_name}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      { ...allHotelDetails, property_name: e.target.value },
                      setFlag(1)
                    )
                  }
                  error={error?.property_name}
                  color={color}
                  req={true}
                  title={language?.propertyname}
                  tooltip={true}
                />

                {/* logo */}
                <div className="w-full lg:w-6/12 px-4">
                <label
          data-testid="checkingcolor"
          className={`text-sm font-medium ${color?.text} block mb-2`}
          htmlFor="grid-password"
        >
          {`Logo`}
         
        </label>
                  {imageLogo ? <img src={imageLogo} width="164px" height="40px" alt={basicDetails?.property_name} /> : <div className={`hotelLogo border border-2 
                  p-2 w-fit rounded-lg ${color?.text}`}>{basicDetails?.property_name}</div>}

                </div>

                {/*  Dropdown for Property Category */}
                <DropDown
                  label={language?.propertycategory}
                  visible={visible}
                  defaultValue={basicDetails?.property_category}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      { ...allHotelDetails, property_category: e.target.value },
                      setFlag(1)
                    )
                  }
                  error={error?.propertycategory}
                  color={color}
                  req={true}
                  title={language?.propertycategory}
                  options={allPropertyTypes.map(i => ({ value: i?.property_type, label: i?.property_type }))}
                />

                {/* Property brand */}
                <InputText
                  label={language?.propertybrand}
                  visible={visible}
                  defaultValue={basicDetails?.property_brand}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      { ...allHotelDetails, property_brand: e.target.value },
                      setFlag(1)
                    )
                  }
                  error={error?.property_brand}
                  color={color}
                  req={false}
                  tooltip={true}
                />

                {/* Established date */}
                <DateInput
                  color={color}
                  label={language?.establisheddate}
                  req={true}
                  initialValue={basicDetails?.established_year}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        established_year: e.target.value,
                      },
                      setFlag(1)
                    )
                  }
                  error={error?.established_year}
                  visible={visible}
                  max={descriptionDate}
                  title={language?.establisheddate}
                  tooltip={true}
                />
                {/*Star Rating*/}
                <DropDown
                  label={language?.starrating}
                  visible={visible}
                  defaultValue={basicDetails?.star_rating}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      { ...allHotelDetails, starrating: e.target.value },
                      setFlag(1)
                    )
                  }
                  error={error?.starrating}
                  color={color}
                  req={true}
                  tooltip={true}
                  options={[
                    { value: 0, label: 0 },
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                    { value: 5, label: 5 },
                  ]}
                />
                {/* Description_title */}
                <InputText
                  label={language?.descriptiontitle}
                  visible={visible}
                  defaultValue={basicDetails?.description_title}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        description_title: e.target.value,
                      },
                      setFlag(1)
                    )
                  }
                  error={error?.description_title}
                  color={color}
                  req={true}
                  title={language?.descriptiontitle}
                  tooltip={true}
                />
                {/*Description */}
                <InputTextBox
                  label={language?.description}
                  visible={visible}
                  defaultValue={basicDetails?.description_body}
                  wordLimit={1000}
                  onChangeAction={(e) => {
                    if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                      setError({})
                     setAllHotelDetails(
                        {
                          ...allHotelDetails,
                          description_body: e.target.value,
                        },
                        setFlag(1)
                      )
                    }
                    else {
                      setError({ description_body: 'word limit reached' })
                    }

                  }

                  }
                  error={error?.description_body}
                  color={color}
                  req={true}
                  tooltip={true}
                />
                {/* Description date read only */}
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`text-sm font-medium ${color?.text} block mb-2`}
                      htmlFor="grid-password"
                    >
                      {language?.descriptiondate}
                      <span style={{ color: "#ff0000" }}>*</span>
                    </label>
                    <div className={visible === 0 ? "block" : "hidden"}>
                      <Lineloader />
                    </div>
                    <div className={visible === 1 ? "block" : "hidden"}>
                      <input
                        type="text"
                        readOnly
                        data-testid="test_description_date"
                        required
                        className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        defaultValue={descriptionDate}

                      />
                    </div>
                  </div>
                </div>

                {/* LOGO */}
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative  w-full mb-3">
                    <label
                      className={`text-sm ${color?.text} font-medium  block mb-2`}
                      htmlFor="grid-password"
                    >
                      {language?.logo}
                      <span style={{ color: "#ff0000" }}>*</span>
                    </label>
                    <div className="flex  mb-2">
                      <input
                        type="file"
                        name="myImage"
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                        onChange={(e) => {
                          uploadImage(e.target.files[0]);
                        }}
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                        focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        defaultValue=""
                      />
                    </div>
                    <Button
                      Primary={language?.Upload}
                      onClick={() => {
                        submitPhotoEdit();
                      }}
                    />
                  </div>
                </div>

                {/* buttons */}
                <div className="flex mr-2 items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                  <div
                    className={flag !== 1 && spinner === 0 ? "block" : "hidden"}
                  >
                    <Button
                      testid="test_button_disabled"
                      Primary={language?.UpdateDisabled}
                    />
                  </div>
                  <div
                    className={spinner === 0 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      testid="test_button"
                      Primary={language?.Update}
                      onClick={validationBasicDetails}
                    />
                  </div>
                  <div
                    className={spinner === 1 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      testid="test_button_spinner"
                      Primary={language?.SpinnerUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Footer color={color} Primary={english.Foot} />
    </>
  );
}

BasicDetails.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
