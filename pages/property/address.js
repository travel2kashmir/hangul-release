import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import globalData from "../../components/GlobalData";
import colorFile from "../../components/colors/Color";
import Title from "../../components/title";
import Sidebar from "../../components/Sidebar";
import Headloader from "../../components/loaders/headloader";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";
import Router from "next/router";
import Footer from "../../components/Footer";
import { english, arabic, french } from "../../components/Languages/Languages"
import InputText from "../../components/utils/InputText";
import DropDown from "../../components/utils/DropDown";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import { fetchHotelDetails, submitAddressEdit, navigationList } from "../../components/logic/property/Address";
import BreadCrumb from "../../components/utils/BreadCrumb";

var i = 0;
var currentLogged;
var language;
var currentProperty;
let colorToggle;

function Address() {
  const [visible, setVisible] = useState(0);
  const [mode, setMode] = useState();
  const [countryInitial, setCountryInitial] = useState([]);
  const [provinceInitial, setProvinceInitial] = useState([]);
  const [cityInitial, setCityInitial] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [flag, setFlag] = useState([]);
  const [color, setColor] = useState({});
  const [error, setError] = useState({});
  const [allHotelDetails, setAllHotelDetails] = useState([]);
  const [address, setAddress] = useState([]);
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState(
    globalData?.CountryData?.map((i) => {
      return { value: `${i?.country_code}`, label: `${i?.country_name}` };
    })
  );

  // runs at load time
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    colorToggle = resp?.colorToggle

    if (JSON.stringify(currentLogged) === "null") {
      Router.push(window.location.origin);
    } else {
      fetchHotelDetails(currentProperty, setAddress, setCountry, setAllHotelDetails, setCountryInitial, setProvinceInitial, setCityInitial, setVisible);
    }

  }, [])

  useEffect(() => {
    var state_code;
    setStates(
      State.getStatesOfCountry(allHotelDetails?.address_country?.toString())
    );
    state_code = State.getStatesOfCountry(
      allHotelDetails?.address_country?.toString()
    ).filter((el) => {
      return allHotelDetails?.address_province === el.name;
    });
    setAllHotelDetails({
      ...allHotelDetails,
      address_province_code: state_code?.[i]?.isoCode,
    });
  }, [allHotelDetails?.address_country, allHotelDetails?.address_province]);

  useEffect(() => {
    setCities(
      City.getCitiesOfState(
        allHotelDetails?.address_country,
        allHotelDetails?.address_province_code
      )
    );
  }, [
    allHotelDetails?.address_country,
    allHotelDetails?.address_province_code,
  ]);

  return (
    <>
      <Title name={`Engage |  ${language?.address}`} />
      <Header
        color={color}
        setColor={setColor}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
        Sec={ColorToggler}
        mode={mode}
        setMode={setMode}
      />
      <Sidebar
        color={color}
        Primary={english?.Side}
        Type={currentLogged?.user_type}
      />

      <div
        data-testid="main-content"
        className={`${color?.greybackground} px-4 py-2 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}
      >
        {/* bread crumb */}
        <BreadCrumb
          color={color}
          crumbList={navigationList(currentLogged, currentProperty)}
        />

        {/* Update Address Form */}
        <div
          data-testid="main address"
          className={`${color?.whitebackground} shadow rounded-lg px-12 sm:p-6 xl:p-8  2xl:col-span-2`}
        >
          <h6
            className={`${color?.text} text-xl  flex leading-none pl-6 pt-2 font-bold`}
          >
            {language?.address}
          </h6>

          <div className="pt-6">
            <div className=" md:px-4 mx-auto w-full">
              <div className="flex flex-wrap">

                {/* //streetaddress */}
                <InputText
                  data-testid="streetaddress"
                  label={language?.streetaddress}
                  visible={visible}
                  defaultValue={address?.address_street_address}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_street_address: e.target.value,
                      },
                      setFlag(1)
                    )
                  }
                  error={error?.address_street_address}
                  color={color}
                  req={true}
                  tooltip={true}
                />

                {/* Landmark */}

                <InputText
                  data-testid="landmark"
                  label={language?.landmark}
                  visible={visible}
                  defaultValue={address?.address_landmark}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      { ...allHotelDetails, address_landmark: e.target.value },
                      setFlag(1)
                    )
                  }
                  error={error?.address_landmark}
                  color={color}
                  req={true}
                  tooltip={true}
                />


                {/* country */}
                <DropDown
                  data-testid="country"
                  label={language?.country}
                  visible={visible}
                  defaultValue={country?.[i]?.country_name}
                  onChangeAction={(e) =>
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_country: e.target.value,
                        address_province: "",
                        address_city: "",
                        address_zipcode: "",
                      },
                      setFlag(1)
                    )
                  }
                  error={error?.propertycategory}
                  color={color}
                  req={true}
                  options={countries}
                  tooltip={true}
                />

                {/* province */}
                <DropDown
                  data-testid="province"
                  label={language?.province}
                  visible={visible}
                  defaultValue={
                    countryInitial === allHotelDetails?.address_country ? (
                      <> {allHotelDetails?.address_province}</>
                    ) : (
                      <>{`Select province`}</>
                    )
                  }
                  onChangeAction={(e) => {
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_province: JSON.parse(e.target.value).name,
                        address_province_code: JSON.parse(e.target.value)
                          .isoCode,
                        address_city: "",
                        address_zipcode: "",
                      },
                      setFlag(1)
                    );
                  }}
                  error={error?.propertycategory}
                  color={color}
                  req={true}
                  tooltip={true}
                  options={states?.map((i) => ({
                    value: `${JSON.stringify(i)}`,
                    label: `${i?.name}`,
                  }))}
                />

                {/*CITY*/}

                <DropDown
                  data-testid="city"
                  label={language?.city}
                  visible={visible}
                  defaultValue={
                    countryInitial === allHotelDetails?.address_country &&
                      provinceInitial === allHotelDetails?.address_province ? (
                      <>{`${address?.address_city}`}</>
                    ) : (
                      <>{`${language?.select}`}</>
                    )
                  }
                  onChangeAction={(e) => {
                    setAllHotelDetails(
                      {
                        ...allHotelDetails,
                        address_city: e.target.value,
                        address_zipcode: "",
                      },
                      setFlag(1)
                    );
                  }}
                  error={error?.propertycategory}
                  color={color}
                  req={true}
                  tooltip={true}
                  options={cities?.map((i) => ({
                    value: `${i.name}`,
                    label: `${i?.name}`,
                  }))}
                />
                {/* POSTAL CODE */}
                <InputText
                  data-testid="postalcode"
                  label={language?.postalcode}
                  visible={visible}
                  defaultValue={
                    allHotelDetails.address_zipcode != ""
                      ? allHotelDetails.address_zipcode
                      : ""
                  }
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_zipcode: e.target.value,
                    });
                    setFlag(1);
                  }}
                  error={error?.address_zipcode}
                  color={color}
                  req={true}
                  tooltip={true}
                />


                {/* Latitude */}

                <InputText
                  data-testid="latitude"
                  label={language?.latitude}
                  visible={visible}
                  defaultValue={address?.address_latitude}
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_latitude: parseFloat(e.target.value),
                    });
                    setFlag(1);
                  }}
                  error={error?.address_latitude}
                  color={color}
                  req={true}
                  tooltip={true}
                />

                {/* Longitude */}

                <InputText
                  data-testid="longitude"
                  label={language?.longitude}
                  visible={visible}
                  defaultValue={address?.address_longitude}
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_longitude: parseFloat(e.target.value),
                    });
                    setFlag(1);
                  }}
                  error={error?.address_longitude}
                  color={color}
                  req={true}
                  tooltip={true}
                />
                {/* PRECISION */}
                <InputText
                  data-testid="precision"
                  label={`${language?.precision}(${language?.inmeters})`}
                  visible={visible}
                  defaultValue={address?.address_precision}
                  onChangeAction={(e) => {
                    setAllHotelDetails({
                      ...allHotelDetails,
                      address_precision: parseInt(e.target.value),
                    });
                    setFlag(1);
                  }}
                  error={error?.address_precision}
                  color={color}
                  req={true}
                  tooltip={true}
                />

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3"></div>
                </div>

                <div className="flex items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                  <div
                    className={flag !== 1 && spinner === 0 ? "block" : "hidden"}
                  >
                    <Button
                      data-testid="update"
                      Primary={language?.UpdateDisabled}
                    />
                  </div>
                  <div
                    className={spinner === 0 && flag === 1 ? "block" : "hidden"}
                  >
                    <Button
                      Primary={language?.Update}
                      onClick={() => {
                        submitAddressEdit(flag, setFlag, allHotelDetails, address, setSpinner, currentProperty, setVisible, setError, setAddress, filterCountry, setAllHotelDetails, setCountryInitial, setProvinceInitial, setCityInitial);
                        // submitAddressEdit();
                      }}
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

      <Footer data-testid="footer" color={color} Primary={english.Foot} />
    </>
  );
}
export default Address;