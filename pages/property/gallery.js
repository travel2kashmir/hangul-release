import React, { useState, useEffect } from "react";
import Title from "../../components/title";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { english, arabic, french } from "../../components/Languages/Languages";
import Footer from "../../components/Footer";
import Loader from "../../components/loaders/imageloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageDemo from "../../components/utils/ImageDemo";
import Router from "next/router";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { fetchHotelDetails, navigationList, onChangePhoto, uploadImage, validationGallery, validationGalleryEdit, handlecheckbox, allDelete, deleteMultiple, searchImage } from "../../components/logic/property/Gallery";
import Modal from "../../components/NewTheme/modal";
import { AddFromUrl, DeleteSelectedImages, AddNewImages, EditImage } from "../../components/Gallery";
var language;
var currentProperty;
var currentLogged;


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

  // checkbox state
  const [check, setCheck] = useState([]);

  // function to search image
  const [searchedImages, setSearchedImages] = useState([{}]);
  const [showSearchedImages, setShowSearchedImages] = useState(0);

  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    if (JSON.stringify(currentLogged) === "null") {
      Router.push(window.location.origin);
    } else {
      fetchHotelDetails(currentProperty, setGallery, setImages, setEnlargedImage, setVisible);
    }
  }, [])

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
        fetchHotelDetails(currentProperty, setGallery, setImages, setEnlargedImage, setVisible);
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

  const clearSearchField = () => {
    document.getElementById("imageSearchBox").reset();
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
        setColor={setColor}
        Primary={english.Side}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
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
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

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
                      onChange={(e) => searchImage(e.target.value, images, setSearchedImages, setShowSearchedImages)}
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
                    onClick={() => { check.length != 0 ? allDelete(setdeleteImage) : toast.error('APP: Select image to delete') }}
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
          {visible === 1 ?
            showSearchedImages === 0 ? <div className="flex-wrap container grid sm:grid-cols-2 py-4 -pl-6 lg:grid-cols-3 gap-4">
              {images?.map((item, idx) => {
                return (
                  <>
                    <div
                      className="block text-blueGray-600  text-xs font-bold border rounded-lg"
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
                              handlecheckbox(e, images, setImages, setCheck);
                            }}
                            className="bottom-0 right-0 cursor-pointer absolute bg-gray-900 opacity-30 m-1 border-gray-300 text-cyan-600  checked:opacity-100 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded-full"
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

              :
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
                                handlecheckbox(e, images, setImages, setCheck);
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
              </div> : undefined


          }
          {/* main gallery Ends */}
        </div>

        {/* Modal Image Enlarge */}
        {enlargeImage === 1 &&
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
        }

        {/* Modal edit */}
        {editImage === 1 &&
          <Modal
            title={`${language?.edit} ${language?.image}`}
            description={<EditImage
              language={language} color={color} error={error} setError={setError} flag={flag} setFlag={setFlag}
              actionImage={actionImage} setActionImage={setActionImage}
              spinner={spinner} setSpinner={setSpinner} currentProperty={currentProperty} setGallery={setGallery} setEnlargedImage={setEnlargedImage}
              setVisible={setVisible} Router={Router} updateImage={updateImage} setAllHotelDetails={setAllHotelDetails} setEditImage={setEditImage} setEnlargeImage={setEnlargeImage}
            />}
            setShowModal={() => {
              setActionImage({});
              setError({});
              document.getElementById("editImage").reset();
              setEditImage(0);
            }}
          />
        }

        {/* Modal Add */}

        {addImage === 1 && <Modal
          title={language?.addnewimage}
          description={<AddNewImages
            language={language} color={color} error={error} setError={setError} flag={flag} setFlag={setFlag}
            actionImage={actionImage} setActionImage={setActionImage}
            spin={spin}
            spinner={spinner} setSpinner={setSpinner} currentProperty={currentProperty} image={image}
            setImage={setImage} setGallery={setGallery} setImages={setImages} setEnlargedImage={setEnlargedImage}
            setVisible={setVisible} Router={Router} addImage={addImage} addURLImage={addURLImage} setAddImage={setAddImage}
            setAddURLImage={setAddURLImage} />}
          setShowModal={() => {
            setImage({});
            document.getElementById("addgallery").reset();
            setAddImage(0);
            setActionImage({});
            setError({});
          }} />}
        {/* Modal Add from url */}
        {
          addURLImage === 1 && <Modal
            title={language?.addnewimage}
            description={<AddFromUrl
              language={language} color={color} error={error} setError={setError} flag={flag} setFlag={setFlag}
              validationGallery={validationGallery} actionImage={actionImage} setActionImage={setActionImage}
              spinner={spinner} setSpinner={setSpinner} currentProperty={currentProperty} image={image}
              setImage={setImage} setGallery={setGallery} setImages={setImages} setEnlargedImage={setEnlargedImage}
              setVisible={setVisible} Router={Router} addImage={addImage} addURLImage={addURLImage} setAddImage={setAddImage}
              setAddURLImage={setAddURLImage} />}
            setShowModal={() => {
              setImage({});
              document.getElementById("addurlgallery").reset();
              setAddURLImage(0);
              setImage({});
              setActionImage({});
              setError({});
            }} />
        }

        {/* Modal Delete */}
        {deleteImage === 1 && <Modal
          description={
            <DeleteSelectedImages color={color} language={language} spinner={spinner} deleteMultiple={deleteMultiple} setdeleteImage={setdeleteImage} check={check} currentProperty={currentProperty} setSpinner={setSpinner} setGallery={setGallery} setImages={setImages} setEnlargedImage={setEnlargedImage} setVisible={setVisible} Router={Router} />}
          setShowModal={() => setdeleteImage(0)} />
        }

      </div >

      {/* Toast Container */}
      < ToastContainer
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

      {/* Footer */}
      < Footer color={color} Primary={english.Foot} />
    </>
  );
}

export default Gallery;
Gallery.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
