import React, { useEffect, useState } from 'react';
import validateAdditionalServicesEdit from '../../components/validation/additionalservices/additionalservicesedit';
import LoaderDarkTable from "../../components/loaders/darktableloader";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import LoaderTable from "../../components/loadertable";
import Table from '../../components/Table';
import Button from "../../components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import objChecker from "lodash"
import {english,french,arabic} from "../../components/Languages/Languages";
import { InitialActions, ColorToggler } from "../../components/initalActions";
import { fetchAdditionalServices, fetchHotelDetails, navigationList, validationAdditionalServices } from '../../components/logic/property/AdditionalServices'
import Router from 'next/router';
import BreadCrumb from '../../components/utils/BreadCrumb';

var language;
var currentProperty;
var currentLogged;
function AdditionalServices() {
    const [visible, setVisible] = useState(0);
    const [spinner, setSpinner] = useState(0)
    const [additionalServices, setAdditionalServices] = useState({})
    const [error, setError] = useState({})
    const [color, setColor] = useState({})
    const [mode, setMode] = useState()
    const [services, setServices] = useState([])
    const [flag, setFlag] = useState([])
    const [view, setView] = useState(0);
    const [modified, setModified] = useState([])
    const [add, setAdd] = useState(0)
    const [gen, setGen] = useState([])
    const [gene, setGene] = useState([])

    // runs at load time
    useEffect(() => {
        const resp = InitialActions({ setColor, setMode })
        language = resp?.language;
        currentLogged = resp?.currentLogged;
        currentProperty = resp?.currentProperty;
        if (JSON.stringify(currentLogged) === 'null') {
            Router.push(window.location.origin)
        }
        else {
            fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible);
            fetchHotelDetails(currentProperty, setServices, setGen, setVisible);

        }
    }, [])

    /* Function to edit additional services */
    const editAdditionalServices = (props, noChange) => {
        if (objChecker.isEqual(props, noChange)) {
            toast.warn('No change in  Additional Services detected. ', {
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
            var result = validateAdditionalServicesEdit(props)
            if (result === true) {

                const final_data = {
                    "add_service_id": props.id,
                    "add_service_name": props.name,
                    "property_id": currentProperty.property_id,
                    "add_service_comment": props?.type,
                    "status": props.status
                }
                const url = '/api/additional_services'
                axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
                    ((response) => {
                        toast.success("Additional Services Updated Successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible);
                        Router.push("./additionalservices");
                        setModified([])
                    })
                    .catch((error) => {
                        toast.error("Additional Services Update Error!", {
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

    /* Function to delete additional services */
    const deleteAdditionalServices = (props) => {
        const url = `/api/additional_service/${props}`
        axios.delete(url).then((response) => {
            toast.success(("Additional Service Deleted Successfully!"), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchAdditionalServices(currentProperty, setAdditionalServices, setGene, setVisible);
            Router.push('./additionalservices')
        })
            .catch((error) => {
                toast.error(("Additional Service Delete Error!"), {
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

    return (
        <>
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

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>

                {/* bread crumb */}
                <BreadCrumb
                    color={color}
                    crumbList={navigationList(currentLogged, currentProperty)}
                />

                <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
                <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
                <div className={visible === 1 ? 'block' : 'hidden'}>
                    <Table gen={gene} setGen={setGene} add={() => setView(1)} name="Additional Services"
                        edit={editAdditionalServices} color={color}
                        delete={deleteAdditionalServices}
                        common={language?.common} cols={language?.AdditionalServicesCols} /> </div>


                {/* Modal Add */}
                <div className={view === 1 ? 'block' : 'hidden'}>

                    <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                            <form id='asform'>
                                <div className={`${color?.whitebackground} rounded-lg shadow relative`}>
                                    <div className="flex items-start justify-between p-5 border-b rounded-t">
                                        <h3 className={`${color?.text} text-xl font-semibold`}>
                                            {language?.add} {language?.new} {language?.service}
                                        </h3>
                                        <button type="button" onClick={() => {
                                            document.getElementById('asform').reset();
                                            setError({})
                                            setModified([])
                                            setView(0);
                                        }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-user-modal">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className={`text-sm ${color?.text} font-medium  block mb-2`}>{language?.service} {language?.name}</label>
                                                <input type="text" name="first-name"
                                                    onChange={(e) => { setModified({ ...modified, add_service_name: e.target.value }, setFlag(1)) }}
                                                    id="first-name"
                                                    className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} required />
                                                <p className="text-sm text-sm text-red-700 font-light">
                                                    {error?.add_service_name}</p>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className={`text-sm ${color?.text} font-medium  block mb-2`}>{language?.service} {language?.description}</label>
                                                <textarea rows="2" columns="50" name="last-name"
                                                    onChange={(e) => { setModified({ ...modified, add_service_comment: e.target.value }, setFlag(1)) }}
                                                    id="last-name" className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg 
                            focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} required />
                                                <p className="text-sm  text-red-700 font-light">
                                                    {error?.add_service_comment}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="items-center p-6 border-t border-gray-200 rounded-b">
                                        <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                                            <Button Primary={language?.AddDisabled} /></div>
                                        <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                                            <Button Primary={language?.Add} onClick={() => { validationAdditionalServices(setError, setSpinner, modified, setModified, setFlag, setView, currentProperty, setAdditionalServices, setGene, setVisible, Router) }} />
                                        </div>
                                        <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
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
        </>)
}
export default AdditionalServices
AdditionalServices.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}
