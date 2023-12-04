import axios from "axios";
import objChecker from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateAddress from "../../validation/address";
import globalData from "../../GlobalData";
import Router from "next/router";

let i = 0;

// filtering the country from the global data
function filterCountry(props) {
    let countryFiltered = globalData?.CountryData.filter((el) => {
        return props.address_country.toUpperCase() === el.country_code;
    });
    return countryFiltered;
};

// fetching the hotel details
export async function fetchHotelDetails(currentProperty, setAddress, setCountry, setAllHotelDetails, setCountryInitial, setProvinceInitial, setCityInitial, setVisible) {

    const url = `/api/${currentProperty?.address_province.replace(
        /\s+/g,
        "-"
    )}/${currentProperty?.address_city}/${currentProperty?.property_category}s/${currentProperty?.property_id
        }`;

    axios.get(url).then((response) => {
        setAddress(response.data.address?.[i]);
        setCountry(filterCountry(response.data.address?.[i]));
        setAllHotelDetails(response.data.address?.[i]);
        setCountryInitial(response.data.address?.[i]?.address_country);
        setProvinceInitial(response.data.address?.[i]?.address_province);
        setCityInitial(response.data.address?.[i]?.address_city);
        setVisible(1);
        console.log("url  to fetch property details hitted successfully");

    })
        .catch((error) => {
            console.log("url to fetch property details, failed")
        });
};

// updates the address changes 
export const submitAddressEdit = (flag, setFlag, allHotelDetails, address, setSpinner, currentProperty, setVisible, setError, setAddress, setAllHotelDetails, setCountryInitial, setProvinceInitial, setCityInitial) => {
    if (flag === 1) {
        if (objChecker.isEqual(allHotelDetails, address)) {
            toast.warn("No change in Address detected. ", {
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
            var result = validateAddress(allHotelDetails);

            if (result === true) {
                setSpinner(1);
                const final_data = {
                    property_id: currentProperty?.property_id,
                    address_id: address?.address_id,
                    address_street_address: allHotelDetails.address_street_address,
                    address_longitude: allHotelDetails.address_longitude,
                    address_latitude: allHotelDetails.address_latitude,
                    address_landmark: allHotelDetails.address_landmark,
                    address_city: allHotelDetails.address_city?.toLowerCase(),
                    address_precision: allHotelDetails.address_precision,
                    address_zipcode: allHotelDetails.address_zipcode,
                    address_province: allHotelDetails.address_province?.toLowerCase(),
                    address_country: allHotelDetails.address_country,
                };

                const url = "/api/address";
                axios
                    .put(url, final_data, {
                        header: { "content-type": "application/json" },
                    })
                    .then((response) => {
                        setSpinner(0);
                        setFlag([]);
                        setVisible(1);
                        toast.success("Address Updated Successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setError({});
                        fetchHotelDetails(currentProperty, setAddress, setAllHotelDetails, setCountryInitial, setProvinceInitial, setCityInitial, setVisible);
                        localStorage.setItem(
                            "property",
                            JSON.stringify({
                                property_id: currentProperty?.property_id,
                                user_id: currentProperty?.user_id,
                                property_name: currentProperty?.property_name,
                                address_province:
                                    allHotelDetails.address_province?.toLowerCase(),
                                address_city: allHotelDetails.address_city?.toLowerCase(),
                                property_category: currentProperty?.property_category,
                                status: currentProperty?.status,
                                language: currentProperty?.language,
                            })
                        );
                        Router.push("./address");

                        setAllHotelDetails([]);
                    })
                    .catch((error) => {
                        setSpinner(0);
                        setFlag([]);
                        toast.error("Address Update Error!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
            } else {
                setError(result);
            }
        }
    }
};




