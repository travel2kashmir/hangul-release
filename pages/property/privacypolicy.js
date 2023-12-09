import React, { useState, useEffect } from 'react';
import { english, arabic, french } from '../../components/Languages/Languages';
import Title from '../../components/title';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Headloader from '../../components/loaders/headloader';
import InputTextBox from '../../components/utils/InputTextBox';
import router from 'next/router';
import DarkModeLogic from '../../components/darkmodelogic';
import colorFile from "../../components/colors/Color";
import Link from 'next/link';
import axios from "axios";
import Button from '../../components/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import objChecker from "lodash";
import Footer from '../../components/Footer';
import { InitialActions, ColorToggler } from "../../components/initalActions";
import BreadCrumb from '../../components/utils/BreadCrumb';
var language;
var currentProperty;
var currentLogged;
let colorToggle;

function PrivacyPolicy() {
    const [color, setColor] = useState({})
    const [mode, setMode] = useState();
    const [visible, setVisible] = useState(0);
    const [privacy, setPrivacy] = useState(1);
    const [unEditedData, setUnEditedData] = useState(0);
    const [spinner, setSpinner] = useState(0);
    const [error, setError] = useState({});
    const [flag, setFlag] = useState([]);


    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        colorToggle = resp?.colorToggle

        fetchPrivacy();
        router.push(window.location)
    }, [])

    // fetch data 
    function fetchPrivacy() {
        const { address_province, address_city, property_category, property_id } =
            currentProperty;
        const url = `/api/${address_province.replace(
            /\s+/g,
            "-"
        )}/${address_city}/${property_category}s/${property_id}`;

        axios.get(url).then((response) => {
            setVisible(1)
            if (Object.keys(response.data).includes('privacy_conditions') === true) {
                setUnEditedData(response.data?.privacy_conditions[0])
                setPrivacy(response.data?.privacy_conditions[0])
            }
            else {
                setUnEditedData({ "property_id": response.data.property_id })
                setPrivacy({ "property_id": response.data.property_id })
            }

        }).catch((error) => {
            console.log(error);
        })

    }

    /* Edit Basic Details Function */
    const submitPrivacy = () => {
        if (flag === 1) {
            if (objChecker.isEqual(unEditedData, privacy)) {
                toast.warn("APP: No change in Privacy policy and T&C detected. ", {
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
                console.log(privacy)
                const final_data = {
                    "privacy_conditions": [privacy]
                }

                const url = "/api/privacy_conditions";
                axios
                    .post(url, final_data, {
                        header: { "content-type": "application/json" },
                    })
                    .then((response) => {
                        setSpinner(0);
                        toast.success("API: Privacy Policy and T&C Updated Successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setFlag([]);
                    })
                    .catch((error) => {
                        setSpinner(0);
                        toast.error("API:Privacy Policy and T&C Update Error!", {
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

    function navigationList(currentLogged, currentProperty) {
        return ([
            {
                icon: "homeIcon",
                text: "Home",
                link: currentLogged?.id.match(/admin.[0-9]*/)
                    ? "../admin/adminlanding"
                    : "./landing"
            },
            {
                icon: "rightArrowIcon",
                text: [currentProperty?.property_name],
                link: "./propertysummary"
            },
            {
                icon: "rightArrowIcon",
                text: "Privacy Policy",
                link: ""
            }
        ])
    }

    return (

        <>
            <Title name={`Engage |  ${language?.privacypolicy}`} />
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
            {/* main content  */}
            <div
                id="main-content"
                className={`${color?.greybackground} h-screen px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}
            >
                {/* bread crumb start*/}
                <BreadCrumb
                    color={color}
                    crumbList={navigationList(currentLogged, currentProperty)}
                />

                {/* bread crumb end*/}
                {/* form fields  start*/}
                <div
                    className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}
                >
                    <h6
                        className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}
                    >
                        {language?.privacypolicy} & {language?.termsandconditions}
                    </h6>
                    <div className="pt-6">
                        <div className=" md:px-4 mx-auto w-full">
                            <div className="flex flex-wrap">
                                {/*Privacy Policy */}
                                <InputTextBox
                                    label={language?.privacypolicy}
                                    visible={visible}
                                    defaultValue={privacy.privacy_policy}
                                    wordLimit={1000}
                                    onChangeAction={(e) => {
                                        if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                                            setError({})
                                            setPrivacy(
                                                {
                                                    ...privacy,
                                                    privacy_policy: e.target.value,
                                                },
                                                setFlag(1)
                                            )
                                        }
                                        else {
                                            setError({ privacy_policy: 'word limit reached' })
                                        }

                                    }

                                    }
                                    error={error?.privacy_policy}
                                    color={color}
                                    req={true}
                                    tooltip={false}
                                />

                                {/*Terms and conditions*/}
                                <InputTextBox
                                    label={language?.termsandconditions}
                                    visible={visible}
                                    defaultValue={privacy.terms_condition}
                                    wordLimit={1000}
                                    onChangeAction={(e) => {
                                        if (e.target.value.length >= 0 && e.target.value.length < 1000) {
                                            setError({})
                                            setPrivacy(
                                                {
                                                    ...privacy,
                                                    terms_condition: e.target.value,
                                                },
                                                setFlag(1)
                                            )
                                        }
                                        else {
                                            setError({ terms_condition: 'word limit reached' })
                                        }

                                    }

                                    }
                                    error={error?.terms_condition}
                                    color={color}
                                    req={true}
                                    tooltip={false}
                                />


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
                                            onClick={submitPrivacy}
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
            <Footer color={color} Primary={english.Foot} />
        </>



    )
}

export default PrivacyPolicy