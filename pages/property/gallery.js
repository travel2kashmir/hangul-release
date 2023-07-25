import React, { useRef } from "react";
import objChecker from "lodash";
import Title from "../../components/title";
import colorFile from "../../components/colors/Color";
import validateGallery from "../../components/validation/gallery/galleryadd";
import validateEditGallery from "../../components/validation/gallery/galleryedit";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Link from "next/link";
import english from "../../components/Languages/en";
import french from "../../components/Languages/fr";
import arabic from "../../components/Languages/ar";
import Footer from "../../components/Footer";
import Loader from "../../components/loaders/imageloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headloader from "../../components/loaders/headloader";
import ImageDemo from "../../components/utils/ImageDemo";
const logger = require("../../services/logger");
var language;
var currentProperty;
var currentLogged;
let checked;
let check = [];
let colorToggle;
import Router from "next/router";

function Gallery() {
  const [visible, setVisible] = useState(0);
  const [color, setColor] = useState({});
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [spin, setSpin] = useState(0);
  const [selectedImage, setSelectedImage] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState({});
  const [images, setImages] = useState([]);
  const [editImage, setEditImage] = useState(0);
  const [deleteImage, setdeleteImage] = useState(0);
  const [actionImage, setActionImage] = useState({});
  const [updateImage, setUpdateImage] = useState({});
  const [flag, setFlag] = useState([]);
  const [addImage, setAddImage] = useState(0);
  const [addURLImage, setAddURLImage] = useState(0);
  const [enlargeImage, setEnlargeImage] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState();
  const [error, setError] = useState({});
  const [mode, setMode] = useState();
  const [indexImage, setIndexImage] = useState();
  const [actionEnlargeImage, setActionEnlargeImage] = useState({});

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

  useEffect(() => {
    if (JSON.stringify(currentLogged) === "null") {
      Router.push(window.location.origin);
    } else {
      fetchHotelDetails();
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
    Router.push("./gallery");
  };

  /* Function call to fetch Current Property Details when page loads */
  const fetchHotelDetails = async () => {
    const url = `/api/${currentProperty.address_province.replace(
      /\s+/g,
      "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category}s/${currentProperty.property_id
      }`;
    axios
      .get(url)
      .then((response) => {
        setGallery(response.data);
        setImages(response.data?.images);
        setEnlargedImage(
          response.data?.images?.map((item, idx) => {
            return {
              image_id: item?.image_id,
              image_title: item?.image_title,
              image_link: item?.image_link,
              image_idx: idx,
              image_description: item?.image_description,
            };
          })
        );
        logger.info("url  to fetch property details hitted successfully");
        setVisible(1);
      })
      .catch((error) => {
        logger.error("url to fetch property details, failed");
      });
  };

  const onChangePhoto = (e, imageFile) => {
    setImage({ ...image, imageFile: e.target.files[0] });
  };

  /* Function to upload image*/
  const uploadImage = () => {
    setSpin(1);
    const imageDetails = image.imageFile;
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir");
    formData.append("enctype", "multipart/form-data");
    axios
      .post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
      .then((response) => {
        setImage({ ...image, image_link: response?.data?.secure_url });
        setSpin(0);
      })
      .catch((error) => {
        setSpin(0);
        toast.error("Image upload error! ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Image upload error!", error);
      });
  };

  /* Function to add images*/
  const submitAddImage = () => {
    if (flag === 1) {
      if (actionImage.length !== 0) {
        setSpinner(1);
        const imagedata = [
          {
            property_id: currentProperty?.property_id,
            image_link: image.image_link,
            image_title: actionImage.image_title,
            image_description: actionImage.image_description,
            image_category: "outside",
          },
        ];
        const finalImage = { images: imagedata };
        axios
          .post(`/api/gallery`, finalImage)
          .then((response) => {
            setSpinner(0);
            toast.success("Image Added Successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            fetchHotelDetails();
            setImage({});
            setActionImage({});
            Router.push("./gallery");
            if (addImage === 1) {
              setAddImage(0);
              document.getElementById("addgallery").reset();
            }
            if (addURLImage === 1) {
              setAddURLImage(0);
              document.getElementById("addurlgallery").reset();
            }
          })
          .catch((error) => {
            if (addImage === 1) {
              document.getElementById("addgallery").reset();
            }
            if (addURLImage === 1) {
              document.getElementById("addurlgallery").reset();
            }
            setSpinner(0);
            toast.error(" Gallery Error", {
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
  };

  /* Function to edit images*/
  const updateImageDetails = () => {
    if (flag === 1) {
      if (objChecker.isEqual(actionImage, updateImage)) {
        toast.warn("No change in Image Details detected. ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAllHotelDetails([]);
      } else {
        setSpinner(1);
        const final_data = {
          image_id: actionImage?.image_id,
          image_title: actionImage.image_title,
          image_description: actionImage.image_description,
        };
        const url = "/api/images";
        axios
          .put(url, final_data, {
            header: { "content-type": "application/json" },
          })
          .then((response) => {
            setSpinner(0);
            setEditImage(0);
            toast.success("Gallery Updated Successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            document.getElementById("editImage").reset();
            fetchHotelDetails();
            setAllHotelDetails([]);
            setEnlargeImage(0);
            setActionImage({});
            setError({});
            Router.push("./gallery");
          })
          .catch((error) => {
            setSpinner(0);
            toast.error("Gallery Update Error! ", {
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
  };

  /* Function to delete images*/
  const submitDelete = () => {
    setSpinner(1);
    const url = `/api/${actionImage.image_id}`;
    axios
      .delete(url)
      .then((response) => {
        setSpinner(0);
        setdeleteImage(0);
        toast.success("Image Deleted Successfully", {
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
      })
      .catch((error) => {
        setSpinner(0);
        toast.error("Gallery Delete Error!", {
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

  // Add Validation Gallery
  const validationGallery = () => {
    setError({});
    var result = validateGallery(actionImage, image.image_link);
    if (result === true) {
      submitAddImage();
    } else {
      setError(result);
    }
  };

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

  // Select multiple delete images
  const allDelete = () => {
    setdeleteImage(1);
  };

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

  // function to search image
  const [searchedImages, setSearchedImages] = useState([{}]);
  const [showSearchedImages, setShowSearchedImages] = useState(0);
  const clearSearchField = () => {
    document.getElementById("imageSearchBox").reset();
  };

  const searchImage = (data) => {
    let matchedImages = images.filter(
      (i) => i.image_title.toLowerCase().match(data.toLowerCase()) || i.image_description.toLowerCase().match(data.toLowerCase())
    );

    setSearchedImages(matchedImages);

    setShowSearchedImages(1);
  };

  // key detection left right to be usedd when implementing keyboard change of images
  // useEffect(() => {
  //   // key down set on document 
  //   document.onkeydown = checkKey;
  //   function checkKey(e) {
  //     e = e || window.event;
  //     console.log(e.key);
  //     if (e.keyCode == "37") {
  //       console.log(e.key);
  //       setActionEnlargeImage(
  //         enlargedImage
  //           .filter((i) => i.image_idx === indexImage - 1)
  //           .map((j) => {
  //             return {
  //               image_id: j?.image_id,
  //               image_title: j?.image_title,
  //               image_idx: j?.image_idx,
  //               image_description: j?.image_description,
  //               image_link: j?.image_link,
  //             };
  //           })?.[0]
  //       );
  //       setIndexImage(indexImage - 1);

  //       //left(e.key); // left arrow
  //     } else if (e.keyCode == "39") {
  //       console.log(e.key);

  //       setActionEnlargeImage(
  //         enlargedImage
  //           .filter((i) => i.image_idx === indexImage + 1)
  //           .map((j) => {
  //             return {
  //               image_id: j?.image_id,
  //               image_title: j?.image_title,
  //               image_idx: j?.image_idx,
  //               image_description: j?.image_description,
  //               image_link: j?.image_link,
  //             };
  //           })?.[0]
  //       );
  //       setIndexImage(indexImage + 1);

  //       //right(e.key); // right arrow
  //     }
  //   }
  // }, []);

  return (
    <>
      <Title name={`Engage |  ${language?.gallery}`} />
      {/* Header   */}
      <Header
        color={color}
        Primary={english.Side}
        Type={currentLogged?.user_type}
        Sec={colorToggler}
        mode={mode}
        setMode={setMode}
      />
      {/* Sidebar */}
      <Sidebar
        color={color}
        Primary={english.Side}
        Type={currentLogged?.user_type}
      />

      {/* Body */}
      <div
        id="main-content"
        className={`${color?.greybackground} px-4 pt-24 pb-6 relative overflow-y-auto lg:ml-64`}
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
                  className={`${color?.text} capitalize text-base font-medium  inline-flex items-center`}
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
                      <a>{currentProperty?.property_name}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <div
                  className={`${color?.textgray} capitalize text-base font-medium  inline-flex items-center`}
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
                    {language?.gallery}
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        {/* Gallery */}
        <div
          className={`${color?.whitebackground} shadow rounded-lg  px-10 p-6  -mb-4 sm:p-8 xl:p-8  2xl:col-span-2`}
        >
          {/* Header */}
          <div className="ml-4 mr-5">
            <h6
              className={`text-xl mb-2 flex leading-none  pt-2 font-bold ${color?.text}`}
            >
              {language?.gallery}{" "}
            </h6>
            <div className="sm:flex my-2">
              <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3  sm:mb-0">
                {/* input text for search start */}
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
                {/* input text for search end */}

                {/* icons for delete and other operations start */}
                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                  <a
                    href="#"
                    onClick={() => {
                      setShowSearchedImages(0);
                      clearSearchField();
                    }}
                    className={`${color?.textgray}  hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center ${showSearchedImages != 1 ? '' : 'bg-gray-100'}`}
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
                        : `${color?.textgray} bg-slate-300 cursor-pointer p-1 ${color?.hover} rounded inline-flex
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
              {/* icons for delete and other operations end */}

              {/* Add new image options start */}
              <div className="flex items-center space-x-2 sm:space-x-3 lg:ml-auto">
                <Button
                  Primary={language?.Add}
                  onClick={() => setAddImage(1)}
                />
                <Button
                  Primary={language?.AddfromURL}
                  onClick={() => setAddURLImage(1)}
                />
              </div>
              {/* Add new image options end */}
            </div>
          </div>
          {/* Gallery Form */}

          {/* loaders for images start */}
          <div
            className={
              visible === 0 ? "w-auto  h-auto m-6 flex" : "hidden"
            }
          >
            <div className="mr-2">
              {" "}
              <Loader />
            </div>
            <div className="mx-2">
              {" "}
              <Loader />
            </div>
            <div>
              {" "}
              <Loader />
            </div>
          </div>
          {/* loaders for images end */}

          {/* main gallery start */}
          <div className={visible === 1 ? "block" : "hidden"}>
            {/* fetched images */}
            <div className={showSearchedImages === 0 ? "block" : "hidden"}>
              <div className="flex-wrap container grid sm:grid-cols-2 py-4 -pl-6 lg:grid-cols-3 gap-4">
                {images?.map((item, idx) => {
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
                                  setIndexImage(idx);
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
                  );
                })}
              </div>
            </div>

            {/* searched images display */}
            <div className={showSearchedImages === 1 ? "block" : "hidden"}>
              <div className="flex-wrap container grid sm:grid-cols-2 py-4 -pl-6 lg:grid-cols-3 gap-4">
                {searchedImages?.map((item, idx) => {
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
                                  setIndexImage(idx);
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
                  );
                })}
              </div>
            </div>
          </div>
          {/* main gallery Ends */}
        </div>

        {/* Modal Image Enlarge */}
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

                  setActionEnlargeImage(
                    enlargedImage
                      .filter((i) => i.image_idx === indexImage - 1)
                      .map((j) => {
                        return {
                          image_id: j?.image_id,
                          image_title: j?.image_title,
                          image_idx: j?.image_idx,
                          image_description: j?.image_description,
                          image_link: j?.image_link,
                        };
                      })?.[0]
                  );
                  setIndexImage(indexImage - 1);
                }}
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
              </svg>
            </div>

            <div className="relative w-fit max-w-2xl px-4 h-full md:h-auto">
              <div
                className={` ${color.tableheader} rounded-lg shadow relative`}
              >


                <img
                  src={actionEnlargeImage?.image_link}
                  alt="pic_room"
                  className=""
                  style={{ height: "100vh" }}
                />

                <div className="relative -mt-20 z-30 backdrop-blur-sm bg-white/20 flex justify-between p-5">
                  <h3 className={`text-xl ${color?.text} drop-shadow-2xl shadow-black`}>
                    {actionEnlargeImage?.image_title}
                  </h3>
                  {/* edit button  */}
                  <button
                    onClick={() => {
                      setEditImage(1);
                      setActionImage(actionEnlargeImage);
                      setUpdateImage(actionEnlargeImage);
                    }}
                    className={` px-1 mr-1 pt-1 hover:${color?.sidebar} ${color?.text}
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

                  {/* close button  */}
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
              </div>
            </div>
            {/* right button to change next image in carousal*/}
            <div className="flex justify-end mr-2 ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  indexImage >= images?.length - 1
                    ? "hidden"
                    : "block cursor-pointer"
                }
                onClick={() => {
                  setActionEnlargeImage(
                    enlargedImage
                      .filter((i) => i.image_idx === indexImage + 1)
                      .map((j) => {
                        return {
                          image_id: j?.image_id,
                          image_title: j?.image_title,
                          image_idx: j?.image_idx,
                          image_description: j?.image_description,
                          image_link: j?.image_link,
                        };
                      })?.[0]
                  );
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

        {/* Modal edit */}
        <div className={editImage === 1 ? "block" : "hidden"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={`${color?.whitebackground} rounded-lg shadow relative`}
              >
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    {language?.edit} {language?.image}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setActionImage({});
                      setError({});
                      document.getElementById("editImage").reset();
                      setEditImage(0);
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <form id="editImage">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <img
                          src={actionImage?.image_link}
                          alt="Property Image"
                          height={"200"}
                          width={"400"}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.image} {language?.description}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <textarea
                          rows="6"
                          columns="60"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={(e) =>
                            setActionImage(
                              {
                                ...actionImage,
                                image_description: e.target.value,
                              },
                              setFlag(1)
                            )
                          }
                          defaultValue={actionImage?.image_description}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_description}
                        </p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.image} {language?.titl}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={actionImage?.image_title}
                          onChange={(e) =>
                            setActionImage(
                              {
                                ...actionImage,
                                image_title: e.target.value,
                              },
                              setFlag(1)
                            )
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          placeholder="Image Title"
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_title}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <div
                    className={flag !== 1 && spinner === 0 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.UpdateDisabled} />
                  </div>
                  <div
                    className={spinner === 0 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      Primary={language?.Update}
                      onClick={validationGalleryEdit}
                    />
                  </div>
                  <div
                    className={spinner === 1 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.SpinnerUpdate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Add */}
        <div className={addImage === 1 ? "block" : "hidden"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={`${color?.whitebackground} rounded-lg shadow relative`}
              >
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    {language?.addnewimage}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setImage({});
                      document.getElementById("addgallery").reset();
                      setAddImage(0);
                      setActionImage({});
                      setError({});
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
                <form id="addgallery">
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.imageupload}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <div className="flex">
                          <input
                            type="file"
                            name="myImage"
                            accept="image/png, image/gif, image/jpeg, image/jpg"
                            onChange={(e) => {
                              onChangePhoto(e, "imageFile");
                            }}
                            className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                                focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                            defaultValue=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-2">
                          <p className="text-sm text-red-700 font-light">
                            {error?.image_link}
                          </p>
                          {spin === 0 ? (
                            <Button
                              Primary={language?.Upload}
                              onClick={uploadImage}
                            />
                          ) : (
                            <Button Primary={language?.SpinnerUpload} />
                          )}
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3 mt-2">
                        {/* displays image once it is loaded else demoImage */}
                        {image?.image_link != undefined ?
                          <img
                            className={` ${color?.text}`}
                            src={image?.image_link}
                            alt="Image Preview"
                            style={{ height: "150px", width: "250px" }}
                          /> :
                          <ImageDemo width={'250'} height={'150'} bgColor={'bg-gray-400'} />}


                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} capitalize font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.image} {language?.titl}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setActionImage(
                              { ...actionImage, image_title: e.target.value },
                              setFlag(1)
                            )
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          placeholder="Image Title"
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_title}
                        </p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.image} {language?.description}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <textarea
                          rows="2"
                          columns="60"
                          onChange={(e) =>
                            setActionImage(
                              {
                                ...actionImage,
                                image_description: e.target.value,
                              },
                              setFlag(1)
                            )
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue=""
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <div
                    className={flag !== 1 && spinner === 0 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.AddDisabled} />
                  </div>
                  <div
                    className={spinner === 0 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      Primary={language?.Add}
                      onClick={() => {
                        validationGallery();
                      }}
                    />
                  </div>
                  <div
                    className={spinner === 1 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.SpinnerAdd} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Add from url */}
        <div className={addURLImage === 1 ? "block" : "hidden"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div
                className={`${color?.whitebackground} rounded-lg shadow relative`}
              >
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className={`${color?.text} text-xl font-semibold`}>
                    {language?.addnewimage}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setImage({});
                      document.getElementById("addurlgallery").reset();
                      setAddURLImage(0);
                      setImage({});
                      setActionImage({});
                      setError({});
                    }}
                    className="text-gray-400 bg-transparent
                                 hover:bg-gray-200 
                                 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                <form id="addurlgallery">
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} capitalize font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.imagelink}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setImage(
                              { ...Image, image_link: e.target.value },
                              setFlag(1)
                            )
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_link}
                        </p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} capitalize font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.image} {language?.titl}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setActionImage(
                              { ...actionImage, image_title: e.target.value },
                              setFlag(1)
                            )
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_title}
                        </p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className={`text-sm ${color?.text} font-medium  block mb-2`}
                          htmlFor="grid-password"
                        >
                          {language?.image} {language?.description}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </label>
                        <textarea
                          rows="2"
                          columns="60"
                          onChange={(e) =>
                            setActionImage(
                              {
                                ...actionImage,
                                image_description: e.target.value,
                              },
                              setFlag(1)
                            )
                          }
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue=""
                        />
                        <p className="text-sm text-red-700 font-light">
                          {error?.image_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <div
                    className={flag !== 1 && spinner === 0 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.AddDisabled} />
                  </div>
                  <div
                    className={spinner === 0 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      Primary={language?.Add}
                      onClick={() => {
                        validationGallery();
                      }}
                    />
                  </div>
                  <div
                    className={spinner === 1 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button Primary={language?.SpinnerAdd} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Delete */}
        <div className={deleteImage === 1 ? "block" : "hidden"}>
          <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
            <div className="relative w-full max-w-md px-4 h-full md:h-auto">
              <div
                className={`rounded-lg shadow relative ${color?.whitebackground}`}
              >
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => setdeleteImage(0)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="delete-user-modal"
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

                <div className="p-6 pt-0 text-center">
                  <svg
                    className="w-20 h-20 text-red-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3
                    className={`text-base font-normal ${color?.deltext} mt-5 mb-6`}
                  >
                    {language?.areyousureyouwanttodelete}
                  </h3>

                  {spinner === 0 ? (
                    <>
                      <Button
                        Primary={language?.Delete}
                        onClick={() => deleteMultiple()}
                      />
                      <Button
                        Primary={language?.Cancel}
                        onClick={() => setdeleteImage(0)}
                      />
                    </>
                  ) : (
                    <Button Primary={language?.SpinnerDelete} />
                  )}
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
      {/* Footer */}
      <Footer color={color} Primary={english.Foot} />
    </>
  );
}

export default Gallery;
Gallery.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
