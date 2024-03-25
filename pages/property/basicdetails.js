import React, { useState, useEffect } from "react";
import Title from "../../components/title";
import Lineloader from "../../components/loaders/lineloader";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import {english,french,arabic} from "../../components/Languages/Languages";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
var language;
var currentProperty;
var currentLogged;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let colorToggle;
import InputText from "../../components/utils/InputText";
import InputTextBox from "../../components/utils/InputTextBox";
import DateInput from "../../components/utils/DateInput";
import DropDown from "../../components/utils/DropDown";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from "../../components/utils/BreadCrumb";
import { fetchAllPropertyTypes, fetchBasicDetails, descriptionDate, validationBasicDetails, uploadImage, submitPhotoEdit, navigationList } from "../../components/logic/property/BasicDetails";

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
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [uploadImageSpin, setUploadImageSpin] = useState(false);

  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle

    if (JSON.stringify(currentLogged) === "null") {
      router?.push(window.location.origin);
    } else {
      fetchAllPropertyTypes(setAllPropertyTypes);
      fetchBasicDetails(currentProperty, setBasicDetails, setAllHotelDetails, setImageLogo, setVisible);
    }
  }, [])

return (
    <>
      <Title name={`Engage |  ${language?.basicdetails}`} />

      <Header
        color={color}
        setColor={setColor}
        Primary={english.Side}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
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
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />


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
                  {imageLogo ? <img src={imageLogo} width="164px" height="40px" alt={basicDetails?.property_name} /> :
                   <div className={`hotelLogo  border border-2 
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
                          // uploadImage(e.target.files[0]);
                          
                          uploadImage(e.target.files[0],(e)=>setUploadImageSpin(e),(e)=>setImageLogo(e));
                        }}
                        className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                        focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                        defaultValue=""
                      />
                    </div>
                    <Button
                      Primary={language?.Upload}
                      onClick={() => {
                        // submitPhotoEdit();
                        submitPhotoEdit(currentProperty, imageLogo, setBasicDetails, setAllHotelDetails, setImageLogo, setVisible, setUploadImageSpin, router);
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
                      onClick={() => validationBasicDetails(setError, flag, setFlag, setSpinner, currentProperty, allHotelDetails, setAllHotelDetails, basicDetails, setBasicDetails, setImageLogo, setVisible, router)}
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
