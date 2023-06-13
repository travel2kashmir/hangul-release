import React, { useState } from "react";
import Button from "./Button";
import Loader from "./loaders/imageloader";
import validationGalleryEdit from "./validation/gallery/galleryedit";
import WidgetStatus from "./widgetStatus";
import DragandDropImage from "./formelements/DragandDropImage";
let check = [];

function Gallery({
  language,
  allDelete,
  visible,
  images,
  setImages,
  color,
  spinner,
  spin,
  uploadImage,
}) {
  const handlecheckbox = (e) => {
    console.log(images.length);
    const { name, checked } = e.target;
    console.log(e.target);
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

  const [selectedImage, setSelectedImage] = useState(false);

  const [image, setImage] = useState({});
  const [insertImage, setInsertImage] = useState(0);

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
  const [indexImage, setIndexImage] = useState();
  const [actionEnlargeImage, setActionEnlargeImage] = useState({});
  // function to search image
  const [searchedImages, setSearchedImages] = useState([{}]);
  const [showSearchedImages, setShowSearchedImages] = useState(0);
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

  const onChangePhoto = (e, imageFile) => {
    setImage({ ...image, imageFile: e.target.files[0] });
  };

  return (
    <div>
      {/* Gallery */}
      <div id="2" className={"block"}>
        <div
          className={`${color?.whitebackground} rounded-lg sm:p-6 xl:p-8  2xl:col-span-2 my-3`}
        >
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
                <a
                  href="#"
                  onClick={() => {
                    setShowSearchedImages(0);
                    clearSearchField();
                  }}
                  className={`${color?.textgray}  hover:${
                    color?.text
                  } cursor-pointer p-1 ${
                    color?.hover
                  } rounded inline-flex justify-center ${
                    showSearchedImages === 1 ? "bg-yellow-100" : ""
                  }`}
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
                      : `${color?.textgray} bg-yellow-300 cursor-pointer p-1 ${color?.hover} rounded inline-flex
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
              {/* button to add image */}
              <Button Primary={language?.Add} onClick={() => setAddImage(1)} />
              <a
                href="#"
                className={`w-1/2 ${color?.text} ${color?.whitebackground} border border-gray-300  ${color?.hover}  focus:ring-4 focus:ring-cyan-200 font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto`}
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Import
              </a>
            </div>
          </div>
          {/* loaders for images start */}
          <div
            className={
              visible === 0 ? "block w-auto  h-auto m-6 flex" : "hidden"
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
                    images
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
                    images
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
                        <p className="text-sm text-sm text-red-700 font-light">
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
                        <p className="text-sm text-sm text-red-700 font-light">
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
                  {/* cross button */}
                  <button
                    type="button"
                    onClick={() => {
                      setImage({});
                      // document.getElementById("addgallery").reset();
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
                  {/* cross button ends */}
                </div>

                <div className={insertImage === 0 ? "block" : "hidden"}>
                  <WidgetStatus
                    name={["Upload Image", "Image Details"]}
                    selected={1}
                    color={color}
                  />
                  <form id="addgallery">
                    <DragandDropImage
                      onChangePhoto={(e) => {
                        onChangePhoto(e, "imageFile");
                      }}
                      color={color}
                    />
                  </form>
                  <div className="flex justify-end gap-2 mr-7">
                    {/* upload image button */}
                    {spin === 0 ? (
                      <Button
                        Primary={language?.Upload}
                        onClick={uploadImage}
                      />
                    ) : (
                      <Button Primary={language?.SpinnerUpload} />
                    )}

                    {/* change widget button next */}

                    <Button
                      Primary={language?.Next}
                      onClick={() => setInsertImage(1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                <div className={insertImage === 1 ? "block" : "hidden"}>
                  <WidgetStatus
                    name={["Upload Image", "Image Details"]}
                    selected={"2"}
                    color={color}
                  />
                  <form id="addgallery">
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
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
                          <p className="text-sm text-sm text-red-700 font-light">
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
                          <p className="text-sm text-sm text-red-700 font-light">
                            {error?.image_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="">
                    <div className="flex justify-end mr-7">
                      <Button
                        Primary={language?.Previous}
                        onClick={() => setInsertImage(0)}
                      >
                        Previous
                      </Button>
                      <div className={insertImage === 1 ? "block" : "hidden"}>
                        <div
                          className={
                            flag !== 1 && spinner === 0 ? "block" : "hidden"
                          }
                        >
                          <Button Primary={language?.AddDisabled} />
                        </div>
                        <div
                          className={
                            spinner === 0 && flag === 1 ? "block" : "hidden"
                          }
                        >
                          <Button
                            Primary={language?.Add}
                            onClick={() => {
                              validationGallery();
                            }}
                          />
                        </div>
                        <div
                          className={
                            spinner === 1 && flag === 1 ? "block" : "hidden"
                          }
                        >
                          <Button Primary={language?.SpinnerAdd} />
                        </div>
                      </div>
                    </div>
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
                        <p className="text-sm text-sm text-red-700 font-light">
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
                        <p className="text-sm text-sm text-red-700 font-light">
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
                        <p className="text-sm text-sm text-red-700 font-light">
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
      </div>
    </div>
  );
}

export default Gallery;
